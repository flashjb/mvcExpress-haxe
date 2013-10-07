/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj.controller;

import integration.commandpooling.testobj.CommPoolingDependencyProxy;
import mvcexpress.mvc.PooledCommand;

class CommPoolingDependantCommand extends PooledCommand {

	static public var test : String = "aoeuaoeu";
	static public var constructCount : Int = 0;
	static public var executeCount : Int = 0;
	
	@inject
	public var dependency : CommPoolingDependencyProxy;
	
	
	public function new() {
		CommPoolingDependantCommand.constructCount++;
		super();
	}

	public function execute(blank : Dynamic) : Void {
		CommPoolingDependantCommand.executeCount++;
	}

}

