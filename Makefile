
dist: all
	echo

configure:
	sudo npm install

all:
	perl build/bin/version-number.pl

	perl -pi -e 's/return (?:true|false);/return false;/sg' src/x_ite/DEBUG.js

	node_modules/requirejs/bin/r.js -o build/x_ite.build.js
	perl -pi -e "s|define\\('text/text!assets/shaders/webgl.*?\\n||sg;" dist/x_ite.js
	node_modules/uglify-js-es6/bin/uglifyjs --mangle --compress -- dist/x_ite.js > dist/x_ite.min.js
	node_modules/requirejs/bin/r.js -o cssIn=src/x_ite.css out=dist/x_ite.css

	$(call generate_component,cad-geometry,--compress)
	$(call generate_component,cube-map-texturing,--compress)
	$(call generate_component,dis,--compress)
	$(call generate_component,event-utilities,--compress)
	$(call generate_component,geometry2d,--compress)
	$(call generate_component,geospatial,--compress)
	$(call generate_component,h-anim,--compress)
	$(call generate_component,key-device-sensor,--compress)
	$(call generate_component,layout,--compress)
	$(call generate_component,nurbs,--compress)
	$(call generate_component,particle-systems,--compress)
	$(call generate_component,picking,--compress)
	$(call generate_component,rigid-body-physics)
	$(call generate_component,scripting,--compress)
	$(call generate_component,texturing-3d,--compress)
	$(call generate_component,volume-rendering,--compress)
	$(call generate_component,x_ite,--compress)

	perl -pi -e 's|text/text!|text!|sg' dist/x_ite.js
	perl -pi -e 's|text/text!|text!|sg' dist/x_ite.min.js

	cp src/x_ite.html x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src="\.\./node_modules/requirejs/require.js"></script>\n||sg' x_ite.min.html
	perl -pi -e 's|\s*<script type="text/javascript" src=".*?.config.js"></script>\n||sg'                          x_ite.min.html

	perl -pi -e 's|"x_ite.css"|"dist/x_ite.css"|sg'   x_ite.min.html
	perl -pi -e 's|"x_ite.js"|"dist/x_ite.min.js"|sg' x_ite.min.html

	perl -pi -e 's|\.\./x_ite.min.html|src/x_ite.html|sg'                       x_ite.min.html
	perl -pi -e 's|class="links"|class="links min-links"|sg'                    x_ite.min.html
	perl -pi -e 's|\>x_ite.min.html|>src/x_ite.html|sg'                         x_ite.min.html
	perl -pi -e 's|x_ite-dev|x_ite-min|sg'                                      x_ite.min.html
	perl -pi -e 's|"bookmarks.js"|"src/bookmarks.js"|sg'                        x_ite.min.html
	perl -pi -e 's|"examples.js"|"src/examples.js"|sg'                          x_ite.min.html
	perl -pi -e 's|"tests.js"|"src/tests.js"|sg'                                x_ite.min.html
	perl -pi -e 's|\.\./tests/|tests/|sg'                                       x_ite.min.html

	perl build/bin/dist.pl

	echo
	ls -la dist/x_ite.min.js
	echo

	perl -pi -e 's/return (?:true|false);/return true;/sg' src/x_ite/DEBUG.js


version: all
	perl build/bin/version.pl


clean:
	rm x_ite.min.html
	rm x_ite.uncompressed.js
	rm x_ite.min.js

define generate_component
	node_modules/requirejs/bin/r.js -o build/components/$(1).build.js
	perl -pi -e "s|'assets/components/$(1)',||" dist/assets/components/$(1).js
	perl -pi -e "s|text/text!|text!|" dist/assets/components/$(1).js
	node_modules/uglify-js-es6/bin/uglifyjs --mangle $(2) -- dist/assets/components/$(1).js > dist/assets/components/$(1).min.js
endef
