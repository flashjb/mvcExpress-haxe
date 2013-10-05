/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.modulemain;

import mvcexpress.mvc.Command;

class MainLocalCommand extends Command 
{
	
	@inject 
	public var dataProxy : MainDataProxy;
	
	public function execute(blank : Dynamic) : Void {
		dataProxy.localCommandCount++;
	}

}

