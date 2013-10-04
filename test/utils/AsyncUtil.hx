package utils;

import flash.events.Event;
import flash.events.EventDispatcher;
import utils.Async;
import haxe.Timer;
	
class AsyncUtil extends EventDispatcher {

	static public var ASYNC_EVENT : String = "asyncEvent";
	var _testCase : Dynamic;
	var _callback : Dynamic;
	var _passThroughArgs : Array<Dynamic>;
	var _callbackArgs : Array<Dynamic>;
	
	public function new(testCase : Dynamic, callback : Dynamic, passThroughArgs : Array<Dynamic> = null) 
	{
		super();
		_testCase = testCase;
		_callback = callback;
		_passThroughArgs = passThroughArgs;
		
	}

	static public function asyncHandler(testCase : Dynamic, callBack : Dynamic = null, passThroughArgs : Array<Dynamic> = null, timeout : Int = 1500, timeouthandler : Dynamic = null) : Dynamic {
		var asyncUtil : AsyncUtil = new AsyncUtil(testCase, callBack, passThroughArgs);
			asyncUtil.addEventListener(ASYNC_EVENT, Async.asyncHandler(testCase, asyncUtil.asyncEventHandler, timeout, passThroughArgs, timeouthandler));
		
		
		haxe.Timer.delay(  function() { asyncUtil.asyncCallbackHandler(passThroughArgs); } ,timeout);
		
		return asyncUtil.asyncCallbackHandler;
	}

	public function asyncEventHandler(ev : Event, flexUnitPassThroughArgs : Dynamic = null) : Void {
		if(_passThroughArgs != null )  {
			_callbackArgs = _callbackArgs.concat(_passThroughArgs);
		}
		if(_callback != null)  {
			_callback.apply(null, _callbackArgs);
		}
	}

	public function asyncCallbackHandler( args : Dynamic ) : Void {
		_callbackArgs = args;
		dispatchEvent(new Event(ASYNC_EVENT));
	}

}

