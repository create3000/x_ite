
require .config ({
	"packages": [
		{
			"name": "jquery",
			"location": "../node_modules/jquery",
			"main": "dist/jquery.js"
		},
		{
			"name": "text",
			"location": "../node_modules/text",
			"main": "text.js"
		},
		{
			"name": "jquery-mousewheel",
			"location": "../node_modules/jquery-mousewheel",
			"main": "jquery.mousewheel.js"
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
		}
	],
	"shim": { }
});
