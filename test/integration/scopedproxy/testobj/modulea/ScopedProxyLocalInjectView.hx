/**
 * 
 */
package integration.scopedproxy.testobj.modulea;

import flash.display.Sprite;

class ScopedProxyLocalInjectView extends Sprite 
{

	var scopedProxyLocalInjectMediator : ScopedProxyLocalInjectMediator;
	
	public function pushMediatorIn(scopedProxyLocalInjectMediator : ScopedProxyLocalInjectMediator) : Void {
		this.scopedProxyLocalInjectMediator = scopedProxyLocalInjectMediator;
	}

	public function sendDataToProxy(testData : String) : Void {
		scopedProxyLocalInjectMediator.sendDataToProxy(testData);
	}

}

