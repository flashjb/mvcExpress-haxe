/**
 * CLASS COMMENT
 * 
 */
package integration.scopedproxy.testobj.moduleb;

import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import mvcexpress.mvc.Proxy;

class ScopedProxyInjectProxy extends Proxy {

	
	public var myProxy : ScopedTestProxy;
	public function new() {
		super();
	}

	public function storeTestData(testData : String) : Void {
		myProxy.storedData = testData;
	}

	override function onRegister() : Void {
		trace("ScopedProxyInjectProxy.onRegister");
	}

	override function onRemove() : Void {
	}

}

