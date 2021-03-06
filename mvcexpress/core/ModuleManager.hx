// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * INTERNAL FRAMEWORK CLASS.
 * Creates and manages modules.
 * 
 */
package mvcexpress.core;

import mvcexpress.MvcExpress;
import mvcexpress.core.inject.InjectRuleVO;
import mvcexpress.core.inject.PendingInject;
import mvcexpress.core.inject.TestInject;
import mvcexpress.core.messenger.HandlerVO;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule;
import mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule;
import mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope;
import mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope;
import mvcexpress.mvc.Proxy;

class ModuleManager 
{

	/* messenger counter, increased with every new created module */
	static var _moduleId : Int;
	/* modules stored by moduleName */
	static var moduleRegistry : Map<String, ModuleBase> = new Map();
	/* of ModuleBase by String */
	/* all modules stared by module name */
	static var allModules : Array<ModuleBase> = new Array<ModuleBase>();
	/* all messengers by scope name */
	static var scopedMessengers : Map<String, Messenger> = new Map();
	/* of Messenger by String{moduleName} */
	/* all proxies by scope name */
	static var scopedProxyMaps : Map<String, ProxyMap> = new Map();
	/* of ProxyMap by String{moduleName} */
	/* all proxies maped to scope */
	static var scopedProxiesByScope : Map<String, Map<String, ScopedProxyData>> = new Map();
	/* of Dictionary(of ProxyMap by Proxy) by String{moduleName} */
	static var needMetadataTest : Bool = false;
	/* all module permision datas by modleName and scopeName */
	static var scopePermissionsRegistry : Map<String, Map<String, ScopePermissionData>>  = new Map();
	/* of Dictionary (of ScopePermissionData by scopeName String) by String{moduleName}  */
	/** CONSTRUCTOR */
	public function new() {
		throw "ModuleFactory is static framework class for internal use. Not meant to be instantiated.";
	}

	/**
	 * Creates new module for given name.
	 * 
	 */
	static public function createModule(moduleName : String, autoInit : Bool) : ModuleBase {
		// tests if framework can read 'Inject' metadata tag.
		/*
		if( needMetadataTest )  {
			needMetadataTest = false;
			var injectTest : TestInject = new TestInject();
			if(!injectTest.testInjectMetaTag())  {
				throw  "mvcExpress framework failed to use 'Inject' metadata. Please add '-keep-as3-metadata+=Inject' to compile arguments.";
			}
		}
		*/
		var retVal : ModuleBase;
		// debug this action
		#if debug
			//	use namespace pureLegsCore;
			MvcExpress.debug(new TraceModuleManager_createModule(moduleName, autoInit));
		#end
		
		if(moduleRegistry[moduleName] == null)  {
			_moduleId++;
			//
			if( moduleName == null )  {
				moduleName = "module" + _moduleId;
			}
			retVal = ModuleBase.getModuleInstance(moduleName, autoInit);
			moduleRegistry.set(moduleName, retVal);
			allModules[allModules.length] = retVal;
			//
		} else  {
			throw ("You can't have 2 modules with same name. call disposeModule() on old module before creating new one with same name. [moduleName:" + moduleName + "]");
		}

		return retVal;
	}

	/**
	 * get messenger for module name.
	 * 
	 * 
	 * 
	 */
	static public function getMessenger(moduleName : String) : Messenger {
		//use namespace pureLegsCore;
		return moduleRegistry[moduleName].messenger;
	}

	/**
	 * disposes of messenger for module name.
	 * 
	 * 
	 */
	static public function disposeModule(moduleName : String) : Void {
		//use;
		//namespace;
		//pureLegsCore;
		// debug this action
		#if debug
			MvcExpress.debug(new TraceModuleManager_disposeModule(moduleName));
		#end
		
		if( moduleRegistry.exists(moduleName) )  
		{
			// remove scoped proxies from this module
			var scopiedProxies = scopedProxiesByScope[moduleName];
			if( scopiedProxies != null )  {
				// remove scoped proxies.
				for( scopedProxyData in scopiedProxies )
				{
					var scopedProxyMap : ProxyMap = scopedProxyMaps[scopedProxyData.scopeName];
						scopedProxyMap.unmap(scopedProxyData.injectClass, scopedProxyData.name);
					Reflect.deleteField(scopiedProxies, scopedProxyData.injectId);
				}
			}

			moduleRegistry.remove(moduleName);
			
			var moduleCount : Int = allModules.length;
			var j : Int = 0;
			while(j < moduleCount) {
				if(allModules[j].moduleName == moduleName)  {
					allModules.splice(j, 1);
					break;
				}
				j++;
			}
			
			scopePermissionsRegistry.remove(moduleName);
			//
		} else {
			throw ("Module with moduleName:" + moduleName + " doesn't exist.");
		}

	}

