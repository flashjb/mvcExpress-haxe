// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.mediatormap;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceMediatorMap_unmap extends TraceObj {

	public var viewClass : Class<Dynamic>;
	public function new(moduleName : String, viewClass : Class<Dynamic>) {
		super(MvcTraceActions.MEDIATORMAP_UNMAP, moduleName);
		this.viewClass = viewClass;
	}

	override public function toString() : String {
		return "§§§- " + MvcTraceActions.MEDIATORMAP_UNMAP + " > viewClass : " + viewClass + "     {" + moduleName + "}";
	}

}

