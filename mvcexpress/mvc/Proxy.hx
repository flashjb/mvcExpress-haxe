// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Proxy holds and manages application data, provide API to work with it. 				</br>
 * Can send messages. (Usually sends one with each data update)							</br>
 * 
 */
package mvcexpress.mvc;

import flash.utils.Dictionary;
import mvcexpress.MvcExpress;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage;

class Proxy {
	var isReady(get_isReady, never) : Bool;

	/**
	 * Interface to work with proxies.
	 */
	var proxyMap : IProxyMap;
	// Shows if proxy is ready. Read only.
	var _isReady : Bool;
	// = false;
	// used internally for communication
	var messenger : Messenger;
	// for sending scoped messages then injected by scope.
	var proxyScopes : Array<String>;
	// for pooled command classes that are dependant on this proxy.
	var dependantCommands : Dictionary;
	// amount of pending injections.
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
	function get_isReady() : Bool {
		return _isReady;
	}

	//----------------------------------
	//     MESSAGING
	//----------------------------------
	/**
	 * Sends a message with optional params object inside of current module.
	 * 
	 * 
	 */
	function sendMessage(type : String, params : Dynamic = null) : Void {
		//use namespace pureLegsCore
		var moduleName : String = messenger.moduleName;
		// log the action
		#if debug
			MvcExpress.debug(new TraceProxy_sendMessage(moduleName, this, type, params, true));
		#end
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
		#if debug
			MvcExpress.debug(new TraceProxy_sendMessage(moduleName, this, type, params, false));
		#end
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * 
	 * 
	 * 
	 */
	function sendScopeMessage(scopeName : String, type : String, params : Dynamic = null) : Void {
		//use namespace pureLegsCore;
		var moduleName : String = messenger.moduleName;
		// log the action
		#if debug
			MvcExpress.debug(new TraceProxy_sendScopeMessage(moduleName, this, type, params, true));
		#end
		//
		ModuleManager.sendScopeMessage(moduleName, scopeName, type, params);
		//
		// clean up logging the action
		#if debug
			MvcExpress.debug(new TraceProxy_sendScopeMessage(moduleName, this, type, params, false));
		#end
	}

	//----------------------------------
	//     INTERNAL
	//----------------------------------
	/**
	 * sets proxyMap interface.
	 * 
	 * 
	 */
	function setProxyMap(iProxyMap : IProxyMap) : Void {
		proxyMap = iProxyMap;
	}

	/**
	 * marks mediator as ready and calls onRegister()
	 * called from proxyMap
	 * 
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
	 * 
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
	 * 
	 * 
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
	 * 
	 * 
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
	/* 
	function registerDependantCommand(signatureClass : Class<Dynamic>) : Void {
		dependantCommands[signatureClass] = signatureClass;
	}

	// gets the list of dependant commands. (used to clear all PooledCommand's then proxy is removed)
	/** 
	function getDependantCommands() : Dictionary {
		return dependantCommands;
	}
	 * 
	 * 
	 */

}