	//----------------------------------
	//     message scoping
	//----------------------------------
	/** sends scoped message*/
	static public function sendScopeMessage (moduleName : String, scopeName : String, type : String, params : Dynamic, checkPermisions : Bool = true) : Void {
		//use namespace pureLegsCore;
		var scopePermission : ScopePermissionData = null;
		if( checkPermisions )  {
			// get permission object
			if( scopePermissionsRegistry[moduleName] != null )  {
				scopePermission  = scopePermissionsRegistry[moduleName][scopeName];
			}
			if( scopePermission == null || !scopePermission.messageSending)  {
				throw ("Module with name:" + moduleName + " has no permition to send messages to scope:" + scopeName + ". Please use: registerScopeTest() function.");
			}
		}
		var scopeMesanger : Messenger = scopedMessengers[scopeName];
		if( scopeMesanger != null ) {
			scopeMesanger.send(scopeName + "_^~_" + type, params);
		}
	}

	/** add scoped handler */
	static public function addScopeHandler(moduleName : String, scopeName : String, type : String, handler : Dynamic) : HandlerVO {
		// get permission object
		var scopePermission : ScopePermissionData = null;
		if( scopePermissionsRegistry[moduleName]  != null ) {
			scopePermission = scopePermissionsRegistry[moduleName][scopeName];
		}
		if( scopePermission == null || !scopePermission.messageReceiving )  {
			throw ("Module with name:" + moduleName + " has no permition to receive messages from scope:" + scopeName + ". Please use: registerScopeTest() function.");
		}
		var scopeMesanger : Messenger = scopedMessengers[scopeName];
		if( scopeMesanger == null)  {
			//use namespace pureLegsCore;
			Messenger.allowInstantiation = true;
			scopeMesanger = new Messenger("$scope_" + scopeName);
			Messenger.allowInstantiation = false;
			scopedMessengers[scopeName] = scopeMesanger;
		}
		return scopeMesanger.addHandler(scopeName + "_^~_" + type, handler);
	}

	/** remove scoped handler*/
	static public function removeScopeHandler(scopeName : String, type : String, handler : Dynamic) : Void {
		var scopeMesanger : Messenger = scopedMessengers[scopeName];
		if( scopeMesanger != null )  {
			scopeMesanger.removeHandler(scopeName + "_^~_" + type, handler);
		}
	}

	//----------------------------------
	//     Command scoping
	//----------------------------------
	/**
	 * 
	 * Map command to scoped message.
	 *
	 */
	static public function scopedCommandMap(moduleName : String, handleCommandExecute : Dynamic, scopeName : String, type : String, commandClass : Class<Dynamic>) : HandlerVO {
		// get permission object
		var scopePermission : ScopePermissionData = null;
		if( scopePermissionsRegistry[moduleName]  != null )  {
			scopePermission  = scopePermissionsRegistry[moduleName][scopeName];
		}
		if( scopePermission == null || !scopePermission.messageReceiving)  {
			throw ("Module with name:" + moduleName + " has no permition to receive messages and execute commands from scope:" + scopeName + ". Please use: registerScopeTest() function.");
		}
		
		var scopeMesanger : Messenger = scopedMessengers[scopeName];
		if( scopeMesanger == null )  {
			//use namespace pureLegsCore;
			Messenger.allowInstantiation = true;
			scopeMesanger = new Messenger("$scope_" + scopeName);
			Messenger.allowInstantiation = false;
			scopedMessengers[scopeName] = scopeMesanger;
		}
		return scopeMesanger.addCommandHandler(scopeName + "_^~_" + type, handleCommandExecute, commandClass);
	}

