/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj.controller;

import integration.commandpooling.CommandPoolingTests;
import integration.commandpooling.testobj.CommPoolingDependencyProxy;
import mvcexpress.mvc.PooledCommand;

class CommPoolingLockedFailCommand extends PooledCommand {

	static public var test : String = "aoeuaoeu";
	static public var executedProxyNames : String = "";
	
	public var dependency : CommPoolingDependencyProxy;
	public function new() {
		super();
	}

	public function execute(blank : Dynamic) : Void {
		lock();
		CommPoolingLockedFailCommand.executedProxyNames += dependency.proxyName;
		sendMessage(CommandPoolingTests.EXECUTE_REMOVED_DEPENDENCY_COMMAND, CommPoolingDependencyProxy);
		unlock();
	}

}

