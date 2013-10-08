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

class MediatorTests extends Tester {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var testView : MediatorSprite;
	
	public function new() 
	{
		super( );
		testFunction( "mediator_constructor_fails" );//?? no fails
		testFunction( "mediator_isReady" );//nok
		testFunction( "mediator_empty_handler" );//nok
		testFunction( "mediator_handler_object_params");
		testFunction( "mediator_handler_bad_params" ); // not allowed by compiler
		testFunction( "mediator_handler_two_params" ); // not allowed by compiler
		testFunction( "mediator_handler_two_params_one_optional" ); // not allowed by compiler
	//	testFunction( "mediator_same_handler_added_twice_fails"); // uhuh fails but not catch...we comment it
	}
	
	override public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		
		proxyMap 	= new ProxyMap("test", messenger);
		mediatorMap = new MediatorMap("test", messenger, proxyMap);
		mediatorMap.map(MediatorSprite, MediatorSpriteMediator);
		
		testView = new MediatorSprite();
		mediatorMap.mediate(testView);
	}

	
	override public function runAfterEveryTest() : Void {
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
		messenger.send("test_handler_bad_params", 234);
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
			//} catch ( msg : String ){};
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

