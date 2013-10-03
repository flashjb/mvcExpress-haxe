/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_withScopedInject extends Mediator {

	
	public var view : GenericViewObject;
	
	public var genericTestProxy : GenericTestProxy;
	override public function onRegister() : Void {
		trace("GenericViewObjectMediator_withScopedInject.onRegister");
	}

	override public function onRemove() : Void {
	}

}

