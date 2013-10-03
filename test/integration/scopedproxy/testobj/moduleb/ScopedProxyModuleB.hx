/**
 * COMMENT : todo
 * 
 */
package integration.scopedproxy.testobj.moduleb;

import flash.display.Sprite;
import flash.events.Event;
import integration.scopedproxy.ScopedProxyTests;
import mvcexpress.modules.ModuleCore;

class ScopedProxyModuleB extends ModuleCore {

	var view : Sprite;
	var testViewObject : ScopedProxyInjectView;
	var testProxy : ScopedProxyInjectProxy;
	static public var NAME : String = "ScopedProxyModuleB";
	static public var TEST_FUNCTION : Dynamic = function(msg : Dynamic) : Void {
		//trace( "TEST_FUNCTION : " + TEST_FUNCTION );
	}
;
	public function new() {
		super(ScopedProxyModuleB.NAME);
	}

	public function createMediatorWithItject() : Void {
		testViewObject = new ScopedProxyInjectView();
		mediatorMap.map(ScopedProxyInjectView, ScopedProxyInjectMediator);
		mediatorMap.mediate(testViewObject);
	}

	public function storeStuffToMediator(testData : String) : Void {
		testViewObject.sendDataToProxy(testData);
	}

	public function createProxyWithItject() : Void {
		testProxy = new ScopedProxyInjectProxy();
		proxyMap.map(testProxy);
	}

	public function storeStuffToProxy(testData : String) : Void {
		testProxy.storeTestData(testData);
	}

	public function storeStuffToCommand(testData : String) : Void {
		commandMap.execute(ScopedProxpyTestCommand, testData);
	}

	public function getMediatorProxyTestData() : String {
		return testViewObject.testData;
	}

	override function onInit() : Void {
		registerScope(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, true, true, true);
	}

	override function onDispose() : Void {
	}

}

