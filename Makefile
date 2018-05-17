
configure:
	sudo npm install

all:
	perl -pi -e 's/return (?:true|false);/return false;/sg' src/x_ite/DEBUG.js

	node_modules/requirejs/bin/r.js -o x_ite.build.js
	node_modules/uglify-js-es6/bin/uglifyjs --compress --mangle -- dist/x_ite.js > dist/x_ite.min.js
	node_modules/requirejs/bin/r.js -o cssIn=src/x_ite.css out=dist/x_ite.css

	node_modules/requirejs/bin/r.js -o rigid-body-physics.build.js
	node_modules/uglify-js-es6/bin/uglifyjs --mangle -- dist/rigid-body-physics.js > dist/rigid-body-physics.min.js

	perl -pi -e 's|text/text!|text!|sg' dist/x_ite.js
	perl -pi -e 's|text/text!|text!|sg' dist/x_ite.min.js

	cp src/components.js components.js
	cp src/x_ite.html x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="\.\./node_modules/requirejs/require.js"></script>\n||sg' x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="x_ite.config.js"></script>\n||sg'                        x_ite.min.html

	perl -pi -e 's|"x_ite.css"|"dist/x_ite.css"|sg'                             x_ite.min.html
	perl -pi -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'                           x_ite.min.html
	perl -pi -e 's|"rigid-body-physics.js"|"dist/rigid-body-physics.min.js"|sg' x_ite.min.html

	perl -pi -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'                       x_ite.min.html
	perl -pi -e 's|class="links"|class="links min-links"|sg'                    x_ite.min.html
	perl -pi -e 's|\>x_ite.min.html|>src/x_ite.html|sg'                         x_ite.min.html
	perl -pi -e 's|x_ite-dev|x_ite-min|sg'                                      x_ite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'                        x_ite.min.html
	perl -pi -e 's|\.\./tests/|tests/|sg'                                       x_ite.min.html

	perl build/dist.pl

	echo
	ls -la dist/x_ite.min.js
	echo

	perl -pi -e 's/return (?:true|false);/return true;/sg' src/x_ite/DEBUG.js


version: all
	perl build/version.pl


clean:
	rm x_ite.min.html
	rm x_ite.uncompressed.js
	rm x_ite.min.js
