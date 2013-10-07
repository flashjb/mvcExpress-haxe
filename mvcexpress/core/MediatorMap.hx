// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Handles application mediators.
 * 
 */
package mvcexpress.core;

import haxe.ds.ObjectMap;

import mvcexpress.MvcExpress;
import mvcexpress.core.interfaces.IMediatorMap;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map;
import mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate;
import mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap;
import mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate;
import mvcexpress.mvc.Mediator;
import mvcexpress.utils.MvcExpressTools;

class MediatorMap implements IMediatorMap {

	// name of the module MediatorMap is working for.
	var moduleName : String;
	// for internal use.
	var proxyMap : ProxyMap;
	// for internal use.
	var messenger : Messenger;
	// stores all mediator classes using view class(mediator must mediate) as a key.
	var mediatorClassRegistry : ObjectMap<Dynamic, Class<Dynamic>>;
	/* of Class by Class */
	// stores all view inject classes using view class(mediator must mediate) as a key.
	var mediatorInjectRegistry : ObjectMap<Dynamic, Class<Dynamic>>;
	/* of Class by Class */
	// stores all mediators using use view object(mediator is mediating) as a key.
	var mediatorRegistry : ObjectMap<Dynamic, Mediator>;
	/* of Mediator by Object */
	/** CONSTRUCTOR */
	public function new(moduleName : String, messenger : Messenger, proxyMap : ProxyMap) 
	{
		mediatorClassRegistry  = new ObjectMap();
		mediatorInjectRegistry = new ObjectMap();
		mediatorRegistry 	   = new ObjectMap();
		
		this.moduleName = moduleName;
		this.messenger = messenger;
		this.proxyMap = proxyMap;
	}

	//----------------------------------
	//     set up of mediators
	//----------------------------------
	/**
	 * Maps mediator class to view class. Only one mediator class can mediate single instance of view class.
	 * 
	 * 
	 * 
	 */
	public function map(viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic>, injectClass : Class<Dynamic> = null) : Void 
	{
		// debug this action
		#if debug
		//			use namespace pureLegsCore;
			MvcExpress.debug(new TraceMediatorMap_map(moduleName, viewClass, mediatorClass));
		//			// check if mediatorClass is subclass of Mediator class
			if (!MvcExpressTools.checkClassSuperClass(mediatorClass, Mediator)) {
				throw ("mediatorClass:" + mediatorClass + " you are trying to map is not extended from 'mvcexpress.mvc::Mediator' class.");
			}
		#end
		
		// check if mapping is not created already
		if( mediatorClassRegistry.exists( viewClass ) )  {
			throw ("Mediator class:" + mediatorClassRegistry.get( viewClass ) + " is already mapped with this view class:" + viewClass + "");
		}
		
		mediatorClassRegistry.set( viewClass, mediatorClass );
		
		// map injectClass to viewClass
		if( injectClass == null )  {
			injectClass = viewClass;
		}
		mediatorInjectRegistry.set( viewClass, injectClass );
	}

	/**
	 * Unmaps any mediator class to given view class.
	 * If view is not mediated - it will fail silently.
	 * 
	 */
	public function unmap(viewClass : Class<Dynamic>) : Void 
	{
		// debug this action
		#if debug
			//use namespace pureLegsCore;
			MvcExpress.debug(new TraceMediatorMap_unmap(moduleName, viewClass));
		#end
		
		// clear mapping
		mediatorClassRegistry.remove(viewClass);
		mediatorInjectRegistry.remove(viewClass);
	}

	//----------------------------------
	//     mediating
	//----------------------------------
	/**
	 * 
	 * Mediates provided viewObject with mapped mediator.
	 * Automatically instantiates mediator class(if mapped), handles all injections(including viewObject), and calls onRegister function.
	 * Throws error if mediator class is not mapped to viewObject class.
	 * 
	 */
	public function mediate(viewObject : Dynamic) : Void 
	{
		//use namespace pureLegsCore;
		if(mediatorRegistry.exists(viewObject))  {
			throw ("This view object is already mediated by " + mediatorRegistry.get(viewObject));
		}
		
		var viewClass	: Class<Dynamic> = Type.getClass(viewObject);
		var injectClass : Class<Dynamic> = mediatorInjectRegistry.get(viewClass);
		
		// get mapped mediator class.
		var mediatorClass : Class<Dynamic> = mediatorClassRegistry.get(viewClass);
		if( mediatorClass != null )  
		{
			#if debug
				// Allows Mediator to be constructed. (removed from release build to save some performance.)
				Mediator.canConstruct = true;
			#end
			// create mediator.
			var mediator : Mediator = Type.createInstance(mediatorClass, []);
			// debug this action
			#if debug
				MvcExpress.debug(new TraceMediatorMap_mediate(moduleName, viewObject, mediator, viewClass, mediatorClass, Type.getClassName(mediatorClass)));
			#end
			//
			#if debug
			//				// Block Mediator construction.
				Mediator.canConstruct = false;
			#end
			
			mediator.moduleName  = moduleName;
			mediator.messenger   = messenger;
			mediator.proxyMap    = proxyMap;
			mediator.mediatorMap = this;
			
			var isAllInjected : Bool = proxyMap.injectStuff(mediator, mediatorClass, viewObject, injectClass);
			mediatorRegistry.set(viewObject, mediator);

			if(isAllInjected)  {
				mediator.register();
			}
			
		} else {
			throw "View object" + viewObject + " class is not mapped with any mediator class. use mediatorMap.map()";
		}

	}

