
({
	baseUrl: "../../src",
	name: "assets/components/scripting",
	out: "../../dist/assets/components/scripting.js",
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
