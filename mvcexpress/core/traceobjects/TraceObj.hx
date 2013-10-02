// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Base of all trace objects.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 * @private
 */
package mvcexpress.core.traceobjects;

class TraceObj {

	public var moduleName : String;
	public var action : String;
	// can print debug text.
	public var canPrint : Bool;
	public function new( action : String, moduleName : String) {
		canPrint = true;
		this.action = action;
		this.moduleName = moduleName;
	}

	public function toString() : String {
		return "[TraceObj moduleName=" + moduleName + " action=" + action + "]";
	}

}

