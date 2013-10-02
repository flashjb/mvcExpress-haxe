// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.mediatormap;

import flash.display.DisplayObject;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Mediator;

class TraceMediatorMap_mediate extends TraceObj {

	public var viewObject : Dynamic;
	public var mediatorObject : Mediator;
	public var viewClass : Class<Dynamic>;
	public var mediatorClass : Class<Dynamic>;
	public var mediatorClassName : String;
	public var view : DisplayObject;
	public var dependencies : Array<Dynamic>;
	public var handleObjects : Array<Dynamic>;
	public function new(moduleName : String, viewObject : Dynamic, mediatorObject : Mediator, viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic>, mediatorClassName : String) {
		super(MvcTraceActions.MEDIATORMAP_MEDIATE, moduleName);
		this.viewObject = viewObject;
		this.mediatorObject = mediatorObject;
		this.viewClass = viewClass;
		this.mediatorClass = mediatorClass;
		this.mediatorClassName = mediatorClassName;
	}

	override public function toString() : String {
		return "§*+ " + MvcTraceActions.MEDIATORMAP_MEDIATE + " > viewObject : " + viewObject + " (viewClass:" + viewClass + ")" + " WITH > mediatorClass : " + mediatorClass + "     {" + moduleName + "}";
	}

}

