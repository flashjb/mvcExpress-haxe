package integration.commandpooling.testobj.controller;

import mvcexpress.mvc.Command;

class CommPoolingDependencyRemove extends Command {

	public function execute(proxyClass : Class<Dynamic>) : Void {
		proxyMap.unmap(proxyClass);
	}

}

