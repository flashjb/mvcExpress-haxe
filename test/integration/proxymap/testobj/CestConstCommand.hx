/**
 * CLASS COMMENT
 * 
 */
package integration.proxymap.testobj;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Command;

class CestConstCommand extends Command {

	@inject({constName:"integration.proxymap.testobj.TestConstObject.TEST_CONST_FOR_PROXY_INJECT"})
	public var genericTestProxy : GenericTestProxy;
	
	public function execute(blank : Dynamic) : Void {
	}

}

