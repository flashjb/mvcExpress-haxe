/**
 * COMMENT
 * 
 */
package suites.general;

import utils.Assert;
import mvcexpress.MvcExpress;

class GeneralTests {

	public function new()
	{
		general_framework_version();
		general_debug_flag();
	}
	
	public function general_framework_version() : Void {
		trace("VERSION");
		trace(MvcExpress.VERSION);
		
		Assert.assertEquals("Version must be defined using 3 numbers, separated by dots.", MvcExpress.VERSION.split(".").length, 3);
	}

	
	public function general_debug_flag() : Void 
	{
		#if debug
			trace("DEBUG_COMPILE");
			trace(MvcExpress.DEBUG_COMPILE);
			Assert.assertTrue( "While compiling in debug - MvcExpress.DEBUG_COMPILE must be true.", MvcExpress.DEBUG_COMPILE );
			return;
		#end
		
		Assert.assertFalse( "While compiling in debug - MvcExpress.DEBUG_COMPILE must be false.", MvcExpress.DEBUG_COMPILE );
	}

}

