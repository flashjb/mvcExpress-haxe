/**
 * COMMENT
 * 
 */
package suites.proxymap;

import utils.Assert;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
//import mvcexpress.core.namespace.PureLegsCore;
import suites.proxymap.proxytestobj.ITestProxy;
import suites.proxymap.proxytestobj.TestProxy;
import suites.proxymap.namedproxytestobj.NamedProxyTestingProxy;

class NamedInterfacedProxyMapTests extends Tester {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var namedTestingProxy : NamedProxyTestingProxy;
	
	public function new()
	{
		super();
		testFunction("class_proxy_not_null");
	}
	
	override public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		proxyMap = new ProxyMap("test", messenger);
	}

	
	override public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
		messenger = null;
		proxyMap = null;
	}

	
	public function class_proxy_not_null() : Void {
		//use namespace pureLegsCore
		proxyMap.map(new TestProxy());
		proxyMap.map(new TestProxy(), ITestProxy);
		proxyMap.map(new TestProxy(), ITestProxy, "namedProxyInterface");
		proxyMap.map(new TestProxy(), null, "namedProxy");
		proxyMap.map(new TestProxy(), TestProxy, "namedProxyNotNullClass");
		namedTestingProxy = new NamedProxyTestingProxy();
		proxyMap.injectStuff(namedTestingProxy, NamedProxyTestingProxy);
		
		Assert.assertNotNull("Fail at proxy must be not null:", namedTestingProxy.proxy);
		Assert.assertNotNull("Fail at proxyNamedNotNullClass must be not null:", namedTestingProxy.proxyNamedNotNullClass);
		Assert.assertNotNull("Fail at proxyInterface must be not null:", namedTestingProxy.proxyInterface);
		Assert.assertNotNull("Fail at proxyNamed must be not null:", namedTestingProxy.proxyNamed);
		Assert.assertNotNull("Fail at proxyNamedInterface must be not null:", namedTestingProxy.proxyNamedInterface);
	}

}

