/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.constants.GenericTestMessage;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_handlingMessage extends Mediator {

	@inject
	public var view : GenericViewObject;
	
	override public function onRegister() : Void {
		addHandler(GenericTestMessage.TEST_MESSAGE, handleTestMessage);
	}

	function handleTestMessage(blank : Dynamic) : Void {
	}

	override public function onRemove() : Void {
	}

}

