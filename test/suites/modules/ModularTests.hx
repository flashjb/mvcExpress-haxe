/**
 * COMMENT
 * 
 */
package suites.modules;

import suites.modules.objects.CoreModuleTester;
import suites.modules.objects.MovieClipModuleTester;
import suites.modules.objects.SpriteModuleTester;

class ModularTests {

	
	public function runBeforeEveryTest() : Void {
	}

	
	public function runAfterEveryTest() : Void {
	}

	
	public function modules_construct_core_module() : Void {
		new CoreModuleTester();
	}

	
	public function modules_construct_sprite_module() : Void {
		new SpriteModuleTester();
	}

	
	public function modules_construct_movieclip_module() : Void {
		new MovieClipModuleTester();
	}

}

