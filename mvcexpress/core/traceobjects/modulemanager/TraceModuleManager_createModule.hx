// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.modulemanager;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceModuleManager_createModule extends TraceObj {

	public var autoInit : Bool;
	public function new(moduleName : String, autoInit : Bool) {
		super(MvcTraceActions.MODULEMANAGER_CREATEMODULE, moduleName);
		this.autoInit = autoInit;
	}

	override public function toString() : String {
		return "#####+ " + MvcTraceActions.MODULEMANAGER_CREATEMODULE + " > moduleName : " + moduleName + ", autoInit : " + autoInit;
	}

}

