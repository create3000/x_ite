
({
	baseUrl: "src",
	name: "x_ite",
	out: "dist/x_ite.js",
	optimize: "none",
	mainConfigFile: "src/x_ite.config.js",
	include: [
		"../node_modules/requirejs/require.js"
	],
	wrap: {
		startFile: "build/parts/x_ite.start.frag",
		endFile: "build/parts/x_ite.end.frag"
	},
})
