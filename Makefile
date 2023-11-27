all: dist
	echo

configure:
	npm install
	cd docs && bundle install

.SILENT:zip
zip:
	$(eval VERSION=$(shell npm pkg get version | sed 's/"//g'))
	cp -r dist x_ite-$(VERSION)
	zip -q -x "*.zip" -r x_ite-$(VERSION).zip x_ite-$(VERSION)
	mv x_ite-$(VERSION).zip dist/x_ite.zip
	rm -r x_ite-$(VERSION)

.PHONY: dist
.SILENT:dist
dist:
	npm run dist

version: bump-version dist zip
	perl build/bin/version.pl
