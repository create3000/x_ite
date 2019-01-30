
({
	baseUrl: "../../src",
	name: "components/geospatial",
	out: "../../dist/components/geospatial.js",
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
