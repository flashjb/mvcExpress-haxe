package mvcexpress.utils;

import haxe.rtti.Meta;

class RttiHelper 
{
	
	public static function getMetaFields(type:Class<Dynamic>) : Array<Dynamic>
	{
		var metalist = new Array<Dynamic>();
		
		while (type != null)
		{
			var infos = null;
			var allFields = Type.getClassFields(type);
			for( i in allFields )
			{
				if( i == "__rtti" ){
					infos = new haxe.rtti.XmlParser().processElement( Xml.parse(Reflect.field(type,i)).firstElement()  );
					break;
				}
			}
			
			var typeMeta  = Meta.getFields(type);
			var meta  = {};
		    for( field in Reflect.fields(typeMeta) )
			{
				var fieldType = "";
				//trace("meta field > "+ field +">"+Reflect.field(typeMeta, field));
				
				if( infos != null) {
					switch(infos)
				    {
				        case TClassdecl(cl):
				            for (f in cl.fields)
				            {
				               if (f.name == field )
				               {
									fieldType = cast f.type.getParameters()[0];
				               }
				            }
				        default:
				    }
				}
				Reflect.setField(meta, field, {"meta" : Reflect.field(typeMeta, field), "type" : fieldType} );
			}
			
		
			metalist.push(meta);
			

			type = Type.getSuperClass(type);
		}

		return metalist;
	}
	
	
	/***************************
	 *     PRIVATE METHODS
	 ************************
	static function getClassDef( cls : Class<Dynamic> ) : Dynamic
	{
	    var x = Xml.parse( untyped cls.__rtti ).firstElement();
	    var infos = new haxe.rtti.XmlParser().processElement( x );
	    return ( Type.enumConstructor( infos ) == "TClassdecl" ) ? Type.enumParameters( infos )[0] : null;
	}
	
	
	static function unifyFields( cls : Classdef, ?h : Map<Dynamic> ) : Map<Dynamic> 
	{
	    if( h == null ) 
	        h = new Map<Dynamic>();
			
	    for ( f in cls.fields )
	        if ( !h.exists( f.name ) )
	            h.set( f.name, f );
				
	    var parent = cls.superClass;
	    if( parent != null ) 
	    {
	        var c = getClassDef( Type.resolveClass( parent.path ) );
	        if( c != null )
	            unifyFields( c, h );
	    }
	    return h;
	}
***/
}
