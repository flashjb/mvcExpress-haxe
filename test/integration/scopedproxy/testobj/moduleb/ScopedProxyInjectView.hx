/**
 * 
 */
package integration.scopedproxy.testobj.moduleb;

import flash.display.Sprite;

class ScopedProxyInjectView extends Sprite {

	public var testData : String;
	var scopedProxyInjectMediator : ScopedProxyInjectMediator;
	public function pushMediatorIn(scopedProxyInjectMediator : ScopedProxyInjectMediator) : Void {
		trace("ScopedProxyInjectView.pushMediatorIn > scopedProxyInjectMediator : " + scopedProxyInjectMediator);
		this.scopedProxyInjectMediator = scopedProxyInjectMediator;
	}

	public function sendDataToProxy(testData : String) : Void {
		trace("ScopedProxyInjectView.sendDataToProxy > testData : " + testData);
		trace("scopedProxyInjectMediator : " + scopedProxyInjectMediator);
		scopedProxyInjectMediator.sendDataToProxy(testData);
	}

}

