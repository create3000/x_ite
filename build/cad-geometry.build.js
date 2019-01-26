
({
	baseUrl: "../src",
	name: "components/cad-geometry",
	out: "../dist/components/cad-geometry.js",
	optimize: "none",
	mainConfigFile: "../src/components/cad-geometry.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "parts/cad-geometry.start.frag",
		endFile: "parts/cad-geometry.end.frag"
	},
})
