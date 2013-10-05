// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Checks if class is extended from another class provided by name.
 * Will return false if it is of same type as superClassName, or other type that has nothing to do with superClassName.
 * Used for debugging only.
 * 
 */
package mvcexpress.utils;

import haxe.ds.ObjectMap;
import haxe.rtti.Meta;


class MvcExpressTools 
{
	
	static public function checkClassSuperClass( classObject:Class<Dynamic>, superClass:Class<Dynamic> ) : Bool 
	{
		var retVal = false;
		var classParent = Type.getSuperClass(classObject);
		if (classParent != superClass) 
		{
			while ( classParent != superClass && classParent != null ) 
			{
				classParent = Type.getSuperClass(classParent);
				if (classParent == superClass) {
					retVal = true;
				}
			}
		} else {
			retVal = true;
		}
		return retVal;
	}
	
	static public function checkClassStringConstants( args:Array<Class<Dynamic>> ) : Void 
	{
		for( i in 0...args.length ) 
		{
			var constantClass = args[i];
			if( constantClass != null )  
			{
				// check if class is already analyzed.
				trace( "register class ?", StringConstantRegistry.registeredClasses.get(constantClass) == true);
				
				if( StringConstantRegistry.registeredClasses.get(constantClass) != true )  
				{
					for ( j in Type.getClassFields(constantClass) ) 
					{
						var value = Reflect.field(constantClass, j);
						if( Std.is( value, String) )  
						{
							if(  StringConstantRegistry.stringRegistry.exists(value) )  {
								throw ("Class " + constantClass + " and " + Reflect.field(StringConstantRegistry.stringRegistry, value) + " have same string constant value : " + value);
							} else {
								StringConstantRegistry.stringRegistry.set(value, cast constantClass);
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

	static public var registeredClasses : ObjectMap<Dynamic, Bool> = new ObjectMap();
	/* of Boolean by Class */
	static public var stringRegistry : Map<String, Class<Dynamic>> = new Map();
	/* of Class by String */
}