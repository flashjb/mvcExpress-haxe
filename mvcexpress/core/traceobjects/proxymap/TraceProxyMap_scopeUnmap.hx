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

class TraceProxyMap_scopeUnmap extends TraceObj 
{
	public var scopeName : String;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var dependencies : Array<Dynamic>;
	public var view : DisplayObject;
	
	public function new(moduleName : String, scopeName : String, injectClass : Class<Dynamic>, name : String) 
	{
		super(MvcTraceActions.PROXYMAP_SCOPEUNMAP, moduleName);
		this.scopeName = scopeName;
		this.injectClass = injectClass;
		this.name = name;
	}

	override public function toString() : String {
		return "{}¶¶¶¶- " + MvcTraceActions.PROXYMAP_SCOPEUNMAP + " > scopeName : " + scopeName + ", injectClass : " + injectClass + ", name : " + name + "     {" + moduleName + "}";
	}

}

