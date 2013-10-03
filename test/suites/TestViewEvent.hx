/**
 * COMMENT
 * 
 */
package suites;

import flash.events.Event;

class TestViewEvent extends Event {

	static public var ADD_LOCAL_HANDLER : String = "addLocalHandler";
	static public var ADD_REMOTE_HANDLER : String = "addRemoteHandler";
	static public var TRIGER_ADD_HANDLER : String = "trigerAddHandler";
	static public var REMOVE_LOCAL_HANDLER : String = "removeLocalHandler";
	static public var REMOVE_REMOTE_HANDLER : String = "removeRemoteHandler";
	static public var TEST_GET_PROXY_CLASS : String = "testGetProxyClass";
	public var messageType : String;
	public var testClass : Class<Dynamic>;
	public function new(type : String, messageType : String = null, testClass : Class<Dynamic> = null) {
		super(type);
		this.testClass = testClass;
		this.messageType = messageType;
	}

}

