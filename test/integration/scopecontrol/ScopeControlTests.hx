/**
 * COMMENT
 * 
 */
package integration.scopecontrol;

import integration.agenerictestobjects.constants.GenericScopeIds;
import integration.agenerictestobjects.constants.GenericTestMessage;
import integration.agenerictestobjects.constants.GenericTestStrings;
import integration.agenerictestobjects.controller.GenericCommand;
import integration.agenerictestobjects.GenericTestModule;
import integration.agenerictestobjects.model.GenericTestProxy;
import integration.agenerictestobjects.view.GenericViewObject;
import integration.agenerictestobjects.view.GenericViewObjectMediator_handlingScopeMessage;
import integration.agenerictestobjects.view.GenericViewObjectMediator_withScopedInject;
import integration.agenerictestobjects.view.GenericViewObjectMediator_withScopedInject_handlingScopeMessage;
import integration.scopedproxy.testobj.modulea.ScopedProxyModuleA;
import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import integration.scopedproxy.testobj.moduleb.ScopedProxyModuleB;
import mvcexpress.MvcExpress;
import utils.Assert;
import utils.AsyncUtil;

class ScopeControlTests  extends Tester  {

	var moduleOut : GenericTestModule;
	var moduleIn : GenericTestModule;
	
	public function new ()
	{
		super();
		testFunction("scopeControl_messageOutWithoutScopeRegister_fails");
		testFunction("scopeControl_messageInHandleWithoutScopeRegister_fails");
		testFunction("scopeControl_messageInCommandMapWithoutScopeRegister_fails");
		testFunction("scopeControl_scopedInjectWithoutScopeRegister_fails");
		testFunction("scopeControl_messageOutWithScopeRegister_ok");
		testFunction("scopeControl_messageInHandleWithScopeRegister_ok");
		testFunction("scopeControl_messageInCommandMapWithScopeRegister_ok");
		testFunction("scopeControl_scopedInjectWithScopeRegister_ok");
		testFunction("scopeControl_messageOutWithScopeRegisterWithModuleRecreate_fails");
		testFunction("scopeControl_messageInHandleWithScopeRegisterWithModuleRecreate_fails");
		testFunction("scopeControl_messageInCommandMapWithScopeRegisterWithModuleRecreate_fails");
		testFunction("scopeControl_scopedInjectWithScopeRegisterWithModuleRecreate_fails");
		testFunction("scopeControl_messageOutAndInWithScopeRegister_ok");
		testFunction("scopeControl_injectedProxyChangeShouldBeHandled_ok");
		
	}
	
	override public function runBeforeEveryTest() : Void {
		moduleOut = new GenericTestModule("moduleOut");
		moduleIn = new GenericTestModule("moduleIn");
	}

	override public function runAfterEveryTest() : Void {
		moduleOut.disposeModule();
		moduleIn.disposeModule();
	}

	//----------------------------------
	//     should fail without registering
	//----------------------------------
	
	public function scopeControl_messageOutWithoutScopeRegister_fails() : Void {
		moduleOut.sendScopeMessageTest(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE);
	}

	
	public function scopeControl_messageInHandleWithoutScopeRegister_fails() : Void {
		moduleIn.mediatorMap_mediateWith(new GenericViewObject(), GenericViewObjectMediator_handlingScopeMessage);
	}

	
	public function scopeControl_messageInCommandMapWithoutScopeRegister_fails() : Void {
		moduleIn.commandMap_scopeMap(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE, GenericCommand);
	}

	public function scopeControl_scopedInjectWithoutScopeRegister_fails() : Void {
		moduleIn.proxymap_scopeMap(GenericScopeIds.TEST_SCOPE, new GenericTestProxy());
	}

	//----------------------------------
	//     should be ok after registernig
	//----------------------------------

	public function scopeControl_messageOutWithScopeRegister_ok() : Void {
		moduleOut.registerScopeTest(GenericScopeIds.TEST_SCOPE, true, false, false);
		moduleOut.sendScopeMessageTest(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE);
	}

	
	public function scopeControl_messageInHandleWithScopeRegister_ok() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, true, false);
		moduleIn.mediatorMap_mediateWith(new GenericViewObject(), GenericViewObjectMediator_handlingScopeMessage);
	}
	
	public function scopeControl_messageInCommandMapWithScopeRegister_ok() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, true, false);
		moduleIn.commandMap_scopeMap(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE, GenericCommand);
	}

	public function scopeControl_scopedInjectWithScopeRegister_ok() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, false, true);
		moduleIn.proxymap_scopeMap(GenericScopeIds.TEST_SCOPE, new GenericTestProxy());
	}

	//----------------------------------
	//     should fail if module removed and added without registering
	//----------------------------------
	
	public function scopeControl_messageOutWithScopeRegisterWithModuleRecreate_fails() : Void {
		moduleOut.registerScopeTest(GenericScopeIds.TEST_SCOPE, true, false, false);
		moduleOut.disposeModule();
		moduleOut = new GenericTestModule("moduleOut");
		moduleOut.sendScopeMessageTest(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE);
	}


	public function scopeControl_messageInHandleWithScopeRegisterWithModuleRecreate_fails() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, true, false);
		moduleIn.disposeModule();
		moduleIn = new GenericTestModule("moduleIn");
		moduleIn.mediatorMap_mediateWith(new GenericViewObject(), GenericViewObjectMediator_handlingScopeMessage);
	}

		
	public function scopeControl_messageInCommandMapWithScopeRegisterWithModuleRecreate_fails() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, true, false);
		moduleIn.disposeModule();
		moduleIn = new GenericTestModule("moduleIn");
		moduleIn.commandMap_scopeMap(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE, GenericCommand);
	}


	public function scopeControl_scopedInjectWithScopeRegisterWithModuleRecreate_fails() : Void {
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, false, true);
		moduleIn.disposeModule();
		moduleIn = new GenericTestModule("moduleIn");
		moduleIn.proxymap_scopeMap(GenericScopeIds.TEST_SCOPE, new GenericTestProxy());
	}

	//----------------------------------
	//     misc
	//----------------------------------
	/// test can send and receive
	
	public function scopeControl_messageOutAndInWithScopeRegister_ok() : Void {
		moduleOut.registerScopeTest(GenericScopeIds.TEST_SCOPE, true, true, false);
		moduleOut.sendScopeMessageTest(GenericScopeIds.TEST_SCOPE, GenericTestMessage.TEST_MESSAGE);
		moduleOut.mediatorMap_mediateWith(new GenericViewObject(), GenericViewObjectMediator_handlingScopeMessage);
	}

	// inject porxy, and force it to send message on change... - not fail with receiving enabled.
	
	public function scopeControl_injectedProxyChangeShouldBeHandled_ok() : Void {
		var testProxy : GenericTestProxy = new GenericTestProxy();
		// set up module out
		moduleOut.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, false, true);
		moduleOut.proxymap_scopeMap(GenericScopeIds.TEST_SCOPE, testProxy);
		// set up moduleIn
		moduleIn.registerScopeTest(GenericScopeIds.TEST_SCOPE, false, true, false);
		moduleIn.mediatorMap_mediateWith(new GenericViewObject(), GenericViewObjectMediator_withScopedInject_handlingScopeMessage);
		// triger proxy.
		testProxy.sendMessageTest(GenericTestMessage.TEST_MESSAGE);
		// test data.
		Assert.assertEquals("remote proxy should react to message and set data.", testProxy.testData, GenericTestStrings.data1);
	}

}

