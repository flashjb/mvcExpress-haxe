package integration.mediating.testobj.view;

import integration.mediating.testobj.view.viewobj.IMediatingIntefrace;
import integration.mediating.testobj.view.viewobj.MediatingBaseView;
import mvcexpress.mvc.Mediator;

class MediatingInterfaceMediator extends Mediator {

	@inject
	public var view : IMediatingIntefrace;
	//[Inject]
	//public var myProxy:MyProxy;
	override public function onRegister() : Void {
		MediatingBaseView.timesRegistered++;
	}

	override public function onRemove() : Void {
	}

}

