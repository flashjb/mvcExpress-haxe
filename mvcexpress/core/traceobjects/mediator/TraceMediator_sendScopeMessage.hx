// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.mediator;

////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj_SendMessage;
import mvcexpress.mvc.Mediator;

class TraceMediator_sendScopeMessage extends TraceObj_SendMessage {

	public var type : String;
	public var params : Dynamic;
	public function new(moduleName : String, mediatorObject : Mediator, type : String, params : Dynamic, preSend : Bool) {
		//use namespace pureLegsCore;
		super((((preSend)) ? MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE : MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE_CLEAN), moduleName);
		this.mediatorObject = mediatorObject;
		this.type = type;
		this.params = params;
		//
		canPrint = false;
	}

}

