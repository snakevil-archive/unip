/**
 * @author Kitsune <madfox.fw@gmail.com>
 **/

;(function(window, undefiend){
/* closure begin */

var document = window.document,
	navigator = window.navigator,
	location = window.location,
	screen = window.screen,
	emf = Function.prototype,
	lib = "jt",
	_seed_ = 1,
	_prefix_ = lib + uuid(),
	re_trim_left = /^\s+/,
	re_trim_right = /\s+$/,
	re_html_tag = /<[^>]+?>/,
	re_space = /\s+/,
	re_var = /^[_$a-z][$\w]*$/i;
	re_ns_path = /^[_$a-z][$\w]*(?:\.[_$a-z][$\w]*)*$/i,
	re_key = /{@(\w+(?:\.\w+)*)(\:\w+)?}/g,
	re_tmpl = /([\s\S]*?)(?:<%((?:\=|\$\/)?)([\s\S]*?)%>)/g,
	
	str_class = "(function {@ProtoName}(){ if(!_init && is.f(this._init)){ this._init.apply(this, arguments) } })",
	
	_obj_proto_ = Object.prototype,
	_arr_proto_ = Array.prototype,
	_str_proto_ = String.prototype,
	_date_proto_ = Date.prototype,
	concat = _arr_proto_.concat,
	slice = _arr_proto_.slice,
	defProp = Object.defineProperty,
	defProps = Object.defineProperties,
	keys = Object.keys;

function is(o){return typeof o}
function uuid(){return Math.random().toString(36).substr(2)}
function _format(t, o){o=o||{};return t.replace(re_key, function(m, n, a){var _;try{var _=eval("o[\""+n.split(".").join("\"][\"")+"\"]");}catch(e){} return is.u(_)?m:_ })}
function trim(txt){return _str_proto_.trim ? _str_proto_.trim.call(txt) : txt.replace(re_trim_left, "").replace(re_trim_right, "")}
function decodeHTML(txt){var _=document.createElement("textarea");_.innerHTML=txt;return _.value;}
function encodeHTML(txt){return document.createElement("div").appendChild(document.createTextNode(txt)).parentNode.innerHTML;}

is.s = function(o){return is(o) === "string"};
is.o = function(o){return is(o) === "object"};
is.b = function(o){return is(o) === "boolean"};
is.n = function(o){return is(o) === "number"};
is.f = function(o){return is(o) === "function"};
is.u = function(o){return o === undefined};
is.a = function(o){return o instanceof Array};
is.d = function(o){return o instanceof Date};
is.e = function(o){return o instanceof Element};
is.r = function(o){return o instanceof RegExp};

_arr_proto_.unique = function(){
	var arr = [];
	for(var i = 0, l = this.length; i < l; i ++){
		if(arr.indexOf(this[i]) === -1){
			arr.push(this[i]);
		}
	}
	return arr;
};

function format(str, json){
	json = concat.apply([], arguments).slice(1);
	var result=[];
	while(json.length){
		result[result.length] = _format(str, json.shift());
	}
	return result.join("");
}

_str_proto_.format = function(json){
	return format.apply(null, concat.apply([this], arguments));
};

function tmpl(_t, data){
	var _data = [], v = {};
	v.last = _t.replace(re_tmpl, function(m, s, t, c, i){
		v["s_" + i] = s;
		_data.push("res.push(v.s_" + i + ");");
		if(t === "="){
			_data.push("res.push(" + c.trim() + ");");
		}
		else{
			_data.push(c.trim());
		}
		return "";
	});
	try{
		var _ = new Function("data", "res", "v", _data.join("") + "res.push(v.last);return String.prototype.concat.apply('', res);").toString()
		return eval("(" + _ + ")")(data || {}, [], v);
	}
	catch(e){
		console.error("模板错误", e);
		console.log(_);
	}
}
_str_proto_.tmpl = function(data){
	return tmpl(this, data);
}

function objectExtend(object){
	var ops = _arr_proto_.slice.call(arguments, 1);
	while(ops.length){
		var op = ops.shift();
		for(var n in op){
			if(n in object){ continue; }
			object[n] = op[n];
		}
	}
	return object;
}

function objectForceExtend(object){
	var ops = _arr_proto_.slice.call(arguments, 1);
	while(ops.length){
		var op = ops.shift();
		for(var n in op){
			object[n] = op[n];
		}
	}
	return object;
}

/**
 * @class Proto
 **/
var _init = false;
function Proto(){}
Proto.extend = function(name, proto, extendable){
	if(!re_var.test(name = trim(name))){
		console.error("参数不合法");
		return Proto;
	}
	var _super_ = this.prototype;
	
	_init = true;
	var _proto_ = new this;
	_init = false;
	
	for(var n in proto){
		_proto_[n] = is.f(_super_[n]) && is.f(proto[n]) ? (function(_n, _b, _c){
			return function(){
				try{
					this._super = _b;
					return _c.apply(this, arguments);
				}
				finally{ this._super = undefined; delete this._super; }
			};
		})(n, _super_[n], proto[n]) : proto[n];
	}
	var Proto = eval(str_class.format({ProtoName : name}));

	Proto.prototype = _proto_;
	if(is.u(extendable) || extendable){
		Proto.extend = arguments.callee;
	}
	return Proto;
};

/**
 * @class NameSpace
 * 
 **/
var NameSpace = Proto.extend("NameSpace", {
	_init : function(path, init){
		if(!re_ns_path.test(path = trim(path))){
			return window;
		}
		init = is.f(init) ? init : emf;
		if(path in _ns_cache.pool){
			var ns = _ns_cache.pool[path];
			init.call(ns);
			return ns;
		}
		this._pathname = this.$PathName = path;
		_ns_cache.pool[path] = this;
		init.call(this);
		
		ensureNameSpace(this);
	},
	_shortName : function(){
		var arr = [];
		for(var n in this){
			if(n.indexOf("_") !== 0){
				arr.push(n + " = " + this._pathname + "." + n);
			}
		}
		return "var " + arr.join(",");
	}
}, false);
var _ns_cache = { pool : {} };

function isExistNS(ns){
	return ns in _ns_cache.pool;
}

function ensureNameSpace(ns){
	var ps = ns._pathname.split("."),
		pn = window, cn, cns = ps.pop();
	while(ps.length){
		cn = ps.shift();
		if(pn[cn] instanceof NameSpace || is.o(pn[cn])){
			pn = pn[cn];
		}
		else{
			pn = pn[cn] = {};
		}
	}
	for(var n in pn[cns]){
		if(n in ns && !(ns[n] instanceof NameSpace)){
			ns[n] = pn[cns][n];
		}
		else{
			ns[n] = pn[cns][n];
		}
	}
	pn[cns] = ns;
}

new NameSpace("$SYS", function(){
	this.ns = function(name, init){return new NameSpace(name, init)};
	this.is = is;
	this.uuid = uuid;
	this.emf = emf;
	this.objectExtend = objectExtend;
	this.objectForceExtend = objectForceExtend;
	this.trim = trim;
	this.encodeHTML = encodeHTML;
	this.decodeHTML = decodeHTML;
	this.format = format;
	this.tmpl = tmpl;
	this.Proto = Proto;
	this.env = new function(_, _dec){
		this.webkit = 0;
		this.moz = 0;
		this.msie = 0;
		this.opera = 0;
		this.prefix = "";
		this.cssPrefix = "";
		this.dpr = window.devicePixelRatio;
		_ = document.createElement("a");
		_dec = getComputedStyle(_);
		if("webkitTransform" in _dec){
			this.cssPrefix = "-webkit-";
			this.prefix = "webkit";
			this.webkit = 1;
		}
		else if("MozTransform" in _dec){
			this.cssPrefix = "-moz-";
			this.prefix = "Moz";
			this.moz = 1;
		}
		else if("OTransform" in _dec){
			this.cssPrefix = "-o-";
			this.prefix = "O";
			this.opener = 1;
		}
		else if("msTransform" in _dec){
			this.cssPrefix = "-ms-";
			this.prefix = "ms";
			this.msie = 1;
		}
	};
});

/* DOM */
function bind(ele, type, handle, captrue){
	ele.addEventListener(type, handle, captrue);
}
function unbind(ele, type, handle, captrue){
	ele.removeEventListener(type, handle, captrue);
}
function once(ele, type, handle, cap){
	bind(ele, type, function(e){
		unbind(this, e.type, arguments.callee, cap);
		handle.call(this, e);
	}, cap);
}
var re_space = /\s+/;
function addClass(ele, name){
	var names = name.trim().split(re_space);
	if(ele.classList){
		while(names.length){
			ele.classList.add(names.shift());
		}
	}
	else{
		var classList = ele.className.split(re_space).unique();
		var _l = classList.length;
		classList = classList.concat(names).unique();
		if(_l !== classList.length){
			ele.className = classList.join(" ");
		}
	}
}

function removeClass(ele, name){
	var names = name.trim().split(re_space);
	if(ele.classList){
		while(names.length){
			ele.classList.remove(names.shift());
		}
	}
	else{
		var classList = ele.className.split(re_space).unique();
		var _l = classList.length;
		while(names.length){
			var idx = classList.indexOf(names.shift());
			if(idx > -1){
				classList.splice(idx, 1);
			}
		}
		if(_l !== classList.length){
			ele.className = classList.join(" ");
		}
	}
}
function containsClass(ele, name){
	if(ele.classList){
		return ele.classList.contains(name);
	}
	else{
		var classList = ele.className.spalit(re_space).unique(),
			idx = classList.indexOf(name);
		return idx > -1;
	}
}
function toggleClass(ele, name){
	if(containsClass(ele, name)){
		removeClass(ele, name);
	}
	else{
		addClass(ele, name);
	}
}

function removeTags(ele){
	var tags = slice.call(arguments, 1);
	if(tags.length){
		var dusts = ele.querySelectorAll(tags.join(","));
		for(var i = 0, l = dusts.length; i < l; i ++){
			dusts[i].parentNode.removeChild(dusts[i]);
		}
	}
}

function removeSpaceTextNode(ele){
	var tn, cn = ele.firstChild;
	while(cn){
		if(cn.nodeType === 1){
			arguments.callee(cn);
			cn = cn.nextSibling;
		}
		else if(cn.nodeType === 3){
			if(cn.data.trim().length === 0){
				tn = cn;
				cn = cn.nextSibling;
				tn.parentNode.removeChild(tn);
			}
			else{
				cn = cn.nextSibling;
			}
		}
	}
}

function _css1(ele, name, value){
	if(!is.u(value)){
		ele.style[name] = value;
	}
	else{
		return getComputedStyle(ele)[name] || "";
	}
}
function _css2(ele, css){
	var _arr = [];
	for(var n in css){
		_arr.push(n + ":" + css[n]);
	}
	if(_arr.length){
		ele.style.cssText += ";" + _arr.join(";") + ";";
	}
}

function css(ele){
	switch(is(arguments[1])){
		case "string" :
			return _css1.apply(null, arguments);
		break;
		case "object" : 
			return _css2.apply(null, arguments);
		break;
		default :
			return getComputedStyle(ele);
		break;
	}
}

function attr(ele, name, value){
	if(is.s(name)){
		if(!is.u(value)){
			ele.setAttribute(name, value);
		}
		else{
			return ele.getAttribute(name);
		}
	}
	else{
		return ele.attributes;
	}
}

function html(ele, html){
	if(!is.u(html)){
		if(html.nodeType === 1 || html.nodeType === 11){
			ele.innerHTML = "";
			ele.appendChild(html);
		}
		else{
			ele.innerHTML = html;
		}
	}
	else{
		return ele.innerHTML;
	}
}

function text(ele, text){
	if(!is.u(text)){
		ele.innerHTML = "";
		ele.appendChild(document.createTextNode(text));
	}
	else{
		return ele.innerText || ele.textContent;
	}
}

function value(ele, val){
	if(!is.u(val)){
		if(is.s(ele.value)){
			ele.value = val;
		}
	}
	else{
		return ele.value || "";
	}
}

function addHTML(ele, html){
	if(!is.u(html)){
		if(html.nodeType === 1 || html.nodeType === 11 || html.nodeType === 3){
				ele.appendChild(html);
		}
		else{
			ele.insertAdjacentHTML("beforeend", html);
		}
	}
}

function append(ele, tar){
	if(is.e(ele)){
		if(tar && is.f(tar.cloneNode)){
			ele.appendChild(tar.cloneNode(1));
		}
	}
}

function before(ele, tar){
	if(is.e(ele)){
		if(tar && is.f(tar.cloneNode)){
			ele.insertBefore(tar.cloneNode(1));
		}
	}
}

function appendTo(ele, tar){
	if(is.f(tar.appendChild)){
		tar.appendChild(ele);
	}
}

function beforeTo(ele, tar){
	if(is.f(tar.insertBefore)){
		tar.insertBefore(ele, tar.firstChild);
	}
}

function offset(ele){
	return ele.getBoundingClientRect();
}
var ele_methods = {
	bind : bind,
	on : bind,
	unbind : unbind,
	un : unbind,
	once : once,
	
	attr : attr,
	
	css : css,
	
	html : html,
	text : text,
	value : value,
	val : value,
	addHTML : addHTML,
	append : append,
	before : before,
	appendTo : appendTo,
	
	offset : offset,
	
	addClass : addClass,
	removeClass : removeClass,
	toggleClass : toggleClass,
	hasClass : containsClass,
	containsClass : containsClass,
	
	removeTags : removeTags,
	removeSpaceTextNode : removeSpaceTextNode
};

function eachMethodProxy(n){
	return function(){
		for(var i = 0, l = this.length; i < l; i ++){
			if(this[i] instanceof Element){
				var t = ele_methods[n].apply(this, concat.apply([this[i]], arguments));
				if(!is.u(t)){return t;}
			}
		} 
		return this;
	};
}

function isSingleTouch(event){
	return event.touches.length === 1 && event.targetTouches.length === 1 && event.changedTouches.length === 1;
}

var domIsReady = 0;
once(document, "DOMContentLoaded", function(){
	domIsReady = 1;
});
function domReady(f){
	if(domIsReady){
		f.call(document);
	}
	else{
		once(document, "DOMContentLoaded", f);
	}
}

function nl2arr(obj){
	var a = [];
	for(var i = 0, l = obj.length; i < l; i ++){
		a.push(obj[i]);
	}
	return a;
}
function $(s, c){
	if(is.s(s) && (s = s.trim())){
		try{
			if(c){
				if(c instanceof $ || c instanceof NodeList){
					for(var i = 0, l = c.length; i < l; i ++){
						if(is.f(c[i].querySelectorAll)){
							_arr_proto_.push.apply(this, nl2arr(c[i].querySelectorAll(s)));
						}
					}
				}
				else if(is.f(c.querySelectorAll)){
					_arr_proto_.push.apply(this, nl2arr(c.querySelectorAll(s)));
				}
				else{
					_arr_proto_.push.apply(this, nl2arr(document.querySelectorAll(s)));
				}
			}
			else{
				_arr_proto_.push.apply(this, nl2arr(document.querySelectorAll(s)));
			}
		}
		catch(e){
			var _ = document.createElement("div");
			_.innerHTML = s;
			_arr_proto_.push.apply(this, nl2arr(_.childNodes));
		}
	}
	else if(is.f(s)){
		domReady(s);
	}
	else if(is.e(s)){
		_arr_proto_.push.call(this, s);
	}
	else if(is.a(s) || s instanceof $){
		_arr_proto_.push.apply(this, s);
	}
	else if(s instanceof NodeList){
		_arr_proto_.push.apply(this, nl2arr(s))
	}
}
$.prototype = {
	length : 0,
	resolve : function(){
		for(var i = 0, l = this.length; i < l; i ++){
			if(!(this[i] instanceof Node)){
				_arr_proto_.splice.call(this, i --, 1);
				l = this.length;
			}
		}
		return this;
	},
	item : function(i){
		return this[i];
	},
	each : _arr_proto_.forEach,
	forEach : function(){
		_arr_proto_.forEach.apply(this, arguments);
		return this;
	},
	push : _arr_proto_.push,
	sort : _arr_proto_.sort,
	splice : function(){
		return new $(_arr_proto_.splice.apply(this, arguments));
	}
};
for(var n in ele_methods){
	this[n] = ele_methods[n];
	$.prototype[n] = eachMethodProxy(n);
}
$.prototype.appendTo = function(ele){
	var df = document.createDocumentFragment();
	this.each(function(cur){
		df.appendChild(cur);
	});
	appendTo(df, ele);
	return this;
};
$.prototype.beforeTo = function(ele){
	var df = document.createDocumentFragment();
	this.appendTo(df);
	ele = dom.$(ele)[0];
	if(is.e(ele)){
		ele.insertBefore(df, ele.firstChild);
	}
	return this;
};
window.$$$ = function(s, c){ return new $(s, c) };

function initViewport(handler){
	var target = handler.querySelector(".vp_b");
	if(target){
		function start(e){
			if(isSingleTouch(e)){
				$$$(handler)
					.on("touchmove", move, false)
					.on("touchend", end, false)
					.on("touchcancel", end, false);
			}
		}
		function move(e){
			if(isSingleTouch(e)){

			}
		}
		function end(e){
			if(isSingleTouch(e)){
				$$$(handler)
					.un("touchmove", move, false)
					.un("touchend", end, false)
					.un("touchcancel", end, false);
			}
		}
		bind(handler, "touchstart", start, false);
	}
}
if(document.querySelector(".jt_vp")){
	initViewport(document.querySelector(".jt_vp"));
}
$$$(function(){
	$$$("#Account")
		.val(localStorage["user_account"] || "")
		.on("keyup", function(e){
			localStorage["user_account"] = this.value.trim();
			window.$.Calc();
		});
	
	$$$("#Password").on("keydown", function(e){
		if(!((e.keyCode === 67 || e.keyCode === 65) && (e.metaKey || e.ctrlKey))){
			e.preventDefault();
		}
	});
	$$$("#Seed").on("keyup", window.$.Calc);
	bind(document, "touchstart", function(e){
		if(!(/^(?:input|select|textarea)$/i.test(e.target.nodeName))){
			e.preventDefault();
		}
	}, true);
});

})(window);
