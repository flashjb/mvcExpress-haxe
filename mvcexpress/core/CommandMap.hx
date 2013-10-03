// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Handles command mappings, and executes them on messages
 * 
 */
package mvcexpress.core;



import mvcexpress.MvcExpress;
import mvcexpress.core.messenger.HandlerVO;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute;
import mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute;
import mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map;
import mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.PooledCommand;
import mvcexpress.utils.MvcExpressTools;

class CommandMap 
{

	// name of the module CommandMap is working for.
	var moduleName : String;
	// for internal use.
	var messenger : Messenger;
	// for internal use.
	var proxyMap : ProxyMap;
	// for internal use.
	var mediatorMap : MediatorMap;
	// collection of class arrays, stored by message type. Then message with this type is sent, all mapped classes are executed.
	var classRegistry : Dictionary;
	/* of Vector.<Class> by String */
	// holds pooled command objects, stared by command class.
	var commandPools : Dictionary;
	/* of Vector.<PooledCommand> by Class */

	#if debug
	/** types of command execute function, needed for debug mode only validation of execute() parameter.  */
		static private var commandClassParamTypes:Dictionary = new Dictionary(); /* of String by Class */
	//
	//	/** Dictionary with validated command classes.  */
		static private var validatedCommands:Dictionary = new Dictionary(); /* of Boolean by Class */
	#end
	
	var scopeHandlers : Array<HandlerVO>;
	/** CONSTRUCTOR */
	public function new( moduleName : String, messenger : Messenger, proxyMap : ProxyMap, mediatorMap : MediatorMap) {
		classRegistry = new Dictionary();
		commandPools = new Dictionary();
		scopeHandlers = new Array<HandlerVO>();
		
		this.moduleName  = moduleName;
		this.messenger   = messenger;
		this.proxyMap 	 = proxyMap;
		this.mediatorMap = mediatorMap;
	}

	//----------------------------------
	//     set up commands to execute current module messages
	//----------------------------------
	/**
	 * Map a class to be executed then message with provided type is sent.
	 * 
	 * 
	 */
	public function map(type : String, commandClass : Class<Dynamic>) : Void 
	{
		// check if command has execute function, parameter, and store type of parameter object for future checks on execute.
		//use namespace pureLegsCore;
		
		// debug this action
		#if debug
			MvcExpress.debug(new TraceCommandMap_map(moduleName, type, commandClass));
			validateCommandClass(commandClass);
			if (!Bool(type) || type == "null" || type == "undefined") {
				throw "Message type:[" + type + "] can not be empty or 'null' or 'undefined'. (You are trying to map command:" + commandClass + ")";
			}
		#end
		
		var messageClasses : Array<Class<Dynamic>> = classRegistry[type];
		if(!messageClasses)  {
			messageClasses = new Array<Class<Dynamic>>();
			classRegistry[type] = messageClasses;
			messenger.addCommandHandler(type, handleCommandExecute, commandClass);
		}
		messageClasses[messageClasses.length] = commandClass;
	}

	/**
	 * Unmaps a class to be executed then message with provided type is sent.
	 * 
	 * 
	 */
	public function unmap(type : String, commandClass : Class<Dynamic>) : Void 
	{
		// debug this action
		#if debug
			//	use namespace pureLegsCore;
			MvcExpress.debug(new TraceCommandMap_unmap(moduleName, type, commandClass));
		#end
		
		var messageClasses : Array<Class<Dynamic>> = classRegistry[type];
		if( messageClasses )  {
			var commandCount : Int = messageClasses.length;
			var i : Int;
			while(i < commandCount) {
				if(commandClass == messageClasses[i])  {
					messageClasses.splice(i, 1);
					break;
				}
				i++;
			}
		}
	}

	//----------------------------------
	//     Command execute
	//----------------------------------
	/**
	 * Instantiates and executes provided command class, and sends params to it.
	 * 
	 * 
	 */
	public function execute(commandClass : Class<Dynamic>, params : Dynamic = null) : Void {
		//use namespace pureLegsCore;
		var command : Command;
		// debug this action
		#if debug
			MvcExpress.debug(new TraceCommandMap_execute(moduleName, command, commandClass, params));
		#end
		//////////////////////////////////////////////
		////// INLINE FUNCTION runCommand() START
		// check if command is pooled.
		var pooledCommands : Array<PooledCommand> = commandPools[commandClass];
		if(pooledCommands && pooledCommands.length > 0)  {
			command = pooledCommands.shift();
		}
		else  
		{
			// check if command has execute function, parameter, and store type of parameter object for future checks on execute.
			#if debug
				validateCommandParams(commandClass, params);
			#end
		
			// construct command
			#if debug
				Command.canConstruct = true;
			#end
			
			command = new CommandClass();
			
			#if debug
				Command.canConstruct = false;
			#end
		
			command.messenger = messenger;
			command.mediatorMap = mediatorMap;
			command.proxyMap = proxyMap;
			command.commandMap = this;
			// inject dependencies
			proxyMap.injectStuff(command, commandClass);
		}

		if(Std.is(command, PooledCommand))  {
			// init pool if needed.
			if(!pooledCommands)  {
				pooledCommands = new Array<PooledCommand>();
				commandPools[commandClass] = pooledCommands;
			}
			command.messageType = null;
			command.isExecuting = true;
			command.execute(params);
			command.isExecuting = false;
			// if not locked - pool it.
			if(!cast(command, PooledCommand).isLocked)  
			{
				if(pooledCommands)  {
					pooledCommands[pooledCommands.length] = cast(command, PooledCommand);
				}
			}
		}
		else  
		{
			command.isExecuting = true;
			command.execute(params);
			command.isExecuting = false;
		}

		////// INLINE FUNCTION runCommand() END
		//////////////////////////////////////////////
	}

