// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Interface to get proxy objects manualy with your code, instead of automatic injection.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.core.interfaces;

import mvcexpress.mvc.Proxy;

interface IProxyMap {

	function getProxy(injectClass : Class<Dynamic>, name : String = "") : Proxy;
}

