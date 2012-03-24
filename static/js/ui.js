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
	return event.touches.length === 1 && event.targetTouches.length === 1 && event.changedTouches.length === 1;
}

function initViewport(handler){
	var target = handler.querySelector(".vp_b");
	if(target){
		function start(e){
			if(isSingleTouch(e)){
				handler.addEventListener("touchmove", move, false);
				handler.addEventListener("touchend", end, false);
				handler.addEventListener("touchcancel", end, false);
			}
		}
		function move(e){
			if(isSingleTouch(e)){
				
			}
		}
		function end(e){
			if(isSingleTouch(e)){
				handler.removeEventListener("touchmove", move, false);
				handler.removeEventListener("touchend", end, false);
				handler.removeEventListener("touchcancel", end, false);
			}
		}
		handler.addEventListener("touchstart", start, false);
	}
}
if(document.querySelector(".jt_vp")){
	initViewport(document.querySelector(".jt_vp"));
}

document.getElementById("Password").addEventListener("keydown", function(e){
	e.preventDefault();
});
document.addEventListener("touchstart", function(e){
	if(!(/^(?:input|select|textarea)$/i.test(e.target.nodeName))){
		e.preventDefault();
	}
}, true);
/* closure end */
})(window);