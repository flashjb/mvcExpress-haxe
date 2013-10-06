/**
 * CLASS COMMENT
 * 
 */
package integration.proxymap.testobj;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class TestContsViewMediator extends Mediator {

	@inject
	public var view : TestContsView;
	
	@inject({constName:"integration.proxyMap.testObj::TestConstObject.TEST_CONST_FOR_PROXY_INJECT"})
	public var genericTestProxy : GenericTestProxy;
	
	
	override public function onRegister() : Void {
	}

	override public function onRemove() : Void {
	}

}

