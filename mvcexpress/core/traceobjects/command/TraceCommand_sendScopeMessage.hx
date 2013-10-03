// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class for mvcExpress tracing. (debug mode only)
 * 
 * 
 */
package mvcexpress.core.traceobjects.command;

////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.MvcTraceActions;
import mvcexpress.core.traceobjects.TraceObj_SendMessage;
import mvcexpress.mvc.Command;

class TraceCommand_sendScopeMessage extends TraceObj_SendMessage 
{
	public var type : String;
	public var params : Dynamic;
	
	public function new(moduleName : String, commandObject : Command, type : String, params : Dynamic, preSend : Bool) 
	{
		//use namespace pureLegsCore;
		super( preSend ? MvcTraceActions.COMMAND_SENDSCOPEMESSAGE : MvcTraceActions.COMMAND_SENDSCOPEMESSAGE_CLEAN, moduleName );
		this.commandObject = commandObject;
		this.type = type;
		this.params = params;
		//
		canPrint = false;
	}

}

