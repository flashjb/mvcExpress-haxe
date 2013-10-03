package suites.testexamples;

import utils.Assert;
import suites.tests.tempobj.TestingObject;

class TestCase1 {

	var count : Int;
	var testObj1 : TestingObject;
	var testObj2 : TestingObject;
	var testObj3 : TestingObject;
	var testObj4 : TestingObject;
	
	public function runBeforeEveryTest() : Void {
		count = 10;
		testObj1 = new TestingObject();
		testObj2 = new TestingObject();
		testObj3 = testObj1;
		testObj4 = null;
	}

	
	public function runAfterEveryTest() : Void {
		count = 0;
		testObj1 = null;
		testObj2 = null;
		testObj3 = null;
		testObj4 = null;
	}

	//[Test(description="Test is supposed to Fail",issueID="0012443")]
	//
	//public function fails2():void {
	//Assert.assertEquals(true, false);
	//}
	
	public function assertEquals_vals() : Void {
		Assert.assertEquals(8, count - 2);
	}

	
	public function assertEquals_objects() : Void {
		Assert.assertEquals(1, true);
	}

	
	public function assertStrictlyEquals_vals() : Void {
		Assert.assertStrictlyEquals(8, count - 2);
	}

	
	
	public function assertStrictlyEquals_objects() : Void {
		Assert.assertStrictlyEquals(1, true);
	}

	
	public function assertFalse() : Void {
		Assert.assertFalse(false);
	}

	
	public function assertTrue() : Void {
		Assert.assertTrue(true);
	}

	
	public function assertNotNull() : Void {
		Assert.assertNotNull(testObj1);
	}

	
	public function assertNull() : Void {
		Assert.assertNull(testObj4);
	}

	//
	
	public function failNotTrue() : Void {
		Assert.failNotTrue("must be not true", (1 == 1));
	}

	
	public function failTrue() : Void {
		Assert.failTrue("must be  true", (1 == 2));
	}

	
	public function failNotNull() : Void {
		Assert.failNotNull("must be null", testObj4);
	}

	
	public function failNull() : Void {
		Assert.failNull("must be not null", testObj1);
	}

	
	
	public function fail() : Void {
		Assert.fail("will fail.");
	}

}

