// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Checks if class is extended from another class provided by name.
 * Will return false if it is of same type as superClassName, or other type that has nothing to do with superClassName.
 * Used for debugging only.
 * 
 */
package mvcexpress.utils;

import haxe.ds.ObjectMap;


class MvcExpressTools 
{
	static public var checkClassStringConstants = Reflect.makeVarArgs(_checkClassStringConstants);
	
	static public function checkClassSuperClass( classObject:Class<Dynamic>, superClass:Class<Dynamic> )
	{
		return Type.getSuperClass(classObject) == superClass; 
	}
	
	static function _checkClassStringConstants( args:Array<Dynamic> ) : Void 
	{
		for( p in args ) 
		{
			var constantClass : Class<Dynamic> = cast( p, Class<Dynamic> );
			if( constantClass != null )  
			{
				// check if class is already analyzed.
				if( StringConstantRegistry.registeredClasses.exists(constantClass) && StringConstantRegistry.registeredClasses.get(constantClass) != true )  
				{
					for (j in Reflect.fields(constantClass) ) 
					{
						var value = Reflect.field(constantClass, j);
						if( Std.is( value, String) )  
						{
							if( Reflect.hasField(StringConstantRegistry.stringRegistry, value) )  {
								throw ("Class " + constantClass + " and " + Reflect.field(StringConstantRegistry.stringRegistry, value) + " have same string constant value : " + value);
							} else {
								Reflect.setField(StringConstantRegistry.stringRegistry, value, constantClass);
							}
						}
					}
					StringConstantRegistry.registeredClasses.set(constantClass , true);
				}
				
			} else {
				throw ("Please send Class names to checkClassStringConstants() only(not object or strings).");
			}
		}
	}
}

class StringConstantRegistry 
{

	static public var registeredClasses : Map<Dynamic, Bool> = new ObjectMap();
	/* of Boolean by Class */
	static public var stringRegistry : Map<Dynamic, String> = new ObjectMap();
	/* of Class by String */
}