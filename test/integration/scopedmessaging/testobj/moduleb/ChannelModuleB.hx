/**
 * COMMENT : todo
 * 
 */
package integration.scopedmessaging.testobj.moduleb;

import flash.display.Sprite;
import flash.events.Event;
import mvcexpress.modules.ModuleCore;

class ChannelModuleB extends ModuleCore {

	var view : Sprite;
	static public var NAME : String = "ChannelModuleB";
	public var command1executed : Bool;
	public function new() {
		command1executed = false;
		super(ChannelModuleB.NAME);
	}

	public function cheateTestMediator() : Void {
		mediatorMap.map(Sprite, ChannelBMediator);
		view = new Sprite();
		mediatorMap.mediate(view);
	}

	public function sendChannelMessage_test1() : Void {
		view.dispatchEvent(new Event("sendChannelMessage_test1"));
	}

	public function sendChannelMessage_test2() : Void {
		view.dispatchEvent(new Event("sendChannelMessage_test2"));
	}

	public function sendChannelMessage_testChannel_test3() : Void {
		view.dispatchEvent(new Event("sendChannelMessage_testChannel_test3"));
	}

	public function sendChannelMessage_testChannel_test4_withParams() : Void {
		view.dispatchEvent(new Event("sendChannelMessage_testChannel_test4_withParams"));
	}

	public function sendChannelMessage_comTest1() : Void {
		sendScopeMessage("default", "CommTest1", this);
	}

	override function onInit() : Void {
		registerScope("default", true, true, true);
		registerScope("testChannel", true, true, true);
	}

	override function onDispose() : Void {
	}

}

