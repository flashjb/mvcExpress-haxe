/**
 * CLASS COMMENT
 * 
 */
package integration.scopedproxy.testobj.modulea;

import flash.display.Sprite;
import integration.scopedproxy.ScopedProxyTests;
import integration.scopedproxy.testobj.modulea.ScopedTestProxy;
import mvcexpress.mvc.Mediator;

class ScopedProxyLocalInjectMediator extends Mediator {

	@inject
	public var view : ScopedProxyLocalInjectView;
	
	@inject
	public var myProxy : ScopedTestProxy;
	
	override public function onRegister() : Void {
		trace("ScopedProxyInjectMediator.onRegister");
		view.pushMediatorIn(this);
		//ScopedProxyModuleB.TEST_FUNCTION(null);
		addHandler(ScopedProxyTests.SCOPED_PROXY_MESSAGE_NAME, handleScopedMessage);
	}

	function handleScopedMessage(testdata : String) : Void {
		trace("ScopedProxyInjectMediator.handleScopedMessage > testdata : " + testdata);
		myProxy.storedData = testdata;
	}

	override public function onRemove() : Void {
	}

	public function sendDataToProxy(testData : String) : Void {
		myProxy.storedData = testData;
	}

}

