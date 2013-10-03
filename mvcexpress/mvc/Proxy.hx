// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Proxy holds and manages application data, provide API to work with it. 				</br>
 * Can send messages. (Usually sends one with each data update)							</br>
 * 
 */
package mvcexpress.mvc;

import haxe.ds.ObjectMap;

import mvcexpress.MvcExpress;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage;
import mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage;

class Proxy 
{
	var isReady(get_isReady, never) : Bool;

	/**
	 * Interface to work with proxies.
	 */
	var proxyMap : IProxyMap;
	// Shows if proxy is ready. Read only.
	var _isReady : Bool;
	// = false;
	// used internally for communication
	public var messenger : Messenger;
	// for sending scoped messages then injected by scope.
	var proxyScopes : Array<String>;
	// for pooled command classes that are dependant on this proxy.
	public var dependantCommands : ObjectMap<Dynamic, Class<Dynamic>>;
	// amount of pending injections.
	public var pendingInjections : Int;
	
	// = 0;
	/** CONSTRUCTOR */
	public function new() {
		proxyScopes = new Array<String>();
		dependantCommands = new ObjectMap();
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
		for(i in 0...scopeCount) {
			ModuleManager.sendScopeMessage(moduleName, proxyScopes[i], type, params, false);
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
	public function setProxyMap(iProxyMap : IProxyMap) : Void {
		proxyMap = iProxyMap;
	}

	/**
	 * marks mediator as ready and calls onRegister()
	 * called from proxyMap
	 * 
	 */
	public function register() : Void {
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
	public function remove() : Void {
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
	public function addScope(scopeName : String) : Void {
		var messengerFound : Bool = false;
		// = false;
		var scopeCount : Int = proxyScopes.length;
		for(i in 0...scopeCount) {
			if(proxyScopes[i] == scopeName)  {
				messengerFound = true;
				break;
			}
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
	public function removeScope(scopeName : String) : Void {
		var scopeCount : Int = scopeName.length;
		for(i in 0...scopeCount) {
			if(proxyScopes[i] == scopeName)  {
				proxyScopes.splice(i, 1);
				break;
			}
		}
	}

	//----------------------------------
	//     Pooled commands
	//----------------------------------
	// Registers command that needs this proxy. (used for PooledCommand's only)
	public function registerDependantCommand(signatureClass : Class<Dynamic>) : Void {
		dependantCommands.set(signatureClass, signatureClass);
	}

	// gets the list of dependant commands. (used to clear all PooledCommand's then proxy is removed)
	public function getDependantCommands() : Map<Dynamic, Class<Dynamic>> {
		return dependantCommands;
	}

}

