
({
	baseUrl: "../../src",
	name: "components/nurbs",
	out: "../../dist/components/nurbs.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/components/nurbs.start.frag",
		endFile: "../parts/components/nurbs.end.frag"
	},
})
