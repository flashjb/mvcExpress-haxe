class Tester 
{

	public function new(){
		trace("\n\n*****************************\n -- "+ Type.getClassName( Type.getClass(this) )+" -- \n*****************************"); 
	}
	
	var _currentTest : Int = 0;
	public function testFunction( funcName : String ) : Void
	{
		trace("\n*-------------------------*\n* current Test = "+ cast(++_currentTest) +": "+funcName+"\n*-------------------------*");
		runBeforeEveryTest();
		try
		{
			Reflect.callMethod(this, Reflect.field(this, funcName), []);
		}catch( e:Dynamic ){
			trace( "#@##@#$%#@ ERROR >>>>>>>>>>>>>> "+e );
		}
		runAfterEveryTest();
	}
	public function runBeforeEveryTest() : Void {
		
	}

	
	public function runAfterEveryTest() : Void {
		
	}
	
}
