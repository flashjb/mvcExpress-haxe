// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.messenger;

import mvcexpress.core.ModuleBase;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.Mediator;
import mvcexpress.mvc.Proxy;

class TraceMessenger_send_handler extends TraceObj {

	public var type : String;
	public var params : Dynamic;
	public var handler : Dynamic;
	public var handlerClassName : String;
	public var messageFromModule : ModuleBase;
	public var messageFromMediator : Mediator;
	public var messageFromProxy : Proxy;
	public var messageFromCommand : Command;
	public function new(moduleName : String, type : String, params : Dynamic, handler : Dynamic, handlerClassName : String) {
		use;
		namespace;
		pureLegsCore;
		super(MvcTraceActions.MESSENGER_SEND_HANDLER, moduleName);
		this.type = type;
		this.params = params;
		this.handler = handler;
		this.handlerClassName = handlerClassName;
		//
		canPrint = false;
	}

}

