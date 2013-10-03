/**
 * COMMENT : todo
 * 
 */
package integration.moduleinittests.testobj;

import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ProxyMap;
import mvcexpress.modules.ModuleMovieClip;

class InitTestModuleMovieClip extends ModuleMovieClip {

	static public var NAME : String = "InitTestModuleMovieClip";
	public function new(autoInit : Bool) {
		super(InitTestModuleMovieClip.NAME, autoInit);
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

