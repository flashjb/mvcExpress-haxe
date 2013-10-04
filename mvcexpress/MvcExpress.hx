// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Class to store framework global settings and some important variables.
 * 
 */
package mvcexpress;

////import mvcexpress.core.namespace.PureLegsCore;
import mvcexpress.core.traceobjects.TraceObj;

class MvcExpress 
{
	static public var VERSION(get_VERSION, never) : String;
	static public var DEBUG_COMPILE(get_DEBUG_COMPILE, never) : Bool;

	/** Home website of mvcExpress. */
	static public var WEBSITE_URL : String = "http://mvcexpress.org";
	/** Framework name */
	static public var NAME : String = "mvcExpress-haxe";
	/** Current framework major version */
	static public var MAJOR_VERSION : Int = 0;
	/** Current framework minor version */
	static public var MINOR_VERSION : Int = 0;
	/** Current framework revision version */
	static public var REVISION : Int = 4;
	/** Current framework version */
	//public static const VERSION:String = "v" + MAJOR_VERSION + "." + MINOR_VERSION + "." + REVISION;
	static public function get_VERSION() : String {
		return "v" + MAJOR_VERSION + "." + MINOR_VERSION + "." + REVISION;
	}

	/**
	 * Checks for 'debug' variable value.
	 * If it is true framework functions has overhead code, this overhead is used for debugging and error checking.
	 * This value can help not to forget compile with '-D debug' set to false for release.
	 */
	static public function get_DEBUG_COMPILE() : Bool {
		#if debug
				return true;
		#end
		return false;
	}

	/**
	 * Time in ms for framework to wait for missing dependencies.
	 * By default pending dependency feature is disabled, as it is set to 0. If missing injection is encountered - error will be instantly thrown.
	 * If pendingInjectsTimeOut is > 0, framework will wait this amount of time in milliseconds for missing dependencies to be mapped.
	 * If dependency is mapped during this waiting time - framework will find missing dependencies and resolve them.
	 * If in this time dependencies will not be resolved - error will be thrown.
	 */
	static public var pendingInjectsTimeOut : Int = 0;
	/**
	 * Sets a debug function that will get framework activity messages as String's.
	 * CONFIG:debug  MUST be set to true for debugFunction to get any trace data frame framework.
	 * For example you can use : MvcExpress.debugFunction = trace; to trace all debug data.
	 * it is good idea to set it before initializing first module.
	 */
	static public var debugFunction : Dynamic = null;
	//----------------------------------
	//     Internal
	//----------------------------------
	/**
	 * Function to get more detailed framework activity.
	 * 
	 */
	static var loggerFunction : Dynamic = null;
	/**
	 * Framework function for debugging.
	 * 
	 * 
	 */
	
#if debug
	static public function debug(traceObj : TraceObj) : Void {
		//use namespace pureLegsCore;
		if(debugFunction != null)  {
			if(traceObj.canPrint)  {
				debugFunction(traceObj);
			}
		}
		if(loggerFunction != null)  {
			loggerFunction(traceObj);
		}
	}
#end

	public function new(){}

}

