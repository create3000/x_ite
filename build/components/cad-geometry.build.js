
({
	baseUrl: "../../src",
	name: "components/cad-geometry",
	out: "../../dist/components/cad-geometry.js",
	optimize: "none",
	mainConfigFile: "../../src/components/cad-geometry.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/cad-geometry.start.frag",
		endFile: "../parts/components/cad-geometry.end.frag"
	},
})
