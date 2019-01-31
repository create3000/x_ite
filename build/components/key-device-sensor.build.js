
({
	baseUrl: "../../src",
	name: "components/key-device-sensor",
	out: "../../dist/components/key-device-sensor.js",
	optimize: "none",
	mainConfigFile: "../../src/x_ite.config.js",
	exclude: [
		"x_ite"
	],
	wrap: {
		startFile: "../parts/default.start.frag",
		endFile: "../parts/default.end.frag"
	},
})
