// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.mediator;

////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Mediator;

class TraceMediator_addHandler extends TraceObj {

	public var type : String;
	public var handler : Dynamic;
	public var mediatorObject : Mediator;
	public function new(moduleName : String, mediatorObject : Mediator, type : String, handler : Dynamic) {
		//use namespace pureLegsCore;
		super(MvcTraceActions.MEDIATOR_ADDHANDLER, moduleName);
		this.mediatorObject = mediatorObject;
		this.type = type;
		this.handler = handler;
		//
		canPrint = false;
	}

}

