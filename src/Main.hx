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
	//	MvcExpress.loggerFunction = haxe.Log.trace;
		
		//new GeneralTests();		// OK
		//new ModuleInitTests();	// OK
		//new UtilsTests();			// OK
		//new MessengerTests();		// OK no errors .. maybe ok?? >> My Async Test are too bad
		//new ModularTests(); 		// OK
		//new OldProxyMapTests(); 	// XXX >> TODO : unmap not work
		//new ProxyMapTests();  	// XXX >> TODO : inject by Constant name
		//new NamedInterfacedProxyMapTests(); // OK 
		//new LazyProxyTests();		// XXX : TODO : lazyProxy_lazyMapingNotProxy_fails should fail... many params supported
		//new MediatorTests();		// OK
		//new MediatorMapTests(); 	// OK	
		//new MediatingTests();		// XXX : Many many errors TODO : 2 Module.. umnediate nok...
		//new CommandMapTests();	// XXX : cast problem /// check for parameters type... good luck
		//new CommandPoolingTests();// XXX : cast problem /// check for parameters type... good luck
		
		new ChannelingTests();		// XXX >> TODO : unmediate problem not work
		new FeatureGetProxyTests();	// XXX >> TODO : 
		new ScopedProxyTests();		// XXX >> TODO : 
		new ScopeControlTests();	// XXX >> TODO : 
		
		
	}
	
	public static function main() 
	{
		new Main();
	}
}
