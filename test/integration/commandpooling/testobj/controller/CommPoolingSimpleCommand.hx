/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj.controller;

import mvcexpress.mvc.PooledCommand;

class CommPoolingSimpleCommand extends PooledCommand {

	static public var test : String = "aoeuaoeu";
	static public var constructCount : Int = 0;
	static public var executeCount : Int = 0;
	//[Inject]
	//public var myProxy:MyProxy;
	public function new() {
		CommPoolingSimpleCommand.constructCount++;
		super();
	}

	public function execute(blank : Dynamic) : Void {
		CommPoolingSimpleCommand.executeCount++;
	}

}

