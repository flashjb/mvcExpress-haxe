/**
 * COMMENT
 * 
 */
package suites.proxymap;

import utils.Assert;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.ProxyMap;
import mvcexpress.core.messenger.Messenger;
//import mvcexpress.core.namespace.PureLegsCore;
import suites.proxymap.proxytestobj.ProxyTestObj;
import suites.proxymap.proxytestobj.TestProxy;

class OldProxyMapTests extends Tester {

	var messenger : Messenger;
	var proxyMap : ProxyMap;
	var callCaunter : Int;
	var callsExpected : Int;
	
	
	public function new(  )
	{
		super(  );
		testFunction( "using_class_proxy" );// OK
		testFunction( "using_class_proxy_twice_both_should_be_equal" );// OK
		testFunction( "mapping_class_proxy_twice_throws_error" ); //>> Error sent // OK
		testFunction( "using_object_test" );// OK
		testFunction( "using_object_proxy_twice_both_should_be_equal" );// OK
		testFunction( "mapping_object_proxy_twice_throws_error" );// >> Error sent // OK
		testFunction( "mappings_does_not_exists_throws_error" );// >> Error sent // OK
		testFunction( "removing_class_proxy" );//>> throw error ... is it ok ???
		testFunction( "removing_object_proxy" );//>> throw error ... is it ok ???
		testFunction( "debug_test_isMapped_false" );
		testFunction( "debug_test_isMapped_true" );
	}
	
	override public function runBeforeEveryTest() : Void {
		//use namespace pureLegsCore
		Messenger.allowInstantiation = true;
		messenger = new Messenger("test");
		Messenger.allowInstantiation = false;
		proxyMap = new ProxyMap("test", messenger);
		callCaunter = 0;
		callsExpected = 0;
	}

	
	override public function runAfterEveryTest() : Void {
		//use namespace pureLegsCore
		messenger = null;
		proxyMap = null;
		callCaunter = 0;
		callsExpected = 0;
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function using_class_proxy() : Void 
	{
		//use namespace pureLegsCore
		proxyMap.map(new TestProxy());
		var obj1 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff( obj1, ProxyTestObj );
		
		Assert.assertNotNull("Injected object must be not null", obj1.testProxy);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function using_class_proxy_twice_both_should_be_equal() : Void {
		//use namespace pureLegsCore
		proxyMap.map(new TestProxy());
		var obj1 : ProxyTestObj = new ProxyTestObj();
		var obj2 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
		proxyMap.injectStuff(obj2, ProxyTestObj);
		
		Assert.assertEquals("Injected class object must be equel everythere.", obj1.testProxy, obj2.testProxy);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function mapping_class_proxy_twice_throws_error() : Void {
		proxyMap.map(new TestProxy());
		proxyMap.map(new TestProxy());
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function using_object_test() : Void {
		//use namespace pureLegsCore
		var testProxy : TestProxy = new TestProxy();
		proxyMap.map(testProxy, TestProxy);
		var obj1 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
		
		Assert.assertEquals("Maped value object must be used for iject object.", obj1.testProxy, testProxy);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function using_object_proxy_twice_both_should_be_equal() : Void {
		//use namespace pureLegsCore
		var testProxy : TestProxy = new TestProxy();
		proxyMap.map(testProxy);
		var obj1 : ProxyTestObj = new ProxyTestObj();
		var obj2 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
		proxyMap.injectStuff(obj2, ProxyTestObj);
		Assert.assertEquals("Injected value object must be equel everythere.", obj1.testProxy, obj2.testProxy);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function mapping_object_proxy_twice_throws_error() : Void {
		var testProxy : TestProxy = new TestProxy();
		proxyMap.map(testProxy);
		proxyMap.map(testProxy);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function mappings_does_not_exists_throws_error() : Void {
		//use namespace pureLegsCore
		var obj1 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function removing_class_proxy() : Void {
		//use namespace pureLegsCore
		proxyMap.map(new TestProxy());
		proxyMap.unmap(TestProxy);
		var obj1 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
	}

	//----------------------------------
	//
	//----------------------------------
	
	public function removing_object_proxy() : Void {
		//use namespace pureLegsCore
		var testProxy : TestProxy = new TestProxy();
		proxyMap.map(testProxy);
		proxyMap.unmap(TestProxy);
		var obj1 : ProxyTestObj = new ProxyTestObj();
		proxyMap.injectStuff(obj1, ProxyTestObj);
	}

	//----------------------------------
	//     isMapped()
	//----------------------------------
	
	public function debug_test_isMapped_false() : Void {
		//use namespace pureLegsCore
		var testProxy : TestProxy = new TestProxy();
		//proxyMap.map(testProxy);
		Assert.assertFalse("isMapped() should retturn false with NOT mapped proxy.", proxyMap.isMapped(testProxy));
	}

	
	public function debug_test_isMapped_true() : Void {
		//use namespace pureLegsCore
		var testProxy : TestProxy = new TestProxy();
		proxyMap.map(testProxy);
		Assert.assertTrue("isMapped() should retturn true with mapped proxy.", proxyMap.isMapped(testProxy));
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
		//trace( "ControllerTests.callBackCheck > obj : " + obj );
		if(callCaunter != callsExpected)  {
			Assert.fail("Expected " + callsExpected + " calls, but " + callCaunter + " was received...");
		}
	}

	public function callBackIncrease(obj : Dynamic = null) : Void {
		//trace( "ControllerTests.callBackIncrease > obj : " + obj );
		callCaunter++;
	}

}

