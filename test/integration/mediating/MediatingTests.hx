package integration.mediating;

import utils.Assert;
import integration.agenerictestobjects.view.GenericViewObject;
import integration.agenerictestobjects.view.GenericViewObjectMediator_handlingListener;
import integration.agenerictestobjects.view.GenericViewObjectMediator_handlingMessage;
import integration.mediating.testobj.*;
import integration.mediating.testobj.view.*;
import integration.mediating.testobj.view.viewobj.*;
import mvcexpress.core.*;

class MediatingTests  extends Tester {

	var mediatingModule : MediatingModule;
	var mediatorMap : MediatorMap;
	
	public function new ()
	{
		super();
		testFunction("mediating_mediateWrongClass_fails");
		testFunction("mediating_mediateWithWrongClass_fails");
		testFunction("mediating_mediatingAsInterface_ok");
		testFunction("mediating_mediateWrongClass_fails");
		testFunction("mediating_mediatingAsSuperClass_ok");
		testFunction("mediating_mediatingWithAsInterface_ok");
		testFunction("mediating_mediatingWithAsSuperClass_ok");
		testFunction("mediating_mediatingAsWrongClass_fails");
		testFunction("mediating_mediatingWithAsWrongClass_fails");
		testFunction("mediating_mediatingTwiceAfterListener_ok");
	
	}
	
	override public function runBeforeEveryTest() : Void {
		mediatingModule = new MediatingModule();
		mediatorMap = mediatingModule.getMediatorMap();
	}

	override public function runAfterEveryTest() : Void {
		mediatorMap = null;
		mediatingModule.disposeModule();
		mediatingModule = null;
		MediatingBaseView.timesRegistered = 0;
	}

	
	public function mediating_mediateWrongClass_fails() : Void {
		mediatorMap.map(MediatingWrongView, MediatingSuperClassMediator);
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediate(view);
	}

	
	public function mediating_mediateWithWrongClass_fails() : Void {
		var view : MediatingWrongView = new MediatingWrongView();
		mediatorMap.mediateWith(view, MediatingSuperClassMediator);
	}

	//--------------------------------------------------------------------------
	//
	//      Inject mediator as another class
	//
	//--------------------------------------------------------------------------
	
	public function mediating_mediatingAsInterface_ok() : Void {
		mediatorMap.map(MediatingSubView, MediatingSuperClassMediator, MediatingBaseView);
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediate(view);
		Assert.assertEquals("Mediator should be mediated and registered once.", 1, MediatingBaseView.timesRegistered);
	}

	
	public function mediating_mediatingAsSuperClass_ok() : Void {
		mediatorMap.map(MediatingSubView, MediatingInterfaceMediator, IMediatingIntefrace);
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediate(view);
		Assert.assertEquals("Mediator should be mediated and registered once.", 1, MediatingBaseView.timesRegistered);
	}
	
	public function mediating_mediatingWithAsInterface_ok() : Void {
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediateWith(view, MediatingSuperClassMediator, MediatingBaseView);
		Assert.assertEquals("Mediator should be mediated and registered once.", 1, MediatingBaseView.timesRegistered);
	}

	
	public function mediating_mediatingWithAsSuperClass_ok() : Void {
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediateWith(view, MediatingInterfaceMediator, IMediatingIntefrace);
		Assert.assertEquals("Mediator should be mediated and registered once.", 1, MediatingBaseView.timesRegistered);
	}

	
	public function mediating_mediatingAsWrongClass_fails() : Void {
		mediatorMap.map(MediatingWrongView, MediatingInterfaceMediator, IMediatingIntefrace);
		var view : MediatingSubView = new MediatingSubView();
		mediatorMap.mediate(view);
	}

	public function mediating_mediatingWithAsWrongClass_fails() : Void {
		var view : MediatingWrongView = new MediatingWrongView();
		mediatorMap.mediateWith(view, MediatingInterfaceMediator, IMediatingIntefrace);
	}

	
	public function mediating_mediatingTwiceAfterListener_ok() : Void {
		var view : GenericViewObject = new GenericViewObject();
		mediatorMap.map(GenericViewObject, GenericViewObjectMediator_handlingListener);
		mediatorMap.mediate(view);
		view.dispatchTestTrigerMessagEvent();
		mediatorMap.unmediate(view);
		mediatorMap.mediate(view);
		view.dispatchTestTrigerMessagEvent();
	}

}

