/**
 * CLASS COMMENT
 * 
 */
package integration.lazyproxy.testobj.modulea;

import mvcexpress.mvc.Proxy;

class LazyNormalProxy extends Proxy {

	@inject
	public var lazyProxy : LazyProxy;
	
	public function new() 
	{
		super();
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

}

