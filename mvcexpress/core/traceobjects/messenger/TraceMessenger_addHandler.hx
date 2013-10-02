// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.messenger;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceMessenger_addHandler extends TraceObj {

	public var type : String;
	public var handler : Dynamic;
	public var handlerClassName : String;
	public function new(moduleName : String, ptype : String, phandler : Dynamic, phandlerClassName : String) {
		super(MvcTraceActions.MESSENGER_ADDHANDLER, moduleName);
		type = ptype;
		handler = phandler;
		handlerClassName = phandlerClassName;
	}

	override public function toString() : String {
		return "••<+ " + MvcTraceActions.MESSENGER_ADDHANDLER + " > type : " + type + ", handlerClassName : " + handlerClassName + "     {" + moduleName + "}";
	}

}

