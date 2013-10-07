/**
 * COMMENT
 * 
 */
package suites.commandmap.commands;

import flash.display.Sprite;
import mvcexpress.mvc.Command;
import suites.testobjects.ExtendedTestObject;

class TestCommand1 extends Command {

	static public var TEST_FUNCTION : Dynamic = function(msg : Dynamic) : Void {
		//trace("TestCommand1.TEST_FUNCTION > msg : " + msg);
	}
;
	public function execute(params : Dynamic) : Void {
		//trace("TestCommand1.execute > params : " + params);
		TestCommand1.TEST_FUNCTION(params);
	}

}

