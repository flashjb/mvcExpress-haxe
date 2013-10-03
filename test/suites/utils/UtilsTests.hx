/**
 * COMMENT
 * 
 */
package suites.utils;

import utils.Assert;
import mvcexpress.utils.MvcExpressTools;

import suites.utils.objects.ClassA;
import suites.utils.objects.ClassASubclass;
import suites.utils.objects.ClassASubclassSubclass;
import suites.utils.objects.ClassB;
import suites.utils.objects.ClassBSubclass;
import suites.utils.objects.ConstantsA;
import suites.utils.objects.ConstantsAB;
import suites.utils.objects.ConstantsB;

class UtilsTests {

	//[Before]
	//
	//public function runBeforeEveryTest():void {
	//
	//}
	//
	//[After]
	//
	//public function runAfterEveryTest():void {
	//
	//}
	//----------------------------------
	//     checkClassStringConstants
	//----------------------------------
	
	public function utils_one_class_check() : Void {
		checkClassStringConstants(ConstantsA);
	}

	
	public function utils_two_class_check() : Void {
		checkClassStringConstants(ConstantsA, ConstantsB);
	}

	
	public function utils_two_class_with_dublicated_constants_fails() : Void {
		checkClassStringConstants(ConstantsA, ConstantsAB);
	}

	//----------------------------------
	//     checkClassSuperclass
	//----------------------------------
	
	public function utils_checkClassSuperclass_tests() : Void {
		Assert.assertFalse("Same class is not a subclass to self", 			 MvcExpressTools.checkClassSuperclass(ClassA, ClassA));
		Assert.assertTrue("Subclass of class should be true", 				 MvcExpressTools.checkClassSuperclass(ClassASubclass, ClassA));
		Assert.assertTrue("Subclass of Subclass of class should be true", 	 MvcExpressTools.checkClassSuperclass(ClassASubclassSubclass, ClassA));
		Assert.assertFalse("Two diferent classes sould return false", 		 MvcExpressTools.checkClassSuperclass(ClassB, ClassA));
		Assert.assertFalse("superclass of another class sould return false", MvcExpressTools.checkClassSuperclass(ClassBSubclass, ClassA));
	}

}

