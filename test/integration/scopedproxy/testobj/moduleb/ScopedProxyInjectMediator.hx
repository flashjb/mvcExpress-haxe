/**
 * CLASS COMMENT
 * 
 */
package integration.scopedproxy.testobj.moduleb;

import flash.display.Sprite;
import integration.scopedproxy.ScopedProxyTests;
import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import mvcexpress.mvc.Mediator;

class ScopedProxyInjectMediator extends Mediator {

	
	public var view : ScopedProxyInjectView;
	
	public var myProxy : ScopedTestProxy;
	override public function onRegister() : Void {
		trace("ScopedProxyInjectMediator.onRegister");
		view.pushMediatorIn(this);
		ScopedProxyModuleB.TEST_FUNCTION(null);
		addScopeHandler(ScopedProxyTests.SCOPED_PROXY_SCOPE_NAME, ScopedProxyTests.SCOPED_PROXY_MESSAGE_NAME, handleScopedMessage);
	}

	function handleScopedMessage(testdata : String) : Void {
		trace("ScopedProxyInjectMediator.handleScopedMessage > testdata : " + testdata);
		myProxy.storedData = testdata;
		view.testData = testdata;
	}

	override public function onRemove() : Void {
	}

	public function sendDataToProxy(testData : String) : Void {
		myProxy.storedData = testData;
	}

}

