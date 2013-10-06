/**
 * CLASS COMMENT
 * 
 */
package integration.commandpooling.testobj;

import mvcexpress.mvc.Proxy;

class CommPoolingDependencyProxy extends Proxy 
{
	public var proxyName(get_proxyName, never) : String;

	var _proxyName : String;
	public function new(proxyName : String = "undefined") {
		super();
		this._proxyName = proxyName;
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

	public function get_proxyName() : String {
		return _proxyName;
	}

}

