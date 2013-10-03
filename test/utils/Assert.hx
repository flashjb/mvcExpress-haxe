/** 
 * Base class containing static assert methods.
 */
package utils;

class Assert 
{

	static public var assertEquals 	= Reflect.makeVarArgs(_assertEquals);
	static public var assertStrictlyEquals = Reflect.makeVarArgs(_assertStrictlyEquals);
	static public var assertTrue 	= Reflect.makeVarArgs(_assertTrue);
	static public var assertFalse 	= Reflect.makeVarArgs(_assertFalse);
	static public var assertNull 	= Reflect.makeVarArgs(_assertNull);
	static public var assertNotNull = Reflect.makeVarArgs(_assertNotNull);
	static public var assertUndefined = Reflect.makeVarArgs(_assertUndefined);
	static public var assertNotUndefined = Reflect.makeVarArgs(_assertNotUndefined);
	
	public function new() {
	}

	//------------------------------------------------------------------------------
	static function _assertEquals( rest : Array<Dynamic> ) : Void {
		if(rest.length == 3) failNotEquals(rest[0], rest[1], rest[2])
		else failNotEquals("", rest[0], rest[1]);
	}

	//------------------------------------------------------------------------------
	static function failNotEquals(message : String, expected : Dynamic, actual : Dynamic) : Void {
		if(expected != actual) failWithUserMessage(message, "expected:<" + expected + "> but was:<" + actual + ">");
	}

	//------------------------------------------------------------------------------
	static  function _assertStrictlyEquals( rest : Array<Dynamic> ) : Void {
		if(rest.length == 3) failNotStrictlyEquals(rest[0], rest[1], rest[2])
		else failNotStrictlyEquals("", rest[0], rest[1]);
	}

	//------------------------------------------------------------------------------
	static function failNotStrictlyEquals(message : String, expected : Dynamic, actual : Dynamic) : Void {
		if(expected != actual) failWithUserMessage(message, "expected:<" + expected + "> but was:<" + actual + ">");
	}

	//------------------------------------------------------------------------------
	static function _assertTrue( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failNotTrue(rest[0], rest[1])
		else failNotTrue("", rest[0]);
	}

	//------------------------------------------------------------------------------
	static function failNotTrue(message : String, condition : Bool) : Void {
		if(!condition) failWithUserMessage(message, "expected true but was false");
	}

	//------------------------------------------------------------------------------
	static function _assertFalse( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failTrue(rest[0], rest[1])
		else failTrue("", rest[0]);
	}

	//------------------------------------------------------------------------------
	static function failTrue(message : String, condition : Bool) : Void {
		if(condition) failWithUserMessage(message, "expected false but was true");
	}

	//------------------------------------------------------------------------------
	static function _assertNull( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failNotNull(rest[0], rest[1])
		else failNotNull("", rest[0]);
	}

	//------------------------------------------------------------------------------
	static function failNull(message : String, object : Dynamic) : Void {
		if(object == null) failWithUserMessage(message, "object was null: " + object);
	}

	//------------------------------------------------------------------------------
	static function _assertNotNull( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failNull(rest[0], rest[1])
		else failNull("", rest[0]);
	}

	//------------------------------------------------------------------------------
	static function failNotNull(message : String, object : Dynamic) : Void {
		if(object != null) failWithUserMessage(message, "object was not null: " + object);
	}

	//------------------------------------------------------------------------------
	//TODO: undefined has lost most of its meaning in AS3, we could probably just use the null test
	static function _assertUndefined( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failNotUndefined(rest[0], rest[1])
		else failNotUndefined("", rest[0]);
	}

	//------------------------------------------------------------------------------
	//TODO: undefined has lost most of its meaning in AS3, we could probably just use the null test
	static function failUndefined(message : String, object : Dynamic) : Void {
		if(object == null) failWithUserMessage(message, "object was undefined: " + object);
	}

	//------------------------------------------------------------------------------
	//TODO: undefined has lost most of its meaning in AS3, we could probably just use the null test
	static function _assertNotUndefined( rest : Array<Dynamic> ) : Void {
		if(rest.length == 2) failUndefined(rest[0], rest[1])
		else failUndefined("", rest[0]);
	}

	//------------------------------------------------------------------------------
	//TODO: undefined has lost most of its meaning in AS3, we could probably just use the null test
	static function failNotUndefined(message : String, object : Dynamic) : Void {
		if(object != null) failWithUserMessage(message, "object was not undefined: " + object);
	}

	//------------------------------------------------------------------------------
	static public function fail(failMessage : String = "") : Void {
		throw failMessage;
	}

	//------------------------------------------------------------------------------
	static function failWithUserMessage(userMessage : String, failMessage : String) : Void {
		if(userMessage.length > 0) userMessage = userMessage + " - ";
		throw (userMessage + failMessage);
	}

}

