// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/**
 * Small class to test if framework can use Inject metadata tag.
 * (It might be not compiled in, in release mode if '-keep-as3-metadata+=Inject' compile argument is not used.
 * @author Raimundas Banevicius (http://www.mindscriptact.com/)
 */
package mvcexpress.core.inject;

class TestInject {

	@:meta(Inject())
	public var metadataTest : Bool;
	public function testInjectMetaTag() : Bool {
		var retVal : Bool = false;
		//var classDescription : XML = describeType(testInject);
//				//		var factoryNodes:XMLList = classDescription.factory.*;
//				var factoryNodes : XMLList = classDescription.factory;
//				var nodeCount : Int = factoryNodes.length();
//				var i : Int;
//				while(i < nodeCount) {
//					var node : XML = factoryNodes[i];
//					var nodeName : String = node.name();
//					if(nodeName == "variable")  {
//						var metadataList : XMLList = node.metadata;
//						var metadataCount : Int = metadataList.length();
//						var j : Int = 0;
//						while(j < metadataCount) {
//							nodeName = metadataList[j].@name;
//							if(nodeName == "Inject")  {
//								retVal = true;
//							}
//							j++;
//						}
//					}
//					i++;
		return retVal;
	}

}

