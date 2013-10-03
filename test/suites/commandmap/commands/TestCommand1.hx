/**
 * COMMENT
 * 
 */
package suites.commandmap.commands;

import flash.display.Sprite;
import mvcexpress.mvc.Command;

class TestCommand1 extends Command {

	static public var TEST_FUNCTION : Dynamic = function(msg : Dynamic) : Void {
		//trace("TestCommand1 executed...")
	}
;
	public function execute(params : Dynamic) : Void {
		//trace("TestCommand1.execute > msg : " + msg);
		TestCommand1.TEST_FUNCTION(params);
	}

}

