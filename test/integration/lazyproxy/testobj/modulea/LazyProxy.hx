/**
 * CLASS COMMENT
 * 
 */
package integration.lazyproxy.testobj.modulea;

import mvcexpress.mvc.Proxy;

class LazyProxy extends Proxy {

	static public var instantiateCount : Int = 0;
	public function new() {
		LazyProxy.instantiateCount++;
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

}

