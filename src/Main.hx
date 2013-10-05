package;

import suites.general.GeneralTests;
import integration.moduleinittests.ModuleInitTests;
import suites.messenger.MessengerTests;
import suites.mediators.MediatorTests;
import suites.mediatormap.MediatorMapTests;
import suites.proxymap.OldProxyMapTests;
import suites.proxymap.NamedInterfacedProxyMapTests;
import suites.modules.ModularTests;
import suites.utils.UtilsTests;
import mvcexpress.MvcExpress;

class Main 
{	
	public function new()
	{
		MvcExpress.debugFunction = haxe.Log.trace;
		//MvcExpress.pendingInjectsTimeOut = 5000;
		
		new GeneralTests();
		//new ModuleInitTests();
		//new MessengerTests();
		//new OldProxyMapTests();
		new NamedInterfacedProxyMapTests();
		//new MediatorMapTests();
		//new MediatorTests();
		
		//new ModularTests();
		//new UtilsTests();
	}
	
	public static function main() 
	{
		new Main();
	}
}
