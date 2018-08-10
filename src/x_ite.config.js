
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
			"name": "poly2tri",
			"location": "../node_modules/poly2tri",
			"main": "dist/poly2tri.js"
		},
		{
			"name": "earcut",
			"location": "../node_modules/earcut",
			"main": "dist/earcut.dev.js"
		},
		{
			"name": "opentype",
			"location": "../node_modules/opentype.js",
			"main": "dist/opentype.js"
		},
		{
			"name": "bezier",
			"location": "../node_modules/bezier-js",
			"main": "bezier.js"
		},
		{
			"name": "sprintf",
			"location": "../node_modules/sprintf-js",
			"main": "dist/sprintf.min.js"
		}
	],
	"shim": { },
});
