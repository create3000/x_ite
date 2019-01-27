
({
	baseUrl: "../../src",
	name: "components/h-anim",
	out: "../../dist/components/h-anim.js",
	optimize: "none",
	mainConfigFile: "../../src/components/h-anim.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/h-anim.start.frag",
		endFile: "../parts/components/h-anim.end.frag"
	},
})
