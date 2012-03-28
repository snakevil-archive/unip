#!/usr/bin/python
# -*- coding: utf-8 -*-
#
# Scans a local HTML page and reports included scripts and stylesheets files.
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

import sys
import HTMLParser

class Scanner(HTMLParser.HTMLParser):
    def handle_starttag(self, tag, attrs):
        if 'link' == tag:
            return self.parse_link(attrs)
        if 'script' == tag:
            return self.parse_script(attrs)
    def handle_startendtag(self, tag, attrs):
        if 'link' == tag:
            return self.parse_link(attrs)
    def parse_link(self, attrs):
        i = ''
        for j in attrs:
            if 'rel' == j[0] and 'stylesheet' != j[1]:
                return
            if 'type' == j[0] and 'text/css' != j[1]:
                return
            if 'href' == j[0]:
                i = j[1]
        if i:
            included.append(i)
        return
    def parse_script(self, attrs):
        i = ''
        for j in attrs:
            if 'type' == j[0] and 'text/javascript' != j[1]:
                return
            if 'language' == j[0] and 'javascript' != j[1].lower():
                return
            if 'src' == j[0]:
                i = j[1]
        if i:
            included.append(i)
        return

try:
    if 2 > len(sys.argv):
        print 'Usage:', sys.argv[0], '<HTML-FILE>'
        sys.exit(-1)

    included = []

    html_src = open(sys.argv[1], 'r')
    html = html_src.read()
    html_src.close()

    scanner = Scanner()
    scanner.feed(html)
    scanner.close()

    print ' '.join(included)
except IOError as e:
    sys.exit(1)
except HTMLParser.HTMLParseError as e:
    sys.exit(2)

# vim: se ft=python fenc=utf-8 ff=unix:
