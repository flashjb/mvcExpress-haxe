/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.modulemain;

import flash.events.Event;
import mvcexpress.mvc.Mediator;
import suites.SuiteModuleNames;
import suites.TestViewEvent;

class MainViewMediator extends Mediator {

	
	@inject 
	public var view : MainView;
	
	@inject 
	public var dataProxy : MainDataProxy;
	
	override public function onRegister() : Void {
		view.addEventListener(TestViewEvent.ADD_LOCAL_HANDLER, handleAddLocalHandler);
		//view.addEventListener(TestViewEvent.ADD_REMOTE_HANDLER, handleAddRemoteHandler);
		view.addEventListener(TestViewEvent.REMOVE_LOCAL_HANDLER, handleRemoveLocalHandler);
		//view.addEventListener(TestViewEvent.REMOVE_REMOTE_HANDLER, handleRemoveRemoteHandler);
		view.addEventListener(TestViewEvent.TEST_GET_PROXY_CLASS, handleTestProxyGetHandler);
	}

	override public function onRemove() : Void {
		view.removeEventListener(TestViewEvent.ADD_LOCAL_HANDLER, handleAddLocalHandler);
		//view.removeEventListener(TestViewEvent.ADD_REMOTE_HANDLER, handleAddRemoteHandler);
		view.removeEventListener(TestViewEvent.REMOVE_LOCAL_HANDLER, handleRemoveLocalHandler);
		//view.removeEventListener(TestViewEvent.REMOVE_REMOTE_HANDLER, handleRemoveRemoteHandler);
		view.removeEventListener(TestViewEvent.TEST_GET_PROXY_CLASS, handleTestProxyGetHandler);
	}

	function handleAddLocalHandler(event : TestViewEvent) : Void {
		addHandler(event.messageType, trigerLocalHandler);
	}

	//private function handleAddRemoteHandler(event:TestViewEvent):void {
	//addRemoteHandler(event.messageType, trigerRemoteHandler, SuiteModuleNames.EXTERNAL_MODULE)
	//}
	function handleRemoveLocalHandler(event : TestViewEvent) : Void {
		removeHandler(event.messageType, trigerLocalHandler);
	}

	//private function handleRemoveRemoteHandler(event:TestViewEvent):void {
	//removeRemoteHandler(event.messageType, trigerRemoteHandler, SuiteModuleNames.EXTERNAL_MODULE);
	//}
	function handleTestProxyGetHandler(event : TestViewEvent) : Void {
		// event.messageType used as module name !!
		dataProxy.testProxy = proxyMap.getProxy(event.testClass, event.messageType);
	}

	//----------------------------------
	//
	//----------------------------------
	function trigerLocalHandler(params : Dynamic) : Void {
		dataProxy.localHandlerCount++;
	}

	function trigerRemoteHandler(params : Dynamic) : Void {
		dataProxy.remoteHandlerCount++;
	}

}

