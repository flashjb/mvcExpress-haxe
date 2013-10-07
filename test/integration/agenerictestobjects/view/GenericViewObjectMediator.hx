/**
 * CLASS COMMENT
 * 
 */
package integration.agenerictestobjects.view;

import mvcexpress.mvc.Mediator;

class GenericViewObjectMediator extends Mediator {

	@inject
	public var view : GenericViewObject;
	//[Inject]
	//public var myProxy:MyProxy;
	override public function onRegister() : Void {
	}

	override public function onRemove() : Void {
	}

}

