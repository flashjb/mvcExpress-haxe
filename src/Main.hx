package;

import suites.general.GeneralTests;
import integration.moduleinittests.ModuleInitTests;
import suites.messenger.MessengerTests;
import suites.mediators.MediatorTests;
import suites.mediatormap.MediatorMapTests;
import suites.proxymap.OldProxyMapTests;
import suites.proxymap.NamedInterfacedProxyMapTests;
import mvcexpress.MvcExpress;

class Main 
{	
	public function new()
	{
		MvcExpress.debugFunction = haxe.Log.trace;
		
		new GeneralTests();
		//new ModuleInitTests();
		//new MessengerTests();
		//new OldProxyMapTests();
		//new NamedInterfacedProxyMapTests();
		//new MediatorMapTests();
		new MediatorTests();
	}
	
	public static function main() 
	{
		new Main();
	}
}
