
require .config ({
	"packages": [
		{
			"name": "jquery",
			"location": "../node_modules/jquery",
			"main": "dist/jquery.js"
		},
		{
			"name": "text",
			"location": "../node_modules/requirejs-text",
			"main": "text.js"
		},
		{
			"name": "jquery-mousewheel",
			"location": "../node_modules/jquery-mousewheel",
			"main": "jquery.mousewheel.js"
		},
		{
			"name": "ResizeSensor",
			"location": "../node_modules/css-element-queries",
			"main": "src/ResizeSensor.js"
		},
		{
			"name": "pako_inflate",
			"location": "../node_modules/pako",
			"main": "dist/pako_inflate.js"
		},
		{
			"name": "libtess",
			"location": "../node_modules/libtess",
			"main": "libtess.cat.js"
		},
		{
			"name": "opentype",
			"location": "../node_modules/opentype.js",
			"main": "dist/opentype.js"
		},
		{
			"name": "sprintf",
			"location": "../node_modules/sprintf-js",
			"main": "dist/sprintf.min.js"
		},
		{
			"name": "contextMenu",
			"location": "../node_modules/jquery-contextmenu",
			"main": "dist/jquery.contextMenu.js"
		},
		{
			"name": "nurbs",
			"location": "lib/nurbs",
			"main": "nurbs.js"
		},
		{
			"name": "ammojs",
			"location": "../node_modules/ammojs",
			"main": "ammo.js"
		},
		{
			"name": "dicom-parser",
			"location": "../node_modules/dicom-parser",
			"main": "dist/dicomParser.js"
		},
		{
			"name": "jpeg",
			"location": "../node_modules/jpeg-js",
			"main": "lib/decoder.js"
		},
		{
			"name": "jpegLossless",
			"location": "../node_modules/jpeg-lossless-decoder-js",
			"main": "release/current/lossless.js"
		},
		{
			"name": "CharLS",
			"location": "../node_modules/CharLS.js",
			"main": "build/charLS-FixedMemory-browser.js"
		},
		{
			"name": "OpenJPEG",
			"location": "../node_modules/OpenJPEG.js",
			"main": "build/openJPEG-FixedMemory-browser.js"
		},
		{
			"name": "showdown",
			"location": "../node_modules/showdown/dist",
			"main": "showdown.js"
		},
		{
			"name": "zlib",
			"location": "../src",
			"main": "dummy.js"
		}
	],
	"shim": { },
});
