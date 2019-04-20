
({
	baseUrl: "../../src",
	name: "assets/components/geospatial",
	out: "../../dist/assets/components/geospatial.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/default.start.frag",
		endFile: "../parts/default.end.frag"
	},
})
