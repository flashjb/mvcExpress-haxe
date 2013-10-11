/**
 * COMMENT
 * 
 */
package integration.scopedproxy;

import integration.scopedproxy.testobj.modulea.ScopedProxyModuleA;
import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import integration.scopedproxy.testobj.moduleb.ScopedProxyModuleB;
import mvcexpress.MvcExpress;
import utils.Assert;
import utils.AsyncUtil;

class ScopedProxyTests extends Tester
{
	static public var SCOPED_PROXY_MESSAGE_NAME : String = "scopedProxyMessageName";
	static public var SCOPED_PROXY_SCOPE_NAME : String = "proxyScope";
	
	var scopedProxyModuleA : ScopedProxyModuleA;
	var scopedProxyModuleB : ScopedProxyModuleB;
	var scopedTestProxy : ScopedTestProxy;
	var randomData : String;
	
	public function new() : Void 
	{
		super( );
		testFunction("scopedProxy_hostAndInjectHostedToMediator_injectOk");
		testFunction("scopedProxy_hostAndInjectHostedToMediatorTwice_injectOk");
		testFunction("scopedProxy_hostAndInjectHostedToProxy_injectOk");
		testFunction("scopedProxy_unmapScopedProxyTwice_ok");
	
		testFunction("scopedProxy_injectPendingProxyToCommandThenHost_injectFails");//ok
		testFunction("scopedProxy_injectPendingProxyToProxyThenHost_injectOk");
		testFunction("scopedProxy_injectPendingProxyToMediatorThenHost_injectOk");
		
		
		testFunction("scopedProxy_hostAndInjectThenMessage_communicatinOk");
		testFunction("scopedProxy_HostAndMapThenMessageLocaly_communicatinOk");
		testFunction("scopedProxy_MapAndHostThenMessageLocaly_communicatinOk");
		testFunction("scopedProxy_hostThenUnhostAndInjectHosted_injectFails");
		testFunction("scopedProxy_injectHostedToCommand_injectFails");
		testFunction("scopedProxy_injectHostedToProxy_injectFails");
		testFunction("scopedProxy_injectHostedToMediator_injectFails");
		_inProgress = true;
		testFunction("scopedProxy_hostAndInjectHostedToCommand_injectOk");
		testFunction("scopedProxy_hostAndInjectHostedToProxyTwice_injectOk");
	}
	
	override public function runBeforeEveryTest() : Void {
		scopedProxyModuleA = new ScopedProxyModuleA();
		scopedProxyModuleB = new ScopedProxyModuleB();
	}

	
	override public function runAfterEveryTest() : Void {
		scopedTestProxy = null;
		scopedProxyModuleA.disposeModule();
		scopedProxyModuleB.disposeModule();
		MvcExpress.pendingInjectsTimeOut = 0;
	}

