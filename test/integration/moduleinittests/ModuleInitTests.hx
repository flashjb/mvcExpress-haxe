/**
 * COMMENT
 * 
 */
package integration.moduleinittests;

import utils.Assert;
import integration.moduleinittests.testobj.InitTestModuleCore;
import integration.moduleinittests.testobj.InitTestModuleMovieClip;
import integration.moduleinittests.testobj.InitTestModuleSprite;
import mvcexpress.modules.ModuleCore;

class ModuleInitTests extends Tester {

	var module : Dynamic;
	
	public function new() : Void 
	{
		super( true );
		testFunction("moduleInit_coreAutoInit_notNull");
		testFunction("moduleInit_coreNoAutoInit_null");
		testFunction("moduleInit_corePostAutoInit_notNull");
		
		testFunction("moduleInit_movieClipAutoInit_notNull");
		testFunction("moduleInit_movieClipNoAutoInit_null");
		testFunction("moduleInit_movieClipPostAutoInit_notNull");
		
		testFunction("moduleInit_spriteAutoInit_notNull");
		testFunction("moduleInit_spriteNoAutoInit_null");
		testFunction("moduleInit_spritePostAutoInit_notNull");
		
	}
	
	override public function runAfterEveryTest() : Void 
	{
		if(module)  {
			//Reflect.callMethod( module, "disposeModule", [] );
			module.disposeModule();
		}
	}

	//----------------------------------
	//	moduleCore
	//----------------------------------
	
	public function moduleInit_coreAutoInit_notNull() : Void {
		var testModule : InitTestModuleCore = new InitTestModuleCore(true);
			module = testModule;
		Assert.assertNotNull("ModuleCore proxyMap should be not null after autoInit", 		testModule.getProxyMap());
		Assert.assertNotNull("ModuleCore commandMap should be not null after autoInit", 	testModule.getCommandMap());
		Assert.assertNotNull("ModuleCore mediatorMap should be not null after autoInit", 	testModule.getMediatorMap());
	}

	
	public function moduleInit_coreNoAutoInit_null() : Void {
		var testModule : InitTestModuleCore = new InitTestModuleCore(false);
			module = testModule;
		Assert.assertNull("ModuleCore proxyMap should be null after no autoInit", testModule.getProxyMap());
		Assert.assertNull("ModuleCore commandMap should be null after no autoInit", testModule.getCommandMap());
		Assert.assertNull("ModuleCore mediatorMap should be null after no autoInit", testModule.getMediatorMap());
	}

	
	public function moduleInit_corePostAutoInit_notNull() : Void {
		var testModule : InitTestModuleCore = new InitTestModuleCore(false);
			module = testModule;
		testModule.start();
		Assert.assertNotNull("ModuleCore proxyMap should be not null after later init", testModule.getProxyMap());
		Assert.assertNotNull("ModuleCore commandMap should be not null after later init", testModule.getCommandMap());
		Assert.assertNotNull("ModuleCore mediatorMap should be not null after later init", testModule.getMediatorMap());
	}

	//----------------------------------
	//	moduleMovieClip
	//----------------------------------
	
	public function moduleInit_movieClipAutoInit_notNull() : Void {
		var testModule : InitTestModuleMovieClip = new InitTestModuleMovieClip(true);
			module = testModule;
		Assert.assertNotNull("ModuleMovieClip proxyMap should be not null after autoInit", testModule.getProxyMap());
		Assert.assertNotNull("ModuleMovieClip commandMap should be not null after autoInit", testModule.getCommandMap());
		Assert.assertNotNull("ModuleMovieClip mediatorMap should be not null after autoInit", testModule.getMediatorMap());
	}
	
	public function moduleInit_movieClipNoAutoInit_null() : Void {
		var testModule : InitTestModuleMovieClip = new InitTestModuleMovieClip(false);
		module = testModule;
		Assert.assertNull("ModuleMovieClip proxyMap should be null after no autoInit", testModule.getProxyMap());
		Assert.assertNull("ModuleMovieClip commandMap should be null after no autoInit", testModule.getCommandMap());
		Assert.assertNull("ModuleMovieClip mediatorMap should be null after no autoInit", testModule.getMediatorMap());
	}

	
	public function moduleInit_movieClipPostAutoInit_notNull() : Void {
		var testModule : InitTestModuleMovieClip = new InitTestModuleMovieClip(false);
		module = testModule;
		testModule.start();
		Assert.assertNotNull("ModuleMovieClip proxyMap should be not null after later init", testModule.getProxyMap());
		Assert.assertNotNull("ModuleMovieClip commandMap should be not null after later init", testModule.getCommandMap());
		Assert.assertNotNull("ModuleMovieClip mediatorMap should be not null after later init", testModule.getMediatorMap());
	}

	//----------------------------------
	//	moduleSprite
	//----------------------------------
	
	public function moduleInit_spriteAutoInit_notNull() : Void {
		var testModule : InitTestModuleSprite = new InitTestModuleSprite(true);
		module = testModule;
		Assert.assertNotNull("ModuleSprite proxyMap should be not null after autoInit", 	testModule.getProxyMap());
		Assert.assertNotNull("ModuleSprite commandMap should be not null after autoInit", 	testModule.getCommandMap());
		Assert.assertNotNull("ModuleSprite mediatorMap should be not null after autoInit", 	testModule.getMediatorMap());
	}

	
	public function moduleInit_spriteNoAutoInit_null() : Void {
		var testModule : InitTestModuleSprite = new InitTestModuleSprite(false);
		module = testModule;
		Assert.assertNull("ModuleSprite proxyMap should be null after no autoInit", testModule.getProxyMap());
		Assert.assertNull("ModuleSprite commandMap should be null after no autoInit", testModule.getCommandMap());
		Assert.assertNull("ModuleSprite mediatorMap should be null after no autoInit", testModule.getMediatorMap());
	}

	
	public function moduleInit_spritePostAutoInit_notNull() : Void {
		var testModule : InitTestModuleSprite = new InitTestModuleSprite(false);
		module = testModule;
		testModule.start();
		Assert.assertNotNull("ModuleSprite proxyMap should be not null after later init", testModule.getProxyMap());
		Assert.assertNotNull("ModuleSprite commandMap should be not null after later init", testModule.getCommandMap());
		Assert.assertNotNull("ModuleSprite mediatorMap should be not null after later init", testModule.getMediatorMap());
	}

}