	//----------------------------------
	//     set up commands to execute scoped messages
	//----------------------------------
	/**
	 * Maps a class for module to module communication, to be executed then message with provided type and scopeName is sent to scope.
	 * 
	 * 
	 * 
	 */
	public function scopeMap(scopeName : String, type : String, commandClass : Class<Dynamic>) : Void {
		use;
		namespace;
		pureLegsCore;
		//
		var scopedType : String = scopeName + "_^~_" + type;
		var messageClasses : Array<Class<Dynamic>> = classRegistry[scopedType];
		if(!messageClasses)  {
			messageClasses = new Array<Class<Dynamic>>();
			classRegistry[scopedType] = messageClasses;
			// add scoped command handler.
			scopeHandlers[scopeHandlers.length] = ModuleManager.scopedCommandMap(moduleName, handleCommandExecute, scopeName, type, commandClass);
		}
		messageClasses[messageClasses.length] = commandClass;
	}

	/**
	 * Unmaps a class for module to module communication, to be executed then message with provided type and scopeName is sent to scope.
	 * 
	 * 
	 * 
	 */
	public function scopeUnmap(scopeName : String, type : String, commandClass : Class<Dynamic>) : Void 
	{
		var scopedType : String = scopeName + "_^~_" + type;
		var messageClasses : Array<Class<Dynamic>> = classRegistry[scopedType];
		if( messageClasses )  {
			var commandCount : Int = messageClasses.length;
			var i : Int;
			while(i < commandCount) {
				if(commandClass == messageClasses[i])  {
					messageClasses.splice(i, 1);
					break;
				}
				i++;
			}
		}
	}

	//----------------------------------
	//     command pooling
	//----------------------------------
	/**
	 * Checks if PooledCommand is already pooled.
	 * 
	 * 
	 */
	public function checkIsClassPooled(commandClass : Class<Dynamic>) : Bool {
		return (commandPools[commandClass] != null);
	}

