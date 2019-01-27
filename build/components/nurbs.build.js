
({
	baseUrl: "../../src",
	name: "components/nurbs",
	out: "../../dist/components/nurbs.js",
	optimize: "none",
	mainConfigFile: "../../src/components/nurbs.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/nurbs.start.frag",
		endFile: "../parts/components/nurbs.end.frag"
	},
})
