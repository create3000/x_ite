
({
	baseUrl: "../../src",
	name: "components/texturing-3d",
	out: "../../dist/components/texturing-3d.js",
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
