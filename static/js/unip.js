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

$CalcUniP = function() {
    var r = $Rules[document.getElementById('Service').value];
    if (!r)
        return;
    if (!r.chars.length)
        r.chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    if (r.chars.length < r.length)
        r.length = r.chars.length;
    document.getElementById('Password').innerText = $CalcUniP.c($CalcUniP.g(r.chars.length, r.length), r.chars);
}

$CalcUniP.c = function(offsets, chars) {
    for (var i = 0; i < offsets.length; i++)
        offsets[i] = chars.charAt(offsets[i]);
    return offsets.join('');
}

$CalcUniP.g = function(range, length) {
    var s = Crypto.MD5('Service:' + document.getElementById('Service').value +
            'Account:' + document.getElementById('Account').value +
            'Seed:' + document.getElementById('Seed').value),
        v = [],
        i = 0;
    while (length > v.length)
        v = $CalcUniP.u(v, $CalcUniP.m(Crypto.MD5(s + 'Time-' + (i++), {asBytes: true}), range));
    return v.slice(0, length);
}

$CalcUniP.m = function(bytes, range) {
    for (var i = 0; i < bytes.length; i++)
        bytes[i] %= range;
    return bytes;
}

$CalcUniP.u = function(origin, addition) {
    for (var i = 0; i < addition.length; i++)
        if (-1 == origin.indexOf(addition[i]))
            origin[origin.length] = addition[i];
    return origin;
}

// vim: se ft=javascript fenc=utf-8 ff=unix:
