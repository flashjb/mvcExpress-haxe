/**
 * CLASS COMMENT
 * 
 */
package integration.proxymap.testobj;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Proxy;
import integration.proxymap.testobj.TestConstObject;

class TexsWithConstNameInjectProxy extends Proxy {

	
	@inject({constName:"integration.proxymap.testobj.TestConstObject.TEST_CONST_FOR_PROXY_INJECT"})
	public var genericTestProxy : GenericTestProxy;
	
	public function new() {
		super();
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

}

