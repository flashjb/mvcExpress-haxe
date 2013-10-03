/**
 * COMMENT
 * 
 */
package suites.proxymap.namedproxytestobj;

import mvcexpress.mvc.Proxy;
import suites.proxymap.proxytestobj.ITestProxy;
import suites.proxymap.proxytestobj.TestProxy;

class NamedProxyTestingProxy extends Proxy {

	
	public var proxy : TestProxy;
	
	public var proxyInterface : ITestProxy;
	
	public var proxyNamedInterface : ITestProxy;
	
	public var proxyNamed : TestProxy;
	
	public var proxyNamedNotNullClass : TestProxy;
}

