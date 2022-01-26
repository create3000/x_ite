
({
	baseUrl: "../../src",
	name: "assets/components/key-device-sensor",
	out: "../../dist/assets/components/key-device-sensor.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/default.start.frag.js",
		endFile: "../parts/default.end.frag.js"
	},
})
