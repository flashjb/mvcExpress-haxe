/**
 * COMMENT
 * 
 */
package suites.testobjects.modulemain;

import mvcexpress.modules.ModuleSprite;
import mvcexpress.mvc.Proxy;
import suites.SuiteModuleNames;
import suites.testobjects.controller.GetProxyTestCommand;

class MainModule extends ModuleSprite {
	public var localCommandCount(getLocalCommandCount, never) : Int;
	public var localHandlerCount(getLocalHandlerCount, never) : Int;
	public var remoteCommandCount(getRemoteCommandCount, never) : Int;
	public var remoteHandlerCount(getRemoteHandlerCount, never) : Int;

	var dataProxy : MainDataProxy;
	var testView : MainView;
	static public var NAME : String = SuiteModuleNames.MAIN_MODULE;
	public function new() {
		super(MainModule.NAME, true, false);
	}

	override function onInit() : Void {
		dataProxy = new MainDataProxy();
		proxyMap.map(dataProxy);
		mediatorMap.map(MainView, MainViewMediator);
	}

	override function onDispose() : Void {
		proxyMap.unmap(MainDataProxy);
		dataProxy = null;
	}

	//----------------------------------
	//
	//----------------------------------
	public function createLocalCommand(message : String) : Void {
		commandMap.map(message, MainLocalCommand);
	}

	public function createLocalHandler(message : String) : Void {
		if(!testView)  {
			testView = new MainView();
			mediatorMap.mediate(testView);
		}
		testView.addLocalhandler(message);
	}

	//public function createRemoteCommand(message:String):void {
	//commandMap.mapRemote(message, MainRemoteCommand, SuiteModuleNames.EXTERNAL_MODULE);
	//}
	public function createRemoteHandler(message : String) : Void {
		if(!testView)  {
			testView = new MainView();
			mediatorMap.mediate(testView);
		}
		testView.addRemoteHandler(message);
	}

	public function sendTestMessage(message : String) : Void {
		sendMessage(message);
	}

	public function removeLocalCommand(message : String) : Void {
		commandMap.unmap(message, MainLocalCommand);
	}

	public function removeLocalHandler(message : String) : Void {
		if(!testView)  {
			testView = new MainView();
			mediatorMap.mediate(testView);
		}
		testView.removeLocalhandler(message);
	}

	//public function removeRemoteCommand(message:String):void {
	//commandMap.unmapRemote(message, MainRemoteCommand, SuiteModuleNames.EXTERNAL_MODULE);
	//}
	public function removeRemoteHandler(message : String) : Void {
		if(!testView)  {
			testView = new MainView();
			mediatorMap.mediate(testView);
		}
		testView.removeRemoteHandler(message);
	}

	//----------------------------------
	//
	//----------------------------------
	public function mapTestProxy(testProxy : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Void {
		proxyMap.map(testProxy, injectClass, name);
	}

	public function getTestProxy(proxyClass : Class<Dynamic>, name : String = "") : Proxy {
		return proxyMap.getProxy(proxyClass, name);
	}

	public function getProxyFromProxy(proxyClass : Class<Dynamic>, name : String = "") : Proxy {
		return dataProxy.getTestProxy(proxyClass, name);
	}

	public function getProxyFromMediator(proxyClass : Class<Dynamic>, name : String = "") : Proxy {
		if(!testView)  {
			testView = new MainView();
			mediatorMap.mediate(testView);
		}
		testView.testGetProxyClass(proxyClass, name);
		return dataProxy.testProxy;
	}

	public function getProxyInCommand(proxyClass : Class<Dynamic>, name : String = "") : Proxy {
		commandMap.execute(GetProxyTestCommand, {
			moduleClass : proxyClass,
			moduleName : name
		});
		return dataProxy.testProxy;
	}

	//----------------------------------
	//
	//----------------------------------
	public function getLocalCommandCount() : Int {
		return dataProxy.localCommandCount;
	}

	public function getLocalHandlerCount() : Int {
		return dataProxy.localHandlerCount;
	}

	public function getRemoteCommandCount() : Int {
		return dataProxy.remoteCommandCount;
	}

	public function getRemoteHandlerCount() : Int {
		return dataProxy.remoteHandlerCount;
	}

	// add tests with hosting ?
	// add tests with multiply proxiest.?? (maybe dont belong here..)
}

