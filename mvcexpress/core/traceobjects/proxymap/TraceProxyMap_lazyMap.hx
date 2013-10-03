// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.proxymap;

import flash.display.DisplayObject;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Proxy;

class TraceProxyMap_lazyMap extends TraceObj {

	public var proxyClass : Class<Dynamic>;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var proxyParams : Array<Dynamic>;
	public var dependencies : Array<Dynamic>;
	public var view : DisplayObject;
	public function new(moduleName : String, proxyClass : Class<Dynamic>, injectClass : Class<Dynamic>, name : String, proxyParams : Array<Dynamic>) {
		super(MvcTraceActions.PROXYMAP_LAZYMAP, moduleName);
		this.proxyParams = proxyParams;
		this.proxyClass = proxyClass;
		this.injectClass = injectClass;
		this.name = name;
	}

	override public function toString() : String {
		return "¶¶¶+ " + MvcTraceActions.PROXYMAP_LAZYMAP + " > proxyClass : " + proxyClass + ", injectClass : " + injectClass + ", name : " + name + ", proxyParams : " + proxyParams + "     {" + moduleName + "}";
	}

}

