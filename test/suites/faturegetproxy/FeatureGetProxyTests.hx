/**
 * COMMENT
 * 
 */
package suites.faturegetproxy;

import utils.Assert;
import suites.testobjects.model.ISimpleTestProxy;
import suites.testobjects.model.SimpleTestProxy;
import suites.testobjects.modulemain.MainModule;

class FeatureGetProxyTests {

	var mainModule : MainModule;
	//private var externalModule:ExternalModule;
	
	public function runBeforeEveryTest() : Void {
		mainModule = new MainModule();
		//externalModule = new ExternalModule();
	}

	
	public function runAfterEveryTest() : Void {
		mainModule.disposeModule();
		//externalModule.disposeModule();
	}

	//----------------------------------
	//     Get simple proxy
	//----------------------------------
	
	public function featureGetProxy_get_proxy_in_proxy() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy);
		var returnedObj : Dynamic = mainModule.getProxyFromProxy(SimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_in_mediator() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy);
		var returnedObj : Dynamic = mainModule.getProxyFromMediator(SimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_in_command() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy);
		var returnedObj : Dynamic = mainModule.getProxyInCommand(SimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_in_module() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy);
		var returnedObj : Dynamic = mainModule.getTestProxy(SimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.", testProxy, returnedObj);
	}

	//----------------------------------
	//     Get interfaced proxy
	//----------------------------------
	
	public function featureGetProxy_get_proxy_interfaced_in_proxy() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy);
		var returnedObj : Dynamic = mainModule.getProxyFromProxy(ISimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_in_mediator() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy);
		var returnedObj : Dynamic = mainModule.getProxyFromMediator(ISimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_in_command() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy);
		var returnedObj : Dynamic = mainModule.getProxyInCommand(ISimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_in_module() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy);
		var returnedObj : Dynamic = mainModule.getTestProxy(ISimpleTestProxy);
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.", testProxy, returnedObj);
	}

	//----------------------------------
	//     Get interfaced and named proxy
	//----------------------------------
	
	public function featureGetProxy_get_proxy_interfaced_named_in_proxy() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy, "testName");
		var returnedObj : Dynamic = mainModule.getProxyFromProxy(ISimpleTestProxy, "testName");
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_named_in_mediator() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy, "testName");
		var returnedObj : Dynamic = mainModule.getProxyFromMediator(ISimpleTestProxy, "testName");
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_named_in_command() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy, "testName");
		var returnedObj : Dynamic = mainModule.getProxyInCommand(ISimpleTestProxy, "testName");
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.", testProxy, returnedObj);
	}

	
	public function featureGetProxy_get_proxy_interfaced_named_in_module() : Void {
		var testProxy : SimpleTestProxy = new SimpleTestProxy();
		mainModule.mapTestProxy(testProxy, ISimpleTestProxy, "testName");
		var returnedObj : Dynamic = mainModule.getTestProxy(ISimpleTestProxy, "testName");
		Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.", testProxy, returnedObj);
	}

}

