// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Interface for Mediator. MediatorsMap use mediators with this interface.
 * 
 */
package mvcexpress.core.interfaces;

interface IMediatorMap {

	function mediate(viewObject : Dynamic) : Void;
	function mediateWith(viewObject : Dynamic, mediatorClass : Class<Dynamic>, injectClass : Class<Dynamic> = null) : Void;
	function unmediate(viewObject : Dynamic) : Void;
	function isViewMapped(viewObject : Dynamic) : Bool;
}

