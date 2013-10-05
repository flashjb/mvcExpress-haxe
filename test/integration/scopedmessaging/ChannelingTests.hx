/**
 * COMMENT
 * 
 */
package integration.scopedmessaging;

import integration.scopedmessaging.testobj.modulea.ChannelModuleA;
import integration.scopedmessaging.testobj.moduleb.ChannelModuleB;
import utils.Assert;

class ChannelingTests {

	var channelModulA : ChannelModuleA;
	var channelModulB : ChannelModuleB;
	
	
	public function new() 
	{
		testFunction( "channeling_moduleToModuleChanneling_addChannelHandler_sendsMessage" );
		testFunction( "channeling_moduleToModuleChannelingRemoveHandler_sendMessageDoesNothing" );
		testFunction( "channeling_moduleToModuleChanneling_addChannel2Handler_sendsMessage");
		testFunction( "channeling_moduleToModuleChanneling_add2ChannelHandler_sendsMessage" );
		testFunction( "channeling_moduleToModuleChanneling_addChannelHandler_sendsMessageWithParams" );
		testFunction( "channeling_messegeToCommandChanneling_addChannelCommand_commandsHandlesMessage" );
		testFunction( "channeling_messegeToCommandChanneling_addAndRemoveChannelCommand_commandsHandlesNothing");

	}
	
	var _currentTest : Int = 0;
	public function testFunction( funcName : String ) : Void
	{
		trace("\n*-------------------------*\n* current Test = "+ cast(++_currentTest) +": "+funcName+"\n*-------------------------*");
		runBeforeEveryTest();
		try
		{
			Reflect.callMethod(this, Reflect.field(this, funcName), []);
		}catch( e:Dynamic ){
			trace( e );
		}
		runAfterEveryTest();
	}
	
	public function runBeforeEveryTest() : Void {
		channelModulA = new ChannelModuleA();
		channelModulB = new ChannelModuleB();
	}

	
	public function runAfterEveryTest() : Void {
		channelModulA.disposeModule();
		channelModulB.disposeModule();
	}

	//[Ignore]
	public function channeling_moduleToModuleChanneling_addChannelHandler_sendsMessage() : Void {
		//
		channelModulA.cheateTestMediator();
		channelModulB.cheateTestMediator();
		//
		Assert.assertFalse("test1 handler must be false", channelModulA.view.test1handled);
		Assert.assertFalse("test2 handler must be false", channelModulA.view.test2handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test3handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test4handled);
		//
		channelModulA.addChannelHandler_test1();
		channelModulB.sendChannelMessage_test1();
		//
		Assert.assertTrue("test1 handler must be true after addChannelHandler() and sendChannelMessage()", channelModulA.view.test1handled);
	}

	//[Ignore]
	public function channeling_moduleToModuleChannelingRemoveHandler_sendMessageDoesNothing() : Void {
		//
		channelModulA.cheateTestMediator();
		channelModulB.cheateTestMediator();
		//
		Assert.assertFalse("test1 handler must be false", channelModulA.view.test1handled);
		Assert.assertFalse("test2 handler must be false", channelModulA.view.test2handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test3handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test4handled);
		//
		channelModulA.addChannelHandler_test1();
		channelModulA.removeChannelHandler_test1();
		channelModulB.sendChannelMessage_test1();
		//
		Assert.assertFalse("test1 handler must be false after addChannelHandler(), removeChannelHandler and sendChannelMessage()", channelModulA.view.test1handled);
	}

	//[Ignore]
	public function channeling_moduleToModuleChanneling_addChannel2Handler_sendsMessage() : Void {
		//
		channelModulA.cheateTestMediator();
		channelModulB.cheateTestMediator();
		//
		Assert.assertFalse("test1 handler must be false", channelModulA.view.test1handled);
		Assert.assertFalse("test2 handler must be false", channelModulA.view.test2handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test3handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test4handled);
		//
		channelModulA.addChannelHandler_test1();
		channelModulA.addChannelHandler_test2();
		channelModulB.sendChannelMessage_test2();
		//
		Assert.assertTrue("test1 handler must be true after addChannelHandler() and sendChannelMessage()", channelModulA.view.test2handled);
		Assert.assertFalse(channelModulA.view.test1handled);
	}

	//[Ignore]
	public function channeling_moduleToModuleChanneling_add2ChannelHandler_sendsMessage() : Void {
		//
		channelModulA.cheateTestMediator();
		channelModulB.cheateTestMediator();
		//
		Assert.assertFalse("test1 handler must be false", channelModulA.view.test1handled);
		Assert.assertFalse("test2 handler must be false", channelModulA.view.test2handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test3handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test4handled);
		//
		channelModulA.addChannelHandler_test1();
		channelModulA.addChannelHandler_test2();
		channelModulA.addChannelHandler_testChannel_test3();
		channelModulB.sendChannelMessage_testChannel_test3();
		//
		Assert.assertTrue("test3 handler must be true after addChannelHandler() and sendChannelMessage()", channelModulA.view.test3handled);
		Assert.assertFalse(channelModulA.view.test1handled);
		Assert.assertFalse(channelModulA.view.test2handled);
	}

	//[Ignore]
	public function channeling_moduleToModuleChanneling_addChannelHandler_sendsMessageWithParams() : Void {
		//
		channelModulA.cheateTestMediator();
		channelModulB.cheateTestMediator();
		//
		Assert.assertFalse("test1 handler must be false", channelModulA.view.test1handled);
		Assert.assertFalse("test2 handler must be false", channelModulA.view.test2handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test3handled);
		Assert.assertFalse("test3 handler must be false", channelModulA.view.test4handled);
		//
		channelModulA.addChannelHandler_test1();
		channelModulA.addChannelHandler_test2();
		channelModulA.addChannelHandler_testChannel_test3();
		channelModulA.addChannelHandler_testChannel_test4_withParams();
		channelModulB.sendChannelMessage_testChannel_test4_withParams();
		//
		Assert.assertEquals("params must be sent properly", channelModulA.view.test4params, "test4 params string");
		Assert.assertTrue("test4 handler must be true after addChannelHandler() and sendChannelMessage()", channelModulA.view.test4handled);
		Assert.assertFalse(channelModulA.view.test1handled);
		Assert.assertFalse(channelModulA.view.test2handled);
		Assert.assertFalse(channelModulA.view.test3handled);
	}
	
	public function channeling_messegeToCommandChanneling_addChannelCommand_commandsHandlesMessage() : Void {
		//
		Assert.assertFalse("Cammand test1 executed flag mast be false", channelModulB.command1executed);
		//
		channelModulA.mapCommand_ComTest1();
		//
		channelModulB.sendChannelMessage_comTest1();
		//
		Assert.assertTrue("Command test1 must be true after commandMap.channelMap() and  sendChannelMessage()", channelModulB.command1executed);
	}


	
	public function channeling_messegeToCommandChanneling_addAndRemoveChannelCommand_commandsHandlesNothing() : Void {
		//
		Assert.assertFalse("Cammand test1 executed flag mast be false", channelModulB.command1executed);
		//
		channelModulA.mapCommand_ComTest1();
		channelModulA.unmapCommand_ComTest1();
		//
		channelModulB.sendChannelMessage_comTest1();
		//
		Assert.assertFalse("Command test1 must be false after commandMap.channelMap() then commandMap.channelUnmap() and  sendChannelMessage()", channelModulB.command1executed);
	}

}

