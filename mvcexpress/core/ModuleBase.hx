// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Internal framework class. Not meant to be constructed.
 * <p>
 * Provides base module functions for all other module classes.
 * </p>
 * 
 */
package mvcexpress.core;

import mvcexpress.MvcExpress;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage;
import mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage;

class ModuleBase {
	public var moduleName(get_moduleName, never) : String;
	public var messenger(get_messenger, never) : Messenger;

	// defines if class can be instantiated.
	static var allowInstantiation : Bool;
	// = false;
	var _moduleName : String;
	/** Handles application Commands. */
	public var commandMap : CommandMap;
	/** Handles application Proxies. */
	public var proxyMap : ProxyMap;
	/** Handles application Mediators. */
	public var mediatorMap : MediatorMap;
	/** for communication. */
	var _messenger : Messenger;
	/**
	 * Internal framework class. Not meant to be constructed.
	 */
	public function new(moduleName : String, autoInit : Bool) {
		//use namespace pureLegsCore;
		if(!allowInstantiation)  {
			throw  "ModuleBase is framework internal class and is not meant to be instantiated. Use ModuleCore, ModuleSprite or other module classes instead." ;
		}
		_moduleName = moduleName;
		if(autoInit)  {
			initModule();
		}
	}

	/**
	 * Module name
	 */
	public function get_moduleName() : String {
		return _moduleName;
	}

	/**
	 * framework access to module messenger
	 * 
	 */
	function get_messenger() : Messenger {
		return _messenger;
	}

	//----------------------------------
	//     Life cycle
	//----------------------------------
	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// Module creation function used instead of constructor.
	// 
	// 
	// 						(or you start getting null reference errors.)
	static public function getModuleInstance(moduleName : String, autoInit : Bool) : ModuleBase {
	//	use namespace pureLegsCore;
		var retVal : ModuleBase;
		allowInstantiation = true;
		retVal = new ModuleBase(moduleName, autoInit);
		allowInstantiation = false;
		return retVal;
	}

	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// Initializes module. If this function is not called module will not work.
	// By default it is called in constructor.
	public function initModule() : Void {
	//	use namespace pureLegsCore;
		if( _messenger != null )  {
			throw  "Module can be initiated only once.";
		}
		Messenger.allowInstantiation = true;
		_messenger = new Messenger(_moduleName);
		Messenger.allowInstantiation = false;
		// proxyMap
		proxyMap = new ProxyMap(_moduleName, _messenger);
		// mediatorMap
		// check if flex is used.
		var uiComponentClass : Class<Dynamic> = getFlexClass();
		// if flex is used - special FlexMediatorMap Class is instantiated that wraps mediate() and unmediate() functions to handle flex 'creationComplete' issues.
		if( uiComponentClass != null )  {
			mediatorMap = new FlexMediatorMap(_moduleName, _messenger, proxyMap, uiComponentClass);
		}

		else  {
			mediatorMap = new MediatorMap(_moduleName, _messenger, proxyMap);
		}

		// commandMap
		commandMap = new CommandMap(_moduleName, _messenger, proxyMap, mediatorMap);
		proxyMap.setCommandMap(commandMap);
	}

	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// Function to get rid of module.
	// - All module commands are unmapped.
	// - All module mediators are unmediated
	// - All module proxies are unmapped
	// - All internals are nulled.
	public function disposeModule() : Void {
		//use namespace pureLegsCore;
		//
		if( commandMap != null ) {
			commandMap.dispose();
			commandMap = null;
		}
		if( mediatorMap != null ) {
			mediatorMap.dispose();
			mediatorMap = null;
		}
		if( proxyMap != null ) {
			proxyMap.dispose();
			proxyMap = null;
		}
		_messenger = null;
		//
		ModuleManager.disposeModule(_moduleName);
	}

	//----------------------------------
	//     Communication
	//----------------------------------
	/**
	 * Sends a message with optional params object inside of current module.
	 * 
	 * 
	 */
	public function sendMessage(type : String, params : Dynamic = null) : Void {
		// log the action
		#if debug
		//	use namespace pureLegsCore;
			MvcExpress.debug(new TraceModuleBase_sendMessage(_moduleName, this, type, params, true));
		#end
		//
		_messenger.send(type, params);
		//
		// clean up logging the action
		#if debug
			MvcExpress.debug(new TraceModuleBase_sendMessage(_moduleName, this, type, params, false));
		#end
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * 
	 * 
	 * 
	 */
	public function sendScopeMessage(scopeName : String, type : String, params : Dynamic) : Void {
		//use namespace pureLegsCore;
		// log the action
		#if debug
			MvcExpress.debug(new TraceModuleBase_sendScopeMessage(_moduleName, this, type, params, true));
		#end
		//
		ModuleManager.sendScopeMessage(_moduleName, scopeName, type, params);
		//
		// clean up logging the action
		#if debug
			MvcExpress.debug(new TraceModuleBase_sendScopeMessage(_moduleName, this, type, params, false));
		#end
	}

	//----------------------------------
	//     Scope management
	//----------------------------------
	/**
	 * Registers scope name.
	 * If scope name is not registered - module to module communication via scope and mapping proxies to scope is not possible.
	 * What features module can use with that scope is defined by parameters.
	 * 
	 * 
	 * 
	 * 
	 */
	public function registerScope(scopeName : String, messageSending : Bool = true, messageReceiving : Bool = true, proxieMap : Bool = false) : Void {
		//use namespace pureLegsCore;
		ModuleManager.registerScope(_moduleName, scopeName, messageSending, messageReceiving, proxieMap);
	}

	/**
	 * Unregisters scope name.
	 * Then scope is not registered module to module communication via scope and mapping proxies to scope becomes not possible.
	 * 
	 */
	public function unregisterScope(scopeName : String) : Void {
		//use namespace pureLegsCore;
		ModuleManager.unregisterScope(_moduleName, scopeName);
	}

	//----------------------------------
	//     utils
	//----------------------------------
	/** get flex lowest class by definition. ( way to check for flex project.) */
	static function getFlexClass() : Class<Dynamic> 
	{
		return Type.resolveClass("mx.core.UIComponent");
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// List all message mappings.
	public function listMappedMessages() : String {
		return _messenger.listMappings(commandMap);
	}

	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// List all view mappings.
	public function listMappedMediators() : String {
		return mediatorMap.listMappings();
	}

	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// List all model mappings.
	public function listMappedProxies() : String {
		return proxyMap.listMappings();
	}

	/**
	 * Internal framework function. Not meant to be used from outside.
	 */
	// List all controller mappings.
	public function listMappedCommands() : String {
		return commandMap.listMappings();
	}

}

