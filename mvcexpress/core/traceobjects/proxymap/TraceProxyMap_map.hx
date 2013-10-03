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

class TraceProxyMap_map extends TraceObj 
{

	public var proxyObject : Proxy;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var dependencies : Array<Dynamic>;
	public var view : DisplayObject;
	
	public function new(moduleName : String, proxyObject : Proxy, injectClass : Class<Dynamic>, name : String) 
	{
		super(MvcTraceActions.PROXYMAP_MAP, moduleName);
		this.proxyObject = proxyObject;
		this.injectClass = injectClass;
		this.name = name;
	}

	override public function toString() : String {
		return "¶¶¶+ " + MvcTraceActions.PROXYMAP_MAP + " > proxyObject : " + proxyObject + ", injectClass : " + injectClass + ", name : " + name + "     {" + moduleName + "}";
	}

}

