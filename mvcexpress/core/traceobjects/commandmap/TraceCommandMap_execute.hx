// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.commandmap;


import mvcexpress.core.ModuleBase;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.Mediator;
import mvcexpress.mvc.Proxy;

class TraceCommandMap_execute extends TraceObj 
{

	public var commandObject : Command;
	public var commandClass : Class<Dynamic>;
	public var params : Dynamic;
	public var view : Dynamic;
	public var messageFromModule : ModuleBase;
	public var messageFromMediator : Mediator;
	public var messageFromProxy : Proxy;
	public var messageFromCommand : Command;
	
	public function new(moduleName : String, commandObject : Command, commandClass : Class<Dynamic>, params : Dynamic) 
	{
		super(MvcTraceActions.COMMANDMAP_EXECUTE, moduleName);
		this.commandObject = commandObject;
		this.commandClass = commandClass;
		this.params = params;
	}

	override public function toString() : String {
		return "©* " + MvcTraceActions.COMMANDMAP_EXECUTE + " > commandClass : " +  commandClass  + ", params : " + params + "     {" + moduleName + "}";
	}

}

