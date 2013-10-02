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
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.mvc;

import mvcexpress.MvcExpress;
import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.command.TraceCommand_sendMessage;
import mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage;

class Command {

	/** Handles application Commands. */
	public var commandMap : CommandMap;
	/** Handles application Proxies. */
	public var proxyMap : ProxyMap;
	/** Handles application Mediators. */
	public var mediatorMap : MediatorMap;
	/** used internally for communication
	 * @private */
	var messenger : Messenger;
	/** @private */
	var messageType : String;
	/** flag to store if command is executed by commandMap.
	 * @private */
	var isExecuting : Bool;
	// = false;
	/** @private */
	//	CONFIG::debug
	//	static pureLegsCore var canConstruct:Boolean; // = false;
	/** CONSTRUCTOR */
	public function new() {
		//		CONFIG::debug {
		//			use namespace pureLegsCore;
		//			if (!canConstruct) {
		//				throw Error("Command:" + this + " can be constructed only by framework. If you want to execute it - map it to message with commandMap.map() and send a message, or execute it directly with commandMap.execute()");
		//			}
		//		}
	}

	//----------------------------------
	//     MESSAGING
	//----------------------------------
	/**
	 * Sends a message with optional params object inside of current module.
	 * @param	type	type of the message for Commands or Mediator's handle function to react to.
	 * @param	params	Object that will be passed to Command execute() function or to handle functions.
	 */
	function sendMessage(type : String, params : Dynamic = null) : Void {
		use;
		namespace;
		pureLegsCore;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceCommand_sendMessage(messenger.moduleName, this, type, params, true));
		//		}
		//
		messenger.send(type, params);
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceCommand_sendMessage(messenger.moduleName, this, type, params, false));
		//		}
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * @param	scopeName	both sending and receiving modules must use same scope to make module to module communication.
	 * @param	type		type of the message for Commands or Mediator's handle function to react to.
	 * @param	params		Object that will be passed to Command execute() function and to handle functions.
	 */
	function sendScopeMessage(scopeName : String, type : String, params : Dynamic = null) : Void {
		use;
		namespace;
		pureLegsCore;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceCommand_sendScopeMessage(messenger.moduleName, this, type, params, true));
		//		}
		//
		ModuleManager.sendScopeMessage(messenger.moduleName, scopeName, type, params);
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceCommand_sendScopeMessage(messenger.moduleName, this, type, params, false));
		//		}
	}

	/**
	 * Registers scope name.
	 * If scope name is not registered - module to module communication via scope and mapping proxies to scope is not possible.
	 * What features module can use with that scope is defined by parameters.
	 * @param	scopeName			Name of the scope.
	 * @param	messageSending		Modules can send messages to this scope.
	 * @param	messageReceiving	Modules can receive and handle messages from this scope.(or map commands to scoped messages);
	 * @param	proxieMapping		Modules can map proxies to this scope.
	 */
	function registerScope(scopeName : String, messageSending : Bool = true, messageReceiving : Bool = true, proxieMapping : Bool = false) : Void {
		use;
		namespace;
		pureLegsCore;
		ModuleManager.registerScope(messenger.moduleName, scopeName, messageSending, messageReceiving, proxieMapping);
	}

	/**
	 * Unregisters scope name.
	 * Then scope is not registered module to module communication via scope and mapping proxies to scope becomes not possible.
	 * @param	scopeName			Name of the scope.
	 */
	function unregisterScope(scopeName : String) : Void {
		use;
		namespace;
		pureLegsCore;
		ModuleManager.unregisterScope(messenger.moduleName, scopeName);
	}

	//----------------------------------
	//     Getters
	//----------------------------------
	/**
	 * Type of message that executed this command. (If command is not executed by message it set to null.) 
	 * @return		message type
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

