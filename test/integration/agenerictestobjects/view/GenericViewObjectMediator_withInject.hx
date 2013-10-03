/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator_withInject extends Mediator {

	
	public var view : GenericViewObject;
	
	public var genericTestProxy : GenericTestProxy;
	override public function onRegister() : Void {
	}

	override public function onRemove() : Void {
	}

}

