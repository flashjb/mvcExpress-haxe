/**
 * CLASS COMMENT
 * 
 */
package suites.testobjects.moduleexternal;

import mvcexpress.mvc.Proxy;

class ExternalDataProxy extends Proxy 
{

	public var localCommandCount : Int;
	public var localHandlerCount : Int;
	public var remoteCommandCount : Int;
	public var remoteHandlerCount : Int;
	
	public function new() {
		localCommandCount = 0;
		localHandlerCount = 0;
		remoteCommandCount = 0;
		remoteHandlerCount = 0;
	}

	override function onRegister() : Void {
	}

	override function onRemove() : Void {
	}

}

