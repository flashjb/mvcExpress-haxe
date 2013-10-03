/**
 * CLASS COMMENT
 * 
 */
package integration.scopedmessaging.testobj.modulea;

import flash.display.Sprite;
import flash.events.Event;
import flash.geom.Point;
import mvcexpress.mvc.Mediator;

class ChannelAMediator extends Mediator {

	
	public var view : ChannelViewA;
	//[Inject]
	//public var myProxy:MyProxy;
	override public function onRegister() : Void {
		view.addEventListener("addChannelHandler_test1", addChannelHandler1);
		view.addEventListener("addChannelHandler_test2", addChannelHandler2);
		view.addEventListener("addChannelHandler_testChannel_test3", addChannelHandler3);
		view.addEventListener("addChannelHandler_testChannel_test4_withParams", addChannelHandler4);
		view.addEventListener("removeChannelHandler_test1", removeChannelHandler1);
	}

	function addChannelHandler1(event : Event) : Void {
		addScopeHandler("default", "test1", handleTest1Channelmessage);
	}

	function addChannelHandler2(event : Event) : Void {
		addScopeHandler("default", "test2", handleTest2Channelmessage);
	}

	function addChannelHandler3(event : Event) : Void {
		addScopeHandler("testChannel", "test3", handleTest3Channelmessage);
	}

	function addChannelHandler4(event : Event) : Void {
		addScopeHandler("testChannel", "test4", handleTest4Channelmessage);
	}

	function removeChannelHandler1(event : Event) : Void {
		removeScopeHandler("default", "test1", handleTest1Channelmessage);
	}

	function handleTest1Channelmessage(blank : Dynamic) : Void {
		trace("ChannelAMediator.handleTest1Channelmessage > blank : " + blank);
		view.test1handled = true;
	}

	function handleTest2Channelmessage(blank : Dynamic) : Void {
		trace("ChannelAMediator.handleTest2Channelmessage > blank : " + blank);
		view.test2handled = true;
	}

	function handleTest3Channelmessage(blank : Dynamic) : Void {
		trace("ChannelAMediator.handleTest3Channelmessage > blank : " + blank);
		view.test3handled = true;
	}

	function handleTest4Channelmessage(testParams : String) : Void {
		trace("ChannelAMediator.handleTest4Channelmessage > testParams : " + testParams);
		view.test4handled = true;
		view.test4params = testParams;
	}

	override public function onRemove() : Void {
	}

}

