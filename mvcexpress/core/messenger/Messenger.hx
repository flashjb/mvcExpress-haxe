// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * FOR INTERNAL USE ONLY.
 * Handles framework communications.
 * 
 */
package mvcexpress.core.messenger;

import flash.utils.Dictionary;
import mvcexpress.MvcExpress;
import mvcexpress.core.CommandMap;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler;
import mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler;
import mvcexpress.core.traceobjects.messenger.TraceMessenger_send;
import mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler;

class Messenger {

	// name of the module messenger is working for.
	public var moduleName : String;
	// defines if messenger can be instantiated.
	public static var allowInstantiation : Bool;
	// = false;
	// keeps ALL HandlerVO's in vectors by message type that they have to respond to.
	var messageRegistry : Dictionary;
	/* of Vector.<HandlerVO> by String */
	// keeps ALL HandlerVO's in Dictionaries by message type, mapped by handlers for fast disabling and duplicated handler checks.
	var handlerRegistry : Dictionary;
	/* of Dictionary by String */
	/**
	 * CONSTRUCTOR - internal class. Not available for use.
	 */
	public function new( moduleName : String ) {
		messageRegistry = new Dictionary();
		handlerRegistry = new Dictionary();
		//use namespace pureLegsCore;
		if(!allowInstantiation)  {
			throw ("Messenger is a framework class, you can't instantiate it.");
		}
		this.moduleName = moduleName;
	}

	/**
	 * Adds handler function that will be called then message of specified type is sent.
	 * 
	 * 
	 * 
	 * 
	 */
	public function addHandler(type : String, handler : Dynamic, handlerClassName : String = null) : HandlerVO {
		// debug this action
		#if debug
		//			use namespace pureLegsCore;
			MvcExpress.debug(new TraceMessenger_addHandler(moduleName, type, handler, handlerClassName));
		#end
		
		// if this message type used for the first time - create data placeholders.
		var messageList : Array<HandlerVO> = messageRegistry[type];
		if(!messageList)  {
			messageList = new Array<HandlerVO>();
			messageRegistry[type] = messageList;
			handlerRegistry[type] = new Dictionary();
		}
		var msgData : HandlerVO = handlerRegistry[type][handler];
		// check if this handler already exists for this type. (this check can be skipped in release mode.)
		#if debug
			if (msgData) {
				throw ("This handler function is already mapped to message type :" + type);
			}
		#end
		
		if(!msgData)  {
			msgData = new HandlerVO();
			
			#if debug
				msgData.handlerClassName = handlerClassName;
			#end
			
			msgData.handler = handler;
			messageList[messageList.length] = msgData;
			handlerRegistry[type][handler] = msgData;
		}
		return msgData;
		//}
	}

	/**
	 * Removes handler function that will be called then message of specified type is sent.
	 * - if handler is not found it fails silently.
	 * 
	 * 
	 */
	public function removeHandler(type : String, handler : Dynamic) : Void {
		// debug this action
		#if debug
		//			use namespace pureLegsCore;
			MvcExpress.debug(new TraceMessenger_removeHandler(moduleName, type, handler));
		#end
		
		if(handlerRegistry[type])  {
			if(handlerRegistry[type][handler])  
			{
				cast(handlerRegistry[type][handler], HandlerVO).handler = null;
				handlerRegistry[type][handler] = null;
			}
		}
	}

	/**
	 * Runs all handler functions associated with message type, and send params object as single parameter.
	 * 
	 * 
	 */
	public function send(type : String, params : Dynamic = null) : Void 
	{
		//use namespace pureLegsCore;
		// debug this action
		#if debug
			MvcExpress.debug(new TraceMessenger_send(moduleName, type, params));
		#end
		
		var messageList : Array<HandlerVO> = messageRegistry[type];
		var handlerVo : HandlerVO;
		var delCount : Int;
		// = 0;
		if(messageList)  {
			var mesageCount : Int = messageList.length;
			var i : Int;
			while(i < mesageCount) {
				handlerVo = messageList[i];
				// check if message is not marked to be removed. (disabled)
				if(handlerVo.handler == null)  
				{
					delCount++;
				}
				else  
				{
					// if some MsgVOs marked to be removed - move all other messages to there place.
					if(delCount)  {
						messageList[i - delCount] = messageList[i];
					}
					if(handlerVo.isExecutable)  {
						handlerVo.handler(type, params);
					}
					else  
					{
						#if debug
							// FOR DEBUG viewing only(mouse over over variables while in debugger mode.)
							/* Failed message type: */
							//type;
							/* Failed handler class: */
							handlerVo.handlerClassName;
							//							//
							MvcExpress.debug(new TraceMessenger_send_handler(moduleName, type, params, handlerVo.handler, handlerVo.handlerClassName));
						#end
						handlerVo.handler(params);
					}
				}

				i++;
			}
			// remove all removed handlers.
			if(delCount)  {
				messageList.splice(mesageCount - delCount, delCount);
			}
		}
	}

	/**
	 * function to add command execute function.
	 * 
	 */
	public function addCommandHandler(type : String, executeFunction : Dynamic, handlerClass : Class<Dynamic> = null) : HandlerVO {
		var executeMvgVo : HandlerVO = addHandler(type, executeFunction, Std.string(handlerClass));
		executeMvgVo.isExecutable = true;
		return executeMvgVo;
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * List all message mappings.
	 * Intended to be used by ModuleCore.as
	 */
	public function listMappings(commandMap : CommandMap) : String {
		//use namespace pureLegsCore;
		var retVal : String = "";
		retVal = "====================== Message Mappings: ======================\n";
		var warningText : String = "WARNING: If you want to see Classes that handles messages - you must run with '-D debug' compile variable set to 'true'.\n";
		
		#if debug
			warningText = "";
		#end
		
		if(warningText != "")  {
			retVal += warningText;
		}
		for( key in Reflect.fields(messageRegistry) ) 
		{
			var msgList : Array<HandlerVO> = messageRegistry[key];
			var messageHandlers : String = "";
			var msgCount : Int = msgList.length;
			var i : Int = 0;
			while(i < msgCount) {
				var handlerVo : HandlerVO = msgList[i];
				if(handlerVo.isExecutable)  {
					messageHandlers += "[EXECUTES:" + commandMap.listMessageCommands(key) + "], ";
					#if debug
						messageHandlers += "[" + handlerVo.handlerClassName + "], ";
					#end
				}
				i++;
			}
			retVal += "SENDING MESSAGE:'" + key + "'	> HANDLED BY: > " + messageHandlers + "\n";
		}

		retVal += "================================================================";
		return retVal;
	}

	/**
	 * Disposes of messenger.
	 */
	public function dispose() : Void {
		messageRegistry = null;
		handlerRegistry = null;
	}

}

