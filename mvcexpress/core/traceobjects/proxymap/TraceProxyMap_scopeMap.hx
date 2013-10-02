// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.proxymap;

import flash.display.DisplayObject;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Proxy;

class TraceProxyMap_scopeMap extends TraceObj 
{

	public var scopeName : String;
	public var proxyObject : Proxy;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var dependencies : Array<Dynamic>;
	public var view : DisplayObject;
	
	public function new(moduleName : String, scopeName : String, proxyObject : Proxy, injectClass : Class<Dynamic>, name : String) 
	{
		super(MvcTraceActions.PROXYMAP_SCOPEMAP, moduleName);
		this.scopeName = scopeName;
		this.proxyObject = proxyObject;
		this.injectClass = injectClass;
		this.name = name;
	}

	override public function toString() : String {
		return "{}¶¶¶+ " + MvcTraceActions.PROXYMAP_SCOPEMAP + " > scopeName : " + scopeName + "proxyObject : " + proxyObject + ", injectClass : " + injectClass + ", name : " + name + "     {" + moduleName + "}";
	}

}

