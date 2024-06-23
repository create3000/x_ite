let slider;

$("x3d-canvas") .on ("load", init);

function init ()
{
	$("<input/>")
		.addClass ("button")
		.attr ("type", "file")
		.on ("change", onchange)
		.appendTo ($("#dicom-buttons"));

	slider = $("<input/>")
		.addClass ("range")
		.attr ("type", "range")
		.attr ("min", "0")
		.attr ("max", "1")
		.attr ("step", "0.001")
		.width (300)
		.val (0)
		.on ("input", onslider)
		.appendTo ($("#dicom-buttons"));

	$("<input/>")
		.addClass ("button")
		.attr ("type", "button")
		.attr ("value", "Reset View")
		.css ({ "float": "right" })
		.on ("click", resetView)
		.appendTo ($("#dicom-buttons"));

	$("#dicom-samples")
		.find ("a")
		.on ("click", onsample);
}

function onchange ()
{
	const reader = new FileReader ();

	reader .onload = onload .bind (null, reader);
	reader .readAsBinaryString (event .target .files [0]);
}

function onload (reader)
{
	const texture = X3D .getBrowser () .currentScene .getNamedNode ("Texture");

	texture .url [0] = "data:image/*;base64," + btoa (reader .result);
}

function onslider ()
{
	const textureTransform = X3D .getBrowser () .currentScene .getNamedNode ("TextureTransform");

	textureTransform .translation .z = slider .val ();
}

function resetView ()
{
	X3D .getBrowser () .changeViewpoint ("Viewpoint");
}

function onsample (event)
{
	const texture = X3D .getBrowser () .currentScene .getNamedNode ("Texture");

	texture .url [0] = $(event .currentTarget) .attr ("href");

	return false;
}
