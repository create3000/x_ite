
({
	baseUrl: "../../src",
	name: "components/particle-systems",
	out: "../../dist/components/particle-systems.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/particle-systems.start.frag",
		endFile: "../parts/components/particle-systems.end.frag"
	},
})
