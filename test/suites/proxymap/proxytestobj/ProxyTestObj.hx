/**
 * COMMENT
 * 
 */
package suites.proxymap.proxytestobj;

//need @:rtti if you wanna get inject works for external object 
//==> not recommanded for complex objects
@:rtti 
class ProxyTestObj 
{
	
//	@inject({"name":"toto", "scope":"tata"}) 
	//@inject({"constName":"titi", "constScope":"tutu"}) 
//	@inject({"name":"toto"}) 
	@inject( ) 
	public var testProxy : TestProxy;
	
	
	public var testProxy1112 : TestProxy;
	/*
	@inject( ) 
	public var testProxy2 : Dynamic;
	*/
	public function new() {
	}

}

