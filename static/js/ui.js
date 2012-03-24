;(function(window, undefiend){
/* closure start */
var _css_prefix = _property_prefix = "",
	_dec = getComputedStyle(document.documentElement);
if("webkitTransform" in _dec){
	_css_prefix = "-webkit-";
	_property = "webkit";
}
else if("MozTransform" in _dec){
	_css_prefix = "-moz-";
	_property = "Moz";
}
else if("OTransform" in _dec){
	_css_prefix = "-o-";
	_property = "O";
}
else if("msTransform" in _dec){
	_css_prefix = "-ms-";
	_property = "ms";
}

function isSingleTouch(event){
	return true;
}

function initViewport(handler){
	var target = hanlder.querySelector(".vp_b");
	if(target){
		function start(e){
			
		}
		function move(e){
		
		}
		function end(e){
		
		}
	}
}
if(document.querySelector(".jt_vp")){
	initViewport(document.querySelector(".jt_vp"));
}

/* closure end */
})(window);