	/**
	 * Mediates viewObject with specified mediator class.
	 * It is usually better practice to use 2 step mediation(map(), mediate()) instead of this function. But sometimes it is not possible.
	 * 
	 * 
	 * 
	 */
	public function mediateWith(viewObject : Dynamic, mediatorClass : Class<Dynamic>, injectClass : Class<Dynamic> = null) : Void 
	{
	//	use namespace pureLegsCore;
		if(mediatorRegistry.exists(viewObject))  {
			throw ("This view object is already mediated by " + mediatorRegistry.get(viewObject));
		}
		
		var mediator : Mediator = Type.createInstance( mediatorClass, [] );
		var viewClass : Class<Dynamic> = Type.getClass(viewObject);
		if( injectClass == null )  {
			injectClass = viewClass;
		}
		
		mediator.moduleName  = moduleName;
		mediator.messenger 	 = messenger;
		mediator.proxyMap 	 = proxyMap;
		mediator.mediatorMap = this;
		
		var isAllInjected : Bool = proxyMap.injectStuff(mediator, mediatorClass, viewObject, injectClass);
		mediatorRegistry.set(viewObject, mediator);
		
		if(isAllInjected)  {
			mediator.register();
		}
	}

	/**
	 * Unmediated view object
	 * If any mediator is mediating viewObject - it calls onRemove on that mediator, automatically removes all message handlers, all event listeners and disposes it.
	 * 
	 */
	public function unmediate(viewObject : Dynamic) : Void 
	{
		//use namespace pureLegsCore;
		
		// debug this action
		#if debug
			MvcExpress.debug(new TraceMediatorMap_unmediate(moduleName, viewObject));
		#end
		
		// get object mediator
		var mediator : Mediator = mediatorRegistry.get(viewObject);
		if( mediator != null ) {
			mediator.remove();
			mediatorRegistry.remove(viewObject);
		} else {
			throw "View object:" + viewObject + " has no mediator created for it.";
		}

	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * Checks if mediator class is mapped to view class.
	 * 
	 * 
	 * 
	 */
	public function isMapped(viewClass : Class<Dynamic>, mediatorClass : Class<Dynamic> = null) : Bool 
	{
		return 
				mediatorClassRegistry.exists(viewClass) 
			&& mediatorClass != null 
			&& mediatorClassRegistry.get(viewClass) == mediatorClass;
	}

	/**
	 * Check if class of view object is mapped to any mediator.
	 * 
	 */
	public function isViewMapped(viewObject : Dynamic) : Bool {
		var retVal : Bool = false;
		// = false;
		var viewClass : Class<Dynamic> = Type.getClass(viewObject);
		if( mediatorClassRegistry.exists(viewClass) )  {
			retVal = true;
		}
		return retVal;
	}

	/**
	 * Checks if view object is mediated.
	 * 
	 */
	public function isMediated(viewObject : Dynamic) : Bool {
		return mediatorRegistry.exists(viewObject);
	}

	/**
	 * Returns String of all view classes that are mapped to mediator classes. (for debugging)
	 * 
	 */
	public function listMappings() : String {
		var retVal : String = "";
		retVal = "==================== MediatorMap Mappings: =====================\n";
		for(  key   in Reflect.fields(mediatorClassRegistry)) {
			retVal += "VIEW:'" + key + "'	> MEDIATED BY > " + Reflect.field(mediatorClassRegistry, key) + "\n";
		}

		retVal += "================================================================\n";
		return retVal;
	}

	//----------------------------------
	//     INTERNAL
	//----------------------------------
	/**
	 * Dispose mediatorMap - unmediate all mediated view objects and set all internals to null.
	 * 
	 */
	public function dispose() : Void 
	{
		// unmediate all mediated view objects
		for( viewObject in Reflect.fields(mediatorRegistry) ) {
			unmediate( viewObject );
		}

		proxyMap = null;
		messenger = null;
		mediatorClassRegistry = null;
		mediatorInjectRegistry = null;
		mediatorRegistry = null;
	}

}

