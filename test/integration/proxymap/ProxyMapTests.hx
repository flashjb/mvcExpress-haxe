/**
 * COMMENT
 * 
 */
package integration.proxymap;

import flash.display.Sprite;
import integration.agenerictestobjects.GenericTestModule;
import integration.agenerictestobjects.model.GenericTestProxy;
import integration.proxymap.testobj.CestConstCommand;
import integration.proxymap.testobj.TestConstObject;
import integration.proxymap.testobj.TestContsView;
import integration.proxymap.testobj.TestContsViewMediator;
import integration.proxymap.testobj.TexsWithConstNameInjectProxy;

class ProxyMapTests {

	var module : GenericTestModule;
	
	public function runBeforeEveryTest() : Void {
		module = new GenericTestModule("ProxyMap_test");
	}

	
	public function runAfterEveryTest() : Void {
		module.disposeModule();
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function proxyMap_injectIntoProxyConstNamedVariable_injectedOk() : Void {
		var testProxy : GenericTestProxy = new GenericTestProxy();
		module.proxymap_map(testProxy, null, TestConstObject.TEST_CONST_FOR_PROXY_INJECT);
		//
		module.proxymap_map(new TexsWithConstNameInjectProxy());
	}

	
	public function proxyMap_injectIntoMediatorConstNamedVariable_injectedOk() : Void {
		var testProxy : GenericTestProxy = new GenericTestProxy();
		module.proxymap_map(testProxy, null, TestConstObject.TEST_CONST_FOR_PROXY_INJECT);
		//
		module.mediatorMap_mediateWith(new TestContsView(), TestContsViewMediator);
	}

	
	public function proxyMap_injectIntoCommandConstNamedVariable_injectedOk() : Void {
		var testProxy : GenericTestProxy = new GenericTestProxy();
		module.proxymap_map(testProxy, null, TestConstObject.TEST_CONST_FOR_PROXY_INJECT);
		//
		//module.mapProxy(new TexsWithConstNameInjectProxy());
		module.commandMap_execute(CestConstCommand);
	}

}

