/**
 * CLASS COMMENT
 * 
 */
package integration.scopedmessaging.testobj.modulea;

import integration.scopedmessaging.testobj.moduleb.ChannelModuleB;
import mvcexpress.mvc.Command;

class ComTest1Command extends Command {

	//[Inject]
	//public var myProxy:MyProxy;
	public function execute(moduleB : ChannelModuleB) : Void {
		moduleB.command1executed = true;
	}

}

