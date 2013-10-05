/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.modulemain;

import mvcexpress.mvc.Proxy;

class MainDataProxy extends Proxy 
{

	public var localCommandCount : Int;
	public var localHandlerCount : Int;
	public var remoteCommandCount : Int;
	public var remoteHandlerCount : Int;
	
	public var testProxy : Proxy;
	
	public function new() 
	{
		super();
		localCommandCount = 0;
		localHandlerCount = 0;
		remoteCommandCount = 0;
		remoteHandlerCount = 0;
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

	public function getTestProxy(proxyClass : Class<Dynamic>, name : String) : Proxy {
		return proxyMap.getProxy(proxyClass, name);
	}

}

