
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
		startFile: "../parts/components/geospatial.start.frag",
		endFile: "../parts/components/geospatial.end.frag"
	},
})
