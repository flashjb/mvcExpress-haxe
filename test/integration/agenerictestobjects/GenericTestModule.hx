/**
 * COMMENT : todo
 * 
 */
package integration.agenerictestobjects;

import integration.proxymap.testobj.CestConstCommand;
import integration.proxymap.testobj.TestContsViewMediator;
import flash.display.Sprite;
import flash.events.Event;
import integration.lazyproxy.LazyProxyTests;
import integration.proxymap.testobj.TestContsView;
import mvcexpress.modules.ModuleCore;
import mvcexpress.mvc.Proxy;

class GenericTestModule extends ModuleCore {

	public function new(moduleName : String) {
		super(moduleName);
	}

	//----------------------------------
	//     communication
	//----------------------------------
	public function sendMessageTest(type : String, params : Dynamic = null) : Void {
		super.sendMessage(type, params);
	}

	public function sendScopeMessageTest(scopeName : String, type : String, params : Dynamic = null) : Void {
		super.sendScopeMessage(scopeName, type, params);
	}

	//----------------------------------
	//     proxymap
	//----------------------------------
	public function proxymap_map(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : String {
		return proxyMap.map(proxyObject, injectClass, name);
	}

	public function proxymap_unmap(injectClass : Class<Dynamic>, name : String = "") : String {
		return proxyMap.unmap(injectClass, name);
	}

	public function proxymap_scopeMap(scopeName : String, proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Void {
		proxyMap.scopeMap(scopeName, proxyObject, injectClass, name);
	}

	public function proxymap_scopeUnmap(scopeName : String, injectClass : Class<Dynamic>, name : String = "") : Void {
		proxyMap.scopeUnmap(scopeName, injectClass, name);
	}

	public function proxymap_getProxy(injectClass : Class<Dynamic>, name : String = "") : Proxy {
		return proxyMap.getProxy(injectClass, name);
	}

	public function proxymap_isMapped(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Bool {
		return proxyMap.isMapped(proxyObject, injectClass, name);
	}

	public function proxymap_lazyMap(proxyClass : Class<Dynamic>, injectClass : Class<Dynamic> = null, name : String = "", proxyParams : Array<Dynamic> = null) : String {
		return proxyMap.lazyMap(proxyClass, injectClass, name, proxyParams);
	}

	//----------------------------------
	//     mediator map
	//----------------------------------
	public function mediatorMap_map(viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic>, injectClass : Class<Dynamic> = null) : Void {
		mediatorMap.map(viewClass, mediatorClass, injectClass);
	}

	public function mediatorMap_unmap(viewClass : Class<Dynamic>) : Void {
		mediatorMap.unmap(viewClass);
	}

	public function mediatorMap_mediate(viewObject : Dynamic) : Void {
		mediatorMap.mediate(viewObject);
	}

	public function mediatorMap_mediateWith(viewObject : Dynamic, mediatorClass : Class<Dynamic>, injectClass : Class<Dynamic> = null) : Void {
		mediatorMap.mediateWith(viewObject, mediatorClass, injectClass);
	}

	public function mediatorMap_unmediate(viewObject : Dynamic) : Void {
		mediatorMap.unmediate(viewObject);
	}

	public function mediatorMap_isMapped(viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic>) : Bool {
		return mediatorMap.isMapped(viewClass, mediatorClass);
	}

	public function mediatorMap_isMediated(viewObject : Dynamic) : Bool {
		return mediatorMap.isMediated(viewObject);
	}

	//----------------------------------
	//     commandmap
	//----------------------------------
	public function commandMap_execute(commandClass : Class<Dynamic>, params : Dynamic = null) : Void {
		commandMap.execute(commandClass, params);
	}

	public function commandMap_map(type : String, commandClass : Class<Dynamic>) : Void {
		commandMap.map(type, commandClass);
	}

	public function commandMap_unmap(type : String, commandClass : Class<Dynamic>) : Void {
		commandMap.unmap(type, commandClass);
	}

	public function commandMap_scopeMap(scopeName : String, type : String, commandClass : Class<Dynamic>) : Void {
		commandMap.scopeMap(scopeName, type, commandClass);
	}

	public function commandMap_scopeUnmap(scopeName : String, type : String, commandClass : Class<Dynamic>) : Void {
		commandMap.scopeUnmap(scopeName, type, commandClass);
	}

	public function commandMap_isMapped(type : String, commandClass : Class<Dynamic>) : Bool {
		return commandMap.isMapped(type, commandClass);
	}

	public function commandMap_clearCommandPool(commandClass : Class<Dynamic>) : Void {
		commandMap.clearCommandPool(commandClass);
	}

	public function commandMap_checkIsClassPooled(commandClass : Class<Dynamic>) : Bool {
		return commandMap.checkIsClassPooled(commandClass);
	}

	//----------------------------------
	//     Scope
	//----------------------------------
	public function registerScopeTest(scopeName : String, messageSending : Bool = true, messageReceiving : Bool = true, proxieMap : Bool = false) : Void {
		super.registerScope(scopeName, messageSending, messageReceiving, proxieMap);
	}

	public function unregisterScopeTest(scopeName : String) : Void {
		super.unregisterScope(scopeName);
	}

}

