// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * ProxyMap is responsible for storing proxy objects and handling injection.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.core;

import haxe.rtti.Meta;
import flash.utils.Dictionary;

import mvcexpress.MvcExpress;
import mvcexpress.core.inject.InjectRuleVO;
import mvcexpress.core.inject.PendingInject;
import mvcexpress.core.interfaces.IProxyMap;
import mvcexpress.core.messenger.Messenger;
import mvcexpress.core.namespace.PureLegsCore;
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

class ProxyMap implements IProxyMap {

	// name of the module CommandMap is working for.
	var moduleName : String;
	var messenger : Messenger;
	var commandMap : CommandMap;
	/** stares class QualifiedClassName by class */
	static var qualifiedClassNameRegistry : Dictionary = new Dictionary();
	/* of String by Class*/
	/** dictionary of (Vector of InjectRuleVO), stored by class names. */
	static var classInjectRules : Dictionary = new Dictionary();
	/* of Vector.<InjectRuleVO> by Class */
	/** all objects ready for injection stored by key. (className + inject name) */
	var injectObjectRegistry : Dictionary;
	/* of Proxy by String */
	/** dictionary of (Vector of PendingInject), it holds array of pending data with proxies and mediators that has pending injections,  stored by needed injection key(className + inject name).  */
	var pendingInjectionsRegistry : Dictionary;
	/* of Vector.<PendingInject> by String */
	/** dictionary of lazy Proxies, those proxies will be instantiated and mapped on first use. */
	var lazyProxyRegistry : Dictionary;
	/* of Vector.<PendingInject> by String */
	/** Dictionary with constonts of inject names, used with constName, and constScope. */
	var classConstRegistry : Dictionary;
	/** CONSTRUCTOR */
	public function new(moduleName : String, messenger : Messenger) 
	{
		injectObjectRegistry = new Dictionary();
		pendingInjectionsRegistry = new Dictionary();
		lazyProxyRegistry = new Dictionary();
		classConstRegistry = new Dictionary();
		this.moduleName = moduleName;
		this.messenger = messenger;
	}

