package integration.commandpooling;

import utils.Assert;
import integration.commandpooling.testobj.CommandPoolingModule;
import integration.commandpooling.testobj.CommPoolingDependencyProxy;
import integration.commandpooling.testobj.controller.CommPoolingDependantCommand;
import integration.commandpooling.testobj.controller.CommPoolingDependencyRemove;
import integration.commandpooling.testobj.controller.CommPoolingLockedCommand;
import integration.commandpooling.testobj.controller.CommPoolingLockedFailCommand;
import integration.commandpooling.testobj.controller.CommPoolingSimpleCommand;
import integration.commandpooling.testobj.controller.CommPoolingUnlockedCommand;
import integration.mediating.testobj.*;
import integration.mediating.testobj.view.*;
import integration.mediating.testobj.view.viewobj.*;
import mvcexpress.core.*;

class CommandPoolingTests extends Tester {

	static var EXECUTE_SIMPLE_POOLED_COMMAND : String = "executeSimplePooledCommand";
	static var EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY : String = "executePooledCommandWithDependency";
	static var EXECUTE_POOLED_COMMAND_WITH_LOCK : String = "executePooledCommandWithLock";
	static var EXECUTE_POOLED_COMMAND_WITH_UNLOCK_ONLY : String = "executePooledCommandWithUnlockOnly";
	static var EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK : String = "executePooledCommandWithFailingLock";
	static public var EXECUTE_REMOVED_DEPENDENCY_COMMAND : String = "executeRemovedDependencyCommand";
	var commandPoolingModule : CommandPoolingModule;
	var commandPoolModuleCommandMap : CommandMap;
	var commandPoolModuleProxyMap : ProxyMap;
	
	public function new (){
		super( );
		testFunction("commandPooling_cashingCammandUsedTwice_constructedOnce");
		testFunction("commandPooling_cashingCammandUsedTwice_executedTwice");
		testFunction("commandPooling_clearCommandPoolUseTwice_commandCreatedTwice");
		testFunction("commandPooling_useCommandWithLock_commandCreatedTwice");
		testFunction("commandPooling_useCommandWithUnlockBeforeLock_fails");
		testFunction("commandPooling_useCommandWithUnmapedDependency_fails");
		testFunction("commandPooling_useCommandWithRemapedDependency_commandCreatedTwice");
		testFunction("commandPooling_useCommandLockingWithRemovedDependery_secorndCommandUseFails");
		testFunction("commandPooling_useCommandLockingWithChangedDependery_secorndCommandUseSecondDependercy");
	}
	
	
	override public function runBeforeEveryTest() : Void {
		commandPoolingModule = new CommandPoolingModule();
		commandPoolModuleCommandMap = commandPoolingModule.getCommandMap();
		commandPoolModuleProxyMap = commandPoolingModule.getProxyMap();
	}

	
	override public function runAfterEveryTest() : Void {
		commandPoolModuleCommandMap = null;
		commandPoolingModule.disposeModule();
		commandPoolingModule = null;
		CommPoolingSimpleCommand.constructCount = 0;
		CommPoolingSimpleCommand.executeCount = 0;
		CommPoolingDependantCommand.constructCount = 0;
		CommPoolingDependantCommand.executeCount = 0;
	}

	
	public function commandPooling_cashingCammandUsedTwice_constructedOnce() : Void {
		commandPoolModuleCommandMap.map(EXECUTE_SIMPLE_POOLED_COMMAND, CommPoolingSimpleCommand);
		//
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		Assert.assertEquals("Pooled command should be instantiated only once.", 1, CommPoolingSimpleCommand.constructCount);
	}
	
	public function commandPooling_cashingCammandUsedTwice_executedTwice() : Void {
		commandPoolModuleCommandMap.map(EXECUTE_SIMPLE_POOLED_COMMAND, CommPoolingSimpleCommand);
		//
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		Assert.assertEquals("Pooled command should be executed twice.", 2, CommPoolingSimpleCommand.executeCount);
	}

