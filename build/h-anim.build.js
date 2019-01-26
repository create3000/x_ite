
({
	baseUrl: "../src",
	name: "components/h-anim",
	out: "../dist/components/h-anim.js",
	optimize: "none",
	mainConfigFile: "../src/components/h-anim.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "parts/h-anim.start.frag",
		endFile: "parts/h-anim.end.frag"
	},
})
