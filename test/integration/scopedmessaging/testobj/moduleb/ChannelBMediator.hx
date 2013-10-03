/**
 * CLASS COMMENT
 * 
 */
package integration.scopedmessaging.testobj.moduleb;

import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Point;
import mvcexpress.mvc.Mediator;

class ChannelBMediator extends Mediator {

	
	public var view : Sprite;
	//[Inject]
	//public var myProxy:MyProxy;
	override public function onRegister() : Void {
		view.addEventListener("sendChannelMessage_test1", sendChannelMessage1);
		view.addEventListener("sendChannelMessage_test2", sendChannelMessage2);
		view.addEventListener("sendChannelMessage_testChannel_test3", sendChannelMessage3);
		view.addEventListener("sendChannelMessage_testChannel_test4_withParams", sendChannelMessage4);
	}

	function sendChannelMessage1(event : Event) : Void {
		sendScopeMessage("default", "test1");
	}

	function sendChannelMessage2(event : Event) : Void {
		sendScopeMessage("default", "test2");
	}

	function sendChannelMessage3(event : Event) : Void {
		sendScopeMessage("testChannel", "test3", null);
	}

	function sendChannelMessage4(event : Event) : Void {
		sendScopeMessage("testChannel", "test4", "test4 params string");
	}

	override public function onRemove() : Void {
	}

}

