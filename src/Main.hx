package;

import suites.general.GeneralTests;
import integration.moduleinittests.ModuleInitTests;

class Main 
{	
	public function new()
	{
		new GeneralTests();
		new ModuleInitTests();
	}
	
	public static function main() 
	{
		trace("Hello From FDT haXe !");
		new Main();
	}
}
