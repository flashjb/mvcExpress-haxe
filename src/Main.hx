package;

import integration.scopedmessaging.ChannelingTests;
import integration.moduleinittests.ModuleInitTests;
import suites.faturegetproxy.FeatureGetProxyTests;
import suites.general.GeneralTests;
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
		//#if !flash 
			MvcExpress.debugFunction = haxe.Log.trace;
		//#else
		//	MvcExpress.debugFunction = log;
		//#end
		//MvcExpress.debugFunction = haxe.Log.trace;
		//MvcExpress.pendingInjectsTimeOut = 5000;
		
		new GeneralTests();	// OK
		new ModuleInitTests();	// OK
		new MessengerTests();	// no errors .. maybe ok??
		new OldProxyMapTests(); // OK
		new NamedInterfacedProxyMapTests(); // NOK /// Mapping with interface seems to not work
		new MediatorMapTests(); // OK
		//new MediatorTests();
		//new ModularTests();
		//new UtilsTests();
		//new FeatureGetProxyTests();
		//new ChannelingTests();
	}
	
/*
	public function log( error )
	{
		if (flash.external.ExternalInterface.available){
			trace( error );
			flash.external.ExternalInterface.call("console.log", error);
		}
		else 
			trace( error );
	}
*/	
	public static function main() 
	{
		new Main();
	}
}