	// A host
	// B inject to mediator
	// inject ok
	//	[Test(async)]
	public function scopedProxy_hostAndInjectHostedToMediator_injectOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		//ScopedProxyModuleB.TEST_FUNCTION = AsyncUtil.asyncHandler(this, checkMediator, null, 2000, failMediatorCheck);
		ScopedProxyModuleB.TEST_FUNCTION = checkMediator;
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createMediatorWithItject();
	}

	public function failMediatorCheck(obj : Dynamic = null) : Void {
		Assert.fail("MediatorCheck timed out.");
	}

	function checkMediator(obj : Dynamic = null) : Void {
		scopedProxyModuleB.storeStuffToMediator("storedTestContent");
		Assert.assertEquals(" Mediator should be able to inject hosted proxy, and manipulate it.", "storedTestContent", scopedTestProxy.storedData);
	}

	// A host
	// B inject to mediator
	// inject ok
	// dispose modules
	// create modules
	// A host
	// B inject to mediator
	// inject ok
	//*
	//	[Test(async)]
	public function scopedProxy_hostAndInjectHostedToMediatorTwice_injectOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		ScopedProxyModuleB.TEST_FUNCTION = checkMediator2;
	//	ScopedProxyModuleB.TEST_FUNCTION = AsyncUtil.asyncHandler(this, checkMediator2, null, 2000, failMediatorCheck);
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleA.disposeModule();
		scopedProxyModuleB.disposeModule();
		scopedProxyModuleA = new ScopedProxyModuleA();
		scopedProxyModuleB = new ScopedProxyModuleB();
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createMediatorWithItject();
	}

	function checkMediator2(obj : Dynamic = null) : Void {
		scopedProxyModuleB.storeStuffToMediator("storedTestContent 2");
		Assert.assertEquals(" Mediator should be able to inject hosted proxy, and manipulate it.", "storedTestContent 2", scopedTestProxy.storedData);
	}

	// A host
	// B inject to proxy
	// inject ok
	
	public function scopedProxy_hostAndInjectHostedToProxy_injectOk() : Void {
		var scopedTestProxy : ScopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createProxyWithItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedProxyModuleB.storeStuffToProxy(randomData);
		Assert.assertEquals(" Proxy should be able to inject hosted proxy, and manipulate it.", randomData, scopedTestProxy.storedData);
	}

	//*
	// A host
	// B inject to proxy
	// inject ok
	// dispose modules
	// create modules
	// A host
	// B inject to proxy
	// inject ok
	
	public function scopedProxy_hostAndInjectHostedToProxyTwice_injectOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createProxyWithItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedProxyModuleB.storeStuffToProxy(randomData);
		scopedProxyModuleA.disposeModule();
		scopedProxyModuleB.disposeModule();
		scopedProxyModuleA = new ScopedProxyModuleA();
		scopedProxyModuleB = new ScopedProxyModuleB();
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createProxyWithItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedProxyModuleB.storeStuffToProxy(randomData);
		Assert.assertEquals(" Proxy should be able to inject hosted proxy, and manipulate it.", randomData, scopedTestProxy.storedData);
	}

	// A host
	// B inject to command
	// inject ok
	
	public function scopedProxy_hostAndInjectHostedToCommand_injectOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.storeStuffToCommand("storedTestContent");
		Assert.assertEquals(" Command should be able to inject hosted proxy, and manipulate it.", "storedTestContent", scopedTestProxy.storedData);
	}

	// B inject to mediator
	// inject fail
	
	public function scopedProxy_injectHostedToMediator_injectFails() : Void {
		scopedProxyModuleB.createMediatorWithItject();
		//throw Error("aoeu");
	}

	// B inject to proxy
	// inject fail
	public function scopedProxy_injectHostedToProxy_injectFails() : Void {
		scopedProxyModuleB.createProxyWithItject();
	}

	// B inject to command
	// inject fail
	
	public function scopedProxy_injectHostedToCommand_injectFails() : Void {
		scopedProxyModuleB.storeStuffToCommand("storedTestContent");
	}

	// A host
	// A unhost
	// B inject
	// inject fail
	
	public function scopedProxy_hostThenUnhostAndInjectHosted_injectFails() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleA.unhostTestProxy(ScopedTestProxy);
		scopedProxyModuleB.createProxyWithItject();
	}

	//
	// A Map
	// A host
	// A send message
	// A mapped sends message localy.
	
	public function scopedProxy_MapAndHostThenMessageLocaly_communicatinOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.mapTestProxy(scopedTestProxy);
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleA.createMediatorWithLocalItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedTestProxy.trigerMessage(randomData);
		//
		Assert.assertEquals(" Mediator should be able to map, host, inject local proxy, and send message to manipulate it.", randomData, scopedTestProxy.storedData);
	}

	// A host
	// A Map
	// A send message
	// A mapped sends message localy.
	
	public function scopedProxy_HostAndMapThenMessageLocaly_communicatinOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleA.mapTestProxy(scopedTestProxy);
		scopedProxyModuleA.createMediatorWithLocalItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedTestProxy.trigerMessage(randomData);
		//
		Assert.assertEquals(" Mediator should be able host, map, inject local proxy, and send message to manipulate it.", randomData, scopedTestProxy.storedData);
	}

	//
	// A host
	// B inject
	// A send message
	// B get message
	
	public function scopedProxy_hostAndInjectThenMessage_communicatinOk() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.createMediatorWithItject();
		randomData = "storedTestContent" + Math.floor(Math.random() * 10000000);
		scopedTestProxy.trigerMessage(randomData);
		Assert.assertEquals(" Mediator should be able to inject hosted proxy, and manipulate it.", randomData, scopedProxyModuleB.getMediatorProxyTestData());
	}

	// pending on mediator
	// B inject
	// A host
	// inject ok
	
	public function scopedProxy_injectPendingProxyToMediatorThenHost_injectOk() : Void {
		MvcExpress.pendingInjectsTimeOut = 1000;
		scopedProxyModuleB.createMediatorWithItject();
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.storeStuffToMediator("storedTestContent");
		Assert.assertEquals(" Mediator should be able to inject hosted proxy, and manipulate it.", "storedTestContent", scopedTestProxy.storedData);
	}

	// pending on proxy
	// B inject
	// A host
	// inject ok
	
	public function scopedProxy_injectPendingProxyToProxyThenHost_injectOk() : Void {
		MvcExpress.pendingInjectsTimeOut = 1000;
		scopedProxyModuleB.createProxyWithItject();
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleB.storeStuffToProxy("storedTestContent");
		Assert.assertEquals(" Proxy should be able to inject hosted proxy, and manipulate it.", "storedTestContent", scopedTestProxy.storedData);
	}

	// pending on command
	// B inject
	// A host
	// inject ok
	
	public function scopedProxy_injectPendingProxyToCommandThenHost_injectFails() : Void {
		MvcExpress.pendingInjectsTimeOut = 1000;
		scopedProxyModuleB.storeStuffToCommand("storedTestContent");
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		Assert.assertEquals(" Command should be able to inject hosted proxy, and manipulate it.", "storedTestContent", scopedTestProxy.storedData);
	}

	// unmap scoped mapping twice
	
	public function scopedProxy_unmapScopedProxyTwice_ok() : Void {
		scopedTestProxy = new ScopedTestProxy();
		scopedProxyModuleA.hostTestProxy(scopedTestProxy);
		scopedProxyModuleA.unhostTestProxy(ScopedTestProxy);
		scopedProxyModuleA.unhostTestProxy(ScopedTestProxy);
	}

	//*/
}

