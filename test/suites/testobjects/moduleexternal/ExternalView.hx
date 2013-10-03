/**
 * COMMENT
 * 
 */
package suites.testobjects.moduleexternal;

import flash.display.Sprite;
import flash.events.Event;
import suites.TestViewEvent;

class ExternalView extends Sprite {

	public function new() {
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

}

