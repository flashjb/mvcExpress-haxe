/**
 * COMMENT
 * 
 */
package suites.mediatormap.medatormaptestobj;

import mvcexpress.mvc.Mediator;

class MediatorMapTestSpriteMediator extends Mediator {

	static public var TEST_MESSAGE_TYPE : String = "mediatorMapTestType";
	static public var REGISTER_TEST_FUNCTION : Dynamic = function(msg : Dynamic = null) : Void {
	}
;
	static public var REMOVE_TEST_FUNCTION : Dynamic = function(msg : Dynamic = null) : Void {
	}
;
	static public var CALLBACK_TEST_FUNCTION : Dynamic = function(msg : Dynamic = null) : Void {
	}
;
	override public function onRegister() : Void {
		MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION();
		addHandler(MediatorMapTestSpriteMediator.TEST_MESSAGE_TYPE, handleTestCallBack);
	}

	override public function onRemove() : Void {
		MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION();
	}

	function handleTestCallBack(params : Dynamic) : Void {
		MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION();
	}

}

