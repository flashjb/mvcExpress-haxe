// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Framework internal value data for message handlers.
 * HandlerVO is not removed instantly then handler is not needed, only marked for removal(by seting handler to null.).
 * 
 */
package mvcexpress.core.messenger;

class HandlerVO {

	/** FOR INTERNAL USE ONLY. function that handles message parameters, can be Mediator function or Command execute() function */
	public var handler : Dynamic;
	/** FOR INTERNAL USE ONLY. shows if message is handled by Command. */
	public var isExecutable : Bool;
	/** FOR INTERNAL USE ONLY. Variable to store class there handler came from. (for debugging only) */
	#if debug
		public var handlerClassName:String;
	#end
	
	public function new(){}
}

