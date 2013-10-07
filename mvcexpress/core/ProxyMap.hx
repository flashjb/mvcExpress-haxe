// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * ProxyMap is responsible for storing proxy objects and handling injection.
 * 
 */
package mvcexpress.core;

import haxe.ds.ObjectMap;

import mvcexpress.MvcExpress;
import mvcexpress.core.inject.InjectRuleVO;
import mvcexpress.core.inject.PendingInject;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.Messenger;
////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending;
import mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap;
import mvcexpress.mvc.Command;
import mvcexpress.mvc.Mediator;
import mvcexpress.mvc.PooledCommand;
import mvcexpress.mvc.Proxy;
import mvcexpress.utils.MvcExpressTools;
import mvcexpress.utils.RttiHelper;

class ProxyMap implements IProxyMap 
{

	// name of the module CommandMap is working for.
	var moduleName : String;
	var messenger  : Messenger;
	var commandMap : CommandMap;
	/** stares class QualifiedClassName by class */
	static var qualifiedClassNameRegistry : ObjectMap<Dynamic, String> = new ObjectMap();
	/* of String by Class*/
	/** dictionary of (Vector of InjectRuleVO), stored by class names. */
	static var classInjectRules : ObjectMap<Dynamic, Array<InjectRuleVO>> = new ObjectMap();
	/* of Vector.<InjectRuleVO> by Class */
	/** all objects ready for injection stored by key. (className + inject name) */
	var injectObjectRegistry : ObjectMap<Dynamic, Dynamic>;
	/* of Proxy by String */
	/** dictionary of (Vector of PendingInject), it holds array of pending data with proxies and mediators that has pending injections,  stored by needed injection key(className + inject name).  */
	var pendingInjectionsRegistry : Map<String, Array<PendingInject>>;
	/* of Vector.<PendingInject> by String */
	/** dictionary of lazy Proxies, those proxies will be instantiated and mapped on first use. */
	var lazyProxyRegistry : Map<String, LazyProxyData>;
	/* of Vector.<PendingInject> by String */
	/** Dictionary with constonts of inject names, used with constName, and constScope. */
	var classConstRegistry : Map<String, Dynamic>;
	
	
	/** CONSTRUCTOR */
	public function new(moduleName : String, messenger : Messenger) 
	{
		injectObjectRegistry 		= new ObjectMap<Dynamic, Dynamic>();
		pendingInjectionsRegistry 	= new Map();
		lazyProxyRegistry 			= new Map();
		classConstRegistry 			= new Map<String, Dynamic>();
		
		this.moduleName = moduleName;
		this.messenger  = messenger;
	}

