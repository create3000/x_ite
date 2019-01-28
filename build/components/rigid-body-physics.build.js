
({
	baseUrl: "../../src",
	name: "components/rigid-body-physics",
	out: "../../dist/components/rigid-body-physics.js",
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
