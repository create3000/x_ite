
({
	baseUrl: "../src",
	name: "x_ite",
	out: "../dist/x_ite.js",
	optimize: "none",
	mainConfigFile: "../src/x_ite.config.js",
	include: [
		"../node_modules/requirejs/require.js"
	],
	excludeShallow: [
		"x_ite/Browser/Shaders/ShaderCompiler"
	],
	wrap: {
		startFile: "parts/x_ite.start.frag.js",
		endFile: "parts/x_ite.end.frag.js"
	},
})
