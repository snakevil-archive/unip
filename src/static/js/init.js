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

(function() {
    var services = {},
    html = '',
    type = '';
    for (var service in $.rules) {
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
            title = $.rules[services[j][k]].title,
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
    document.getElementById('Service').innerHTML = html;
    return $.Calc();
})();

// vim: se ft=javascript fenc=utf-8 ff=unix:
