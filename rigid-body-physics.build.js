
({
	baseUrl: "src",
	name: "rigid-body-physics",
	out: "dist/rigid-body-physics.js",
	optimize: "none",
	mainConfigFile: "src/rigid-body-physics.config.js",
	exclude: [
		"jquery",
		"text",
		"jquery-mousewheel",
		"pako_inflate",
		"poly2tri",
		"earcut",
		"opentype",
		"bezier",
		"sprintf",
		"x_ite/Fields",
		"x_ite/Basic/X3DFieldDefinition",
		"x_ite/Basic/FieldDefinitionArray",
		"x_ite/Components/Core/X3DSensorNode",
		"x_ite/Components/Core/X3DNode",
		"x_ite/Components/Core/X3DChildNode",
		"x_ite/Components/Grouping/X3DBoundedObject",
		"x_ite/Configuration/SupportedNodes",
		"x_ite/Bits/X3DConstants",
		"x_ite/Bits/X3DCast",
		"standard/Math/Numbers/Vector3",
		"standard/Math/Numbers/Rotation4",
		"standard/Math/Numbers/Quaternion",
		"standard/Math/Numbers/Matrix4"
	],
	wrap: {
		startFile: "build/parts/rigid-body-physics.start.frag",
		endFile: "build/parts/rigid-body-physics.end.frag"
	},
})
