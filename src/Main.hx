package;

import suites.general.GeneralTests;
import integration.moduleinittests.ModuleInitTests;
import suites.messenger.MessengerTests;
import mvcexpress.MvcExpress;

class Main 
{	
	public function new()
	{
		MvcExpress.debugFunction = haxe.Log.trace;
		
		new GeneralTests();
		new ModuleInitTests();
		new MessengerTests();
	}
	
	public static function main() 
	{
		new Main();
	}
}