	/**
	 * Clears pool created for specified command.
	 * (if commands are not pooled - function fails silently.)
	 * 
	 */
	public function clearCommandPool(commandClass : Class<Dynamic>) : Void 
	{
		commandPools[commandClass] = null;
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * Checks if Command class is already added to message type
	 * 
	 * 
	 * 
	 */
	public function isMapped(type : String, commandClass : Class<Dynamic>) : Bool {
		var retVal : Bool;
		// = false;
		if(classRegistry[type])  {
			var mappedClasses : Array<Class<Dynamic>> = classRegistry[type];
			var classCaunt : Int = mappedClasses.length;
			var i : Int;
			while(i < classCaunt) {
				if(commandClass == mappedClasses[i])  {
					retVal = true;
				}
				i++;
			}
		}
		return retVal;
	}

	/**
	 * Returns count of commands mapped to specified message type.
	 * 
	 * 
	 */
	public function mappedCommandCount(type : String) : Int {
		if(classRegistry[type] != null)  {
			return cast classRegistry[type].length;
		}

		else  {
			return 0;
		}

	}

	/**
	 * Returns text of all command classes that are mapped to messages. (for debugging)
	 * 
	 */
	public function listMappings() : String {
		var retVal : String = "";
			retVal = "===================== CommandMap Mappings: =====================\n";
		for( key in Reflect.fields(classRegistry) ) {
			retVal += "SENDING MESSAGE:'" + key + "'	> EXECUTES > " + classRegistry[key] + "\n";
		}

		retVal += "================================================================\n";
		return retVal;
	}

	//----------------------------------
	//     INTERNAL
	//----------------------------------
	/**
	 * Pool command from outside of CommandMap.
	 * 
	 * 
	 */
	function poolCommand(command : PooledCommand) : Void {
		var commandClass : Class<Dynamic> = Type.getClass(cast((command), Object).constructor);
		var pooledCommands : Array<PooledCommand> = commandPools[commandClass];
		if(pooledCommands)  {
			pooledCommands[pooledCommands.length] = command;
		}
	}

	/**
	 * Dispose commandMap on disposeModule()
	 * 
	 */
	function dispose() : Void {
		//use;
		//namespace;
		//pureLegsCore;
		for( type in Reflect.fields(classRegistry) ) {
			messenger.removeHandler(type, handleCommandExecute);
		}

		//
		var scopeHandlerCount : Int = scopeHandlers.length;
		var i : Int;
		while(i < scopeHandlerCount) {
			scopeHandlers[i].handler = null;
			i++;
		}
		messenger = null;
		proxyMap = null;
		mediatorMap = null;
		classRegistry = null;
		commandPools = null;
	}

	/** function to be called by messenger on needed message type sent */
	function handleCommandExecute(messageType : String, params : Dynamic) : Void 
	{
		//use namespace pureLegsCore;
		
		var command : Command;
		var messageClasses : Array<Class<Dynamic>>;
			messageClasses = classRegistry[messageType];
		if( messageClasses )  {
			var commandCount : Int = messageClasses.length;
			var i : Int;
			while(i < commandCount) {
				var commandClass : Class<Dynamic> = messageClasses[i];
				// debug this action
				#if debug
					MvcExpress.debug(new TraceCommandMap_handleCommandExecute(moduleName, command, commandClass, messageType, params));
				#end
				//////////////////////////////////////////////
				////// INLINE FUNCTION runCommand() START
				// check if command is pooled.
				var pooledCommands : Array<PooledCommand> = commandPools[commandClass];
				if( pooledCommands && pooledCommands.length > 0 )  {
					command = pooledCommands.shift();
				}
				else 
				{
					// check if command has execute function, parameter, and store type of parameter object for future checks on execute.
					#if debug
						validateCommandParams(commandClass, params);
					#end
					//
					
					// construct command
					#if debug
						Command.canConstruct = true;
					#end
					
					command = new CommandClass();
					
					#if debug
						Command.canConstruct = false;
					#end
					
					command.messenger = messenger;
					command.mediatorMap = mediatorMap;
					command.proxyMap = proxyMap;
					command.commandMap = this;
					// inject dependencies
					proxyMap.injectStuff(command, commandClass);
				}

				command.messageType = messageType;
				if(Std.is(command, PooledCommand))  {
					// init pool if needed.
					if(!pooledCommands)  {
						pooledCommands = new Array<PooledCommand>();
						commandPools[commandClass] = pooledCommands;
					}
					
					command.isExecuting = true;
					command.execute(params);
					command.isExecuting = false;
					// if not locked - pool it.
					if(!cast(command, PooledCommand).isLocked) 
					{
						if(pooledCommands)  {
							pooledCommands[pooledCommands.length] = cast(command, PooledCommand);
						}
					}
				} 
				else 
				{
					command.isExecuting = true;
					command.execute(params);
					command.isExecuting = false;
				}

				////// INLINE FUNCTION runCommand() END
				//////////////////////////////////////////////
				i++;
			}
		}
	}


	/**
	 * Helper functions for error checking
	 * 
	 */
	#if debug
		//pureLegsCore 
		function validateCommandClass(commandClass:Class<Dynamic>): Void 
		{
		
			// skip alread validated classes.
			if(validatedCommands[commandClass] != true)  
			{
				if( Std.is(Type.getSuperClass(commandClass), Command) )  
				{
					throw cast(("commandClass:" + commandClass + " you are trying to map MUST extend: 'mvcexpress.mvc.Command' class."), Error);
				}
				
				if(!commandClassParamTypes[commandClass])  
				{
					var hasExecute : Bool;// = false;
					var parameterCount : Int;// = 0;
					
					// find execute method.
					var dFunc = Reflect.field( obj, "execute");
					hasExecute = Reflect.hasField( Type.createEmptyInstance(commandClass), "execute");
						
						// TODO : check parameter ammount.
						//var paramList = Reflect.fields(dFunc); 
						//parameterCount = paramList.length();
						//if(parameterCount == 1)  {
						//	commandClassParamTypes[commandClass] = Type.typeof(paramList[0]);
						//}
					
					
					if(hasExecute)  
					{
						//TODO no way to check this at the moment
						//if(parameterCount != 1)  {
							//throw cast(("Command:" + commandClass + " function execute() must have single parameter, but it has " + parameterCount), Error);
						//}
					} else {
						throw cast(("Command:" + commandClass + " must have public execute() function with single parameter."), Error);
					}
	
				}
				validatedCommands[commandClass] = true;
			}
		}
	#end
	
	
	#if debug
	
	
		private function validateCommandParams(commandClass:Class, params:Object) : Void 
		{
			validateCommandClass(commandClass);
			if(params)  {
				var paramClass : Class<Dynamic> = Type.resolveClass(commandClassParamTypes[commandClass]);
				if(!(Std.is(params, paramClass)))  {
					throw cast(("Class " + commandClass + " expects " + commandClassParamTypes[commandClass] + ". But you are sending :" + Type.resolveClass(params)), Error);
				}
			}
		}
	#end
	
	// used for debugging
	function listMessageCommands(messageType : String) : Array<Class<Dynamic>> {
		return classRegistry[messageType];
	}

}

