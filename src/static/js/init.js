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
	$("#Account")
		.val(localStorage[$("#Service").val()] || localStorage["user_account"] || "")
		.on("keyup", function(e){
			//localStorage["user_account"] = this.value.trim();
			localStorage[$("#Service").val()] = this.value.trim();
			UNIP.Calc();
		});

	$("#Password").on("keydown", function(e){
		if(!((e.keyCode === 67 || e.keyCode === 65) && (e.metaKey || e.ctrlKey))){
			e.preventDefault();
		}
	});
	$("#Seed").on("keyup", UNIP.Calc);
	$(document).bind("touchstart", function(e){
		if(!(/^(?:input|select|textarea)$/i.test(e.target.nodeName))){
			e.preventDefault();
		}
	}, true);
	var services = [], html = '';
	for (var service in UNIP.rules)
		services[services.length] = service;
	for (var i = 0, title, domains; i < services.length; i++) {
		title = UNIP.rules[services[i]].title,
		domains = services[i].split('.');
		if (!title)
			domains[0] = domains[0].charAt(0).toUpperCase() + domains[0].substr(1),
			title = domains.join('.');
		else if (title.toLowerCase() == domains[0].toLowerCase())
			domains[0] = title,
			title = domains.join('.');
		else
			title += ' (' + services[i] + ')';
		html += '<option value="' + services[i] + '">' + title + '</option>';
	}
	$('#Service')
		.html(html)
		.on("change", function(e){
			$("#Account").val(localStorage[this.value] || localStorage["user_account"]);
			UNIP.Calc();
		});
	UNIP.Calc()
});

// vim: se ft=javascript fenc=utf-8 ff=unix:
