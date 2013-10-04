// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Core Module class based on MovieClip.
 * <p>
 * It starts framework and lets you set up your application. (or execute Commands for set up.)
 * You can create modular application by having more then one module.
 * </p>
 * 
 */
package mvcexpress.modules;

import flash.display.MovieClip;
import flash.events.Event;

import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ModuleBase;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
////import mvcexpress.core.namespace.PureLegsCore;

class ModuleMovieClip extends MovieClip {
	public var moduleName(get_moduleName, never) : String;

	var moduleBase : ModuleBase;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var commandMap : CommandMap;
	/**
	 * CONSTRUCTOR
	 * 
	 * 
	 * 
	 */
	public function new(moduleName : String = null, autoInit : Bool = true, initOnStage : Bool = true) 
	{
		super();
		//use namespace pureLegsCore;
		moduleBase = ModuleManager.createModule(moduleName, autoInit);
		//
		if(autoInit)  {
			proxyMap = moduleBase.proxyMap;
			mediatorMap = moduleBase.mediatorMap;
			commandMap = moduleBase.commandMap;
			//
			if(initOnStage)  {
				if(stage != null)  {
					onInit();
				} else  {
					addEventListener(Event.ADDED_TO_STAGE, handleModuleAddedToStage, false, 0, true);
				}
			} else  {
				onInit();
			}
		}
	}

	// inits module after it is added to stage.
	function handleModuleAddedToStage(event : Event) : Void {
		removeEventListener(Event.ADDED_TO_STAGE, handleModuleAddedToStage);
		onInit();
	}

	/**
	 * Name of the module
	 */
	public function get_moduleName() : String {
		return moduleBase.moduleName;
	}

	/**
	 * Initializes module. If this function is not called module will not work properly.
	 * By default it is called in constructor, but you can do it manually if you set constructor parameter 'autoInit' to false.
	 */
	function initModule() : Void {
		moduleBase.initModule();
		proxyMap = moduleBase.proxyMap;
		mediatorMap = moduleBase.mediatorMap;
		commandMap = moduleBase.commandMap;
		onInit();
	}

	/**
	 * Function called after framework is initialized.
	 * Meant to be overridden.
	 */
	function onInit() : Void {
		// for override
	}

	/**
	 * Function to get rid of module.
	 * - All module commands are unmapped.
	 * - All module mediators are unmediated
	 * - All module proxies are unmapped
	 * - All internals are nulled.
	 */
	public function disposeModule() : Void {
		onDispose();
		moduleBase.disposeModule();
	}

	/**
	 * Function called before module is destroyed.
	 * Meant to be overridden.
	 */
	function onDispose() : Void {
		// for override
	}

	/**
	 * Message sender.
	 * 
	 * 
	 */
	function sendMessage(type : String, params : Dynamic = null) : Void {
		moduleBase.sendMessage(type, params);
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * 
	 * 
	 * 
	 */
	function sendScopeMessage(scopeName : String, type : String, params : Dynamic = null) : Void {
		moduleBase.sendScopeMessage(scopeName, type, params);
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
		moduleBase.registerScope(scopeName, messageSending, messageReceiving, proxieMapping);
	}

	/**
	 * Unregisters scope name.
	 * Then scope is not registered module to module communication via scope and mapping proxies to scope becomes not possible.
	 * 
	 */
	function unregisterScope(scopeName : String) : Void {
		moduleBase.unregisterScope(scopeName);
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * List all message mappings.
	 */
	public function listMappedMessages() : String {
		return moduleBase.listMappedMessages();
	}

	/**
	 * List all view mappings.
	 */
	public function listMappedMediators() : String {
		return moduleBase.listMappedMediators();
	}

	/**
	 * List all model mappings.
	 */
	public function listMappedProxies() : String {
		return moduleBase.listMappedProxies();
	}

	/**
	 * List all controller mappings.
	 */
	public function listMappedCommands() : String {
		return moduleBase.listMappedCommands();
	}

}