	//----------------------------------
	//     set up proxies
	//----------------------------------
	/**
	 * Maps proxy object to injectClass and name.
	 * 
	 */
	public function map(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : String 
	{
		
		//use namespace pureLegsCore;
		// get proxy class
		var proxyClass : Class<Dynamic> = Type.getClass(proxyObject);
		// if injectClass is not provided - proxyClass will be used instead.
		if( injectClass == null )  {
			injectClass = proxyClass;
		}
		
		var className : String = qualifiedClassNameRegistry.get(injectClass);
		if( className == null )  {
			className = Type.getClassName(injectClass);
			qualifiedClassNameRegistry.set(injectClass, className);
		}
		
		var injectId : String = className + name;
		if( lazyProxyRegistry.exists(injectId) )  {
			throw "Proxy object is already lazy mapped. [injectClass:" + injectClass + " name:" + name + "]";
		}
		
		if( injectObjectRegistry.exists(injectId) )  {
			throw "Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]";
		}
		
		if( proxyObject.messenger == null )  {
			initProxy(proxyObject, proxyClass, injectId);
		}
		
		if( pendingInjectionsRegistry.exists(injectId) )  {
			injectPendingStuff(injectId, proxyObject);
		}
		
	//	trace( "can map :"+injectId+"--" + !injectObjectRegistry.exists(injectId), proxyObject ) ;
		if( !injectObjectRegistry.exists(injectId) )  {
			// store proxy injection for other classes.
			injectObjectRegistry.set(injectId, proxyObject);
		} else {
			throw "Proxy object class is already mapped.[injectClass:" + className + " name:" + name + "]";
		}

		return injectId;
	}

	/**
	 * Removes proxy mapped for injection by injectClass and name.
	 *  If mapping does not exists - it will fail silently
	 */
	public function unmap(injectClass : Class<Dynamic>, name : String = "") : String {
		//use namespace pureLegsCore;
		// debug this action
		#if debug
			MvcExpress.debug(new TraceProxyMap_unmap(moduleName, injectClass, name));
		#end
		
		// get inject id
		var className : String = qualifiedClassNameRegistry.get(injectClass);
		if( className == null )  {
			className = Type.getClassName(injectClass);
			qualifiedClassNameRegistry.set(injectClass, className);
		}
		var injectId : String = className + name;
		// remove proxy if it exists.
		if(injectObjectRegistry.exists(injectId))  
		{
			var proxy : Proxy =  cast(injectObjectRegistry.get(injectId), Proxy);
			// handle dependencies..
			//trace("proxy:"+proxy, proxy.getDependantCommands());
			var dependencies = proxy.getDependantCommands(); 
			if( dependencies != null )
			{
				//trace("dependencies:"+dependencies);
				for( item in dependencies ) {
					//trace("item"+item);
					commandMap.clearCommandPool(item);
				}
			}

			proxy.remove();
			injectObjectRegistry.remove(injectId);
		}
		return injectId;
	}

	//----------------------------------
	//     Lazy map
	//----------------------------------
	/**
	 * Stores lazy proxy data to be instantiated on first use. Proxy will be instantiated and mapped then requested for the first time.
	 * 
	
	 * 
	 */
	public function lazyMap(proxyClass : Class<Dynamic>, injectClass : Class<Dynamic> = null, name : String = "", proxyParams : Array<Dynamic> = null) : String {
		if( injectClass == null )  {
			injectClass = proxyClass;
		}
		var className : String = qualifiedClassNameRegistry.get(injectClass);
		if( className == null )  {
			className = Type.getClassName(injectClass);
			qualifiedClassNameRegistry.set(injectClass, className);
		}
		var injectId : String = className + name;
		if( lazyProxyRegistry.exists(injectId) )  {
			throw "Proxy class is already lazy mapped. [injectClass:" + className + " name:" + name + "]";
		}
		if( injectObjectRegistry.exists(injectId) )  {
			throw "Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]";
		}
		
		//debug this action
		#if debug
			if (!MvcExpressTools.checkClassSuperClass(proxyClass, Proxy)) {
				throw ("proxyClass:" + proxyClass + " you are trying to lazy map is not extended from 'org.mvcexpress.mvc::Proxy' class.");
			}
			MvcExpress.debug(new TraceProxyMap_lazyMap(moduleName, proxyClass, injectClass, name, proxyParams));
		#end
		
		var lazyInject : LazyProxyData = new LazyProxyData();
			lazyInject.proxyClass  = proxyClass;
			lazyInject.injectClass = injectClass;
			lazyInject.name = name;
			lazyInject.proxyParams = proxyParams;
			lazyProxyRegistry[injectId] = lazyInject;
		return injectId;
	}

	//----------------------------------
	//     get proxy
	//----------------------------------
	/**
	 * Get mapped proxy. This is needed to get proxy manually instead of inject it automatically. 							<br>
	 * 		You might wont to get proxy manually then your proxy has dynamic name.										<br>
	 * 		Also you might want to get proxy manually if your proxy is needed only in rare cases or only for short time.
	 * 			(for instance - you need it only in onRegister() function.)
	 * 
	 * 
	 */
	public function getProxy(injectClass : Class<Dynamic>, name : String = "") : Proxy 
	{
		var className : String = qualifiedClassNameRegistry.get(injectClass);
		if( className != null )  {
			className = Type.getClassName(injectClass);
			qualifiedClassNameRegistry.set(injectClass, className);
		}
		var classAndName : String = className + name;
		if( injectObjectRegistry.exists(classAndName) )  {
			return cast injectObjectRegistry.get(classAndName);
		}
 
		throw "Proxy object is not mapped. [injectClass:" + className + " name:" + name + "]";
			
		return null;
	}

	//----------------------------------
	//     maping to scope
	//----------------------------------
	/**
	 * Maps proxy object to the scape with injectClass and name.
	 * 
	 */
	public function scopeMap(scopeName : String, proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Void 
	{
		//use namespace pureLegsCore;
		//debug this action
		#if debug
			MvcExpress.debug(new TraceProxyMap_scopeMap(moduleName, scopeName, proxyObject, injectClass, name));
		#end
		//
		// init proxy if needed.
		if(proxyObject.messenger == null)  {
			// get proxy class
			var proxyClass : Class<Dynamic> = Type.getClass(proxyObject);
			// if injectClass is not provided - proxyClass will be used instead.
			if( injectClass == null )  {
				injectClass = proxyClass;
			}
			var className : String = qualifiedClassNameRegistry.get(injectClass);
			if( className == null )  {
				className = Type.getClassName(injectClass);
				qualifiedClassNameRegistry.set(injectClass, className);
			}
			var injectId : String = className + name;
			//
			initProxy(proxyObject, proxyClass, injectId);
		}
		ModuleManager.scopeMap(moduleName, scopeName, proxyObject, injectClass, name);
	}


	/**
	 * Removes proxy mapped to scope with injectClass and name.
	 *  If mapping does not exists - it will fail silently.
	 * 
	 * 
	 * 
	 */
	public function scopeUnmap(scopeName : String, injectClass : Class<Dynamic>, name : String = "") : Void 
	{
		//use namespace pureLegsCore;
		// debug this action
		#if debug
			MvcExpress.debug(new TraceProxyMap_scopeUnmap(moduleName, scopeName, injectClass, name));
		#end
		
		ModuleManager.scopeUnmap(moduleName, scopeName, injectClass, name);
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * Checks if proxy object is already mapped.
	 * 
	 */
	public function isMapped(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Bool 
	{
		var retVal : Bool = false;
		var proxyClass : Class<Dynamic> = Type.getClass(proxyObject);
		if( injectClass == null )  {
			injectClass = proxyClass;
		}
		var className : String = qualifiedClassNameRegistry.get(injectClass);
		if( className == null )  {
			className = Type.getClassName(injectClass);
			qualifiedClassNameRegistry.set(injectClass, className);
		}
		if( injectObjectRegistry.exists(className + name) )  {
			retVal = true;
		}
		return retVal;
	}

	/**
	 * Returns text of all mapped proxy objects, and keys they are mapped to. (for debugging)
	 * 
	 */
	public function listMappings() : String {
		var retVal : String = "";
		retVal = "====================== ProxyMap Mappings: ======================\n";
		for(  key  in Reflect.fields(injectObjectRegistry)) {
			retVal += "PROXY OBJECT:'" + Reflect.field(injectObjectRegistry, key) + "'			(MAPPED TO:" + key + ")\n";
		}

		retVal += "================================================================\n";
		return retVal;
	}

	//----------------------------------
	//     internal stuff
	//----------------------------------
	public function setCommandMap(value : CommandMap) : Void {
		commandMap = value;
	}

	/**
	 * Initiates proxy object.
	 * 
	 * 
	 */
	public function initProxy(proxyObject : Proxy, proxyClass : Class<Dynamic>, injectId : String) : Void {
		//use namespace pureLegsCore;
		proxyObject.messenger = messenger;
		proxyObject.setProxyMap(this);
		// inject dependencies
		var isAllInjected : Bool = injectStuff(proxyObject, proxyClass);
		// register proxy is all injections are done.
		if(isAllInjected)  {
			proxyObject.register();
		}
	}

	/**
	 * Dispose of proxyMap. Remove all registered proxies and set all internals to null.
	 * 
	 */
	public function dispose() : Void 
	{
		//use namespace pureLegsCore;
		// Remove all registered proxies
		for(  proxyObject in injectObjectRegistry ) 
		{
			if(Std.is(proxyObject, Proxy))  
			{
				cast(proxyObject, Proxy).remove();
			}
		}

		// set internals to null
		injectObjectRegistry = null;
		pendingInjectionsRegistry = null;
		lazyProxyRegistry = null;
		classConstRegistry = null;
		commandMap = null;
		messenger = null;
	}

	/**
	 * Finds inject points and injects dependencies.
	 * tempValue and tempClass defines injection that will be done for current object only.
	 * 
	 */
	public function injectStuff(object : Dynamic, signatureClass : Class<Dynamic>, tempValue : Dynamic = null, tempClass : Class<Dynamic> = null) : Bool 
	{
		//trace(">>>>>>>> injectStuff:"+ object+"--"+signatureClass+tempValue+"--"+tempClass  );
		
		//use namespace pureLegsCore;
		var isAllInjected : Bool = true;
		
		// deal with temporal injection. (it is used only for this injection, for example - view object for mediator is used this way.)
		var tempClassName : String = "";
		if( tempValue != null )  
		{
			if( tempClass != null )  
			{
				tempClassName = qualifiedClassNameRegistry.get(tempClass);
				
				if( tempClassName == null )  {
					tempClassName = Type.getClassName(tempClass);
					qualifiedClassNameRegistry.set(tempClass, tempClassName);
				}
				
			
				//trace( "tempClassName:", tempClass, " className : ", Type.getClassName(tempClass) );
				//trace( "injectionClassName:", tempClassName, "already exists : ", injectObjectRegistry.exists(tempClassName) );
			
				if(!injectObjectRegistry.exists(tempClassName))  {
					injectObjectRegistry.set(tempClassName, tempValue);
				} else  {
					throw ("Temp object should not be mapped already... it was meant to be used by framework for mediator view object only.");
				}
				

			}
		}
		
		// get class injection rules. (cashing is used.)
		var rules : Array<InjectRuleVO> = classInjectRules.get(signatureClass);
		if( rules == null )  {
			////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////
			// DOIT: TEST in-line function .. ( Putting in-line function here ... makes commands slower.. WHY!!!)
			rules = getInjectRules(signatureClass);
			classInjectRules.set(signatureClass, rules);
			
		//	trace('rules!!!!!!>>>>>', rules);
			///////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////
		}
		
		var i :Int = 0;
		var ruleCount:Int = rules.length;
		//trace("num Rules : "+ruleCount);
		for ( rule  in rules ) 
		{
			//trace("rule:"+rule);
			var scopename : String = rule.scopeName;
			var injectClassAndName : String = rule.injectClassAndName;
			
			if( scopename != null ) 
			 {
				if(!ModuleManager.injectScopedProxy(object, rule))  
				{
					//trace(MvcExpress.pendingInjectsTimeOut, "//", object, "type:", Std.is(object, Command), MvcExpress.pendingInjectsTimeOut > 0 && !Std.is(object, Command));
					if(MvcExpress.pendingInjectsTimeOut > 0 && !Std.is(object, Command))  
					{
						isAllInjected = false;
						//add injection to pending injections.
						// debug this action
						#if debug
							MvcExpress.debug(new TraceProxyMap_scopedInjectPending(scopename, moduleName, object, null, rule));
						#end
						
						ModuleManager.addPendingScopedInjection(scopename, injectClassAndName, new PendingInject(injectClassAndName, object, signatureClass, MvcExpress.pendingInjectsTimeOut));
						object.pendingInjections++;
						//throw Error("Pending scoped injection is not supported yet.. (IN TODO...)");
					} else {
						throw ("Inject object is not found in scope:" + scopename + " for class with id:" + injectClassAndName + "(needed in " + object + ")");
					}
				}
			}
			else  
			{
				var injectObject = injectObjectRegistry.get(injectClassAndName);
				if( injectObject != null ) 
				{
					Reflect.setField(object, rule.varName, injectObject);
					
					// debug this action
					#if debug
						MvcExpress.debug(new TraceProxyMap_injectStuff(moduleName, object, injectObject, rule));
					#end
					
				} else {
					
					var lazyProxyData : LazyProxyData;
					
					// if local injection fails... test for lazy injections
					if(lazyProxyRegistry[injectClassAndName] != null)  
					{
						lazyProxyData = lazyProxyRegistry[injectClassAndName];
						lazyProxyRegistry[injectClassAndName] = null;
						var lazyProxy = Type.createInstance( lazyProxyData.proxyClass, lazyProxyData.proxyParams );

						map(lazyProxy, lazyProxyData.injectClass, lazyProxyData.name);
						
						
					//	i--;
						
					}
					else  
					{
						// remember that not all injections exists
						isAllInjected = false;
						if(MvcExpress.pendingInjectsTimeOut > 0  && !Std.is(object, Command) ) 
						{
							//add injection to pending injections.
							// debug this action
							#if debug
								MvcExpress.debug(new TraceProxyMap_injectPending(moduleName, object, injectObject, rule));
							#end
							//
							addPendingInjection(injectClassAndName, new PendingInject(injectClassAndName, object, signatureClass, MvcExpress.pendingInjectsTimeOut));
							object.pendingInjections++;
						} else  {
							throw ("Inject object is not found for class with id:" + injectClassAndName + "(needed in " + object + ")");
						}
					}
				}
				//++i;
			}
		}
		////// handle command pooling (register dependencies)
		// chekc if object is PooledCommand,
		if(Std.is(object, PooledCommand))  {
			var command : PooledCommand =  cast(object, PooledCommand);
			//check if it is not pooled already.
			if(!commandMap.checkIsClassPooled(signatureClass))  
			{
				// dependencies remembers who is dependant on them.
				for ( r in rules ) 
					cast(Reflect.field(command, r.varName), Proxy).registerDependantCommand(signatureClass);
				
			}
		}
		if( tempClassName != null )  {
			injectObjectRegistry.remove(tempClassName);
		}
		return isAllInjected;
	}

	/**
	 * Adds pending injection.
	 * 
	 * 
	 * 
	 */
	public function addPendingInjection(injectClassAndName : String, pendingInjection : PendingInject) : Void {
		var pendingInjections : Array<PendingInject> = pendingInjectionsRegistry[injectClassAndName];
		if( pendingInjections == null )  {
			pendingInjections = new Array<PendingInject>();
			pendingInjectionsRegistry[injectClassAndName] = pendingInjections;
		}
		pendingInjections[pendingInjections.length] = pendingInjection;
	}

	/**
	 * Handle all pending injections for specified key.
	 */
	function injectPendingStuff(injectClassAndName : String, injectee : Dynamic) : Void 
	{
		//use namespace pureLegsCore;
		var pendingInjects : Array<PendingInject> = pendingInjectionsRegistry[injectClassAndName];
		while(pendingInjects.length > 0) 
		{
			var pendingInjection : PendingInject = pendingInjects.pop();
				pendingInjection.stopTimer();
				
			// get rules. (by now rules for this class must be created.)
			var rules : Array<InjectRuleVO> = classInjectRules.get(pendingInjection.signatureClass);
			var pendingInject : Dynamic = pendingInjection.pendingObject;
			
			for( rule in rules ) 
			{
				if( rule.injectClassAndName == injectClassAndName )  
				{
					// satisfy missing injection.
					Reflect.setField(pendingInject, rule.varName, injectee);
					// resolve object
					if(Std.is(pendingInject, Proxy))  
					{
						var proxyObject : Proxy =  cast(pendingInject, Proxy) ;
							proxyObject.pendingInjections--;
							
						if(proxyObject.pendingInjections == 0)  {
							proxyObject.register();
						}
					}
					else if(Std.is(pendingInject, Mediator))  
					{
						var mediatorObject : Mediator =  cast(pendingInject, Mediator);
							mediatorObject.pendingInjections--;
							
						if(mediatorObject.pendingInjections == 0)  {
							mediatorObject.register();
						}
					}
					break;
				}
			}
		}
		pendingInjectionsRegistry.remove( injectClassAndName );
	}

	/**
	 * Finds and cashes class injection point rules.
	 */
	function getInjectRules(signatureClass : Class<Dynamic>) : Array<InjectRuleVO> 
	{
		var retVal  : Array<InjectRuleVO> = new Array<InjectRuleVO>();
		var variablestoadd  : Array<Dynamic>   = RttiHelper.getMetaFields(signatureClass);
		
		for( variable in variablestoadd ) 
		{
			for( key in Reflect.fields(variable) ) 
			{
				var name : String   = key;
				var data : Dynamic  = Reflect.field(variable, key);
				var type = Reflect.field(data, "type"); 
				var meta = Reflect.field(data, "meta"); 
				var inject = ( meta != null ) ? Reflect.hasField(meta, "inject") : false;
				
				if( inject ) // injection
				{
					var args = null; 
					try{
						args = Reflect.field(meta, "inject")[0];
					} catch ( o : Dynamic ) {
					//    trace("Injection has no argument");
					}
					
					var injectName : String = "";
					var scopeName  : String = "";
					
					
					if( args != null ) {
						injectName = Reflect.hasField(args, "name")   ? Reflect.field(args, "name")  : Reflect.hasField(args, "constName")  ? getInjectByConstName(Reflect.field(args, "constName"))  : "";
						scopeName  = Reflect.hasField(args, "scope")  ? Reflect.field(args, "scope") : Reflect.hasField(args, "constScope") ? getInjectByConstName(Reflect.field(args, "constScope")) : "";
					}
					/*
					trace(signatureClass+" >>> injectName:", injectName);
					trace(signatureClass+" >>> scopeName:", scopeName);
					*/
					var mapRule : InjectRuleVO = new InjectRuleVO();
						mapRule.varName   = name;
						mapRule.injectClassAndName = type + injectName;
						mapRule.scopeName = (scopeName != "") ? scopeName : null;
					retVal[retVal.length] = mapRule;
				}
			}
		}
		return retVal;
	}

	
	function getInjectByConstName(constName : String) : String 
	{
		if( classConstRegistry[constName] == null )  
		{
			var split : Array<Dynamic> = constName.split(".");
			var constPos : Int = split.length - 1;
			var className : String = split[0];
			for(spliteIndex in 1...constPos) {
				className += "." + split[spliteIndex];
			}
			
			
			
			try 
			{
				var constClass : Class<Dynamic> = Type.resolveClass(className);
				var constants = Type.getClassFields(constClass);
				for ( j in Type.getClassFields(constClass) ) 
				{
					if(  j == split[constPos] )
					{
						var value = Reflect.field(constClass, j);
						classConstRegistry[constName] = value;
					}
				}
				if( !classConstRegistry.exists(constName) )  {
					throw ("Failed to get constant out of class:" + constClass + " Check constant name: " + split[constPos]);
				}
			}
			catch ( msg : String ) {
				throw ("Failed to get constant out of constName:" + constName + " Can't get class from definition : " + className);
			}

		}
		return cast(classConstRegistry[constName], String);
	}

	// gets proxy by id directly.
	public function getProxyById(injectClassAndName : String) : Proxy {
		return cast( injectObjectRegistry.get(injectClassAndName), Proxy );
	}
	
	
}

class LazyProxyData {

	/**
	 * private class to store lazy proxy data.
	 */
	public var proxyClass  	: Class<Dynamic>;
	public var injectClass 	: Class<Dynamic>;
	public var name 		: String;
	public var proxyParams 	: Array<Dynamic>;
	
	public function new(){}
}

