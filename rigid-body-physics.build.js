
({
	baseUrl: "src",
	name: "components/rigid-body-physics",
	out: "dist/components/rigid-body-physics.js",
	optimize: "none",
	mainConfigFile: "src/components/rigid-body-physics.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "build/parts/rigid-body-physics.start.frag",
		endFile: "build/parts/rigid-body-physics.end.frag"
	},
})
