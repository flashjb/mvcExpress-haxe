package integration.agenerictestobjects.controller;

import integration.agenerictestobjects.model.GenericTestProxy;
import mvcexpress.mvc.Command;

class GenericCommand_withScopedInject extends Command {

	
	public var genericTestProxy : GenericTestProxy;
	public function execute(blank : Dynamic) : Void {
	}

}

