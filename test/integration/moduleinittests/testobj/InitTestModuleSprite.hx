/**
 * COMMENT : todo
 * 
 */
package integration.moduleinittests.testobj;

import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ProxyMap;
import mvcexpress.modules.ModuleSprite;

class InitTestModuleSprite extends ModuleSprite {

	static public var NAME : String = "InitTestModuleSprite";
	public function new(autoInit : Bool) {
		super(InitTestModuleSprite.NAME, autoInit);
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

