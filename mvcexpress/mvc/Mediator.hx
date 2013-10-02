// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Mediates single view object. 																															</br>
 *  Main responsibility of mediator is to send message from framework  to view, and receive messages from view and send to framework.						</br>
 *  Can get proxies injected.																																</br>
 *  Can send messages. (sends messages then user interacts with the view)																					</br>
 *  Can handle messages. (handles data change or other framework messages)
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.mvc;

import flash.events.IEventDispatcher;
import flash.utils.Dictionary;
import mvcexpress.MvcExpress;
import mvcexpress.core.ModuleManager;
import mvcexpress.core.interfaces.IMediatorMap;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.HandlerVO;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler;
import mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage;
import mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage;

class Mediator {
	var isReady(getIsReady, never) : Bool;

	// name of module this mediator is working in.
	/** @private */
	var moduleName : String;
	public var proxyMap : IProxyMap;
	/**
	 * Handles application mediators.
	 */
	public var mediatorMap : IMediatorMap;
	// used internally for communication
	/** @private */
	var messenger : Messenger;
	// Shows if proxy is ready. Read only.
	var _isReady : Bool;
	// = false;
	// amount of pending injections.
	/** @private */
	var pendingInjections : Int;
	// = 0;
	/** all added message handlers. */
	var handlerVoRegistry : Array<HandlerVO>;
	/** contains dictionary of added event listeners, stored by event listening function as a key. For event useCapture = false*/
	var eventListenerRegistry : Dictionary;
	/* or Dictionary by Function */
	/** contains array of added event listeners, stored by event listening function as a key. For event useCapture = true*/
	var eventListenerCaptureRegistry : Dictionary;
	/* or Dictionary by Function */
	// Allows Mediator to be constructed. (removed from release build to save some performance.)
	/** @private */
	//	CONFIG::debug
	//	static pureLegsCore var canConstruct:Boolean; // = false;
	/** CONSTRUCTOR */
	public function new() {
		handlerVoRegistry = new Array<HandlerVO>();
		eventListenerRegistry = new Dictionary();
		eventListenerCaptureRegistry = new Dictionary();
		//		CONFIG::debug {
		//			use namespace pureLegsCore;
		//			if (!canConstruct) {
		//				throw Error("Mediator:" + this + " can be constructed only by framework. If you want to use it - map it to view object class with 'mediatorMap.map()', and then mediate instance of the view object with 'mediatorMap.mediate()'.");
		//			}
		//		}
	}

	//----------------------------------
	//     Life cycle functions
	//----------------------------------
	/**
	 * Then viewObject is mediated by this mediator - it is inited first and then this function is called.
	 */
	public function onRegister() : Void {
		// for override
	}

	/**
	 * Then viewObject is unmediated by this mediator - this function is called first and then mediator is removed.
	 */
	public function onRemove() : Void {
		// for override
	}

	/**
	 * Indicates if mediator is ready for usage. (all dependencies are injected.)
	 */
	function getIsReady() : Bool {
		return _isReady;
	}

