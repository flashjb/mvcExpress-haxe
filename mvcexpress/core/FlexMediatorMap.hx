// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Handles flex application mediators. 																													</br>
 *  FlexMediatorMap acts a bit differently from MediatorMap. Flex Mediators are not registered until "creationComplete" event is sent.					</br>
 *  This is needed because Flex view objects acts differently then simple AS3 display objects - Flex object can be created in next frames.				</br>
 *  It is common for flex objects to be completed not in the order they were created. Keep this in mind then mediating flex objects.
 * 
 */
package mvcexpress.core;

import flash.events.Event;
import flash.events.IEventDispatcher;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.mvc.Mediator;

class FlexMediatorMap extends MediatorMap 
{

	var uiComponentClass : Class<Dynamic>;
	/* CONSTRUCTOR */
	public function new(moduleName : String, messenger : Messenger, proxyMap : ProxyMap, uiComponentClass : Class<Dynamic>) {
		super(moduleName, messenger, proxyMap);
		this.uiComponentClass = uiComponentClass;
	}

	/**
	 * Automatically instantiates mediator class(if mapped), handles all injections(including viewObject), and calls onRegister function.
	 * Throws error if mediator class is not mapped to viewObject class.
	 * If object is not initialized - mvcExpress will wait for 'creationComplete' to be dispatched before mediating it.
	 * 
	 */
	override public function mediate(viewObject : Dynamic) : Void 
	{
		if((Std.is(viewObject, uiComponentClass)) && !Reflect.hasField(viewObject, "initialized") )  
		{
			cast((viewObject), IEventDispatcher).addEventListener("creationComplete", handleOnCreationComplete, false, 0, true);
		} else  {
			super.mediate(viewObject);
		}
	}

	/** Start flex view object mediation after creationComplete is dispatched. */
	function handleOnCreationComplete(event : Event) : Void {
		cast(event.target, IEventDispatcher).removeEventListener("creationComplete", handleOnCreationComplete);
		//
		super.mediate(event.target);
	}

	/**
	 * If any mediator is mediating viewObject: it calls onRemove, automatically removes all handler functions listening for messages from that mediator and deletes it.
	 * If flex object is unmediated before 'creationComplete' is dispatched - nothing is done. (because mediation is not done in the first place.)
	 * 
	 */
	override public function unmediate(viewObject : Dynamic) : Void 
	{
		var mediator : Mediator = mediatorRegistry.get(viewObject);
		if( mediator != null )  {
			super.unmediate(viewObject);
		} else  {
			// remove creationComplete handlers if any.
			if(cast((viewObject), IEventDispatcher).hasEventListener("creationComplete"))  {
				cast((viewObject), IEventDispatcher).removeEventListener("creationComplete", handleOnCreationComplete);
			}
		}
	}

}