	// map command
	// use cammand
	// clear pool.
	// use command
	// - must be 2 creations.
	
	public function commandPooling_clearCommandPoolUseTwice_commandCreatedTwice() : Void {
		commandPoolModuleCommandMap.map(EXECUTE_SIMPLE_POOLED_COMMAND, CommPoolingSimpleCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		commandPoolModuleCommandMap.clearCommandPool(CommPoolingSimpleCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_SIMPLE_POOLED_COMMAND);
		Assert.assertEquals("Pooled command should be created twice after it is cleared.", 2, CommPoolingSimpleCommand.constructCount);
	}

	// map command
	// use command - lock
	// use command - lock
	// - must be 2 creations.
	
	public function commandPooling_useCommandWithLock_commandCreatedTwice() : Void {
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_LOCK, CommPoolingLockedCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_LOCK);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_LOCK);
		Assert.assertEquals("Pooled command with lock should be created twice.", 2, CommPoolingLockedCommand.constructCount);
	}

	// map command
	// use command - unlock
	// - error - must be locked first
	
	public function commandPooling_useCommandWithUnlockBeforeLock_fails() : Void {
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_UNLOCK_ONLY, CommPoolingUnlockedCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_UNLOCK_ONLY);
	}

	//----------------------------------
	//     dependencies
	//----------------------------------
	// map dependency
	// map command
	// use command
	// remove dependency
	// use command
	// - must be error - missing dependency.
	
	public function commandPooling_useCommandWithUnmapedDependency_fails() : Void {
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy());
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY, CommPoolingDependantCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY);
		commandPoolModuleProxyMap.unmap(CommPoolingDependencyProxy);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY);
	}

	// map dependency
	// map command
	// use command
	// remove dependency
	// map dependency
	// use command
	// - must be 2 creations.
	
	public function commandPooling_useCommandWithRemapedDependency_commandCreatedTwice() : Void {
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy());
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY, CommPoolingDependantCommand);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY);
		commandPoolModuleProxyMap.unmap(CommPoolingDependencyProxy);
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy());
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_DEPENDENCY);
		Assert.assertEquals("Pooled command should be created twice.", 2, CommPoolingDependantCommand.constructCount);
	}

	// map dependency
	// map command
	// use command
	// lock command
	// remove dependency
	// unlock command
	// use command
	// - must be error for missing dependency.
	
	public function commandPooling_useCommandLockingWithRemovedDependery_secorndCommandUseFails() : Void {
		CommPoolingLockedFailCommand.executedProxyNames = "";
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy("proxy1"));
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK, CommPoolingLockedFailCommand);
		commandPoolModuleCommandMap.map(CommandPoolingTests.EXECUTE_REMOVED_DEPENDENCY_COMMAND, CommPoolingDependencyRemove);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK);
	}

	// map dependency 1
	// map command
	// use command
	// lock command
	// remove dependency
	// unlock command
	// map dependency 2
	// use command
	// - must use dependercy 2.
	
	public function commandPooling_useCommandLockingWithChangedDependery_secorndCommandUseSecondDependercy() : Void {
		CommPoolingLockedFailCommand.executedProxyNames = "";
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy("proxy1"));
		commandPoolModuleCommandMap.map(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK, CommPoolingLockedFailCommand);
		commandPoolModuleCommandMap.map(CommandPoolingTests.EXECUTE_REMOVED_DEPENDENCY_COMMAND, CommPoolingDependencyRemove);
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK);
		commandPoolModuleProxyMap.map(new CommPoolingDependencyProxy("-proxy2"));
		commandPoolingModule.sendLocalMessage(EXECUTE_POOLED_COMMAND_WITH_FAILING_LOCK);
		Assert.assertEquals("Pooled comamnd dependency swap while command is locked should end in pooled command reinstantiation.", "proxy1-proxy2", CommPoolingLockedFailCommand.executedProxyNames);
	}

}

