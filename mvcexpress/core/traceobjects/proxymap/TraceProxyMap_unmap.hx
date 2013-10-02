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

class TraceProxyMap_unmap extends TraceObj 
{
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var dependencies : Array<Dynamic>;
	public var view : DisplayObject;
	
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

