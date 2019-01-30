
({
	baseUrl: "../../src",
	name: "components/cube-map-texturing",
	out: "../../dist/components/cube-map-texturing.js",
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
