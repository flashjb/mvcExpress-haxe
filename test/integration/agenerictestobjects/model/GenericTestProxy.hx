/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.model;

import mvcexpress.mvc.Proxy;

class GenericTestProxy extends Proxy {

	public var testData : String;
	public function new() {
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

	public function sendMessageTest(type : String, params : Dynamic = null) : Void {
		super.sendMessage(type, params);
	}

}

