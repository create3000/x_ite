
({
	baseUrl: "../../src",
	name: "components/cad-geometry",
	out: "../../dist/components/cad-geometry.js",
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