	//----------------------------------
	//     set up proxies
	//----------------------------------
	/**
	 * Maps proxy object to injectClass and name.
	 * @param	proxyObject	Proxy instance to use for injection.
	 * @param	injectClass	Optional class to use for injection, if null proxyObject class is used. It is helpful if you want to map proxy interface or subclass.
	 * @param	name		Optional name if you need more then one proxy instance of same class.
	 * @return	returns inject id. (for debuging reasons only.)
	 */
	public function map(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : String {
		use;
		namespace;
		pureLegsCore;
		// get proxy class
		var proxyClass : Class<Dynamic> = Type.getClass(cast((proxyObject), Object).constructor);
		// if injectClass is not provided - proxyClass will be used instead.
		if(!injectClass)  {
			injectClass = proxyClass;
		}
		var className : String = qualifiedClassNameRegistry[injectClass];
		if(!className)  {
			className = getQualifiedClassName(injectClass);
			qualifiedClassNameRegistry[injectClass] = className;
		}
		var injectId : String = className + name;
		if(lazyProxyRegistry[injectId])  {
			throw cast(("Proxy object is already lazy mapped. [injectClass:" + injectClass + " name:" + name + "]"), Error);
		}
		if(injectObjectRegistry[injectId])  {
			throw cast(("Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]"), Error);
		}
		if(proxyObject.messenger == null)  {
			initProxy(proxyObject, proxyClass, injectId);
		}
		if(pendingInjectionsRegistry[injectId])  {
			injectPendingStuff(injectId, proxyObject);
		}
		if(!injectObjectRegistry[injectId])  {
			// store proxy injection for other classes.
			injectObjectRegistry[injectId] = proxyObject;
		}

		else  {
			throw cast(("Proxy object class is already mapped.[injectClass:" + className + " name:" + name + "]"), Error);
		}

		return injectId;
	}

	/**
	 * Removes proxy mapped for injection by injectClass and name.
	 *  If mapping does not exists - it will fail silently.
	 * @param	injectClass	class previously mapped for injection
	 * @param	name		name added to class, that was previously mapped for injection
	 * @return	returns inject id. (for debuging reasons only.)
	 */
	public function unmap(injectClass : Class<Dynamic>, name : String = "") : String {
		use;
		namespace;
		pureLegsCore;
		// debug this action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxyMap_unmap(moduleName, injectClass, name));
		//		}
		// get inject id
		var className : String = qualifiedClassNameRegistry[injectClass];
		if(!className)  {
			className = getQualifiedClassName(injectClass);
			qualifiedClassNameRegistry[injectClass] = className;
		}
		var injectId : String = className + name;
		// remove proxy if it exists.
		if(injectObjectRegistry[injectId])  
		{
			var proxy : Proxy =  cast(injectObjectRegistry[injectId], Proxy);
			// handle dependencies..
			var dependencies : Dictionary = proxy.getDependantCommands();
			for( item in dependencies ) {
				commandMap.clearCommandPool(item);
			}

			proxy.remove();
			injectObjectRegistry[injectId] = null;
		}
		return injectId;
	}

	//----------------------------------
	//     Lazy map
	//----------------------------------
	/**
	 * Stores lazy proxy data to be instantiated on first use. Proxy will be instantiated and mapped then requested for the first time.
	 * @param	proxyClass
	 * @param	injectClass	Optional class to use for injection, if null proxyObject class is used. It is helpful if you want to map proxy interface or subclass.
	 * @param	name		Optional name if you need more then one proxy instance of same class.
	 * @param	proxyParams
	 * @return	returns inject id. (for debuging reasons only.)
	 */
	public function lazyMap(proxyClass : Class<Dynamic>, injectClass : Class<Dynamic> = null, name : String = "", proxyParams : Array<Dynamic> = null) : String {
		if(!injectClass)  {
			injectClass = proxyClass;
		}
		var className : String = qualifiedClassNameRegistry[injectClass];
		if(!className)  {
			className = getQualifiedClassName(injectClass);
			qualifiedClassNameRegistry[injectClass] = className;
		}
		var injectId : String = className + name;
		if(lazyProxyRegistry[injectId])  {
			throw cast(("Proxy class is already lazy mapped. [injectClass:" + className + " name:" + name + "]"), Error);
		}
		if(injectObjectRegistry[injectId])  {
			throw cast(("Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]"), Error);
		}
		var lazyInject : LazyProxyData = new LazyProxyData();
		lazyInject.proxyClass = proxyClass;
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
	 * @param	injectClass	Optional class to use for injection, if null proxyObject class is used. It is helpful if you want to map proxy interface or subclass.
	 * @param	name		Optional name if you need more then one proxy instance of same class.
	 */
	public function getProxy(injectClass : Class<Dynamic>, name : String = "") : Proxy {
		var className : String = qualifiedClassNameRegistry[injectClass];
		if(!className)  {
			className = getQualifiedClassName(injectClass);
			qualifiedClassNameRegistry[injectClass] = className;
		}
		var classAndName : String = className + name;
		if(injectObjectRegistry[classAndName])  {
			return injectObjectRegistry[classAndName];
		}

		else  {
			throw cast(("Proxy object is not mapped. [injectClass:" + className + " name:" + name + "]"), Error);
		}

	}

	//----------------------------------
	//     maping to scope
	//----------------------------------
	/**
	 * Maps proxy object to the scape with injectClass and name.
	 * @param	scopeName	scope name to map proxy to. Same scope name must be used for injection.
	 * @param	proxyObject	Proxy instance to use for injection.
	 * @param	injectClass	Optional class to use for injection, if null proxyObject class is used. It is helpful if you want to map proxy interface or subclass.
	 * @param	name		Optional name if you need more then one proxy instance of same class.
	 */
	public function scopeMap(scopeName : String, proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Void {
		use;
		namespace;
		pureLegsCore;
		//debug this action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxyMap_scopeMap(moduleName, scopeName, proxyObject, injectClass, name));
		//		}
		//
		// init proxy if needed.
		if(proxyObject.messenger == null)  {
			// get proxy class
			var proxyClass : Class<Dynamic> = Type.getClass(cast((proxyObject), Object).constructor);
			// if injectClass is not provided - proxyClass will be used instead.
			if(!injectClass)  {
				injectClass = proxyClass;
			}
			var className : String = qualifiedClassNameRegistry[injectClass];
			if(!className)  {
				className = getQualifiedClassName(injectClass);
				qualifiedClassNameRegistry[injectClass] = className;
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
	 * @param	scopeName	class previously mapped for injection
	 * @param	injectClass	class previously mapped for injection
	 * @param	name		name added to class, that was previously mapped for injection
	 */
	public function scopeUnmap(scopeName : String, injectClass : Class<Dynamic>, name : String = "") : Void {
		use;
		namespace;
		pureLegsCore;
		// debug this action
		//		CONFIG::debug {
		//			MvcExpress.debug(new TraceProxyMap_scopeUnmap(moduleName, scopeName, injectClass, name));
		//		}
		ModuleManager.scopeUnmap(moduleName, scopeName, injectClass, name);
	}

	//----------------------------------
	//     Debug
	//----------------------------------
	/**
	 * Checks if proxy object is already mapped.
	 * @param	proxyObject	Proxy instance to use for injection.
	 * @param	injectClass	Optional class to use for injection, if null proxyObject class is used. It is helpful if you want to map proxy interface or subclass.
	 * @param	name		Optional name if you need more then one proxy instance of same class.
	 * @return				true if object is already mapped.
	 */
	public function isMapped(proxyObject : Proxy, injectClass : Class<Dynamic> = null, name : String = "") : Bool {
		var retVal : Bool;
		// = false;
		var proxyClass : Class<Dynamic> = Type.getClass(cast((proxyObject), Object).constructor);
		if(!injectClass)  {
			injectClass = proxyClass;
		}
		var className : String = qualifiedClassNameRegistry[injectClass];
		if(!className)  {
			className = getQualifiedClassName(injectClass);
			qualifiedClassNameRegistry[injectClass] = className;
		}
		if(injectObjectRegistry[className + name])  {
			retVal = true;
		}
		return retVal;
	}

	/**
	 * Returns text of all mapped proxy objects, and keys they are mapped to. (for debugging)
	 * @return		Text string with all mapped proxies.
	 */
	public function listMappings() : String {
		var retVal : String = "";
		retVal = "====================== ProxyMap Mappings: ======================\n";
		for(  key  in Reflect.fields(injectObjectRegistry)) {
			retVal += "PROXY OBJECT:'" + Reflect.fields(injectObjectRegistry, key) + "'			(MAPPED TO:" + key + ")\n";
		}

		retVal += "================================================================\n";
		return retVal;
	}

	//----------------------------------
	//     internal stuff
	//----------------------------------
	function setCommandMap(value : CommandMap) : Void {
		commandMap = value;
	}

	/**
	 * Initiates proxy object.
	 * @param	proxyObject
	 * @private
	 */
	function initProxy(proxyObject : Proxy, proxyClass : Class<Dynamic>, injectId : String) : Void {
		use;
		namespace;
		pureLegsCore;
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
	 * @private
	 */
	function dispose() : Void 
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
	 * @private
	 */
	function injectStuff(object : Dynamic, signatureClass : Class<Dynamic>, tempValue : Dynamic = null, tempClass : Class<Dynamic> = null) : Bool {
		//use namespace pureLegsCore;
		var isAllInjected : Bool = true;
		// deal with temporal injection. (it is used only for this injection, for example - view object for mediator is used this way.)
		var tempClassName : String;
		if( tempValue )  {
			if(tempClass)  {
				tempClassName = qualifiedClassNameRegistry[tempClass];
				if(!tempClassName)  {
					tempClassName = getQualifiedClassName(tempClass);
					qualifiedClassNameRegistry[tempClass] = tempClassName;
				}
				if(!injectObjectRegistry[tempClassName])  {
					injectObjectRegistry[tempClassName] = tempValue;
				}

				else  {
					throw cast(("Temp object should not be mapped already... it was meant to be used by framework for mediator view object only."), Error);
				}

			}
		}
		var rules : Array<InjectRuleVO> = classInjectRules[signatureClass];
		if(!rules)  {
			////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////
			// DOIT: TEST in-line function .. ( Putting in-line function here ... makes commands slower.. WHY!!!)
			rules = getInjectRules(signatureClass);
			classInjectRules[signatureClass] = rules;
			///////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////
		}
		var ruleCount : Int = rules.length;
		var i : Int;
		while(i < ruleCount) {
			var rule : InjectRuleVO = rules[i];
			var scopename : String = rule.scopeName;
			var injectClassAndName : String = rule.injectClassAndName;
			if(scopename)  {
				if(!ModuleManager.injectScopedProxy(object, rule))  {
					if(MvcExpress.pendingInjectsTimeOut && !(Std.is(object, Command)))  {
						isAllInjected = false;
						//add injection to pending injections.
						// debug this action
						//						CONFIG::debug {
						//							MvcExpress.debug(new TraceProxyMap_scopedInjectPending(scopename, moduleName, object, injectObject, rule));
						//						}
						ModuleManager.addPendingScopedInjection(scopename, injectClassAndName, new PendingInject(injectClassAndName, object, signatureClass, MvcExpress.pendingInjectsTimeOut));
						object.pendingInjections++;
						//throw Error("Pending scoped injection is not supported yet.. (IN TODO...)");
					}

					else  {
						throw cast(("Inject object is not found in scope:" + scopename + " for class with id:" + injectClassAndName + "(needed in " + object + ")"), Error);
					}

				}
			}

			else  {
				var injectObject : Dynamic = injectObjectRegistry[injectClassAndName];
				if(injectObject)  {
					object[rule.varName] = injectObject;
					// debug this action
					//					CONFIG::debug {
					//						MvcExpress.debug(new TraceProxyMap_injectStuff(moduleName, object, injectObject, rule));
					//					}
				}

				else  {
					// if local injection fails... test for lazy injections
					if(lazyProxyRegistry[injectClassAndName])  {
						var lazyProxyData : LazyProxyData = lazyProxyRegistry[injectClassAndName];
						lazyProxyRegistry[injectClassAndName] = null;
						var lazyProxy : Proxy;
						if(lazyProxyData.proxyParams)  {
							var paramCount : Int = lazyProxyData.proxyParams.length;
							if(paramCount == 0)  {
								lazyProxy = new lazyproxydata.ProxyClass();
							}

							else if(paramCount == 1)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0]);
							}

							else if(paramCount == 2)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1]);
							}

							else if(paramCount == 3)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2]);
							}

							else if(paramCount == 4)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3]);
							}

							else if(paramCount == 5)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4]);
							}

							else if(paramCount == 6)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4], lazyProxyData.proxyParams[5]);
							}

							else if(paramCount == 7)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4], lazyProxyData.proxyParams[5], lazyProxyData.proxyParams[6]);
							}

							else if(paramCount == 8)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4], lazyProxyData.proxyParams[5], lazyProxyData.proxyParams[6], lazyProxyData.proxyParams[7]);
							}

							else if(paramCount == 9)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4], lazyProxyData.proxyParams[5], lazyProxyData.proxyParams[6], lazyProxyData.proxyParams[7], lazyProxyData.proxyParams[8]);
							}

							else if(paramCount == 10)  {
								lazyProxy = new lazyproxydata.ProxyClass(lazyProxyData.proxyParams[0], lazyProxyData.proxyParams[1], lazyProxyData.proxyParams[2], lazyProxyData.proxyParams[3], lazyProxyData.proxyParams[4], lazyProxyData.proxyParams[5], lazyProxyData.proxyParams[6], lazyProxyData.proxyParams[7], lazyProxyData.proxyParams[8], lazyProxyData.proxyParams[9]);
							}

							else  {
								throw cast(("Lazy proxing is not supported with that many parameters. Cut it douwn please. Thanks!  [injectClass:" + lazyProxyData.injectClass + " ,name: " + lazyProxyData.name + "]"), Error);
							}

						}

						else  {
							lazyProxy = new lazyproxydata.ProxyClass();
						}

						map(lazyProxy, lazyProxyData.injectClass, lazyProxyData.name);
						i--;
					}

					else  {
						// remember that not all injections exists
						isAllInjected = false;
						if(MvcExpress.pendingInjectsTimeOut && !(Std.is(object, Command)))  {
							//add injection to pending injections.
							// debug this action
							//							CONFIG::debug {
							//								MvcExpress.debug(new TraceProxyMap_injectPending(moduleName, object, injectObject, rule));
							//							}
							//
							addPendingInjection(injectClassAndName, new PendingInject(injectClassAndName, object, signatureClass, MvcExpress.pendingInjectsTimeOut));
							object.pendingInjections++;
						}

						else  {
							throw cast(("Inject object is not found for class with id:" + injectClassAndName + "(needed in " + object + ")"), Error);
						}

					}

				}

			}

			i++;
		}
		////// handle command pooling (register dependencies)
		// chekc if object is PooledCommand,
		if(Std.is(object, PooledCommand))  {
			var command : PooledCommand =  cast(object, PooledCommand);
			//check if it is not pooled already.
			if(!commandMap.checkIsClassPooled(signatureClass))  {
				// dependencies remembers who is dependant on them.
				ruleCount = rules.length;
				var r : Int;
				while(r < ruleCount) {
					cast(command[rules[r].varName], Proxy).registerDependantCommand(signatureClass);
					r++;
				}
			}
		}
		if(tempClassName)  {
			injectObjectRegistry[tempClassName] = null;
		}
		return isAllInjected;
	}

	/**
	 * Adds pending injection.
	 * @param	injectClassAndName
	 * @param	pendingInjection
	 * @private
	 */
	function addPendingInjection(injectClassAndName : String, pendingInjection : PendingInject) : Void {
		var pendingInjections : Array<PendingInject> = pendingInjectionsRegistry[injectClassAndName];
		if(!pendingInjections)  {
			pendingInjections = new Array<PendingInject>();
			pendingInjectionsRegistry[injectClassAndName] = pendingInjections;
		}
		pendingInjections[pendingInjections.length] = pendingInjection;
	}

	/**
	 * Handle all pending injections for specified key.
	 */
	function injectPendingStuff(injectClassAndName : String, injectee : Dynamic) : Void {
		use;
		namespace;
		pureLegsCore;
		var pendingInjects : Array<PendingInject> = pendingInjectionsRegistry[injectClassAndName];
		while(pendingInjects.length) {
			//
			var pendingInjection : PendingInject = pendingInjects.pop();
			pendingInjection.stopTimer();
			// get rules. (by now rules for this class must be created.)
			var rules : Array<InjectRuleVO> = classInjectRules[pendingInjection.signatureClass];
			var pendingInject : Dynamic = pendingInjection.pendingObject;
			var ruleCount : Int = rules.length;
			var j : Int = 0;
			while(j < ruleCount) {
				if(rules[j].injectClassAndName == injectClassAndName)  {
					// satisfy missing injection.
					pendingInject[rules[j].varName] = injectee;
					// resolve object
					if(Std.is(pendingInject, Proxy))  {
						var proxyObject : Proxy =  cast(pendingInject, Proxy) ;
						proxyObject.pendingInjections--;
						if(proxyObject.pendingInjections == 0)  {
							proxyObject.register();
						}
					}
					else if(Std.is(pendingInject, Mediator))  {
						var mediatorObject : Mediator =  cast(pendingInject, Mediator);
						mediatorObject.pendingInjections--;
						if(mediatorObject.pendingInjections == 0)  {
							mediatorObject.register();
						}
					}
					break;
				}
				j++;
			}
		}

		//
		pendingInjectionsRegistry[injectClassAndName] = null;
	}

	/**
	 * Finds and cashes class injection point rules.
	 */
	function getInjectRules(signatureClass : Class<Dynamic>) : Array<InjectRuleVO> 
	{
		var retVal : Array<InjectRuleVO> = new Array<InjectRuleVO>();
		var classDescription : XML = describeType(signatureClass);
		//		var factoryNodes:XMLList = classDescription.factory.*;
		var factoryNodes : XMLList = cast((classDescription.factory), XMLList);
		var nodeCount : Int = factoryNodes.length();
		var i : Int;
		while(i < nodeCount) {
			var node : XML = factoryNodes[i];
			var nodeName : String = node.name();
			if(nodeName == "variable" || nodeName == "accessor")  {
				var metadataList : XMLList = node.metadata;
				var metadataCount : Int = metadataList.length();
				var j : Int = 0;
				while(j < metadataCount) {
					nodeName = metadataList[j];
					if(nodeName == "Inject")  {
						var injectName : String = "";
						var scopeName : String = "";
						var args : XMLList = metadataList[j].arg;
						var argCount : Int = args.length();
						var k : Int = 0;
						while(k < argCount) {
							var argKey : String = args[k].att.key;
							if(argKey == "name")  {
								injectName = args[k].att.alue;
							}

							else if(argKey == "scope")  {
								scopeName = args[k].att.value;
							}

							else if(argKey == "constName")  {
								injectName = getInjectByContName(args[k].att.value);
							}

							else if(argKey == "constScope")  {
								scopeName = getInjectByContName(args[k].att.value);
							}
							k++;
						}
						var mapRule : InjectRuleVO = new InjectRuleVO();
						mapRule.varName = node.att.name.toString();
						mapRule.injectClassAndName = node.att.type.toString() + injectName;
						mapRule.scopeName = scopeName;
						retVal[retVal.length] = mapRule;
					}
					j++;
				}
			}
			i++;
		}
		return retVal;
	}

	@:meta(Inline())
	function getInjectByConstName(constName : String) : String 
	{
		if(!classConstRegistry[constName])  {
			var split : Array<Dynamic> = constName.split(".");
			var className : String = split[0];
			var splitLength : Int = split.length - 1;
			var spliteIndex : Int = 1;
			while(spliteIndex < splitLength) {
				className += "." + split[spliteIndex];
				spliteIndex++;
			}
			try {
				var constClass : Class<Dynamic> = Type.getClass(className);
				classConstRegistry[constName] = constClass[split[spliteIndex]];
				if(!classConstRegistry[constName])  {
					throw cast(("Failed to get constant out of class:" + constClass + " Check constant name: " + split[spliteIndex]), Error);
				}
			}
			catch(error : Error) {
				throw cast(("Failed to get constant out of constName:" + constName + " Can't get class from definition : " + className), Error);
			}

		}
		return classConstRegistry[constName];
	}

	// gets proxy by id directly.
	function getProxyById(injectClassAndName : String) : Proxy {
		return injectObjectRegistry[injectClassAndName];
	}

}

class LazyProxyData {

	/**
	 * private class to store lazy proxy data.
	 * @private
	 */
	public var proxyClass : Class<Dynamic>;
	public var injectClass : Class<Dynamic>;
	public var name : String;
	public var proxyParams : Array<Dynamic>;
}

