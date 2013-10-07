/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.constants.GenericScopeIds;
import integration.agenerictestobjects.constants.GenericTestMessage;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_handlingScopeMessage extends Mediator {

	@inject
	public var view : GenericViewObject;
	
	override public function onRegister() : Void {
		addScopeHandler(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE, handleTestMessage);
	}

	function handleTestMessage(blank : Dynamic) : Void {
	}

	override public function onRemove() : Void {
	}

}

