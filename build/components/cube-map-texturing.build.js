
({
	baseUrl: "../../src",
	name: "assets/components/cube-map-texturing",
	out: "../../dist/assets/components/cube-map-texturing.js",
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
