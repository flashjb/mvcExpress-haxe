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

class UtilsTests extends Tester {

	public function new()
	{
		super();
		testFunction("utils_checkClassSuperclass_tests");
		testFunction("utils_two_class_check");
		testFunction("utils_one_class_check");
		testFunction("utils_two_class_with_duplicated_constants_fails");
	}
	
	
	public function utils_one_class_check() : Void {
		MvcExpressTools.checkClassStringConstants( [ConstantsA] );
	}

	
	public function utils_two_class_check() : Void {
		MvcExpressTools.checkClassStringConstants( [ConstantsA, ConstantsB ] );
	}

	
	public function utils_two_class_with_duplicated_constants_fails() : Void {
		MvcExpressTools.checkClassStringConstants( [ConstantsA, ConstantsAB ] );
	}

	//----------------------------------
	//     checkClassSuperclass
	//----------------------------------
	
	public function utils_checkClassSuperclass_tests() : Void {
		Assert.assertFalse("superclass of another class sould return false", MvcExpressTools.checkClassSuperClass(ClassBSubclass, ClassA));
		Assert.assertFalse("Two diferent classes sould return false", 		 MvcExpressTools.checkClassSuperClass(ClassB, ClassA));
		Assert.assertFalse("Same class is not a subclass to self", 			 MvcExpressTools.checkClassSuperClass(ClassA, ClassA));
		Assert.assertTrue("Subclass of class should be true", 				 MvcExpressTools.checkClassSuperClass(ClassASubclass, ClassA));
		Assert.assertTrue("Subclass of Subclass of class should be true", 	 MvcExpressTools.checkClassSuperClass(ClassASubclassSubclass, ClassA));
	}

}