	//----------------------------------
	//     proxy scoping
	//----------------------------------
	/**
	 * Map proxy to scope
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	static public function scopeMap(moduleName : String, scopeName : String, proxyObject : Proxy, injectClass : Class<Dynamic>, name : String) : Void 
	{
		// get permission object
		var scopePermission : ScopePermissionData = null;
		if( scopePermissionsRegistry[moduleName] != null )  {
			scopePermission  = scopePermissionsRegistry[moduleName][scopeName];
		}
		
		
		if( scopePermission == null || !scopePermission.proxieMapping )  {
			throw ("Module with name:" + moduleName + " has no permition to map proxies to scope:" + scopeName + ". Please use: registerScopeTest() function.");
		}
	//	use namespace pureLegsCore;
		var scopedProxyMap : ProxyMap = scopedProxyMaps[scopeName];
		if( scopedProxyMap == null )  {
			initScopedProxyMap(scopeName);
			scopedProxyMap = scopedProxyMaps[scopeName];
		}
		var injectId : String = scopedProxyMap.map(proxyObject, injectClass, name);
		// add scope to proxy so it could send scoped messages.
		proxyObject.addScope(scopeName);
		
		var scopedProxyData : ScopedProxyData = new ScopedProxyData();
			scopedProxyData.scopedProxy = proxyObject;
			scopedProxyData.scopeName = scopeName;
			scopedProxyData.injectId = injectId;
			
		// if injectClass is not provided - proxyClass will be used instead.
		if(injectClass != null)  {
			scopedProxyData.injectClass = injectClass;
		} else {
			scopedProxyData.injectClass = Type.getClass(proxyObject);
		}

		scopedProxyData.name = name;
		//
		if( scopedProxiesByScope[moduleName] == null )  {
			scopedProxiesByScope[moduleName] = new Map();
		}
		scopedProxiesByScope[moduleName][injectId] = scopedProxyData;
	}

	/**
	 * Unmap proxy from scope
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	static public function scopeUnmap(moduleName : String, scopeName : String, injectClass : Class<Dynamic>, name : String) : Void 
	{
		var scopedProxyMap : ProxyMap = scopedProxyMaps[scopeName];
		if( scopedProxyMap != null ) 
		{
			var injectId : String = scopedProxyMap.unmap(injectClass, name);
			// remove scope from proxy, so it would stop sending scoped messages.
			//use namespace pureLegsCore;
			if( scopedProxiesByScope.get(moduleName)  == null )  {
				if( scopedProxiesByScope.get(moduleName).get(injectId) != null )  {
					scopedProxiesByScope.get(moduleName).get(injectId).scopedProxy.removeScope(scopeName);
				}
			}
			scopedProxiesByScope.get(moduleName).remove(injectId) ;
		}
	}

	/**
	 * Inject Scoped proxy.
	 * 
	 */
	static public function injectScopedProxy(recipientObject : Dynamic, injectRule : InjectRuleVO) : Bool 
	{
		var scopedProxyMap : ProxyMap = scopedProxyMaps[injectRule.scopeName];
		if( scopedProxyMap != null )  {
			//use namespace pureLegsCore;
			var injectProxy : Proxy = scopedProxyMap.getProxyById(injectRule.injectClassAndName);
			if( injectProxy != null  )  {
				Reflect.setField(recipientObject, injectRule.varName, injectProxy);
				return true;
			}
		}
		return false;
	}

	/**
	 * Adds pending scoped injection.
	 * 
	 */
	static public function addPendingScopedInjection(scopeName : String, injectClassAndName : String, pendingInject : PendingInject) : Void {
		//use namespace pureLegsCore;
		var scopedProxyMap : ProxyMap = scopedProxyMaps[scopeName];
		if( scopedProxyMap == null )  {
			initScopedProxyMap(scopeName);
			scopedProxyMap = scopedProxyMaps[scopeName];
		}
		scopedProxyMap.addPendingInjection(injectClassAndName, pendingInject);
	}

