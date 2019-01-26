
({
	baseUrl: "src",
	name: "components/cad-geometry",
	out: "dist/components/cad-geometry.js",
	optimize: "none",
	mainConfigFile: "src/components/cad-geometry.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "build/parts/cad-geometry.start.frag",
		endFile: "build/parts/cad-geometry.end.frag"
	},
})
