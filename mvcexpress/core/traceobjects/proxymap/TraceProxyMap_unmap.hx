// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.proxymap;


import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceProxyMap_unmap extends TraceObj 
{
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var dependencies : Array<Dynamic>;
	public var view : Dynamic;
	
	public function new(moduleName : String, injectClass : Class<Dynamic>, name : String) 
	{
		super(MvcTraceActions.PROXYMAP_UNMAP, moduleName);
		this.injectClass = injectClass;
		this.name = name;
	}

	override public function toString() : String {
		return "¶¶¶¶- " + MvcTraceActions.COMMANDMAP_UNMAP + " > injectClass : " + injectClass + ", name : " + name + "     {" + moduleName + "}";
	}

}

