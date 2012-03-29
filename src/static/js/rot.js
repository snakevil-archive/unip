/*
 * Implements ROT13 algorithm.
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

function _$ROT(clob){
    var result = '';
    for (var i = asc = 0; i < clob.length; i++) {
        asc = clob.charCodeAt(i);
        if (32 < asc && asc < 80)
            asc += 47;
        else if (79 < asc && asc < 127)
            asc -= 47;
        result += String.fromCharCode(asc);
    }
    return result;
}
// vim: se ft=javascript fenc=utf-8 ff=unix:
