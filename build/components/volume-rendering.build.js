
({
	baseUrl: "../../src",
	name: "assets/components/volume-rendering",
	out: "../../dist/assets/components/volume-rendering.js",
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
