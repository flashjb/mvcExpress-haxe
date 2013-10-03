package integration.agenerictestobjects.view;

import flash.display.Sprite;
import integration.agenerictestobjects.view.event.ViewTestEvent;

class GenericViewObject extends Sprite {

	public function new() {
	}

	public function dispatchTestBlankEvent() : Void {
		dispatchEvent(new ViewTestEvent(ViewTestEvent.VIEW_TEST_BLANK));
	}

	public function dispatchTestTrigerMessagEvent() : Void {
		dispatchEvent(new ViewTestEvent(ViewTestEvent.VIEW_TEST_SENDS_MESSAGE));
	}

}

