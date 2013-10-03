/**
 * COMMENT
 * 
 */
package integration.lazyproxy;

import utils.Assert;
import integration.lazyproxy.testobj.modulea.LazyProxy;
import integration.lazyproxy.testobj.modulea.LazyProxyModuleA;

class LazyProxyTests {

	var lazyProxyModulA : LazyProxyModuleA;
	
	public function runBeforeEveryTest() : Void {
		lazyProxyModulA = new LazyProxyModuleA();
	}

	
	public function runAfterEveryTest() : Void {
		lazyProxyModulA.disposeModule();
		LazyProxy.instantiateCount = 0;
	}

	
	public function lazyProxy_lazyMaping_proxyNotInstantiated() : Void {
		lazyProxyModulA.lazyMap();
		Assert.assertEquals("Lazy mapping should not instantiate proxy.", LazyProxy.instantiateCount, 0);
	}

	
	public function lazyProxy_lazyMapingThenInjectingToProxy_proxyInstantiatedOnce() : Void {
		lazyProxyModulA.lazyMap();
		lazyProxyModulA.createProxyWithLazyInject();
		Assert.assertEquals("Lazy proxy must be instantiated once.", LazyProxy.instantiateCount, 1);
	}

	
	public function lazyProxy_lazyAndNormalMaping_fails() : Void {
		lazyProxyModulA.lazyMap();
		lazyProxyModulA.normalMap();
	}

	
	public function lazyProxy_normalAndLazyMaping_fails() : Void {
		lazyProxyModulA.normalMap();
		lazyProxyModulA.lazyMap();
	}

	
	public function lazyProxy_lazyMapingTwice_fails() : Void {
		lazyProxyModulA.lazyMap();
		lazyProxyModulA.lazyMap();
	}

	
	public function lazyProxy_lazyMapingNotProxy_fails() : Void {
		#if debug
			lazyProxyModulA.mapNotProxy();
			return;
		#end
		throw cast(("debug mode only."), Error);
	}

	//----------------------------------
	//     params
	//----------------------------------
	
	public function lazyProxy_lazyMaping1Param_ok() : Void {
		lazyProxyModulA.mapWithParams([1]);
	}

	
	public function lazyProxy_lazyMaping10Params_ok() : Void {
		lazyProxyModulA.mapWithParams([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	}

	
	public function lazyProxy_lazyMaping11Params_fails() : Void {
		#if debug
			lazyProxyModulA.mapWithParams([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		#end
		throw cast(("debug mode only."), Error);
	}

}

