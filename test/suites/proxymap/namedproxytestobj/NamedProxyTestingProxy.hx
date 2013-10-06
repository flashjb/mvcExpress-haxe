/**
 * COMMENT
 * 
 */
package suites.proxymap.namedproxytestobj;

import mvcexpress.mvc.Proxy;
import suites.proxymap.proxytestobj.ITestProxy;
import suites.proxymap.proxytestobj.TestProxy;

class NamedProxyTestingProxy extends Proxy {

	@inject()
	public var proxy : TestProxy;
	
	@inject()
	public var proxyInterface : ITestProxy;
	
	@inject({name:"namedProxyInterface"})
	public var proxyNamedInterface : ITestProxy;
	
	@inject({name:"namedProxy"})
	public var proxyNamed : TestProxy;
	
	@inject({name:"namedProxyNotNullClass"})
	public var proxyNamedNotNullClass : TestProxy;
}

