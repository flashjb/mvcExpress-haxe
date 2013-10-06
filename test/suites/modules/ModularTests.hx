/**
 * COMMENT
 * 
 */
package suites.modules;

import suites.modules.objects.CoreModuleTester;
import suites.modules.objects.MovieClipModuleTester;
import suites.modules.objects.SpriteModuleTester;

class ModularTests extends Tester {

	
	public function new()  
	{
		super();
		testFunction("modules_construct_core_module");
		testFunction("modules_construct_sprite_module");
		testFunction("modules_construct_movieclip_module");
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

