// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.proxymap;

import mvcexpress.core.inject.InjectRuleVO;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceProxyMap_scopedInjectPending extends TraceObj 
{

	public var scopeName : String;
	public var hostObject : Dynamic;
	public var injectObject : Dynamic;
	public var rule : InjectRuleVO;
	
	public function new(scopeName : String, moduleName : String, hostObject : Dynamic, injectObject : Dynamic, rule : InjectRuleVO) 
	{
		super(MvcTraceActions.PROXYMAP_INJECTPENDING, moduleName);
		this.scopeName = scopeName;
		this.hostObject = hostObject;
		this.injectObject = injectObject;
		this.rule = rule;
	}

	override public function toString() : String {
		return "!!!!! " + MvcTraceActions.PROXYMAP_INJECTPENDING + " > for scopeName:" + scopeName + " with id:" + rule.injectClassAndName + "(needed in " + hostObject + ")" + "     {" + moduleName + "}";
	}

}

