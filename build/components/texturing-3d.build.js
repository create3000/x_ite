
({
	baseUrl: "../../src",
	name: "components/texturing-3d",
	out: "../../dist/components/texturing-3d.js",
	optimize: "none",
	mainConfigFile: "../../src/components/texturing-3d.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/texturing-3d.start.frag",
		endFile: "../parts/components/texturing-3d.end.frag"
	},
})
