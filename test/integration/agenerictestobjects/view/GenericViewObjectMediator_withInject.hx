/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_withInject extends Mediator {

	@inject
	public var view : GenericViewObject;
	
	@inject
	public var genericTestProxy : GenericTestProxy;
	
	override public function onRegister() : Void {
	}

	override public function onRemove() : Void {
	}

}

