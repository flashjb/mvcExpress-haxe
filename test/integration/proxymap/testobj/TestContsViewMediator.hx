/**
 * CLASS COMMENT
 * 
 */
package integration.proxymap.testobj;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Mediator;

class TestContsViewMediator extends Mediator {

	
	public var view : TestContsView;
	
	public var genericTestProxy : GenericTestProxy;
	override public function onRegister() : Void {
	}

	override public function onRemove() : Void {
	}

}

