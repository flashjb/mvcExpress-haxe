/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.moduleexternal;

import mvcexpress.mvc.Command;

class ExternalRemoteCommand extends Command {

	
	public var dataProxy : ExternalDataProxy;
	public function execute(blank : Dynamic) : Void {
		dataProxy.remoteCommandCount++;
	}

}

