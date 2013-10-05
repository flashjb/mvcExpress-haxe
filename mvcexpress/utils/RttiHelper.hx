package mvcexpress.utils;

import haxe.rtti.Meta;

class RttiHelper 
{
	
	public static function getMetaFields(type:Class<Dynamic>) : Array<Dynamic>
	{
		var metalist = new Array<Dynamic>();
		
		while (type != null)
		{
			var allFields = Type.getInstanceFields(type);
			var typeMeta  = Meta.getFields(type);
			var meta  = {};
		    for( field in Reflect.fields(typeMeta) )
			{
				Reflect.setField(meta, field,  Reflect.field(typeMeta, field));
			}
			
			
			//try to find the fucking type of this var which have some meta.
			for( field in Reflect.fields(allFields) )
			{
				for( k in Reflect.fields(meta) )
				{
					if( k == allFields[cast field] ){
						var obj = Type.createInstance(type, []);
						trace(Type.typeof(Reflect.field(obj,k)));
						trace("all fields > "+ k +">"+allFields[cast field] + Type.typeof(allFields[cast field]));
						//
						//When we will got it we gonna put in the list as type and break off
						//Reflect.setField(meta, "type", ??????????????);
						//
					}
				}
			}
			//for( i in Reflect.fields(meta))
			//{
			//	trace("meta list > "+i+">>"+Reflect.field(meta,i));//+"meta//"+Reflect.field(typeMeta, field)+" type >"+ Reflect.field(type, field) );//	Reflect.setField(meta, "class", Type.getClassName(Reflect.field(typeMeta, field)));
			//}
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
