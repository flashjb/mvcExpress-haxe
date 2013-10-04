package mvcexpress.utils;

import haxe.rtti.Meta;

class RttiHelper 
{
	
	public static function getMetaFields(type:Class<Dynamic>) : Array<Dynamic>
	{
		var metalist = new Array<Dynamic>();
		
		while (type != null)
		{
			var typeMeta = Meta.getFields(type);
			
			var rtti = untyped type.__rtti;
            if ( rtti == null )
                break;
						
			var infos = new haxe.rtti.XmlParser().processElement( Xml.parse(rtti).firstElement() );
			for( field in Reflect.fields(typeMeta) )
			{
				var meta  = {};
					Reflect.setField(meta, field, Reflect.field(typeMeta, field));
					
		            
            	//	var iCls = Type.enumParameters(  type  ).get( field ) [0];
					
				trace("try "+field+" :> meta.type :>"+ infos );//	Reflect.setField(meta, "class", Type.getClassName(Reflect.field(typeMeta, field)));
				metalist.push(meta);
			}
			

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
