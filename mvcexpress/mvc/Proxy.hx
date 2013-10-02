// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Proxy holds and manages application data, provide API to work with it. 				</br>
 * Can send messages. (Usually sends one with each data update)							</br>
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.mvc;

import flash.utils.Dictionary;
import mvcexpress.MvcExpress;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage;

class Proxy {
	var isReady(getIsReady, never) : Bool;

	/**
	 * Interface to work with proxies.
	 */
	var proxyMap : IProxyMap;
	// Shows if proxy is ready. Read only.
	var _isReady : Bool;
	// = false;
	// used internally for communication
	/** @private */
	var messenger : Messenger;
	// for sending scoped messages then injected by scope.
	var proxyScopes : Array<String>;
	// for pooled command classes that are dependant on this proxy.
	var dependantCommands : Dictionary;
	// amount of pending injections.
	/** @private */
	var pendingInjections : Int;
	// = 0;
	/** CONSTRUCTOR */
	public function new() {
		proxyScopes = new Array<String>();
		dependantCommands = new Dictionary();
	}

	//----------------------------------
	//     Life cycle functions
	//----------------------------------
	/**
	 * Then proxy is mapped with proxyMap this function is called.
	 */
	function onRegister() : Void {
		// for override
	}

	/**
	 * Then proxy is unmapped with proxyMap this function is called.
	 */
	function onRemove() : Void {
		// for override
	}

	/**
	 * Indicates if proxy is ready for usage. (all dependencies are injected.)
	 */
	function getIsReady() : Bool {
		return _isReady;
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
		var moduleName : String = messenger.moduleName;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxy_sendMessage(moduleName, this, type, params, true));
		//		}
		//
		messenger.send(type, params);
		//
		var scopeCount : Int = proxyScopes.length;
		var i : Int;
		while(i < scopeCount) {
			ModuleManager.sendScopeMessage(moduleName, proxyScopes[i], type, params, false);
			i++;
		}
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxy_sendMessage(moduleName, this, type, params, false));
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
		var moduleName : String = messenger.moduleName;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxy_sendScopeMessage(moduleName, this, type, params, true));
		//		}
		//
		ModuleManager.sendScopeMessage(moduleName, scopeName, type, params);
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxy_sendScopeMessage(moduleName, this, type, params, false));
		//		}
	}

	//----------------------------------
	//     INTERNAL
	//----------------------------------
	/**
	 * sets proxyMap interface.
	 * @param	iProxyMap
	 * @private
	 */
	function setProxyMap(iProxyMap : IProxyMap) : Void {
		proxyMap = iProxyMap;
	}

	/**
	 * marks mediator as ready and calls onRegister()
	 * called from proxyMap
	 * @private
	 */
	function register() : Void {
		if(!_isReady)  {
			_isReady = true;
			onRegister();
		}
	}

	/**
	 * marks mediator as not ready and calls onRemove().
	 * called from proxyMap
	 * @private
	 */
	function remove() : Void {
		_isReady = false;
		dependantCommands = null;
		onRemove();
	}

	//----------------------------------
	//     Scoping
	//----------------------------------
	/**
	 * Add scope for proxy to send all proxy messages to.
	 * @param	scopeName
	 * @private
	 */
	function addScope(scopeName : String) : Void {
		var messengerFound : Bool;
		// = false;
		var scopeCount : Int = proxyScopes.length;
		var i : Int;
		while(i < scopeCount) {
			if(proxyScopes[i] == scopeName)  {
				messengerFound = true;
				break;
			}
			i++;
		}
		if(!messengerFound)  {
			proxyScopes[proxyScopes.length] = scopeName;
		}
	}

	/**
	 * Remove scope for proxy to send all proxy messages to.
	 * @param	scopeName
	 * @private
	 */
	function removeScope(scopeName : String) : Void {
		var scopeCount : Int = scopeName.length;
		var i : Int;
		while(i < scopeCount) {
			if(proxyScopes[i] == scopeName)  {
				proxyScopes.splice(i, 1);
				break;
			}
			i++;
		}
	}

	//----------------------------------
	//     Pooled commands
	//----------------------------------
	// Registers command that needs this proxy. (used for PooledCommand's only)
	/** @private */
	function registerDependantCommand(signatureClass : Class<Dynamic>) : Void {
		dependantCommands[signatureClass] = signatureClass;
	}

	// gets the list of dependant commands. (used to clear all PooledCommand's then proxy is removed)
	/** @private */
	function getDependantCommands() : Dictionary {
		return dependantCommands;
	}

}