	/**
	 * Initiates scoped proxy map.
	 * 
	 */
	static public function initScopedProxyMap(scopeName : String) : Void 
	{
		var scopedMesanger : Messenger = scopedMessengers[scopeName];
		if( scopedMesanger == null )  {
			//use namespace pureLegsCore;
			Messenger.allowInstantiation = true;
			scopedMesanger = new Messenger("$scope_" + scopeName);
			Messenger.allowInstantiation = false;
			scopedMessengers[scopeName] = scopedMesanger;
		}
		scopedProxyMaps[scopeName] = new ProxyMap("$scope_" + scopeName, scopedMesanger);
	}

	//----------------------------------
	//     Scope managment
	//----------------------------------
	static public function registerScope(moduleName : String, scopeName : String, messageSending : Bool, messageReceiving : Bool, proxieMapping : Bool) : Void {
		// debug this action
		#if debug
		//	use namespace pureLegsCore;
			MvcExpress.debug(new TraceModuleManager_registerScope(moduleName, scopeName, messageSending, messageReceiving, proxieMapping));
		#end
		
		// create dictionary for scope permisions by moduleName
		if( scopePermissionsRegistry[moduleName] == null)  {
			scopePermissionsRegistry[moduleName] = new Map();
		}
		if( scopePermissionsRegistry[moduleName][scopeName] == null )  {
			scopePermissionsRegistry[moduleName][scopeName] = new ScopePermissionData();
		}
		var scopePermission : ScopePermissionData = scopePermissionsRegistry[moduleName][scopeName];
		// set values
		scopePermission.messageSending = messageSending;
		scopePermission.messageReceiving = messageReceiving;
		scopePermission.proxieMapping = proxieMapping;
	}

	static public function unregisterScope(moduleName : String, scopeName : String) : Void 
	{
		//		// debug this action
		#if debug
			//	use namespace pureLegsCore;
			MvcExpress.debug(new TraceModuleManager_unregisterScope(moduleName, scopeName));
		#end
		// remove permision data for scope if exists
		if( scopePermissionsRegistry[moduleName] != null )  {
			if( scopePermissionsRegistry[moduleName][scopeName] != null )  {
				scopePermissionsRegistry[moduleName][scopeName] = null;
			}
		}
	}

	//----------------------------------
	//     DEBUG
	//----------------------------------
	/**
	 * Returns string with all module names.
	 * 
	 */
	static public function listModules() : String {
		var retVal : String = "";
		for (i in 0...allModules.length) 
		{
			if(retVal != "")  {
				retVal += ",";
			}
			retVal += allModules[i].moduleName;
		}
		return "Module list:" + retVal;
	}

	static public function listMappedMessages(moduleName : String) : String {
		if(moduleRegistry[moduleName] != null)  {
			return  cast(moduleRegistry[moduleName], ModuleBase).listMappedMessages();
		}
		return "Module with name :" + moduleName + " is not found.";
	}

	static public function listMappedMediators(moduleName : String) : String 
	{
		if(moduleRegistry[moduleName] != null)  {
			return  cast(moduleRegistry[moduleName], ModuleBase).listMappedMediators();
		}
		return "Module with name :" + moduleName + " is not found.";
	}

	static public function listMappedProxies(moduleName : String) : String 
	{
		if(moduleRegistry[moduleName] != null)  {
			return cast(moduleRegistry[moduleName], ModuleBase).listMappedProxies();
		}
		return "Module with name :" + moduleName + " is not found.";
	}

	static public function listMappedCommands(moduleName : String) : String 
	{
		if(moduleRegistry[moduleName] != null)  {
			return cast(moduleRegistry[moduleName], ModuleBase).listMappedCommands();
		} 
		return "Module with name :" + moduleName + " is not found.";
	}

	static public function listModuleMessageCommands(moduleName : String, key : String) : String 
	{
		//use namespace pureLegsCore;
		if(moduleRegistry[moduleName] != null)  {
			return cast(cast(moduleRegistry[moduleName], ModuleBase).commandMap.listMessageCommands(key), String);
		}

		return "Module with name :" + moduleName + " is not found.";
	}
}

class ScopedProxyData {

	public function new (){}
	
	public var scopedProxy : Proxy;
	public var scopeName : String;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var injectId : String;
}

class ScopePermissionData {

	public function new (){}
	
	public var messageSending : Bool;
	public var messageReceiving : Bool;
	public var proxieMapping : Bool;
}

