/** 
 * Base class containing static assert methods.
 */
package utils;

class Assert 
{

	
	public function new() {
	}

	//------------------------------------------------------------------------------
	static public function assertEquals( msg : String = "", ?arg1 : Dynamic, ?arg2 : Dynamic  ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertEquals need a message to display - current message : '", msg+"'" );
		else failNotEquals(msg, arg1, arg2);
	}

	//------------------------------------------------------------------------------
	static public function failNotEquals(message : String, expected : Dynamic, actual : Dynamic) : Void {
		if(expected != actual) failWithUserMessage(message, "expected:<" + expected + "> but was:<" + actual + ">");
	}

	//------------------------------------------------------------------------------
	static public function assertStrictlyEquals( msg : String = "", ?arg1 : Dynamic, ?arg2 : Dynamic ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertStrictlyEquals need a message to display - current message : '", msg+"'" );
		else failNotStrictlyEquals(msg, arg1, arg2);
	}

	//------------------------------------------------------------------------------
	static public function failNotStrictlyEquals(message : String, expected : Dynamic, actual : Dynamic) : Void {
		if(expected != actual) failWithUserMessage(message, "expected:<" + expected + "> but was:<" + actual + ">");
	}

	//------------------------------------------------------------------------------
	static public function assertTrue( msg : String = "", ?arg : Dynamic  ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertTrue need a message to display - current message : '", msg+"'" );
		else failNotTrue(msg, arg);
	}

	//------------------------------------------------------------------------------
	static public function failNotTrue(message : String, condition : Bool) : Void {
		if(!condition) failWithUserMessage(message, "expected true but was false");
	}

	//------------------------------------------------------------------------------
	static public function assertFalse( msg : String = "", ?arg : Dynamic ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertFalse need a message to display - current message : '", msg+"'" );
		else failTrue(msg, arg);
	}

	//------------------------------------------------------------------------------
	static public function failTrue(message : String, condition : Bool) : Void {
		if(condition) failWithUserMessage(message, "expected false but was true");
	}

	//------------------------------------------------------------------------------
	static public function assertNull( msg : String = "", ?arg : Dynamic ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertNull need a message to display - current message : '", msg+"'" );
		else failNotNull(msg, arg);
	}

	//------------------------------------------------------------------------------
	static public function failNull(message : String, object : Dynamic) : Void {
		if(object == null) failWithUserMessage(message, "object was null: " + object);
	}

	//------------------------------------------------------------------------------
	static public function assertNotNull( msg : String = "", ?arg : Dynamic ) : Void {
		if(msg == "") failWithUserMessage( "Assert assertNotNull need a message to display - current message : '", msg+"'" );
		else failNull(msg, arg);
	}

	//------------------------------------------------------------------------------
	static public function failNotNull(message : String, object : Dynamic) : Void {
		if(object != null) failWithUserMessage(message, "object was not null: " + object);
	}

	//------------------------------------------------------------------------------
	//: undefined has lost most of its meaning in AS3, we could probably just use the null test
	//static public function assertUndefined( rest : Array<Dynamic> ) : Void {
	//	if(rest.length == 2) failNotUndefined(rest[0], rest[1])
	//	else failNotUndefined("", rest[0]);
	//}

	//------------------------------------------------------------------------------
	//: undefined has lost most of its meaning in AS3, we could probably just use the null test
	//static public function failUndefined(message : String, object : Dynamic) : Void {
	//	if(object == null) failWithUserMessage(message, "object was undefined: " + object);
	//}

	//------------------------------------------------------------------------------
	//: undefined has lost most of its meaning in AS3, we could probably just use the null test
	//static public function _assertNotUndefined( rest : Array<Dynamic> ) : Void {
	//	if(rest.length == 2) failUndefined(rest[0], rest[1])
	//	else failUndefined("", rest[0]);
	//}

	//------------------------------------------------------------------------------
	//: undefined has lost most of its meaning in AS3, we could probably just use the null test
	//static public function failNotUndefined(message : String, object : Dynamic) : Void {
	//	if(object != null) failWithUserMessage(message, "object was not undefined: " + object);
	//}

	//------------------------------------------------------------------------------
	static public function fail(failMessage : String = "") : Void {
		throw failMessage;
	}

	//------------------------------------------------------------------------------
	static public function failWithUserMessage(userMessage : String, failMessage : String) : Void {
		if(userMessage.length > 0) userMessage = userMessage + " - ";
		throw (userMessage + failMessage);
	}

}

