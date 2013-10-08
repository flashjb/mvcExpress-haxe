/**
 * COMMENT
 * 
 */
package suites.mediatormap;

import flash.display.Bitmap;
import flash.display.Sprite;
import utils.Assert;

import mvcexpress.core.MediatorMap;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.mvc.Mediator;
//import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.MvcExpress;
import suites.mediatormap.medatormaptestobj.MediatorMapTestSprite;
import suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator;
import suites.testobjects.view.MediatorSprite;
import suites.testobjects.view.MediatorSpriteMediator;
import utils.AsyncUtil;

class MediatorMapTests extends Tester {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var callCaunter : Int;
	var callsExpected : Int;
	
	
	public function new() 
	{
		super( );
		testFunction( "mediatorMap_onRegister_and_no_onRemove" );
		testFunction( "mediatorMap_onRegister_and_onRemove" );
		testFunction( "mediatorMap_messag_callBack_test" );
		testFunction( "mediatorMap_doubleMediate_fails");//>>OK
		testFunction( "mediatorMap_mediateWith_notFails" );
		testFunction( "mediatorMap_doubleMediateWith_fails" );//>> OK
		testFunction( "debug_test_isMapped_false_wrong_view" );
		testFunction( "debug_test_isMapped_false_wrong_mediator");
		testFunction( "debug_test_isMapped_true");
		testFunction( "debug_map_not_mediator_fails");//>> OK
	}
	
	override public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		proxyMap = new ProxyMap("test", messenger);
		mediatorMap = new MediatorMap("test", messenger, proxyMap);
		callCaunter = 0;
		callsExpected = 0;
	}

	
	override public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
		MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = function(msg : Dynamic = null){};
		MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION   = function(msg : Dynamic = null){};
		MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION = function(msg : Dynamic = null){};
		messenger = null;
		proxyMap = null;
		mediatorMap = null;
		callCaunter = 0;
		callsExpected = 0;
	}

	//	[Test(async,description="Mediator onRegister test")]
	public function mediatorMap_onRegister_and_no_onRemove() : Void {
//		MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = AsyncUtil.asyncHandler(this, callBackSuccess, null, 300, callBackFail);
//		MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess);
		MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = callBackSuccess;
		MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = callBackFail;
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediate(view);
	}
	
	//	[Test(async,description="Mediator onRemove test")]
	public function mediatorMap_onRegister_and_onRemove() : Void {
	//	MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = AsyncUtil.asyncHandler(this, callBackSuccess, null, 300, callBackFail);
	//	MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = AsyncUtil.asyncHandler(this, callBackSuccess, null, 300, callBackFail);
		MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = callBackSuccess;
		MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION   = callBackSuccess;
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediate(view);
		mediatorMap.unmediate(view);
	}
	
	//	[Test(async,description="Mediator onRemove test")]
	public function mediatorMap_messag_callBack_test() : Void {
//		MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION = AsyncUtil.asyncHandler(this, callBackSuccess, null, 300, callBackFail);
		MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION = callBackSuccess;
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediate(view);
		messenger.send(MediatorMapTestSpriteMediator.TEST_MESSAGE_TYPE);
	}
	
	public function mediatorMap_doubleMediate_fails() : Void {
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediate(view);
		mediatorMap.mediate(view);
	}
	
	public function mediatorMap_mediateWith_notFails() : Void {
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediateWith(view, MediatorMapTestSpriteMediator);
	}

	
	public function mediatorMap_doubleMediateWith_fails() : Void 
	{
		var view : MediatorMapTestSprite = new MediatorMapTestSprite();
		mediatorMap.mediateWith(view, MediatorMapTestSpriteMediator);
		mediatorMap.mediateWith(view, MediatorMapTestSpriteMediator);
	}

	//----------------------------------
	//     isMapped()
	//----------------------------------
	
	public function debug_test_isMapped_false_wrong_view() : Void {
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		Assert.assertFalse("isMapped() should retturn false with NOT mapped view class.", mediatorMap.isMapped(MediatorSprite, MediatorMapTestSpriteMediator));
	}

	
	public function debug_test_isMapped_false_wrong_mediator() : Void {
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		Assert.assertFalse("isMapped() should retturn false with NOT mapped mediator class to view.", mediatorMap.isMapped(MediatorMapTestSprite, MediatorSpriteMediator));
	}


	public function debug_test_isMapped_true() : Void {
		mediatorMap.map(MediatorMapTestSprite, MediatorMapTestSpriteMediator);
		Assert.assertTrue("isMapped() should retturn true with mapped view class to mediator class.", mediatorMap.isMapped(MediatorMapTestSprite, MediatorMapTestSpriteMediator));
	}

	
	public function debug_map_not_mediator_fails() : Void {
		var errorChecked : Bool = false;
		#if debug
			errorChecked = true;
			mediatorMap.map(Sprite, Bitmap);
		#end
		if(!errorChecked)  {
			Assert.fail("fake error");
		}
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackFail(obj : Dynamic = null) : Void {
		Assert.fail("CallBack should not be called...");
	}

	public function callBackSuccess(obj : Dynamic = null) : Void 
	{
		trace("callback Succes", obj);
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackCheck(obj : Dynamic = null) : Void {
		//trace( "ControllerTests.callBackCheck > obj : " + obj );
		if(callCaunter != callsExpected)  {
			Assert.fail("Expected " + callsExpected + " calls, but " + callCaunter + " was received...");
		}
	}

	public function callBackIncrease(obj : Dynamic = null) : Void {
		//trace( "ControllerTests.callBackIncrease > obj : " + obj );
		callCaunter++;
	}

}

