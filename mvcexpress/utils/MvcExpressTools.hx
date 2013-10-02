// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Checks if class is extended from another class provided by name.
 * Will return false if it is of same type as superClassName, or other type that has nothing to do with superClassName.
 * Used for debugging only.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.utils;

import Type;

class MvcExpressTools 
{
	static public function checkClassSuperClass( classObject:Class, superClassName:String )
	{
		return Type.getClassName(Type.getSuperClass(Class)) == superClassName; 
	}
}