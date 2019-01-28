
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
		startFile: "../parts/components/cube-map-texturing.start.frag",
		endFile: "../parts/components/cube-map-texturing.end.frag"
	},
})
