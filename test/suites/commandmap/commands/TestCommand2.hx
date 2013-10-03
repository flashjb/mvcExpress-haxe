/**
 * COMMENT
 * 
 */
package suites.commandmap.commands;

import mvcexpress.mvc.Command;

class TestCommand2 extends Command {

	static public var TEST_FUNCTION : Dynamic = function(msg : Dynamic) : Void {
		//trace("TestCommand2 executed...")
	}
;
	public function execute(params : Dynamic) : Void {
		//trace("TestCommand2.execute > msg : " + msg);
		TestCommand2.TEST_FUNCTION(params);
	}

}

