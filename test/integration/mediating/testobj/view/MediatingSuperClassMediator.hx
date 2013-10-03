package integration.mediating.testobj.view;

import integration.mediating.testobj.view.viewobj.MediatingBaseView;
import mvcexpress.mvc.Mediator;

class MediatingSuperClassMediator extends Mediator {

	
	public var view : MediatingBaseView;
	//[Inject]
	//public var myProxy:MyProxy;
	override public function onRegister() : Void {
		MediatingBaseView.timesRegistered++;
	}

	override public function onRemove() : Void {
	}

}

