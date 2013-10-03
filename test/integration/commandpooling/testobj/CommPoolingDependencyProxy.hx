/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj;

import mvcexpress.mvc.Proxy;

class CommPoolingDependencyProxy extends Proxy {
	public var proxyName(getProxyName, never) : String;

	var _proxyName : String;
	public function new(proxyName : String = "undefined") {
		this._proxyName = proxyName;
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

	public function getProxyName() : String {
		return _proxyName;
	}

}

