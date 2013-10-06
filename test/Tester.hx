class Tester 
{

	var _currentTest : Int  = 0;
	var _inProgress  : Bool = false;
	public function new( ?inProgress : Bool = false )
	{
		_inProgress = inProgress;
		trace("\n\n*****************************\n -- "+ Type.getClassName( Type.getClass(this) )+" -- \n*****************************"); 
	}
	
	public function testFunction( funcName : String ) : Void
	{
		trace("\n*-------------------------*\n* current Test = "+ cast(++_currentTest) +": "+funcName+"\n*-------------------------*");
		if(_inProgress)
		{
			runBeforeEveryTest();
			Reflect.callMethod(this, Reflect.field(this, funcName), []);
			runAfterEveryTest();
		} 
		else 
		{
			try
			{
				runBeforeEveryTest();
			}catch( e:Dynamic ){
				trace( "#@##@#$%#@ ERROR BEFORE >>>>>>>>>>>>>> "+e );
			}
			try
			{
				Reflect.callMethod(this, Reflect.field(this, funcName), []);
			}catch( e:Dynamic ){
				trace( "#@##@#$%#@ ERROR >>>>>>>>>>>>>> "+e );
			}
			try
			{
				runAfterEveryTest();
			}catch( e:Dynamic ){
				trace( "#@##@#$%#@ ERROR AFTER >>>>>>>>>>>>>> "+e );
			}
		}
	}
	public function runBeforeEveryTest() : Void {
		
	}

	
	public function runAfterEveryTest() : Void {
		
	}
	
}
