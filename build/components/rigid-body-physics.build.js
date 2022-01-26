
({
	baseUrl: "../../src",
	name: "assets/components/rigid-body-physics",
	out: "../../dist/assets/components/rigid-body-physics.js",
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
