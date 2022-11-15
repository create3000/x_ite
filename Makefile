all: dist
	echo

configure:
	sudo npm install

namespace:
	node build/bin/namespace.mjs

compile:
	npx webpack

.SILENT:html
html:
	cp src/x_ite.html x_ite.min.html
	perl -p0i -e 's|<!-- X_ITE START.*?X_ITE END -->|<script src="dist/x_ite.js"></script>\n   <script src="https://code.jquery.com/jquery-3.6.1.js"></script>|sg' x_ite.min.html
	perl -pi -e 's| *await import \("./x_ite.js"\);\n||sg'   x_ite.min.html
	perl -pi -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'        x_ite.min.html
	perl -pi -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'    x_ite.min.html
	perl -pi -e 's|class="links"|class="links min-links"|sg' x_ite.min.html
	perl -pi -e 's|\>x_ite.min.html|>src/x_ite.html|sg'      x_ite.min.html
	perl -pi -e 's|\.\./dist/|dist/|sg'                      x_ite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'     x_ite.min.html
	perl -pi -e 's|"examples.js"|"src/examples.js"|sg'       x_ite.min.html
	perl -pi -e 's|"tests.js"|"src/tests.js"|sg'             x_ite.min.html
	perl -pi -e 's|"tests/menu.js"|"src/tests/menu.js"|sg'   x_ite.min.html

.SILENT:copy-files
copy-files:
	rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/
	cp src/example.html dist/

.SILENT:zip
zip:
	cp -r dist zip-tmp
	zip -q -X -x "*.zip" -r zip-tmp.zip zip-tmp
	mv zip-tmp.zip dist/x_ite.zip
	rm -r zip-tmp

.PHONY: dist
.SILENT:dist
dist: namespace compile copy-files zip
	du -h dist/x_ite.min.js

checkout-dist:
	git checkout -- dist

version: dist
	perl build/bin/version.pl

.PHONY: docs
docs:
	cd docs && bundle exec jekyll serve

open-docs-in-browser:
	open http://localhost:4000

.PHONY: tests
tests:
	perl build/bin/tests.pl
