/**
 * CLASS COMMENT
 * 
 */
package integration.scopedproxy.testobj.modulea;

import integration.scopedproxy.ScopedProxyTests;
import mvcexpress.mvc.Proxy;

class ScopedTestProxy extends Proxy {

	public var storedData : String;
	public function new() {
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

	public function trigerMessage(messagedata : String) : Void {
		sendMessage(ScopedProxyTests.SCOPED_PROXY_MESSAGE_NAME, messagedata);
	}

}

