
({
	baseUrl: "../../src",
	name: "assets/components/particle-systems",
	out: "../../dist/assets/components/particle-systems.js",
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
