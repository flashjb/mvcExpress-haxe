// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.mediatormap;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceMediatorMap_map extends TraceObj {

	public var viewClass : Class<Dynamic>;
	public var mediatorClass : Class<Dynamic>;
	public function new(moduleName : String, viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic>) {
		super(MvcTraceActions.MEDIATORMAP_MAP, moduleName);
		this.viewClass = viewClass;
		this.mediatorClass = mediatorClass;
	}

	override public function toString() : String {
		return "§§§+ " + MvcTraceActions.MEDIATORMAP_MAP + " > viewClass : " + viewClass + ", mediatorClass : " + mediatorClass + "     {" + moduleName + "}";
	}

}

