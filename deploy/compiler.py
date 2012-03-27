#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Compress javascript files via online Google Closure Compiler.
#
# This file is part of UniP.
#
# UniP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# UniP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with UniP.  If not, see <http://www.gnu.org/licenses/>.
#
# @author    Snakevil Zen <zsnakevil@gmail.com>
# @copyright © 2012 snakevil.in
# @license   http://www.gnu.org/licenses/gpl-3.0.html

import httplib, urllib, sys, socket

try:
    js_src = open(sys.argv[1], "r")
    params = urllib.urlencode([
        ("js_code", js_src.read())
    ])
    js_src.close()
except IOError as e:
    sys.exit(1)

try:
    headers = { "Content-Type": "application/x-www-form-urlencoded" }
    conn = httplib.HTTPConnection('closure-compiler.appspot.com', timeout=20)
    conn.request('POST', '/compile', params, headers)
    response = conn.getresponse()
    data = response.read()
    conn.close
except httplib.HTTPException as e:
    sys.exit(2)
except socket.error as e:
    sys.exit(3)

print data

# vim: se ft=python fenc=utf-8 ff=unix:
