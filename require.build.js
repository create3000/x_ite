
({
	baseUrl: "src",
	name: "excite",
	out: "dist/excite.js",
	optimize: "none",
	mainConfigFile: "src/require.config.js",
	include: [
		"../node_modules/requirejs/require.js"
	],
	wrap: {
		startFile: "build/parts/start.frag",
		endFile: "build/parts/end.frag"
	},
})
