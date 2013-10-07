/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.constants.GenericTestMessage;
import integration.agenerictestobjects.view.event.ViewTestEvent;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_handlingListener extends Mediator {

	@inject
	public var view : GenericViewObject;
	
	override public function onRegister() : Void {
		addListener(view, ViewTestEvent.VIEW_TEST_BLANK, handlTestBlankEvent);
		addListener(view, ViewTestEvent.VIEW_TEST_SENDS_MESSAGE, handlTestSendMessageEvent);
	}

	function handlTestBlankEvent(event : ViewTestEvent) : Void {
	}

	function handlTestSendMessageEvent(event : ViewTestEvent) : Void {
		sendMessage(GenericTestMessage.TEST_MESSAGE);
	}

	override public function onRemove() : Void {
	}

}

