/**
 * ...
 * 
 */
package integration.agenerictestobjects.view.event;

import flash.events.Event;

class ViewTestEvent extends Event {

	static public var VIEW_TEST_BLANK : String = "ViewTest_BLANK";
	static public var VIEW_TEST_SENDS_MESSAGE : String = "ViewTest_SENDS_MESSAGE";
	public function new(type : String, bubbles : Bool = false, cancelable : Bool = false) {
		super(type, bubbles, cancelable);
	}

	override public function clone() : Event {
		return new ViewTestEvent(type, bubbles, cancelable);
	}

	override public function toString() : String {
//		return formatToString("ViewTestEvent", "type", "bubbles", "cancelable", "eventPhase");
		return "[ ViewTestEvent :: "+type+" - bubbles:"+bubbles+" cancelable:"+cancelable+" eventPhase:"+eventPhase+"]";
	}

}

