/**
 * COMMENT : todo
 * 
 */
package integration.scopedproxy.testobj.modulea;

import flash.display.Sprite;
import flash.events.Event;
import integration.scopedproxy.ScopedProxyTests;
import mvcexpress.modules.ModuleCore;

class ScopedProxyModuleA extends ModuleCore {

	var testViewObject : ScopedProxyLocalInjectView;
	static public var NAME : String = "ScopedProxyModuleA";
	public function new() {
		super(ScopedProxyModuleA.NAME);
	}

	public function hostTestProxy(scopedTestProxy : ScopedTestProxy) : Void {
		//trace( "ScopedProxyModuleA.hostTestProxy > scopedTestProxy : " + scopedTestProxy );
		registerScope(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, true, true, true);
		proxyMap.scopeMap(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, scopedTestProxy);
	}

	public function unhostTestProxy(injectClass : Class<Dynamic>) : Void {
		proxyMap.scopeUnmap(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, injectClass);
	}

	public function trigerMediatorMessage(testData : String) : Void {
	}

	public function mapTestProxy(scopedTestProxy : ScopedTestProxy) : Void {
		proxyMap.map(scopedTestProxy);
	}

	public function createMediatorWithLocalItject() : Void {
		testViewObject = new ScopedProxyLocalInjectView();
		mediatorMap.map(ScopedProxyLocalInjectView, ScopedProxyLocalInjectMediator);
		mediatorMap.mediate(testViewObject);
	}

	public function getMediatorProxyTestData() : Void {
	}

	override function onInit() : Void {
		registerScope(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, true, true, true);
	}

	override function onDispose() : Void {
	}

}

