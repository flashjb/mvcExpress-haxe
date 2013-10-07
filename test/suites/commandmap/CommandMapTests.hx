/**
 * COMMENT
 * 
 */
package suites.commandmap;

import flash.display.Sprite;
import utils.Assert;
import mvcexpress.core.CommandMap;
import mvcexpress.core.MediatorMap;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
//import mvcexpress.core.namespace.PureLegsCore;
import suites.commandmap.commands.ExtendedeSuperInterfaceParamsCommand;
import suites.commandmap.commands.ExtendedSuperParamCommand;
import suites.commandmap.commands.NoExecuteCommand;
import suites.commandmap.commands.NoParamsCommand;
import suites.commandmap.commands.SuperInterfaceParamCommand;
import suites.commandmap.commands.SuperParamCommand;
import suites.commandmap.commands.TestCommand1;
import suites.commandmap.commands.TestCommand2;
import suites.testobjects.ExtendedTestObject;
import utils.AsyncUtil;
import mvcexpress.mvc.Command;

class CommandMapTests  extends Tester {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var mediatorMap : MediatorMap;
	var commandMap : CommandMap;
	var callCaunter : Int;
	var callsExpected : Int;
	var testParamObject : ExtendedTestObject;
	
	public function new ()
	{
		super( );
		
		testFunction("test_command_execute");
		testFunction("test_two_command_execute");
		testFunction("test_two_add_one_remove_command_execute");
		testFunction("test_cammandMap_command_execute");
		testFunction("test_no_execute_command_map");
		testFunction("test_no_params_command_map");
		testFunction("execute_command_with_no_param");
		testFunction("execute_command_with_extended_object_param");
		testFunction("execute_command_with_intefrace_of_extended_object_param");
		testFunction("execute_command_with_superclass_object_param");
		testFunction("execute_command_with_intefrace_of_superclass_object_param");
		testFunction("execute_command_with_bad_typed_object_param");
		testFunction("debug_map_not_command_fails");
		testFunction("debug_test_isMapped_false_wrong_message");
		testFunction("debug_test_isMapped_false_wrong_class");
		testFunction("debug_test_isMapped_true");
	}
	
	override public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		proxyMap = new ProxyMap("test", messenger);
		mediatorMap = new MediatorMap("test", messenger, proxyMap);
		commandMap = new CommandMap("test", messenger, proxyMap, mediatorMap);
		callCaunter = 0;
		callsExpected = 0;
		testParamObject = new ExtendedTestObject();
	}

	override public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
		messenger = null;
		proxyMap = null;
		commandMap = null;
		callCaunter = 0;
		callsExpected = 0;
		testParamObject = null;
	}

	//	[Test(async,description="Test command execution")]
	public function test_command_execute() : Void {
		TestCommand1.TEST_FUNCTION = callBackSuccess;//AsyncUtil.asyncHandler(this);
		commandMap.map("test", TestCommand1);
		messenger.send("test");
	}
	//	[Test(async,description="Test two command execution")]
	public function test_two_command_execute() : Void {
		callsExpected = 2;
		TestCommand1.TEST_FUNCTION = callBackIncrease;//AsyncUtil.asyncHandler(this, callBackIncrease, null, 300, callBackCheck);
		TestCommand2.TEST_FUNCTION = callBackIncrease;//AsyncUtil.asyncHandler(this, callBackIncrease, null, 300, callBackCheck);
		commandMap.map("test", TestCommand1);
		commandMap.map("test", TestCommand2);
		messenger.send("test");
	}

	//	[Test(async,description="Test two command add + 1 remove")]
	public function test_two_add_one_remove_command_execute() : Void {
		callsExpected = 1;
		TestCommand1.TEST_FUNCTION = callBackIncrease;//AsyncUtil.asyncHandler(this, callBackIncrease, null, 300, callBackCheck);
		TestCommand2.TEST_FUNCTION = callBackIncrease;//AsyncUtil.asyncHandler(this, callBackIncrease, null, 300, callBackCheck);
		commandMap.map("test", TestCommand1);
		commandMap.map("test", TestCommand2);
		commandMap.unmap("test", TestCommand2);
		messenger.send("test");
	}

	//	[Test(async,description="commandMap.execute() test")]
	public function test_cammandMap_command_execute() : Void {
		callsExpected = 1;
		TestCommand1.TEST_FUNCTION = callBackIncrease;//AsyncUtil.asyncHandler(this, callBackIncrease, null, 300, callBackCheck);
		commandMap.execute(TestCommand1);
	}

	public function test_no_execute_command_map() : Void {
		#if debug
			commandMap.map("test", NoExecuteCommand);
			return;
		#end
		throw ("Debug mode is needed for this test.");
		//		}
	}

		
	public function test_no_params_command_map() : Void {
		#if debug
			commandMap.map("test", NoParamsCommand);
			return;
		#end
		throw ("Debug mode is needed for this test.");
		//		}
	}

	public function execute_command_with_no_param() : Void {
		commandMap.execute(ExtendedSuperParamCommand);
	}

	
	public function execute_command_with_extended_object_param() : Void {
		commandMap.execute(ExtendedSuperParamCommand, testParamObject);
	}

	
	public function execute_command_with_intefrace_of_extended_object_param() : Void {
		commandMap.execute(ExtendedeSuperInterfaceParamsCommand, testParamObject);
	}

	
	public function execute_command_with_superclass_object_param() : Void {
		commandMap.execute(SuperParamCommand, testParamObject);
	}

	public function execute_command_with_intefrace_of_superclass_object_param() : Void {
		commandMap.execute(SuperInterfaceParamCommand, testParamObject);
	}

	public function execute_command_with_bad_typed_object_param() : Void {
		commandMap.execute(SuperInterfaceParamCommand, new Sprite());
	}

	
	
	public function debug_map_not_command_fails() : Void {
		var errorChecked : Bool = false;
		#if debug
			errorChecked = true;
			commandMap.map("test", Sprite);
		#end
		if(!errorChecked)  {
			Assert.fail("fake error");
		}
	}

	//----------------------------------
	//     isMapped()
	//----------------------------------
	
	public function debug_test_isMapped_false_wrong_message() : Void {
		commandMap.map("test", TestCommand1);
		Assert.assertFalse("isMapped() should retturn false with NOT mapped message.", commandMap.isMapped("test1", TestCommand1));
	}

	public function debug_test_isMapped_false_wrong_class() : Void {
		commandMap.map("test", TestCommand1);
		Assert.assertFalse("isMapped() should retturn false with NOT mapped command class to message.", commandMap.isMapped("test", TestCommand2));
	}

	
	public function debug_test_isMapped_true() : Void {
		commandMap.map("test", TestCommand1);
		Assert.assertTrue("isMapped() should retturn true with mapped proxy.", commandMap.isMapped("test", TestCommand1));
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackFail(obj : Dynamic = null) : Void {
		Assert.fail("CallBack should not be called...");
	}

	public function callBackSuccess(obj : Dynamic = null) : Void {
	}

	//----------------------------------
	//
	//----------------------------------
	function callBackCheck(obj : Dynamic = null) : Void {
		trace( "ControllerTests.callBackCheck > obj : " + obj );
		if(callCaunter != callsExpected)  {
			Assert.fail("Expected " + callsExpected + " calls, but " + callCaunter + " was received...");
		}
	}

	public function callBackIncrease(obj : Dynamic = null) : Void {
		trace( "ControllerTests.callBackIncrease > obj : " + obj );
		callCaunter++;
	}

}

