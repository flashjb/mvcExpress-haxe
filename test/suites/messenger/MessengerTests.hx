/**
 * COMMENT
 * 
 */
package suites.messenger;


import mvcexpress.core.messenger.HandlerVO;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.messenger.Messenger;
//import mvcexpress.core.namespace.PureLegsCore;

import utils.Assert;
import utils.Async;
import utils.AsyncUtil;

class MessengerTests {

	var messenger : Messenger;
	
	public function new() 
	{
		
		testFunction( "add_and_handle_callback" );
		testFunction( "add_callback_and_sendNot_then_message_fails_silently" );
		testFunction( "add_callback_and_disable_then_message_fails_silently" );
		testFunction( "add_and_remove_callback_then_message_fails_silently");
	}
	
	public function testFunction( funcName : String ) : Void
	{
		runBeforeEveryTest();
		Reflect.callMethod(this, Reflect.field(this, funcName), []);
		runAfterEveryTest();
	}
	
	public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
	}

	
	public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
		messenger = null;
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback ")]
	public function add_and_handle_callback() : Void {
		messenger.addHandler("test", callbacknormal);
		//messenger.addHandler("test", AsyncUtil.asyncHandler(this));
		messenger.send("test");
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async fail Callback")]
	public function add_callback_and_sendNot_then_message_fails_silently() : Void {
		messenger.send("test_notListened");
		messenger.addHandler("test", callBackFail);
		//messenger.addHandler("test", AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess));
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback disable")]
	public function add_callback_and_disable_then_message_fails_silently() : Void {
		var callBack : Dynamic = callBackFail;
		//var callBack : Dynamic = AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess);
		var handlerVo : HandlerVO = messenger.addHandler("test2", callBack);
		handlerVo.handler = null;
		messenger.send("test2");
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback remove")]
	public function add_and_remove_callback_then_message_fails_silently() : Void {
		var callBack : Dynamic = callBackFail;
	//	var callBack : Dynamic = AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess);
		messenger.addHandler("test3", callBack);
		messenger.removeHandler("test3", callBack);
		messenger.send("test3");
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackFail(obj : Dynamic) : Void {
		Assert.fail("CallBack should not be called...");
	}

	public function callBackSuccess(obj : Dynamic) : Void {
	}

	public function callbacknormal(obj : Dynamic) : Void 
	{
		trace("callbacknormal");
	}
}

