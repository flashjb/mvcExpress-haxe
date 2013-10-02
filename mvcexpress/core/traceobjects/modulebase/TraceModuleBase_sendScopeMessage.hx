// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.modulebase;

import mvcexpress.core.ModuleBase;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj_SendMessage;

class TraceModuleBase_sendScopeMessage extends TraceObj_SendMessage {

	public var type : String;
	public var params : Dynamic;
	public function new(moduleName : String, moduleObject : ModuleBase, type : String, params : Dynamic, preSend : Bool) {
		//use namespace pureLegsCore;
		super((((preSend)) ? MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE : MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE_CLEAN), moduleName);
		this.moduleObject = moduleObject;
		this.type = type;
		this.params = params;
		//
		canPrint = false;
	}

}

