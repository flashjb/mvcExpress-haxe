// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.commandmap;

import flash.display.DisplayObject;
import mvcexpress.core.ModuleBase;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.Mediator;
import mvcexpress.mvc.Proxy;

class TraceCommandMap_handleCommandExecute extends TraceObj {

	public var commandObject : Command;
	public var commandClass : Class<Dynamic>;
	public var type : String;
	public var params : Dynamic;
	public var view : DisplayObject;
	public var messageFromModule : ModuleBase;
	public var messageFromMediator : Mediator;
	public var messageFromProxy : Proxy;
	public var messageFromCommand : Command;
	
	public function new(moduleName : String, commandObject : Command, commandClass : Class<Dynamic>, type : String, params : Dynamic) 
	{
		super(MvcTraceActions.COMMANDMAP_HANDLECOMMANDEXECUTE, moduleName);
		this.commandObject = commandObject;
		this.commandClass = commandClass;
		this.type = type;
		params = params;
	}

	override public function toString() : String {
		return "©* " + MvcTraceActions.COMMANDMAP_HANDLECOMMANDEXECUTE + " > messageType : " + type + ", params : " + params + " Executed with : " + commandClass + "{" + moduleName + "}";
	}

}

