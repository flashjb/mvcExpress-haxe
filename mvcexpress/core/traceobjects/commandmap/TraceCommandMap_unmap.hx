// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects.commandmap;

import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj;

class TraceCommandMap_unmap extends TraceObj {

	public var type : String;
	public var commandClass : Class<Dynamic>;
	public function new(moduleName : String, type : String, commandClass : Class<Dynamic>) {
		super(MvcTraceActions.COMMANDMAP_UNMAP, moduleName);
		this.type = type;
		this.commandClass = commandClass;
	}

	override public function toString() : String {
		return "©©©- " + MvcTraceActions.COMMANDMAP_UNMAP + " > type : " + type + ", commandClass : " + commandClass + "     {" + moduleName + "}";
	}

}

