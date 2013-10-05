/**
 * COMMENT
 * 
 */
package suites.testobjects.modulemain;

import flash.display.Sprite;
import flash.events.Event;
import suites.TestViewEvent;

class MainView extends Sprite {

	public function new() {
		super();
	}

	public function addLocalhandler(message : String) : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.ADD_LOCAL_HANDLER, message));
	}

	public function addRemoteHandler(message : String) : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.ADD_REMOTE_HANDLER, message));
	}

	public function removeLocalhandler(message : String) : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.REMOVE_LOCAL_HANDLER, message));
	}

	public function removeRemoteHandler(message : String) : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.REMOVE_REMOTE_HANDLER, message));
	}

	public function testGetProxyClass(proxyClass : Class<Dynamic>, name : String = "") : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.TEST_GET_PROXY_CLASS, name, proxyClass));
	}

}

