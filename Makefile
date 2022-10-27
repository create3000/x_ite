all: dist
	echo

configure:
	sudo npm install

.PHONY: dist
dist:
	$(eval X_ITE_VERSION=$(shell perl build/bin/version-number.pl))
	echo "Making Version:" $(X_ITE_VERSION)

	perl -pi -e 's/return (?:true|false);/return false;/sg' src/x_ite/DEBUG.js

	node_modules/requirejs/bin/r.js -o build/x_ite.build.js
	perl -pi -e 's|text/text!|text!|sg' dist/x_ite.js
	perl -pi -e "s|define\\s*\\('text!assets/shaders/webgl.*?\\n||sg;" dist/x_ite.js
	perl -pi -e "s|\"X_ITE.X3D\"|\"X_ITE.X3D-"$(X_ITE_VERSION)"\"|" dist/x_ite.js
	node_modules/terser/bin/terser --mangle --compress -- dist/x_ite.js > dist/x_ite.min.js
	node_modules/requirejs/bin/r.js -o cssIn=src/x_ite.css out=dist/x_ite.css

	$(call generate_component,annotation,$(X_ITE_VERSION),--compress)
	$(call generate_component,cad-geometry,$(X_ITE_VERSION),--compress)
	$(call generate_component,cube-map-texturing,$(X_ITE_VERSION),--compress)
	$(call generate_component,dis,$(X_ITE_VERSION),--compress)
	$(call generate_component,event-utilities,$(X_ITE_VERSION),--compress)
	$(call generate_component,geometry2d,$(X_ITE_VERSION),--compress)
	$(call generate_component,geospatial,$(X_ITE_VERSION),--compress)
	$(call generate_component,h-anim,$(X_ITE_VERSION),--compress)
	$(call generate_component,key-device-sensor,$(X_ITE_VERSION),--compress)
	$(call generate_component,layout,$(X_ITE_VERSION),--compress)
	$(call generate_component,nurbs,$(X_ITE_VERSION),--compress)
	$(call generate_component,particle-systems,$(X_ITE_VERSION),--compress)
	$(call generate_component,picking,$(X_ITE_VERSION),--compress)
	$(call generate_component,projective-texture-mapping,$(X_ITE_VERSION),--compress)
	$(call generate_component,rigid-body-physics,$(X_ITE_VERSION),--compress)
	$(call generate_component,scripting,$(X_ITE_VERSION),--compress)
	$(call generate_component,texturing-3d,$(X_ITE_VERSION),--compress)
	$(call generate_component,volume-rendering,$(X_ITE_VERSION),--compress)
	$(call generate_component,x_ite,$(X_ITE_VERSION),--compress)

	cp src/x_ite.html x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="\.\./node_modules/requirejs/require.js"></script>\n||sg' x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src=".*?.config.js"></script>\n||sg'                          x_ite.min.html

	perl -pi -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg'        x_ite.min.html
	perl -pi -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'    x_ite.min.html
	perl -pi -e 's|class="links"|class="links min-links"|sg' x_ite.min.html
	perl -pi -e 's|\>x_ite.min.html|>src/x_ite.html|sg'      x_ite.min.html
	perl -pi -e 's|\.\./dist/|dist/|sg'                      x_ite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'     x_ite.min.html
	perl -pi -e 's|"examples.js"|"src/examples.js"|sg'       x_ite.min.html
	perl -pi -e 's|"tests.js"|"src/tests.js"|sg'             x_ite.min.html
	perl -pi -e 's|"tests/menu.js"|"src/tests/menu.js"|sg'   x_ite.min.html

	perl build/bin/dist.pl

	echo
	ls -la dist/x_ite.min.js
	echo

	perl -pi -e 's/return (?:true|false);/return true;/sg' src/x_ite/DEBUG.js

define generate_component
	node_modules/requirejs/bin/r.js -o build/components/$(1).build.js
	perl -pi -e "s|\"X_ITE.X3D\"|\"X_ITE.X3D-"$(2)"\"|" dist/assets/components/$(1).js
	perl -pi -e "s|'assets/components/$(1)',||" dist/assets/components/$(1).js
	perl -pi -e "s|text/text!|text!|" dist/assets/components/$(1).js
	perl -pi -e "s|define\\s*\\(\\[|define (require .getComponentUrl (\"$(1)\"), [|" dist/assets/components/$(1).js
	node_modules/terser/bin/terser --mangle $(3) -- dist/assets/components/$(1).js > dist/assets/components/$(1).min.js
endef

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
tests: tests-menu examples-and-tests
	echo

tests-menu:
	perl build/bin/tests-menu.pl

examples-and-tests:
	perl build/bin/examples-and-tests.pl
