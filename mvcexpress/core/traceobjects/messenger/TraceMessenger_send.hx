// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.messenger;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceMessenger_send extends TraceObj {

	public var type : String;
	public var params : Dynamic;
	public function new(moduleName : String, type : String, params : Dynamic) {
		super(MvcTraceActions.MESSENGER_SEND, moduleName);
		this.type = type;
		this.params = params;
	}

	override public function toString() : String {
		return "•> " + MvcTraceActions.MESSENGER_SEND + " > type : " + type + ", params : " + params + "     {" + moduleName + "}";
	}

}

