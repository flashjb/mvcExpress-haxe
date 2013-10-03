/**
 * COMMENT : todo
 * 
 */
package integration.moduleinittests.testobj;

import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ProxyMap;
import mvcexpress.modules.ModuleCore;

class InitTestModuleCore extends ModuleCore {

	static public var NAME : String = "InitTestModuleCore";
	public function new(autoInit : Bool) {
		super(InitTestModuleCore.NAME, autoInit);
	}

	override function onInit() : Void {
	}

	public function start() : Void {
		initModule();
	}

	override function onDispose() : Void {
	}

	public function getProxyMap() : ProxyMap {
		return proxyMap;
	}

	public function getCommandMap() : CommandMap {
		return commandMap;
	}

	public function getMediatorMap() : MediatorMap {
		return mediatorMap;
	}

}

