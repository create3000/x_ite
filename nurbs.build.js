
({
	baseUrl: "src",
	name: "components/nurbs",
	out: "dist/components/nurbs.js",
	optimize: "none",
	mainConfigFile: "src/components/nurbs.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "build/parts/nurbs.start.frag",
		endFile: "build/parts/nurbs.end.frag"
	},
})
