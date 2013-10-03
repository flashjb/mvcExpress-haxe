/**
 * COMMENT
 * 
 */
package suites.messenger;


import mvcexpress.core.messenger.HandlerVO;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;

import utils.Assert;
import utils.AsyncUtil;

class MessengerTests {

	var messenger : Messenger;
	
	public function runBeforeEveryTest() : Void {
		use;
		namespace;
		pureLegsCore;
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
	}

	
	public function runAfterEveryTest() : Void {
		use;
		namespace;
		pureLegsCore;
		messenger = null;
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback ")]
	public function add_and_handle_callback() : Void {
		messenger.addHandler("test", AsyncUtil.asyncHandler(this));
		messenger.send("test");
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async fail Callback")]
	public function add_callback_and_sendNot_then_message_fails_silently() : Void {
		messenger.addHandler("test", AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess));
		messenger.send("test_notListened");
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback disable")]
	public function add_callback_and_disable_then_message_fails_silently() : Void {
		var callBack : Dynamic = AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess);
		var handlerVo : HandlerVO = messenger.addHandler("test", callBack);
		handlerVo.handler = null;
		messenger.send("test");
	}

	//----------------------------------
	//
	//----------------------------------
	//	[Test(async,description="Async Callback remove")]
	public function add_and_remove_callback_then_message_fails_silently() : Void {
		var callBack : Dynamic = AsyncUtil.asyncHandler(this, callBackFail, null, 300, callBackSuccess);
		messenger.addHandler("test", callBack);
		messenger.removeHandler("test", callBack);
		messenger.send("test");
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackFail(obj : Dynamic) : Void {
		Assert.fail("CallBack should not be called...");
	}

	public function callBackSuccess(obj : Dynamic) : Void {
	}

}

