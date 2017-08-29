
configure:
	sudo npm install
	sudo npm install requirejs-text

all:
	echo

dist: all
	npm run build

	perl -pi -e 's|text/text!|text!|sg' dist/x-ite.js
	perl -pi -e 's|text/text!|text!|sg' dist/x-ite.min.js

	cp src/x-ite.html x-ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="\.\./node_modules/requirejs/require.js"></script>\n||sg' x-ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="require.config.js"></script>\n||sg'                      x-ite.min.html
	perl -pi -e 's|"x-ite.js"|"dist/x-ite.min.js"|sg'                x-ite.min.html
	perl -pi -e 's|"x-ite.css"|"dist/x-ite.css"|sg'                  x-ite.min.html
	perl -pi -e 's|\.\./x-ite.min.html|src/x-ite.html|sg'            x-ite.min.html
	perl -pi -e 's|\>x-ite.min.html|>src/x-ite.html|sg'              x-ite.min.html
	perl -pi -e 's|x-ite-dev|x-ite-min|sg'                           x-ite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'               x-ite.min.html
	perl -pi -e 's|\.\./tests/|tests/|sg'                              x-ite.min.html

	perl build/dist.pl

	echo
	ls -la dist/x-ite.min.js
	echo


version: dist
	perl build/version.pl


clean:
	rm x-ite.min.html
	rm x-ite.uncompressed.js
	rm x-ite.min.js
