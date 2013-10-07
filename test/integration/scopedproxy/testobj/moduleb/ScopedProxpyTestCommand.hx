/**
 * CLASS COMMENT
 * 
 */
package integration.scopedproxy.testobj.moduleb;

import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import mvcexpress.mvc.Command;

class ScopedProxpyTestCommand extends Command {

	@inject({scope:"proxyScope"})
	public var myProxy : ScopedTestProxy;
	
	public function execute(testData : String) : Void {
		myProxy.storedData = testData;
	}

}

