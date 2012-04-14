/*
 * Initializes the runtime of UniP.
 *
 * This file is part of UniP.
 *
 * UniP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * UniP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with UniP.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    Snakevil Zen <zsnakevil@gmail.com>
 * @copyright © 2012 snakevil.in
 * @license   http://www.gnu.org/licenses/gpl-3.0.html
 */

$(function(){
    function isSingleTouch(event){
        return event.touches.length === 1 && event.targetTouches.length === 1 && event.changedTouches.length === 1;
    }
    function initViewport(handler){
        var target = handler.querySelector(".vp_b");
        if(target){
            function start(e){
                if(isSingleTouch(e)){
                    $(handler)
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
                    $(handler)
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
	function accEvent(e){
        //localStorage["user_account"] = this.value.trim();
        localStorage[$("#Service").val()] = this.value.trim();
        UNIP.Calc();
    }
    $("#Account")
        .val(localStorage[$("#Service").val()] || "")
        .on("keyup", accEvent);

    $("#Password").on("keydown", function(e){
        if(!((e.keyCode === 67 || e.keyCode === 65) && (e.metaKey || e.ctrlKey))){
            e.preventDefault();
        }
    });
    
    $("#Seed").on("keyup", UNIP.Calc)
    	.on("change", UNIP.Calc);

    $(document).bind("touchstart", function(e){
        if(!(/^(?:input|select|textarea)$/i.test(e.target.nodeName))){
            e.preventDefault();
        }
    }, true);
    var services = {},
    html = '',
    type = '';
    for (var service in UNIP.rules) {
        service = service.toLowerCase();
        type = service.charAt(0);
        if (96 < type.charCodeAt(0) && type.charCodeAt(0) < 123)
            type = type.toUpperCase();
        else
            type = '#';
        if (!services[type])
            services[type] = [];
        if (-1 == services[type].indexOf(service))
            services[type][services[type].length] = service;
    }
    for (var i = 64, j, k, title, domains; i < 91; i++) {
        j = String.fromCharCode(i);
        if ('@' == j)
            j = '#';
        if (!services[j])
            continue;
        html += '<optgroup label="' + j + '">';
        services[j] = services[j].sort();
        for (k = 0; k < services[j].length; k++) {
            title = UNIP.rules[services[j][k]].title,
            domains = services[j][k].split('.');
            if (!title)
                domains[0] = domains[0].charAt(0).toUpperCase() + domains[0].substr(1),
                title = domains.join('.');
            else if (title.toLowerCase() == domains[0].toLowerCase())
                domains[0] = title,
                title = domains.join('.');
            else
                title += ' (' + services[j][k] + ')';
            html += '<option value="' + services[j][k] + '">' + title + '</option>';
        }
        html += '</optgroup>';
    }
    var domService = $("#Service")[0];
    $('#Service')
        .html(html)
        .on("change", function(e){
            $("#Account").val(localStorage[this.value] || "");
            UNIP.Calc();
        });
    var whiteList = document.createDocumentFragment();
    while(domService.firstChild){
    	whiteList.appendChild(domService.firstChild);
    }
    /*  mark black list data */
    var blackList = whiteList.cloneNode(1);
	var opt = blackList.firstChild;
	while(opt.nextSibling){
		blackList.insertBefore(opt.nextSibling, blackList.firstChild);
	}
	while(whiteList.firstChild){
		domService.appendChild(whiteList.firstChild);
	}
    UNIP.Calc();
    $(".header")
    	.on("touchstart", function(e){
    		var pinfo = e.target._pinfo = {
    			enable : false,
    			x : e.changedTouches[0].pageX
    		};
			if(pinfo.x < 40 || pinfo.x > innerWidth - 40){
				pinfo.enable = true;
			}
    	})
    	.on("touchend", function(e){
			var pinfo = e.target._pinfo;
    		if(pinfo && pinfo.enable){
    			pinfo.enable = false;
    			var x = e.changedTouches[0].pageX;
    			if(x < 40 && whiteList.firstChild){
    				while(domService.firstChild){
						blackList.appendChild(domService.firstChild);
	   				}
    				while(whiteList.firstChild){
    					domService.appendChild(whiteList.firstChild);
    				}
		            UNIP.Calc();
	   			}
    			if(x > innerWidth - 40 && blackList.firstChild){
    				while(domService.firstChild){
						whiteList.appendChild(domService.firstChild);
    				}
    				while(blackList.firstChild){
    					domService.appendChild(blackList.firstChild);
    				}
		            UNIP.Calc();
     			}
    		}		
    	})
});

// vim: se ft=javascript fenc=utf-8 ff=unix:
