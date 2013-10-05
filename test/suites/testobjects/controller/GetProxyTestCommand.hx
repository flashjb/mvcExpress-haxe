/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.controller;

import mvcexpress.mvc.Command;
import suites.testobjects.modulemain.MainDataProxy;

class GetProxyTestCommand extends Command {

	
	@inject public var dataProxy : MainDataProxy;
	
	public function execute(proxyData : Dynamic) : Void {
		dataProxy.testProxy = proxyMap.getProxy(proxyData.moduleClass, proxyData.moduleName);
	}

}

