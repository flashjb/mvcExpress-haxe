// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.modulemanager;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceModuleManager_registerScope extends TraceObj {

	public var scopeName : String;
	public var messageSending : Bool;
	public var messageReceiving : Bool;
	public var proxieMap : Bool;
	public function new(moduleName : String, scopeName : String, messageSending : Bool, messageReceiving : Bool, proxieMap : Bool) {
		super(MvcTraceActions.MODULEMANAGER_CREATEMODULE, moduleName);
		this.scopeName = scopeName;
		this.messageSending = messageSending;
		this.messageReceiving = messageReceiving;
		this.proxieMap = proxieMap;
	}

	override public function toString() : String {
		return "##**++ " + MvcTraceActions.MODULEMANAGER_CREATEMODULE + " > moduleName : " + moduleName + " scopeName=" + scopeName + " messageSending=" + messageSending + " messageReceiving=" + messageReceiving + " proxieMap=" + proxieMap + "]";
	}

}

