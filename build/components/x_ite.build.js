
({
	baseUrl: "../../src",
	name: "components/x_ite",
	out: "../../dist/components/x_ite.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/x_ite.start.frag",
		endFile: "../parts/components/x_ite.end.frag"
	},
})
