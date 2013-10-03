// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects;

import mvcexpress.core.ModuleBase;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.Mediator;
import mvcexpress.mvc.Proxy;

class TraceObj_SendMessage extends TraceObj {

	public var moduleObject : ModuleBase;
	public var commandObject : Command;
	public var proxyObject : Proxy;
	public var mediatorObject : Mediator;
	public function new(action : String, moduleName : String) {
		super(action, moduleName);
		//
		canPrint = false;
	}

}

