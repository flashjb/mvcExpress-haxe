(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.completed = null;
ApplicationMain.preloader = null;
ApplicationMain.total = null;
ApplicationMain.loaders = null;
ApplicationMain.urlLoaders = null;
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	try {
		if(Reflect.hasField(js.Browser.window,"winParameters")) flash.Lib.get_current().loaderInfo.parameters = (Reflect.field(js.Browser.window,"winParameters"))();
		flash.Lib.get_current().get_stage().loaderInfo = flash.Lib.get_current().loaderInfo;
	} catch( e ) {
	}
	ApplicationMain.preloader = new NMEPreloader();
	flash.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var resourcePrefix = "NME_:bitmap_";
	var _g = 0, _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader = ApplicationMain.loaders.get(path);
			loader.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader.load(new flash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new flash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(Main,"main") == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.field(Main,"main").apply(Main,[]);
}
var Main = function() {
	mvcexpress.MvcExpress.debugFunction = haxe.Log.trace;
	new suites.general.GeneralTests();
	new suites.faturegetproxy.FeatureGetProxyTests();
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new Main();
}
Main.prototype = {
	__class__: Main
}
var DocumentClass = function() {
	Main.call(this);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	__class__: DocumentClass
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
IMap.prototype = {
	iterator: null
	,remove: null
	,exists: null
	,set: null
	,get: null
	,__class__: IMap
}
var flash = {}
flash.events = {}
flash.events.IEventDispatcher = function() { }
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	willTrigger: null
	,removeEventListener: null
	,hasEventListener: null
	,dispatchEvent: null
	,addEventListener: null
	,__class__: flash.events.IEventDispatcher
}
flash.events.EventDispatcher = function(target) {
	if(target != null) this.nmeTarget = target; else this.nmeTarget = this;
	this.nmeEventMap = [];
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
flash.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,setList: function(type,list) {
		this.nmeEventMap[type] = list;
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,getList: function(type) {
		return this.nmeEventMap[type];
	}
	,existList: function(type) {
		return this.nmeEventMap != null && this.nmeEventMap[type] != undefined;
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.nmeTarget;
		var capture = event.eventPhase == flash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.nmeGetIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new flash.events.Listener(inListener,capture,priority));
		list.sort(flash.events.EventDispatcher.compareListeners);
	}
	,nmeEventMap: null
	,nmeTarget: null
	,__class__: flash.events.EventDispatcher
}
flash.display = {}
flash.display.IBitmapDrawable = function() { }
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	drawToSurface: null
	,__class__: flash.display.IBitmapDrawable
}
flash.display.DisplayObject = function() {
	flash.events.EventDispatcher.call(this,null);
	this._nmeId = flash.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new flash.geom.Transform(this));
	this.nmeX = 0.0;
	this.nmeY = 0.0;
	this.nmeScaleX = 1.0;
	this.nmeScaleY = 1.0;
	this.nmeRotation = 0.0;
	this.nmeWidth = 0.0;
	this.nmeHeight = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.nmeFilters = new Array();
	this.nmeBoundsRect = new flash.geom.Rectangle();
	this.nmeScrollRect = null;
	this.nmeMask = null;
	this.nmeMaskingObj = null;
	this.set_nmeCombinedVisible(this.get_visible());
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.DisplayObject.__super__ = flash.events.EventDispatcher;
flash.display.DisplayObject.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeSrUpdateDivs: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null || this.parent == null) return;
		if(this.nmeScrollRect == null) {
			if(this._srAxes != null && gfx.nmeSurface.parentNode == this._srAxes && this._srWindow.parentNode != null) this._srWindow.parentNode.replaceChild(gfx.nmeSurface,this._srWindow);
			return;
		}
		if(this._srWindow == null) {
			this._srWindow = js.Browser.document.createElement("div");
			this._srAxes = js.Browser.document.createElement("div");
			this._srWindow.style.setProperty("position","absolute","");
			this._srWindow.style.setProperty("left","0px","");
			this._srWindow.style.setProperty("top","0px","");
			this._srWindow.style.setProperty("width","0px","");
			this._srWindow.style.setProperty("height","0px","");
			this._srWindow.style.setProperty("overflow","hidden","");
			this._srAxes.style.setProperty("position","absolute","");
			this._srAxes.style.setProperty("left","0px","");
			this._srAxes.style.setProperty("top","0px","");
			this._srWindow.appendChild(this._srAxes);
		}
		var pnt = this.parent.localToGlobal(new flash.geom.Point(this.get_x(),this.get_y()));
		this._srWindow.style.left = pnt.x + "px";
		this._srWindow.style.top = pnt.y + "px";
		this._srWindow.style.width = this.nmeScrollRect.width + "px";
		this._srWindow.style.height = this.nmeScrollRect.height + "px";
		this._srAxes.style.left = -pnt.x - this.nmeScrollRect.x + "px";
		this._srAxes.style.top = -pnt.y - this.nmeScrollRect.y + "px";
		if(gfx.nmeSurface.parentNode != this._srAxes && gfx.nmeSurface.parentNode != null) {
			gfx.nmeSurface.parentNode.insertBefore(this._srWindow,gfx.nmeSurface);
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			this._srAxes.appendChild(gfx.nmeSurface);
		}
	}
	,nmeGetSrWindow: function() {
		return this._srWindow;
	}
	,set_width: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var w = this.nmeBoundsRect.width;
		if(this.nmeScaleX * w != inValue) {
			if(w == 0) {
				this.nmeScaleX = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				w = this.nmeBoundsRect.width;
			}
			if(w <= 0) return 0;
			this.nmeScaleX = inValue / w;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_width: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeWidth;
	}
	,set_y: function(inValue) {
		if(this.nmeY != inValue) {
			this.nmeY = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_y: function() {
		return this.nmeY;
	}
	,set_x: function(inValue) {
		if(this.nmeX != inValue) {
			this.nmeX = inValue;
			this.nmeInvalidateMatrix(true);
			if(this.parent != null) this.parent.nmeInvalidateBounds();
		}
		return inValue;
	}
	,get_x: function() {
		return this.nmeX;
	}
	,set_visible: function(inValue) {
		if(this.nmeVisible != inValue) {
			this.nmeVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeVisible;
	}
	,get_visible: function() {
		return this.nmeVisible;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this.nmeInvalidateMatrix(true);
		return inValue;
	}
	,get__topmostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,get_stage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return flash.Lib.nmeGetStage();
		return null;
	}
	,set_scrollRect: function(inValue) {
		this.nmeScrollRect = inValue;
		this.nmeSrUpdateDivs();
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.nmeScrollRect == null) return null;
		return this.nmeScrollRect.clone();
	}
	,set_scaleY: function(inValue) {
		if(this.nmeScaleY != inValue) {
			this.nmeScaleY = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.nmeScaleY;
	}
	,set_scaleX: function(inValue) {
		if(this.nmeScaleX != inValue) {
			this.nmeScaleX = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.nmeScaleX;
	}
	,set_rotation: function(inValue) {
		if(this.nmeRotation != inValue) {
			this.nmeRotation = inValue;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_rotation: function() {
		return this.nmeRotation;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.nmeInvalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.nmeChildren,this);
			this.parent.nmeInvalidateBounds();
		}
		if(inValue != null) {
			inValue._nmeRenderFlags |= 64;
			if(inValue.parent != null) inValue.parent._nmeRenderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,set_nmeCombinedVisible: function(inValue) {
		if(this.nmeCombinedVisible != inValue) {
			this.nmeCombinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.nmeCombinedVisible;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new flash.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new flash.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,get__matrixInvalid: function() {
		return (this._nmeRenderFlags & 4) != 0;
	}
	,get__matrixChainInvalid: function() {
		return (this._nmeRenderFlags & 8) != 0;
	}
	,set_mask: function(inValue) {
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = null;
		this.nmeMask = inValue;
		if(this.nmeMask != null) this.nmeMask.nmeMaskingObj = this;
		return this.nmeMask;
	}
	,get_mask: function() {
		return this.nmeMask;
	}
	,set_height: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var h = this.nmeBoundsRect.height;
		if(this.nmeScaleY * h != inValue) {
			if(h == 0) {
				this.nmeScaleY = 1;
				this.nmeInvalidateMatrix(true);
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				h = this.nmeBoundsRect.height;
			}
			if(h <= 0) return 0;
			this.nmeScaleY = inValue / h;
			this.nmeInvalidateMatrix(true);
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		}
		return inValue;
	}
	,get_height: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeHeight;
	}
	,set_filters: function(filters) {
		var oldFilterCount = this.nmeFilters == null?0:this.nmeFilters.length;
		if(filters == null) {
			this.nmeFilters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.nmeFilters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.nmeFilters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,get__boundsInvalid: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return (this._nmeRenderFlags & 64) != 0; else return (this._nmeRenderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,get_filters: function() {
		if(this.nmeFilters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.nmeFilters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__bottommostSurface: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) return gfx.nmeSurface;
		return null;
	}
	,__contains: function(child) {
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			var gfx = this.nmeGetGraphics();
			if(gfx == null) {
				this.nmeBoundsRect.x = this.get_x();
				this.nmeBoundsRect.y = this.get_y();
				this.nmeBoundsRect.width = 0;
				this.nmeBoundsRect.height = 0;
			} else {
				this.nmeBoundsRect = gfx.nmeExtent.clone();
				if(this.scale9Grid != null) {
					this.nmeBoundsRect.width *= this.nmeScaleX;
					this.nmeBoundsRect.height *= this.nmeScaleY;
					this.nmeWidth = this.nmeBoundsRect.width;
					this.nmeHeight = this.nmeBoundsRect.height;
				} else {
					this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
					this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
				}
				gfx.boundsDirty = false;
			}
			this._nmeRenderFlags &= -65;
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && gfx.nmeSurface != null) flash.Lib.nmeSetSurfaceVisible(gfx.nmeSurface,inValue);
	}
	,nmeValidateMatrix: function() {
		var parentMatrixInvalid = (this._nmeRenderFlags & 8) != 0 && this.parent != null;
		if((this._nmeRenderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.nmeValidateMatrix();
			var m = this.transform.get_matrix();
			if((this._nmeRenderFlags & 16) != 0) this._nmeRenderFlags &= -5;
			if((this._nmeRenderFlags & 4) != 0) {
				m.identity();
				m.scale(this.nmeScaleX,this.nmeScaleY);
				var rad = this.nmeRotation * flash.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.nmeX,this.nmeY);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.nmeGetFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.nmeGetFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.nmeSetFullMatrix(fm);
				this._nmeRenderFlags |= 32;
			}
			this._nmeRenderFlags &= -29;
		}
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && lastMoveObj != null && this != lastMoveObj) {
			var ogfx = lastMoveObj.nmeGetGraphics();
			if(ogfx != null) flash.Lib.nmeSetSurfaceZIndexAfter(this.nmeScrollRect == null?gfx.nmeSurface:this._srWindow,lastMoveObj.nmeScrollRect == null?ogfx.nmeSurface:lastMoveObj == this.parent?ogfx.nmeSurface:lastMoveObj._srWindow);
		}
		if(gfx == null) return lastMoveObj; else return this;
	}
	,nmeTestFlag: function(mask) {
		return (this._nmeRenderFlags & mask) != 0;
	}
	,nmeSetMatrix: function(inValue) {
		this.transform._matrix.copy(inValue);
		return inValue;
	}
	,nmeSetFullMatrix: function(inValue) {
		return this.transform.nmeSetFullMatrix(inValue);
	}
	,nmeSetFlagToValue: function(mask,value) {
		if(value) this._nmeRenderFlags |= mask; else this._nmeRenderFlags &= ~mask;
	}
	,nmeSetFlag: function(mask) {
		this._nmeRenderFlags |= mask;
	}
	,nmeSetDimensions: function() {
		if(this.scale9Grid != null) {
			this.nmeBoundsRect.width *= this.nmeScaleX;
			this.nmeBoundsRect.height *= this.nmeScaleY;
			this.nmeWidth = this.nmeBoundsRect.width;
			this.nmeHeight = this.nmeBoundsRect.height;
		} else {
			this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
			this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(gfx.nmeRender(inMask,this.nmeFilters,1,1)) {
			this._nmeRenderFlags |= 64;
			if(this.parent != null) this.parent._nmeRenderFlags |= 64;
			this.nmeApplyFilters(gfx.nmeSurface);
			this._nmeRenderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			flash.Lib.nmeDrawToSurface(gfx.nmeSurface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,m);
				this._nmeRenderFlags &= -33;
				this.nmeSrUpdateDivs();
			}
			flash.Lib.nmeSetSurfaceOpacity(gfx.nmeSurface,fullAlpha);
		}
	}
	,nmeRemoveFromStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) {
			flash.Lib.nmeRemoveSurface(gfx.nmeSurface);
			var evt = new flash.events.Event(flash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,nmeMatrixOverridden: function() {
		this.nmeX = this.transform.get_matrix().tx;
		this.nmeY = this.transform.get_matrix().ty;
		this._nmeRenderFlags |= 16;
		this._nmeRenderFlags |= 4;
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeIsOnStage: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null && flash.Lib.nmeIsOnStage(gfx.nmeSurface)) return true;
		return false;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this._nmeRenderFlags |= 4; else this._nmeRenderFlags |= 8;
	}
	,nmeInvalidateBounds: function() {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
	}
	,nmeGetSurface: function() {
		var gfx = this.nmeGetGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.nmeSurface;
		return surface;
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeRender();
			var extX = gfx.nmeExtent.x;
			var extY = gfx.nmeExtent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX <= 0 || local.y - extY <= 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			if(gfx.nmeHitTest(local.x,local.y)) return this;
		}
		return null;
	}
	,nmeGetMatrix: function() {
		return this.transform.get_matrix();
	}
	,nmeGetInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(outStack);
	}
	,nmeGetGraphics: function() {
		return null;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		return this.transform.nmeGetFullMatrix(localMatrix);
	}
	,nmeFireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.nmeGetInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.nmeSetPhase(flash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
		event.nmeSetPhase(flash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return;
		if(event.bubbles) {
			event.nmeSetPhase(flash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.nmeDispatchEvent(event);
				if(event.nmeGetIsCancelled()) return;
			}
		}
	}
	,nmeDispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return flash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,nmeClearFlag: function(mask) {
		this._nmeRenderFlags &= ~mask;
	}
	,nmeBroadcast: function(event) {
		this.nmeDispatchEvent(event);
	}
	,nmeApplyFilters: function(surface) {
		if(this.nmeFilters != null) {
			var _g = 0, _g1 = this.nmeFilters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.nmeApplyFilter(surface);
			}
		}
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		var gfx = this.nmeGetGraphics();
		if(gfx == null) return;
		if(newParent.nmeGetGraphics() != null) {
			flash.Lib.nmeSetSurfaceId(gfx.nmeSurface,this._nmeId);
			if(beforeSibling != null && beforeSibling.nmeGetGraphics() != null) flash.Lib.nmeAppendSurface(gfx.nmeSurface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.nmeChildren;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,flash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , flash.display.DisplayObjectContainer);
						if(container.nmeChildren.length > 0) nextSibling = container.nmeChildren[container.nmeChildren.length - 1]; else break;
					}
					if(nextSibling.nmeGetGraphics() != gfx) flash.Lib.nmeAppendSurface(gfx.nmeSurface,null,nextSibling.get__topmostSurface()); else flash.Lib.nmeAppendSurface(gfx.nmeSurface);
				}
			}
			flash.Lib.nmeSetSurfaceTransform(gfx.nmeSurface,this.getSurfaceTransform(gfx));
		} else if(newParent.name == "Stage") flash.Lib.nmeAppendSurface(gfx.nmeSurface);
		if(this.nmeIsOnStage()) {
			this.nmeSrUpdateDivs();
			var evt = new flash.events.Event(flash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,localToGlobal: function(point) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).transformPoint(point);
	}
	,invalidateGraphics: function() {
		var gfx = this.nmeGetGraphics();
		if(gfx != null) {
			gfx.nmeChanged = true;
			gfx.nmeClearNextCycle = true;
		}
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		var boundingBox = shapeFlag == null?true:!shapeFlag;
		if(!boundingBox) return this.nmeGetObjectUnderPoint(new flash.geom.Point(x,y)) != null; else {
			var gfx = this.nmeGetGraphics();
			if(gfx != null) {
				var extX = gfx.nmeExtent.x;
				var extY = gfx.nmeExtent.y;
				var local = this.globalToLocal(new flash.geom.Point(x,y));
				if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return false; else return true;
			}
			return false;
		}
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,handleGraphicsUpdated: function(gfx) {
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.nmeApplyFilters(gfx.nmeSurface);
		this._nmeRenderFlags |= 32;
	}
	,globalToLocal: function(inPos) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		return this.transform.nmeGetFullMatrix(null).invert().transformPoint(inPos);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,getScreenBounds: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.nmeBoundsRect.clone();
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.get__boundsInvalid()) this.validateBounds();
		var m = this.transform.nmeGetFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.nmeGetFullMatrix(null).invert());
		var rect = this.nmeBoundsRect.transform(m);
		return rect;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.nmeRender(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,dispatchEvent: function(event) {
		var result = this.nmeDispatchEvent(event);
		if(event.nmeGetIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,_srAxes: null
	,_srWindow: null
	,_topmostSurface: null
	,_nmeRenderFlags: null
	,_nmeId: null
	,_fullScaleY: null
	,_fullScaleX: null
	,_bottommostSurface: null
	,nmeY: null
	,nmeX: null
	,nmeWidth: null
	,nmeVisible: null
	,nmeScrollRect: null
	,nmeScaleY: null
	,nmeScaleX: null
	,nmeRotation: null
	,nmeMaskingObj: null
	,nmeMask: null
	,nmeHeight: null
	,nmeFilters: null
	,nmeBoundsRect: null
	,transform: null
	,scale9Grid: null
	,parent: null
	,nmeCombinedVisible: null
	,name: null
	,loaderInfo: null
	,cacheAsBitmap: null
	,blendMode: null
	,alpha: null
	,accessibilityProperties: null
	,__class__: flash.display.DisplayObject
	,__properties__: {set_filters:"set_filters",get_filters:"get_filters",set_height:"set_height",get_height:"get_height",set_mask:"set_mask",get_mask:"get_mask",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",set_nmeCombinedVisible:"set_nmeCombinedVisible",set_parent:"set_parent",set_rotation:"set_rotation",get_rotation:"get_rotation",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",get_stage:"get_stage",set_transform:"set_transform",set_visible:"set_visible",get_visible:"get_visible",set_width:"set_width",get_width:"get_width",set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",get__bottommostSurface:"get__bottommostSurface",get__boundsInvalid:"get__boundsInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__matrixInvalid:"get__matrixInvalid",get__topmostSurface:"get__topmostSurface"}
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_tabIndex: function(inIndex) {
		return this.nmeTabIndex = inIndex;
	}
	,get_tabIndex: function() {
		return this.nmeTabIndex;
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeTabIndex: null
	,nmeDoubleClickEnabled: null
	,tabEnabled: null
	,mouseEnabled: null
	,focusRect: null
	,doubleClickEnabled: null
	,__class__: flash.display.InteractiveObject
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
flash.display.DisplayObjectContainer = function() {
	this.nmeChildren = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	flash.display.InteractiveObject.call(this);
	this.nmeCombinedAlpha = this.alpha;
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_scrollRect: function(inValue) {
		inValue = flash.display.InteractiveObject.prototype.set_scrollRect.call(this,inValue);
		this.nmeUnifyChildrenWithDOM();
		return inValue;
	}
	,set_visible: function(inVal) {
		this.set_nmeCombinedVisible(this.parent != null?this.parent.nmeCombinedVisible && inVal:inVal);
		return flash.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,get_numChildren: function() {
		return this.nmeChildren.length;
	}
	,set_nmeCombinedVisible: function(inVal) {
		if(inVal != this.nmeCombinedVisible) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set_nmeCombinedVisible(child.get_visible() && inVal);
			}
		}
		return flash.display.InteractiveObject.prototype.set_nmeCombinedVisible.call(this,inVal);
	}
	,set_filters: function(filters) {
		flash.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,__contains: function(child) {
		if(child == null) return false;
		if(this == child) return true;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child || c.__contains(child)) return true;
		}
		return false;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this._nmeId + "]";
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.nmeChildren[child1];
		this.nmeChildren[child1] = this.nmeChildren[child2];
		this.nmeChildren[child2] = swap;
		swap = null;
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == child1) c1 = i; else if(this.nmeChildren[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.nmeChildren[c1];
			this.nmeChildren[c1] = this.nmeChildren[c2];
			this.nmeChildren[c2] = swap;
			swap = null;
			this.nmeSwapSurface(c1,c2);
			child1.nmeUnifyChildrenWithDOM();
			child2.nmeUnifyChildrenWithDOM();
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.nmeChildren.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.nmeChildren.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.nmeChildren[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in nmeChildren array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.nmeChildren[i],this.nmeChildren[i + 1]);
				i++;
			}
		}
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeRemoveChild(this.nmeChildren[index]);
		throw "removeChildAt(" + index + ") : none found?";
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				child.nmeRemoveFromStage();
				child.set_parent(null);
				if($this.getChildIndex(child) >= 0) throw "Not removed properly";
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,nmeUnifyChildrenWithDOM: function(lastMoveObj) {
		var obj = flash.display.InteractiveObject.prototype.nmeUnifyChildrenWithDOM.call(this,lastMoveObj);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			obj = child.nmeUnifyChildrenWithDOM(obj);
			if(child.get_scrollRect() != null) obj = child;
		}
		return obj;
	}
	,nmeSwapSurface: function(c1,c2) {
		if(this.nmeChildren[c1] == null) throw "Null element at index " + c1 + " length " + this.nmeChildren.length;
		if(this.nmeChildren[c2] == null) throw "Null element at index " + c2 + " length " + this.nmeChildren.length;
		var gfx1 = this.nmeChildren[c1].nmeGetGraphics();
		var gfx2 = this.nmeChildren[c2].nmeGetGraphics();
		if(gfx1 != null && gfx2 != null) {
			var surface1 = this.nmeChildren[c1].nmeScrollRect == null?gfx1.nmeSurface:this.nmeChildren[c1].nmeGetSrWindow();
			var surface2 = this.nmeChildren[c2].nmeScrollRect == null?gfx2.nmeSurface:this.nmeChildren[c2].nmeGetSrWindow();
			if(surface1 != null && surface2 != null) flash.Lib.nmeSwapSurface(surface1,surface2);
		}
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeVisible) return;
		if(clipRect == null && this.nmeScrollRect != null) clipRect = this.nmeScrollRect;
		flash.display.InteractiveObject.prototype.nmeRender.call(this,inMask,clipRect);
		this.nmeCombinedAlpha = this.parent != null?this.parent.nmeCombinedAlpha * this.alpha:this.alpha;
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeVisible) {
				if(clipRect != null) {
					if((child._nmeRenderFlags & 4) != 0 || (child._nmeRenderFlags & 8) != 0) child.nmeValidateMatrix();
				}
				child.nmeRender(inMask,clipRect);
			}
		}
		if(this.nmeAddedChildren) {
			this.nmeUnifyChildrenWithDOM();
			this.nmeAddedChildren = false;
		}
	}
	,nmeRemoveFromStage: function() {
		flash.display.InteractiveObject.prototype.nmeRemoveFromStage.call(this);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeRemoveFromStage();
		}
	}
	,nmeRemoveChild: function(child) {
		child.nmeRemoveFromStage();
		child.set_parent(null);
		if(this.getChildIndex(child) >= 0) throw "Not removed properly";
		return child;
	}
	,nmeInvalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this._nmeRenderFlags & 8) != 0) && !((this._nmeRenderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.nmeChildren;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.nmeInvalidateMatrix();
			}
		}
		flash.display.InteractiveObject.prototype.nmeInvalidateMatrix.call(this,local);
	}
	,nmeGetObjectsUnderPoint: function(point,stack) {
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) stack.push(result);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.nmeChildren.length - 1;
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.nmeChildren[l - i].nmeGetObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return flash.display.InteractiveObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeBroadcast: function(event) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.nmeBroadcast(event);
		}
		this.dispatchEvent(event);
	}
	,nmeAddToStage: function(newParent,beforeSibling) {
		flash.display.InteractiveObject.prototype.nmeAddToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nmeGetGraphics() == null || !child.nmeIsOnStage()) child.nmeAddToStage(this);
		}
	}
	,getObjectsUnderPoint: function(point) {
		var result = new Array();
		this.nmeGetObjectsUnderPoint(point,result);
		return result;
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.nmeChildren.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeChildren[i] == inChild) return i;
		}
		return -1;
	}
	,getChildByName: function(inName) {
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == inName) return child;
		}
		return null;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.nmeChildren.length) return this.nmeChildren[index];
		throw "getChildAt : index out of bounds " + index + "/" + this.nmeChildren.length;
		return null;
	}
	,contains: function(child) {
		return this.__contains(child);
	}
	,addChildAt: function(object,index) {
		if(index > this.nmeChildren.length || index < 0) throw "Invalid index position " + index;
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.nmeChildren.length) return this.addChild(object); else {
			if(this.nmeIsOnStage()) object.nmeAddToStage(this,this.nmeChildren[index]);
			this.nmeChildren.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		this.nmeAddedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,this.nmeChildren.length - 1);
			return object;
		}
		var _g = 0, _g1 = this.nmeChildren;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == object) throw "Internal error: child already existed at index " + this.getChildIndex(object);
		}
		object.set_parent(this);
		if(this.nmeIsOnStage()) object.nmeAddToStage(this);
		if(this.nmeChildren == null) this.nmeChildren = new Array();
		this.nmeChildren.push(object);
		return object;
	}
	,__removeChild: function(child) {
		HxOverrides.remove(this.nmeChildren,child);
	}
	,nmeAddedChildren: null
	,tabChildren: null
	,nmeCombinedAlpha: null
	,nmeChildren: null
	,mouseChildren: null
	,__class__: flash.display.DisplayObjectContainer
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeGraphics = new flash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.nmeCursorCallbackOver != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
		if(this.nmeCursorCallbackOut != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		if(!cursor) flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default); else {
			this.nmeCursorCallbackOver = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Pointer);
			};
			this.nmeCursorCallbackOut = function(_) {
				flash.Lib.nmeSetCursor(flash._Lib.CursorType.Default);
			};
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER,this.nmeCursorCallbackOver);
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT,this.nmeCursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,get_graphics: function() {
		return this.nmeGraphics;
	}
	,get_dropTarget: function() {
		return this.nmeDropTarget;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stopDrag: function() {
		if(this.nmeIsOnStage()) {
			this.get_stage().nmeStopDrag(this);
			var l = this.parent.nmeChildren.length - 1;
			var obj = this.get_stage();
			var _g1 = 0, _g = this.parent.nmeChildren.length;
			while(_g1 < _g) {
				var i = _g1++;
				var result = this.parent.nmeChildren[l - i].nmeGetObjectUnderPoint(new flash.geom.Point(this.get_stage().get_mouseX(),this.get_stage().get_mouseY()));
				if(result != null) obj = result;
			}
			if(obj != this) this.nmeDropTarget = obj; else this.nmeDropTarget = this.get_stage();
		}
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.nmeIsOnStage()) this.get_stage().nmeStartDrag(this,lockCenter,bounds);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,nmeGraphics: null
	,nmeDropTarget: null
	,nmeCursorCallbackOver: null
	,nmeCursorCallbackOut: null
	,useHandCursor: null
	,buttonMode: null
	,__class__: flash.display.Sprite
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{get_dropTarget:"get_dropTarget",get_graphics:"get_graphics",set_useHandCursor:"set_useHandCursor"})
});
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		var width = 560;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,getHeight: function() {
		var height = 560;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getBackgroundColor: function() {
		return 16777215;
	}
	,progress: null
	,outline: null
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : true, __constructs__ : [] }
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
		haxe.Log.trace("run",{ fileName : "Timer.hx", lineNumber : 98, className : "haxe.Timer", methodName : "run"});
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,id: null
	,__class__: haxe.Timer
}
flash.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__properties__ = {get_current:"get_current"}
flash.Lib.current = null;
flash.Lib.mCurrent = null;
flash.Lib.mForce2DTransform = null;
flash.Lib.mMainClassRoot = null;
flash.Lib.mMe = null;
flash.Lib.mStage = null;
flash.Lib["as"] = function(v,c) {
	return js.Boot.__instanceof(v,c)?v:null;
}
flash.Lib.attach = function(name) {
	return new flash.display.MovieClip();
}
flash.Lib.getTimer = function() {
	return (haxe.Timer.stamp() - flash.Lib.starttime) * 1000 | 0;
}
flash.Lib.getURL = function(request,target) {
	window.open(request.url);
}
flash.Lib.nmeAppendSurface = function(surface,before,after) {
	if(flash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) before.parentNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) after.parentNode.insertBefore(surface,after.nextSibling); else flash.Lib.mMe.__scr.appendChild(surface);
	}
}
flash.Lib.nmeAppendText = function(surface,container,text,wrap,isHtml) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		surface.removeChild(surface.childNodes[i]);
	}
	if(isHtml) container.innerHTML = text; else container.appendChild(js.Browser.document.createTextNode(text));
	container.style.setProperty("position","relative","");
	container.style.setProperty("cursor","default","");
	if(!wrap) container.style.setProperty("white-space","nowrap","");
	surface.appendChild(container);
}
flash.Lib.nmeBootstrap = function() {
	if(flash.Lib.mMe == null) {
		var target = js.Browser.document.getElementById("haxe:jeash");
		if(target == null) target = js.Browser.document.createElement("div");
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat(HxOverrides.substr(agent,agent.indexOf("Android") + 8,3));
			if(version <= 2.3) flash.Lib.mForce2DTransform = true;
		}
		flash.Lib.Run(target,flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
	}
}
flash.Lib.nmeCopyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
flash.Lib.nmeCreateSurfaceAnimationCSS = function(surface,data,template,templateFunc,fps,discrete,infinite) {
	if(infinite == null) infinite = false;
	if(discrete == null) discrete = false;
	if(fps == null) fps = 25;
	if(surface.id == null || surface.id == "") {
		flash.Lib.trace("Failed to create a CSS Style tag for a surface without an id attribute");
		return null;
	}
	var style = null;
	if(surface.getAttribute("data-nme-anim") != null) style = js.Browser.document.getElementById(surface.getAttribute("data-nme-anim")); else {
		style = flash.Lib.mMe.__scr.appendChild(js.Browser.document.createElement("style"));
		style.sheet.id = "__nme_anim_" + surface.id + "__";
		surface.setAttribute("data-nme-anim",style.sheet.id);
	}
	var keyframeStylesheetRule = "";
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var perc = i / (data.length - 1) * 100;
		var frame = data[i];
		keyframeStylesheetRule += perc + "% { " + template.execute(templateFunc(frame)) + " } ";
	}
	var animationDiscreteRule = discrete?"steps(::steps::, end)":"";
	var animationInfiniteRule = infinite?"infinite":"";
	var animationTpl = "";
	var _g = 0, _g1 = ["animation","-moz-animation","-webkit-animation","-o-animation","-ms-animation"];
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		animationTpl += prefix + ": ::id:: ::duration::s " + animationDiscreteRule + " " + animationInfiniteRule + "; ";
	}
	var animationStylesheetRule = new haxe.Template(animationTpl).execute({ id : surface.id, duration : data.length / fps, steps : 1});
	var rules = style.sheet.rules != null?style.sheet.rules:style.sheet.cssRules;
	var _g = 0, _g1 = ["","-moz-","-webkit-","-o-","-ms-"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		try {
			style.sheet.insertRule("@" + variant + "keyframes " + surface.id + " {" + keyframeStylesheetRule + "}",rules.length);
		} catch( e ) {
		}
	}
	style.sheet.insertRule("#" + surface.id + " { " + animationStylesheetRule + " } ",rules.length);
	return style;
}
flash.Lib.nmeDesignMode = function(mode) {
	js.Browser.document.designMode = mode?"on":"off";
}
flash.Lib.nmeDisableFullScreen = function() {
}
flash.Lib.nmeDisableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		flash.Lib.trace("Disable right click not supported in this browser.");
	}
}
flash.Lib.nmeDrawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
flash.Lib.nmeDrawSurfaceRect = function(surface,tgt,x,y,rect) {
	var tgtCtx = tgt.getContext("2d");
	tgt.width = rect.width;
	tgt.height = rect.height;
	tgtCtx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);
	tgt.style.left = x + "px";
	tgt.style.top = y + "px";
}
flash.Lib.nmeDrawToSurface = function(surface,tgt,matrix,alpha,clipRect,smoothing) {
	if(smoothing == null) smoothing = true;
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	tgtCtx.globalAlpha = alpha;
	flash.Lib.nmeSetImageSmoothing(tgtCtx,smoothing);
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else flash.Lib.nmeDrawClippedImage(surface,tgtCtx,clipRect);
	}
}
flash.Lib.nmeEnableFullScreen = function() {
	if(flash.Lib.mMe != null) {
		var origWidth = flash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = flash.Lib.mMe.__scr.style.getPropertyValue("height");
		flash.Lib.mMe.__scr.style.setProperty("width","100%","");
		flash.Lib.mMe.__scr.style.setProperty("height","100%","");
		flash.Lib.nmeDisableFullScreen = function() {
			flash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			flash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
flash.Lib.nmeEnableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		flash.Lib.trace("Enable right click not supported in this browser.");
	}
}
flash.Lib.nmeFullScreenHeight = function() {
	return js.Browser.window.innerHeight;
}
flash.Lib.nmeFullScreenWidth = function() {
	return js.Browser.window.innerWidth;
}
flash.Lib.nmeGetHeight = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientHeight > 0?tgt.clientHeight:500;
}
flash.Lib.nmeGetStage = function() {
	if(flash.Lib.mStage == null) {
		var width = flash.Lib.nmeGetWidth();
		var height = flash.Lib.nmeGetHeight();
		flash.Lib.mStage = new flash.display.Stage(width,height);
	}
	return flash.Lib.mStage;
}
flash.Lib.nmeGetWidth = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:jeash");
	return tgt != null && tgt.clientWidth > 0?tgt.clientWidth:500;
}
flash.Lib.nmeIsOnStage = function(surface) {
	var p = surface;
	while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
	return p == flash.Lib.mMe.__scr;
}
flash.Lib.nmeParseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
flash.Lib.nmeRemoveSurface = function(surface) {
	if(flash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-nme-anim");
		if(anim != null) {
			var style = js.Browser.document.getElementById(anim);
			if(style != null) flash.Lib.mMe.__scr.removeChild(style);
		}
		if(surface.parentNode != null) surface.parentNode.removeChild(surface);
	}
	return surface;
}
flash.Lib.nmeSetSurfaceBorder = function(surface,color,size) {
	surface.style.setProperty("border-color","#" + StringTools.hex(color),"");
	surface.style.setProperty("border-style","solid","");
	surface.style.setProperty("border-width",size + "px","");
	surface.style.setProperty("border-collapse","collapse","");
}
flash.Lib.nmeSetSurfaceClipping = function(surface,rect) {
}
flash.Lib.nmeSetSurfaceFont = function(surface,font,bold,size,color,align,lineHeight) {
	surface.style.setProperty("font-family",font,"");
	surface.style.setProperty("font-weight",Std.string(bold),"");
	surface.style.setProperty("color","#" + StringTools.hex(color),"");
	surface.style.setProperty("font-size",size + "px","");
	surface.style.setProperty("text-align",align,"");
	surface.style.setProperty("line-height",lineHeight + "px","");
}
flash.Lib.nmeSetSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
flash.Lib.nmeSetSurfacePadding = function(surface,padding,margin,display) {
	surface.style.setProperty("padding",padding + "px","");
	surface.style.setProperty("margin",margin + "px","");
	surface.style.setProperty("top",padding + 2 + "px","");
	surface.style.setProperty("right",padding + 1 + "px","");
	surface.style.setProperty("left",padding + 1 + "px","");
	surface.style.setProperty("bottom",padding + 1 + "px","");
	surface.style.setProperty("display",display?"inline":"block","");
}
flash.Lib.nmeSetSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-nme-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
		surface.style.setProperty("transform","","");
		surface.style.setProperty("-moz-transform","","");
		surface.style.setProperty("-webkit-transform","","");
		surface.style.setProperty("-o-transform","","");
		surface.style.setProperty("-ms-transform","","");
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!flash.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
flash.Lib.nmeSetSurfaceZIndexAfter = function(surface1,surface2) {
	if(surface1 != null && surface2 != null) {
		if(surface1.parentNode != surface2.parentNode && surface2.parentNode != null) surface2.parentNode.appendChild(surface1);
		if(surface2.parentNode != null) {
			var nextSibling = surface2.nextSibling;
			if(surface1.previousSibling != surface2) {
				var swap = flash.Lib.nmeRemoveSurface(surface1);
				if(nextSibling == null) surface2.parentNode.appendChild(swap); else surface2.parentNode.insertBefore(swap,nextSibling);
			}
		}
	}
}
flash.Lib.nmeSwapSurface = function(surface1,surface2) {
	var parent1 = surface1.parentNode;
	var parent2 = surface2.parentNode;
	if(parent1 != null && parent2 != null) {
		if(parent1 == parent2) {
			var next1 = surface1.nextSibling;
			var next2 = surface2.nextSibling;
			if(next1 == surface2) parent1.insertBefore(surface2,surface1); else if(next2 == surface1) parent1.insertBefore(surface1,surface2); else {
				parent1.replaceChild(surface2,surface1);
				if(next2 != null) parent1.insertBefore(surface1,next2); else parent1.appendChild(surface1);
			}
		} else {
			var next2 = surface2.nextSibling;
			parent1.replaceChild(surface2,surface1);
			if(next2 != null) parent2.insertBefore(surface1,next2); else parent2.appendChild(surface1);
		}
	}
}
flash.Lib.nmeSetContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
flash.Lib.nmeSetCursor = function(type) {
	if(flash.Lib.mMe != null) flash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
flash.Lib.nmeSetImageSmoothing = function(context,enabled) {
	var _g = 0, _g1 = ["imageSmoothingEnabled","mozImageSmoothingEnabled","webkitImageSmoothingEnabled"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		context[variant] = enabled;
	}
}
flash.Lib.nmeSetSurfaceAlign = function(surface,align) {
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSetSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
flash.Lib.nmeSetSurfaceRotation = function(surface,rotate) {
	surface.style.setProperty("transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-moz-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-webkit-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-o-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-ms-transform","rotate(" + rotate + "deg)","");
}
flash.Lib.nmeSetSurfaceScale = function(surface,scale) {
	surface.style.setProperty("transform","scale(" + scale + ")","");
	surface.style.setProperty("-moz-transform","scale(" + scale + ")","");
	surface.style.setProperty("-webkit-transform","scale(" + scale + ")","");
	surface.style.setProperty("-o-transform","scale(" + scale + ")","");
	surface.style.setProperty("-ms-transform","scale(" + scale + ")","");
}
flash.Lib.nmeSetSurfaceSpritesheetAnimation = function(surface,spec,fps) {
	if(spec.length == 0) return surface;
	var div = js.Browser.document.createElement("div");
	div.style.backgroundImage = "url(" + surface.toDataURL("image/png") + ")";
	div.id = surface.id;
	var keyframeTpl = new haxe.Template("background-position: ::left::px ::top::px; width: ::width::px; height: ::height::px; ");
	var templateFunc = function(frame) {
		return { left : -frame.x, top : -frame.y, width : frame.width, height : frame.height};
	};
	flash.Lib.nmeCreateSurfaceAnimationCSS(div,spec,keyframeTpl,templateFunc,fps,true,true);
	if(flash.Lib.nmeIsOnStage(surface)) {
		flash.Lib.nmeAppendSurface(div);
		flash.Lib.nmeCopyStyle(surface,div);
		flash.Lib.nmeSwapSurface(surface,div);
		flash.Lib.nmeRemoveSurface(surface);
	} else flash.Lib.nmeCopyStyle(surface,div);
	return div;
}
flash.Lib.nmeSetSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
flash.Lib.nmeSetTextDimensions = function(surface,width,height,align) {
	surface.style.setProperty("width",width + "px","");
	surface.style.setProperty("height",height + "px","");
	surface.style.setProperty("overflow","hidden","");
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.nmeSurfaceHitTest = function(surface,x,y) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = surface.childNodes[i];
		if(x >= node.offsetLeft && x <= node.offsetLeft + node.offsetWidth && y >= node.offsetTop && y <= node.offsetTop + node.offsetHeight) return true;
	}
	return false;
}
flash.Lib.preventDefaultTouchMove = function() {
	js.Browser.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
}
flash.Lib.Run = function(tgt,width,height) {
	flash.Lib.mMe = new flash.Lib(tgt,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") flash.Lib.nmeGetStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	}
	if(Reflect.hasField(js.Browser.window,"on" + "devicemotion")) js.Browser.window.addEventListener("devicemotion",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	if(Reflect.hasField(js.Browser.window,"on" + "orientationchange")) js.Browser.window.addEventListener("orientationchange",($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),true);
	var _g = 0, _g1 = flash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		js.Browser.window.addEventListener(type,($_=flash.Lib.nmeGetStage(),$bind($_,$_.nmeQueueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") flash.Lib.nmeGetStage().set_backgroundColor(flash.Lib.nmeParseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return pos == 0?res | cur << 16:pos == 1?res | cur << 8:pos == 2?res | cur:(function($this) {
			var $r;
			throw "pos should be 0-2";
			return $r;
		}(this));
	})); else flash.Lib.nmeGetStage().set_backgroundColor(16777215);
	flash.Lib.get_current().get_graphics().beginFill(flash.Lib.nmeGetStage().get_backgroundColor());
	flash.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	flash.Lib.nmeSetSurfaceId(flash.Lib.get_current().get_graphics().nmeSurface,"Root MovieClip");
	flash.Lib.nmeGetStage().nmeUpdateNextWake();
	return flash.Lib.mMe;
}
flash.Lib.setUserScalable = function(isScalable) {
	if(isScalable == null) isScalable = true;
	var meta = js.Browser.document.createElement("meta");
	meta.name = "viewport";
	meta.content = "user-scalable=" + (isScalable?"yes":"no");
}
flash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
flash.Lib.addCallback = function(functionName,closure) {
	flash.Lib.mMe.__scr[functionName] = closure;
}
flash.Lib.get_current = function() {
	if(flash.Lib.mMainClassRoot == null) {
		flash.Lib.mMainClassRoot = new flash.display.MovieClip();
		flash.Lib.mCurrent = flash.Lib.mMainClassRoot;
		flash.Lib.nmeGetStage().addChild(flash.Lib.mCurrent);
	}
	return flash.Lib.mMainClassRoot;
}
flash.Lib.prototype = {
	__scr: null
	,mKilled: null
	,mArgs: null
	,__class__: flash.Lib
}
flash._Lib = {}
flash._Lib.CursorType = $hxClasses["flash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
flash._Lib.CursorType.Pointer = ["Pointer",0];
flash._Lib.CursorType.Pointer.toString = $estr;
flash._Lib.CursorType.Pointer.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Text = ["Text",1];
flash._Lib.CursorType.Text.toString = $estr;
flash._Lib.CursorType.Text.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Default = ["Default",2];
flash._Lib.CursorType.Default.toString = $estr;
flash._Lib.CursorType.Default.__enum__ = flash._Lib.CursorType;
flash._Vector = {}
flash._Vector.Vector_Impl_ = function() { }
$hxClasses["flash._Vector.Vector_Impl_"] = flash._Vector.Vector_Impl_;
flash._Vector.Vector_Impl_.__name__ = ["flash","_Vector","Vector_Impl_"];
flash._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
flash._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
}
flash._Vector.Vector_Impl_.concat = function(this1,a) {
	return this1.concat(a);
}
flash._Vector.Vector_Impl_.copy = function(this1) {
	return this1.slice();
}
flash._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
}
flash._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
}
flash._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
}
flash._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
}
flash._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
}
flash._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
}
flash._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
}
flash._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
}
flash._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
}
flash._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
}
flash._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
}
flash._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from, _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
}
flash._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
}
flash._Vector.Vector_Impl_.ofArray = function(a) {
	return flash._Vector.Vector_Impl_.concat(flash._Vector.Vector_Impl_._new(),a);
}
flash._Vector.Vector_Impl_.convert = function(v) {
	return v;
}
flash._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
}
flash._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
}
flash._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
}
flash._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(value < this1.length) this1 = this1.slice(0,value);
	while(value > this1.length) this1.push(null);
	return value;
}
flash._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
}
flash._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
}
flash.accessibility = {}
flash.accessibility.AccessibilityProperties = function() {
	this.description = "";
	this.forceSimple = false;
	this.name = "";
	this.noAutoLabeling = false;
	this.shortcut = "";
	this.silent = false;
};
$hxClasses["flash.accessibility.AccessibilityProperties"] = flash.accessibility.AccessibilityProperties;
flash.accessibility.AccessibilityProperties.__name__ = ["flash","accessibility","AccessibilityProperties"];
flash.accessibility.AccessibilityProperties.prototype = {
	silent: null
	,shortcut: null
	,noAutoLabeling: null
	,name: null
	,forceSimple: null
	,description: null
	,__class__: flash.accessibility.AccessibilityProperties
}
flash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	flash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		this.bitmapData.nmeReferenceCount++;
		if(this.bitmapData.nmeReferenceCount == 1) this.nmeGraphics = new flash.display.Graphics(this.bitmapData._nmeTextureBuffer);
	}
	if(this.pixelSnapping == null) this.pixelSnapping = flash.display.PixelSnapping.AUTO;
	if(this.nmeGraphics == null) this.nmeGraphics = new flash.display.Graphics();
	if(this.bitmapData != null) this.nmeRender();
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_bitmapData: function(inBitmapData) {
		if(inBitmapData != this.bitmapData) {
			if(this.bitmapData != null) {
				this.bitmapData.nmeReferenceCount--;
				if(this.nmeGraphics.nmeSurface == this.bitmapData._nmeTextureBuffer) flash.Lib.nmeSetSurfaceOpacity(this.bitmapData._nmeTextureBuffer,0);
			}
			if(inBitmapData != null) inBitmapData.nmeReferenceCount++;
		}
		this._nmeRenderFlags |= 64;
		if(this.parent != null) this.parent._nmeRenderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new flash.geom.Rectangle(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeRender: function(inMask,clipRect) {
		if(!this.nmeCombinedVisible) return;
		if(this.bitmapData == null) return;
		if((this._nmeRenderFlags & 4) != 0 || (this._nmeRenderFlags & 8) != 0) this.nmeValidateMatrix();
		if(this.bitmapData._nmeTextureBuffer != this.nmeGraphics.nmeSurface) {
			var imageDataLease = this.bitmapData.nmeLease;
			if(imageDataLease != null && (this.nmeCurrentLease == null || imageDataLease.seed != this.nmeCurrentLease.seed || imageDataLease.time != this.nmeCurrentLease.time)) {
				var srcCanvas = this.bitmapData._nmeTextureBuffer;
				this.nmeGraphics.nmeSurface.width = srcCanvas.width;
				this.nmeGraphics.nmeSurface.height = srcCanvas.height;
				this.nmeGraphics.clear();
				flash.Lib.nmeDrawToSurface(srcCanvas,this.nmeGraphics.nmeSurface);
				this.nmeCurrentLease = imageDataLease.clone();
				this._nmeRenderFlags |= 64;
				if(this.parent != null) this.parent._nmeRenderFlags |= 64;
				this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
				this._nmeRenderFlags |= 32;
			}
		}
		if(inMask != null) {
			this.nmeApplyFilters(this.nmeGraphics.nmeSurface);
			var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
			flash.Lib.nmeDrawToSurface(this.nmeGraphics.nmeSurface,inMask,m,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha,clipRect,this.smoothing);
		} else {
			if((this._nmeRenderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.nmeGraphics);
				flash.Lib.nmeSetSurfaceTransform(this.nmeGraphics.nmeSurface,m);
				this._nmeRenderFlags &= -33;
			}
			if(!this.nmeInit) {
				flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,0);
				this.nmeInit = true;
			} else flash.Lib.nmeSetSurfaceOpacity(this.nmeGraphics.nmeSurface,(this.parent != null?this.parent.nmeCombinedAlpha:1) * this.alpha);
		}
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() || local.y > this.get_height()) return null; else return this;
		} else return flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point);
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.nmeExtentWithFilters;
		var fm = this.transform.nmeGetFullMatrix(null);
		fm.nmeTranslateTransformed(extent.get_topLeft());
		return fm;
	}
	,nmeInit: null
	,nmeCurrentLease: null
	,nmeGraphics: null
	,smoothing: null
	,pixelSnapping: null
	,bitmapData: null
	,__class__: flash.display.Bitmap
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
flash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.nmeLocked = false;
	this.nmeReferenceCount = 0;
	this.nmeLeaseNum = 0;
	this.nmeLease = new flash.display.ImageDataLease();
	this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	this._nmeTextureBuffer = js.Browser.document.createElement("canvas");
	this._nmeTextureBuffer.width = width;
	this._nmeTextureBuffer.height = height;
	this._nmeId = flash.utils.Uuid.uuid();
	flash.Lib.nmeSetSurfaceId(this._nmeTextureBuffer,this._nmeId);
	this.nmeTransparent = transparent;
	this.rect = new flash.geom.Rectangle(0,0,width,height);
	if(this.nmeTransparent) {
		this.nmeTransparentFiller = js.Browser.document.createElement("canvas");
		this.nmeTransparentFiller.width = width;
		this.nmeTransparentFiller.height = height;
		var ctx = this.nmeTransparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.nmeTransparent) inFillColor |= -16777216;
		this.nmeInitColor = inFillColor;
		this.nmeFillRect(this.rect,inFillColor);
	}
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new flash.geom.Rectangle(0,0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0,bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0));
	var num = (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.width:0) * (bitmapData._nmeTextureBuffer != null?bitmapData._nmeTextureBuffer.height:0);
	p.position = 0;
	var _g = 0;
	while(_g < num) {
		var i = _g++;
		var pos = p.position;
		var alpha = p.readByte();
		var red = p.readByte();
		var green = p.readByte();
		var blue = p.readByte();
		p.position = pos;
		p.writeByte(red);
		p.writeByte(green);
		p.writeByte(blue);
		p.writeByte(alpha);
	}
	return p;
}
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.nmeLoadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
}
flash.display.BitmapData.nmeBase64Encode = function(bytes) {
	var blob = "";
	var codex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	bytes.position = 0;
	while(bytes.position < bytes.length) {
		var by1 = 0, by2 = 0, by3 = 0;
		by1 = bytes.readByte();
		if(bytes.position < bytes.length) by2 = bytes.readByte();
		if(bytes.position < bytes.length) by3 = bytes.readByte();
		var by4 = 0, by5 = 0, by6 = 0, by7 = 0;
		by4 = by1 >> 2;
		by5 = (by1 & 3) << 4 | by2 >> 4;
		by6 = (by2 & 15) << 2 | by3 >> 6;
		by7 = by3 & 63;
		blob += codex.charAt(by4);
		blob += codex.charAt(by5);
		if(bytes.position < bytes.length) blob += codex.charAt(by6); else blob += "=";
		if(bytes.position < bytes.length) blob += codex.charAt(by7); else blob += "=";
	}
	return blob;
}
flash.display.BitmapData.nmeCreateFromHandle = function(inHandle) {
	var result = new flash.display.BitmapData(0,0);
	result._nmeTextureBuffer = inHandle;
	return result;
}
flash.display.BitmapData.nmeIsJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
}
flash.display.BitmapData.nmeIsPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
}
flash.display.BitmapData.prototype = {
	get_width: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.width; else return 0;
	}
	,get_transparent: function() {
		return this.nmeTransparent;
	}
	,get_height: function() {
		if(this._nmeTextureBuffer != null) return this._nmeTextureBuffer.height; else return 0;
	}
	,nmeOnLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		data.bitmapData.nmeBuildLease();
		if(data.inLoader != null) {
			var e1 = new flash.events.Event(flash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,unlock: function(changeRect) {
		this.nmeLocked = false;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		if(this.nmeImageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.nmeImageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.nmeImageData,0,0);
		}
		var _g = 0, _g1 = this.nmeCopyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.nmeTransparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		haxe.Log.trace("BitmapData.threshold not implemented",{ fileName : "BitmapData.hx", lineNumber : 1430, className : "flash.display.BitmapData", methodName : "threshold"});
		return 0;
	}
	,setPixels: function(rect,byteArray) {
		rect = this.clipRect(rect);
		if(rect == null) return;
		var len = Math.round(4 * rect.width * rect.height);
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				imageData.data[i] = byteArray.readByte();
			}
			ctx.putImageData(imageData,rect.x,rect.y);
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				this.nmeImageData.data[pos] = byteArray.readByte();
				pos++;
			}
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = (color & -16777216) >>> 24; else imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = (color & -16777216) >>> 24; else this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return;
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.nmeTransparent) imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.nmeImageData.width + x * 4;
			this.nmeImageData.data[offset] = (color & 16711680) >>> 16;
			this.nmeImageData.data[offset + 1] = (color & 65280) >>> 8;
			this.nmeImageData.data[offset + 2] = color & 255;
			if(this.nmeTransparent) this.nmeImageData.data[offset + 3] = 255;
			this.nmeImageDataChanged = true;
		}
	}
	,scroll: function(x,y) {
		throw "bitmapData.scroll is currently not supported for HTML5";
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		var generator = new flash.display._BitmapData.MinstdGenerator(randomSeed);
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var imageData = null;
		if(this.nmeLocked) imageData = this.nmeImageData; else imageData = ctx.createImageData(this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
		var _g1 = 0, _g = this._nmeTextureBuffer.width * this._nmeTextureBuffer.height;
		while(_g1 < _g) {
			var i = _g1++;
			if(grayScale) imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1); else {
				imageData.data[i * 4] = (channelOptions & 1) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 1] = (channelOptions & 2) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 2] = (channelOptions & 4) == 0?0:low + generator.nextValue() % (high - low + 1);
			}
			imageData.data[i * 4 + 3] = (channelOptions & 8) == 0?255:low + generator.nextValue() % (high - low + 1);
		}
		if(this.nmeLocked) this.nmeImageDataChanged = true; else ctx.putImageData(imageData,0,0);
	}
	,nmeLoadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Browser.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this._nmeTextureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.nmeOnLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.nmeOnLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,nmeIncrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps++;
	}
	,nmeGetNumRefBitmaps: function() {
		return this.nmeAssignedBitmaps;
	}
	,nmeLoadFromBytes: function(bytes,inRawAlpha,onload) {
		var _g = this;
		var type = "";
		if(flash.display.BitmapData.nmeIsPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.nmeIsJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		var img = js.Browser.document.createElement("img");
		var canvas = this._nmeTextureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			if(inRawAlpha != null) {
				var pixels = ctx.getImageData(0,0,img.width,img.height);
				var _g1 = 0, _g2 = inRawAlpha.length;
				while(_g1 < _g2) {
					var i = _g1++;
					pixels.data[i * 4 + 3] = inRawAlpha.readUnsignedByte();
				}
				ctx.putImageData(pixels,0,0);
			}
			_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload != null) onload(_g);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + flash.display.BitmapData.nmeBase64Encode(bytes);
	}
	,nmeGetLease: function() {
		return this.nmeLease;
	}
	,nmeFillRect: function(rect,color) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = this._nmeTextureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.nmeTransparent?color >>> 24:255;
		if(!this.nmeLocked) {
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = r;
					this.nmeImageData.data[s + offsetX + 1] = g;
					this.nmeImageData.data[s + offsetX + 2] = b;
					this.nmeImageData.data[s + offsetX + 3] = a;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,nmeDecrNumRefBitmaps: function() {
		this.nmeAssignedBitmaps--;
	}
	,nmeClearCanvas: function() {
		var ctx = this._nmeTextureBuffer.getContext("2d");
		ctx.clearRect(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height);
	}
	,nmeBuildLease: function() {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
	}
	,lock: function() {
		this.nmeLocked = true;
		var ctx = this._nmeTextureBuffer.getContext("2d");
		this.nmeImageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		this.nmeImageDataChanged = false;
		this.nmeCopyPixelList = [];
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		var type = Type.getClassName(Type.getClass(secondObject));
		firstAlphaThreshold = firstAlphaThreshold & -1;
		var me = this;
		var doHitTest = function(imageData) {
			if(secondObject.__proto__ == null || secondObject.__proto__.__class__ == null || secondObject.__proto__.__class__.__name__ == null) return false;
			var _g = secondObject.__proto__.__class__.__name__[2];
			switch(_g) {
			case "Rectangle":
				var rect = secondObject;
				rect.x -= firstPoint.x;
				rect.y -= firstPoint.y;
				rect = me.clipRect(me.rect);
				if(me.rect == null) return false;
				var boundingBox = new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
				if(!rect.intersects(boundingBox)) return false;
				var diff = rect.intersection(boundingBox);
				var offset = 4 * (Math.round(diff.x) + Math.round(diff.y) * imageData.width) + 3;
				var pos = offset;
				var boundR = Math.round(4 * (diff.x + diff.width));
				while(pos < offset + Math.round(4 * (diff.width + imageData.width * diff.height))) {
					if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
					if(imageData.data[pos] - firstAlphaThreshold >= 0) return true;
					pos += 4;
				}
				return false;
			case "Point":
				var point = secondObject;
				var x = point.x - firstPoint.x;
				var y = point.y - firstPoint.y;
				if(x < 0 || y < 0 || x >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) || y >= (me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0)) return false;
				if(imageData.data[Math.round(4 * (y * (me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) + x)) + 3] - firstAlphaThreshold > 0) return true;
				return false;
			case "Bitmap":
				throw "bitmapData.hitTest with a second object of type Bitmap is currently not supported for HTML5";
				return false;
			case "BitmapData":
				throw "bitmapData.hitTest with a second object of type BitmapData is currently not supported for HTML5";
				return false;
			default:
				throw "BitmapData::hitTest secondObject argument must be either a Rectangle, a Point, a Bitmap or a BitmapData object.";
				return false;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doHitTest(imageData);
		} else return doHitTest(this.nmeImageData);
	}
	,handle: function() {
		return this._nmeTextureBuffer;
	}
	,getPixels: function(rect) {
		var len = Math.round(4 * rect.width * rect.height);
		var byteArray = new flash.utils.ByteArray();
		if(byteArray.allocated < len) byteArray._nmeResizeBuffer(byteArray.allocated = Math.max(len,byteArray.allocated * 2) | 0); else if(byteArray.allocated > len) byteArray._nmeResizeBuffer(byteArray.allocated = len);
		byteArray.length = len;
		len;
		rect = this.clipRect(rect);
		if(rect == null) return byteArray;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				byteArray.writeByte(imagedata.data[i]);
			}
		} else {
			var offset = Math.round(4 * this.nmeImageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.nmeImageData.width * 4) > boundR - 1) pos += this.nmeImageData.width * 4 - boundR;
				byteArray.writeByte(this.nmeImageData.data[pos]);
				pos++;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			return this.getInt32(0,ctx.getImageData(x,y,1,1).data);
		} else return this.getInt32(4 * y * this._nmeTextureBuffer.width + x * 4,this.nmeImageData.data);
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) || y >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) return 0;
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(x,y,1,1);
			return imagedata.data[0] << 16 | imagedata.data[1] << 8 | imagedata.data[2];
		} else {
			var offset = 4 * y * (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + x * 4;
			return this.nmeImageData.data[offset] << 16 | this.nmeImageData.data[offset + 1] << 8 | this.nmeImageData.data[offset + 2];
		}
	}
	,getInt32: function(offset,data) {
		return (this.nmeTransparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		var me = this;
		var doGetColorBoundsRect = function(data) {
			var minX = me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0, maxX = 0, minY = me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0, maxY = 0, i = 0;
			while(i < data.length) {
				var value = me.getInt32(i,data);
				if(findColor) {
					if((value & mask) == color) {
						var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
						var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
						if(x < minX) minX = x;
						if(x > maxX) maxX = x;
						if(y < minY) minY = y;
						if(y > maxY) maxY = y;
					}
				} else if((value & mask) != color) {
					var x = Math.round(i % ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4) / 4);
					var y = Math.round(i / ((me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0) * 4));
					if(x < minX) minX = x;
					if(x > maxX) maxX = x;
					if(y < minY) minY = y;
					if(y > maxY) maxY = y;
				}
				i += 4;
			}
			if(minX < maxX && minY < maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY); else return new flash.geom.Rectangle(0,0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.width:0,me._nmeTextureBuffer != null?me._nmeTextureBuffer.height:0);
		};
		if(!this.nmeLocked) {
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			return doGetColorBoundsRect(imageData.data);
		} else return doGetColorBoundsRect(this.nmeImageData.data);
	}
	,floodFill: function(x,y,color) {
		var wasLocked = this.nmeLocked;
		if(!this.nmeLocked) this.lock();
		var queue = new Array();
		queue.push(new flash.geom.Point(x,y));
		var old = this.getPixel32(x,y);
		var iterations = 0;
		var search = new Array();
		var _g1 = 0, _g = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0) + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var column = new Array();
			var _g3 = 0, _g2 = (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0) + 1;
			while(_g3 < _g2) {
				var i1 = _g3++;
				column.push(false);
			}
			search.push(column);
		}
		var currPoint, newPoint;
		while(queue.length > 0) {
			currPoint = queue.shift();
			++iterations;
			var x1 = currPoint.x | 0;
			var y1 = currPoint.y | 0;
			if(x1 < 0 || x1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) continue;
			if(y1 < 0 || y1 >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) continue;
			search[x1][y1] = true;
			if(this.getPixel32(x1,y1) == old) {
				this.setPixel32(x1,y1,color);
				if(!search[x1 + 1][y1]) queue.push(new flash.geom.Point(x1 + 1,y1));
				if(!search[x1][y1 + 1]) queue.push(new flash.geom.Point(x1,y1 + 1));
				if(x1 > 0 && !search[x1 - 1][y1]) queue.push(new flash.geom.Point(x1 - 1,y1));
				if(y1 > 0 && !search[x1][y1 - 1]) queue.push(new flash.geom.Point(x1,y1 - 1));
			}
		}
		if(!wasLocked) this.unlock();
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this._nmeTextureBuffer.width && rect.height == this._nmeTextureBuffer.height) {
			if(this.nmeTransparent) {
				if(color >>> 24 == 0 || color == this.nmeInitColor) return this.nmeClearCanvas();
			} else if((color | -16777216) == (this.nmeInitColor | -16777216)) return this.nmeClearCanvas();
		}
		return this.nmeFillRect(rect,color);
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else {
				flash.Lib.nmeSetImageSmoothing(ctx,smoothing);
				ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			}
			ctx.drawImage(this._nmeTextureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this._nmeTextureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new flash.geom.Rectangle(0,0,this._nmeTextureBuffer.width,this._nmeTextureBuffer.height),inColorTransform);
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
		source.drawToSurface(this._nmeTextureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new flash.geom.Rectangle();
			var object = source;
			rect.x = matrix != null?matrix.tx:0;
			rect.y = matrix != null?matrix.ty:0;
			try {
				rect.width = Reflect.getProperty(source,"width");
				rect.height = Reflect.getProperty(source,"height");
			} catch( e ) {
				rect.width = this._nmeTextureBuffer.width;
				rect.height = this._nmeTextureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,dispose: function() {
		this.nmeClearCanvas();
		this._nmeTextureBuffer = null;
		this.nmeLeaseNum = 0;
		this.nmeLease = null;
		this.nmeImageData = null;
	}
	,destroy: function() {
		this._nmeTextureBuffer = null;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceBitmapData._nmeTextureBuffer.width == 0 || sourceBitmapData._nmeTextureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		if(alphaBitmapData != null && alphaBitmapData.nmeTransparent) {
			if(alphaPoint == null) alphaPoint = new flash.geom.Point();
			var bitmapData = new flash.display.BitmapData(sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.width:0,sourceBitmapData._nmeTextureBuffer != null?sourceBitmapData._nmeTextureBuffer.height:0,true);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point(sourceRect.x,sourceRect.y));
			bitmapData.copyChannel(alphaBitmapData,new flash.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new flash.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = bitmapData;
		}
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			if(!mergeAlpha) {
				if(this.nmeTransparent && sourceBitmapData.nmeTransparent) {
					var trpCtx = sourceBitmapData.nmeTransparentFiller.getContext("2d");
					var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
					ctx.putImageData(trpData,destPoint.x,destPoint.y);
				}
			}
			ctx.drawImage(sourceBitmapData._nmeTextureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.nmeCopyPixelList[this.nmeCopyPixelList.length] = { handle : sourceBitmapData._nmeTextureBuffer, transparentFiller : mergeAlpha?null:sourceBitmapData.nmeTransparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		this.rect = this.clipRect(this.rect);
		if(this.rect == null) return;
		if(destChannel == 8 && !this.nmeTransparent) return;
		if(sourceBitmapData._nmeTextureBuffer == null || this._nmeTextureBuffer == null || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData._nmeTextureBuffer.width) sourceRect.width = sourceBitmapData._nmeTextureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData._nmeTextureBuffer.height) sourceRect.height = sourceBitmapData._nmeTextureBuffer.height - sourceRect.y;
		var doChannelCopy = function(imageData) {
			var srcCtx = sourceBitmapData._nmeTextureBuffer.getContext("2d");
			var srcImageData = srcCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
			var destIdx = -1;
			if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
			var pos = 4 * (Math.round(destPoint.x) + Math.round(destPoint.y) * imageData.width) + destIdx;
			var boundR = Math.round(4 * (destPoint.x + sourceRect.width));
			var setPos = function(val) {
				if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
				imageData.data[pos] = val;
				pos += 4;
			};
			var srcIdx = -1;
			if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
			while(srcIdx < srcImageData.data.length) {
				setPos(srcImageData.data[srcIdx]);
				srcIdx += 4;
			}
		};
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			doChannelCopy(imageData);
			ctx.putImageData(imageData,0,0);
		} else {
			doChannelCopy(this.nmeImageData);
			this.nmeImageDataChanged = true;
		}
	}
	,compare: function(inBitmapTexture) {
		throw "bitmapData.compare is currently not supported for HTML5";
		return 0;
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.nmeLocked) {
			this.nmeLease.set(this.nmeLeaseNum++,new Date().getTime());
			var ctx = this._nmeTextureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0, _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.nmeImageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.nmeImageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.nmeImageData.data[s + offsetX] = this.nmeImageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.nmeImageData.data[s + offsetX + 1] = this.nmeImageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.nmeImageData.data[s + offsetX + 2] = this.nmeImageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.nmeImageData.data[s + offsetX + 3] = this.nmeImageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.nmeImageDataChanged = true;
		}
	}
	,clone: function() {
		var bitmapData = new flash.display.BitmapData(this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0,this.nmeTransparent);
		var rect = new flash.geom.Rectangle(0,0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0,this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
		bitmapData.setPixels(rect,this.getPixels(rect));
		bitmapData.nmeLease.set(bitmapData.nmeLeaseNum++,new Date().getTime());
		return bitmapData;
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0)) {
			r.width -= r.x + r.width - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0)) {
			r.height -= r.y + r.height - (this._nmeTextureBuffer != null?this._nmeTextureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,clear: function(color) {
		this.fillRect(this.rect,color);
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(sourceBitmapData == this && sourceRect.x == destPoint.x && sourceRect.y == destPoint.y) filter.nmeApplyFilter(this._nmeTextureBuffer,sourceRect); else {
			var bitmapData = new flash.display.BitmapData(sourceRect.width | 0,sourceRect.height | 0);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point());
			filter.nmeApplyFilter(bitmapData._nmeTextureBuffer);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
		}
	}
	,_nmeTextureBuffer: null
	,_nmeId: null
	,nmeTransparentFiller: null
	,nmeTransparent: null
	,nmeLocked: null
	,nmeLeaseNum: null
	,nmeLease: null
	,nmeInitColor: null
	,nmeImageDataChanged: null
	,nmeCopyPixelList: null
	,nmeAssignedBitmaps: null
	,width: null
	,transparent: null
	,rect: null
	,nmeReferenceCount: null
	,nmeGLTexture: null
	,nmeImageData: null
	,height: null
	,__class__: flash.display.BitmapData
	,__properties__: {get_height:"get_height",get_transparent:"get_transparent",get_width:"get_width"}
}
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,time: null
	,seed: null
	,__class__: flash.display.ImageDataLease
}
flash.display._BitmapData = {}
flash.display._BitmapData.MinstdGenerator = function(seed) {
	if(seed == 0) this.value = 1; else this.value = seed;
};
$hxClasses["flash.display._BitmapData.MinstdGenerator"] = flash.display._BitmapData.MinstdGenerator;
flash.display._BitmapData.MinstdGenerator.__name__ = ["flash","display","_BitmapData","MinstdGenerator"];
flash.display._BitmapData.MinstdGenerator.prototype = {
	nextValue: function() {
		var lo = 16807 * (this.value & 65535);
		var hi = 16807 * (this.value >>> 16);
		lo += (hi & 32767) << 16;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		lo += hi >>> 15;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		return this.value = lo;
	}
	,value: null
	,__class__: flash.display._BitmapData.MinstdGenerator
}
flash.display.BitmapDataChannel = function() { }
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display.CapsStyle = $hxClasses["flash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
flash.display.CapsStyle.NONE = ["NONE",0];
flash.display.CapsStyle.NONE.toString = $estr;
flash.display.CapsStyle.NONE.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.ROUND = ["ROUND",1];
flash.display.CapsStyle.ROUND.toString = $estr;
flash.display.CapsStyle.ROUND.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.SQUARE = ["SQUARE",2];
flash.display.CapsStyle.SQUARE.toString = $estr;
flash.display.CapsStyle.SQUARE.__enum__ = flash.display.CapsStyle;
flash.display.GradientType = $hxClasses["flash.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] }
flash.display.GradientType.RADIAL = ["RADIAL",0];
flash.display.GradientType.RADIAL.toString = $estr;
flash.display.GradientType.RADIAL.__enum__ = flash.display.GradientType;
flash.display.GradientType.LINEAR = ["LINEAR",1];
flash.display.GradientType.LINEAR.toString = $estr;
flash.display.GradientType.LINEAR.__enum__ = flash.display.GradientType;
flash.display.Graphics = function(inSurface) {
	flash.Lib.nmeBootstrap();
	if(inSurface == null) {
		this.nmeSurface = js.Browser.document.createElement("canvas");
		this.nmeSurface.width = 0;
		this.nmeSurface.height = 0;
	} else this.nmeSurface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.nmeClearLine();
	this.mLineJobs = [];
	this.nmeChanged = true;
	this.nextDrawIndex = 0;
	this.nmeExtent = new flash.geom.Rectangle();
	this.nmeExtentWithFilters = new flash.geom.Rectangle();
	this._padding = 0.0;
	this.nmeClearNextCycle = true;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.nmeDetectIsPointInPathMode = function() {
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return flash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?flash.display.PointInPathMode.USER_SPACE:flash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
flash.display.Graphics.prototype = {
	nmeRender: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.nmeChanged) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.nmeExpandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.nmeClearNextCycle) {
			this.nextDrawIndex = 0;
			this.nmeClearCanvas();
			this.nmeClearNextCycle = false;
		}
		if(this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x > this.nmeSurface.width || this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y > this.nmeSurface.height) this.nmeAdjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,flash.filters.DropShadowFilter)) filter.nmeApplyFilter(this.nmeSurface,null,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.nmeExtentWithFilters.x != 0 || this.nmeExtentWithFilters.y != 0) ctx.translate(-this.nmeExtentWithFilters.x * sx,-this.nmeExtentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.nmeDrawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0, _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						switch(lj.joints) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						switch(lj.caps) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
						while(_g4 < _g3) {
							var i1 = _g4++;
							var p = d.points[i1];
							switch(p.type) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0, _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				var bitmap = d.bitmap;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else if(bitmap != null && (bitmap.flags & 16) > 0) {
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					if((bitmap.flags & 65536) == 0) {
						ctx.mozImageSmoothingEnabled = false;
						ctx.webkitImageSmoothingEnabled = false;
					}
					ctx.fillStyle = ctx.createPattern(bitmap.texture_buffer,"repeat");
				} else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				if(bitmap != null && (bitmap.flags & 16) == 0) {
					ctx.clip();
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.nmeChanged = false;
		this.nextDrawIndex = len > 0?len - 1:0;
		this.mDrawList = [];
		return true;
	}
	,nmeMediaSurface: function(surface) {
		this.nmeSurface = surface;
	}
	,nmeInvalidate: function() {
		this.nmeChanged = true;
		this.nmeClearNextCycle = true;
	}
	,nmeHitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.nmeExtent.width > 0 && this.nmeExtent.height > 0) return true;
		return false;
	}
	,nmeExpandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.nmeExtent.width -= this._padding;
			this.nmeExtent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtent.x = minX;
		this.nmeExtent.y = minY;
		this.nmeExtent.width = maxX - minX + this._padding;
		this.nmeExtent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,nmeExpandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.nmeExtent.x;
		minY = this.nmeExtent.y;
		maxX = this.nmeExtent.width + minX;
		maxY = this.nmeExtent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.nmeExtentWithFilters.x = minX;
		this.nmeExtentWithFilters.y = minY;
		this.nmeExtentWithFilters.width = maxX - minX;
		this.nmeExtentWithFilters.height = maxY - minY;
	}
	,nmeDrawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.nmeBitmap._nmeTextureBuffer;
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.nmeTileRects[tileID];
				center = sheet.nmeCenterPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,nmeDrawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,nmeClearLine: function() {
		this.mCurrentLine = new flash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,nmeClearCanvas: function() {
		if(this.nmeSurface != null) {
			var ctx = (function($this) {
				var $r;
				try {
					$r = $this.nmeSurface.getContext("2d");
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(ctx != null) ctx.clearRect(0,0,this.nmeSurface.width,this.nmeSurface.height);
		}
	}
	,nmeAdjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.nmeSurface,"getContext") != null) {
			var width = Math.ceil((this.nmeExtentWithFilters.width - this.nmeExtentWithFilters.x) * sx);
			var height = Math.ceil((this.nmeExtentWithFilters.height - this.nmeExtentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Browser.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				flash.Lib.nmeDrawToSurface(this.nmeSurface,dstCanvas);
				if(flash.Lib.nmeIsOnStage(this.nmeSurface)) {
					flash.Lib.nmeAppendSurface(dstCanvas);
					flash.Lib.nmeCopyStyle(this.nmeSurface,dstCanvas);
					flash.Lib.nmeSwapSurface(this.nmeSurface,dstCanvas);
					flash.Lib.nmeRemoveSurface(this.nmeSurface);
					if(this.nmeSurface.id != null) flash.Lib.nmeSetSurfaceId(dstCanvas,this.nmeSurface.id);
				}
				this.nmeSurface = dstCanvas;
			}
		}
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.nmeClearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.mCurrentLine.grad = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,getContext: function() {
		try {
			return this.nmeSurface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,flush: function() {
		this.closePolygon(true);
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.nmeExpandStandardExtent(flash.Lib.get_current().get_stage().get_stageWidth(),flash.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new flash.display.Drawable(null,null,null,null,null,null,new flash.display.TileJob(sheet,tileData,flags)));
		this.nmeChanged = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(ry == -1) ry = rx;
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawGraphicsData: function(points) {
		var $it0 = ((function(_e) {
			return function() {
				return $iterator(flash._Vector.Vector_Impl_)(_e);
			};
		})(points))();
		while( $it0.hasNext() ) {
			var data = $it0.next();
			if(data == null) this.mFilling = true; else switch(data.nmeGraphicsDataType) {
			case flash.display.GraphicsDataType.STROKE:
				var stroke = data;
				if(stroke.fill == null) this.lineStyle(stroke.thickness,0,1.,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit); else switch(stroke.fill.nmeGraphicsFillType) {
				case flash.display.GraphicsFillType.SOLID_FILL:
					var fill = stroke.fill;
					this.lineStyle(stroke.thickness,fill.color,fill.alpha,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit);
					break;
				case flash.display.GraphicsFillType.GRADIENT_FILL:
					var fill = stroke.fill;
					this.lineGradientStyle(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
					break;
				}
				break;
			case flash.display.GraphicsDataType.PATH:
				var path = data;
				var j = 0;
				var _g1 = 0, _g = flash._Vector.Vector_Impl_.get_length(path.commands);
				while(_g1 < _g) {
					var i = _g1++;
					var command = path.commands[i];
					switch(command) {
					case 1:
						this.moveTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 2:
						this.lineTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 3:
						this.curveTo(path.data[j],path.data[j + 1],path.data[j + 2],path.data[j + 3]);
						j = j + 4;
						break;
					}
				}
				break;
			case flash.display.GraphicsDataType.SOLID:
				var fill = data;
				this.beginFill(fill.color,fill.alpha);
				break;
			case flash.display.GraphicsDataType.GRADIENT:
				var fill = data;
				this.beginGradientFill(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
				break;
			}
		}
	}
	,drawEllipse: function(x,y,rx,ry) {
		this.closePolygon(false);
		rx /= 2;
		ry /= 2;
		this.nmeDrawEllipse(x + rx,y + ry,rx,ry);
		this.closePolygon(false);
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.nmeDrawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.nmeExpandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,createGradient: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		var points = new Array();
		var _g1 = 0, _g = colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			points.push(new flash.display.GradPoint(colors[i],alphas[i],ratios[i]));
		}
		var flags = 0;
		if(type == flash.display.GradientType.RADIAL) flags |= 1;
		if(spreadMethod == flash.display.SpreadMethod.REPEAT) flags |= 2; else if(spreadMethod == flash.display.SpreadMethod.REFLECT) flags |= 4;
		if(matrix == null) {
			matrix = new flash.geom.Matrix();
			matrix.createGradientBox(25,25);
		} else matrix = matrix.clone();
		var focal = focalPointRatio == null?0:focalPointRatio;
		return new flash.display.Grad(points,matrix,flags,focal);
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new flash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new flash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new flash.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.nmeChanged = true;
	}
	,clear: function() {
		this.nmeClearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.nmeClearNextCycle = true;
		this.boundsDirty = true;
		this.nmeExtent.x = 0.0;
		this.nmeExtent.y = 0.0;
		this.nmeExtent.width = 0.0;
		this.nmeExtent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,blit: function(inTexture) {
		this.closePolygon(true);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.nmeSurface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) ctx.drawImage(inTexture._nmeTextureBuffer,this.mPenX,this.mPenY);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.closePolygon(true);
		this.mFilling = true;
		this.mBitmap = null;
		this.mSolidGradient = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,beginBitmapFill: function(bitmap,matrix,in_repeat,in_smooth) {
		if(in_smooth == null) in_smooth = false;
		if(in_repeat == null) in_repeat = true;
		this.closePolygon(true);
		var repeat = in_repeat == null?true:in_repeat;
		var smooth = in_smooth == null?false:in_smooth;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.nmeExpandStandardExtent(bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.width:0,bitmap._nmeTextureBuffer != null?bitmap._nmeTextureBuffer.height:0);
		this.mBitmap = { texture_buffer : bitmap._nmeTextureBuffer, matrix : matrix == null?matrix:matrix.clone(), flags : (repeat?16:0) | (smooth?65536:0)};
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new flash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,_padding: null
	,nmeClearNextCycle: null
	,nmeChanged: null
	,nextDrawIndex: null
	,mSolidGradient: null
	,mPoints: null
	,mPenY: null
	,mPenX: null
	,mLineJobs: null
	,mLineDraws: null
	,mLastMoveID: null
	,mFilling: null
	,mFillAlpha: null
	,mFillColour: null
	,mDrawList: null
	,mCurrentLine: null
	,mBitmap: null
	,nmeSurface: null
	,nmeExtentWithFilters: null
	,nmeExtent: null
	,boundsDirty: null
	,__class__: flash.display.Graphics
}
flash.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["flash.display.Drawable"] = flash.display.Drawable;
flash.display.Drawable.__name__ = ["flash","display","Drawable"];
flash.display.Drawable.prototype = {
	tileJob: null
	,solidGradient: null
	,points: null
	,lineJobs: null
	,fillColour: null
	,fillAlpha: null
	,bitmap: null
	,__class__: flash.display.Drawable
}
flash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["flash.display.GfxPoint"] = flash.display.GfxPoint;
flash.display.GfxPoint.__name__ = ["flash","display","GfxPoint"];
flash.display.GfxPoint.prototype = {
	y: null
	,x: null
	,type: null
	,cy: null
	,cx: null
	,__class__: flash.display.GfxPoint
}
flash.display.Grad = function(inPoints,inMatrix,inFlags,inFocal) {
	this.points = inPoints;
	this.matrix = inMatrix;
	this.flags = inFlags;
	this.focal = inFocal;
};
$hxClasses["flash.display.Grad"] = flash.display.Grad;
flash.display.Grad.__name__ = ["flash","display","Grad"];
flash.display.Grad.prototype = {
	points: null
	,matrix: null
	,focal: null
	,flags: null
	,__class__: flash.display.Grad
}
flash.display.GradPoint = function(inCol,inAlpha,inRatio) {
	this.col = inCol;
	this.alpha = inAlpha;
	this.ratio = inRatio;
};
$hxClasses["flash.display.GradPoint"] = flash.display.GradPoint;
flash.display.GradPoint.__name__ = ["flash","display","GradPoint"];
flash.display.GradPoint.prototype = {
	ratio: null
	,col: null
	,alpha: null
	,__class__: flash.display.GradPoint
}
flash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["flash.display.LineJob"] = flash.display.LineJob;
flash.display.LineJob.__name__ = ["flash","display","LineJob"];
flash.display.LineJob.prototype = {
	thickness: null
	,scale_mode: null
	,point_idx1: null
	,point_idx0: null
	,pixel_hinting: null
	,miter_limit: null
	,joints: null
	,grad: null
	,colour: null
	,caps: null
	,alpha: null
	,__class__: flash.display.LineJob
}
flash.display.PointInPathMode = $hxClasses["flash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
flash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
flash.display.PointInPathMode.USER_SPACE.toString = $estr;
flash.display.PointInPathMode.USER_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
flash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
flash.display.PointInPathMode.DEVICE_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["flash.display.TileJob"] = flash.display.TileJob;
flash.display.TileJob.__name__ = ["flash","display","TileJob"];
flash.display.TileJob.prototype = {
	sheet: null
	,flags: null
	,drawList: null
	,__class__: flash.display.TileJob
}
flash.display.IGraphicsFill = function() { }
$hxClasses["flash.display.IGraphicsFill"] = flash.display.IGraphicsFill;
flash.display.IGraphicsFill.__name__ = ["flash","display","IGraphicsFill"];
flash.display.IGraphicsFill.prototype = {
	nmeGraphicsFillType: null
	,__class__: flash.display.IGraphicsFill
}
flash.display.IGraphicsData = function() { }
$hxClasses["flash.display.IGraphicsData"] = flash.display.IGraphicsData;
flash.display.IGraphicsData.__name__ = ["flash","display","IGraphicsData"];
flash.display.IGraphicsData.prototype = {
	nmeGraphicsDataType: null
	,__class__: flash.display.IGraphicsData
}
flash.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) focalPointRatio = 0;
	this.type = type;
	this.colors = colors;
	this.alphas = alphas;
	this.ratios = ratios;
	this.matrix = matrix;
	this.spreadMethod = spreadMethod;
	this.interpolationMethod = interpolationMethod;
	this.focalPointRatio = focalPointRatio;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.GRADIENT;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.GRADIENT_FILL;
};
$hxClasses["flash.display.GraphicsGradientFill"] = flash.display.GraphicsGradientFill;
flash.display.GraphicsGradientFill.__name__ = ["flash","display","GraphicsGradientFill"];
flash.display.GraphicsGradientFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsGradientFill.prototype = {
	type: null
	,spreadMethod: null
	,ratios: null
	,nmeGraphicsFillType: null
	,nmeGraphicsDataType: null
	,matrix: null
	,interpolationMethod: null
	,focalPointRatio: null
	,colors: null
	,alphas: null
	,__class__: flash.display.GraphicsGradientFill
}
flash.display.IGraphicsPath = function() { }
$hxClasses["flash.display.IGraphicsPath"] = flash.display.IGraphicsPath;
flash.display.IGraphicsPath.__name__ = ["flash","display","IGraphicsPath"];
flash.display.GraphicsPath = function(commands,data,winding) {
	this.commands = commands;
	this.data = data;
	this.winding = winding;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.PATH;
};
$hxClasses["flash.display.GraphicsPath"] = flash.display.GraphicsPath;
flash.display.GraphicsPath.__name__ = ["flash","display","GraphicsPath"];
flash.display.GraphicsPath.__interfaces__ = [flash.display.IGraphicsPath,flash.display.IGraphicsData];
flash.display.GraphicsPath.prototype = {
	moveTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,1);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,lineTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,2);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,3);
			flash._Vector.Vector_Impl_.push(this.data,anchorX);
			flash._Vector.Vector_Impl_.push(this.data,anchorY);
			flash._Vector.Vector_Impl_.push(this.data,controlX);
			flash._Vector.Vector_Impl_.push(this.data,controlY);
		}
	}
	,winding: null
	,nmeGraphicsDataType: null
	,data: null
	,commands: null
	,__class__: flash.display.GraphicsPath
}
flash.display.GraphicsPathCommand = function() { }
$hxClasses["flash.display.GraphicsPathCommand"] = flash.display.GraphicsPathCommand;
flash.display.GraphicsPathCommand.__name__ = ["flash","display","GraphicsPathCommand"];
flash.display.GraphicsPathWinding = $hxClasses["flash.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] }
flash.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
flash.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
flash.display.GraphicsPathWinding.EVEN_ODD.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
flash.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
flash.display.GraphicsPathWinding.NON_ZERO.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	this.alpha = alpha;
	this.color = color;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.SOLID;
	this.nmeGraphicsFillType = flash.display.GraphicsFillType.SOLID_FILL;
};
$hxClasses["flash.display.GraphicsSolidFill"] = flash.display.GraphicsSolidFill;
flash.display.GraphicsSolidFill.__name__ = ["flash","display","GraphicsSolidFill"];
flash.display.GraphicsSolidFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsSolidFill.prototype = {
	nmeGraphicsFillType: null
	,nmeGraphicsDataType: null
	,color: null
	,alpha: null
	,__class__: flash.display.GraphicsSolidFill
}
flash.display.IGraphicsStroke = function() { }
$hxClasses["flash.display.IGraphicsStroke"] = flash.display.IGraphicsStroke;
flash.display.IGraphicsStroke.__name__ = ["flash","display","IGraphicsStroke"];
flash.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) miterLimit = 3;
	if(pixelHinting == null) pixelHinting = false;
	if(thickness == null) thickness = 0.0;
	this.caps = caps != null?caps:null;
	this.fill = fill;
	this.joints = joints != null?joints:null;
	this.miterLimit = miterLimit;
	this.pixelHinting = pixelHinting;
	this.scaleMode = scaleMode != null?scaleMode:null;
	this.thickness = thickness;
	this.nmeGraphicsDataType = flash.display.GraphicsDataType.STROKE;
};
$hxClasses["flash.display.GraphicsStroke"] = flash.display.GraphicsStroke;
flash.display.GraphicsStroke.__name__ = ["flash","display","GraphicsStroke"];
flash.display.GraphicsStroke.__interfaces__ = [flash.display.IGraphicsStroke,flash.display.IGraphicsData];
flash.display.GraphicsStroke.prototype = {
	thickness: null
	,scaleMode: null
	,pixelHinting: null
	,nmeGraphicsDataType: null
	,miterLimit: null
	,joints: null
	,fill: null
	,caps: null
	,__class__: flash.display.GraphicsStroke
}
flash.display.GraphicsDataType = $hxClasses["flash.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
flash.display.GraphicsDataType.STROKE = ["STROKE",0];
flash.display.GraphicsDataType.STROKE.toString = $estr;
flash.display.GraphicsDataType.STROKE.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.SOLID = ["SOLID",1];
flash.display.GraphicsDataType.SOLID.toString = $estr;
flash.display.GraphicsDataType.SOLID.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
flash.display.GraphicsDataType.GRADIENT.toString = $estr;
flash.display.GraphicsDataType.GRADIENT.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.PATH = ["PATH",3];
flash.display.GraphicsDataType.PATH.toString = $estr;
flash.display.GraphicsDataType.PATH.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsFillType = $hxClasses["flash.display.GraphicsFillType"] = { __ename__ : true, __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
flash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
flash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
flash.display.GraphicsFillType.SOLID_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
flash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
flash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.InterpolationMethod = $hxClasses["flash.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] }
flash.display.InterpolationMethod.RGB = ["RGB",0];
flash.display.InterpolationMethod.RGB.toString = $estr;
flash.display.InterpolationMethod.RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
flash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
flash.display.InterpolationMethod.LINEAR_RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.JointStyle = $hxClasses["flash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
flash.display.JointStyle.MITER = ["MITER",0];
flash.display.JointStyle.MITER.toString = $estr;
flash.display.JointStyle.MITER.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.ROUND = ["ROUND",1];
flash.display.JointStyle.ROUND.toString = $estr;
flash.display.JointStyle.ROUND.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.BEVEL = ["BEVEL",2];
flash.display.JointStyle.BEVEL.toString = $estr;
flash.display.JointStyle.BEVEL.__enum__ = flash.display.JointStyle;
flash.display.LineScaleMode = $hxClasses["flash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
flash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
flash.display.LineScaleMode.HORIZONTAL.toString = $estr;
flash.display.LineScaleMode.HORIZONTAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NONE = ["NONE",1];
flash.display.LineScaleMode.NONE.toString = $estr;
flash.display.LineScaleMode.NONE.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NORMAL = ["NORMAL",2];
flash.display.LineScaleMode.NORMAL.toString = $estr;
flash.display.LineScaleMode.NORMAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
flash.display.LineScaleMode.VERTICAL.toString = $estr;
flash.display.LineScaleMode.VERTICAL.__enum__ = flash.display.LineScaleMode;
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	handleLoad: function(e) {
		e.currentTarget = this;
		this.content.nmeInvalidateBounds();
		this.content.nmeRender(null,null);
		this.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.Sprite.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new flash.geom.Rectangle(0,0,this.mImage.get_width(),this.mImage.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.nmeBoundsRect.width == 0 && this.nmeBoundsRect.height == 0) this.nmeBoundsRect = r.clone(); else this.nmeBoundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.nmeBoundsRect.width *= this.nmeScaleX;
				this.nmeBoundsRect.height *= this.nmeScaleY;
				this.nmeWidth = this.nmeBoundsRect.width;
				this.nmeHeight = this.nmeBoundsRect.height;
			} else {
				this.nmeWidth = this.nmeBoundsRect.width * this.nmeScaleX;
				this.nmeHeight = this.nmeBoundsRect.height * this.nmeScaleY;
			}
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this._nmeId + "]";
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event(flash.events.Event.COMPLETE);
				evt.currentTarget = _g;
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			haxe.Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 116, className : "flash.display.Loader", methodName : "loadBytes"});
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
		}
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unrecognized file " + request.url;
					return $r;
				}($this));
			}
			return $r;
		}(this));
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.nmeLoadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			haxe.Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 79, className : "flash.display.Loader", methodName : "load"});
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,mShape: null
	,mImage: null
	,contentLoaderInfo: null
	,content: null
	,__class__: flash.display.Loader
});
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(ldr) {
	var li = new flash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
}
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	width: null
	,url: null
	,sharedEvents: null
	,sameDomain: null
	,parentAllowsChild: null
	,parameters: null
	,loaderURL: null
	,loader: null
	,height: null
	,frameRate: null
	,contentType: null
	,content: null
	,childAllowsParent: null
	,bytesTotal: null
	,bytesLoaded: null
	,bytes: null
	,applicationDomain: null
	,__class__: flash.display.LoaderInfo
});
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.__currentFrame = 0;
	this.__totalFrames = 0;
	this.loaderInfo = flash.display.LoaderInfo.create(null);
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	get_totalFrames: function() {
		return this.__totalFrames;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this._nmeId + "]";
	}
	,stop: function() {
	}
	,prevFrame: function() {
	}
	,play: function() {
	}
	,nextFrame: function() {
	}
	,gotoAndStop: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,gotoAndPlay: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,__totalFrames: null
	,__currentFrame: null
	,totalFrames: null
	,framesLoaded: null
	,enabled: null
	,currentFrame: null
	,__class__: flash.display.MovieClip
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_currentFrame:"get_currentFrame",get_framesLoaded:"get_framesLoaded",get_totalFrames:"get_totalFrames"})
});
flash.display.PixelSnapping = $hxClasses["flash.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
flash.display.PixelSnapping.NEVER = ["NEVER",0];
flash.display.PixelSnapping.NEVER.toString = $estr;
flash.display.PixelSnapping.NEVER.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.AUTO = ["AUTO",1];
flash.display.PixelSnapping.AUTO.toString = $estr;
flash.display.PixelSnapping.AUTO.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
flash.display.PixelSnapping.ALWAYS.toString = $estr;
flash.display.PixelSnapping.ALWAYS.__enum__ = flash.display.PixelSnapping;
flash.display.Shape = function() {
	flash.display.DisplayObject.call(this);
	this.nmeGraphics = new flash.display.Graphics();
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	get_graphics: function() {
		return this.nmeGraphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this._nmeId + "]";
	}
	,nmeGetObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && flash.display.DisplayObject.prototype.nmeGetObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,nmeGetGraphics: function() {
		return this.nmeGraphics;
	}
	,nmeGraphics: null
	,__class__: flash.display.Shape
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
flash.display.SpreadMethod = $hxClasses["flash.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] }
flash.display.SpreadMethod.REPEAT = ["REPEAT",0];
flash.display.SpreadMethod.REPEAT.toString = $estr;
flash.display.SpreadMethod.REPEAT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.REFLECT = ["REFLECT",1];
flash.display.SpreadMethod.REFLECT.toString = $estr;
flash.display.SpreadMethod.REFLECT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.PAD = ["PAD",2];
flash.display.SpreadMethod.PAD.toString = $estr;
flash.display.SpreadMethod.PAD.__enum__ = flash.display.SpreadMethod;
flash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.nmeIsCancelled = false;
	this.nmeIsCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = flash.events.EventPhase.AT_TARGET;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,stopPropagation: function() {
		this.nmeIsCancelled = true;
	}
	,stopImmediatePropagation: function() {
		this.nmeIsCancelled = true;
		this.nmeIsCancelledNow = true;
	}
	,nmeSetPhase: function(phase) {
		this.eventPhase = phase;
	}
	,nmeGetIsCancelledNow: function() {
		return this.nmeIsCancelledNow;
	}
	,nmeGetIsCancelled: function() {
		return this.nmeIsCancelled;
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,nmeIsCancelledNow: null
	,nmeIsCancelled: null
	,type: null
	,target: null
	,eventPhase: null
	,currentTarget: null
	,cancelable: null
	,bubbles: null
	,__class__: flash.events.Event
}
flash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.nmeCreate = function(type,event,local,target) {
	var nmeMouseDown = false;
	var delta = 2;
	if(type == flash.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == flash.events.MouseEvent.MOUSE_DOWN) nmeMouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == flash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) nmeMouseDown = false; else if(event.button != null) {
				if(event.button == 0) nmeMouseDown = false; else nmeMouseDown = false;
			}
		}
	}
	var pseudoEvent = new flash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,nmeMouseDown,delta);
	pseudoEvent.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,stageY: null
	,stageX: null
	,shiftKey: null
	,relatedObject: null
	,localY: null
	,localX: null
	,delta: null
	,ctrlKey: null
	,clickCount: null
	,commandKey: null
	,buttonDown: null
	,altKey: null
	,__class__: flash.events.MouseEvent
});
flash.display.Stage = function(width,height) {
	flash.display.DisplayObjectContainer.call(this);
	this.nmeFocusObject = null;
	this.nmeFocusObjectActivated = false;
	this.nmeWindowWidth = width;
	this.nmeWindowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = flash.display.StageScaleMode.SHOW_ALL;
	this.nmeStageMatrix = new flash.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = flash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.nmeWindowWidth);
	this.loaderInfo.parameters.height = Std.string(this.nmeWindowHeight);
	this.nmePointInPathMode = flash.display.Graphics.nmeDetectIsPointInPathMode();
	this.nmeMouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.nmeTouchInfo = [];
	this.nmeUIEventsQueue = new Array(1000);
	this.nmeUIEventsQueueIndex = 0;
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.getOrientation = function() {
	var rotation = window.orientation;
	var orientation = flash.display.Stage.OrientationPortrait;
	switch(rotation) {
	case -90:
		orientation = flash.display.Stage.OrientationLandscapeLeft;
		break;
	case 180:
		orientation = flash.display.Stage.OrientationPortraitUpsideDown;
		break;
	case 90:
		orientation = flash.display.Stage.OrientationLandscapeRight;
		break;
	default:
		orientation = flash.display.Stage.OrientationPortrait;
	}
	return orientation;
}
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	get_stageWidth: function() {
		return this.nmeWindowWidth;
	}
	,get_stageHeight: function() {
		return this.nmeWindowHeight;
	}
	,get_stage: function() {
		return flash.Lib.nmeGetStage();
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.nmeShowDefaultContextMenu && this.nmeShowDefaultContextMenu != null) {
			if(!showDefaultContextMenu) flash.Lib.nmeDisableRightClick(); else flash.Lib.nmeEnableRightClick();
		}
		this.nmeShowDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,get_showDefaultContextMenu: function() {
		return this.nmeShowDefaultContextMenu;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_quality: function() {
		return this.quality != null?this.quality:flash.display.StageQuality.BEST;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,get_fullScreenHeight: function() {
		return js.Browser.window.innerHeight;
	}
	,get_fullScreenWidth: function() {
		return js.Browser.window.innerWidth;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var window = js.Browser.window;
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(nmeRequestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) this.nmeInterval = 1000.0 / speed | 0;
		this.nmeFrameRate = speed;
		this.nmeUpdateNextWake();
		return speed;
	}
	,get_frameRate: function() {
		return this.nmeFrameRate;
	}
	,set_focus: function(inObj) {
		this.nmeOnFocus(inObj);
		return this.nmeFocusObject;
	}
	,get_focus: function() {
		return this.nmeFocusObject;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 0:
				flash.Lib.nmeDisableFullScreen();
				break;
			case 1:
			case 2:
				flash.Lib.nmeEnableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,get_displayState: function() {
		return this.displayState;
	}
	,set_backgroundColor: function(col) {
		return this.nmeBackgroundColour = col;
	}
	,get_backgroundColor: function() {
		return this.nmeBackgroundColour;
	}
	,nmeOnTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(touch.pageX - rect.left,touch.pageY - rect.top);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
			obj.nmeFireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case "touchBegin":
					$r = flash.events.MouseEvent.MOUSE_DOWN;
					break;
				case "touchEnd":
					$r = flash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.nmeDragObject != null) $this.nmeDrag(point);
						$r = flash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.nmeFireEvent(flash.events.MouseEvent.nmeCreate(mouseType,evt,local,obj));
		} else {
			var evt = flash.events.TouchEvent.nmeCreate(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.nmeCheckInOuts(evt,stack,touchInfo);
		}
	}
	,nmeOnResize: function(inW,inH) {
		this.nmeWindowWidth = inW;
		this.nmeWindowHeight = inH;
		var event = new flash.events.Event(flash.events.Event.RESIZE);
		event.target = this;
		this.nmeBroadcast(event);
	}
	,nmeOnMouse: function(event,type) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(event.clientX - rect.left,event.clientY - rect.top);
		if(this.nmeDragObject != null) this.nmeDrag(point);
		var obj = this.nmeGetObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.MouseEvent.nmeCreate(type,event,local,obj);
			this.nmeCheckInOuts(evt,stack);
			if(type == flash.events.MouseEvent.MOUSE_DOWN) this.nmeOnFocus(stack[stack.length - 1]);
			obj.nmeFireEvent(evt);
		} else {
			var evt = flash.events.MouseEvent.nmeCreate(type,event,point,null);
			this.nmeCheckInOuts(evt,stack);
		}
	}
	,nmeOnFocus: function(target) {
		if(target != this.nmeFocusObject) {
			if(this.nmeFocusObject != null) this.nmeFocusObject.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT,true,false,this.nmeFocusObject,false,0));
			target.nmeFireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN,true,false,target,false,0));
			this.nmeFocusObject = target;
		}
	}
	,nmeOnKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var stack = new Array();
		if(this.nmeFocusObject == null) this.nmeGetInteractiveObjectStack(stack); else this.nmeFocusObject.nmeGetInteractiveObjectStack(stack);
		if(stack.length > 0) {
			var obj = stack[0];
			var evt = new flash.events.KeyboardEvent(pressed?flash.events.KeyboardEvent.KEY_DOWN:flash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
			obj.nmeFireEvent(evt);
		}
	}
	,nmeHandleOrientationChange: function() {
	}
	,nmeHandleAccelerometer: function(evt) {
		flash.display.Stage.nmeAcceleration.x = evt.accelerationIncludingGravity.x;
		flash.display.Stage.nmeAcceleration.y = evt.accelerationIncludingGravity.y;
		flash.display.Stage.nmeAcceleration.z = evt.accelerationIncludingGravity.z;
	}
	,toString: function() {
		return "[Stage id=" + this._nmeId + "]";
	}
	,nmeUpdateNextWake: function() {
		if(this.nmeFrameRate == 0) {
			var nmeRequestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			nmeRequestAnimationFrame($bind(this,this.nmeUpdateNextWake));
			this.nmeStageRender();
		} else {
			js.Browser.window.clearInterval(this.nmeTimer);
			this.nmeTimer = js.Browser.window.setInterval($bind(this,this.nmeStageRender),this.nmeInterval);
		}
	}
	,nmeStopDrag: function(sprite) {
		this.nmeDragBounds = null;
		this.nmeDragObject = null;
	}
	,nmeStartDrag: function(sprite,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		this.nmeDragBounds = bounds == null?null:bounds.clone();
		this.nmeDragObject = sprite;
		if(this.nmeDragObject != null) {
			var mouse = new flash.geom.Point(this._mouseX,this._mouseY);
			var p = this.nmeDragObject.parent;
			if(p != null) mouse = p.globalToLocal(mouse);
			if(lockCenter) {
				var bounds1 = sprite.getBounds(this);
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - (bounds1.width / 2 + bounds1.x);
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - (bounds1.height / 2 + bounds1.y);
			} else {
				this.nmeDragOffsetX = this.nmeDragObject.get_x() - mouse.x;
				this.nmeDragOffsetY = this.nmeDragObject.get_y() - mouse.y;
			}
		}
	}
	,nmeStageRender: function(_) {
		if(!this.nmeStageActive) {
			this.nmeOnResize(this.nmeWindowWidth,this.nmeWindowHeight);
			var event = new flash.events.Event(flash.events.Event.ACTIVATE);
			event.target = this;
			this.nmeBroadcast(event);
			this.nmeStageActive = true;
		}
		var _g1 = 0, _g = this.nmeUIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.nmeUIEventsQueue[i] != null) this.nmeProcessStageEvent(this.nmeUIEventsQueue[i]);
		}
		this.nmeUIEventsQueueIndex = 0;
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		this.nmeBroadcast(event);
		if(this.nmeInvalid) {
			var event1 = new flash.events.Event(flash.events.Event.RENDER);
			this.nmeBroadcast(event1);
		}
		this.nmeRenderAll();
	}
	,nmeRenderToCanvas: function(canvas) {
		canvas.width = canvas.width;
		this.nmeRender(canvas);
	}
	,nmeRenderAll: function() {
		this.nmeRender(null,null);
	}
	,nmeQueueStageEvent: function(evt) {
		this.nmeUIEventsQueue[this.nmeUIEventsQueueIndex++] = evt;
	}
	,nmeProcessStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.nmeOnResize(flash.Lib.nmeGetWidth(),flash.Lib.nmeGetHeight());
			break;
		case "focus":
			this.nmeOnFocus(this);
			if(!this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = true;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.ACTIVATE));
			}
			break;
		case "blur":
			if(this.nmeFocusObjectActivated) {
				this.nmeFocusObjectActivated = false;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.DEACTIVATE));
			}
			break;
		case "mousemove":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.nmeOnMouse(evt,flash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.nmeOnMouse(evt,flash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.nmeOnMouse(evt,flash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.nmeConvertMozillaCode(keyCode);
			this.nmeOnKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new flash.display._Stage.TouchInfo();
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.nmeTouchInfo[evt1.changedTouches[0].identifier];
			this.nmeOnTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.nmeTouchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.nmeHandleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.nmeHandleOrientationChange();
			break;
		default:
		}
	}
	,nmeIsOnStage: function() {
		return true;
	}
	,nmeDrag: function(point) {
		var p = this.nmeDragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.nmeDragOffsetX;
		var y = point.y + this.nmeDragOffsetY;
		if(this.nmeDragBounds != null) {
			if(x < this.nmeDragBounds.x) x = this.nmeDragBounds.x; else if(x > this.nmeDragBounds.get_right()) x = this.nmeDragBounds.get_right();
			if(y < this.nmeDragBounds.y) y = this.nmeDragBounds.y; else if(y > this.nmeDragBounds.get_bottom()) y = this.nmeDragBounds.get_bottom();
		}
		this.nmeDragObject.set_x(x);
		this.nmeDragObject.set_y(y);
	}
	,nmeCheckInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.nmeMouseOverObjects:touchInfo.touchOverObjects;
		var changeEvents = touchInfo == null?flash.display.Stage.nmeMouseChanges:flash.display.Stage.nmeTouchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.nmeFireEvent(event.nmeCreateSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.nmeCreateSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.nmeCreateSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.nmeMouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,invalidate: function() {
		this.nmeInvalid = true;
	}
	,_mouseY: null
	,_mouseX: null
	,nmeWindowHeight: null
	,nmeWindowWidth: null
	,nmeUIEventsQueueIndex: null
	,nmeUIEventsQueue: null
	,nmeTouchInfo: null
	,nmeTimer: null
	,nmeStageMatrix: null
	,nmeStageActive: null
	,nmeShowDefaultContextMenu: null
	,nmeMouseOverObjects: null
	,nmeInvalid: null
	,nmeInterval: null
	,nmeFrameRate: null
	,nmeFocusObjectActivated: null
	,nmeFocusObject: null
	,nmeDragOffsetY: null
	,nmeDragOffsetX: null
	,nmeDragObject: null
	,nmeDragBounds: null
	,nmeBackgroundColour: null
	,stageWidth: null
	,stageHeight: null
	,stageFocusRect: null
	,scaleMode: null
	,quality: null
	,nmePointInPathMode: null
	,fullScreenWidth: null
	,fullScreenHeight: null
	,displayState: null
	,align: null
	,__class__: flash.display.Stage
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_displayState:"set_displayState",get_displayState:"get_displayState",set_focus:"set_focus",get_focus:"get_focus",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",get_fullScreenHeight:"get_fullScreenHeight",get_fullScreenWidth:"get_fullScreenWidth",set_quality:"set_quality",get_quality:"get_quality",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",get_stageHeight:"get_stageHeight",get_stageWidth:"get_stageWidth"})
});
flash.display._Stage = {}
flash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["flash.display._Stage.TouchInfo"] = flash.display._Stage.TouchInfo;
flash.display._Stage.TouchInfo.__name__ = ["flash","display","_Stage","TouchInfo"];
flash.display._Stage.TouchInfo.prototype = {
	touchOverObjects: null
	,__class__: flash.display._Stage.TouchInfo
}
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] }
flash.display.StageDisplayState.NORMAL = ["NORMAL",0];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageQuality = function() { }
$hxClasses["flash.display.StageQuality"] = flash.display.StageQuality;
flash.display.StageQuality.__name__ = ["flash","display","StageQuality"];
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.errors = {}
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,name: null
	,message: null
	,errorID: null
	,__class__: flash.errors.Error
}
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	text: null
	,__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text) {
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = flash.events.Listener.sIDs++;
};
$hxClasses["flash.events.Listener"] = flash.events.Listener;
flash.events.Listener.__name__ = ["flash","events","Listener"];
flash.events.Listener.prototype = {
	Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,mUseCapture: null
	,mPriority: null
	,mListner: null
	,mID: null
	,__class__: flash.events.Listener
}
flash.events.EventPhase = function() { }
$hxClasses["flash.events.EventPhase"] = flash.events.EventPhase;
flash.events.EventPhase.__name__ = ["flash","events","EventPhase"];
flash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["flash.events.FocusEvent"] = flash.events.FocusEvent;
flash.events.FocusEvent.__name__ = ["flash","events","FocusEvent"];
flash.events.FocusEvent.__super__ = flash.events.Event;
flash.events.FocusEvent.prototype = $extend(flash.events.Event.prototype,{
	shiftKey: null
	,relatedObject: null
	,keyCode: null
	,__class__: flash.events.FocusEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	status: null
	,responseURL: null
	,responseHeaders: null
	,__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	text: null
	,__class__: flash.events.IOErrorEvent
});
flash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.altKey = inAltKey == null?false:inAltKey;
	this.charCode = inCharCode == null?0:inCharCode;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
	this.commandKey = commandKeyValue;
	this.controlKey = controlKeyValue;
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
};
$hxClasses["flash.events.KeyboardEvent"] = flash.events.KeyboardEvent;
flash.events.KeyboardEvent.__name__ = ["flash","events","KeyboardEvent"];
flash.events.KeyboardEvent.__super__ = flash.events.Event;
flash.events.KeyboardEvent.prototype = $extend(flash.events.Event.prototype,{
	shiftKey: null
	,keyLocation: null
	,keyCode: null
	,controlKey: null
	,commandKey: null
	,ctrlKey: null
	,charCode: null
	,altKey: null
	,__class__: flash.events.KeyboardEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	bytesTotal: null
	,bytesLoaded: null
	,__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["flash.events.TouchEvent"] = flash.events.TouchEvent;
flash.events.TouchEvent.__name__ = ["flash","events","TouchEvent"];
flash.events.TouchEvent.nmeCreate = function(type,event,touch,local,target) {
	var evt = new flash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
flash.events.TouchEvent.__super__ = flash.events.Event;
flash.events.TouchEvent.prototype = $extend(flash.events.Event.prototype,{
	nmeCreateSimilar: function(type,related,targ) {
		var result = new flash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,touchPointID: null
	,stageY: null
	,stageX: null
	,shiftKey: null
	,relatedObject: null
	,localY: null
	,localX: null
	,isPrimaryTouchPoint: null
	,delta: null
	,ctrlKey: null
	,commandKey: null
	,buttonDown: null
	,altKey: null
	,__class__: flash.events.TouchEvent
});
flash.filters = {}
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,nmePreFilter: function(surface) {
	}
	,clone: function() {
		throw "Implement in subclass. BitmapFilter::clone";
		return null;
	}
	,_nmeCached: null
	,_mType: null
	,__class__: flash.filters.BitmapFilter
}
flash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	flash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this._nmeCached = false;
};
$hxClasses["flash.filters.DropShadowFilter"] = flash.filters.DropShadowFilter;
flash.filters.DropShadowFilter.__name__ = ["flash","filters","DropShadowFilter"];
flash.filters.DropShadowFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.DropShadowFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	nmeApplyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this._nmeCached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "rgba(" + (this.color >> 16 & 255) + "," + (this.color >> 8 & 255) + "," + (this.color & 255) + "," + this.alpha + ")";
			this._nmeCached = true;
		}
	}
	,clone: function() {
		return new flash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,strength: null
	,quality: null
	,knockout: null
	,inner: null
	,hideObject: null
	,distance: null
	,color: null
	,blurY: null
	,blurX: null
	,angle: null
	,alpha: null
	,__class__: flash.filters.DropShadowFilter
});
flash.geom = {}
flash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,redOffset: null
	,redMultiplier: null
	,greenOffset: null
	,greenMultiplier: null
	,blueOffset: null
	,blueMultiplier: null
	,alphaOffset: null
	,alphaMultiplier: null
	,__class__: flash.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
flash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new flash.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,transformPoint: function(inPos) {
		return new flash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,to3DString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", " + "0, 1" + ")";
	}
	,setRotation: function(inTheta,inScale) {
		if(inScale == null) inScale = 1;
		var scale = inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTranslateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,nmeTransformY: function(inPos) {
		return inPos.x * this.b + inPos.y * this.d + this.ty;
	}
	,nmeTransformX: function(inPos) {
		return inPos.x * this.a + inPos.y * this.c + this.tx;
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		if(in_ty == null) in_ty = 0;
		if(in_tx == null) in_tx = 0;
		if(rotation == null) rotation = 0;
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.set_tx(in_tx != null?in_tx + in_width / 2:in_width / 2);
		this.set_ty(in_ty != null?in_ty + in_height / 2:in_height / 2);
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,_sy: null
	,_sx: null
	,ty: null
	,tx: null
	,d: null
	,c: null
	,b: null
	,a: null
	,__class__: flash.geom.Matrix
	,__properties__: {set_tx:"set_tx",set_ty:"set_ty"}
}
flash.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
flash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new flash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
flash.geom.Point.polar = function(len,angle) {
	return new flash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
flash.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,subtract: function(v) {
		return new flash.geom.Point(this.x - v.x,this.y - v.y);
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,add: function(v) {
		return new flash.geom.Point(v.x + this.x,v.y + this.y);
	}
	,y: null
	,x: null
	,length: null
	,__class__: flash.geom.Point
	,__properties__: {get_length:"get_length"}
}
flash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new flash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new flash.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new flash.geom.Rectangle();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,y: null
	,x: null
	,width: null
	,height: null
	,__class__: flash.geom.Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_left:"set_left",get_left:"get_left",set_right:"set_right",get_right:"get_right",set_size:"set_size",get_size:"get_size",set_top:"set_top",get_top:"get_top",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft"}
}
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.nmeMatrixOverridden();
		return this._matrix;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,get_concatenatedMatrix: function() {
		return this.nmeGetFullMatrix(this._matrix);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,nmeSetMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,nmeSetFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,nmeGetFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,_matrix: null
	,_fullMatrix: null
	,_displayObject: null
	,concatenatedMatrix: null
	,colorTransform: null
	,__class__: flash.geom.Transform
	,__properties__: {set_colorTransform:"set_colorTransform",get_concatenatedMatrix:"get_concatenatedMatrix",set_matrix:"set_matrix",get_matrix:"get_matrix",get_pixelBounds:"get_pixelBounds"}
}
flash.media = {}
flash.media.Sound = function(stream,context) {
	flash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.nmeSoundChannels = new haxe.ds.IntMap();
	this.nmeSoundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.nmeCanPlayMime = function(mime) {
	var audio = js.Browser.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	return playable(audio.canPlayType(mime,null));
}
flash.media.Sound.nmeCanPlayType = function(extension) {
	var mime = flash.media.Sound.nmeMimeForExtension(extension);
	if(mime == null) return false;
	return flash.media.Sound.nmeCanPlayMime(mime);
}
flash.media.Sound.nmeMimeForExtension = function(extension) {
	var mime = null;
	switch(extension) {
	case "mp3":
		mime = "audio/mpeg";
		break;
	case "ogg":
		mime = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime = null;
	}
	return mime;
}
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	nmeOnSoundLoaded: function(evt) {
		this.nmeRemoveEventListeners();
		var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
		this.dispatchEvent(evt1);
	}
	,nmeOnSoundLoadError: function(evt) {
		this.nmeRemoveEventListeners();
		haxe.Log.trace("Error loading sound '" + this.nmeStreamUrl + "'",{ fileName : "Sound.hx", lineNumber : 207, className : "flash.media.Sound", methodName : "nmeOnSoundLoadError"});
		var evt1 = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		this.dispatchEvent(evt1);
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(this.nmeStreamUrl == null) return null;
		var self = this;
		var curIdx = this.nmeSoundIdx;
		var removeRef = function() {
			self.nmeSoundChannels.remove(curIdx);
		};
		var channel = flash.media.SoundChannel.nmeCreate(this.nmeStreamUrl,startTime,loops,sndTransform,removeRef);
		this.nmeSoundChannels.set(curIdx,channel);
		this.nmeSoundIdx++;
		var audio = channel.nmeAudio;
		return channel;
	}
	,nmeRemoveEventListeners: function() {
		this.nmeSoundCache.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded),false);
		this.nmeSoundCache.removeEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError),false);
	}
	,nmeLoad: function(stream,context,mime) {
		if(mime == null) mime = "";
		if(mime == null) {
			var url = stream.url.split("?");
			var extension = HxOverrides.substr(url[0],url[0].lastIndexOf(".") + 1,null);
			mime = flash.media.Sound.nmeMimeForExtension(extension);
		}
		if(mime == null || !flash.media.Sound.nmeCanPlayMime(mime)) haxe.Log.trace("Warning: '" + stream.url + "' with type '" + mime + "' may not play on this browser.",{ fileName : "Sound.hx", lineNumber : 121, className : "flash.media.Sound", methodName : "nmeLoad"});
		this.nmeStreamUrl = stream.url;
		try {
			this.nmeSoundCache = new flash.net.URLLoader();
			this.nmeAddEventListeners();
			this.nmeSoundCache.load(stream);
		} catch( e ) {
			haxe.Log.trace("Warning: Could not preload '" + stream.url + "'",{ fileName : "Sound.hx", lineNumber : 136, className : "flash.media.Sound", methodName : "nmeLoad"});
		}
	}
	,nmeAddEventListeners: function() {
		this.nmeSoundCache.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.nmeOnSoundLoaded));
		this.nmeSoundCache.addEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.nmeOnSoundLoadError));
	}
	,load: function(stream,context) {
		this.nmeLoad(stream,context);
	}
	,close: function() {
	}
	,nmeStreamUrl: null
	,nmeSoundIdx: null
	,nmeSoundChannels: null
	,nmeSoundCache: null
	,url: null
	,length: null
	,isBuffering: null
	,id3: null
	,bytesTotal: null
	,bytesLoaded: null
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	flash.events.EventDispatcher.call(this,this);
	this.ChannelId = -1;
	this.leftPeak = 0.;
	this.position = 0.;
	this.rightPeak = 0.;
	this.nmeAudioCurrentLoop = 1;
	this.nmeAudioTotalLoops = 1;
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.nmeCreate = function(src,startTime,loops,sndTransform,removeRef) {
	if(loops == null) loops = 0;
	if(startTime == null) startTime = 0.0;
	var channel = new flash.media.SoundChannel();
	channel.nmeAudio = js.Browser.document.createElement("audio");
	channel.nmeRemoveRef = removeRef;
	channel.nmeAudio.addEventListener("ended",$bind(channel,channel.__onSoundChannelFinished),false);
	channel.nmeAudio.addEventListener("seeked",$bind(channel,channel.__onSoundSeeked),false);
	channel.nmeAudio.addEventListener("stalled",$bind(channel,channel.__onStalled),false);
	channel.nmeAudio.addEventListener("progress",$bind(channel,channel.__onProgress),false);
	if(loops > 0) {
		channel.nmeAudioTotalLoops = loops;
		channel.nmeAudio.loop = true;
	}
	channel.nmeStartTime = startTime;
	if(startTime > 0.) {
		var onLoad = null;
		onLoad = function(_) {
			channel.nmeAudio.currentTime = channel.nmeStartTime;
			channel.nmeAudio.play();
			channel.nmeAudio.removeEventListener("canplaythrough",onLoad,false);
		};
		channel.nmeAudio.addEventListener("canplaythrough",onLoad,false);
	} else channel.nmeAudio.autoplay = true;
	channel.nmeAudio.src = src;
	return channel;
}
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_soundTransform: function(v) {
		this.nmeAudio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__onStalled: function(evt) {
		haxe.Log.trace("sound stalled",{ fileName : "SoundChannel.hx", lineNumber : 174, className : "flash.media.SoundChannel", methodName : "__onStalled"});
		if(this.nmeAudio != null) this.nmeAudio.load();
	}
	,__onSoundSeeked: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.loop = false;
			this.stop();
		} else this.nmeAudioCurrentLoop++;
	}
	,__onSoundChannelFinished: function(evt) {
		if(this.nmeAudioCurrentLoop >= this.nmeAudioTotalLoops) {
			this.nmeAudio.removeEventListener("ended",$bind(this,this.__onSoundChannelFinished),false);
			this.nmeAudio.removeEventListener("seeked",$bind(this,this.__onSoundSeeked),false);
			this.nmeAudio.removeEventListener("stalled",$bind(this,this.__onStalled),false);
			this.nmeAudio.removeEventListener("progress",$bind(this,this.__onProgress),false);
			this.nmeAudio = null;
			var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
			evt1.target = this;
			this.dispatchEvent(evt1);
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		} else {
			this.nmeAudio.currentTime = this.nmeStartTime;
			this.nmeAudio.play();
		}
	}
	,__onProgress: function(evt) {
		haxe.Log.trace("sound progress: " + Std.string(evt),{ fileName : "SoundChannel.hx", lineNumber : 118, className : "flash.media.SoundChannel", methodName : "__onProgress"});
	}
	,stop: function() {
		if(this.nmeAudio != null) {
			this.nmeAudio.pause();
			this.nmeAudio = null;
			if(this.nmeRemoveRef != null) this.nmeRemoveRef();
		}
	}
	,nmeStartTime: null
	,nmeRemoveRef: null
	,nmeAudioTotalLoops: null
	,nmeAudioCurrentLoop: null
	,soundTransform: null
	,rightPeak: null
	,position: null
	,nmeAudio: null
	,leftPeak: null
	,ChannelId: null
	,__class__: flash.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	checkPolicyFile: null
	,bufferTime: null
	,__class__: flash.media.SoundLoaderContext
}
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	volume: null
	,rightToRight: null
	,rightToLeft: null
	,pan: null
	,leftToRight: null
	,leftToLeft: null
	,__class__: flash.media.SoundTransform
}
flash.net = {}
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	onStatus: function(status) {
		var evt = new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new flash.events.Event(flash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			this.data = flash.utils.ByteArray.nmeOfBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new flash.events.Event(flash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			var _g = this;
			switch( (_g.dataFormat)[1] ) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g1 = 0;
		while(_g1 < requestHeaders.length) {
			var header = requestHeaders[_g1];
			++_g1;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,getData: function() {
		return null;
	}
	,close: function() {
	}
	,set_dataFormat: function(inputVal) {
		if(inputVal == flash.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(js.Browser.window,"ArrayBuffer")) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,dataFormat: null
	,data: null
	,bytesTotal: null
	,bytesLoaded: null
	,__class__: flash.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = flash.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == flash.net.URLRequestMethod.GET || this.data == null) return res;
		if(js.Boot.__instanceof(this.data,String) || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) {
			res = res.slice();
			res.push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,url: null
	,requestHeaders: null
	,method: null
	,data: null
	,contentType: null
	,__class__: flash.net.URLRequest
}
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	value: null
	,name: null
	,__class__: flash.net.URLRequestHeader
}
flash.net.URLRequestMethod = function() { }
$hxClasses["flash.net.URLRequestMethod"] = flash.net.URLRequestMethod;
flash.net.URLRequestMethod.__name__ = ["flash","net","URLRequestMethod"];
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(StringTools.urlEncode(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: flash.net.URLVariables
}
flash.system = {}
flash.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.ApplicationDomain"] = flash.system.ApplicationDomain;
flash.system.ApplicationDomain.__name__ = ["flash","system","ApplicationDomain"];
flash.system.ApplicationDomain.prototype = {
	hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,parentDomain: null
	,__class__: flash.system.ApplicationDomain
}
flash.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.LoaderContext"] = flash.system.LoaderContext;
flash.system.LoaderContext.__name__ = ["flash","system","LoaderContext"];
flash.system.LoaderContext.prototype = {
	securityDomain: null
	,checkPolicyFile: null
	,applicationDomain: null
	,allowLoadBytesCodeExecution: null
	,allowCodeImport: null
	,__class__: flash.system.LoaderContext
}
flash.system.SecurityDomain = function() {
};
$hxClasses["flash.system.SecurityDomain"] = flash.system.SecurityDomain;
flash.system.SecurityDomain.__name__ = ["flash","system","SecurityDomain"];
flash.system.SecurityDomain.prototype = {
	__class__: flash.system.SecurityDomain
}
flash.ui = {}
flash.ui.Keyboard = function() { }
$hxClasses["flash.ui.Keyboard"] = flash.ui.Keyboard;
flash.ui.Keyboard.__name__ = ["flash","ui","Keyboard"];
flash.ui.Keyboard.capsLock = null;
flash.ui.Keyboard.numLock = null;
flash.ui.Keyboard.isAccessible = function() {
	return false;
}
flash.ui.Keyboard.nmeConvertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
flash.ui.Keyboard.nmeConvertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 18;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
}
flash.utils = {}
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this._nmeResizeBuffer(this.allocated);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new flash.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
}
flash.utils.ByteArray.nmeOfBuffer = function(buffer) {
	var bytes = new flash.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
flash.utils.ByteArray.prototype = {
	set_length: function(value) {
		if(this.allocated < value) this._nmeResizeBuffer(this.allocated = Math.max(value,this.allocated * 2) | 0); else if(this.allocated > value) this._nmeResizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,get_endian: function() {
		return this.littleEndian?"littleEndian":"bigEndian";
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this._nmeResizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this._nmeResizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this._nmeResizeBuffer(this.allocated = Math.max(len,this.allocated * 2) | 0); else if(this.allocated > len) this._nmeResizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = Math.max(lengthToEnsure,bytes.allocated * 2) | 0); else if(bytes.allocated > lengthToEnsure) bytes._nmeResizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,nmeSet: function(pos,v) {
		var data = this.data;
		data.setUint8(pos,v);
	}
	,nmeGetBuffer: function() {
		return this.data.buffer;
	}
	,nmeGet: function(pos) {
		var data = this.data;
		return data.getUint8(pos);
	}
	,nmeFromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,clear: function() {
		if(this.allocated < 0) this._nmeResizeBuffer(this.allocated = Math.max(0,this.allocated * 2) | 0); else if(this.allocated > 0) this._nmeResizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,_nmeResizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,littleEndian: null
	,data: null
	,byteView: null
	,allocated: null
	,position: null
	,objectEncoding: null
	,length: null
	,bytesAvailable: null
	,__class__: flash.utils.ByteArray
	,__properties__: {get_bytesAvailable:"get_bytesAvailable",set_endian:"set_endian",get_endian:"get_endian",set_length:"set_length"}
}
flash.utils.Endian = function() { }
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
flash.utils.Uuid = function() { }
$hxClasses["flash.utils.Uuid"] = flash.utils.Uuid;
flash.utils.Uuid.__name__ = ["flash","utils","Uuid"];
flash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
flash.utils.Uuid.uuid = function() {
	return flash.utils.Uuid.random(8) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(12);
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.Log = function() { }
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.content = null;
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
$hxClasses["haxe.Template"] = haxe.Template;
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	run: function(e) {
		var $e = (e);
		switch( $e[1] ) {
		case 0:
			var v = $e[2];
			this.buf.b += Std.string(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = $e[2];
			this.buf.b += Std.string(Std.string(e1()));
			break;
		case 2:
			var eelse = $e[4], eif = $e[3], e1 = $e[2];
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = $e[2];
			this.buf.b += Std.string(str);
			break;
		case 4:
			var l = $e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				this.run(e1);
			}
			break;
		case 5:
			var loop = $e[3], e1 = $e[2];
			var v = e1();
			try {
				var x = $iterator(v)();
				if(x.hasNext == null) throw null;
				v = x;
			} catch( e2 ) {
				try {
					if(v.hasNext == null) throw null;
				} catch( e3 ) {
					throw "Cannot iter on " + Std.string(v);
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			while( v1.hasNext() ) {
				var ctx = v1.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = $e[3], m = $e[2];
			var v = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				var $e = (p);
				switch( $e[1] ) {
				case 0:
					var v1 = $e[2];
					pl.push(this.resolve(v1));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.b += Std.string(Std.string(v.apply(this.macros,pl)));
			} catch( e1 ) {
				var plstr = (function($this) {
					var $r;
					try {
						$r = pl.join(",");
					} catch( e2 ) {
						$r = "???";
					}
					return $r;
				}(this));
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
				throw msg;
			}
			break;
		}
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		switch(p.p) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			return (function($this) {
				var $r;
				switch(p1.p) {
				case "+":
					$r = function() {
						return e1() + e2();
					};
					break;
				case "-":
					$r = function() {
						return e1() - e2();
					};
					break;
				case "*":
					$r = function() {
						return e1() * e2();
					};
					break;
				case "/":
					$r = function() {
						return e1() / e2();
					};
					break;
				case ">":
					$r = function() {
						return e1() > e2();
					};
					break;
				case "<":
					$r = function() {
						return e1() < e2();
					};
					break;
				case ">=":
					$r = function() {
						return e1() >= e2();
					};
					break;
				case "<=":
					$r = function() {
						return e1() <= e2();
					};
					break;
				case "==":
					$r = function() {
						return e1() == e2();
					};
					break;
				case "!=":
					$r = function() {
						return e1() != e2();
					};
					break;
				case "&&":
					$r = function() {
						return e1() && e2();
					};
					break;
				case "||":
					$r = function() {
						return e1() || e2();
					};
					break;
				default:
					$r = (function($this) {
						var $r;
						throw "Unknown operation " + p1.p;
						return $r;
					}($this));
				}
				return $r;
			}(this));
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0, _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,resolve: function(v) {
		if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,execute: function(context,macros) {
		this.macros = macros == null?{ }:macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,buf: null
	,stack: null
	,macros: null
	,context: null
	,expr: null
	,__class__: haxe.Template
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		var id = key.__id__;
		if(!this.h.hasOwnProperty(id)) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key.__id__);
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,h: null
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function() { }
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.prototype = {
	b: null
	,__class__: haxe.io.Bytes
}
haxe.io.Eof = function() { }
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.rtti = {}
haxe.rtti.Meta = function() { }
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
var integration = {}
integration.moduleinittests = {}
integration.moduleinittests.ModuleInitTests = function() {
	this.moduleInit_coreAutoInit_notNull();
	this.runAfterEveryTest();
	this.moduleInit_coreNoAutoInit_null();
	this.runAfterEveryTest();
	this.moduleInit_corePostAutoInit_notNull();
	this.runAfterEveryTest();
	this.moduleInit_movieClipAutoInit_notNull();
	this.runAfterEveryTest();
	this.moduleInit_movieClipNoAutoInit_null();
	this.runAfterEveryTest();
	this.moduleInit_movieClipPostAutoInit_notNull();
	this.runAfterEveryTest();
	this.moduleInit_spriteAutoInit_notNull();
	this.runAfterEveryTest();
	this.moduleInit_spriteNoAutoInit_null();
	this.runAfterEveryTest();
	this.moduleInit_spritePostAutoInit_notNull();
	this.runAfterEveryTest();
};
$hxClasses["integration.moduleinittests.ModuleInitTests"] = integration.moduleinittests.ModuleInitTests;
integration.moduleinittests.ModuleInitTests.__name__ = ["integration","moduleinittests","ModuleInitTests"];
integration.moduleinittests.ModuleInitTests.prototype = {
	moduleInit_spritePostAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleSprite(false);
		this.module = testModule;
		testModule.start();
		utils.Assert.assertNotNull("ModuleSprite proxyMap should be not null after later init",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleSprite commandMap should be not null after later init",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleSprite mediatorMap should be not null after later init",testModule.getMediatorMap());
	}
	,moduleInit_spriteNoAutoInit_null: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleSprite(false);
		this.module = testModule;
		utils.Assert.assertNull("ModuleSprite proxyMap should be null after no autoInit",testModule.getProxyMap());
		utils.Assert.assertNull("ModuleSprite commandMap should be null after no autoInit",testModule.getCommandMap());
		utils.Assert.assertNull("ModuleSprite mediatorMap should be null after no autoInit",testModule.getMediatorMap());
	}
	,moduleInit_spriteAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleSprite(true);
		this.module = testModule;
		utils.Assert.assertNotNull("ModuleSprite proxyMap should be not null after autoInit",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleSprite commandMap should be not null after autoInit",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleSprite mediatorMap should be not null after autoInit",testModule.getMediatorMap());
	}
	,moduleInit_movieClipPostAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleMovieClip(false);
		this.module = testModule;
		testModule.start();
		utils.Assert.assertNotNull("ModuleMovieClip proxyMap should be not null after later init",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleMovieClip commandMap should be not null after later init",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleMovieClip mediatorMap should be not null after later init",testModule.getMediatorMap());
	}
	,moduleInit_movieClipNoAutoInit_null: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleMovieClip(false);
		this.module = testModule;
		utils.Assert.assertNull("ModuleMovieClip proxyMap should be null after no autoInit",testModule.getProxyMap());
		utils.Assert.assertNull("ModuleMovieClip commandMap should be null after no autoInit",testModule.getCommandMap());
		utils.Assert.assertNull("ModuleMovieClip mediatorMap should be null after no autoInit",testModule.getMediatorMap());
	}
	,moduleInit_movieClipAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleMovieClip(true);
		this.module = testModule;
		utils.Assert.assertNotNull("ModuleMovieClip proxyMap should be not null after autoInit",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleMovieClip commandMap should be not null after autoInit",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleMovieClip mediatorMap should be not null after autoInit",testModule.getMediatorMap());
	}
	,moduleInit_corePostAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleCore(false);
		this.module = testModule;
		testModule.start();
		utils.Assert.assertNotNull("ModuleCore proxyMap should be not null after later init",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleCore commandMap should be not null after later init",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleCore mediatorMap should be not null after later init",testModule.getMediatorMap());
	}
	,moduleInit_coreNoAutoInit_null: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleCore(false);
		this.module = testModule;
		utils.Assert.assertNull("ModuleCore proxyMap should be null after no autoInit",testModule.getProxyMap());
		utils.Assert.assertNull("ModuleCore commandMap should be null after no autoInit",testModule.getCommandMap());
		utils.Assert.assertNull("ModuleCore mediatorMap should be null after no autoInit",testModule.getMediatorMap());
	}
	,moduleInit_coreAutoInit_notNull: function() {
		var testModule = new integration.moduleinittests.testobj.InitTestModuleCore(true);
		this.module = testModule;
		utils.Assert.assertNotNull("ModuleCore proxyMap should be not null after autoInit",testModule.getProxyMap());
		utils.Assert.assertNotNull("ModuleCore commandMap should be not null after autoInit",testModule.getCommandMap());
		utils.Assert.assertNotNull("ModuleCore mediatorMap should be not null after autoInit",testModule.getMediatorMap());
	}
	,runAfterEveryTest: function() {
		if(this.module) this.module.disposeModule();
	}
	,module: null
	,__class__: integration.moduleinittests.ModuleInitTests
}
var mvcexpress = {}
mvcexpress.modules = {}
mvcexpress.modules.ModuleCore = function(moduleName,autoInit) {
	if(autoInit == null) autoInit = true;
	this.moduleBase = mvcexpress.core.ModuleManager.createModule(moduleName,autoInit);
	if(autoInit) {
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		this.onInit();
	}
};
$hxClasses["mvcexpress.modules.ModuleCore"] = mvcexpress.modules.ModuleCore;
mvcexpress.modules.ModuleCore.__name__ = ["mvcexpress","modules","ModuleCore"];
mvcexpress.modules.ModuleCore.prototype = {
	listMappedCommands: function() {
		return this.moduleBase.listMappedCommands();
	}
	,listMappedProxies: function() {
		return this.moduleBase.listMappedProxies();
	}
	,listMappedMediators: function() {
		return this.moduleBase.listMappedMediators();
	}
	,listMappedMessages: function() {
		return this.moduleBase.listMappedMessages();
	}
	,unregisterScope: function(scopeName) {
		this.moduleBase.unregisterScope(scopeName);
	}
	,registerScope: function(scopeName,messageSending,messageReceiving,proxieMapping) {
		if(proxieMapping == null) proxieMapping = false;
		if(messageReceiving == null) messageReceiving = true;
		if(messageSending == null) messageSending = true;
		this.moduleBase.registerScope(scopeName,messageSending,messageReceiving,proxieMapping);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		this.moduleBase.sendScopeMessage(scopeName,type,params);
	}
	,sendMessage: function(type,params) {
		this.moduleBase.sendMessage(type,params);
	}
	,onDispose: function() {
	}
	,disposeModule: function() {
		this.onDispose();
		this.moduleBase.disposeModule();
	}
	,onInit: function() {
	}
	,initModule: function() {
		this.moduleBase.initModule();
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		this.onInit();
	}
	,get_moduleName: function() {
		return this.moduleBase.get_moduleName();
	}
	,commandMap: null
	,mediatorMap: null
	,proxyMap: null
	,moduleBase: null
	,__class__: mvcexpress.modules.ModuleCore
	,__properties__: {get_moduleName:"get_moduleName"}
}
integration.moduleinittests.testobj = {}
integration.moduleinittests.testobj.InitTestModuleCore = function(autoInit) {
	mvcexpress.modules.ModuleCore.call(this,integration.moduleinittests.testobj.InitTestModuleCore.NAME,autoInit);
};
$hxClasses["integration.moduleinittests.testobj.InitTestModuleCore"] = integration.moduleinittests.testobj.InitTestModuleCore;
integration.moduleinittests.testobj.InitTestModuleCore.__name__ = ["integration","moduleinittests","testobj","InitTestModuleCore"];
integration.moduleinittests.testobj.InitTestModuleCore.__super__ = mvcexpress.modules.ModuleCore;
integration.moduleinittests.testobj.InitTestModuleCore.prototype = $extend(mvcexpress.modules.ModuleCore.prototype,{
	getMediatorMap: function() {
		return this.mediatorMap;
	}
	,getCommandMap: function() {
		return this.commandMap;
	}
	,getProxyMap: function() {
		return this.proxyMap;
	}
	,onDispose: function() {
	}
	,start: function() {
		this.initModule();
	}
	,onInit: function() {
	}
	,__class__: integration.moduleinittests.testobj.InitTestModuleCore
});
mvcexpress.modules.ModuleMovieClip = function(moduleName,autoInit,initOnStage) {
	if(initOnStage == null) initOnStage = true;
	if(autoInit == null) autoInit = true;
	flash.display.MovieClip.call(this);
	this.moduleBase = mvcexpress.core.ModuleManager.createModule(moduleName,autoInit);
	if(autoInit) {
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		if(initOnStage) {
			if(this.get_stage() != null) this.onInit(); else this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.handleModuleAddedToStage),false,0,true);
		} else this.onInit();
	}
};
$hxClasses["mvcexpress.modules.ModuleMovieClip"] = mvcexpress.modules.ModuleMovieClip;
mvcexpress.modules.ModuleMovieClip.__name__ = ["mvcexpress","modules","ModuleMovieClip"];
mvcexpress.modules.ModuleMovieClip.__super__ = flash.display.MovieClip;
mvcexpress.modules.ModuleMovieClip.prototype = $extend(flash.display.MovieClip.prototype,{
	listMappedCommands: function() {
		return this.moduleBase.listMappedCommands();
	}
	,listMappedProxies: function() {
		return this.moduleBase.listMappedProxies();
	}
	,listMappedMediators: function() {
		return this.moduleBase.listMappedMediators();
	}
	,listMappedMessages: function() {
		return this.moduleBase.listMappedMessages();
	}
	,unregisterScope: function(scopeName) {
		this.moduleBase.unregisterScope(scopeName);
	}
	,registerScope: function(scopeName,messageSending,messageReceiving,proxieMapping) {
		if(proxieMapping == null) proxieMapping = false;
		if(messageReceiving == null) messageReceiving = true;
		if(messageSending == null) messageSending = true;
		this.moduleBase.registerScope(scopeName,messageSending,messageReceiving,proxieMapping);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		this.moduleBase.sendScopeMessage(scopeName,type,params);
	}
	,sendMessage: function(type,params) {
		this.moduleBase.sendMessage(type,params);
	}
	,onDispose: function() {
	}
	,disposeModule: function() {
		this.onDispose();
		this.moduleBase.disposeModule();
	}
	,onInit: function() {
	}
	,initModule: function() {
		this.moduleBase.initModule();
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		this.onInit();
	}
	,get_moduleName: function() {
		return this.moduleBase.get_moduleName();
	}
	,handleModuleAddedToStage: function(event) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.handleModuleAddedToStage));
		this.onInit();
	}
	,commandMap: null
	,mediatorMap: null
	,proxyMap: null
	,moduleBase: null
	,__class__: mvcexpress.modules.ModuleMovieClip
	,__properties__: $extend(flash.display.MovieClip.prototype.__properties__,{get_moduleName:"get_moduleName"})
});
integration.moduleinittests.testobj.InitTestModuleMovieClip = function(autoInit) {
	mvcexpress.modules.ModuleMovieClip.call(this,integration.moduleinittests.testobj.InitTestModuleMovieClip.NAME,autoInit);
};
$hxClasses["integration.moduleinittests.testobj.InitTestModuleMovieClip"] = integration.moduleinittests.testobj.InitTestModuleMovieClip;
integration.moduleinittests.testobj.InitTestModuleMovieClip.__name__ = ["integration","moduleinittests","testobj","InitTestModuleMovieClip"];
integration.moduleinittests.testobj.InitTestModuleMovieClip.__super__ = mvcexpress.modules.ModuleMovieClip;
integration.moduleinittests.testobj.InitTestModuleMovieClip.prototype = $extend(mvcexpress.modules.ModuleMovieClip.prototype,{
	getMediatorMap: function() {
		return this.mediatorMap;
	}
	,getCommandMap: function() {
		return this.commandMap;
	}
	,getProxyMap: function() {
		return this.proxyMap;
	}
	,onDispose: function() {
	}
	,start: function() {
		this.initModule();
	}
	,onInit: function() {
	}
	,__class__: integration.moduleinittests.testobj.InitTestModuleMovieClip
});
mvcexpress.modules.ModuleSprite = function(moduleName,autoInit,initOnStage) {
	if(initOnStage == null) initOnStage = true;
	if(autoInit == null) autoInit = true;
	flash.display.Sprite.call(this);
	this.moduleBase = mvcexpress.core.ModuleManager.createModule(moduleName,autoInit);
	if(autoInit) {
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		if(initOnStage) {
			if(this.get_stage() != null) this.onInit(); else this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.handleModuleAddedToStage),false,0,true);
		} else this.onInit();
	}
};
$hxClasses["mvcexpress.modules.ModuleSprite"] = mvcexpress.modules.ModuleSprite;
mvcexpress.modules.ModuleSprite.__name__ = ["mvcexpress","modules","ModuleSprite"];
mvcexpress.modules.ModuleSprite.__super__ = flash.display.Sprite;
mvcexpress.modules.ModuleSprite.prototype = $extend(flash.display.Sprite.prototype,{
	listMappedCommands: function() {
		return this.moduleBase.listMappedCommands();
	}
	,listMappedProxies: function() {
		return this.moduleBase.listMappedProxies();
	}
	,listMappedMediators: function() {
		return this.moduleBase.listMappedMediators();
	}
	,listMappedMessages: function() {
		return this.moduleBase.listMappedMessages();
	}
	,unregisterScope: function(scopeName) {
		this.moduleBase.unregisterScope(scopeName);
	}
	,registerScope: function(scopeName,messageSending,messageReceiving,proxieMapping) {
		if(proxieMapping == null) proxieMapping = false;
		if(messageReceiving == null) messageReceiving = true;
		if(messageSending == null) messageSending = true;
		this.moduleBase.registerScope(scopeName,messageSending,messageReceiving,proxieMapping);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		this.moduleBase.sendScopeMessage(scopeName,type,params);
	}
	,sendMessage: function(type,params) {
		this.moduleBase.sendMessage(type,params);
	}
	,onDispose: function() {
	}
	,disposeModule: function() {
		this.onDispose();
		this.moduleBase.disposeModule();
	}
	,onInit: function() {
	}
	,initModule: function() {
		this.moduleBase.initModule();
		this.proxyMap = this.moduleBase.proxyMap;
		this.mediatorMap = this.moduleBase.mediatorMap;
		this.commandMap = this.moduleBase.commandMap;
		this.onInit();
	}
	,get_moduleName: function() {
		return this.moduleBase.get_moduleName();
	}
	,handleModuleAddedToStage: function(event) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.handleModuleAddedToStage));
		this.onInit();
	}
	,commandMap: null
	,mediatorMap: null
	,proxyMap: null
	,moduleBase: null
	,__class__: mvcexpress.modules.ModuleSprite
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_moduleName:"get_moduleName"})
});
integration.moduleinittests.testobj.InitTestModuleSprite = function(autoInit) {
	mvcexpress.modules.ModuleSprite.call(this,integration.moduleinittests.testobj.InitTestModuleSprite.NAME,autoInit);
};
$hxClasses["integration.moduleinittests.testobj.InitTestModuleSprite"] = integration.moduleinittests.testobj.InitTestModuleSprite;
integration.moduleinittests.testobj.InitTestModuleSprite.__name__ = ["integration","moduleinittests","testobj","InitTestModuleSprite"];
integration.moduleinittests.testobj.InitTestModuleSprite.__super__ = mvcexpress.modules.ModuleSprite;
integration.moduleinittests.testobj.InitTestModuleSprite.prototype = $extend(mvcexpress.modules.ModuleSprite.prototype,{
	getMediatorMap: function() {
		return this.mediatorMap;
	}
	,getCommandMap: function() {
		return this.commandMap;
	}
	,getProxyMap: function() {
		return this.proxyMap;
	}
	,onDispose: function() {
	}
	,start: function() {
		this.initModule();
	}
	,onInit: function() {
	}
	,__class__: integration.moduleinittests.testobj.InitTestModuleSprite
});
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
mvcexpress.MvcExpress = function() {
};
$hxClasses["mvcexpress.MvcExpress"] = mvcexpress.MvcExpress;
mvcexpress.MvcExpress.__name__ = ["mvcexpress","MvcExpress"];
mvcexpress.MvcExpress.__properties__ = {get_DEBUG_COMPILE:"get_DEBUG_COMPILE",get_VERSION:"get_VERSION"}
mvcexpress.MvcExpress.get_VERSION = function() {
	return "v" + mvcexpress.MvcExpress.MAJOR_VERSION + "." + mvcexpress.MvcExpress.MINOR_VERSION + "." + mvcexpress.MvcExpress.REVISION;
}
mvcexpress.MvcExpress.get_DEBUG_COMPILE = function() {
	return true;
	return false;
}
mvcexpress.MvcExpress.debug = function(traceObj) {
	if(mvcexpress.MvcExpress.debugFunction != null) {
		if(traceObj.canPrint) mvcexpress.MvcExpress.debugFunction(traceObj);
	}
	if(mvcexpress.MvcExpress.loggerFunction != null) mvcexpress.MvcExpress.loggerFunction(traceObj);
}
mvcexpress.MvcExpress.prototype = {
	__class__: mvcexpress.MvcExpress
}
mvcexpress.core = {}
mvcexpress.core.CommandMap = function(moduleName,messenger,proxyMap,mediatorMap) {
	this.classRegistry = new haxe.ds.StringMap();
	this.commandPools = new haxe.ds.ObjectMap();
	this.scopeHandlers = new Array();
	this.moduleName = moduleName;
	this.messenger = messenger;
	this.proxyMap = proxyMap;
	this.mediatorMap = mediatorMap;
};
$hxClasses["mvcexpress.core.CommandMap"] = mvcexpress.core.CommandMap;
mvcexpress.core.CommandMap.__name__ = ["mvcexpress","core","CommandMap"];
mvcexpress.core.CommandMap.prototype = {
	listMessageCommands: function(messageType) {
		return this.classRegistry.get(messageType);
	}
	,validateCommandParams: function(commandClass,params) {
		this.validateCommandClass(commandClass);
		if(params) {
			var paramClass = Type.getClass(mvcexpress.core.CommandMap.commandClassParamTypes.h[commandClass.__id__]);
			if(!js.Boot.__instanceof(params,paramClass)) throw "Class " + Std.string(commandClass) + " expects " + Std.string(mvcexpress.core.CommandMap.commandClassParamTypes.h[commandClass.__id__]) + ". But you are sending :" + Std.string(Type.resolveClass(params));
		}
	}
	,validateCommandClass: function(commandClass) {
		if(mvcexpress.core.CommandMap.validatedCommands.h[commandClass.__id__] != true) {
			if(js.Boot.__instanceof(Type.getSuperClass(commandClass),mvcexpress.mvc.Command)) throw "commandClass:" + Std.string(commandClass) + " you are trying to map MUST extend: 'mvcexpress.mvc.Command' class.";
			if(mvcexpress.core.CommandMap.commandClassParamTypes.h[commandClass.__id__] == null) {
				var parameterCount;
				var hasExecute = Reflect.hasField(Type.createEmptyInstance(commandClass),"execute");
				if(hasExecute) {
				} else throw "Command:" + Std.string(commandClass) + " must have public execute() function with single parameter.";
			}
			mvcexpress.core.CommandMap.validatedCommands.set(commandClass,true);
		}
	}
	,handleCommandExecute: function(messageType,params) {
		var command;
		var messageClasses;
		messageClasses = this.classRegistry.get(messageType);
		if(messageClasses != null) {
			var commandCount = messageClasses.length;
			var i = 0;
			while(i < commandCount) {
				var commandClass = messageClasses[i];
				mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute(this.moduleName,null,commandClass,messageType,params));
				var pooledCommands = this.commandPools.h[commandClass.__id__];
				if(pooledCommands != null && pooledCommands.length > 0) command = pooledCommands.shift(); else {
					this.validateCommandParams(commandClass,params);
					mvcexpress.mvc.Command.canConstruct = true;
					command = Type.createInstance(commandClass,[]);
					mvcexpress.mvc.Command.canConstruct = false;
					command.messenger = this.messenger;
					command.mediatorMap = this.mediatorMap;
					command.proxyMap = this.proxyMap;
					command.commandMap = this;
					this.proxyMap.injectStuff(command,commandClass);
				}
				command.messageType = messageType;
				if(js.Boot.__instanceof(command,mvcexpress.mvc.PooledCommand)) {
					if(pooledCommands == null) {
						pooledCommands = new Array();
						this.commandPools.set(commandClass,pooledCommands);
					}
					command.isExecuting = true;
					Reflect.field(command,"execute").apply(command,[]);
					command.isExecuting = false;
					if(!(js.Boot.__cast(command , mvcexpress.mvc.PooledCommand)).get_isLocked()) {
						if(pooledCommands != null) pooledCommands[pooledCommands.length] = js.Boot.__cast(command , mvcexpress.mvc.PooledCommand);
					}
				} else {
					command.isExecuting = true;
					Reflect.field(command,"execute").apply(command,[]);
					command.isExecuting = false;
				}
				i++;
			}
		}
	}
	,dispose: function() {
		var _g = 0, _g1 = Reflect.fields(this.classRegistry);
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			this.messenger.removeHandler(type,$bind(this,this.handleCommandExecute));
		}
		var scopeHandlerCount = this.scopeHandlers.length;
		var i = 0;
		while(i < scopeHandlerCount) {
			this.scopeHandlers[i].handler = null;
			i++;
		}
		this.messenger = null;
		this.proxyMap = null;
		this.mediatorMap = null;
		this.classRegistry = null;
		this.commandPools = null;
	}
	,poolCommand: function(command) {
		var commandClass = Type.getClass(command);
		var pooledCommands = this.commandPools.h[commandClass.__id__];
		if(pooledCommands == null) pooledCommands[pooledCommands.length] = command;
	}
	,listMappings: function() {
		var retVal = "";
		retVal = "===================== CommandMap Mappings: =====================\n";
		var _g = 0, _g1 = Reflect.fields(this.classRegistry);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			retVal += "SENDING MESSAGE:'" + key + "'\t> EXECUTES > " + Std.string(this.classRegistry.get(key)) + "\n";
		}
		retVal += "================================================================\n";
		return retVal;
	}
	,mappedCommandCount: function(type) {
		if(this.classRegistry.get(type) != null) return this.classRegistry.get(type).length;
		return 0;
	}
	,isMapped: function(type,commandClass) {
		var retVal = false;
		if(this.classRegistry.get(type) != null) {
			var mappedClasses = this.classRegistry.get(type);
			var classCaunt = mappedClasses.length;
			var i = 0;
			while(i < classCaunt) {
				if(commandClass == mappedClasses[i]) retVal = true;
				i++;
			}
		}
		return retVal;
	}
	,clearCommandPool: function(commandClass) {
		this.commandPools.remove(commandClass);
	}
	,checkIsClassPooled: function(commandClass) {
		return this.commandPools.h[commandClass.__id__] != null;
	}
	,scopeUnmap: function(scopeName,type,commandClass) {
		var scopedType = scopeName + "_^~_" + type;
		var messageClasses = this.classRegistry.get(scopedType);
		if(messageClasses != null) {
			var commandCount = messageClasses.length;
			var i = 0;
			while(i < commandCount) {
				if(commandClass == messageClasses[i]) {
					messageClasses.splice(i,1);
					break;
				}
				i++;
			}
		}
	}
	,scopeMap: function(scopeName,type,commandClass) {
		var scopedType = scopeName + "_^~_" + type;
		var messageClasses = this.classRegistry.get(scopedType);
		if(messageClasses == null) {
			messageClasses = new Array();
			this.classRegistry.set(scopedType,messageClasses);
			messageClasses;
			this.scopeHandlers[this.scopeHandlers.length] = mvcexpress.core.ModuleManager.scopedCommandMap(this.moduleName,$bind(this,this.handleCommandExecute),scopeName,type,commandClass);
		}
		messageClasses[messageClasses.length] = commandClass;
	}
	,execute: function(commandClass,params) {
		var command;
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute(this.moduleName,null,commandClass,params));
		var pooledCommands = this.commandPools.h[commandClass.__id__];
		if(pooledCommands != null && pooledCommands.length > 0) command = pooledCommands.shift(); else {
			this.validateCommandParams(commandClass,params);
			mvcexpress.mvc.Command.canConstruct = true;
			command = Type.createInstance(commandClass,[]);
			mvcexpress.mvc.Command.canConstruct = false;
			command.messenger = this.messenger;
			command.mediatorMap = this.mediatorMap;
			command.proxyMap = this.proxyMap;
			command.commandMap = this;
			this.proxyMap.injectStuff(command,commandClass);
		}
		if(js.Boot.__instanceof(command,mvcexpress.mvc.PooledCommand)) {
			if(pooledCommands == null) {
				pooledCommands = new Array();
				this.commandPools.set(commandClass,pooledCommands);
			}
			command.messageType = null;
			command.isExecuting = true;
			Reflect.callMethod(command,Reflect.field(command,"execute"),params);
			command.isExecuting = false;
			if(!(js.Boot.__cast(command , mvcexpress.mvc.PooledCommand)).get_isLocked()) {
				if(pooledCommands != null) pooledCommands[pooledCommands.length] = js.Boot.__cast(command , mvcexpress.mvc.PooledCommand);
			}
		} else {
			command.isExecuting = true;
			Reflect.field(command,"execute").apply(command,[]);
			command.isExecuting = false;
		}
	}
	,unmap: function(type,commandClass) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap(this.moduleName,type,commandClass));
		var messageClasses = this.classRegistry.get(type);
		if(messageClasses != null) {
			var commandCount = messageClasses.length;
			var i = 0;
			while(i < commandCount) {
				if(commandClass == messageClasses[i]) {
					messageClasses.splice(i,1);
					break;
				}
				i++;
			}
		}
	}
	,map: function(type,commandClass) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map(this.moduleName,type,commandClass));
		this.validateCommandClass(commandClass);
		if(!js.Boot.__cast(type , Bool) || type == "null" || type == "undefined") throw "Message type:[" + type + "] can not be empty or 'null' or 'undefined'. (You are trying to map command:" + Std.string(commandClass) + ")";
		var messageClasses = this.classRegistry.get(type);
		if(messageClasses == null) {
			messageClasses = new Array();
			this.classRegistry.set(type,messageClasses);
			messageClasses;
			this.messenger.addCommandHandler(type,$bind(this,this.handleCommandExecute),commandClass);
		}
		messageClasses[messageClasses.length] = commandClass;
	}
	,scopeHandlers: null
	,commandPools: null
	,classRegistry: null
	,mediatorMap: null
	,proxyMap: null
	,messenger: null
	,moduleName: null
	,__class__: mvcexpress.core.CommandMap
}
mvcexpress.core.interfaces = {}
mvcexpress.core.interfaces.IMediatorMap = function() { }
$hxClasses["mvcexpress.core.interfaces.IMediatorMap"] = mvcexpress.core.interfaces.IMediatorMap;
mvcexpress.core.interfaces.IMediatorMap.__name__ = ["mvcexpress","core","interfaces","IMediatorMap"];
mvcexpress.core.interfaces.IMediatorMap.prototype = {
	isViewMapped: null
	,unmediate: null
	,mediateWith: null
	,mediate: null
	,__class__: mvcexpress.core.interfaces.IMediatorMap
}
mvcexpress.core.MediatorMap = function(moduleName,messenger,proxyMap) {
	this.mediatorClassRegistry = new haxe.ds.ObjectMap();
	this.mediatorInjectRegistry = new haxe.ds.ObjectMap();
	this.mediatorRegistry = new haxe.ds.ObjectMap();
	this.moduleName = moduleName;
	this.messenger = messenger;
	this.proxyMap = proxyMap;
};
$hxClasses["mvcexpress.core.MediatorMap"] = mvcexpress.core.MediatorMap;
mvcexpress.core.MediatorMap.__name__ = ["mvcexpress","core","MediatorMap"];
mvcexpress.core.MediatorMap.__interfaces__ = [mvcexpress.core.interfaces.IMediatorMap];
mvcexpress.core.MediatorMap.prototype = {
	dispose: function() {
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this.mediatorRegistry))();
		while( $it0.hasNext() ) {
			var viewObject = $it0.next();
			this.unmediate(viewObject);
		}
		this.proxyMap = null;
		this.messenger = null;
		this.mediatorClassRegistry = null;
		this.mediatorInjectRegistry = null;
		this.mediatorRegistry = null;
	}
	,listMappings: function() {
		var retVal = "";
		retVal = "==================== MediatorMap Mappings: =====================\n";
		var _g = 0, _g1 = Reflect.fields(this.mediatorClassRegistry);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			retVal += "VIEW:'" + key + "'\t> MEDIATED BY > " + Std.string(Reflect.field(this.mediatorClassRegistry,key)) + "\n";
		}
		retVal += "================================================================\n";
		return retVal;
	}
	,isMediated: function(viewObject) {
		return (function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.exists(key);
			return $r;
		}(this));
	}
	,isViewMapped: function(viewObject) {
		var retVal = false;
		var viewClass = Type.getClass(viewObject);
		if(this.mediatorClassRegistry.h.hasOwnProperty(viewClass.__id__)) retVal = true;
		return retVal;
	}
	,isMapped: function(viewClass,mediatorClass) {
		return this.mediatorClassRegistry.h.hasOwnProperty(viewClass.__id__) && mediatorClass != null && this.mediatorClassRegistry.h[viewClass.__id__] == mediatorClass;
	}
	,unmediate: function(viewObject) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate(this.moduleName,viewObject));
		if((function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.exists(key);
			return $r;
		}(this))) {
			var mediator = (function($this) {
				var $r;
				var key = viewObject;
				$r = $this.mediatorRegistry.get(key);
				return $r;
			}(this));
			mediator.remove();
			var key = viewObject;
			this.mediatorRegistry.remove(key);
		} else throw "View object:" + Std.string(viewObject) + " has no mediator created for it.";
	}
	,mediateWith: function(viewObject,mediatorClass,injectClass) {
		if((function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.exists(key);
			return $r;
		}(this))) throw "This view object is already mediated by " + Std.string((function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.get(key);
			return $r;
		}(this)));
		var mediator = Type.createInstance(mediatorClass,[]);
		var viewClass = Type.getClass(viewObject.constructor);
		if(injectClass == null) injectClass = viewClass;
		mediator.moduleName = this.moduleName;
		mediator.messenger = this.messenger;
		mediator.proxyMap = this.proxyMap;
		mediator.mediatorMap = this;
		var isAllInjected = this.proxyMap.injectStuff(mediator,mediatorClass,viewObject,injectClass);
		var key = viewObject;
		this.mediatorRegistry.set(key,mediator);
		if(isAllInjected) mediator.register();
	}
	,mediate: function(viewObject) {
		if((function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.exists(key);
			return $r;
		}(this))) throw "This view object is already mediated by " + Std.string((function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.get(key);
			return $r;
		}(this)));
		var viewClass = Type.getClass(viewObject);
		var injectClass = this.mediatorInjectRegistry.h[viewClass.__id__];
		var mediatorClass = this.mediatorClassRegistry.h[viewClass.__id__];
		if(mediatorClass != null) {
			mvcexpress.mvc.Mediator.canConstruct = true;
			var mediator = Type.createInstance(mediatorClass,[]);
			mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate(this.moduleName,viewObject,mediator,viewClass,mediatorClass,Type.getClassName(mediatorClass)));
			mvcexpress.mvc.Mediator.canConstruct = false;
			mediator.moduleName = this.moduleName;
			mediator.messenger = this.messenger;
			mediator.proxyMap = this.proxyMap;
			mediator.mediatorMap = this;
			var isAllInjected = this.proxyMap.injectStuff(mediator,mediatorClass,viewObject,injectClass);
			var key = viewObject;
			this.mediatorRegistry.set(key,mediator);
			if(isAllInjected) mediator.register();
		} else throw "View object" + Std.string(viewObject) + " class is not mapped with any mediator class. use mediatorMap.map()";
	}
	,unmap: function(viewClass) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap(this.moduleName,viewClass));
		this.mediatorClassRegistry.remove(viewClass);
		this.mediatorInjectRegistry.remove(viewClass);
	}
	,map: function(viewClass,mediatorClass,injectClass) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map(this.moduleName,viewClass,mediatorClass));
		if(!mvcexpress.utils.MvcExpressTools.checkClassSuperClass(mediatorClass,mvcexpress.mvc.Mediator)) throw "mediatorClass:" + Std.string(mediatorClass) + " you are trying to map is not extended from 'mvcexpress.mvc::Mediator' class.";
		if(this.mediatorClassRegistry.h.hasOwnProperty(viewClass.__id__)) throw "Mediator class:" + Std.string(this.mediatorClassRegistry.h[viewClass.__id__]) + " is already mapped with this view class:" + Std.string(viewClass) + "";
		this.mediatorClassRegistry.set(viewClass,mediatorClass);
		if(injectClass == null) injectClass = viewClass;
		this.mediatorInjectRegistry.set(viewClass,injectClass);
	}
	,mediatorRegistry: null
	,mediatorInjectRegistry: null
	,mediatorClassRegistry: null
	,messenger: null
	,proxyMap: null
	,moduleName: null
	,__class__: mvcexpress.core.MediatorMap
}
mvcexpress.core.FlexMediatorMap = function(moduleName,messenger,proxyMap,uiComponentClass) {
	mvcexpress.core.MediatorMap.call(this,moduleName,messenger,proxyMap);
	this.uiComponentClass = uiComponentClass;
};
$hxClasses["mvcexpress.core.FlexMediatorMap"] = mvcexpress.core.FlexMediatorMap;
mvcexpress.core.FlexMediatorMap.__name__ = ["mvcexpress","core","FlexMediatorMap"];
mvcexpress.core.FlexMediatorMap.__super__ = mvcexpress.core.MediatorMap;
mvcexpress.core.FlexMediatorMap.prototype = $extend(mvcexpress.core.MediatorMap.prototype,{
	unmediate: function(viewObject) {
		var mediator = (function($this) {
			var $r;
			var key = viewObject;
			$r = $this.mediatorRegistry.get(key);
			return $r;
		}(this));
		if(mediator != null) mvcexpress.core.MediatorMap.prototype.unmediate.call(this,viewObject); else if((js.Boot.__cast(viewObject , flash.events.IEventDispatcher)).hasEventListener("creationComplete")) (js.Boot.__cast(viewObject , flash.events.IEventDispatcher)).removeEventListener("creationComplete",$bind(this,this.handleOnCreationComplete));
	}
	,handleOnCreationComplete: function(event) {
		(js.Boot.__cast(event.target , flash.events.IEventDispatcher)).removeEventListener("creationComplete",$bind(this,this.handleOnCreationComplete));
		mvcexpress.core.MediatorMap.prototype.mediate.call(this,event.target);
	}
	,mediate: function(viewObject) {
		if(js.Boot.__instanceof(viewObject,this.uiComponentClass) && !Reflect.hasField(viewObject,"initialized")) (js.Boot.__cast(viewObject , flash.events.IEventDispatcher)).addEventListener("creationComplete",$bind(this,this.handleOnCreationComplete),false,0,true); else mvcexpress.core.MediatorMap.prototype.mediate.call(this,viewObject);
	}
	,uiComponentClass: null
	,__class__: mvcexpress.core.FlexMediatorMap
});
mvcexpress.core.ModuleBase = function(moduleName,autoInit) {
	if(!mvcexpress.core.ModuleBase.allowInstantiation) throw "ModuleBase is framework internal class and is not meant to be instantiated. Use ModuleCore, ModuleSprite or other module classes instead.";
	this._moduleName = moduleName;
	if(autoInit) this.initModule();
};
$hxClasses["mvcexpress.core.ModuleBase"] = mvcexpress.core.ModuleBase;
mvcexpress.core.ModuleBase.__name__ = ["mvcexpress","core","ModuleBase"];
mvcexpress.core.ModuleBase.allowInstantiation = null;
mvcexpress.core.ModuleBase.getModuleInstance = function(moduleName,autoInit) {
	var retVal;
	mvcexpress.core.ModuleBase.allowInstantiation = true;
	retVal = new mvcexpress.core.ModuleBase(moduleName,autoInit);
	mvcexpress.core.ModuleBase.allowInstantiation = false;
	return retVal;
}
mvcexpress.core.ModuleBase.getFlexClass = function() {
	return Type.resolveClass("mx.core.UIComponent");
}
mvcexpress.core.ModuleBase.prototype = {
	listMappedCommands: function() {
		return this.commandMap.listMappings();
	}
	,listMappedProxies: function() {
		return this.proxyMap.listMappings();
	}
	,listMappedMediators: function() {
		return this.mediatorMap.listMappings();
	}
	,listMappedMessages: function() {
		return this._messenger.listMappings(this.commandMap);
	}
	,unregisterScope: function(scopeName) {
		mvcexpress.core.ModuleManager.unregisterScope(this._moduleName,scopeName);
	}
	,registerScope: function(scopeName,messageSending,messageReceiving,proxieMap) {
		if(proxieMap == null) proxieMap = false;
		if(messageReceiving == null) messageReceiving = true;
		if(messageSending == null) messageSending = true;
		mvcexpress.core.ModuleManager.registerScope(this._moduleName,scopeName,messageSending,messageReceiving,proxieMap);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage(this._moduleName,this,type,params,true));
		mvcexpress.core.ModuleManager.sendScopeMessage(this._moduleName,scopeName,type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage(this._moduleName,this,type,params,false));
	}
	,sendMessage: function(type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage(this._moduleName,this,type,params,true));
		this._messenger.send(type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage(this._moduleName,this,type,params,false));
	}
	,disposeModule: function() {
		if(this.commandMap != null) {
			this.commandMap.dispose();
			this.commandMap = null;
		}
		if(this.mediatorMap != null) {
			this.mediatorMap.dispose();
			this.mediatorMap = null;
		}
		if(this.proxyMap != null) {
			this.proxyMap.dispose();
			this.proxyMap = null;
		}
		this._messenger = null;
		mvcexpress.core.ModuleManager.disposeModule(this._moduleName);
	}
	,initModule: function() {
		if(this._messenger != null) throw "Module can be initiated only once.";
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this._messenger = new mvcexpress.core.messenger.Messenger(this._moduleName);
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		this.proxyMap = new mvcexpress.core.ProxyMap(this._moduleName,this._messenger);
		var uiComponentClass = mvcexpress.core.ModuleBase.getFlexClass();
		if(uiComponentClass != null) this.mediatorMap = new mvcexpress.core.FlexMediatorMap(this._moduleName,this._messenger,this.proxyMap,uiComponentClass); else this.mediatorMap = new mvcexpress.core.MediatorMap(this._moduleName,this._messenger,this.proxyMap);
		this.commandMap = new mvcexpress.core.CommandMap(this._moduleName,this._messenger,this.proxyMap,this.mediatorMap);
		this.proxyMap.setCommandMap(this.commandMap);
	}
	,get_messenger: function() {
		return this._messenger;
	}
	,get_moduleName: function() {
		return this._moduleName;
	}
	,_messenger: null
	,mediatorMap: null
	,proxyMap: null
	,commandMap: null
	,_moduleName: null
	,__class__: mvcexpress.core.ModuleBase
	,__properties__: {get_moduleName:"get_moduleName",get_messenger:"get_messenger"}
}
mvcexpress.core.ModuleManager = function() {
	throw "ModuleFactory is static framework class for internal use. Not meant to be instantiated.";
};
$hxClasses["mvcexpress.core.ModuleManager"] = mvcexpress.core.ModuleManager;
mvcexpress.core.ModuleManager.__name__ = ["mvcexpress","core","ModuleManager"];
mvcexpress.core.ModuleManager._moduleId = null;
mvcexpress.core.ModuleManager.createModule = function(moduleName,autoInit) {
	if(mvcexpress.core.ModuleManager.needMetadataTest) {
		mvcexpress.core.ModuleManager.needMetadataTest = false;
		var injectTest = new mvcexpress.core.inject.TestInject();
		if(!injectTest.testInjectMetaTag()) throw "mvcExpress framework failed to use 'Inject' metadata. Please add '-keep-as3-metadata+=Inject' to compile arguments.";
	}
	var retVal;
	mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule(moduleName,autoInit));
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) == null) {
		mvcexpress.core.ModuleManager._moduleId++;
		if(moduleName == null) moduleName = "module" + mvcexpress.core.ModuleManager._moduleId;
		retVal = mvcexpress.core.ModuleBase.getModuleInstance(moduleName,autoInit);
		mvcexpress.core.ModuleManager.moduleRegistry.set(moduleName,retVal);
		retVal;
		mvcexpress.core.ModuleManager.allModules[mvcexpress.core.ModuleManager.allModules.length] = retVal;
	} else throw "You can't have 2 modules with same name. call disposeModule() on old module before creating new one with same name. [moduleName:" + moduleName + "]";
	return retVal;
}
mvcexpress.core.ModuleManager.getMessenger = function(moduleName) {
	return mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName).get_messenger();
}
mvcexpress.core.ModuleManager.disposeModule = function(moduleName) {
	mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule(moduleName));
	if(mvcexpress.core.ModuleManager.moduleRegistry.exists(moduleName)) {
		var scopiedProxies = mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName);
		if(scopiedProxies != null) {
			var $it0 = ((function(_e) {
				return function() {
					return _e.iterator();
				};
			})(scopiedProxies))();
			while( $it0.hasNext() ) {
				var scopedProxyData = $it0.next();
				var scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopedProxyData.scopeName);
				scopedProxyMap.unmap(scopedProxyData.injectClass,scopedProxyData.name);
				Reflect.deleteField(scopiedProxies,scopedProxyData.injectId);
			}
		}
		mvcexpress.core.ModuleManager.moduleRegistry.remove(moduleName);
		var moduleCount = mvcexpress.core.ModuleManager.allModules.length;
		var j = 0;
		while(j < moduleCount) {
			if(mvcexpress.core.ModuleManager.allModules[j].get_moduleName() == moduleName) {
				mvcexpress.core.ModuleManager.allModules.splice(j,1);
				break;
			}
			j++;
		}
		mvcexpress.core.ModuleManager.scopePermissionsRegistry.remove(moduleName);
	} else throw "Module with moduleName:" + moduleName + " doesn't exist.";
}
mvcexpress.core.ModuleManager.sendScopeMessage = function(moduleName,scopeName,type,params,checkPermisions) {
	if(checkPermisions == null) checkPermisions = true;
	var scopePermission = null;
	if(checkPermisions) {
		if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) != null) scopePermission = mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName);
		if(scopePermission != null || !scopePermission.messageSending) throw "Module with name:" + moduleName + " has no permition to send messages to scope:" + scopeName + ". Please use: registerScopeTest() function.";
	}
	var scopeMesanger = mvcexpress.core.ModuleManager.scopedMessengers.get(scopeName);
	if(scopeMesanger != null) scopeMesanger.send(scopeName + "_^~_" + type,params);
}
mvcexpress.core.ModuleManager.addScopeHandler = function(moduleName,scopeName,type,handler) {
	var scopePermission = null;
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) != null) scopePermission = mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName);
	if(scopePermission != null || !scopePermission.messageReceiving) throw "Module with name:" + moduleName + " has no permition to receive messages from scope:" + scopeName + ". Please use: registerScopeTest() function.";
	var scopeMesanger = mvcexpress.core.ModuleManager.scopedMessengers.get(scopeName);
	if(scopeMesanger == null) {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		scopeMesanger = new mvcexpress.core.messenger.Messenger("$scope_" + scopeName);
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		mvcexpress.core.ModuleManager.scopedMessengers.set(scopeName,scopeMesanger);
		scopeMesanger;
	}
	return scopeMesanger.addHandler(scopeName + "_^~_" + type,handler);
}
mvcexpress.core.ModuleManager.removeScopeHandler = function(scopeName,type,handler) {
	var scopeMesanger = mvcexpress.core.ModuleManager.scopedMessengers.get(scopeName);
	if(scopeMesanger != null) scopeMesanger.removeHandler(scopeName + "_^~_" + type,handler);
}
mvcexpress.core.ModuleManager.scopedCommandMap = function(moduleName,handleCommandExecute,scopeName,type,commandClass) {
	var scopePermission = null;
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) != null) scopePermission = mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName);
	if(scopePermission != null || !scopePermission.messageReceiving) throw "Module with name:" + moduleName + " has no permition to receive messages and execute commands from scope:" + scopeName + ". Please use: registerScopeTest() function.";
	var scopeMesanger = mvcexpress.core.ModuleManager.scopedMessengers.get(scopeName);
	if(scopeMesanger != null) {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		scopeMesanger = new mvcexpress.core.messenger.Messenger("$scope_" + scopeName);
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		mvcexpress.core.ModuleManager.scopedMessengers.set(scopeName,scopeMesanger);
		scopeMesanger;
	}
	return scopeMesanger.addCommandHandler(scopeName + "_^~_" + type,handleCommandExecute,commandClass);
}
mvcexpress.core.ModuleManager.scopeMap = function(moduleName,scopeName,proxyObject,injectClass,name) {
	var scopePermission = null;
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) != null) scopePermission = mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName);
	if(scopePermission != null || !scopePermission.proxieMapping) throw "Module with name:" + moduleName + " has no permition to map proxies to scope:" + scopeName + ". Please use: registerScopeTest() function.";
	var scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopeName);
	if(scopedProxyMap == null) {
		mvcexpress.core.ModuleManager.initScopedProxyMap(scopeName);
		scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopeName);
	}
	var injectId = scopedProxyMap.map(proxyObject,injectClass,name);
	proxyObject.addScope(scopeName);
	var scopedProxyData = new mvcexpress.core.ScopedProxyData();
	scopedProxyData.scopedProxy = proxyObject;
	scopedProxyData.scopeName = scopeName;
	scopedProxyData.injectId = injectId;
	if(injectClass != null) scopedProxyData.injectClass = injectClass; else scopedProxyData.injectClass = Type.getClass(proxyObject);
	scopedProxyData.name = name;
	if(mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName) == null) {
		var v = new haxe.ds.StringMap();
		mvcexpress.core.ModuleManager.scopedProxiesByScope.set(moduleName,v);
		v;
	}
	mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName).set(injectId,scopedProxyData);
	scopedProxyData;
}
mvcexpress.core.ModuleManager.scopeUnmap = function(moduleName,scopeName,injectClass,name) {
	var scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopeName);
	if(scopedProxyMap != null) {
		var injectId = scopedProxyMap.unmap(injectClass,name);
		if(mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName) == null) {
			if(mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName).get(injectId) != null) mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName).get(injectId).scopedProxy.removeScope(scopeName);
		}
		mvcexpress.core.ModuleManager.scopedProxiesByScope.get(moduleName).set(injectId,null);
		null;
	}
}
mvcexpress.core.ModuleManager.injectScopedProxy = function(recipientObject,injectRule) {
	var scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(injectRule.scopeName);
	if(scopedProxyMap != null) {
		var injectProxy = scopedProxyMap.getProxyById(injectRule.injectClassAndName);
		if(injectProxy != null) {
			recipientObject[injectRule.varName] = injectProxy;
			return true;
		}
	}
	return false;
}
mvcexpress.core.ModuleManager.addPendingScopedInjection = function(scopeName,injectClassAndName,pendingInject) {
	var scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopeName);
	if(scopedProxyMap == null) {
		mvcexpress.core.ModuleManager.initScopedProxyMap(scopeName);
		scopedProxyMap = mvcexpress.core.ModuleManager.scopedProxyMaps.get(scopeName);
	}
	scopedProxyMap.addPendingInjection(injectClassAndName,pendingInject);
}
mvcexpress.core.ModuleManager.initScopedProxyMap = function(scopeName) {
	var scopedMesanger = mvcexpress.core.ModuleManager.scopedMessengers.get(scopeName);
	if(scopedMesanger == null) {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		scopedMesanger = new mvcexpress.core.messenger.Messenger("$scope_" + scopeName);
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		mvcexpress.core.ModuleManager.scopedMessengers.set(scopeName,scopedMesanger);
		scopedMesanger;
	}
	var v = new mvcexpress.core.ProxyMap("$scope_" + scopeName,scopedMesanger);
	mvcexpress.core.ModuleManager.scopedProxyMaps.set(scopeName,v);
	v;
}
mvcexpress.core.ModuleManager.registerScope = function(moduleName,scopeName,messageSending,messageReceiving,proxieMapping) {
	mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope(moduleName,scopeName,messageSending,messageReceiving,proxieMapping));
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) == null) {
		var v = new haxe.ds.StringMap();
		mvcexpress.core.ModuleManager.scopePermissionsRegistry.set(moduleName,v);
		v;
	}
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName) == null) {
		var v = new mvcexpress.core.ScopePermissionData();
		mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).set(scopeName,v);
		v;
	}
	var scopePermission = mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName);
	scopePermission.messageSending = messageSending;
	scopePermission.messageReceiving = messageReceiving;
	scopePermission.proxieMapping = proxieMapping;
}
mvcexpress.core.ModuleManager.unregisterScope = function(moduleName,scopeName) {
	mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope(moduleName,scopeName));
	if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName) != null) {
		if(mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).get(scopeName) != null) {
			mvcexpress.core.ModuleManager.scopePermissionsRegistry.get(moduleName).set(scopeName,null);
			null;
		}
	}
}
mvcexpress.core.ModuleManager.listModules = function() {
	var retVal = "";
	var _g1 = 0, _g = mvcexpress.core.ModuleManager.allModules.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(retVal != "") retVal += ",";
		retVal += mvcexpress.core.ModuleManager.allModules[i].get_moduleName();
	}
	return "Module list:" + retVal;
}
mvcexpress.core.ModuleManager.listMappedMessages = function(moduleName) {
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) != null) return (js.Boot.__cast(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) , mvcexpress.core.ModuleBase)).listMappedMessages();
	return "Module with name :" + moduleName + " is not found.";
}
mvcexpress.core.ModuleManager.listMappedMediators = function(moduleName) {
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) != null) return (js.Boot.__cast(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) , mvcexpress.core.ModuleBase)).listMappedMediators();
	return "Module with name :" + moduleName + " is not found.";
}
mvcexpress.core.ModuleManager.listMappedProxies = function(moduleName) {
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) != null) return (js.Boot.__cast(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) , mvcexpress.core.ModuleBase)).listMappedProxies();
	return "Module with name :" + moduleName + " is not found.";
}
mvcexpress.core.ModuleManager.listMappedCommands = function(moduleName) {
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) != null) return (js.Boot.__cast(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) , mvcexpress.core.ModuleBase)).listMappedCommands();
	return "Module with name :" + moduleName + " is not found.";
}
mvcexpress.core.ModuleManager.listModuleMessageCommands = function(moduleName,key) {
	if(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) != null) return js.Boot.__cast((js.Boot.__cast(mvcexpress.core.ModuleManager.moduleRegistry.get(moduleName) , mvcexpress.core.ModuleBase)).commandMap.listMessageCommands(key) , String);
	return "Module with name :" + moduleName + " is not found.";
}
mvcexpress.core.ModuleManager.prototype = {
	__class__: mvcexpress.core.ModuleManager
}
mvcexpress.core.ScopedProxyData = function() {
};
$hxClasses["mvcexpress.core.ScopedProxyData"] = mvcexpress.core.ScopedProxyData;
mvcexpress.core.ScopedProxyData.__name__ = ["mvcexpress","core","ScopedProxyData"];
mvcexpress.core.ScopedProxyData.prototype = {
	injectId: null
	,name: null
	,injectClass: null
	,scopeName: null
	,scopedProxy: null
	,__class__: mvcexpress.core.ScopedProxyData
}
mvcexpress.core.ScopePermissionData = function() {
};
$hxClasses["mvcexpress.core.ScopePermissionData"] = mvcexpress.core.ScopePermissionData;
mvcexpress.core.ScopePermissionData.__name__ = ["mvcexpress","core","ScopePermissionData"];
mvcexpress.core.ScopePermissionData.prototype = {
	proxieMapping: null
	,messageReceiving: null
	,messageSending: null
	,__class__: mvcexpress.core.ScopePermissionData
}
mvcexpress.core.interfaces.IProxyMap = function() { }
$hxClasses["mvcexpress.core.interfaces.IProxyMap"] = mvcexpress.core.interfaces.IProxyMap;
mvcexpress.core.interfaces.IProxyMap.__name__ = ["mvcexpress","core","interfaces","IProxyMap"];
mvcexpress.core.interfaces.IProxyMap.prototype = {
	getProxy: null
	,__class__: mvcexpress.core.interfaces.IProxyMap
}
mvcexpress.core.ProxyMap = function(moduleName,messenger) {
	this.injectObjectRegistry = new haxe.ds.ObjectMap();
	this.pendingInjectionsRegistry = new haxe.ds.StringMap();
	this.lazyProxyRegistry = new haxe.ds.StringMap();
	this.classConstRegistry = new haxe.ds.StringMap();
	this.moduleName = moduleName;
	this.messenger = messenger;
};
$hxClasses["mvcexpress.core.ProxyMap"] = mvcexpress.core.ProxyMap;
mvcexpress.core.ProxyMap.__name__ = ["mvcexpress","core","ProxyMap"];
mvcexpress.core.ProxyMap.__interfaces__ = [mvcexpress.core.interfaces.IProxyMap];
mvcexpress.core.ProxyMap.prototype = {
	getProxyById: function(injectClassAndName) {
		return js.Boot.__cast(this.injectObjectRegistry.h[injectClassAndName.__id__] , mvcexpress.mvc.Proxy);
	}
	,getInjectByConstName: function(constName) {
		if(this.classConstRegistry.get(constName) == null) {
			var split = constName.split(".");
			var className = split[0];
			var splitLength = split.length - 1;
			var spliteIndex = 1;
			while(spliteIndex < splitLength) {
				className += "." + split[spliteIndex];
				spliteIndex++;
			}
			try {
				var constClass = Type.resolveClass(className);
				var v = Reflect.field(className,split[spliteIndex]);
				this.classConstRegistry.set(constName,v);
				v;
				if(this.classConstRegistry.get(constName) == null) throw "Failed to get constant out of class:" + Std.string(constClass) + " Check constant name: " + split[spliteIndex];
			} catch( msg ) {
				if( js.Boot.__instanceof(msg,String) ) {
					throw "Failed to get constant out of constName:" + constName + " Can't get class from definition : " + className;
				} else throw(msg);
			}
		}
		return js.Boot.__cast(this.classConstRegistry.get(constName) , String);
	}
	,getInjectRules: function(signatureClass) {
		haxe.Log.trace("*****getInjectRules",{ fileName : "ProxyMap.hx", lineNumber : 575, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules", customParams : [signatureClass]});
		var retVal = new Array();
		var fieldsMeta = mvcexpress.utils.RttiHelper.getMetaFields(signatureClass);
		var _g = 0;
		while(_g < fieldsMeta.length) {
			var listedMeta = fieldsMeta[_g];
			++_g;
			var type = signatureClass;
			var _g1 = 0, _g2 = Reflect.fields(listedMeta);
			while(_g1 < _g2.length) {
				var m = _g2[_g1];
				++_g1;
				var name = m;
				type = Type.getClass(name);
				haxe.Log.trace("meta : var name :",{ fileName : "ProxyMap.hx", lineNumber : 586, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules", customParams : [name]});
				var fields = Type.getClassFields(signatureClass);
				var _g3 = 0;
				while(_g3 < fields.length) {
					var i = fields[_g3];
					++_g3;
					haxe.Log.trace("field>>" + i + ">>" + Std.string(Reflect.field(signatureClass,i)),{ fileName : "ProxyMap.hx", lineNumber : 591, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules"});
					if(i == name) type = Type.getClass(i);
				}
				haxe.Log.trace("meta : var type :",{ fileName : "ProxyMap.hx", lineNumber : 595, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules", customParams : [type]});
				var meta = Reflect.field(listedMeta,m);
				var inject = Reflect.hasField(meta,"inject");
				if(inject) {
					var args = Reflect.field(meta,"inject");
					var injectName = "";
					var scopeName = "";
					if(args != null) {
						injectName = Reflect.hasField(args,"name")?Reflect.field(args,"name"):Reflect.hasField(args,"constName")?this.getInjectByConstName(Reflect.field(args,"constName")):"";
						scopeName = Reflect.hasField(args,"scope")?Reflect.field(args,"scope"):Reflect.hasField(args,"constScope")?this.getInjectByConstName(Reflect.field(args,"constScope")):"";
					}
					haxe.Log.trace("type check:",{ fileName : "ProxyMap.hx", lineNumber : 611, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules", customParams : [Type.getClass(type),signatureClass]});
					var mapRule = new mvcexpress.core.inject.InjectRuleVO();
					mapRule.varName = name;
					mapRule.injectClassAndName = Std.string(type) + injectName;
					mapRule.scopeName = scopeName != ""?scopeName:null;
					retVal[retVal.length] = mapRule;
					haxe.Log.trace(">> NEW injectRule : " + Std.string(mapRule),{ fileName : "ProxyMap.hx", lineNumber : 619, className : "mvcexpress.core.ProxyMap", methodName : "getInjectRules"});
				}
			}
		}
		return retVal;
	}
	,injectPendingStuff: function(injectClassAndName,injectee) {
		var pendingInjects = this.pendingInjectionsRegistry.get(injectClassAndName);
		while(pendingInjects.length > 0) {
			var pendingInjection = pendingInjects.pop();
			pendingInjection.stopTimer();
			var rules = mvcexpress.core.ProxyMap.classInjectRules.h[pendingInjection.signatureClass.__id__];
			var pendingInject = pendingInjection.pendingObject;
			var _g = 0;
			while(_g < rules.length) {
				var rule = rules[_g];
				++_g;
				if(rule.injectClassAndName == injectClassAndName) {
					pendingInject[rule.varName] = injectee;
					if(js.Boot.__instanceof(pendingInject,mvcexpress.mvc.Proxy)) {
						var proxyObject = js.Boot.__cast(pendingInject , mvcexpress.mvc.Proxy);
						proxyObject.pendingInjections--;
						if(proxyObject.pendingInjections == 0) proxyObject.register();
					} else if(js.Boot.__instanceof(pendingInject,mvcexpress.mvc.Mediator)) {
						var mediatorObject = js.Boot.__cast(pendingInject , mvcexpress.mvc.Mediator);
						mediatorObject.pendingInjections--;
						if(mediatorObject.pendingInjections == 0) mediatorObject.register();
					}
					break;
				}
			}
		}
		this.pendingInjectionsRegistry.remove(injectClassAndName);
	}
	,addPendingInjection: function(injectClassAndName,pendingInjection) {
		var pendingInjections = this.pendingInjectionsRegistry.get(injectClassAndName);
		if(pendingInjections != null) {
			pendingInjections = new Array();
			this.pendingInjectionsRegistry.set(injectClassAndName,pendingInjections);
			pendingInjections;
		}
		pendingInjections[pendingInjections.length] = pendingInjection;
	}
	,injectStuff: function(object,signatureClass,tempValue,tempClass) {
		var isAllInjected = true;
		var tempClassName = "";
		if(tempValue != null) {
			if(tempClass != null) {
				tempClassName = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[tempClass.__id__];
				if(tempClassName != null) {
					tempClassName = Type.getClassName(tempClass);
					mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(tempClass,tempClassName);
				}
				haxe.Log.trace("injectionClassName:",{ fileName : "ProxyMap.hx", lineNumber : 386, className : "mvcexpress.core.ProxyMap", methodName : "injectStuff", customParams : [tempClassName,"already exists : ",this.injectObjectRegistry.h.hasOwnProperty(tempClassName.__id__)]});
				if(!this.injectObjectRegistry.h.hasOwnProperty(tempClassName.__id__)) this.injectObjectRegistry.set(tempClassName,tempValue); else throw "Temp object should not be mapped already... it was meant to be used by framework for mediator view object only.";
			}
		}
		var rules = mvcexpress.core.ProxyMap.classInjectRules.h[signatureClass.__id__];
		if(rules == null) {
			rules = this.getInjectRules(signatureClass);
			mvcexpress.core.ProxyMap.classInjectRules.set(signatureClass,rules);
		}
		var _g = 0;
		while(_g < rules.length) {
			var rule = rules[_g];
			++_g;
			var scopename = rule.scopeName;
			var injectClassAndName = rule.injectClassAndName;
			if(scopename != null) {
				if(!mvcexpress.core.ModuleManager.injectScopedProxy(object,rule)) {
					if(mvcexpress.MvcExpress.pendingInjectsTimeOut > 0 && !js.Boot.__instanceof(object,mvcexpress.mvc.Command)) {
						isAllInjected = false;
						mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending(scopename,this.moduleName,object,null,rule));
						mvcexpress.core.ModuleManager.addPendingScopedInjection(scopename,injectClassAndName,new mvcexpress.core.inject.PendingInject(injectClassAndName,object,signatureClass,mvcexpress.MvcExpress.pendingInjectsTimeOut));
						object.pendingInjections++;
					} else throw "Inject object is not found in scope:" + scopename + " for class with id:" + injectClassAndName + "(needed in " + Std.string(object) + ")";
				}
			} else {
				var injectObject = this.injectObjectRegistry.h[injectClassAndName.__id__];
				if(injectObject != null) {
					object[rule.varName] = injectObject;
					mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff(this.moduleName,object,injectObject,rule));
				} else {
					var lazyProxyData;
					if(this.lazyProxyRegistry.get(injectClassAndName) != null) {
						lazyProxyData = this.lazyProxyRegistry.get(injectClassAndName);
						this.lazyProxyRegistry.set(injectClassAndName,null);
						null;
						var lazyProxy = Type.createInstance(lazyProxyData.proxyClass,lazyProxyData.proxyParams);
						this.map(lazyProxy,lazyProxyData.injectClass,lazyProxyData.name);
					} else {
						isAllInjected = false;
						if(mvcexpress.MvcExpress.pendingInjectsTimeOut > 0 && !js.Boot.__instanceof(object,mvcexpress.mvc.Command)) {
							mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending(this.moduleName,object,injectObject,rule));
							this.addPendingInjection(injectClassAndName,new mvcexpress.core.inject.PendingInject(injectClassAndName,object,signatureClass,mvcexpress.MvcExpress.pendingInjectsTimeOut));
							object.pendingInjections++;
						} else throw "Inject object is not found for class with id:" + injectClassAndName + "(needed in " + Std.string(object) + ")";
					}
				}
			}
		}
		if(js.Boot.__instanceof(object,mvcexpress.mvc.PooledCommand)) {
			var command = js.Boot.__cast(object , mvcexpress.mvc.PooledCommand);
			if(!this.commandMap.checkIsClassPooled(signatureClass)) {
				var _g = 0;
				while(_g < rules.length) {
					var r = rules[_g];
					++_g;
					(js.Boot.__cast(Reflect.field(command,r.varName) , mvcexpress.mvc.Proxy)).registerDependantCommand(signatureClass);
				}
			}
		}
		if(tempClassName != null) this.injectObjectRegistry.remove(tempClassName);
		return isAllInjected;
	}
	,dispose: function() {
		var $it0 = this.injectObjectRegistry.iterator();
		while( $it0.hasNext() ) {
			var proxyObject = $it0.next();
			if(js.Boot.__instanceof(proxyObject,mvcexpress.mvc.Proxy)) (js.Boot.__cast(proxyObject , mvcexpress.mvc.Proxy)).remove();
		}
		this.injectObjectRegistry = null;
		this.pendingInjectionsRegistry = null;
		this.lazyProxyRegistry = null;
		this.classConstRegistry = null;
		this.commandMap = null;
		this.messenger = null;
	}
	,initProxy: function(proxyObject,proxyClass,injectId) {
		proxyObject.messenger = this.messenger;
		proxyObject.setProxyMap(this);
		var isAllInjected = this.injectStuff(proxyObject,proxyClass);
		if(isAllInjected) proxyObject.register();
	}
	,setCommandMap: function(value) {
		this.commandMap = value;
	}
	,listMappings: function() {
		var retVal = "";
		retVal = "====================== ProxyMap Mappings: ======================\n";
		var _g = 0, _g1 = Reflect.fields(this.injectObjectRegistry);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			retVal += "PROXY OBJECT:'" + Std.string(Reflect.field(this.injectObjectRegistry,key)) + "'\t\t\t(MAPPED TO:" + key + ")\n";
		}
		retVal += "================================================================\n";
		return retVal;
	}
	,isMapped: function(proxyObject,injectClass,name) {
		if(name == null) name = "";
		var retVal = false;
		var proxyClass = Type.getClass(proxyObject);
		if(injectClass == null) injectClass = proxyClass;
		var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
		if(className == null) {
			className = Type.getClassName(injectClass);
			mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
		}
		if(this.injectObjectRegistry.h.hasOwnProperty((className + name).__id__)) retVal = true;
		return retVal;
	}
	,scopeUnmap: function(scopeName,injectClass,name) {
		if(name == null) name = "";
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap(this.moduleName,scopeName,injectClass,name));
		mvcexpress.core.ModuleManager.scopeUnmap(this.moduleName,scopeName,injectClass,name);
	}
	,scopeMap: function(scopeName,proxyObject,injectClass,name) {
		if(name == null) name = "";
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap(this.moduleName,scopeName,proxyObject,injectClass,name));
		if(proxyObject.messenger == null) {
			var proxyClass = Type.getClass(proxyObject);
			if(injectClass == null) injectClass = proxyClass;
			var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
			if(className == null) {
				className = Type.getClassName(injectClass);
				mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
			}
			var injectId = className + name;
			this.initProxy(proxyObject,proxyClass,injectId);
		}
		mvcexpress.core.ModuleManager.scopeMap(this.moduleName,scopeName,proxyObject,injectClass,name);
	}
	,getProxy: function(injectClass,name) {
		if(name == null) name = "";
		var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
		if(className != null) {
			className = Type.getClassName(injectClass);
			mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
		}
		var classAndName = className + name;
		if(this.injectObjectRegistry.h.hasOwnProperty(classAndName.__id__)) return this.injectObjectRegistry.h[classAndName.__id__];
		throw "Proxy object is not mapped. [injectClass:" + className + " name:" + name + "]";
		return null;
	}
	,lazyMap: function(proxyClass,injectClass,name,proxyParams) {
		if(name == null) name = "";
		if(injectClass == null) injectClass = proxyClass;
		var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
		if(className == null) {
			className = Type.getClassName(injectClass);
			mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
		}
		var injectId = className + name;
		if(this.lazyProxyRegistry.exists(injectId)) throw "Proxy class is already lazy mapped. [injectClass:" + className + " name:" + name + "]";
		if(this.injectObjectRegistry.h.hasOwnProperty(injectId.__id__)) throw "Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]";
		var lazyInject = new mvcexpress.core.LazyProxyData();
		lazyInject.proxyClass = proxyClass;
		lazyInject.injectClass = injectClass;
		lazyInject.name = name;
		lazyInject.proxyParams = proxyParams;
		this.lazyProxyRegistry.set(injectId,lazyInject);
		lazyInject;
		return injectId;
	}
	,unmap: function(injectClass,name) {
		if(name == null) name = "";
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap(this.moduleName,injectClass,name));
		var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
		if(className == null) {
			className = Type.getClassName(injectClass);
			mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
		}
		var injectId = className + name;
		if(this.injectObjectRegistry.h.hasOwnProperty(injectId.__id__)) {
			var proxy = js.Boot.__cast(this.injectObjectRegistry.h[injectId.__id__] , mvcexpress.mvc.Proxy);
			var dependencies = proxy.getDependantCommands();
			var $it0 = ((function(_e) {
				return function() {
					return _e.iterator();
				};
			})(dependencies))();
			while( $it0.hasNext() ) {
				var item = $it0.next();
				this.commandMap.clearCommandPool(item);
			}
			proxy.remove();
			this.injectObjectRegistry.remove(injectId);
		}
		return injectId;
	}
	,map: function(proxyObject,injectClass,name) {
		if(name == null) name = "";
		var proxyClass = Type.getClass(proxyObject);
		if(injectClass == null) injectClass = proxyClass;
		var className = mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.h[injectClass.__id__];
		if(className == null) {
			className = Type.getClassName(injectClass);
			mvcexpress.core.ProxyMap.qualifiedClassNameRegistry.set(injectClass,className);
		}
		var injectId = className + name;
		if(this.lazyProxyRegistry.exists(injectId)) throw "Proxy object is already lazy mapped. [injectClass:" + Std.string(injectClass) + " name:" + name + "]";
		if(this.injectObjectRegistry.h.hasOwnProperty(injectId.__id__)) throw "Proxy object is already mapped. [injectClass:" + className + " name:" + name + "]";
		if(proxyObject.messenger == null) this.initProxy(proxyObject,proxyClass,injectId);
		if(Reflect.hasField(this.pendingInjectionsRegistry,injectId)) this.injectPendingStuff(injectId,proxyObject);
		if(!this.injectObjectRegistry.h.hasOwnProperty(injectId.__id__)) this.injectObjectRegistry.set(injectId,proxyObject); else throw "Proxy object class is already mapped.[injectClass:" + className + " name:" + name + "]";
		return injectId;
	}
	,classConstRegistry: null
	,lazyProxyRegistry: null
	,pendingInjectionsRegistry: null
	,injectObjectRegistry: null
	,commandMap: null
	,messenger: null
	,moduleName: null
	,__class__: mvcexpress.core.ProxyMap
}
mvcexpress.core.LazyProxyData = function() {
};
$hxClasses["mvcexpress.core.LazyProxyData"] = mvcexpress.core.LazyProxyData;
mvcexpress.core.LazyProxyData.__name__ = ["mvcexpress","core","LazyProxyData"];
mvcexpress.core.LazyProxyData.prototype = {
	proxyParams: null
	,name: null
	,injectClass: null
	,proxyClass: null
	,__class__: mvcexpress.core.LazyProxyData
}
mvcexpress.core.inject = {}
mvcexpress.core.inject.InjectRuleVO = function() {
};
$hxClasses["mvcexpress.core.inject.InjectRuleVO"] = mvcexpress.core.inject.InjectRuleVO;
mvcexpress.core.inject.InjectRuleVO.__name__ = ["mvcexpress","core","inject","InjectRuleVO"];
mvcexpress.core.inject.InjectRuleVO.prototype = {
	toString: function() {
		return "[InjectRuleVO varName=" + this.varName + " injectClassAndName=" + this.injectClassAndName + " scopeName=" + this.scopeName + "]";
	}
	,scopeName: null
	,injectClassAndName: null
	,varName: null
	,__class__: mvcexpress.core.inject.InjectRuleVO
}
mvcexpress.core.inject.PendingInject = function(injectClassAndName,pendingObject,signatureClass,pendingInjectTime) {
	this.injectClassAndName = injectClassAndName;
	this.pendingObject = pendingObject;
	this.signatureClass = signatureClass;
	this.pendingInjectTime = pendingInjectTime;
	this.timerId = haxe.Timer.delay($bind(this,this.throwError),pendingInjectTime);
};
$hxClasses["mvcexpress.core.inject.PendingInject"] = mvcexpress.core.inject.PendingInject;
mvcexpress.core.inject.PendingInject.__name__ = ["mvcexpress","core","inject","PendingInject"];
mvcexpress.core.inject.PendingInject.prototype = {
	throwError: function() {
		throw "Pending inject object is not resolved in " + this.pendingInjectTime / 1000 + " second for class with id:" + this.injectClassAndName + "(needed in " + Std.string(this.pendingObject) + ")";
	}
	,stopTimer: function() {
		this.timerId.stop();
		this.timerId = null;
	}
	,timerId: null
	,pendingInjectTime: null
	,signatureClass: null
	,pendingObject: null
	,injectClassAndName: null
	,__class__: mvcexpress.core.inject.PendingInject
}
mvcexpress.core.inject.TestInject = function() {
};
$hxClasses["mvcexpress.core.inject.TestInject"] = mvcexpress.core.inject.TestInject;
mvcexpress.core.inject.TestInject.__name__ = ["mvcexpress","core","inject","TestInject"];
mvcexpress.core.inject.TestInject.prototype = {
	testInjectMetaTag: function() {
		var retVal = true;
		return retVal;
	}
	,metadataTest: null
	,__class__: mvcexpress.core.inject.TestInject
}
mvcexpress.core.messenger = {}
mvcexpress.core.messenger.HandlerVO = function() {
};
$hxClasses["mvcexpress.core.messenger.HandlerVO"] = mvcexpress.core.messenger.HandlerVO;
mvcexpress.core.messenger.HandlerVO.__name__ = ["mvcexpress","core","messenger","HandlerVO"];
mvcexpress.core.messenger.HandlerVO.prototype = {
	handlerClassName: null
	,isExecutable: null
	,handler: null
	,__class__: mvcexpress.core.messenger.HandlerVO
}
mvcexpress.core.messenger.Messenger = function(moduleName) {
	this.messageRegistry = new haxe.ds.StringMap();
	this.handlerRegistry = new haxe.ds.StringMap();
	if(!mvcexpress.core.messenger.Messenger.allowInstantiation) throw "Messenger is a framework class, you can't instantiate it.";
	this.moduleName = moduleName;
};
$hxClasses["mvcexpress.core.messenger.Messenger"] = mvcexpress.core.messenger.Messenger;
mvcexpress.core.messenger.Messenger.__name__ = ["mvcexpress","core","messenger","Messenger"];
mvcexpress.core.messenger.Messenger.allowInstantiation = null;
mvcexpress.core.messenger.Messenger.prototype = {
	dispose: function() {
		this.messageRegistry = null;
		this.handlerRegistry = null;
	}
	,listMappings: function(commandMap) {
		var retVal = "";
		retVal = "====================== Message Mappings: ======================\n";
		var warningText = "WARNING: If you want to see Classes that handles messages - you must run with '-D debug' compile variable set to 'true'.\n";
		warningText = "";
		if(warningText != "") retVal += warningText;
		var _g = 0, _g1 = Reflect.fields(this.messageRegistry);
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			var msgList = this.messageRegistry.get(key);
			var messageHandlers = "";
			var msgCount = msgList.length;
			var i = 0;
			while(i < msgCount) {
				var handlerVo = msgList[i];
				if(handlerVo.isExecutable) {
					messageHandlers += "[EXECUTES:" + Std.string(commandMap.listMessageCommands(key)) + "], ";
					messageHandlers += "[" + handlerVo.handlerClassName + "], ";
				}
				i++;
			}
			retVal += "SENDING MESSAGE:'" + key + "'\t> HANDLED BY: > " + messageHandlers + "\n";
		}
		retVal += "================================================================";
		return retVal;
	}
	,addCommandHandler: function(type,executeFunction,handlerClass) {
		var executeMvgVo = this.addHandler(type,executeFunction,Std.string(handlerClass));
		executeMvgVo.isExecutable = true;
		return executeMvgVo;
	}
	,send: function(type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.messenger.TraceMessenger_send(this.moduleName,type,params));
		var messageList = this.messageRegistry.get(type);
		var handlerVo;
		var delCount = 0;
		if(messageList != null) {
			var mesageCount = messageList.length;
			var i = 0;
			var _g = 0;
			while(_g < messageList.length) {
				var handlerVo1 = messageList[_g];
				++_g;
				if(handlerVo1.handler == null) delCount++; else {
					if(delCount != 0) messageList[i - delCount] = messageList[i];
					if(handlerVo1.isExecutable) handlerVo1.handler(type,params); else {
						handlerVo1.handlerClassName;
						mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler(this.moduleName,type,params,handlerVo1.handler,handlerVo1.handlerClassName));
						handlerVo1.handler(params);
					}
				}
				i++;
			}
			if(delCount != 0) messageList.splice(mesageCount - delCount,delCount);
		}
	}
	,removeHandler: function(type,handler) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler(this.moduleName,type,handler));
		if(this.handlerRegistry.get(type) != null) {
			if(this.handlerRegistry.get(type)[handler]) {
				(js.Boot.__cast(this.handlerRegistry.get(type)[handler] , mvcexpress.core.messenger.HandlerVO)).handler = null;
				Reflect.deleteField(this.handlerRegistry.get(type),handler);
			}
		}
	}
	,addHandler: function(type,handler,handlerClassName) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler(this.moduleName,type,handler,handlerClassName));
		var messageList = this.messageRegistry.get(type);
		if(messageList == null) {
			messageList = new Array();
			this.messageRegistry.set(type,messageList);
			messageList;
			var v = new Array();
			this.handlerRegistry.set(type,v);
			v;
		}
		var msgData = this.handlerRegistry.get(type)[handler];
		if(msgData != null) throw "This handler function is already mapped to message type :" + type;
		if(msgData == null) {
			msgData = new mvcexpress.core.messenger.HandlerVO();
			msgData.handlerClassName = handlerClassName;
			msgData.handler = handler;
			messageList[messageList.length] = msgData;
			this.handlerRegistry.get(type)[handler] = msgData;
		}
		return msgData;
	}
	,handlerRegistry: null
	,messageRegistry: null
	,moduleName: null
	,__class__: mvcexpress.core.messenger.Messenger
}
mvcexpress.core.traceobjects = {}
mvcexpress.core.traceobjects.MvcTraceActions = function() { }
$hxClasses["mvcexpress.core.traceobjects.MvcTraceActions"] = mvcexpress.core.traceobjects.MvcTraceActions;
mvcexpress.core.traceobjects.MvcTraceActions.__name__ = ["mvcexpress","core","traceobjects","MvcTraceActions"];
mvcexpress.core.traceobjects.TraceObj = function(action,moduleName) {
	this.canPrint = true;
	this.action = action;
	this.moduleName = moduleName;
};
$hxClasses["mvcexpress.core.traceobjects.TraceObj"] = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.TraceObj.__name__ = ["mvcexpress","core","traceobjects","TraceObj"];
mvcexpress.core.traceobjects.TraceObj.prototype = {
	toString: function() {
		return "[TraceObj moduleName=" + this.moduleName + " action=" + this.action + "]";
	}
	,canPrint: null
	,action: null
	,moduleName: null
	,__class__: mvcexpress.core.traceobjects.TraceObj
}
mvcexpress.core.traceobjects.TraceObj_SendMessage = function(action,moduleName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,action,moduleName);
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.TraceObj_SendMessage"] = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.TraceObj_SendMessage.__name__ = ["mvcexpress","core","traceobjects","TraceObj_SendMessage"];
mvcexpress.core.traceobjects.TraceObj_SendMessage.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	mediatorObject: null
	,proxyObject: null
	,commandObject: null
	,moduleObject: null
	,__class__: mvcexpress.core.traceobjects.TraceObj_SendMessage
});
mvcexpress.core.traceobjects.command = {}
mvcexpress.core.traceobjects.command.TraceCommand_sendMessage = function(moduleName,commandObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDMESSAGE_CLEAN,moduleName);
	this.commandObject = commandObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.command.TraceCommand_sendMessage"] = mvcexpress.core.traceobjects.command.TraceCommand_sendMessage;
mvcexpress.core.traceobjects.command.TraceCommand_sendMessage.__name__ = ["mvcexpress","core","traceobjects","command","TraceCommand_sendMessage"];
mvcexpress.core.traceobjects.command.TraceCommand_sendMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.command.TraceCommand_sendMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.command.TraceCommand_sendMessage
});
mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage = function(moduleName,commandObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDSCOPEMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDSCOPEMESSAGE_CLEAN,moduleName);
	this.commandObject = commandObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage"] = mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage;
mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage.__name__ = ["mvcexpress","core","traceobjects","command","TraceCommand_sendScopeMessage"];
mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage
});
mvcexpress.core.traceobjects.commandmap = {}
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute = function(moduleName,commandObject,commandClass,params) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_EXECUTE,moduleName);
	this.commandObject = commandObject;
	this.commandClass = commandClass;
	this.params = params;
};
$hxClasses["mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute"] = mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute.__name__ = ["mvcexpress","core","traceobjects","commandmap","TraceCommandMap_execute"];
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "©* " + mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_EXECUTE + " > commandClass : " + Std.string(this.commandClass) + ", params : " + Std.string(this.params) + "     {" + this.moduleName + "}";
	}
	,messageFromCommand: null
	,messageFromProxy: null
	,messageFromMediator: null
	,messageFromModule: null
	,view: null
	,params: null
	,commandClass: null
	,commandObject: null
	,__class__: mvcexpress.core.traceobjects.commandmap.TraceCommandMap_execute
});
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute = function(moduleName,commandObject,commandClass,type,params) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_HANDLECOMMANDEXECUTE,moduleName);
	this.commandObject = commandObject;
	this.commandClass = commandClass;
	this.type = type;
	this.params = params;
};
$hxClasses["mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute"] = mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute.__name__ = ["mvcexpress","core","traceobjects","commandmap","TraceCommandMap_handleCommandExecute"];
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "©* " + mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_HANDLECOMMANDEXECUTE + " > messageType : " + this.type + ", params : " + Std.string(this.params) + " Executed with : " + Std.string(this.commandClass) + "{" + this.moduleName + "}";
	}
	,messageFromCommand: null
	,messageFromProxy: null
	,messageFromMediator: null
	,messageFromModule: null
	,view: null
	,params: null
	,type: null
	,commandClass: null
	,commandObject: null
	,__class__: mvcexpress.core.traceobjects.commandmap.TraceCommandMap_handleCommandExecute
});
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map = function(moduleName,type,commandClass) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_MAP,moduleName);
	this.type = type;
	this.commandClass = commandClass;
};
$hxClasses["mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map"] = mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map.__name__ = ["mvcexpress","core","traceobjects","commandmap","TraceCommandMap_map"];
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "©©©+ " + mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_MAP + " > type : " + this.type + ", commandClass : " + Std.string(this.commandClass) + "     {" + this.moduleName + "}";
	}
	,commandClass: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.commandmap.TraceCommandMap_map
});
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap = function(moduleName,type,commandClass) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_UNMAP,moduleName);
	this.type = type;
	this.commandClass = commandClass;
};
$hxClasses["mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap"] = mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap.__name__ = ["mvcexpress","core","traceobjects","commandmap","TraceCommandMap_unmap"];
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "©©©- " + mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_UNMAP + " > type : " + this.type + ", commandClass : " + Std.string(this.commandClass) + "     {" + this.moduleName + "}";
	}
	,commandClass: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.commandmap.TraceCommandMap_unmap
});
mvcexpress.core.traceobjects.mediator = {}
mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler = function(moduleName,mediatorObject,type,handler) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_ADDHANDLER,moduleName);
	this.mediatorObject = mediatorObject;
	this.type = type;
	this.handler = handler;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler"] = mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler;
mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler.__name__ = ["mvcexpress","core","traceobjects","mediator","TraceMediator_addHandler"];
mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	mediatorObject: null
	,handler: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler
});
mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage = function(moduleName,mediatorObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDMESSAGE_CLEAN,moduleName);
	this.mediatorObject = mediatorObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage"] = mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage;
mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage.__name__ = ["mvcexpress","core","traceobjects","mediator","TraceMediator_sendMessage"];
mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage
});
mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage = function(moduleName,mediatorObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE_CLEAN,moduleName);
	this.mediatorObject = mediatorObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage"] = mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage;
mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage.__name__ = ["mvcexpress","core","traceobjects","mediator","TraceMediator_sendScopeMessage"];
mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage
});
mvcexpress.core.traceobjects.mediatormap = {}
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map = function(moduleName,viewClass,mediatorClass) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MAP,moduleName);
	this.viewClass = viewClass;
	this.mediatorClass = mediatorClass;
};
$hxClasses["mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map"] = mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map.__name__ = ["mvcexpress","core","traceobjects","mediatormap","TraceMediatorMap_map"];
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "§§§+ " + mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MAP + " > viewClass : " + Std.string(this.viewClass) + ", mediatorClass : " + Std.string(this.mediatorClass) + "     {" + this.moduleName + "}";
	}
	,mediatorClass: null
	,viewClass: null
	,__class__: mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_map
});
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate = function(moduleName,viewObject,mediatorObject,viewClass,mediatorClass,mediatorClassName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MEDIATE,moduleName);
	this.viewObject = viewObject;
	this.mediatorObject = mediatorObject;
	this.viewClass = viewClass;
	this.mediatorClass = mediatorClass;
	this.mediatorClassName = mediatorClassName;
};
$hxClasses["mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate"] = mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate.__name__ = ["mvcexpress","core","traceobjects","mediatormap","TraceMediatorMap_mediate"];
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "§*+ " + mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MEDIATE + " > viewObject : " + Std.string(this.viewObject) + " (viewClass:" + Std.string(this.viewClass) + ")" + " WITH > mediatorClass : " + Std.string(this.mediatorClass) + "     {" + this.moduleName + "}";
	}
	,handleObjects: null
	,dependencies: null
	,view: null
	,mediatorClassName: null
	,mediatorClass: null
	,viewClass: null
	,mediatorObject: null
	,viewObject: null
	,__class__: mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_mediate
});
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap = function(moduleName,viewClass) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMAP,moduleName);
	this.viewClass = viewClass;
};
$hxClasses["mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap"] = mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap.__name__ = ["mvcexpress","core","traceobjects","mediatormap","TraceMediatorMap_unmap"];
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "§§§- " + mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMAP + " > viewClass : " + Std.string(this.viewClass) + "     {" + this.moduleName + "}";
	}
	,viewClass: null
	,__class__: mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmap
});
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate = function(moduleName,viewObject) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMEDIATE,moduleName);
	this.viewObject = viewObject;
};
$hxClasses["mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate"] = mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate.__name__ = ["mvcexpress","core","traceobjects","mediatormap","TraceMediatorMap_unmediate"];
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "§*- " + mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMEDIATE + " > viewObject : " + Std.string(this.viewObject) + "     {" + this.moduleName + "}";
	}
	,mediatorClassName: null
	,mediatorClass: null
	,viewClass: null
	,mediatorObject: null
	,viewObject: null
	,__class__: mvcexpress.core.traceobjects.mediatormap.TraceMediatorMap_unmediate
});
mvcexpress.core.traceobjects.messenger = {}
mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler = function(moduleName,ptype,phandler,phandlerClassName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_ADDHANDLER,moduleName);
	this.type = ptype;
	this.handler = phandler;
	this.handlerClassName = phandlerClassName;
};
$hxClasses["mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler"] = mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler;
mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler.__name__ = ["mvcexpress","core","traceobjects","messenger","TraceMessenger_addHandler"];
mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "••<+ " + mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_ADDHANDLER + " > type : " + this.type + ", handlerClassName : " + this.handlerClassName + "     {" + this.moduleName + "}";
	}
	,handlerClassName: null
	,handler: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.messenger.TraceMessenger_addHandler
});
mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler = function(moduleName,ptype,phandler) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_REMOVEHANDLER,moduleName);
	this.type = ptype;
	this.handler = phandler;
};
$hxClasses["mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler"] = mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler;
mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler.__name__ = ["mvcexpress","core","traceobjects","messenger","TraceMessenger_removeHandler"];
mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "••<- " + mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_REMOVEHANDLER + " > type : " + this.type + "     {" + this.moduleName + "}";
	}
	,handler: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.messenger.TraceMessenger_removeHandler
});
mvcexpress.core.traceobjects.messenger.TraceMessenger_send = function(moduleName,type,params) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_SEND,moduleName);
	this.type = type;
	this.params = params;
};
$hxClasses["mvcexpress.core.traceobjects.messenger.TraceMessenger_send"] = mvcexpress.core.traceobjects.messenger.TraceMessenger_send;
mvcexpress.core.traceobjects.messenger.TraceMessenger_send.__name__ = ["mvcexpress","core","traceobjects","messenger","TraceMessenger_send"];
mvcexpress.core.traceobjects.messenger.TraceMessenger_send.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.messenger.TraceMessenger_send.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "•> " + mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_SEND + " > type : " + this.type + ", params : " + Std.string(this.params) + "     {" + this.moduleName + "}";
	}
	,params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.messenger.TraceMessenger_send
});
mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler = function(moduleName,type,params,handler,handlerClassName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_SEND_HANDLER,moduleName);
	this.type = type;
	this.params = params;
	this.handler = handler;
	this.handlerClassName = handlerClassName;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler"] = mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler;
mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler.__name__ = ["mvcexpress","core","traceobjects","messenger","TraceMessenger_send_handler"];
mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	messageFromCommand: null
	,messageFromProxy: null
	,messageFromMediator: null
	,messageFromModule: null
	,handlerClassName: null
	,handler: null
	,params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.messenger.TraceMessenger_send_handler
});
mvcexpress.core.traceobjects.modulebase = {}
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage = function(moduleName,moduleObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDMESSAGE_CLEAN,moduleName);
	this.moduleObject = moduleObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage"] = mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage;
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage.__name__ = ["mvcexpress","core","traceobjects","modulebase","TraceModuleBase_sendMessage"];
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendMessage
});
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage = function(moduleName,moduleObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE_CLEAN,moduleName);
	this.moduleObject = moduleObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage"] = mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage;
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage.__name__ = ["mvcexpress","core","traceobjects","modulebase","TraceModuleBase_sendScopeMessage"];
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.modulebase.TraceModuleBase_sendScopeMessage
});
mvcexpress.core.traceobjects.modulemanager = {}
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule = function(moduleName,autoInit) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_CREATEMODULE,moduleName);
	this.autoInit = autoInit;
};
$hxClasses["mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule"] = mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule.__name__ = ["mvcexpress","core","traceobjects","modulemanager","TraceModuleManager_createModule"];
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "#####+ " + mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_CREATEMODULE + " > moduleName : " + this.moduleName + ", autoInit : " + Std.string(this.autoInit);
	}
	,autoInit: null
	,__class__: mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_createModule
});
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule = function(moduleName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_DISPOSEMODULE,moduleName);
};
$hxClasses["mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule"] = mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule.__name__ = ["mvcexpress","core","traceobjects","modulemanager","TraceModuleManager_disposeModule"];
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "#####- " + mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_DISPOSEMODULE + " > moduleName : " + this.moduleName;
	}
	,__class__: mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_disposeModule
});
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope = function(moduleName,scopeName,messageSending,messageReceiving,proxieMap) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_CREATEMODULE,moduleName);
	this.scopeName = scopeName;
	this.messageSending = messageSending;
	this.messageReceiving = messageReceiving;
	this.proxieMap = proxieMap;
};
$hxClasses["mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope"] = mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope.__name__ = ["mvcexpress","core","traceobjects","modulemanager","TraceModuleManager_registerScope"];
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "##**++ " + mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_CREATEMODULE + " > moduleName : " + this.moduleName + " scopeName=" + this.scopeName + " messageSending=" + Std.string(this.messageSending) + " messageReceiving=" + Std.string(this.messageReceiving) + " proxieMap=" + Std.string(this.proxieMap) + "]";
	}
	,proxieMap: null
	,messageReceiving: null
	,messageSending: null
	,scopeName: null
	,__class__: mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_registerScope
});
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope = function(moduleName,scopeName) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_UNREGISTERSCOPE,moduleName);
	this.scopeName = scopeName;
};
$hxClasses["mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope"] = mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope.__name__ = ["mvcexpress","core","traceobjects","modulemanager","TraceModuleManager_unregisterScope"];
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "##**-- " + mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_UNREGISTERSCOPE + " > moduleName : " + this.moduleName + ", scopeName : " + this.scopeName;
	}
	,scopeName: null
	,__class__: mvcexpress.core.traceobjects.modulemanager.TraceModuleManager_unregisterScope
});
mvcexpress.core.traceobjects.proxy = {}
mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage = function(moduleName,proxyObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDMESSAGE_CLEAN,moduleName);
	this.proxyObject = proxyObject;
	this.type = type;
	this.params = params;
};
$hxClasses["mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage"] = mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage;
mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage.__name__ = ["mvcexpress","core","traceobjects","proxy","TraceProxy_sendMessage"];
mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage
});
mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage = function(moduleName,proxyObject,type,params,preSend) {
	mvcexpress.core.traceobjects.TraceObj_SendMessage.call(this,preSend?mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDSCOPEMESSAGE:mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDSCOPEMESSAGE_CLEAN,moduleName);
	this.proxyObject = proxyObject;
	this.type = type;
	this.params = params;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage"] = mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage;
mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage.__name__ = ["mvcexpress","core","traceobjects","proxy","TraceProxy_sendScopeMessage"];
mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage.__super__ = mvcexpress.core.traceobjects.TraceObj_SendMessage;
mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage.prototype = $extend(mvcexpress.core.traceobjects.TraceObj_SendMessage.prototype,{
	params: null
	,type: null
	,__class__: mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage
});
mvcexpress.core.traceobjects.proxymap = {}
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending = function(moduleName,hostObject,injectObject,rule) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTPENDING,moduleName);
	this.hostObject = hostObject;
	this.injectObject = injectObject;
	this.rule = rule;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_injectPending"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "!!!!! " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTPENDING + " > for id:" + this.rule.injectClassAndName + "(needed in " + Std.string(this.hostObject) + ")" + "     {" + this.moduleName + "}";
	}
	,rule: null
	,injectObject: null
	,hostObject: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectPending
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff = function(moduleName,hostObject,injectObject,rule) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTSTUFF,moduleName);
	this.hostObject = hostObject;
	this.injectObject = injectObject;
	this.rule = rule;
	this.canPrint = false;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_injectStuff"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	rule: null
	,injectObject: null
	,hostObject: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_injectStuff
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap = function(moduleName,proxyClass,injectClass,name,proxyParams) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_LAZYMAP,moduleName);
	this.proxyParams = proxyParams;
	this.proxyClass = proxyClass;
	this.injectClass = injectClass;
	this.name = name;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_lazyMap"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "¶¶¶+ " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_LAZYMAP + " > proxyClass : " + Std.string(this.proxyClass) + ", injectClass : " + Std.string(this.injectClass) + ", name : " + this.name + ", proxyParams : " + Std.string(this.proxyParams) + "     {" + this.moduleName + "}";
	}
	,view: null
	,dependencies: null
	,proxyParams: null
	,name: null
	,injectClass: null
	,proxyClass: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_lazyMap
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map = function(moduleName,proxyObject,injectClass,name) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_MAP,moduleName);
	this.proxyObject = proxyObject;
	this.injectClass = injectClass;
	this.name = name;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_map"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "¶¶¶+ " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_MAP + " > proxyObject : " + Std.string(this.proxyObject) + ", injectClass : " + Std.string(this.injectClass) + ", name : " + this.name + "     {" + this.moduleName + "}";
	}
	,view: null
	,dependencies: null
	,name: null
	,injectClass: null
	,proxyObject: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_map
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap = function(moduleName,scopeName,proxyObject,injectClass,name) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEMAP,moduleName);
	this.scopeName = scopeName;
	this.proxyObject = proxyObject;
	this.injectClass = injectClass;
	this.name = name;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_scopeMap"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "{}¶¶¶+ " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEMAP + " > scopeName : " + this.scopeName + "proxyObject : " + Std.string(this.proxyObject) + ", injectClass : " + Std.string(this.injectClass) + ", name : " + this.name + "     {" + this.moduleName + "}";
	}
	,view: null
	,dependencies: null
	,name: null
	,injectClass: null
	,proxyObject: null
	,scopeName: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeMap
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap = function(moduleName,scopeName,injectClass,name) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEUNMAP,moduleName);
	this.scopeName = scopeName;
	this.injectClass = injectClass;
	this.name = name;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_scopeUnmap"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "{}¶¶¶¶- " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEUNMAP + " > scopeName : " + this.scopeName + ", injectClass : " + Std.string(this.injectClass) + ", name : " + this.name + "     {" + this.moduleName + "}";
	}
	,view: null
	,dependencies: null
	,name: null
	,injectClass: null
	,scopeName: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopeUnmap
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending = function(scopeName,moduleName,hostObject,injectObject,rule) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTPENDING,moduleName);
	this.scopeName = scopeName;
	this.hostObject = hostObject;
	this.injectObject = injectObject;
	this.rule = rule;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_scopedInjectPending"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "!!!!! " + mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTPENDING + " > for scopeName:" + this.scopeName + " with id:" + this.rule.injectClassAndName + "(needed in " + Std.string(this.hostObject) + ")" + "     {" + this.moduleName + "}";
	}
	,rule: null
	,injectObject: null
	,hostObject: null
	,scopeName: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_scopedInjectPending
});
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap = function(moduleName,injectClass,name) {
	mvcexpress.core.traceobjects.TraceObj.call(this,mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_UNMAP,moduleName);
	this.injectClass = injectClass;
	this.name = name;
};
$hxClasses["mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap"] = mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap.__name__ = ["mvcexpress","core","traceobjects","proxymap","TraceProxyMap_unmap"];
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap.__super__ = mvcexpress.core.traceobjects.TraceObj;
mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap.prototype = $extend(mvcexpress.core.traceobjects.TraceObj.prototype,{
	toString: function() {
		return "¶¶¶¶- " + mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_UNMAP + " > injectClass : " + Std.string(this.injectClass) + ", name : " + this.name + "     {" + this.moduleName + "}";
	}
	,view: null
	,dependencies: null
	,name: null
	,injectClass: null
	,__class__: mvcexpress.core.traceobjects.proxymap.TraceProxyMap_unmap
});
mvcexpress.mvc = {}
mvcexpress.mvc.Command = function() {
	if(!mvcexpress.mvc.Command.canConstruct) throw "Command:" + Std.string(this) + " can be constructed only by framework. If you want to execute it - map it to message with commandMap.map() and send a message, or execute it directly with commandMap.execute()";
};
$hxClasses["mvcexpress.mvc.Command"] = mvcexpress.mvc.Command;
mvcexpress.mvc.Command.__name__ = ["mvcexpress","mvc","Command"];
mvcexpress.mvc.Command.canConstruct = null;
mvcexpress.mvc.Command.prototype = {
	getMessageType: function() {
		return this.messageType;
	}
	,unregisterScope: function(scopeName) {
		mvcexpress.core.ModuleManager.unregisterScope(this.messenger.moduleName,scopeName);
	}
	,registerScope: function(scopeName,messageSending,messageReceiving,proxieMapping) {
		if(proxieMapping == null) proxieMapping = false;
		if(messageReceiving == null) messageReceiving = true;
		if(messageSending == null) messageSending = true;
		mvcexpress.core.ModuleManager.registerScope(this.messenger.moduleName,scopeName,messageSending,messageReceiving,proxieMapping);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage(this.messenger.moduleName,this,type,params,true));
		mvcexpress.core.ModuleManager.sendScopeMessage(this.messenger.moduleName,scopeName,type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.command.TraceCommand_sendScopeMessage(this.messenger.moduleName,this,type,params,false));
	}
	,sendMessage: function(type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.command.TraceCommand_sendMessage(this.messenger.moduleName,this,type,params,true));
		this.messenger.send(type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.command.TraceCommand_sendMessage(this.messenger.moduleName,this,type,params,false));
	}
	,isExecuting: null
	,messageType: null
	,messenger: null
	,mediatorMap: null
	,proxyMap: null
	,commandMap: null
	,__class__: mvcexpress.mvc.Command
}
mvcexpress.mvc.Mediator = function() {
	this.handlerVoRegistry = new Array();
	this.eventListenerRegistry = new haxe.ds.ObjectMap();
	this.eventListenerCaptureRegistry = new haxe.ds.ObjectMap();
	if(!mvcexpress.mvc.Mediator.canConstruct) throw "Mediator:" + Std.string(this) + " can be constructed only by framework. If you want to use it - map it to view object class with 'mediatorMap.map()', and then mediate instance of the view object with 'mediatorMap.mediate()'.";
};
$hxClasses["mvcexpress.mvc.Mediator"] = mvcexpress.mvc.Mediator;
mvcexpress.mvc.Mediator.__name__ = ["mvcexpress","mvc","Mediator"];
mvcexpress.mvc.Mediator.canConstruct = null;
mvcexpress.mvc.Mediator.prototype = {
	remove: function() {
		this.onRemove();
		this.removeAllHandlers();
		this.removeAllListeners();
		this.handlerVoRegistry = null;
		this.eventListenerRegistry = null;
		this.messenger = null;
		this.mediatorMap = null;
	}
	,register: function() {
		this._isReady = true;
		this.onRegister();
	}
	,removeAllListeners: function() {
		var eventTypes;
		var _g = 0, _g1 = Reflect.fields(this.eventListenerCaptureRegistry);
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			var listener = Reflect.field(this.eventListenerCaptureRegistry,l);
			eventTypes = this.eventListenerCaptureRegistry.h[listener.__id__];
			var _g2 = 0, _g3 = Reflect.fields(eventTypes);
			while(_g2 < _g3.length) {
				var type = _g3[_g2];
				++_g2;
				var viewObject = eventTypes.get(type);
				viewObject.removeEventListener(type,listener,true);
			}
		}
		var _g = 0, _g1 = Reflect.fields(this.eventListenerRegistry);
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			var listener = Reflect.field(this.eventListenerCaptureRegistry,l);
			eventTypes = this.eventListenerRegistry.h[listener.__id__];
			var _g2 = 0, _g3 = Reflect.fields(eventTypes);
			while(_g2 < _g3.length) {
				var type = _g3[_g2];
				++_g2;
				var viewObject = eventTypes.get(type);
				viewObject.removeEventListener(type,listener,false);
			}
		}
	}
	,removeListener: function(viewObject,type,listener,useCapture) {
		if(useCapture == null) useCapture = false;
		viewObject.removeEventListener(type,listener,useCapture);
		if(useCapture) {
			if(this.eventListenerCaptureRegistry.exists(listener)) {
				if(this.eventListenerCaptureRegistry.get(listener).exists(type)) {
					if(this.eventListenerCaptureRegistry.get(listener).get(type) == viewObject) this.eventListenerCaptureRegistry.get(listener).remove(type);
				}
			}
		} else if(this.eventListenerRegistry.exists(listener)) {
			if(this.eventListenerRegistry.get(listener).exists(type)) {
				if(this.eventListenerRegistry.get(listener).get(type) == viewObject) this.eventListenerRegistry.get(listener).remove(type);
			}
		}
	}
	,addListener: function(viewObject,type,listener,useCapture,priority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(priority == null) priority = 0;
		if(useCapture == null) useCapture = false;
		if(useCapture) {
			if(!this.eventListenerCaptureRegistry.exists(listener)) this.eventListenerCaptureRegistry.set(listener,new haxe.ds.StringMap());
			if(!this.eventListenerCaptureRegistry.get(listener).exists(type)) {
				this.eventListenerCaptureRegistry.get(listener).set(type,viewObject);
				viewObject.addEventListener(type,listener,useCapture,priority,useWeakReference);
			}
		} else {
			if(!this.eventListenerRegistry.exists(listener)) this.eventListenerRegistry.set(listener,new haxe.ds.StringMap());
			if(!this.eventListenerRegistry.get(listener).exists(type)) {
				this.eventListenerRegistry.get(listener).set(type,viewObject);
				viewObject.addEventListener(type,listener,useCapture,priority,useWeakReference);
			}
		}
	}
	,removeScopeHandler: function(scopeName,type,handler) {
		mvcexpress.core.ModuleManager.removeScopeHandler(scopeName,type,handler);
	}
	,addScopeHandler: function(scopeName,type,handler) {
		this.handlerVoRegistry[this.handlerVoRegistry.length] = mvcexpress.core.ModuleManager.addScopeHandler(this.moduleName,scopeName,type,handler);
	}
	,removeAllHandlers: function() {
		while(this.handlerVoRegistry.length != 0) {
			var handler = this.handlerVoRegistry.pop();
			handler.handler = null;
		}
	}
	,removeHandler: function(type,handler) {
		this.messenger.removeHandler(type,handler);
	}
	,addHandler: function(type,handler) {
		if(handler.length < 1) throw "Every message handler function needs at least one parameter. You are trying to add handler function from " + Type.getClassName(Type.getClass(Type["typeof"](this))) + " for message type:" + type;
		if(type == null || type == "null" || type == "undefined") throw "Message type:[" + type + "] can not be empty or 'null'.(You are trying to add message handler in: " + Std.string(this) + ")";
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediator.TraceMediator_addHandler(this.moduleName,this,type,handler));
		this.handlerVoRegistry[this.handlerVoRegistry.length] = this.messenger.addHandler(type,handler,Type.getClassName(Type.getClass(Type["typeof"](this))));
		return;
		this.handlerVoRegistry[this.handlerVoRegistry.length] = this.messenger.addHandler(type,handler);
	}
	,sendScopeMessage: function(scopeName,type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage(this.moduleName,this,type,params,true));
		mvcexpress.core.ModuleManager.sendScopeMessage(this.moduleName,scopeName,type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediator.TraceMediator_sendScopeMessage(this.moduleName,this,type,params,false));
	}
	,sendMessage: function(type,params) {
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage(this.moduleName,this,type,params,true));
		this.messenger.send(type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.mediator.TraceMediator_sendMessage(this.moduleName,this,type,params,false));
	}
	,get_isReady: function() {
		return this._isReady;
	}
	,onRemove: function() {
	}
	,onRegister: function() {
	}
	,eventListenerCaptureRegistry: null
	,eventListenerRegistry: null
	,handlerVoRegistry: null
	,pendingInjections: null
	,_isReady: null
	,messenger: null
	,mediatorMap: null
	,proxyMap: null
	,moduleName: null
	,__class__: mvcexpress.mvc.Mediator
	,__properties__: {get_isReady:"get_isReady"}
}
mvcexpress.mvc.PooledCommand = function() {
	mvcexpress.mvc.Command.call(this);
};
$hxClasses["mvcexpress.mvc.PooledCommand"] = mvcexpress.mvc.PooledCommand;
mvcexpress.mvc.PooledCommand.__name__ = ["mvcexpress","mvc","PooledCommand"];
mvcexpress.mvc.PooledCommand.__super__ = mvcexpress.mvc.Command;
mvcexpress.mvc.PooledCommand.prototype = $extend(mvcexpress.mvc.Command.prototype,{
	unlock: function() {
		if(this._isLocked) {
			this._isLocked = false;
			if(this.isExecuting) this.commandMap.poolCommand(this);
		} else throw "You are trying to unlock PooledCommand that was never locked. lock() it first.";
	}
	,lock: function() {
		this._isLocked = true;
	}
	,get_isLocked: function() {
		return this._isLocked;
	}
	,_isLocked: null
	,__class__: mvcexpress.mvc.PooledCommand
	,__properties__: {get_isLocked:"get_isLocked"}
});
mvcexpress.mvc.Proxy = function() {
	this.proxyScopes = new Array();
	this.dependantCommands = new haxe.ds.ObjectMap();
};
$hxClasses["mvcexpress.mvc.Proxy"] = mvcexpress.mvc.Proxy;
mvcexpress.mvc.Proxy.__name__ = ["mvcexpress","mvc","Proxy"];
mvcexpress.mvc.Proxy.prototype = {
	getDependantCommands: function() {
		return this.dependantCommands;
	}
	,registerDependantCommand: function(signatureClass) {
		this.dependantCommands.set(signatureClass,signatureClass);
	}
	,removeScope: function(scopeName) {
		var scopeCount = scopeName.length;
		var _g = 0;
		while(_g < scopeCount) {
			var i = _g++;
			if(this.proxyScopes[i] == scopeName) {
				this.proxyScopes.splice(i,1);
				break;
			}
		}
	}
	,addScope: function(scopeName) {
		var messengerFound = false;
		var scopeCount = this.proxyScopes.length;
		var _g = 0;
		while(_g < scopeCount) {
			var i = _g++;
			if(this.proxyScopes[i] == scopeName) {
				messengerFound = true;
				break;
			}
		}
		if(!messengerFound) this.proxyScopes[this.proxyScopes.length] = scopeName;
	}
	,remove: function() {
		this._isReady = false;
		this.dependantCommands = null;
		this.onRemove();
	}
	,register: function() {
		if(!this._isReady) {
			this._isReady = true;
			this.onRegister();
		}
	}
	,setProxyMap: function(iProxyMap) {
		this.proxyMap = iProxyMap;
	}
	,sendScopeMessage: function(scopeName,type,params) {
		var moduleName = this.messenger.moduleName;
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage(moduleName,this,type,params,true));
		mvcexpress.core.ModuleManager.sendScopeMessage(moduleName,scopeName,type,params);
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxy.TraceProxy_sendScopeMessage(moduleName,this,type,params,false));
	}
	,sendMessage: function(type,params) {
		var moduleName = this.messenger.moduleName;
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage(moduleName,this,type,params,true));
		this.messenger.send(type,params);
		var scopeCount = this.proxyScopes.length;
		var _g = 0;
		while(_g < scopeCount) {
			var i = _g++;
			mvcexpress.core.ModuleManager.sendScopeMessage(moduleName,this.proxyScopes[i],type,params,false);
		}
		mvcexpress.MvcExpress.debug(new mvcexpress.core.traceobjects.proxy.TraceProxy_sendMessage(moduleName,this,type,params,false));
	}
	,get_isReady: function() {
		return this._isReady;
	}
	,onRemove: function() {
	}
	,onRegister: function() {
	}
	,pendingInjections: null
	,dependantCommands: null
	,proxyScopes: null
	,messenger: null
	,_isReady: null
	,proxyMap: null
	,__class__: mvcexpress.mvc.Proxy
	,__properties__: {get_isReady:"get_isReady"}
}
mvcexpress.utils = {}
mvcexpress.utils.MvcExpressTools = function() { }
$hxClasses["mvcexpress.utils.MvcExpressTools"] = mvcexpress.utils.MvcExpressTools;
mvcexpress.utils.MvcExpressTools.__name__ = ["mvcexpress","utils","MvcExpressTools"];
mvcexpress.utils.MvcExpressTools.checkClassSuperClass = function(classObject,superClass) {
	var retVal = false;
	var classParent = Type.getSuperClass(classObject);
	if(classParent != superClass) while(classParent != superClass && classParent != null) {
		classParent = Type.getSuperClass(classParent);
		if(classParent == superClass) retVal = true;
	} else retVal = true;
	return retVal;
}
mvcexpress.utils.MvcExpressTools.checkClassStringConstants = function(args) {
	var _g1 = 0, _g = args.length;
	while(_g1 < _g) {
		var i = _g1++;
		var constantClass = args[i];
		if(constantClass != null) {
			haxe.Log.trace("register class ?",{ fileName : "MvcExpressTools.hx", lineNumber : 44, className : "mvcexpress.utils.MvcExpressTools", methodName : "checkClassStringConstants", customParams : [mvcexpress.utils.StringConstantRegistry.registeredClasses.h[constantClass.__id__] == true]});
			if(mvcexpress.utils.StringConstantRegistry.registeredClasses.h[constantClass.__id__] != true) {
				var _g2 = 0, _g3 = Type.getClassFields(constantClass);
				while(_g2 < _g3.length) {
					var j = _g3[_g2];
					++_g2;
					var value = Reflect.field(constantClass,j);
					if(js.Boot.__instanceof(value,String)) {
						if(mvcexpress.utils.StringConstantRegistry.stringRegistry.exists(value)) throw "Class " + Std.string(constantClass) + " and " + Std.string(Reflect.field(mvcexpress.utils.StringConstantRegistry.stringRegistry,value)) + " have same string constant value : " + value; else mvcexpress.utils.StringConstantRegistry.stringRegistry.set(value,constantClass);
					}
				}
				mvcexpress.utils.StringConstantRegistry.registeredClasses.set(constantClass,true);
			}
		} else throw "Please send Class names to checkClassStringConstants() only(not object or strings).";
	}
}
mvcexpress.utils.StringConstantRegistry = function() { }
$hxClasses["mvcexpress.utils.StringConstantRegistry"] = mvcexpress.utils.StringConstantRegistry;
mvcexpress.utils.StringConstantRegistry.__name__ = ["mvcexpress","utils","StringConstantRegistry"];
mvcexpress.utils.RttiHelper = function() { }
$hxClasses["mvcexpress.utils.RttiHelper"] = mvcexpress.utils.RttiHelper;
mvcexpress.utils.RttiHelper.__name__ = ["mvcexpress","utils","RttiHelper"];
mvcexpress.utils.RttiHelper.getMetaFields = function(type) {
	var metalist = new Array();
	while(type != null) {
		var allFields = Type.getInstanceFields(type);
		var typeMeta = haxe.rtti.Meta.getFields(type);
		var meta = { };
		var _g = 0, _g1 = Reflect.fields(typeMeta);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			meta[field] = Reflect.field(typeMeta,field);
		}
		var _g = 0, _g1 = Reflect.fields(allFields);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = Reflect.fields(meta);
			while(_g2 < _g3.length) {
				var k = _g3[_g2];
				++_g2;
				if(k == allFields[field]) {
					var obj = Type.createInstance(type,[]);
					haxe.Log.trace(Type["typeof"](Reflect.field(obj,k)),{ fileName : "RttiHelper.hx", lineNumber : 30, className : "mvcexpress.utils.RttiHelper", methodName : "getMetaFields"});
					haxe.Log.trace("all fields > " + k + ">" + allFields[field] + Std.string(Type["typeof"](allFields[field])),{ fileName : "RttiHelper.hx", lineNumber : 31, className : "mvcexpress.utils.RttiHelper", methodName : "getMetaFields"});
				}
			}
		}
		metalist.push(meta);
		type = Type.getSuperClass(type);
	}
	return metalist;
}
var openfl = {}
openfl.display = {}
openfl.display.Tilesheet = function(image) {
	this.nmeBitmap = image;
	this.nmeCenterPoints = new Array();
	this.nmeTileRects = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,addTileRect: function(rectangle,centerPoint) {
		this.nmeTileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new flash.geom.Point();
		this.nmeCenterPoints.push(centerPoint);
		return this.nmeTileRects.length - 1;
	}
	,nmeTileRects: null
	,nmeCenterPoints: null
	,nmeBitmap: null
	,__class__: openfl.display.Tilesheet
}
var suites = {}
suites.SuiteModuleNames = function() { }
$hxClasses["suites.SuiteModuleNames"] = suites.SuiteModuleNames;
suites.SuiteModuleNames.__name__ = ["suites","SuiteModuleNames"];
suites.TestViewEvent = function(type,messageType,testClass) {
	flash.events.Event.call(this,type);
	this.testClass = testClass;
	this.messageType = messageType;
};
$hxClasses["suites.TestViewEvent"] = suites.TestViewEvent;
suites.TestViewEvent.__name__ = ["suites","TestViewEvent"];
suites.TestViewEvent.__super__ = flash.events.Event;
suites.TestViewEvent.prototype = $extend(flash.events.Event.prototype,{
	testClass: null
	,messageType: null
	,__class__: suites.TestViewEvent
});
suites.faturegetproxy = {}
suites.faturegetproxy.FeatureGetProxyTests = function() {
	this._currentTest = 0;
	this.testFunction("featureGetProxy_get_proxy_in_proxy");
	this.testFunction("featureGetProxy_get_proxy_in_mediator");
	this.testFunction("featureGetProxy_get_proxy_in_command");
	this.testFunction("featureGetProxy_get_proxy_in_module");
	this.testFunction("featureGetProxy_get_proxy_interfaced_in_proxy");
	this.testFunction("featureGetProxy_get_proxy_interfaced_in_mediator");
	this.testFunction("featureGetProxy_get_proxy_interfaced_in_command");
	this.testFunction("featureGetProxy_get_proxy_interfaced_in_module");
	this.testFunction("featureGetProxy_get_proxy_interfaced_named_in_proxy");
	this.testFunction("featureGetProxy_get_proxy_interfaced_named_in_mediator");
	this.testFunction("featureGetProxy_get_proxy_interfaced_named_in_command");
	this.testFunction("featureGetProxy_get_proxy_interfaced_named_in_module");
};
$hxClasses["suites.faturegetproxy.FeatureGetProxyTests"] = suites.faturegetproxy.FeatureGetProxyTests;
suites.faturegetproxy.FeatureGetProxyTests.__name__ = ["suites","faturegetproxy","FeatureGetProxyTests"];
suites.faturegetproxy.FeatureGetProxyTests.prototype = {
	featureGetProxy_get_proxy_interfaced_named_in_module: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy,"testName");
		var returnedObj = this.mainModule.getTestProxy(suites.testobjects.model.ISimpleTestProxy,"testName");
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_named_in_command: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy,"testName");
		var returnedObj = this.mainModule.getProxyInCommand(suites.testobjects.model.ISimpleTestProxy,"testName");
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_named_in_mediator: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy,"testName");
		var returnedObj = this.mainModule.getProxyFromMediator(suites.testobjects.model.ISimpleTestProxy,"testName");
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_named_in_proxy: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy,"testName");
		var returnedObj = this.mainModule.getProxyFromProxy(suites.testobjects.model.ISimpleTestProxy,"testName");
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_in_module: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy);
		var returnedObj = this.mainModule.getTestProxy(suites.testobjects.model.ISimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_in_command: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy);
		var returnedObj = this.mainModule.getProxyInCommand(suites.testobjects.model.ISimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_in_mediator: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy);
		var returnedObj = this.mainModule.getProxyFromMediator(suites.testobjects.model.ISimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_interfaced_in_proxy: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy,suites.testobjects.model.ISimpleTestProxy);
		var returnedObj = this.mainModule.getProxyFromProxy(suites.testobjects.model.ISimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_in_module: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy);
		var returnedObj = this.mainModule.getTestProxy(suites.testobjects.model.SimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from modules.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_in_command: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy);
		var returnedObj = this.mainModule.getProxyInCommand(suites.testobjects.model.SimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_in_mediator: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy);
		var returnedObj = this.mainModule.getProxyFromMediator(suites.testobjects.model.SimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from mediators.",testProxy,returnedObj);
	}
	,featureGetProxy_get_proxy_in_proxy: function() {
		var testProxy = new suites.testobjects.model.SimpleTestProxy();
		this.mainModule.mapTestProxy(testProxy);
		var returnedObj = this.mainModule.getProxyFromProxy(suites.testobjects.model.SimpleTestProxy);
		utils.Assert.assertStrictlyEquals("You should be abble to get mapped proxies from other proxies.",testProxy,returnedObj);
	}
	,runAfterEveryTest: function() {
		this.mainModule.disposeModule();
	}
	,runBeforeEveryTest: function() {
		this.mainModule = new suites.testobjects.modulemain.MainModule();
	}
	,testFunction: function(funcName) {
		haxe.Log.trace("\n*-------------------------*\n* current Test = " + ++this._currentTest + " \n*-------------------------*",{ fileName : "FeatureGetProxyTests.hx", lineNumber : 37, className : "suites.faturegetproxy.FeatureGetProxyTests", methodName : "testFunction"});
		this.runBeforeEveryTest();
		Reflect.field(this,funcName).apply(this,[]);
		this.runAfterEveryTest();
	}
	,_currentTest: null
	,mainModule: null
	,__class__: suites.faturegetproxy.FeatureGetProxyTests
}
suites.general = {}
suites.general.GeneralTests = function() {
	this.general_framework_version();
	this.general_debug_flag();
};
$hxClasses["suites.general.GeneralTests"] = suites.general.GeneralTests;
suites.general.GeneralTests.__name__ = ["suites","general","GeneralTests"];
suites.general.GeneralTests.prototype = {
	general_debug_flag: function() {
		haxe.Log.trace("DEBUG_COMPILE",{ fileName : "GeneralTests.hx", lineNumber : 29, className : "suites.general.GeneralTests", methodName : "general_debug_flag"});
		haxe.Log.trace(mvcexpress.MvcExpress.get_DEBUG_COMPILE(),{ fileName : "GeneralTests.hx", lineNumber : 30, className : "suites.general.GeneralTests", methodName : "general_debug_flag"});
		utils.Assert.assertTrue("While compiling in debug - MvcExpress.DEBUG_COMPILE must be true.",mvcexpress.MvcExpress.get_DEBUG_COMPILE());
		return;
		utils.Assert.assertFalse("While compiling in debug - MvcExpress.DEBUG_COMPILE must be false.",mvcexpress.MvcExpress.get_DEBUG_COMPILE());
	}
	,general_framework_version: function() {
		haxe.Log.trace("VERSION",{ fileName : "GeneralTests.hx", lineNumber : 19, className : "suites.general.GeneralTests", methodName : "general_framework_version"});
		haxe.Log.trace(mvcexpress.MvcExpress.get_VERSION(),{ fileName : "GeneralTests.hx", lineNumber : 20, className : "suites.general.GeneralTests", methodName : "general_framework_version"});
		utils.Assert.assertEquals("Version must be defined using 3 numbers, separated by dots.",mvcexpress.MvcExpress.get_VERSION().split(".").length,3);
	}
	,__class__: suites.general.GeneralTests
}
suites.mediatormap = {}
suites.mediatormap.MediatorMapTests = function() {
	this.testFunction("mediatorMap_onRegister_and_no_onRemove");
	this.testFunction("mediatorMap_onRegister_and_onRemove");
	this.testFunction("mediatorMap_messag_callBack_test");
	this.testFunction("mediatorMap_mediateWith_notFails");
	this.testFunction("debug_test_isMapped_false_wrong_view");
	this.testFunction("debug_test_isMapped_false_wrong_mediator");
	this.testFunction("debug_test_isMapped_true");
};
$hxClasses["suites.mediatormap.MediatorMapTests"] = suites.mediatormap.MediatorMapTests;
suites.mediatormap.MediatorMapTests.__name__ = ["suites","mediatormap","MediatorMapTests"];
suites.mediatormap.MediatorMapTests.prototype = {
	callBackIncrease: function(obj) {
		this.callCaunter++;
	}
	,callBackCheck: function(obj) {
		if(this.callCaunter != this.callsExpected) utils.Assert.fail("Expected " + this.callsExpected + " calls, but " + this.callCaunter + " was received...");
	}
	,callBackSuccess: function(obj) {
	}
	,callBackFail: function(obj) {
		utils.Assert.fail("CallBack should not be called...");
	}
	,debug_map_not_mediator_fails: function() {
		var errorChecked = false;
		errorChecked = true;
		this.mediatorMap.map(flash.display.Sprite,flash.display.Bitmap);
		if(!errorChecked) utils.Assert.fail("fake error");
	}
	,debug_test_isMapped_true: function() {
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		utils.Assert.assertTrue("isMapped() should retturn true with mapped view class to mediator class.",this.mediatorMap.isMapped(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator));
	}
	,debug_test_isMapped_false_wrong_mediator: function() {
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		utils.Assert.assertFalse("isMapped() should retturn false with NOT mapped mediator class to view.",this.mediatorMap.isMapped(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.testobjects.view.MediatorSpriteMediator));
	}
	,debug_test_isMapped_false_wrong_view: function() {
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		utils.Assert.assertFalse("isMapped() should retturn false with NOT mapped view class.",this.mediatorMap.isMapped(suites.testobjects.view.MediatorSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator));
	}
	,mediatorMap_doubleMediateWith_fails: function() {
		mvcexpress.mvc.Mediator.canConstruct = true;
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediateWith(view,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		this.mediatorMap.mediateWith(view,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		mvcexpress.mvc.Mediator.canConstruct = false;
	}
	,mediatorMap_mediateWith_notFails: function() {
		mvcexpress.mvc.Mediator.canConstruct = true;
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediateWith(view,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		mvcexpress.mvc.Mediator.canConstruct = false;
	}
	,mediatorMap_doubleMediate_fails: function() {
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediate(view);
		this.mediatorMap.mediate(view);
	}
	,mediatorMap_messag_callBack_test: function() {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION = $bind(this,this.callBackSuccess);
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediate(view);
		this.messenger.send(suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.TEST_MESSAGE_TYPE);
	}
	,mediatorMap_onRegister_and_onRemove: function() {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = $bind(this,this.callBackSuccess);
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = $bind(this,this.callBackSuccess);
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediate(view);
		this.mediatorMap.unmediate(view);
	}
	,mediatorMap_onRegister_and_no_onRemove: function() {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = $bind(this,this.callBackSuccess);
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = $bind(this,this.callBackFail);
		this.mediatorMap.map(suites.mediatormap.medatormaptestobj.MediatorMapTestSprite,suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator);
		var view = new suites.mediatormap.medatormaptestobj.MediatorMapTestSprite();
		this.mediatorMap.mediate(view);
	}
	,runAfterEveryTest: function() {
		this.messenger = null;
		this.proxyMap = null;
		this.mediatorMap = null;
		this.callCaunter = 0;
		this.callsExpected = 0;
	}
	,runBeforeEveryTest: function() {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this.messenger = new mvcexpress.core.messenger.Messenger("test");
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		this.proxyMap = new mvcexpress.core.ProxyMap("test",this.messenger);
		this.mediatorMap = new mvcexpress.core.MediatorMap("test",this.messenger,this.proxyMap);
		this.callCaunter = 0;
		this.callsExpected = 0;
	}
	,testFunction: function(funcName) {
		this.runBeforeEveryTest();
		Reflect.field(this,funcName).apply(this,[]);
		this.runAfterEveryTest();
	}
	,callsExpected: null
	,callCaunter: null
	,mediatorMap: null
	,proxyMap: null
	,messenger: null
	,__class__: suites.mediatormap.MediatorMapTests
}
suites.mediatormap.medatormaptestobj = {}
suites.mediatormap.medatormaptestobj.MediatorMapTestSprite = function() {
	flash.display.Sprite.call(this);
};
$hxClasses["suites.mediatormap.medatormaptestobj.MediatorMapTestSprite"] = suites.mediatormap.medatormaptestobj.MediatorMapTestSprite;
suites.mediatormap.medatormaptestobj.MediatorMapTestSprite.__name__ = ["suites","mediatormap","medatormaptestobj","MediatorMapTestSprite"];
suites.mediatormap.medatormaptestobj.MediatorMapTestSprite.__super__ = flash.display.Sprite;
suites.mediatormap.medatormaptestobj.MediatorMapTestSprite.prototype = $extend(flash.display.Sprite.prototype,{
	__class__: suites.mediatormap.medatormaptestobj.MediatorMapTestSprite
});
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator = function() {
	mvcexpress.mvc.Mediator.call(this);
};
$hxClasses["suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator"] = suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator;
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.__name__ = ["suites","mediatormap","medatormaptestobj","MediatorMapTestSpriteMediator"];
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION = function(msg) {
}
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION = function(msg) {
}
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION = function(msg) {
}
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.__super__ = mvcexpress.mvc.Mediator;
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.prototype = $extend(mvcexpress.mvc.Mediator.prototype,{
	handleTestCallBack: function(params) {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.CALLBACK_TEST_FUNCTION();
	}
	,onRemove: function() {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REMOVE_TEST_FUNCTION();
	}
	,onRegister: function() {
		suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.REGISTER_TEST_FUNCTION();
		this.addHandler(suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.TEST_MESSAGE_TYPE,$bind(this,this.handleTestCallBack));
	}
	,__class__: suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator
});
suites.mediators = {}
suites.mediators.MediatorTests = function() {
	this.testFunction("mediator_constructor_fails");
	this.testFunction("mediator_isReady");
	this.testFunction("mediator_empty_handler");
	this.testFunction("mediator_handler_object_params");
	this.testFunction("mediator_handler_bad_params");
	this.testFunction("mediator_handler_two_params");
	this.testFunction("mediator_handler_two_params_one_optional");
	this.testFunction("mediator_same_handler_added_twice_fails");
};
$hxClasses["suites.mediators.MediatorTests"] = suites.mediators.MediatorTests;
suites.mediators.MediatorTests.__name__ = ["suites","mediators","MediatorTests"];
suites.mediators.MediatorTests.prototype = {
	mediator_same_handler_added_twice_fails: function() {
		this.testView.tryAddingHandlerTwice();
		utils.Assert.fail("Adding handlen twice should fail.");
	}
	,mediator_handler_two_params_one_optional: function() {
		this.messenger.send("test_handler_two_params_one_optional");
	}
	,mediator_handler_two_params: function() {
		this.messenger.send("test_handler_two_params");
	}
	,mediator_handler_bad_params: function() {
		this.messenger.send("test_handler_bad_params");
	}
	,mediator_handler_object_params: function() {
		this.messenger.send("test_handler_object_params");
	}
	,mediator_empty_handler: function() {
		this.messenger.send("test_add_empty_handler");
		return;
		throw "Debug mode is needed for this test.";
	}
	,mediator_isReady: function() {
		utils.Assert.assertTrue("After view mediating mediator isReady must be true.",suites.testobjects.view.MediatorSpriteMediator.instance.getIsReady());
	}
	,mediator_constructor_fails: function() {
		new suites.testobjects.view.MediatorSpriteMediator();
		return;
		throw "Fake error.";
	}
	,runAfterEveryTest: function() {
		this.mediatorMap.unmediate(this.testView);
		this.messenger = null;
		this.proxyMap = null;
		this.mediatorMap = null;
		this.testView = null;
	}
	,runBeforeEveryTest: function() {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this.messenger = new mvcexpress.core.messenger.Messenger("test");
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		this.proxyMap = new mvcexpress.core.ProxyMap("test",this.messenger);
		this.mediatorMap = new mvcexpress.core.MediatorMap("test",this.messenger,this.proxyMap);
		this.mediatorMap.map(suites.testobjects.view.MediatorSprite,suites.testobjects.view.MediatorSpriteMediator);
		this.testView = new suites.testobjects.view.MediatorSprite();
		this.mediatorMap.mediate(this.testView);
	}
	,testFunction: function(funcName) {
		this.runBeforeEveryTest();
		Reflect.field(this,funcName).apply(this,[]);
		this.runAfterEveryTest();
	}
	,testView: null
	,mediatorMap: null
	,proxyMap: null
	,messenger: null
	,__class__: suites.mediators.MediatorTests
}
suites.messenger = {}
suites.messenger.MessengerTests = function() {
	this.testFunction("add_and_handle_callback");
	this.testFunction("add_callback_and_sendNot_then_message_fails_silently");
	this.testFunction("add_callback_and_disable_then_message_fails_silently");
	this.testFunction("add_and_remove_callback_then_message_fails_silently");
};
$hxClasses["suites.messenger.MessengerTests"] = suites.messenger.MessengerTests;
suites.messenger.MessengerTests.__name__ = ["suites","messenger","MessengerTests"];
suites.messenger.MessengerTests.prototype = {
	callbacknormal: function(obj) {
		haxe.Log.trace("callbacknormal",{ fileName : "MessengerTests.hx", lineNumber : 106, className : "suites.messenger.MessengerTests", methodName : "callbacknormal"});
	}
	,callBackSuccess: function(obj) {
	}
	,callBackFail: function(obj) {
		utils.Assert.fail("CallBack should not be called...");
	}
	,add_and_remove_callback_then_message_fails_silently: function() {
		var callBack = $bind(this,this.callBackFail);
		this.messenger.addHandler("test3",callBack);
		this.messenger.removeHandler("test3",callBack);
		this.messenger.send("test3");
	}
	,add_callback_and_disable_then_message_fails_silently: function() {
		var callBack = $bind(this,this.callBackFail);
		var handlerVo = this.messenger.addHandler("test2",callBack);
		handlerVo.handler = null;
		this.messenger.send("test2");
	}
	,add_callback_and_sendNot_then_message_fails_silently: function() {
		this.messenger.send("test_notListened");
		this.messenger.addHandler("test",$bind(this,this.callBackFail));
	}
	,add_and_handle_callback: function() {
		this.messenger.addHandler("test",$bind(this,this.callbacknormal));
		this.messenger.send("test");
	}
	,runAfterEveryTest: function() {
		this.messenger = null;
	}
	,runBeforeEveryTest: function() {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this.messenger = new mvcexpress.core.messenger.Messenger("test");
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
	}
	,testFunction: function(funcName) {
		this.runBeforeEveryTest();
		Reflect.field(this,funcName).apply(this,[]);
		this.runAfterEveryTest();
	}
	,messenger: null
	,__class__: suites.messenger.MessengerTests
}
suites.modules = {}
suites.modules.ModularTests = function() {
	this.modules_construct_core_module();
	this.modules_construct_sprite_module();
	this.modules_construct_movieclip_module();
};
$hxClasses["suites.modules.ModularTests"] = suites.modules.ModularTests;
suites.modules.ModularTests.__name__ = ["suites","modules","ModularTests"];
suites.modules.ModularTests.prototype = {
	modules_construct_movieclip_module: function() {
		new suites.modules.objects.MovieClipModuleTester();
	}
	,modules_construct_sprite_module: function() {
		new suites.modules.objects.SpriteModuleTester();
	}
	,modules_construct_core_module: function() {
		new suites.modules.objects.CoreModuleTester();
	}
	,__class__: suites.modules.ModularTests
}
suites.modules.objects = {}
suites.modules.objects.CoreModuleTester = function() {
	mvcexpress.modules.ModuleCore.call(this);
};
$hxClasses["suites.modules.objects.CoreModuleTester"] = suites.modules.objects.CoreModuleTester;
suites.modules.objects.CoreModuleTester.__name__ = ["suites","modules","objects","CoreModuleTester"];
suites.modules.objects.CoreModuleTester.__super__ = mvcexpress.modules.ModuleCore;
suites.modules.objects.CoreModuleTester.prototype = $extend(mvcexpress.modules.ModuleCore.prototype,{
	__class__: suites.modules.objects.CoreModuleTester
});
suites.modules.objects.MovieClipModuleTester = function() {
	mvcexpress.modules.ModuleMovieClip.call(this);
};
$hxClasses["suites.modules.objects.MovieClipModuleTester"] = suites.modules.objects.MovieClipModuleTester;
suites.modules.objects.MovieClipModuleTester.__name__ = ["suites","modules","objects","MovieClipModuleTester"];
suites.modules.objects.MovieClipModuleTester.__super__ = mvcexpress.modules.ModuleMovieClip;
suites.modules.objects.MovieClipModuleTester.prototype = $extend(mvcexpress.modules.ModuleMovieClip.prototype,{
	__class__: suites.modules.objects.MovieClipModuleTester
});
suites.modules.objects.SpriteModuleTester = function() {
	mvcexpress.modules.ModuleSprite.call(this);
};
$hxClasses["suites.modules.objects.SpriteModuleTester"] = suites.modules.objects.SpriteModuleTester;
suites.modules.objects.SpriteModuleTester.__name__ = ["suites","modules","objects","SpriteModuleTester"];
suites.modules.objects.SpriteModuleTester.__super__ = mvcexpress.modules.ModuleSprite;
suites.modules.objects.SpriteModuleTester.prototype = $extend(mvcexpress.modules.ModuleSprite.prototype,{
	__class__: suites.modules.objects.SpriteModuleTester
});
suites.proxymap = {}
suites.proxymap.NamedInterfacedProxyMapTests = function() {
	this.runBeforeEveryTest();
	this.class_proxy_not_null();
	this.runAfterEveryTest();
};
$hxClasses["suites.proxymap.NamedInterfacedProxyMapTests"] = suites.proxymap.NamedInterfacedProxyMapTests;
suites.proxymap.NamedInterfacedProxyMapTests.__name__ = ["suites","proxymap","NamedInterfacedProxyMapTests"];
suites.proxymap.NamedInterfacedProxyMapTests.prototype = {
	class_proxy_not_null: function() {
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy(),suites.proxymap.proxytestobj.ITestProxy);
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy(),suites.proxymap.proxytestobj.ITestProxy,"namedProxyInterface");
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy(),null,"namedProxy");
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy(),suites.proxymap.proxytestobj.TestProxy,"namedProxyNotNullClass");
		this.namedTestingProxy = new suites.proxymap.namedproxytestobj.NamedProxyTestingProxy();
		this.proxyMap.injectStuff(this.namedTestingProxy,suites.proxymap.namedproxytestobj.NamedProxyTestingProxy);
		utils.Assert.assertNotNull("Fail at proxy must be not null:",this.namedTestingProxy.proxy);
		utils.Assert.assertNotNull("Fail at proxyNamedNotNullClass must be not null:",this.namedTestingProxy.proxyNamedNotNullClass);
		utils.Assert.assertNotNull("Fail at proxyInterface must be not null:",this.namedTestingProxy.proxyInterface);
		utils.Assert.assertNotNull("Fail at proxyNamed must be not null:",this.namedTestingProxy.proxyNamed);
		utils.Assert.assertNotNull("Fail at proxyNamedInterface must be not null:",this.namedTestingProxy.proxyNamedInterface);
	}
	,runAfterEveryTest: function() {
		this.messenger = null;
		this.proxyMap = null;
	}
	,runBeforeEveryTest: function() {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this.messenger = new mvcexpress.core.messenger.Messenger("test");
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		this.proxyMap = new mvcexpress.core.ProxyMap("test",this.messenger);
	}
	,namedTestingProxy: null
	,proxyMap: null
	,messenger: null
	,__class__: suites.proxymap.NamedInterfacedProxyMapTests
}
suites.proxymap.OldProxyMapTests = function() {
	this.testFunction("using_object_test");
	this.testFunction("using_object_proxy_twice_both_should_be_equal");
	this.testFunction("mapping_object_proxy_twice_throws_error");
	this.testFunction("mappings_does_not_exists_throws_error");
	this.testFunction("removing_class_proxy");
	this.testFunction("removing_object_proxy");
	this.testFunction("debug_test_isMapped_false");
	this.testFunction("debug_test_isMapped_true");
};
$hxClasses["suites.proxymap.OldProxyMapTests"] = suites.proxymap.OldProxyMapTests;
suites.proxymap.OldProxyMapTests.__name__ = ["suites","proxymap","OldProxyMapTests"];
suites.proxymap.OldProxyMapTests.prototype = {
	callBackIncrease: function(obj) {
		this.callCaunter++;
	}
	,callBackCheck: function(obj) {
		if(this.callCaunter != this.callsExpected) utils.Assert.fail("Expected " + this.callsExpected + " calls, but " + this.callCaunter + " was received...");
	}
	,callBackSuccess: function(obj) {
	}
	,callBackFail: function(obj) {
		utils.Assert.fail("CallBack should not be called...");
	}
	,debug_test_isMapped_true: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		this.proxyMap.map(testProxy);
		utils.Assert.assertTrue("isMapped() should retturn true with mapped proxy.",this.proxyMap.isMapped(testProxy));
	}
	,debug_test_isMapped_false: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		utils.Assert.assertFalse("isMapped() should retturn false with NOT mapped proxy.",this.proxyMap.isMapped(testProxy));
	}
	,removing_object_proxy: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		this.proxyMap.map(testProxy);
		this.proxyMap.unmap(suites.proxymap.proxytestobj.TestProxy);
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
	}
	,removing_class_proxy: function() {
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
		this.proxyMap.unmap(suites.proxymap.proxytestobj.TestProxy);
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
	}
	,mappings_does_not_exists_throws_error: function() {
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
	}
	,mapping_object_proxy_twice_throws_error: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		this.proxyMap.map(testProxy);
		this.proxyMap.map(testProxy);
	}
	,using_object_proxy_twice_both_should_be_equal: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		this.proxyMap.map(testProxy);
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		var obj2 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
		this.proxyMap.injectStuff(obj2,suites.proxymap.proxytestobj.ProxyTestObj);
		utils.Assert.assertEquals("Injected value object must be equel everythere.",obj1.testProxy,obj2.testProxy);
	}
	,using_object_test: function() {
		var testProxy = new suites.proxymap.proxytestobj.TestProxy();
		this.proxyMap.map(testProxy,suites.proxymap.proxytestobj.TestProxy);
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
	}
	,mapping_class_proxy_twice_throws_error: function() {
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
	}
	,using_class_proxy_twice_both_should_be_equal: function() {
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		var obj2 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
		this.proxyMap.injectStuff(obj2,suites.proxymap.proxytestobj.ProxyTestObj);
		utils.Assert.assertEquals("Injected class object must be equel everythere.",obj1.testProxy,obj2.testProxy);
	}
	,using_class_proxy: function() {
		this.proxyMap.map(new suites.proxymap.proxytestobj.TestProxy());
		var obj1 = new suites.proxymap.proxytestobj.ProxyTestObj();
		this.proxyMap.injectStuff(obj1,suites.proxymap.proxytestobj.ProxyTestObj);
	}
	,runAfterEveryTest: function() {
		this.messenger = null;
		this.proxyMap = null;
		this.callCaunter = 0;
		this.callsExpected = 0;
	}
	,runBeforeEveryTest: function() {
		mvcexpress.core.messenger.Messenger.allowInstantiation = true;
		this.messenger = new mvcexpress.core.messenger.Messenger("test");
		mvcexpress.core.messenger.Messenger.allowInstantiation = false;
		this.proxyMap = new mvcexpress.core.ProxyMap("test",this.messenger);
		this.callCaunter = 0;
		this.callsExpected = 0;
	}
	,testFunction: function(funcName) {
		this.runBeforeEveryTest();
		Reflect.field(this,funcName).apply(this,[]);
		this.runAfterEveryTest();
	}
	,callsExpected: null
	,callCaunter: null
	,proxyMap: null
	,messenger: null
	,__class__: suites.proxymap.OldProxyMapTests
}
suites.proxymap.namedproxytestobj = {}
suites.proxymap.namedproxytestobj.NamedProxyTestingProxy = function() {
	mvcexpress.mvc.Proxy.call(this);
};
$hxClasses["suites.proxymap.namedproxytestobj.NamedProxyTestingProxy"] = suites.proxymap.namedproxytestobj.NamedProxyTestingProxy;
suites.proxymap.namedproxytestobj.NamedProxyTestingProxy.__name__ = ["suites","proxymap","namedproxytestobj","NamedProxyTestingProxy"];
suites.proxymap.namedproxytestobj.NamedProxyTestingProxy.__super__ = mvcexpress.mvc.Proxy;
suites.proxymap.namedproxytestobj.NamedProxyTestingProxy.prototype = $extend(mvcexpress.mvc.Proxy.prototype,{
	proxyNamedNotNullClass: null
	,proxyNamed: null
	,proxyNamedInterface: null
	,proxyInterface: null
	,proxy: null
	,__class__: suites.proxymap.namedproxytestobj.NamedProxyTestingProxy
});
suites.proxymap.proxytestobj = {}
suites.proxymap.proxytestobj.ITestProxy = function() { }
$hxClasses["suites.proxymap.proxytestobj.ITestProxy"] = suites.proxymap.proxytestobj.ITestProxy;
suites.proxymap.proxytestobj.ITestProxy.__name__ = ["suites","proxymap","proxytestobj","ITestProxy"];
suites.proxymap.proxytestobj.DifferentProxy = function() {
	mvcexpress.mvc.Proxy.call(this);
};
$hxClasses["suites.proxymap.proxytestobj.DifferentProxy"] = suites.proxymap.proxytestobj.DifferentProxy;
suites.proxymap.proxytestobj.DifferentProxy.__name__ = ["suites","proxymap","proxytestobj","DifferentProxy"];
suites.proxymap.proxytestobj.DifferentProxy.__interfaces__ = [suites.proxymap.proxytestobj.ITestProxy];
suites.proxymap.proxytestobj.DifferentProxy.__super__ = mvcexpress.mvc.Proxy;
suites.proxymap.proxytestobj.DifferentProxy.prototype = $extend(mvcexpress.mvc.Proxy.prototype,{
	__class__: suites.proxymap.proxytestobj.DifferentProxy
});
suites.proxymap.proxytestobj.ProxyTestObj = function() {
};
$hxClasses["suites.proxymap.proxytestobj.ProxyTestObj"] = suites.proxymap.proxytestobj.ProxyTestObj;
suites.proxymap.proxytestobj.ProxyTestObj.__name__ = ["suites","proxymap","proxytestobj","ProxyTestObj"];
suites.proxymap.proxytestobj.ProxyTestObj.prototype = {
	testProxy2: null
	,testProxy1112: null
	,testProxy: null
	,__class__: suites.proxymap.proxytestobj.ProxyTestObj
}
suites.proxymap.proxytestobj.TestProxy = function() {
	mvcexpress.mvc.Proxy.call(this);
};
$hxClasses["suites.proxymap.proxytestobj.TestProxy"] = suites.proxymap.proxytestobj.TestProxy;
suites.proxymap.proxytestobj.TestProxy.__name__ = ["suites","proxymap","proxytestobj","TestProxy"];
suites.proxymap.proxytestobj.TestProxy.__interfaces__ = [suites.proxymap.proxytestobj.ITestProxy];
suites.proxymap.proxytestobj.TestProxy.__super__ = mvcexpress.mvc.Proxy;
suites.proxymap.proxytestobj.TestProxy.prototype = $extend(mvcexpress.mvc.Proxy.prototype,{
	different: null
	,__class__: suites.proxymap.proxytestobj.TestProxy
});
suites.testobjects = {}
suites.testobjects.ITestObject = function() { }
$hxClasses["suites.testobjects.ITestObject"] = suites.testobjects.ITestObject;
suites.testobjects.ITestObject.__name__ = ["suites","testobjects","ITestObject"];
suites.testobjects.TestObject = function() {
};
$hxClasses["suites.testobjects.TestObject"] = suites.testobjects.TestObject;
suites.testobjects.TestObject.__name__ = ["suites","testobjects","TestObject"];
suites.testobjects.TestObject.__interfaces__ = [suites.testobjects.ITestObject];
suites.testobjects.TestObject.prototype = {
	__class__: suites.testobjects.TestObject
}
suites.testobjects.controller = {}
suites.testobjects.controller.GetProxyTestCommand = function() {
	mvcexpress.mvc.Command.call(this);
};
$hxClasses["suites.testobjects.controller.GetProxyTestCommand"] = suites.testobjects.controller.GetProxyTestCommand;
suites.testobjects.controller.GetProxyTestCommand.__name__ = ["suites","testobjects","controller","GetProxyTestCommand"];
suites.testobjects.controller.GetProxyTestCommand.__super__ = mvcexpress.mvc.Command;
suites.testobjects.controller.GetProxyTestCommand.prototype = $extend(mvcexpress.mvc.Command.prototype,{
	execute: function(proxyData) {
		this.dataProxy.testProxy = this.proxyMap.getProxy(proxyData.moduleClass,proxyData.moduleName);
	}
	,dataProxy: null
	,__class__: suites.testobjects.controller.GetProxyTestCommand
});
suites.testobjects.model = {}
suites.testobjects.model.ISimpleTestProxy = function() { }
$hxClasses["suites.testobjects.model.ISimpleTestProxy"] = suites.testobjects.model.ISimpleTestProxy;
suites.testobjects.model.ISimpleTestProxy.__name__ = ["suites","testobjects","model","ISimpleTestProxy"];
suites.testobjects.model.SimpleTestProxy = function() {
	mvcexpress.mvc.Proxy.call(this);
};
$hxClasses["suites.testobjects.model.SimpleTestProxy"] = suites.testobjects.model.SimpleTestProxy;
suites.testobjects.model.SimpleTestProxy.__name__ = ["suites","testobjects","model","SimpleTestProxy"];
suites.testobjects.model.SimpleTestProxy.__interfaces__ = [suites.testobjects.model.ISimpleTestProxy];
suites.testobjects.model.SimpleTestProxy.__super__ = mvcexpress.mvc.Proxy;
suites.testobjects.model.SimpleTestProxy.prototype = $extend(mvcexpress.mvc.Proxy.prototype,{
	onRemove: function() {
	}
	,onRegister: function() {
	}
	,__class__: suites.testobjects.model.SimpleTestProxy
});
suites.testobjects.modulemain = {}
suites.testobjects.modulemain.MainDataProxy = function() {
	mvcexpress.mvc.Proxy.call(this);
	this.localCommandCount = 0;
	this.localHandlerCount = 0;
	this.remoteCommandCount = 0;
	this.remoteHandlerCount = 0;
};
$hxClasses["suites.testobjects.modulemain.MainDataProxy"] = suites.testobjects.modulemain.MainDataProxy;
suites.testobjects.modulemain.MainDataProxy.__name__ = ["suites","testobjects","modulemain","MainDataProxy"];
suites.testobjects.modulemain.MainDataProxy.__super__ = mvcexpress.mvc.Proxy;
suites.testobjects.modulemain.MainDataProxy.prototype = $extend(mvcexpress.mvc.Proxy.prototype,{
	getTestProxy: function(proxyClass,name) {
		return this.proxyMap.getProxy(proxyClass,name);
	}
	,onRemove: function() {
	}
	,onRegister: function() {
	}
	,testProxy: null
	,remoteHandlerCount: null
	,remoteCommandCount: null
	,localHandlerCount: null
	,localCommandCount: null
	,__class__: suites.testobjects.modulemain.MainDataProxy
});
suites.testobjects.modulemain.MainLocalCommand = function() {
	mvcexpress.mvc.Command.call(this);
};
$hxClasses["suites.testobjects.modulemain.MainLocalCommand"] = suites.testobjects.modulemain.MainLocalCommand;
suites.testobjects.modulemain.MainLocalCommand.__name__ = ["suites","testobjects","modulemain","MainLocalCommand"];
suites.testobjects.modulemain.MainLocalCommand.__super__ = mvcexpress.mvc.Command;
suites.testobjects.modulemain.MainLocalCommand.prototype = $extend(mvcexpress.mvc.Command.prototype,{
	execute: function(blank) {
		this.dataProxy.localCommandCount++;
	}
	,dataProxy: null
	,__class__: suites.testobjects.modulemain.MainLocalCommand
});
suites.testobjects.modulemain.MainModule = function() {
	mvcexpress.modules.ModuleSprite.call(this,suites.testobjects.modulemain.MainModule.NAME,true,false);
};
$hxClasses["suites.testobjects.modulemain.MainModule"] = suites.testobjects.modulemain.MainModule;
suites.testobjects.modulemain.MainModule.__name__ = ["suites","testobjects","modulemain","MainModule"];
suites.testobjects.modulemain.MainModule.__super__ = mvcexpress.modules.ModuleSprite;
suites.testobjects.modulemain.MainModule.prototype = $extend(mvcexpress.modules.ModuleSprite.prototype,{
	get_remoteHandlerCount: function() {
		return this.dataProxy.remoteHandlerCount;
	}
	,get_remoteCommandCount: function() {
		return this.dataProxy.remoteCommandCount;
	}
	,get_localHandlerCount: function() {
		return this.dataProxy.localHandlerCount;
	}
	,get_localCommandCount: function() {
		return this.dataProxy.localCommandCount;
	}
	,getProxyInCommand: function(proxyClass,name) {
		if(name == null) name = "";
		this.commandMap.execute(suites.testobjects.controller.GetProxyTestCommand,{ moduleClass : proxyClass, moduleName : name});
		return this.dataProxy.testProxy;
	}
	,getProxyFromMediator: function(proxyClass,name) {
		if(name == null) name = "";
		if(this.testView == null) {
			this.testView = new suites.testobjects.modulemain.MainView();
			this.mediatorMap.mediate(this.testView);
		}
		this.testView.testGetProxyClass(proxyClass,name);
		return this.dataProxy.testProxy;
	}
	,getProxyFromProxy: function(proxyClass,name) {
		if(name == null) name = "";
		return this.dataProxy.getTestProxy(proxyClass,name);
	}
	,getTestProxy: function(proxyClass,name) {
		if(name == null) name = "";
		return this.proxyMap.getProxy(proxyClass,name);
	}
	,mapTestProxy: function(testProxy,injectClass,name) {
		if(name == null) name = "";
		this.proxyMap.map(testProxy,injectClass,name);
	}
	,removeRemoteHandler: function(message) {
		if(this.testView == null) {
			this.testView = new suites.testobjects.modulemain.MainView();
			this.mediatorMap.mediate(this.testView);
		}
		this.testView.removeRemoteHandler(message);
	}
	,removeLocalHandler: function(message) {
		if(this.testView != null) {
			this.testView = new suites.testobjects.modulemain.MainView();
			this.mediatorMap.mediate(this.testView);
		}
		this.testView.removeLocalhandler(message);
	}
	,removeLocalCommand: function(message) {
		this.commandMap.unmap(message,suites.testobjects.modulemain.MainLocalCommand);
	}
	,sendTestMessage: function(message) {
		this.sendMessage(message);
	}
	,createRemoteHandler: function(message) {
		if(this.testView == null) {
			this.testView = new suites.testobjects.modulemain.MainView();
			this.mediatorMap.mediate(this.testView);
		}
		this.testView.addRemoteHandler(message);
	}
	,createLocalHandler: function(message) {
		if(this.testView == null) {
			this.testView = new suites.testobjects.modulemain.MainView();
			this.mediatorMap.mediate(this.testView);
		}
		this.testView.addLocalhandler(message);
	}
	,createLocalCommand: function(message) {
		this.commandMap.map(message,suites.testobjects.modulemain.MainLocalCommand);
	}
	,onDispose: function() {
		this.proxyMap.unmap(suites.testobjects.modulemain.MainDataProxy);
		this.dataProxy = null;
	}
	,onInit: function() {
		this.dataProxy = new suites.testobjects.modulemain.MainDataProxy();
		this.proxyMap.map(this.dataProxy);
		this.mediatorMap.map(suites.testobjects.modulemain.MainView,suites.testobjects.modulemain.MainViewMediator);
	}
	,testView: null
	,dataProxy: null
	,__class__: suites.testobjects.modulemain.MainModule
	,__properties__: $extend(mvcexpress.modules.ModuleSprite.prototype.__properties__,{get_localCommandCount:"get_localCommandCount",get_localHandlerCount:"get_localHandlerCount",get_remoteCommandCount:"get_remoteCommandCount",get_remoteHandlerCount:"get_remoteHandlerCount"})
});
suites.testobjects.modulemain.MainView = function() {
	flash.display.Sprite.call(this);
};
$hxClasses["suites.testobjects.modulemain.MainView"] = suites.testobjects.modulemain.MainView;
suites.testobjects.modulemain.MainView.__name__ = ["suites","testobjects","modulemain","MainView"];
suites.testobjects.modulemain.MainView.__super__ = flash.display.Sprite;
suites.testobjects.modulemain.MainView.prototype = $extend(flash.display.Sprite.prototype,{
	testGetProxyClass: function(proxyClass,name) {
		if(name == null) name = "";
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.TEST_GET_PROXY_CLASS,name,proxyClass));
	}
	,removeRemoteHandler: function(message) {
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.REMOVE_REMOTE_HANDLER,message));
	}
	,removeLocalhandler: function(message) {
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.REMOVE_LOCAL_HANDLER,message));
	}
	,addRemoteHandler: function(message) {
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.ADD_REMOTE_HANDLER,message));
	}
	,addLocalhandler: function(message) {
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.ADD_LOCAL_HANDLER,message));
	}
	,__class__: suites.testobjects.modulemain.MainView
});
suites.testobjects.modulemain.MainViewMediator = function() {
	mvcexpress.mvc.Mediator.call(this);
};
$hxClasses["suites.testobjects.modulemain.MainViewMediator"] = suites.testobjects.modulemain.MainViewMediator;
suites.testobjects.modulemain.MainViewMediator.__name__ = ["suites","testobjects","modulemain","MainViewMediator"];
suites.testobjects.modulemain.MainViewMediator.__super__ = mvcexpress.mvc.Mediator;
suites.testobjects.modulemain.MainViewMediator.prototype = $extend(mvcexpress.mvc.Mediator.prototype,{
	trigerRemoteHandler: function(params) {
		this.dataProxy.remoteHandlerCount++;
	}
	,trigerLocalHandler: function(params) {
		this.dataProxy.localHandlerCount++;
	}
	,handleTestProxyGetHandler: function(event) {
		this.dataProxy.testProxy = this.proxyMap.getProxy(event.testClass,event.messageType);
	}
	,handleRemoveLocalHandler: function(event) {
		this.removeHandler(event.messageType,$bind(this,this.trigerLocalHandler));
	}
	,handleAddLocalHandler: function(event) {
		this.addHandler(event.messageType,$bind(this,this.trigerLocalHandler));
	}
	,onRemove: function() {
		this.view.removeEventListener(suites.TestViewEvent.ADD_LOCAL_HANDLER,$bind(this,this.handleAddLocalHandler));
		this.view.removeEventListener(suites.TestViewEvent.REMOVE_LOCAL_HANDLER,$bind(this,this.handleRemoveLocalHandler));
		this.view.removeEventListener(suites.TestViewEvent.TEST_GET_PROXY_CLASS,$bind(this,this.handleTestProxyGetHandler));
	}
	,onRegister: function() {
		this.view.addEventListener(suites.TestViewEvent.ADD_LOCAL_HANDLER,$bind(this,this.handleAddLocalHandler));
		this.view.addEventListener(suites.TestViewEvent.REMOVE_LOCAL_HANDLER,$bind(this,this.handleRemoveLocalHandler));
		this.view.addEventListener(suites.TestViewEvent.TEST_GET_PROXY_CLASS,$bind(this,this.handleTestProxyGetHandler));
	}
	,dataProxy: null
	,view: null
	,__class__: suites.testobjects.modulemain.MainViewMediator
});
suites.testobjects.view = {}
suites.testobjects.view.MediatorSprite = function() {
	flash.display.Sprite.call(this);
};
$hxClasses["suites.testobjects.view.MediatorSprite"] = suites.testobjects.view.MediatorSprite;
suites.testobjects.view.MediatorSprite.__name__ = ["suites","testobjects","view","MediatorSprite"];
suites.testobjects.view.MediatorSprite.__super__ = flash.display.Sprite;
suites.testobjects.view.MediatorSprite.prototype = $extend(flash.display.Sprite.prototype,{
	tryAddingHandlerTwice: function() {
		this.dispatchEvent(new suites.TestViewEvent(suites.TestViewEvent.TRIGER_ADD_HANDLER));
	}
	,__class__: suites.testobjects.view.MediatorSprite
});
suites.testobjects.view.MediatorSpriteMediator = function() {
	mvcexpress.mvc.Mediator.call(this);
};
$hxClasses["suites.testobjects.view.MediatorSpriteMediator"] = suites.testobjects.view.MediatorSpriteMediator;
suites.testobjects.view.MediatorSpriteMediator.__name__ = ["suites","testobjects","view","MediatorSpriteMediator"];
suites.testobjects.view.MediatorSpriteMediator.instance = null;
suites.testobjects.view.MediatorSpriteMediator.__super__ = mvcexpress.mvc.Mediator;
suites.testobjects.view.MediatorSpriteMediator.prototype = $extend(mvcexpress.mvc.Mediator.prototype,{
	getIsReady: function() {
		return this.get_isReady();
	}
	,handleTestWithTwoParamsOneOptional: function(params,extraParam) {
	}
	,handleTestWithTwoParams: function(params,extraParam) {
	}
	,handleTestWithBadParams: function(params) {
	}
	,handleTestWithObjectParams: function(params) {
	}
	,handleTestEmpty: function() {
	}
	,handleTestEmptyHandler: function(params) {
		this.addHandler("test_empty_handler",$bind(this,this.handleTestEmpty));
	}
	,addTestHandler: function(event) {
		this.addHandler("test",$bind(this,this.handleTestEmptyHandler));
	}
	,onRemove: function() {
		suites.testobjects.view.MediatorSpriteMediator.instance = null;
	}
	,onRegister: function() {
		this.addHandler("test_add_empty_handler",$bind(this,this.handleTestEmptyHandler));
		this.addHandler("test_handler_object_params",$bind(this,this.handleTestWithObjectParams));
		this.addHandler("test_handler_bad_params",$bind(this,this.handleTestWithBadParams));
		this.addHandler("test_handler_two_params",$bind(this,this.handleTestWithTwoParams));
		this.addHandler("test_handler_two_params_one_optional",$bind(this,this.handleTestWithTwoParamsOneOptional));
		this.view.addEventListener(suites.TestViewEvent.TRIGER_ADD_HANDLER,$bind(this,this.addTestHandler));
		suites.testobjects.view.MediatorSpriteMediator.instance = this;
	}
	,view: null
	,test: null
	,__class__: suites.testobjects.view.MediatorSpriteMediator
});
suites.utils = {}
suites.utils.UtilsTests = function() {
	this.utils_checkClassSuperclass_tests();
	this.utils_two_class_check();
	this.utils_one_class_check();
	this.utils_two_class_with_duplicated_constants_fails();
};
$hxClasses["suites.utils.UtilsTests"] = suites.utils.UtilsTests;
suites.utils.UtilsTests.__name__ = ["suites","utils","UtilsTests"];
suites.utils.UtilsTests.prototype = {
	utils_checkClassSuperclass_tests: function() {
		utils.Assert.assertFalse("superclass of another class sould return false",mvcexpress.utils.MvcExpressTools.checkClassSuperClass(suites.utils.objects.ClassBSubclass,suites.utils.objects.ClassA));
		utils.Assert.assertFalse("Two diferent classes sould return false",mvcexpress.utils.MvcExpressTools.checkClassSuperClass(suites.utils.objects.ClassB,suites.utils.objects.ClassA));
		utils.Assert.assertFalse("Same class is not a subclass to self",mvcexpress.utils.MvcExpressTools.checkClassSuperClass(suites.utils.objects.ClassA,suites.utils.objects.ClassA));
		utils.Assert.assertTrue("Subclass of class should be true",mvcexpress.utils.MvcExpressTools.checkClassSuperClass(suites.utils.objects.ClassASubclass,suites.utils.objects.ClassA));
		utils.Assert.assertTrue("Subclass of Subclass of class should be true",mvcexpress.utils.MvcExpressTools.checkClassSuperClass(suites.utils.objects.ClassASubclassSubclass,suites.utils.objects.ClassA));
	}
	,utils_two_class_with_duplicated_constants_fails: function() {
		mvcexpress.utils.MvcExpressTools.checkClassStringConstants([suites.utils.objects.ConstantsA,suites.utils.objects.ConstantsAB]);
	}
	,utils_two_class_check: function() {
		mvcexpress.utils.MvcExpressTools.checkClassStringConstants([suites.utils.objects.ConstantsA,suites.utils.objects.ConstantsB]);
	}
	,utils_one_class_check: function() {
		mvcexpress.utils.MvcExpressTools.checkClassStringConstants([suites.utils.objects.ConstantsA]);
	}
	,__class__: suites.utils.UtilsTests
}
suites.utils.objects = {}
suites.utils.objects.ClassA = function() {
};
$hxClasses["suites.utils.objects.ClassA"] = suites.utils.objects.ClassA;
suites.utils.objects.ClassA.__name__ = ["suites","utils","objects","ClassA"];
suites.utils.objects.ClassA.prototype = {
	__class__: suites.utils.objects.ClassA
}
suites.utils.objects.ClassASubclass = function() {
	suites.utils.objects.ClassA.call(this);
};
$hxClasses["suites.utils.objects.ClassASubclass"] = suites.utils.objects.ClassASubclass;
suites.utils.objects.ClassASubclass.__name__ = ["suites","utils","objects","ClassASubclass"];
suites.utils.objects.ClassASubclass.__super__ = suites.utils.objects.ClassA;
suites.utils.objects.ClassASubclass.prototype = $extend(suites.utils.objects.ClassA.prototype,{
	__class__: suites.utils.objects.ClassASubclass
});
suites.utils.objects.ClassASubclassSubclass = function() {
	suites.utils.objects.ClassASubclass.call(this);
};
$hxClasses["suites.utils.objects.ClassASubclassSubclass"] = suites.utils.objects.ClassASubclassSubclass;
suites.utils.objects.ClassASubclassSubclass.__name__ = ["suites","utils","objects","ClassASubclassSubclass"];
suites.utils.objects.ClassASubclassSubclass.__super__ = suites.utils.objects.ClassASubclass;
suites.utils.objects.ClassASubclassSubclass.prototype = $extend(suites.utils.objects.ClassASubclass.prototype,{
	__class__: suites.utils.objects.ClassASubclassSubclass
});
suites.utils.objects.ClassB = function() {
};
$hxClasses["suites.utils.objects.ClassB"] = suites.utils.objects.ClassB;
suites.utils.objects.ClassB.__name__ = ["suites","utils","objects","ClassB"];
suites.utils.objects.ClassB.prototype = {
	__class__: suites.utils.objects.ClassB
}
suites.utils.objects.ClassBSubclass = function() {
	suites.utils.objects.ClassB.call(this);
};
$hxClasses["suites.utils.objects.ClassBSubclass"] = suites.utils.objects.ClassBSubclass;
suites.utils.objects.ClassBSubclass.__name__ = ["suites","utils","objects","ClassBSubclass"];
suites.utils.objects.ClassBSubclass.__super__ = suites.utils.objects.ClassB;
suites.utils.objects.ClassBSubclass.prototype = $extend(suites.utils.objects.ClassB.prototype,{
	__class__: suites.utils.objects.ClassBSubclass
});
suites.utils.objects.ConstantsA = function() { }
$hxClasses["suites.utils.objects.ConstantsA"] = suites.utils.objects.ConstantsA;
suites.utils.objects.ConstantsA.__name__ = ["suites","utils","objects","ConstantsA"];
suites.utils.objects.ConstantsAB = function() { }
$hxClasses["suites.utils.objects.ConstantsAB"] = suites.utils.objects.ConstantsAB;
suites.utils.objects.ConstantsAB.__name__ = ["suites","utils","objects","ConstantsAB"];
suites.utils.objects.ConstantsB = function() { }
$hxClasses["suites.utils.objects.ConstantsB"] = suites.utils.objects.ConstantsB;
suites.utils.objects.ConstantsB.__name__ = ["suites","utils","objects","ConstantsB"];
var utils = {}
utils.Assert = function() {
};
$hxClasses["utils.Assert"] = utils.Assert;
utils.Assert.__name__ = ["utils","Assert"];
utils.Assert.assertEquals = function(msg,arg1,arg2) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertEquals need a message to display - current message : '",msg + "'"); else utils.Assert.failNotEquals(msg,arg1,arg2);
}
utils.Assert.failNotEquals = function(message,expected,actual) {
	if(expected != actual) utils.Assert.failWithUserMessage(message,"expected:<" + Std.string(expected) + "> but was:<" + Std.string(actual) + ">");
}
utils.Assert.assertStrictlyEquals = function(msg,arg1,arg2) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertStrictlyEquals need a message to display - current message : '",msg + "'"); else utils.Assert.failNotStrictlyEquals(msg,arg1,arg2);
}
utils.Assert.failNotStrictlyEquals = function(message,expected,actual) {
	if(expected != actual) utils.Assert.failWithUserMessage(message,"expected:<" + Std.string(expected) + "> but was:<" + Std.string(actual) + ">");
}
utils.Assert.assertTrue = function(msg,arg) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertTrue need a message to display - current message : '",msg + "'"); else utils.Assert.failNotTrue(msg,arg);
}
utils.Assert.failNotTrue = function(message,condition) {
	if(!condition) utils.Assert.failWithUserMessage(message,"expected true but was false");
}
utils.Assert.assertFalse = function(msg,arg) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertFalse need a message to display - current message : '",msg + "'"); else utils.Assert.failTrue(msg,arg);
}
utils.Assert.failTrue = function(message,condition) {
	if(condition) utils.Assert.failWithUserMessage(message,"expected false but was true");
}
utils.Assert.assertNull = function(msg,arg) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertNull need a message to display - current message : '",msg + "'"); else utils.Assert.failNotNull(msg,arg);
}
utils.Assert.failNull = function(message,object) {
	if(object == null) utils.Assert.failWithUserMessage(message,"object was null: " + Std.string(object));
}
utils.Assert.assertNotNull = function(msg,arg) {
	if(msg == null) msg = "";
	if(msg == "") utils.Assert.failWithUserMessage("Assert assertNotNull need a message to display - current message : '",msg + "'"); else utils.Assert.failNull(msg,arg);
}
utils.Assert.failNotNull = function(message,object) {
	if(object != null) utils.Assert.failWithUserMessage(message,"object was not null: " + Std.string(object));
}
utils.Assert.fail = function(failMessage) {
	if(failMessage == null) failMessage = "";
	throw failMessage;
}
utils.Assert.failWithUserMessage = function(userMessage,failMessage) {
	if(userMessage.length > 0) userMessage = userMessage + " - ";
	throw userMessage + failMessage;
}
utils.Assert.prototype = {
	__class__: utils.Assert
}
utils.Async = function() { }
$hxClasses["utils.Async"] = utils.Async;
utils.Async.__name__ = ["utils","Async"];
utils.Async.proceedOnEvent = function(testCase,target,eventName,timeout,timeoutHandler) {
	if(timeout == null) timeout = 500;
	var asyncHandlingStatement = utils.Async.getCallableForTest(testCase);
	var handler;
	handler = asyncHandlingStatement.asyncHandler(asyncHandlingStatement.pendUntilComplete,timeout,null,timeoutHandler);
	target.addEventListener(eventName,handler,false,0,true);
}
utils.Async.failOnEvent = function(testCase,target,eventName,timeout,timeoutHandler) {
	if(timeout == null) timeout = 500;
	var asyncHandlingStatement = utils.Async.getCallableForTest(testCase);
	var handler;
	handler = asyncHandlingStatement.asyncHandler(asyncHandlingStatement.failOnComplete,timeout,null,asyncHandlingStatement.pendUntilComplete);
	target.addEventListener(eventName,handler,false,0,true);
}
utils.Async.registerFailureEvent = function(testCase,target,eventName) {
	var asyncHandlingStatement = utils.Async.getCallableForTest(testCase);
	var handler;
	handler = asyncHandlingStatement.asyncErrorConditionHandler(asyncHandlingStatement.failOnComplete);
	target.addEventListener(eventName,handler);
}
utils.Async.handleEvent = function(testCase,target,eventName,eventHandler,timeout,passThroughData,timeoutHandler) {
	if(timeout == null) timeout = 500;
	var asyncHandlingStatement = utils.Async.getCallableForTest(testCase);
	var handler;
	handler = asyncHandlingStatement.asyncHandler(eventHandler,timeout,passThroughData,timeoutHandler);
	target.addEventListener(eventName,handler,false,0,true);
}
utils.Async.asyncHandler = function(testCase,eventHandler,timeout,passThroughData,timeoutHandler) {
	var asyncHandlingStatement = utils.Async.getCallableForTest(testCase);
	return testCase.asyncHandler(eventHandler,timeout,passThroughData,timeoutHandler);
}
utils.Async.getCallableForTest = function(testCase) {
	var handler = utils.Async.asyncHandlerMap.get(Std.string(testCase));
	return handler;
}
utils.Async.addCallableForTest = function(name,testCase) {
	var value = testCase;
	utils.Async.asyncHandlerMap.set(name,value);
}
utils.AsyncUtil = function(testCase,callback,passThroughArgs) {
	flash.events.EventDispatcher.call(this);
	this._testCase = testCase;
	this._callback = callback;
	this._passThroughArgs = passThroughArgs;
};
$hxClasses["utils.AsyncUtil"] = utils.AsyncUtil;
utils.AsyncUtil.__name__ = ["utils","AsyncUtil"];
utils.AsyncUtil.asyncHandler = function(testCase,callBack,passThroughArgs,timeout,timeouthandler) {
	if(timeout == null) timeout = 1500;
	var asyncUtil = new utils.AsyncUtil(testCase,callBack,passThroughArgs);
	asyncUtil.addEventListener(utils.AsyncUtil.ASYNC_EVENT,utils.Async.asyncHandler(testCase,$bind(asyncUtil,asyncUtil.asyncEventHandler),timeout,passThroughArgs,timeouthandler));
	haxe.Timer.delay(function() {
		asyncUtil.asyncCallbackHandler(passThroughArgs);
	},timeout);
	return $bind(asyncUtil,asyncUtil.asyncCallbackHandler);
}
utils.AsyncUtil.__super__ = flash.events.EventDispatcher;
utils.AsyncUtil.prototype = $extend(flash.events.EventDispatcher.prototype,{
	asyncCallbackHandler: function(args) {
		this._callbackArgs = args;
		this.dispatchEvent(new flash.events.Event(utils.AsyncUtil.ASYNC_EVENT));
	}
	,asyncEventHandler: function(ev,flexUnitPassThroughArgs) {
		if(this._passThroughArgs != null) this._callbackArgs = this._callbackArgs.concat(this._passThroughArgs);
		if(this._callback != null) this._callback.apply(null,this._callbackArgs);
	}
	,_callbackArgs: null
	,_passThroughArgs: null
	,_callback: null
	,_testCase: null
	,__class__: utils.AsyncUtil
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe.Resource.content = [];
flash.display.DisplayObject.GRAPHICS_INVALID = 2;
flash.display.DisplayObject.MATRIX_INVALID = 4;
flash.display.DisplayObject.MATRIX_CHAIN_INVALID = 8;
flash.display.DisplayObject.MATRIX_OVERRIDDEN = 16;
flash.display.DisplayObject.TRANSFORM_INVALID = 32;
flash.display.DisplayObject.BOUNDS_INVALID = 64;
flash.display.DisplayObject.RENDER_VALIDATE_IN_PROGRESS = 1024;
flash.display.DisplayObject.ALL_RENDER_FLAGS = 98;
flash.Lib.HTML_ACCELEROMETER_EVENT_TYPE = "devicemotion";
flash.Lib.HTML_ORIENTATION_EVENT_TYPE = "orientationchange";
flash.Lib.DEFAULT_HEIGHT = 500;
flash.Lib.DEFAULT_WIDTH = 500;
flash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseover","mouseout","mousewheel","dblclick","click"];
flash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES = ["mousedown","mousemove","mouseup"];
flash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize","blur","focus"];
flash.Lib.NME_IDENTIFIER = "haxe:jeash";
flash.Lib.VENDOR_HTML_TAG = "data-";
flash.Lib.starttime = haxe.Timer.stamp();
flash.display._BitmapData.MinstdGenerator.a = 16807;
flash.display._BitmapData.MinstdGenerator.m = -2147483648 - 1;
flash.display.BitmapDataChannel.ALPHA = 8;
flash.display.BitmapDataChannel.BLUE = 4;
flash.display.BitmapDataChannel.GREEN = 2;
flash.display.BitmapDataChannel.RED = 1;
flash.display.Graphics.TILE_SCALE = 1;
flash.display.Graphics.TILE_ROTATION = 2;
flash.display.Graphics.TILE_RGB = 4;
flash.display.Graphics.TILE_ALPHA = 8;
flash.display.Graphics.TILE_TRANS_2x2 = 16;
flash.display.Graphics.TILE_BLEND_NORMAL = 0;
flash.display.Graphics.TILE_BLEND_ADD = 65536;
flash.display.Graphics.BMP_REPEAT = 16;
flash.display.Graphics.BMP_SMOOTH = 65536;
flash.display.Graphics.CORNER_ROUND = 0;
flash.display.Graphics.CORNER_MITER = 4096;
flash.display.Graphics.CORNER_BEVEL = 8192;
flash.display.Graphics.CURVE = 2;
flash.display.Graphics.END_NONE = 0;
flash.display.Graphics.END_ROUND = 256;
flash.display.Graphics.END_SQUARE = 512;
flash.display.Graphics.LINE = 1;
flash.display.Graphics.MOVE = 0;
flash.display.Graphics.NME_MAX_DIM = 5000;
flash.display.Graphics.PIXEL_HINTING = 16384;
flash.display.Graphics.RADIAL = 1;
flash.display.Graphics.SCALE_HORIZONTAL = 2;
flash.display.Graphics.SCALE_NONE = 0;
flash.display.Graphics.SCALE_NORMAL = 3;
flash.display.Graphics.SCALE_VERTICAL = 1;
flash.display.Graphics.SPREAD_REPEAT = 2;
flash.display.Graphics.SPREAD_REFLECT = 4;
flash.display.GraphicsPathCommand.LINE_TO = 2;
flash.display.GraphicsPathCommand.MOVE_TO = 1;
flash.display.GraphicsPathCommand.CURVE_TO = 3;
flash.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
flash.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
flash.display.GraphicsPathCommand.NO_OP = 0;
flash.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
flash.events.Event.ACTIVATE = "activate";
flash.events.Event.ADDED = "added";
flash.events.Event.ADDED_TO_STAGE = "addedToStage";
flash.events.Event.CANCEL = "cancel";
flash.events.Event.CHANGE = "change";
flash.events.Event.CLOSE = "close";
flash.events.Event.COMPLETE = "complete";
flash.events.Event.CONNECT = "connect";
flash.events.Event.CONTEXT3D_CREATE = "context3DCreate";
flash.events.Event.DEACTIVATE = "deactivate";
flash.events.Event.ENTER_FRAME = "enterFrame";
flash.events.Event.ID3 = "id3";
flash.events.Event.INIT = "init";
flash.events.Event.MOUSE_LEAVE = "mouseLeave";
flash.events.Event.OPEN = "open";
flash.events.Event.REMOVED = "removed";
flash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
flash.events.Event.RENDER = "render";
flash.events.Event.RESIZE = "resize";
flash.events.Event.SCROLL = "scroll";
flash.events.Event.SELECT = "select";
flash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
flash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
flash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
flash.events.Event.UNLOAD = "unload";
flash.events.Event.SOUND_COMPLETE = "soundComplete";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
flash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
flash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
flash.events.MouseEvent.MOUSE_OUT = "mouseOut";
flash.events.MouseEvent.MOUSE_OVER = "mouseOver";
flash.events.MouseEvent.MOUSE_UP = "mouseUp";
flash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
flash.events.MouseEvent.RIGHT_CLICK = "rightClick";
flash.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
flash.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
flash.events.MouseEvent.ROLL_OUT = "rollOut";
flash.events.MouseEvent.ROLL_OVER = "rollOver";
flash.display.Stage.NAME = "Stage";
flash.display.Stage.nmeAcceleration = { x : 0.0, y : 1.0, z : 0.0};
flash.display.Stage.OrientationPortrait = 1;
flash.display.Stage.OrientationPortraitUpsideDown = 2;
flash.display.Stage.OrientationLandscapeRight = 3;
flash.display.Stage.OrientationLandscapeLeft = 4;
flash.display.Stage.DEFAULT_FRAMERATE = 0.0;
flash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
flash.display.Stage.nmeMouseChanges = [flash.events.MouseEvent.MOUSE_OUT,flash.events.MouseEvent.MOUSE_OVER,flash.events.MouseEvent.ROLL_OUT,flash.events.MouseEvent.ROLL_OVER];
flash.display.Stage.nmeTouchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
flash.display.StageQuality.BEST = "best";
flash.display.StageQuality.HIGH = "high";
flash.display.StageQuality.MEDIUM = "medium";
flash.display.StageQuality.LOW = "low";
flash.errors.Error.DEFAULT_TO_STRING = "Error";
flash.events.TextEvent.LINK = "link";
flash.events.TextEvent.TEXT_INPUT = "textInput";
flash.events.ErrorEvent.ERROR = "error";
flash.events.Listener.sIDs = 1;
flash.events.EventPhase.CAPTURING_PHASE = 0;
flash.events.EventPhase.AT_TARGET = 1;
flash.events.EventPhase.BUBBLING_PHASE = 2;
flash.events.FocusEvent.FOCUS_IN = "focusIn";
flash.events.FocusEvent.FOCUS_OUT = "focusOut";
flash.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
flash.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
flash.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
flash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
flash.events.IOErrorEvent.IO_ERROR = "ioError";
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";
flash.events.ProgressEvent.PROGRESS = "progress";
flash.events.ProgressEvent.SOCKET_DATA = "socketData";
flash.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
flash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
flash.events.TouchEvent.TOUCH_END = "touchEnd";
flash.events.TouchEvent.TOUCH_MOVE = "touchMove";
flash.events.TouchEvent.TOUCH_OUT = "touchOut";
flash.events.TouchEvent.TOUCH_OVER = "touchOver";
flash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
flash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
flash.events.TouchEvent.TOUCH_TAP = "touchTap";
flash.filters.DropShadowFilter.DEGREES_FULL_RADIUS = 360.0;
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
flash.media.Sound.EXTENSION_MP3 = "mp3";
flash.media.Sound.EXTENSION_OGG = "ogg";
flash.media.Sound.EXTENSION_WAV = "wav";
flash.media.Sound.EXTENSION_AAC = "aac";
flash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
flash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
flash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
flash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
flash.net.URLRequestMethod.DELETE = "DELETE";
flash.net.URLRequestMethod.GET = "GET";
flash.net.URLRequestMethod.HEAD = "HEAD";
flash.net.URLRequestMethod.OPTIONS = "OPTIONS";
flash.net.URLRequestMethod.POST = "POST";
flash.net.URLRequestMethod.PUT = "PUT";
flash.system.ApplicationDomain.currentDomain = new flash.system.ApplicationDomain(null);
flash.system.SecurityDomain.currentDomain = new flash.system.SecurityDomain();
flash.ui.Keyboard.NUMBER_0 = 48;
flash.ui.Keyboard.NUMBER_1 = 49;
flash.ui.Keyboard.NUMBER_2 = 50;
flash.ui.Keyboard.NUMBER_3 = 51;
flash.ui.Keyboard.NUMBER_4 = 52;
flash.ui.Keyboard.NUMBER_5 = 53;
flash.ui.Keyboard.NUMBER_6 = 54;
flash.ui.Keyboard.NUMBER_7 = 55;
flash.ui.Keyboard.NUMBER_8 = 56;
flash.ui.Keyboard.NUMBER_9 = 57;
flash.ui.Keyboard.A = 65;
flash.ui.Keyboard.B = 66;
flash.ui.Keyboard.C = 67;
flash.ui.Keyboard.D = 68;
flash.ui.Keyboard.E = 69;
flash.ui.Keyboard.F = 70;
flash.ui.Keyboard.G = 71;
flash.ui.Keyboard.H = 72;
flash.ui.Keyboard.I = 73;
flash.ui.Keyboard.J = 74;
flash.ui.Keyboard.K = 75;
flash.ui.Keyboard.L = 76;
flash.ui.Keyboard.M = 77;
flash.ui.Keyboard.N = 78;
flash.ui.Keyboard.O = 79;
flash.ui.Keyboard.P = 80;
flash.ui.Keyboard.Q = 81;
flash.ui.Keyboard.R = 82;
flash.ui.Keyboard.S = 83;
flash.ui.Keyboard.T = 84;
flash.ui.Keyboard.U = 85;
flash.ui.Keyboard.V = 86;
flash.ui.Keyboard.W = 87;
flash.ui.Keyboard.X = 88;
flash.ui.Keyboard.Y = 89;
flash.ui.Keyboard.Z = 90;
flash.ui.Keyboard.NUMPAD_0 = 96;
flash.ui.Keyboard.NUMPAD_1 = 97;
flash.ui.Keyboard.NUMPAD_2 = 98;
flash.ui.Keyboard.NUMPAD_3 = 99;
flash.ui.Keyboard.NUMPAD_4 = 100;
flash.ui.Keyboard.NUMPAD_5 = 101;
flash.ui.Keyboard.NUMPAD_6 = 102;
flash.ui.Keyboard.NUMPAD_7 = 103;
flash.ui.Keyboard.NUMPAD_8 = 104;
flash.ui.Keyboard.NUMPAD_9 = 105;
flash.ui.Keyboard.NUMPAD_MULTIPLY = 106;
flash.ui.Keyboard.NUMPAD_ADD = 107;
flash.ui.Keyboard.NUMPAD_ENTER = 108;
flash.ui.Keyboard.NUMPAD_SUBTRACT = 109;
flash.ui.Keyboard.NUMPAD_DECIMAL = 110;
flash.ui.Keyboard.NUMPAD_DIVIDE = 111;
flash.ui.Keyboard.F1 = 112;
flash.ui.Keyboard.F2 = 113;
flash.ui.Keyboard.F3 = 114;
flash.ui.Keyboard.F4 = 115;
flash.ui.Keyboard.F5 = 116;
flash.ui.Keyboard.F6 = 117;
flash.ui.Keyboard.F7 = 118;
flash.ui.Keyboard.F8 = 119;
flash.ui.Keyboard.F9 = 120;
flash.ui.Keyboard.F10 = 121;
flash.ui.Keyboard.F11 = 122;
flash.ui.Keyboard.F12 = 123;
flash.ui.Keyboard.F13 = 124;
flash.ui.Keyboard.F14 = 125;
flash.ui.Keyboard.F15 = 126;
flash.ui.Keyboard.BACKSPACE = 8;
flash.ui.Keyboard.TAB = 9;
flash.ui.Keyboard.ENTER = 13;
flash.ui.Keyboard.SHIFT = 16;
flash.ui.Keyboard.CONTROL = 17;
flash.ui.Keyboard.CAPS_LOCK = 18;
flash.ui.Keyboard.ESCAPE = 27;
flash.ui.Keyboard.SPACE = 32;
flash.ui.Keyboard.PAGE_UP = 33;
flash.ui.Keyboard.PAGE_DOWN = 34;
flash.ui.Keyboard.END = 35;
flash.ui.Keyboard.HOME = 36;
flash.ui.Keyboard.LEFT = 37;
flash.ui.Keyboard.RIGHT = 39;
flash.ui.Keyboard.UP = 38;
flash.ui.Keyboard.DOWN = 40;
flash.ui.Keyboard.INSERT = 45;
flash.ui.Keyboard.DELETE = 46;
flash.ui.Keyboard.NUMLOCK = 144;
flash.ui.Keyboard.BREAK = 19;
flash.ui.Keyboard.SEMICOLON = 186;
flash.ui.Keyboard.EQUAL = 187;
flash.ui.Keyboard.COMMA = 188;
flash.ui.Keyboard.MINUS = 189;
flash.ui.Keyboard.PERIOD = 190;
flash.ui.Keyboard.SLASH = 191;
flash.ui.Keyboard.BACKQUOTE = 192;
flash.ui.Keyboard.LEFTBRACKET = 219;
flash.ui.Keyboard.BACKSLASH = 220;
flash.ui.Keyboard.RIGHTBRACKET = 221;
flash.ui.Keyboard.DOM_VK_CANCEL = 3;
flash.ui.Keyboard.DOM_VK_HELP = 6;
flash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
flash.ui.Keyboard.DOM_VK_TAB = 9;
flash.ui.Keyboard.DOM_VK_CLEAR = 12;
flash.ui.Keyboard.DOM_VK_RETURN = 13;
flash.ui.Keyboard.DOM_VK_ENTER = 14;
flash.ui.Keyboard.DOM_VK_SHIFT = 16;
flash.ui.Keyboard.DOM_VK_CONTROL = 17;
flash.ui.Keyboard.DOM_VK_ALT = 18;
flash.ui.Keyboard.DOM_VK_PAUSE = 19;
flash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
flash.ui.Keyboard.DOM_VK_ESCAPE = 27;
flash.ui.Keyboard.DOM_VK_SPACE = 32;
flash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
flash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
flash.ui.Keyboard.DOM_VK_END = 35;
flash.ui.Keyboard.DOM_VK_HOME = 36;
flash.ui.Keyboard.DOM_VK_LEFT = 37;
flash.ui.Keyboard.DOM_VK_UP = 38;
flash.ui.Keyboard.DOM_VK_RIGHT = 39;
flash.ui.Keyboard.DOM_VK_DOWN = 40;
flash.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
flash.ui.Keyboard.DOM_VK_INSERT = 45;
flash.ui.Keyboard.DOM_VK_DELETE = 46;
flash.ui.Keyboard.DOM_VK_0 = 48;
flash.ui.Keyboard.DOM_VK_1 = 49;
flash.ui.Keyboard.DOM_VK_2 = 50;
flash.ui.Keyboard.DOM_VK_3 = 51;
flash.ui.Keyboard.DOM_VK_4 = 52;
flash.ui.Keyboard.DOM_VK_5 = 53;
flash.ui.Keyboard.DOM_VK_6 = 54;
flash.ui.Keyboard.DOM_VK_7 = 55;
flash.ui.Keyboard.DOM_VK_8 = 56;
flash.ui.Keyboard.DOM_VK_9 = 57;
flash.ui.Keyboard.DOM_VK_SEMICOLON = 59;
flash.ui.Keyboard.DOM_VK_EQUALS = 61;
flash.ui.Keyboard.DOM_VK_A = 65;
flash.ui.Keyboard.DOM_VK_B = 66;
flash.ui.Keyboard.DOM_VK_C = 67;
flash.ui.Keyboard.DOM_VK_D = 68;
flash.ui.Keyboard.DOM_VK_E = 69;
flash.ui.Keyboard.DOM_VK_F = 70;
flash.ui.Keyboard.DOM_VK_G = 71;
flash.ui.Keyboard.DOM_VK_H = 72;
flash.ui.Keyboard.DOM_VK_I = 73;
flash.ui.Keyboard.DOM_VK_J = 74;
flash.ui.Keyboard.DOM_VK_K = 75;
flash.ui.Keyboard.DOM_VK_L = 76;
flash.ui.Keyboard.DOM_VK_M = 77;
flash.ui.Keyboard.DOM_VK_N = 78;
flash.ui.Keyboard.DOM_VK_O = 79;
flash.ui.Keyboard.DOM_VK_P = 80;
flash.ui.Keyboard.DOM_VK_Q = 81;
flash.ui.Keyboard.DOM_VK_R = 82;
flash.ui.Keyboard.DOM_VK_S = 83;
flash.ui.Keyboard.DOM_VK_T = 84;
flash.ui.Keyboard.DOM_VK_U = 85;
flash.ui.Keyboard.DOM_VK_V = 86;
flash.ui.Keyboard.DOM_VK_W = 87;
flash.ui.Keyboard.DOM_VK_X = 88;
flash.ui.Keyboard.DOM_VK_Y = 89;
flash.ui.Keyboard.DOM_VK_Z = 90;
flash.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
flash.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
flash.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
flash.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
flash.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
flash.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
flash.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
flash.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
flash.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
flash.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
flash.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
flash.ui.Keyboard.DOM_VK_MULTIPLY = 106;
flash.ui.Keyboard.DOM_VK_ADD = 107;
flash.ui.Keyboard.DOM_VK_SEPARATOR = 108;
flash.ui.Keyboard.DOM_VK_SUBTRACT = 109;
flash.ui.Keyboard.DOM_VK_DECIMAL = 110;
flash.ui.Keyboard.DOM_VK_DIVIDE = 111;
flash.ui.Keyboard.DOM_VK_F1 = 112;
flash.ui.Keyboard.DOM_VK_F2 = 113;
flash.ui.Keyboard.DOM_VK_F3 = 114;
flash.ui.Keyboard.DOM_VK_F4 = 115;
flash.ui.Keyboard.DOM_VK_F5 = 116;
flash.ui.Keyboard.DOM_VK_F6 = 117;
flash.ui.Keyboard.DOM_VK_F7 = 118;
flash.ui.Keyboard.DOM_VK_F8 = 119;
flash.ui.Keyboard.DOM_VK_F9 = 120;
flash.ui.Keyboard.DOM_VK_F10 = 121;
flash.ui.Keyboard.DOM_VK_F11 = 122;
flash.ui.Keyboard.DOM_VK_F12 = 123;
flash.ui.Keyboard.DOM_VK_F13 = 124;
flash.ui.Keyboard.DOM_VK_F14 = 125;
flash.ui.Keyboard.DOM_VK_F15 = 126;
flash.ui.Keyboard.DOM_VK_F16 = 127;
flash.ui.Keyboard.DOM_VK_F17 = 128;
flash.ui.Keyboard.DOM_VK_F18 = 129;
flash.ui.Keyboard.DOM_VK_F19 = 130;
flash.ui.Keyboard.DOM_VK_F20 = 131;
flash.ui.Keyboard.DOM_VK_F21 = 132;
flash.ui.Keyboard.DOM_VK_F22 = 133;
flash.ui.Keyboard.DOM_VK_F23 = 134;
flash.ui.Keyboard.DOM_VK_F24 = 135;
flash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
flash.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
flash.ui.Keyboard.DOM_VK_COMMA = 188;
flash.ui.Keyboard.DOM_VK_PERIOD = 190;
flash.ui.Keyboard.DOM_VK_SLASH = 191;
flash.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
flash.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
flash.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
flash.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
flash.ui.Keyboard.DOM_VK_QUOTE = 222;
flash.ui.Keyboard.DOM_VK_META = 224;
flash.ui.Keyboard.DOM_VK_KANA = 21;
flash.ui.Keyboard.DOM_VK_HANGUL = 21;
flash.ui.Keyboard.DOM_VK_JUNJA = 23;
flash.ui.Keyboard.DOM_VK_FINAL = 24;
flash.ui.Keyboard.DOM_VK_HANJA = 25;
flash.ui.Keyboard.DOM_VK_KANJI = 25;
flash.ui.Keyboard.DOM_VK_CONVERT = 28;
flash.ui.Keyboard.DOM_VK_NONCONVERT = 29;
flash.ui.Keyboard.DOM_VK_ACEPT = 30;
flash.ui.Keyboard.DOM_VK_MODECHANGE = 31;
flash.ui.Keyboard.DOM_VK_SELECT = 41;
flash.ui.Keyboard.DOM_VK_PRINT = 42;
flash.ui.Keyboard.DOM_VK_EXECUTE = 43;
flash.ui.Keyboard.DOM_VK_SLEEP = 95;
flash.utils.Endian.BIG_ENDIAN = "bigEndian";
flash.utils.Endian.LITTLE_ENDIAN = "littleEndian";
flash.utils.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.ds.ObjectMap.count = 0;
integration.moduleinittests.testobj.InitTestModuleCore.NAME = "InitTestModuleCore";
integration.moduleinittests.testobj.InitTestModuleMovieClip.NAME = "InitTestModuleMovieClip";
integration.moduleinittests.testobj.InitTestModuleSprite.NAME = "InitTestModuleSprite";
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
mvcexpress.MvcExpress.WEBSITE_URL = "http://mvcexpress.org";
mvcexpress.MvcExpress.NAME = "mvcExpress-haxe";
mvcexpress.MvcExpress.MAJOR_VERSION = 0;
mvcexpress.MvcExpress.MINOR_VERSION = 0;
mvcexpress.MvcExpress.REVISION = 4;
mvcexpress.MvcExpress.pendingInjectsTimeOut = 0;
mvcexpress.MvcExpress.debugFunction = null;
mvcexpress.MvcExpress.loggerFunction = null;
mvcexpress.core.CommandMap.commandClassParamTypes = new haxe.ds.ObjectMap();
mvcexpress.core.CommandMap.validatedCommands = new haxe.ds.ObjectMap();
mvcexpress.core.ModuleManager.moduleRegistry = new haxe.ds.StringMap();
mvcexpress.core.ModuleManager.allModules = new Array();
mvcexpress.core.ModuleManager.scopedMessengers = new haxe.ds.StringMap();
mvcexpress.core.ModuleManager.scopedProxyMaps = new haxe.ds.StringMap();
mvcexpress.core.ModuleManager.scopedProxiesByScope = new haxe.ds.StringMap();
mvcexpress.core.ModuleManager.needMetadataTest = true;
mvcexpress.core.ModuleManager.scopePermissionsRegistry = new haxe.ds.StringMap();
mvcexpress.core.ProxyMap.qualifiedClassNameRegistry = new haxe.ds.ObjectMap();
mvcexpress.core.ProxyMap.classInjectRules = new haxe.ds.ObjectMap();
mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_CREATEMODULE = "ModuleManager.createModule";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_DISPOSEMODULE = "ModuleManager.disposeModule";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_REGISTERSCOPE = "ModuleManager.registerScope";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEMANAGER_UNREGISTERSCOPE = "ModuleManager.unregisterScope";
mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_MAP = "CommandMap.map";
mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_UNMAP = "CommandMap.unmap";
mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_EXECUTE = "CommandMap.execute";
mvcexpress.core.traceobjects.MvcTraceActions.COMMANDMAP_HANDLECOMMANDEXECUTE = "CommandMap.handleCommandExecute";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MAP = "MediatorMap.map";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMAP = "MediatorMap.unmap";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_MEDIATE = "MediatorMap.mediate";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATORMAP_UNMEDIATE = "MediatorMap.unmediate";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_MAP = "ProxyMap.map";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_UNMAP = "ProxyMap.unmap";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_LAZYMAP = "ProxyMap.lazyMap";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEMAP = "ProxyMap.scopeMap";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_SCOPEUNMAP = "ProxyMap.scopeUnmap";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTPENDING = "ProxyMap.injectPending";
mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_ADDHANDLER = "Messenger.addHandler";
mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_REMOVEHANDLER = "Messenger.removeHandler";
mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_SEND = "Messenger.send";
mvcexpress.core.traceobjects.MvcTraceActions.PROXYMAP_INJECTSTUFF = "ProxyMap.injectStuff";
mvcexpress.core.traceobjects.MvcTraceActions.MESSENGER_SEND_HANDLER = "Messenger.send.HANDLER";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDMESSAGE = "ModuleBase.sendMessage";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDMESSAGE_CLEAN = "ModuleBase.sendMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE = "ModuleBase.sendScopeMessage";
mvcexpress.core.traceobjects.MvcTraceActions.MODULEBASE_SENDSCOPEMESSAGE_CLEAN = "ModuleBase.sendScopeMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDMESSAGE = "Command.sendMessage";
mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDMESSAGE_CLEAN = "Command.sendMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDSCOPEMESSAGE = "Command.sendScopeMessage";
mvcexpress.core.traceobjects.MvcTraceActions.COMMAND_SENDSCOPEMESSAGE_CLEAN = "Command.sendScopeMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDMESSAGE = "Mediator.sendMessage";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDMESSAGE_CLEAN = "Mediator.sendMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE = "Mediator.sendScopeMessage";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_SENDSCOPEMESSAGE_CLEAN = "Mediator.sendScopeMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.MEDIATOR_ADDHANDLER = "Mediator.addHandler";
mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDMESSAGE = "Proxy.sendMessage";
mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDMESSAGE_CLEAN = "Proxy.sendMessage.CLEAN";
mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDSCOPEMESSAGE = "Proxy.sendScopeMessage";
mvcexpress.core.traceobjects.MvcTraceActions.PROXY_SENDSCOPEMESSAGE_CLEAN = "Proxy.sendScopeMessage.CLEAN";
mvcexpress.utils.StringConstantRegistry.registeredClasses = new haxe.ds.ObjectMap();
mvcexpress.utils.StringConstantRegistry.stringRegistry = new haxe.ds.StringMap();
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
suites.SuiteModuleNames.MAIN_MODULE = "mainModule";
suites.SuiteModuleNames.EXTERNAL_MODULE = "externalModule";
suites.TestViewEvent.ADD_LOCAL_HANDLER = "addLocalHandler";
suites.TestViewEvent.ADD_REMOTE_HANDLER = "addRemoteHandler";
suites.TestViewEvent.TRIGER_ADD_HANDLER = "trigerAddHandler";
suites.TestViewEvent.REMOVE_LOCAL_HANDLER = "removeLocalHandler";
suites.TestViewEvent.REMOVE_REMOTE_HANDLER = "removeRemoteHandler";
suites.TestViewEvent.TEST_GET_PROXY_CLASS = "testGetProxyClass";
suites.mediatormap.medatormaptestobj.MediatorMapTestSpriteMediator.TEST_MESSAGE_TYPE = "mediatorMapTestType";
suites.proxymap.proxytestobj.ProxyTestObj.__meta__ = { fields : { testProxy2 : { inject : null}, testProxy : { inject : [{ name : "toto", scope : "tata"}]}}};
suites.proxymap.proxytestobj.TestProxy.__meta__ = { fields : { different : { inject : null}}};
suites.testobjects.controller.GetProxyTestCommand.__meta__ = { fields : { dataProxy : { inject : null}}};
suites.testobjects.modulemain.MainLocalCommand.__meta__ = { fields : { dataProxy : { inject : null}}};
suites.testobjects.modulemain.MainModule.NAME = suites.SuiteModuleNames.MAIN_MODULE;
suites.testobjects.modulemain.MainViewMediator.__meta__ = { fields : { dataProxy : { inject : null}, view : { inject : null}}};
suites.testobjects.view.MediatorSpriteMediator.__meta__ = { fields : { view : { inject : null}, test : { inject : null}}};
suites.utils.objects.ConstantsA.AAAA = "aaaaaaaaaaaaaaaaaaaaaaaa";
suites.utils.objects.ConstantsAB.AAAA = "aaaaaaaaaaaaaaaaaaaaaaaa";
suites.utils.objects.ConstantsAB.BBBB = "bbbbbbbbbbbbbbbbbbbbbbbb";
suites.utils.objects.ConstantsB.BBBB = "bbbbbbbbbbbbbbbbbbbbbbbb";
utils.Async.asyncHandlerMap = new haxe.ds.StringMap();
utils.AsyncUtil.ASYNC_EVENT = "asyncEvent";
ApplicationMain.main();
})();

//@ sourceMappingURL=Main.js.map