	//----------------------------------
	//     MESSAGING
	//----------------------------------
	/**
	 * Sends a message with optional params object inside of current module.
	 * @param	type	type of the message for Commands or Mediator's handle function to react to.
	 * @param	params	Object that will be passed to Command execute() function or to handle functions.
	 */
	function sendMessage(type : String, params : Dynamic = null) : Void {
		use;
		namespace;
		pureLegsCore;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceMediator_sendMessage(moduleName, this, type, params, true));
		//		}
		//
		messenger.send(type, params);
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceMediator_sendMessage(moduleName, this, type, params, false));
		//		}
	}

	/**
	 * Sends scoped module to module message, all modules that are listening to specified scopeName and message type will get it.
	 * @param	scopeName	both sending and receiving modules must use same scope to make module to module communication.
	 * @param	type		type of the message for Commands or Mediator's handle function to react to.
	 * @param	params		Object that will be passed to Command execute() function and to handle functions.
	 */
	function sendScopeMessage(scopeName : String, type : String, params : Dynamic = null) : Void {
		use;
		namespace;
		pureLegsCore;
		// log the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceMediator_sendScopeMessage(moduleName, this, type, params, true));
		//		}
		//
		ModuleManager.sendScopeMessage(moduleName, scopeName, type, params);
		//
		// clean up logging the action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceMediator_sendScopeMessage(moduleName, this, type, params, false));
		//		}
	}

	//----------------------------------
	//     message handlers
	//----------------------------------
	/**
	 * adds handle function to be called then message of given type is sent.
	 * @param	type	message type for handle function to react to.
	 * @param	handler	function that will be called then needed message is sent. this function must expect one parameter. (you can set your custom type for this param object, or leave it as Object)
	 */
	function addHandler(type : String, handler : Dynamic) : Void {
		//use namespace pureLegsCore;
		#if debug
			if (handler.length < 1) {
				throw Error("Every message handler function needs at least one parameter. You are trying to add handler function from " + getQualifiedClassName(this) + " for message type:" + type);
			}
			if (!Boolean(type) || type == "null" || type == "undefined") {
				throw Error("Message type:[" + type + "] can not be empty or 'null'.(You are trying to add message handler in: " + this + ")");
			}
			MvcExpress.debug(new TraceMediator_addHandler(moduleName, this, type, handler));
	
			handlerVoRegistry[handlerVoRegistry.length] = messenger.addHandler(type, handler, getQualifiedClassName(this));
			return;
		#end
		
		handlerVoRegistry[handlerVoRegistry.length] = messenger.addHandler(type, handler);
	}

	/**
	 * Removes handle function from message of given type.
	 * Then Mediator is removed(unmediated) all message handlers are automatically removed by framework.
	 * @param	type	message type that was set for handle function to react to.
	 * @param	handler	function that was set to react to message.
	 */
	function removeHandler(type : String, handler : Dynamic) : Void {
		//use namespace pureLegsCore;
		messenger.removeHandler(type, handler);
	}

	/**
	 * Remove all handle functions created by this mediator, internal module handlers AND scoped handlers.
	 * Automatically called then mediator is removed(unmediated) by framework.
	 * (You don't have to put it in mediators onRemove() function.)
	 */
	function removeAllHandlers() : Void {
		use;
		namespace;
		pureLegsCore;
		while(handlerVoRegistry.length) {
			var handler : HandlerVO = handlerVoRegistry.pop();
			handler.handler = null;
		}

	}

	//----------------------------------
	//     scope handling
	//----------------------------------
	/**
	 * Adds module to module communication handle function to be called then message of provided type is sent to provided scopeName.
	 * @param	scopeName	both sending and receiving modules must use same scope to make module to module communication.
	 * @param	type		type	message type for handle function to react to.
	 * @param	handler		function that will be called then needed message is sent. this function must expect one parameter. (you can set your custom type for this param object, or leave it as Object)
	 */
	function addScopeHandler(scopeName : String, type : String, handler : Dynamic) : Void {
		use;
		namespace;
		pureLegsCore;
		handlerVoRegistry[handlerVoRegistry.length] = ModuleManager.addScopeHandler(moduleName, scopeName, type, handler);
	}

	/**
	 * Removes module to module communication handle function from message of provided type, sent to provided scopeName.
	 * @param	scopeName	both sending and receiving modules must use same scope to make module to module communication.
	 * @param	type		type	message type for handle function to react to.
	 * @param	handler		function that will be called then needed message is sent. this function must expect one parameter. (you can set your custom type for this param object, or leave it as Object)
	 */
	function removeScopeHandler(scopeName : String, type : String, handler : Dynamic) : Void {
		use;
		namespace;
		pureLegsCore;
		ModuleManager.removeScopeHandler(scopeName, type, handler);
	}

	//----------------------------------
	//     event handling
	//----------------------------------
	/**
	 * Registers an event listener object with viewObject, so that the listener is executed then event is dispatched.
	 * @param	viewObject	view object that can dispatch events.
	 * @param	type	The type of event.
	 * @param	listener	The listener function that processes the event. This function must accept an event object
	 *   as its only parameter and must return nothing, as this example shows:
	 *   function(event:Event):void
	 *   The function can have any name.
	 * @param	useCapture	Determines whether the listener works in the capture phase or the target and bubbling phases.
	 * @param	priority	The priority level of the event listener. Priorities are designated by a 32-bit integer. The higher the number, the higher the priority.
	 *		If two or more listeners share the same priority, they are processed in the order in which they were added. The default priority is 0.
	 * @param	useWeakReference	Determines whether the reference to the listener is strong or weak.
	 *		A strong reference (the default) prevents your listener from being garbage-collected. A weak reference does not.
	 */
	function addListener(viewObject : IEventDispatcher, type : String, listener : Dynamic, useCapture : Bool = false, priority : Int = 0, useWeakReference : Bool = false) : Void {
		if(useCapture)  {
			if(!eventListenerCaptureRegistry[listener])  {
				eventListenerCaptureRegistry[listener] = new Dictionary();
			}
			if(!eventListenerCaptureRegistry[listener][type])  {
				eventListenerCaptureRegistry[listener][type] = viewObject;
				viewObject.addEventListener(type, listener, useCapture, priority, useWeakReference);
			}
		}

		else  {
			if(!eventListenerRegistry[listener])  {
				eventListenerRegistry[listener] = new Dictionary();
			}
			if(!eventListenerRegistry[listener][type])  {
				eventListenerRegistry[listener][type] = viewObject;
				viewObject.addEventListener(type, listener, useCapture, priority, useWeakReference);
			}
		}

	}

	/**
	 * Removes an event listener from the viewObject.
	 * Then Mediator is removed(unmediated) all event handlers added with addListener() function will be automatically removed by framework.
	 * @param	viewObject	view object that can dispatch events.
	 * @param	type		The type of event.
	 * @param	listener	The listener object to remove.
	 * @param	useCapture	Specifies whether the listener was registered for the capture phase or the target and bubbling phases.
	 */
	function removeListener(viewObject : IEventDispatcher, type : String, listener : Dynamic, useCapture : Bool = false) : Void 
	{
		viewObject.removeEventListener(type, listener, useCapture);
		if(useCapture)  {
			if(eventListenerCaptureRegistry[listener])  {
				if(eventListenerCaptureRegistry[listener][type])  {
					if(eventListenerCaptureRegistry[listener][type] == viewObject)  {
						eventListenerCaptureRegistry[listener][type] = null;
					}
				}
			}
		}else{
			if(eventListenerRegistry[listener])  {
				if(eventListenerRegistry[listener][type])  {
					if(eventListenerRegistry[listener][type] == viewObject)  {
						eventListenerRegistry[listener][type] = null;
					}
				}
			}
		}
	}

	/**
	 * Removes all listeners created by mediators addEventListener() function.
	 * WARNING: It will NOT remove events that was added normally with object.addEventListener() function.
	 * Automatically called then mediator is removed(unmediated) by framework.
	 * (You don't have to put it in mediators onRemove() function.)
	 */
	function removeAllListeners() : Void 
	{
		for( l in Reflect.fields(eventListenerCaptureRegistry) ) 
		{
			var listener  = Reflect.field(eventListenerCaptureRegistry, l);
			var eventTypes : Dictionary = eventListenerCaptureRegistry[ listener ];
			for( type in Reflect.fields(eventTypes)) {
				var viewObject : IEventDispatcher = eventTypes[type];
				viewObject.removeEventListener(type, listener, true);
			}

		}

		for( l in Reflect.fields(eventListenerRegistry) ) 
		{
			var listener  = Reflect.field(eventListenerCaptureRegistry, l);
			eventTypes = eventListenerRegistry[listener];
			for(type in Reflect.fields(eventTypes)) {
				viewObject = eventTypes[type];
				viewObject.removeEventListener(type, listener, false);
			}

		}

	}

	//----------------------------------
	//     INTERNAL
	//----------------------------------
	/**
	 * marks mediator as ready and calls onRegister()
	 * Executed automatically BEFORE mediator is created. (with proxyMap.mediate(...))
	 * @private */
	function register() : Void {
		_isReady = true;
		onRegister();
	}

	/**
	 * framework function to dispose this mediator. 																			<br>
	 * Executed automatically AFTER mediator is removed(unmediated). (after mediatorMap.unmediate(...), or module dispose.)					<br>
	 * It:																														<br>
	 * - remove all handle functions created by this mediator																	<br>
	 * - remove all event listeners created by internal addListener() function													<br>
	 * - sets internals to null																									<br>
	 * @private
	 */
	function remove() : Void {
		use;
		namespace;
		pureLegsCore;
		onRemove();
		removeAllHandlers();
		removeAllListeners();
		handlerVoRegistry = null;
		eventListenerRegistry = null;
		messenger = null;
		mediatorMap = null;
	}

}

