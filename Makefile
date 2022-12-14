all: dist
	echo

configure:
	sudo npm install
	cd docs && bundle install

compile:
	npx webpack

.SILENT:copy-files
copy-files:
	rsync -q -r -x -c -v -t --progress --delete src/assets/fonts    dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/hatching dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/images   dist/assets/
	rsync -q -r -x -c -v -t --progress --delete src/assets/linetype dist/assets/
	cp src/example.html dist/

.SILENT:html
html:
	cp src/x_ite.html x_ite.min.html
	perl -p0i -e 's|<!-- X_ITE START.*?X_ITE END -->|<script src="dist/x_ite.min.js"></script>|sg'       x_ite.min.html
	perl -p0i -e 's|<!-- JQUERY -->|<script src="https://code.jquery.com/jquery-latest.js"></script>|sg' x_ite.min.html
	perl -p0i -e 's|<script type="module">|<script>|sg'       x_ite.min.html
	perl -p0i -e 's|import\s+X3D\s.*?\n||sg'                  x_ite.min.html
	perl -p0i -e 's|window\s*.X3D.*?\n+||sg'                  x_ite.min.html
	perl -p0i -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'        x_ite.min.html
	perl -p0i -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'    x_ite.min.html
	perl -p0i -e 's|class="links"|class="links min-links"|sg' x_ite.min.html
	perl -p0i -e 's|\>x_ite.min.html|>src/x_ite.html|sg'      x_ite.min.html
	perl -p0i -e 's|\.\./dist/|dist/|sg'                      x_ite.min.html
	perl -p0i -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'     x_ite.min.html
	perl -p0i -e 's|"examples.js"|"src/examples.js"|sg'       x_ite.min.html
	perl -p0i -e 's|"tests.js"|"src/tests.js"|sg'             x_ite.min.html
	perl -p0i -e 's|"tests/|"src/tests/|sg'                   x_ite.min.html

.SILENT:zip
zip:
	$(eval VERSION=$(shell npm pkg get version | sed 's/"//g'))
	cp -r dist x_ite-$(VERSION)
	zip -q -x "*.zip" -r x_ite-$(VERSION).zip x_ite-$(VERSION)
	mv x_ite-$(VERSION).zip dist/x_ite.zip
	rm -r x_ite-$(VERSION)

.PHONY: dist
.SILENT:dist
dist: compile copy-files html
	du -h dist/x_ite.min.js

checkout-dist:
	git checkout -- dist

version: dist zip
	perl build/bin/version.pl

.PHONY: docs
docs:
	cd docs && bundle exec jekyll serve --incremental

docs-force:
	cd docs && bundle exec jekyll serve

docs-update:
	cd docs && bundle update

open-docs-in-browser:
	open http://localhost:4000

.PHONY: tests
tests:
	perl build/bin/tests.pl
