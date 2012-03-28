# GNU Makefile.
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
# AUTHOR    Snakevil Zen <zsnakevil@gmail.com>
# COPYRIGHT © 2012 snakevil.in
# LICENSE   http://www.gnu.org/licenses/gpl-3.0.html

all: contrib/index.html

clean:
	$(RM) -R build contrib

contrib/index.html: src/index.html $(subst ./static,build/static,$(shell deploy/scan src/index.html))
	[ -d '$(@D)' ] || 'mkdir' '$(@D)'
	cd build && ../deploy/pack '../$<' > '../$@'

build/static/css/%.css: src/static/css/%.css
	[ -d '$(@D)' ] || 'mkdir' -p '$(@D)'
	'cp' -a '$(lastword $^)' '$@'

build/static/js/rules.js: build/static/js/rot.js src/static/js/rules.js
	'cp' -a '$<' '$@' && deploy/uglifyjs '$(lastword $^)' | deploy/rot - >> '$@'

build/static/js/%.js: src/static/js/%.js
	[ -d '$(@D)' ] || 'mkdir' -p '$(@D)'
	deploy/uglifyjs '$(lastword $^)' > '$@'

.PHONY: all clean

# vim: se ft=make fenc=utf-8 ff=unix tw=198486 noet nosta:
