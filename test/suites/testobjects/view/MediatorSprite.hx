/**
 * COMMENT
 * 
 */
package suites.testobjects.view;

import flash.display.Sprite;
import flash.events.Event;
import suites.TestViewEvent;

class MediatorSprite extends Sprite {

	public function new() {
	}

	public function tryAddingHandlerTwice() : Void {
		dispatchEvent(new TestViewEvent(TestViewEvent.TRIGER_ADD_HANDLER));
	}

}

