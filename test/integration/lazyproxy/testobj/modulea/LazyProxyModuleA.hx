/**
 * COMMENT : todo
 * 
 */
package integration.lazyproxy.testobj.modulea;

import flash.display.Sprite;
import flash.events.Event;
import integration.lazyproxy.LazyProxyTests;
import mvcexpress.modules.ModuleCore;

class LazyProxyModuleA extends ModuleCore {

	static public var NAME : String = "LazyProxyModuleA";
	public function new() {
		super(LazyProxyModuleA.NAME);
	}

	public function lazyMap() : Void {
		proxyMap.lazyMap(LazyProxy);
	}

	public function normalMap() : Void {
		proxyMap.map(new LazyProxy());
	}

	public function createProxyWithLazyInject() : Void {
		proxyMap.map(new LazyNormalProxy());
	}

	public function mapNotProxy() : Void {
		proxyMap.lazyMap(Sprite);
	}

	public function mapWithParams(params : Array<Dynamic>) : Void {
		proxyMap.lazyMap(LazyProxy, null, "", params);
	}

}

