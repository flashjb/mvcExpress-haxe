/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj.controller;

import mvcexpress.mvc.PooledCommand;

class CommPoolingUnlockedCommand extends PooledCommand {

	static public var test : String = "aoeuaoeu";
	static public var constructCount : Int = 0;
	static public var executeCount : Int = 0;
	public function new() {
		CommPoolingUnlockedCommand.constructCount++;
		super();
	}

	public function execute(blank : Dynamic) : Void {
		CommPoolingUnlockedCommand.executeCount++;
		unlock();
	}

}

