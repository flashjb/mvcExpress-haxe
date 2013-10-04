/**
 * COMMENT
 * 
 */
package suites.mediators;

import utils.Assert;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.messenger.Messenger;
//import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.ProxyMap;
import suites.testobjects.view.MediatorSprite;
import suites.testobjects.view.MediatorSpriteMediator;

class MediatorTests {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var testView : MediatorSprite;
	
	public function new() 
	{
		testFunction( "mediator_constructor_fails" );
		testFunction( "mediator_isReady" );
		testFunction( "mediator_empty_handler" );
		testFunction( "mediator_handler_object_params");
		testFunction( "mediator_handler_bad_params" );
		testFunction( "mediator_handler_two_params" );
		testFunction( "mediator_handler_two_params_one_optional" );
		testFunction( "mediator_same_handler_added_twice_fails");
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
		proxyMap = new ProxyMap("test", messenger);
		mediatorMap = new MediatorMap("test", messenger, proxyMap);
		mediatorMap.map(MediatorSprite, MediatorSpriteMediator);
		testView = new MediatorSprite();
		mediatorMap.mediate(testView);
	}

	
	public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
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
		throw ("Fake error.");
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
		
		throw ("Debug mode is needed for this test.");
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

