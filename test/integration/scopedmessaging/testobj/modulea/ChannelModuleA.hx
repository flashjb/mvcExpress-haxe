/**
 * COMMENT : todo
 * 
 */
package integration.scopedmessaging.testobj.modulea;

import flash.display.Sprite;
import flash.events.Event;
import mvcexpress.modules.ModuleCore;

class ChannelModuleA extends ModuleCore {

	public var view : ChannelViewA;
	static public var NAME : String = "ChannelModuleA";
	public function new() {
		super(ChannelModuleA.NAME);
	}

	public function cheateTestMediator() : Void {
		mediatorMap.map(ChannelViewA, ChannelAMediator);
		view = new ChannelViewA();
		mediatorMap.mediate(view);
	}

	public function addChannelHandler_test1() : Void {
		view.dispatchEvent(new Event("addChannelHandler_test1"));
	}

	public function removeChannelHandler_test1() : Void {
		view.dispatchEvent(new Event("removeChannelHandler_test1"));
	}

	public function addChannelHandler_test2() : Void {
		view.dispatchEvent(new Event("addChannelHandler_test2"));
	}

	public function addChannelHandler_testChannel_test3() : Void {
		view.dispatchEvent(new Event("addChannelHandler_testChannel_test3"));
	}

	public function addChannelHandler_testChannel_test4_withParams() : Void {
		view.dispatchEvent(new Event("addChannelHandler_testChannel_test4_withParams"));
	}

	public function mapCommand_ComTest1() : Void {
		commandMap.scopeMap("default", "CommTest1", ComTest1Command);
	}

	public function unmapCommand_ComTest1() : Void {
		commandMap.scopeUnmap("default", "CommTest1", ComTest1Command);
	}

	override function onInit() : Void {
		registerScope("default", true, true, true);
		registerScope("testChannel", true, true, true);
	}

	override function onDispose() : Void {
	}

}

