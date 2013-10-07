package;


import integration.commandpooling.CommandPoolingTests;
import integration.lazyproxy.LazyProxyTests;
import integration.mediating.MediatingTests;
import integration.moduleinittests.ModuleInitTests;
import integration.proxymap.ProxyMapTests;
import integration.scopecontrol.ScopeControlTests;
import integration.scopedmessaging.ChannelingTests;
import integration.scopedproxy.ScopedProxyTests;
import suites.commandmap.CommandMapTests;
import suites.commands.CommandsTests;
import suites.faturegetproxy.FeatureGetProxyTests;
import suites.general.GeneralTests;
import suites.mediatormap.MediatorMapTests;
import suites.mediators.MediatorTests;
import suites.messenger.MessengerTests;
import suites.modules.ModularTests;
import suites.proxies.ProxyTests;
import suites.proxymap.NamedInterfacedProxyMapTests;
import suites.proxymap.OldProxyMapTests;
import suites.utils.UtilsTests;
import mvcexpress.MvcExpress;


class Main 
{	
	public function new()
	{
		
		MvcExpress.debugFunction  = haxe.Log.trace;
		
		//new GeneralTests();		// OK
		//new ModuleInitTests();	// OK
		//new UtilsTests();			// OK
		//new MessengerTests();		// OK no errors .. maybe ok?? >> My Async Test are too bad
		//new ModularTests(); 		// OK
		//new OldProxyMapTests(); 	// seems to be OK
		//new ProxyMapTests();  	// OK
		//new NamedInterfacedProxyMapTests(); // OK 
		//new LazyProxyTests();		// OK
		//new MediatorTests();		// OK
		//new MediatorMapTests(); 	// OK	
		//new MediatingTests();		// OK
		//new CommandMapTests();	// OK
		//new CommandPoolingTests();// XXX : TODO : Command create twice - see further dependency
		
		//new ChannelingTests();		// OK
		//new FeatureGetProxyTests();	// OK
		//new ScopedProxyTests();		// XXX >> TODO : 
		//new ScopeControlTests();		// OK
		
		
	}
	
	public static function main() 
	{
		new Main();
	}
}
