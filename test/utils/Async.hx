package utils;

import flash.events.IEventDispatcher;


class Async
 {
		public static function proceedOnEvent( testCase:Dynamic, target:IEventDispatcher, eventName:String, timeout:Int=500, timeoutHandler:Dynamic = null ):Void {
			var asyncHandlingStatement:Dynamic = getCallableForTest( testCase );
			var handler:Dynamic;

			handler = asyncHandlingStatement.asyncHandler( asyncHandlingStatement.pendUntilComplete, timeout, null, timeoutHandler );
			target.addEventListener( eventName, handler, false, 0, true );  
		} 
		
		/**
		 * This method is used when you want to fail if a given event occurs, within a given amount of time, during an asynchronous test. When the event fires, 
		 * the flex unit framework causes the test to fail. If the timout is reached before the failure occurs, then the framework will no longer watch for 
		 * this event. So, for example, if you want to verify that you do not receive a failure within 300ms, this would be a good method to use.
		 *  
		 * This method is generally used when the existance of the event, and not the even't data is sufficient to indicate failure. If you need to inspect
		 * the event's data before making a decision, then use <code>handleEvent</code> instead. 
		 * 
		 * @param testCase The current asynchronous test case.
		 * @param target The target that will listen for the dispatched <code>eventName</code>.
		 * @param eventName The name of the event being listend for by the <code>target</code>.
		 * @param timeout The length of time, in milliseconds, before the calling the <code>timeoutHandler</code>
		 * if the <code>eventName</code> event is not dispatched.
		 * @param timeoutHandler The function that will be executed if the <code>target</code> does not 
		 * receive expected <code>eventName</code> before the <code>timeout</code> time is reached.
		 */
		public static function failOnEvent( testCase:Dynamic, target:IEventDispatcher, eventName:String, timeout:Int=500, timeoutHandler:Dynamic = null ):Void {
			var asyncHandlingStatement:Dynamic = getCallableForTest( testCase );
			var handler:Dynamic;
			
			handler = asyncHandlingStatement.asyncHandler( asyncHandlingStatement.failOnComplete, timeout, null, asyncHandlingStatement.pendUntilComplete );
			target.addEventListener( eventName, handler, false, 0, true );  
		}
		
		/**
		 * Causes the failure of the existing block (Before, After or the Test itself dependent upon where this statement is located) when an event occurs. In
		 * practice, this method is used to handle an event dispatched from an Dynamic under test that, while not necessarily part of the test itself, would indicate
		 * a failure if dispatched. A valid example might be an service call. You may want to test that the data is correct and returns within a given period of time,
		 * however, if at any time during that test a Failure event is dispatched, you likely wish to end the test. 
		 * 
		 * @param testCase The current asynchronous test case.
		 * @param target The target that will listen for the dispatched <code>eventName</code>.
		 * @param eventName The name of the event being listend for by the <code>target</code>.
		 * 
		 * Example:
		 * 		[Test(async)]
		 *      public function doTest():void {
		 *	      Async.registerFailureEvent( this, httpService, FaultEvent.FAULT );
		 *	      Async.handleEvent( this, httpService, ResultEvent.RESULT, handleResult, 2000 );
		 *        httpService.send();			
		 *      }
		 * 
		 * Without the registerFailureEvent, you would need to wait 2 full seconds for the timeout to occur before declaring this test a failure when a fault
		 * event occurs.
		 * 
		 */
		public static function registerFailureEvent( testCase:Dynamic, target:IEventDispatcher, eventName:String ):Void {
			var asyncHandlingStatement:Dynamic = getCallableForTest( testCase );
			var handler:Dynamic;
			
			handler = asyncHandlingStatement.asyncErrorConditionHandler( asyncHandlingStatement.failOnComplete );
			target.addEventListener( eventName, handler );
			//Do not use a weak reference here or there is nothing to keep it in memory
		}

		/**
		 * Allow you to continue a test while waiting for a given asynchronous event to occur. Normally a test ends when you reach the method closure at the end
		 * of your test method. This event tells the FlexUnit framework to continue that test pending the dispatch of an event by the <code>target</code> of an
		 * event named <code>eventName</code>. If that event does not occur within the <code>timeOut</code> then the timeout handler (if specified) will be called, 
		 * else the test will be declared a failure. 
		 * 
		 * @param testCase The current asynchronous test case.
		 * @param target The target that will listen for the dispatched <code>eventName</code>.
		 * @param eventName The name of the event being listend for by the <code>target</code>.
		 * @param eventHandler The function that will be executed if the the <code>target</code> dispatches an event with 
		 * a name of <code>eventName</code> within the provided <code>timemout</code> period.
		 * @param timeout The length of time, in milliseconds, before the calling the <code>timeoutHandler</code>
		 * if the <code>eventName</code> event is not dispatched.
		 * @param passThroughData An Dynamic that can be given information about the current test, this information will be 
		 * available to both the <code>eventHandler</code> and <code>timeoutHandler</code>.
		 * @param timeoutHandler The function that will be executed if the <code>target</code> does not 
		 * receive expected <code>eventName</code> before the <code>timeout</code> time is reached.
		 */
		public static function handleEvent( testCase:Dynamic, target:IEventDispatcher, eventName:String, eventHandler:Dynamic, timeout:Int=500, passThroughData:Dynamic = null, timeoutHandler:Dynamic = null ):Void {
			var asyncHandlingStatement:Dynamic = getCallableForTest( testCase );
			var handler:Dynamic;
                   
			handler = asyncHandlingStatement.asyncHandler( eventHandler, timeout, passThroughData, timeoutHandler );
			target.addEventListener( eventName, handler, false, 0, true );  
		} 
		
		/**
		 * This method works similarly to the handleEvent, however, whereas the handleEvent does all of the work to handle a specific event,
		 * this method simply returns an eventHandler (function) which you use within your own addEventListener() methods. 
		 * 
		 * @param testCase The current asynchronous test case.
		 * @param eventHandler The function that will be executed if the <code>timemout</code> period has not been reached.
		 * @param timeout The length of time, in milliseconds, before the calling the <code>timeoutHandler</code>
		 * if the <code>eventName</code> event is not dispatched.
		 * @param passThroughData An Dynamic that can be given information about the current test, this information will be 
		 * available to both the <code>eventHandler</code> and <code>timeoutHandler</code>.
		 * @param timeoutHandler The function that will be executed if the <code>timeout</code> period is reached.
		 */
		public static function asyncHandler( testCase:Dynamic, eventHandler:Dynamic, timeout:Int, passThroughData:Dynamic = null, timeoutHandler:Dynamic = null ):Dynamic {
			var asyncHandlingStatement:Dynamic = getCallableForTest( testCase );
						
			return testCase.asyncHandler( eventHandler, timeout, passThroughData, timeoutHandler );
		}
		
		public static function getCallableForTest( testCase:Dynamic ):Dynamic {
			var handler:Dynamic = asyncHandlerMap.get(Std.string(testCase));
			
			//If no handler was obtained from the dictionary, the test case was never marked as asynchronous, throw an AssertionError
			//if ( !handler ) {
			//	throw "Cannot add asynchronous ";	
			//}

			return handler;
		} 
		public static function addCallableForTest( name : String, testCase:Dynamic ):Void 
		{
			asyncHandlerMap.set( name, testCase );
		} 
		
		public static var asyncHandlerMap : Map<String, Dynamic> = new Map<String, Dynamic>();
		
}
