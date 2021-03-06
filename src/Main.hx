package;


import suites.general.GeneralTests;
/*
import integration.moduleinittests.ModuleInitTests;
import suites.utils.UtilsTests;
import suites.messenger.MessengerTests;
import suites.modules.ModularTests;
import suites.proxymap.OldProxyMapTests;
import integration.proxymap.ProxyMapTests;
import suites.proxymap.NamedInterfacedProxyMapTests;
import integration.lazyproxy.LazyProxyTests;
import suites.mediators.MediatorTests;
import suites.mediatormap.MediatorMapTests;
import integration.mediating.MediatingTests;
import suites.commandmap.CommandMapTests;
import integration.commandpooling.CommandPoolingTests;
import suites.faturegetproxy.FeatureGetProxyTests;
import integration.scopedmessaging.ChannelingTests;
import integration.scopecontrol.ScopeControlTests;
	 * 
	*/
import integration.scopedproxy.ScopedProxyTests;
import mvcexpress.MvcExpress;

class Main 
{	
	public function new()
	{
		
		MvcExpress.debugFunction  = haxe.Log.trace;
	
		new GeneralTests();			// OK
	/*
		new ModuleInitTests();		// OK
		new MessengerTests();		// OK  
		new UtilsTests();			// OK
		new ModularTests(); 		// OK
		new ProxyMapTests();  		// OK
		new OldProxyMapTests(); 	// seems to be OK
		new NamedInterfacedProxyMapTests(); // OK 
		new LazyProxyTests();		// OK
		new MediatorTests();		// OK
		new MediatorMapTests(); 	// OK	
		new MediatingTests();		// OK
		new CommandMapTests();		// OK
		new CommandPoolingTests();	// OK
		new FeatureGetProxyTests();	// OK
		new ChannelingTests();		// OK
		new ScopeControlTests();	// OK
	*/
		new ScopedProxyTests();		// OK 
	/*
			
			
	
*/
	}
	
	public static function main() 
	{
		new Main();
	}
}

