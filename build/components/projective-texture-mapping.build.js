
({
	baseUrl: "../../src",
	name: "assets/components/projective-texture-mapping",
	out: "../../dist/assets/components/projective-texture-mapping.js",
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
