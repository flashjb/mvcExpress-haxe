package integration.commandpooling.testobj;

import mvcexpress.core.CommandMap;
import mvcexpress.core.ProxyMap;
import mvcexpress.modules.ModuleCore;

class CommandPoolingModule extends ModuleCore {

	static public var NAME : String = "CommandPoolingModule";
	public function new() {
		super(CommandPoolingModule.NAME);
	}

	public function getCommandMap() : CommandMap {
		return commandMap;
	}

	public function getProxyMap() : ProxyMap {
		return proxyMap;
	}

	public function sendLocalMessage(type : String) : Void {
		sendMessage(type);
	}

}

