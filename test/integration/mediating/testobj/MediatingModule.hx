package integration.mediating.testobj;

import mvcexpress.core.MediatorMap;
import mvcexpress.modules.ModuleCore;

class MediatingModule extends ModuleCore {

	static public var NAME : String = "MediatingModule";
	public function new() {
		super(MediatingModule.NAME);
	}

	public function getMediatorMap() : MediatorMap {
		return mediatorMap;
	}

}

