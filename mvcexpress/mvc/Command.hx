// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Command, handles business logic of your application. 																									</br>
 * You most likely need it then:																															</br>
 *    - if you need to change application state with one or more logical statement.																			</br>
 *    - if you need more then one unrelated proxies injected to make a decision.																			</br>
 * Commands can get proxies injected and can send messages																									</br>
 * <b><p>
 * It MUST contain custom execute(params:Object) function. Parameter can be typed as you wish.																</br>
 * It is best practice to use same type as you use in message, that triggers this command.																	</br>
 * If message does not send any parameter object - you still must have singe parameter, for example: execute(blank:Object). This parameter will be null.	</br>
 * </p></b>
 * 
 */
package mvcexpress.mvc;

import mvcexpress.MvcExpress;
import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.command.TraceCommand_sendMessage;
import mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage;

@:rtti
class Command 
{

	/** Handles application Commands. */
	public var commandMap : CommandMap;
	/** Handles application Proxies. */
	public var proxyMap : ProxyMap;
	/** Handles application Mediators. */
	public var mediatorMap : MediatorMap;
	
	/** used internally for communication*/
	public var messenger : Messenger;
	public var messageType : String;
	public var isExecuting : Bool;
	// = false;
	

	#if debug
		static public var canConstruct:Bool; // = false;
		//static pureLegsCore var canConstruct:Boolean; // = false;
	#end

	/** CONSTRUCTOR */
	public function new() {
		#if debug
			//use namespace pureLegsCore;
			if (!canConstruct) {
				throw  "Command:" + this + " can be constructed only by framework. If you want to execute it - map it to message with commandMap.map() and send a message, or execute it directly with commandMap.execute()";
			}
		#end
	}

	//----------------------------------
	//     MESSAGING
	//----------------------------------
	/**
	 * Sends a message with optional params object inside of current module.
	 */
	function sendMessage(type : String, params : Dynamic = null) : Void {
		//use namespace pureLegsCore;
		// log the action
		#if debug
			MvcExpress.debug(new TraceCommand_sendMessage(messenger.moduleName, this, type, params, true));
		#end
		//
		messenger.send(type, params);
		//
		// clean up logging the action
		#if debug
			MvcExpress.debug(new TraceCommand_sendMessage(messenger.moduleName, this, type, params, false));
		#end
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * 
	 * 
	 * 
	 */
	function sendScopeMessage(scopeName : String, type : String, params : Dynamic = null) : Void 
	{
		//use namespace pureLegsCore;
		
		// log the action
		#if debug
			MvcExpress.debug(new TraceCommand_sendScopeMessage(messenger.moduleName, this, type, params, true));
		#end
		//
		ModuleManager.sendScopeMessage(messenger.moduleName, scopeName, type, params);
		//
		// clean up logging the action
		#if debug
			MvcExpress.debug(new TraceCommand_sendScopeMessage(messenger.moduleName, this, type, params, false));
		#end
	}

	/**
	 * Registers scope name.
	 * If scope name is not registered - module to module communication via scope and mapping proxies to scope is not possible.
	 * What features module can use with that scope is defined by parameters.
	 * 
	 * 
	 * 
	 * 
	 */
	function registerScope(scopeName : String, messageSending : Bool = true, messageReceiving : Bool = true, proxieMapping : Bool = false) : Void {
		//use namespace pureLegsCore;
		ModuleManager.registerScope(messenger.moduleName, scopeName, messageSending, messageReceiving, proxieMapping);
	}

	/**
	 * Unregisters scope name.
	 * Then scope is not registered module to module communication via scope and mapping proxies to scope becomes not possible.
	 */
	function unregisterScope(scopeName : String) : Void {
		//use namespace pureLegsCore;
		ModuleManager.unregisterScope(messenger.moduleName, scopeName);
	}

	//----------------------------------
	//     Getters
	//----------------------------------
	/**
	 * Type of message that executed this command. (If command is not executed by message it set to null.) 
	 * 
	 */
	public function getMessageType() : String {
		//		return pureLegsCore::messageType;
		return messageType;
	}

	//----------------------------------
	//     Misc
	//----------------------------------
	// execute function is not meant to be overridden in mvcExpress.
	// You have to manually create execute() function in your commands, this gives possibility to set any type to params object.
	//public function execute(params:Object):void {
	//}
}

