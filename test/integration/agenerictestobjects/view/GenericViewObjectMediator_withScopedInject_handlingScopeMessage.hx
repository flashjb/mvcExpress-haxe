/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.constants.GenericScopeIds;
import integration.agenerictestobjects.constants.GenericTestMessage;
import integration.agenerictestobjects.constants.GenericTestStrings;
import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_withScopedInject_handlingScopeMessage extends Mediator {

	
	public var view : GenericViewObject;
	
	public var genericTestProxy : GenericTestProxy;
	override public function onRegister() : Void {
		trace("GenericViewObjectMediator_withScopedInject.onRegister");
		addScopeHandler(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE, handleTestMessage);
	}

	function handleTestMessage(blank : Dynamic) : Void {
		trace("GenericViewObjectMediator_withScopedInject_handlingScopeMessage.handleTestMessage > blank : " + blank);
		genericTestProxy.testData = GenericTestStrings.data1;
	}

	override public function onRemove() : Void {
	}

}

