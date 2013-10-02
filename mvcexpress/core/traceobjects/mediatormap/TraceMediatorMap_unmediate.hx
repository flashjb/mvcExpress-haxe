// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.mediatormap;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Mediator;

class TraceMediatorMap_unmediate extends TraceObj {

	public var viewObject : Dynamic;
	public var mediatorObject : Mediator;
	public var viewClass : Class<Dynamic>;
	public var mediatorClass : Class<Dynamic>;
	public var mediatorClassName : String;
	public function new(moduleName : String, viewObject : Dynamic) {
		super(MvcTraceActions.MEDIATORMAP_UNMEDIATE, moduleName);
		this.viewObject = viewObject;
	}

	override public function toString() : String {
		return "§*- " + MvcTraceActions.MEDIATORMAP_UNMEDIATE + " > viewObject : " + viewObject + "     {" + moduleName + "}";
	}

}

