/*
 * Realizes the functionality of calculating passwords.
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

$SYS.ns("UNIP", function(){
	this.Calc = function() {
	    var rule = UNIP.rules[document.getElementById('Service').value];
	    if (!rule)
	        return;
	    if (!rule.chars.length)
	        rule.chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
	    if (rule.chars.length < rule.length)
	        rule.length = rule.chars.length;
	    else if (!rule.length)
	        rule.length = 32;
	    $('#Password').val(calc(seed(rule.chars.length, rule.length), rule.chars));
	};
	
	var calc = function(offsets, chars) {
	    for (var i = 0; i < offsets.length; i++)
	        offsets[i] = chars.charAt(offsets[i]);
	    return offsets.join('');
	};
	
	var seed = function(range, length) {
	    var seed = Crypto.MD5('Service:' + $('#Service').val() +
	            'Account:' + $('#Account').val() +
	            'Seed:' + $('#Seed').val()),
	        offsets = [],
	        times = 0;
	    while (length > offsets.length)
	        offsets = unique(offsets, mod(Crypto.MD5(seed + 'Time-' + (times++), {asBytes: true}), range));
	    return offsets.slice(0, length);
	};
	
	var mod = function(bytes, range) {
	    for (var i = 0; i < bytes.length; i++)
	        bytes[i] %= range;
	    return bytes;
	};
	
	var unique = function(origin, addition) {
	    for (var i = 0; i < addition.length; i++)
	        if (-1 == origin.indexOf(addition[i]))
	            origin[origin.length] = addition[i];
	    return origin;
	};
});

// vim: se ft=javascript fenc=utf-8 ff=unix:
