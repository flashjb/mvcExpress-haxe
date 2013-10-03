/**
 * COMMENT
 * 
 */
package suites.mediators;

import utils.Assert;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.ProxyMap;
import suites.testobjects.view.MediatorSprite;
import suites.testobjects.view.MediatorSpriteMediator;

class MediatorTests {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var testView : MediatorSprite;
	
	public function runBeforeEveryTest() : Void {
		use;
		namespace;
		pureLegsCore;
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		proxyMap = new ProxyMap("test", messenger);
		mediatorMap = new MediatorMap("test", messenger, proxyMap);
		mediatorMap.map(MediatorSprite, MediatorSpriteMediator);
		testView = new MediatorSprite();
		mediatorMap.mediate(testView);
	}

	
	public function runAfterEveryTest() : Void {
		use;
		namespace;
		pureLegsCore;
		mediatorMap.unmediate(testView);
		messenger = null;
		proxyMap = null;
		mediatorMap = null;
		testView = null;
	}

	
	public function mediator_constructor_fails() : Void 
	{
		#if debug
			new MediatorSpriteMediator();
			return;
		#end
		throw cast(("Fake error."), Error);
	}

	
	public function mediator_isReady() : Void {
		Assert.assertTrue("After view mediating mediator isReady must be true.", MediatorSpriteMediator.instance.getIsReady());
	}

	
	public function mediator_empty_handler() : Void 
	{
		#if debug
			messenger.send("test_add_empty_handler");
			return;
		#end
		
		throw cast(("Debug mode is needed for this test."), Error);
	}

	//[Test]
	//[Ignore]
	//public function mediator_add_listener():void {
	//
	//}
	//
	//[Test]
	//[Ignore]
	//public function mediator_remove_listener():void {
	//
	//}
	//
	//[Test]
	//[Ignore]
	//public function mediator_remove_all_listeners():void {
	//
	//}
	
	public function mediator_handler_object_params() : Void {
		messenger.send("test_handler_object_params");
	}

	
	public function mediator_handler_bad_params() : Void {
		messenger.send("test_handler_bad_params");
	}

	
	public function mediator_handler_two_params() : Void {
		messenger.send("test_handler_two_params");
	}

	
	public function mediator_handler_two_params_one_optional() : Void {
		messenger.send("test_handler_two_params_one_optional");
	}

	
	public function mediator_same_handler_added_twice_fails() : Void {
		#if debug
			//try {
				testView.tryAddingHandlerTwice();
				Assert.fail("Adding handlen twice should fail.");
			//} catch 
		#end
	}

	//[Test]
	//[Ignore]
	//public function mediator_remove_handler():void {
	//
	//}
	//
	//
	//[Test]
	//[Ignore]
	//public function mediator_remove_all_handler():void {
	//
	//}
}

