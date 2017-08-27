
configure:
	sudo npm install
	sudo npm install requirejs-text

all:
	echo

dist: all
	npm run build

	perl -pi -e 's|text/text!|text!|sg' dist/excite.js
	perl -pi -e 's|text/text!|text!|sg' dist/excite.min.js

	cp src/excite.html excite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="\.\./node_modules/requirejs/require.js"></script>\n||sg' excite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="require.config.js"></script>\n||sg'                      excite.min.html
	perl -pi -e 's|"excite.js"|"dist/excite.min.js"|sg'                excite.min.html
	perl -pi -e 's|"excite.css"|"dist/excite.css"|sg'                  excite.min.html
	perl -pi -e 's|\.\./excite.min.html|src/excite.html|sg'            excite.min.html
	perl -pi -e 's|\>excite.min.html|>src/excite.html|sg'              excite.min.html
	perl -pi -e 's|excite-dev|excite-min|sg'                           excite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'               excite.min.html
	perl -pi -e 's|\.\./tests/|tests/|sg'                              excite.min.html

	perl build/dist.pl

	echo
	ls -la dist/excite.min.js
	echo


version: dist
	perl build/version.pl


clean:
	rm excite.min.html
	rm excite.uncompressed.js
	rm excite.min.js
