// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * utility function to check class string constant values for accidental duplications.  																		</br>
 * Usage:																																						</br>
 *		add this code in every module class in onInit() function with all your classes holding string constants used for messaging.							    </br>
 * 		CONFIG::debug {																																			</br>
 *			checkClassStringConstants(ClassName1,ClassName2...ClassNameX);																												</br>
 *		}																																						</br>
 * @param	... args	array of Class objects, to be checked for constants.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.utils;

import flash.utils.DescribeType;
import flash.utils.Dictionary;

class StringConstantRegistry {

	static public var registeredClasses : Dictionary = new Dictionary();
	/* of Boolean by Class */
	static public var stringRegistry : Dictionary = new Dictionary();
	/* of Class by String */
}

