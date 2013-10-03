// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.proxy;

import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj_SendMessage;
import mvcexpress.mvc.Proxy;

class TraceProxy_sendScopeMessage extends TraceObj_SendMessage 
{

	public var type : String;
	public var params : Dynamic;
	public function new(moduleName : String, proxyObject : Proxy, type : String, params : Dynamic, preSend : Bool) {
		//use namespace pureLegsCore;
		super((((preSend)) ? MvcTraceActions.PROXY_SENDSCOPEMESSAGE : MvcTraceActions.PROXY_SENDSCOPEMESSAGE_CLEAN), moduleName);
		this.proxyObject = proxyObject;
		this.type = type;
		this.params = params;
		//
		canPrint = false;
	}

}

