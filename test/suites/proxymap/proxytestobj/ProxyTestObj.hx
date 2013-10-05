/**
 * COMMENT
 * 
 */
package suites.proxymap.proxytestobj;

class ProxyTestObj 
{
	
	@inject({"name":"toto", "scope":"tata"}) 
	//@inject({"constName":"titi", "constScope":"tutu"}) 
//	@inject({"name":"toto"}) 
	//@inject( ) 
	public var testProxy : DifferentProxy;
	
	
	public var testProxy1112 : TestProxy;
	
	@inject( ) 
	public var testProxy2 : Dynamic;
	
	public function new() {
	}

}

