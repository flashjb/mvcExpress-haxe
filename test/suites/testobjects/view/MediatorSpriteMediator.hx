/**
 * COMMENT
 * 
 */
package suites.testobjects.view;

import flash.display.Sprite;
import flash.events.Event;
import mvcexpress.mvc.Mediator;
import suites.testobjects.TestObject;
import suites.TestViewEvent;

class MediatorSpriteMediator extends Mediator {

	static public var instance : MediatorSpriteMediator;
	
	@inject() public var view : MediatorSprite;
	
	override public function onRegister() : Void 
	{
		addHandler("test_handler_object_params", handleTestWithObjectParams);
		addHandler("test_add_empty_handler", handleTestEmptyHandler);
		addHandler("test_handler_bad_params", handleTestWithBadParams);
		
		//not allowed
		//addHandler("test_handler_two_params", handleTestWithTwoParams);
		//not allowed
		//addHandler("test_handler_two_params_one_optional", handleTestWithTwoParamsOneOptional);
		
		view.addEventListener(TestViewEvent.TRIGER_ADD_HANDLER, addTestHandler);
		
		MediatorSpriteMediator.instance = this;
	}

	override public function onRemove() : Void {
		MediatorSpriteMediator.instance = null;
	}

	function addTestHandler(event : Event) : Void {
		//not allowed
		addHandler("test_handler_bad_params", handleTestWithBadParams);
	}

	public function handleTestEmptyHandler(params : Dynamic) : Void {
		//not allowed
		//addHandler("test_empty_handler", handleTestEmpty);
	}

	public function handleTestEmpty() : Void {
	}

	public function handleTestWithObjectParams(params : Dynamic) : Void {
	}

	public function handleTestWithBadParams(params : TestObject) : Void {
	}

	public function handleTestWithTwoParams(params : Dynamic, extraParam : String) : Void {
	}

	public function handleTestWithTwoParamsOneOptional(params : Dynamic, ?extraParam : String = null) : Void {
	}

	public function getIsReady() : Bool {
		return this.isReady;
	}

}

