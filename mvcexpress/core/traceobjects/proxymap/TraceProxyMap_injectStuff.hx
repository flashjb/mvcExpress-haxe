// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.proxymap;

import mvcexpress.core.inject.InjectRuleVO;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceProxyMap_injectStuff extends TraceObj {

	public var hostObject : Dynamic;
	public var injectObject : Dynamic;
	public var rule : InjectRuleVO;
	public function new(moduleName : String, hostObject : Dynamic, injectObject : Dynamic, rule : InjectRuleVO) {
		//use namespace pureLegsCore;
		super(MvcTraceActions.PROXYMAP_INJECTSTUFF, moduleName);
		this.hostObject = hostObject;
		this.injectObject = injectObject;
		this.rule = rule;
		//
		canPrint = false;
	}

}

