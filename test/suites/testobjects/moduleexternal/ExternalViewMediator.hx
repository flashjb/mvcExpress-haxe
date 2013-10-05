/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.moduleexternal;

import flash.events.Event;
import mvcexpress.mvc.Mediator;
import suites.SuiteModuleNames;
import suites.TestViewEvent;

class ExternalViewMediator extends Mediator 
{
	
	@inject 
	public var view : ExternalView;
	
	@inject 
	public var dataProxy : ExternalDataProxy;
	
	override public function onRegister() : Void {
		view.addEventListener(TestViewEvent.ADD_LOCAL_HANDLER, handleAddLocalHandler);
		view.addEventListener(TestViewEvent.ADD_REMOTE_HANDLER, handleAddRemoteHandler);
		view.addEventListener(TestViewEvent.REMOVE_LOCAL_HANDLER, handleRemoveLocalHandler);
		view.addEventListener(TestViewEvent.REMOVE_REMOTE_HANDLER, handleRemoveRemoteHandler);
	}

	override public function onRemove() : Void {
		view.removeEventListener(TestViewEvent.ADD_LOCAL_HANDLER, handleAddLocalHandler);
		view.removeEventListener(TestViewEvent.ADD_REMOTE_HANDLER, handleAddRemoteHandler);
		view.removeEventListener(TestViewEvent.REMOVE_LOCAL_HANDLER, handleRemoveLocalHandler);
		view.removeEventListener(TestViewEvent.REMOVE_REMOTE_HANDLER, handleRemoveRemoteHandler);
	}

	function handleAddLocalHandler(event : TestViewEvent) : Void {
		addHandler(event.messageType, trigerLocalHandler);
	}

	function handleAddRemoteHandler(event : TestViewEvent) : Void {
		addRemoteHandler(event.messageType, trigerRemoteHandler, SuiteModuleNames.MAIN_MODULE);
	}

	function handleRemoveLocalHandler(event : TestViewEvent) : Void {
		removeHandler(event.messageType, trigerLocalHandler);
	}

	function handleRemoveRemoteHandler(event : TestViewEvent) : Void {
		removeRemoteHandler(event.messageType, trigerRemoteHandler, SuiteModuleNames.MAIN_MODULE);
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

