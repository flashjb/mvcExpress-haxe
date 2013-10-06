/**
 * CLASS COMMENT
 * 
 */
package integration.proxymap.testobj;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Proxy;

class TexsWithConstNameInjectProxy extends Proxy {

	
	@inject({constName:"integration.proxyMap.testObj.TestConstObject.TEST_CONST_FOR_PROXY_INJECT"})
	public var genericTestProxy : GenericTestProxy;
	
	public function new() {
		super();
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

}

