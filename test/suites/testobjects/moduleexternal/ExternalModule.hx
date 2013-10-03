/**
 * COMMENT : todo
 * 
 */
package suites.testobjects.moduleexternal;

import mvcexpress.modules.ModuleSprite;
import suites.SuiteModuleNames;

class ExternalModule extends ModuleSprite {
	public var localCommandCount(getLocalCommandCount, never) : Int;
	public var localHandlerCount(getLocalHandlerCount, never) : Int;
	public var remoteCommandCount(getRemoteCommandCount, never) : Int;
	public var remoteHandlerCount(getRemoteHandlerCount, never) : Int;

	var dataProxy : ExternalDataProxy;
	var testView : ExternalView;
	static public var NAME : String = SuiteModuleNames.EXTERNAL_MODULE;
	public function new() {
		super(ExternalModule.NAME, true, false);
	}

	override function onInit() : Void {
		dataProxy = new ExternalDataProxy();
		proxyMap.map(dataProxy);
		mediatorMap.map(ExternalView, ExternalViewMediator);
	}

	override function onDispose() : Void {
		proxyMap.unmap(ExternalDataProxy);
		dataProxy = null;
	}

	//----------------------------------
	//
	//----------------------------------
	public function createLocalCommand(message : String) : Void {
		commandMap.map(message, ExternalLocalCommand);
	}

	public function createLocalHandler(message : String) : Void {
		if(!testView)  {
			testView = new ExternalView();
			mediatorMap.mediate(testView);
		}
		testView.addLocalhandler(message);
	}

	public function createRemoteCommand(message : String) : Void {
		commandMap.mapRemote(message, ExternalRemoteCommand, SuiteModuleNames.MAIN_MODULE);
	}

	public function createRemoteHandler(message : String) : Void {
		if(!testView)  {
			testView = new ExternalView();
			mediatorMap.mediate(testView);
		}
		testView.addRemoteHandler(message);
	}

	public function sendTestMessage(message : String) : Void {
		sendMessage(message);
	}

	public function removeLocalCommand(message : String) : Void {
		commandMap.unmap(message, ExternalLocalCommand);
	}

	public function removeLocalHandler(message : String) : Void {
		if(!testView)  {
			testView = new ExternalView();
			mediatorMap.mediate(testView);
		}
		testView.removeLocalhandler(message);
	}

	public function removeRemoteCommand(message : String) : Void {
		commandMap.unmapRemote(message, ExternalRemoteCommand, SuiteModuleNames.MAIN_MODULE);
	}

	public function removeRemoteHandler(message : String) : Void {
		if(!testView)  {
			testView = new ExternalView();
			mediatorMap.mediate(testView);
		}
		testView.removeRemoteHandler(message);
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

}

