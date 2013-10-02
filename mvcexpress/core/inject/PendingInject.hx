// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * FOR INTERNAL USE ONLY.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.core.inject;

import haxe.Timer;

class PendingInject {

	/**
	 * Private class to store pending injection data.
	 * @private
	 */
	var injectClassAndName : String;
	public var pendingObject : Dynamic;
	public var signatureClass : Class<Dynamic>;
	var pendingInjectTime : Int;
	var timerId : Timer;
	public function new(injectClassAndName : String, pendingObject : Dynamic, signatureClass : Class<Dynamic>, pendingInjectTime : Int) {
		this.injectClassAndName = injectClassAndName;
		this.pendingObject = pendingObject;
		this.signatureClass = signatureClass;
		this.pendingInjectTime = pendingInjectTime;
		// start timer to throw an error of unresolved injection.
		timerId = Timer.delay(throwError, pendingInjectTime);
	}

	public function stopTimer() : Void {
		timerId.stop();
		timerId = null;
	}

	function throwError() : Void {
		throw cast(("Pending inject object is not resolved in " + (pendingInjectTime / 1000) + " second for class with id:" + injectClassAndName + "(needed in " + pendingObject + ")"), Error);
	}

}

