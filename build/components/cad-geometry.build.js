
({
	baseUrl: "../../src",
	name: "assets/components/cad-geometry",
	out: "../../dist/assets/components/cad-geometry.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/default.start.frag.js",
		endFile: "../parts/default.end.frag.js"
	},
})
