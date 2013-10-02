// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.modulemanager;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceModuleManager_unregisterScope extends TraceObj {

	public var scopeName : String;
	public function new(moduleName : String, scopeName : String) {
		super(MvcTraceActions.MODULEMANAGER_UNREGISTERSCOPE, moduleName);
		this.scopeName = scopeName;
	}

	override public function toString() : String {
		return "##**-- " + MvcTraceActions.MODULEMANAGER_UNREGISTERSCOPE + " > moduleName : " + moduleName + ", scopeName : " + scopeName;
	}

}

