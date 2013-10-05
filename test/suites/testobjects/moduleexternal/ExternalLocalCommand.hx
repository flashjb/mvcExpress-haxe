/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.moduleexternal;

import mvcexpress.mvc.Command;

class ExternalLocalCommand extends Command {

	
	@inject public var dataProxy : ExternalDataProxy;
	
	public function execute(blank : Dynamic) : Void {
		dataProxy.localCommandCount++;
	}

}

