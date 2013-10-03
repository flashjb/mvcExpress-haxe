// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Checks if class is extended from another class provided by name.
 * Will return false if it is of same type as superClassName, or other type that has nothing to do with superClassName.
 * Used for debugging only.
 * 
 */
package mvcexpress.utils;

import flash.utils.Dictionary;

class MvcExpressTools 
{
	static public var checkClassStringConstants = Reflect.makeVarArgs(_checkClassStringConstants);
	
	static public function checkClassSuperClass( classObject:Class, superClass:Class )
	{
		return Std.is(Type.getSuperClass(classObject), superClass); 
	}
	
	static function _checkClassStringConstants( args:Array<Dynamic> ) : Void 
	{
		for( p in args ) 
		{
			var constantClass : Class<Dynamic> = cast( p, Class<Dynamic> );
			if( constantClass )  
			{
				// check if class is already analyzed.
				if( Reflect.hasField(StringConstantRegistry.registeredClasses) && Reflect.field(StringConstantRegistry.registeredClasses) != true )  
				{
					for (j in Reflect.fields(constantClass) ) 
					{
						var value = Reflect.field(constantClass, j);
						if( Std.is( value, String) )  
						{
							if( Reflect.hasField(StringConstantRegistry.stringRegistry, value) )  {
								throw cast(("Class " + constantClass + " and " + Reflect.field(StringConstantRegistry.stringRegistry, value) + " have same string constant value : " + constantValue), Error);
							} else {
								Reflect.setField(StringConstantRegistry.stringRegistry, value, constantClass);
							}
						}
					}
					Reflect.setField(StringConstantRegistry.registeredClasses, true);
				}
				
			} else {
				throw cast(("Please send Class names to checkClassStringConstants() only(not object or strings)."), Error);
			}
		}
	}
}

class StringConstantRegistry 
{

	static public var registeredClasses : Map = new Map();
	/* of Boolean by Class */
	static public var stringRegistry : Map = new Map();
	/* of Class by String */
}