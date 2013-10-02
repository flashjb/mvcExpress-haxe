// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.messenger;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceMessenger_removeHandler extends TraceObj {

	public var type : String;
	public var handler : Dynamic;
	public function new(moduleName : String, ptype : String, phandler : Dynamic) {
		super(MvcTraceActions.MESSENGER_REMOVEHANDLER, moduleName);
		type = ptype;
		handler = phandler;
	}

	override public function toString() : String {
		return "••<- " + MvcTraceActions.MESSENGER_REMOVEHANDLER + " > type : " + type + "     {" + moduleName + "}";
	}

}

