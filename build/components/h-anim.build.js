
({
	baseUrl: "../../src",
	name: "components/h-anim",
	out: "../../dist/components/h-anim.js",
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
