$("x3d-canvas") .on ("load", init);

function init ()
{
	$("#source-color") .on ("change", sourceColor);
	$("#source-alpha") .on ("change", sourceAlpha);
	$("#destination-color") .on ("change", destinationColor);
	$("#destination-alpha") .on ("change", destinationAlpha);
	$("#equation-color") .on ("change", equationColor);
	$("#equation-alpha") .on ("change", equationAlpha);

	$("#foreground-images img") .each (function (e)
	{
		$(this) .on ("click", foreground .bind (null, this .src));
	});

	$("#background-images img") .each (function (e)
	{
		$(this) .on ("click", background .bind (null, this .src));
	});

	$("#change-urls") .on ("click", changeURLs);

	$(".color") .each (function (e)
	{
		var style = this .getAttribute ("style");

		if (style)
		{
			var
			m = style .match (/#([\da-fA-F]+)/),
			c = parseInt (m [1], 16);

			var
			r = ((c >> 16) & 255) / 255,
			g = ((c >>  8) & 255) / 255,
			b = ((c >>  0) & 255) / 255,
			a = 1;
		}
		else
		{
			var
			r = 0,
			g = 0,
			b = 0,
			a = 0;
		}

		$(this) .on ("click", changeColor .bind (null, new X3D .SFColorRGBA (r, g, b, a)));
	});

	foreground ("assets/images/flower.png");
	background ("assets/images/lake.jpeg");
	sourceColor ();
	sourceAlpha ();
	destinationColor ();
	destinationAlpha ();
}

function changeURLs ()
{
	foreground ($("#foreground-url") .val ());
	background ($("#background-url") .val ());
}

function foreground (file)
{
	var
		Browser = X3D .getBrowser (),
		scene   = Browser .currentScene,
		texture = scene .getNamedNode ("ForegroundImage");

	texture .url [0] = file;
	$("#foreground-url") .val (file);
}

function background (file)
{
	var
		Browser = X3D .getBrowser (),
		scene   = Browser .currentScene,
		texture = scene .getNamedNode ("BackgroundImage");

	texture .url [0] = file;
	$("#background-url") .val (file);
}

function sourceColor ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#source-color option:selected") .val ();

	blendMode .sourceColorFactor = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function sourceAlpha ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#source-alpha option:selected") .val ();

	blendMode .sourceAlphaFactor = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function destinationColor ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#destination-color option:selected") .val ();

	blendMode .destinationColorFactor = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function destinationAlpha ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#destination-alpha option:selected") .val ();

	blendMode .destinationAlphaFactor = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function equationColor ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#equation-color option:selected") .val ();

	blendMode .colorEquation = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function equationAlpha ()
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode"),
		value     = $("#equation-alpha option:selected") .val ();

	blendMode .alphaEquation = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function changeColor (value)
{
	var
		Browser   = X3D .getBrowser (),
		scene     = Browser .currentScene,
		blendMode = scene .getNamedNode ("BlendMode");

	blendMode .blendColor = value;

	equationText (blendMode);
	xmlOutput (blendMode);
}

function equationText (blendMode)
{
	$("#red-equation")   .text (getEquation (0, blendMode .sourceColorFactor, blendMode .destinationColorFactor, blendMode .colorEquation, blendMode .blendColor));
	$("#green-equation") .text (getEquation (1, blendMode .sourceColorFactor, blendMode .destinationColorFactor, blendMode .colorEquation, blendMode .blendColor));
	$("#blue-equation")  .text (getEquation (2, blendMode .sourceColorFactor, blendMode .destinationColorFactor, blendMode .colorEquation, blendMode .blendColor));
	$("#alpha-equation") .text (getEquation (3, blendMode .sourceAlphaFactor, blendMode .destinationAlphaFactor, blendMode .alphaEquation, blendMode .blendColor));
}

function getEquation (i, sourceFactor, destinationFactor, equation, blendColor)
{
	var channels = ["R", "G", "B", "A"];

	var channel = channels [i];

	switch (equation)
	{
		case "FUNC_ADD":
		{
			return getEquationTerm (i, "s", channel, sourceFactor, blendColor) + " + " + getEquationTerm (i, "d", channel, destinationFactor, blendColor) + " = r" + channel;
		}
		case "FUNC_SUBTRACT":
		{
			return getEquationTerm (i, "s", channel, sourceFactor, blendColor) + " - " + getEquationTerm (i, "d", channel, destinationFactor, blendColor) + " = r" + channel;
		}
		case "FUNC_REVERSE_SUBTRACT":
		{
			return getEquationTerm (i, "d", channel, destinationFactor, blendColor) + " - " + getEquationTerm (i, "s", channel, sourceFactor, blendColor) + " = r" + channel;
		}
		case "MIN":
		{
			return "min (s" + channel + ", d" + channel + ")" + " = r" + channel;
		}
		case "MAX":
		{
			return "max (s" + channel + ", d" + channel + ")" + " = r" + channel;
		}
		default:
		{
			return "n/a";
		}
	}
}

function getEquationTerm (i, side, channel, factor, blendColor)
{
	return "(" + side + "" + channel + " × " + getEquationFactor (i, channel, factor, blendColor) + ")";
}

function getEquationFactor (i, channel, factor, blendColor)
{
	switch (factor)
	{
		case "ZERO":
			return "0";
		case "ONE":
			return "1";
		case "SRC_COLOR":
			return "s" + channel;
		case "ONE_MINUS_SRC_COLOR":
			return "(1 - s" + channel + ")";
		case "DST_COLOR":
			return "d" + channel;
		case "ONE_MINUS_DST_COLOR":
			return "(1 - d" + channel + ")";
		case "SRC_ALPHA":
			return "sA";
		case "ONE_MINUS_SRC_ALPHA":
			return "(1 - sA)";
		case "DST_ALPHA":
			return "dA";
		case "ONE_MINUS_DST_ALPHA":
			return "(1 - dA)";
		case "SRC_ALPHA_SATURATE":
			return "min (sA, 1 - dA)";
		case "CONSTANT_COLOR":
			return blendColor [i] .toFixed (3);
		case "ONE_MINUS_CONSTANT_COLOR":
			return "(1 - " + blendColor [i] .toFixed (3) + ")";
		case "CONSTANT_ALPHA":
			return blendColor [3] .toFixed (3);
		case "ONE_MINUS_CONSTANT_ALPHA":
			return "(1 - " + blendColor [3] .toFixed (3) + ")";
		default:
			return "n/a";
	}
}

function xmlOutput (blendMode)
{
	$("#XML")  .text (blendMode .toXMLString ()  .trim ());
	$("#VRML") .text (blendMode .toVRMLString () .trim ());
}
