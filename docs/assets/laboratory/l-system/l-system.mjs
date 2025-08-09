// L-System

$("x3d-canvas") .on ("load", init);

function init ()
{
	$("a.download.l-system") .on ("click", download);
	$("a.reset-view") .on ("click", resetView);

	$("#iterations")       .on ("keyup mouseup", generate);
	$("#u-tilt")           .on ("keyup mouseup", generate);
	$("#v-tilt")           .on ("keyup mouseup", generate);
	$("#twist")            .on ("keyup mouseup", generate);
	$("#angle-variation")  .on ("keyup mouseup", generate);
	$("#length-variation") .on ("keyup mouseup", generate);
	$("#constants")        .on ("keyup", generate);
	$("#axiom")            .on ("keyup", generate);

	for (var i = 0; i < 6; ++ i)
	{
		$("#rule-" + i) .on ("keyup", generate);
	}

	// Predefined L-Systems

	const colors = {
		black: new X3D .MFColor (new X3D .SFColor (0.1, 0.1, 0.1)),
		nature1: new X3D .MFColor (new X3D .SFColor (0.545098, 0.411765, 0.0784314),
											new X3D .SFColor (0, 0.501961, 0)),
		nature2: new X3D .MFColor (new X3D .SFColor (0.338, 0.215162, 0.153535),
											new X3D .SFColor (0.432, 0.274999, 0.196233),
											new X3D .SFColor (0.773505, 0.749486, 0.517487),
											new X3D .SFColor (0.0640518, 0.92876, 0.194553)),
		nature3: new X3D .MFColor (new X3D .SFColor (0.345861, 0.447, 0.203048),
											new X3D .SFColor (0.317286, 0.415, 0.188511),
											new X3D .SFColor (0.755182, 0.896662, 0.753072),
											new X3D .SFColor (0.0640518, 0.92876, 0.194553)),
		nature4: new X3D .MFColor (new X3D .SFColor (0.121477, 0.157, 0.0713166),
											new X3D .SFColor (0.317286, 0.415, 0.188511),
											new X3D .SFColor (0.508191, 0.788795, 0.406513)),
	};

	const predefineds = $("img.predefined");

	$(predefineds [0]) .on ("click", () => setOptions (8, 0, 45, 0, 0, 0, "", "B", ["A=#0AA", "B=#1A[+B]-B"], colors .nature1));
	$(predefineds [1]) .on ("click", () => setOptions (6, 0, 25, 25, 0, 0, "X", "X", ["X=#0F->[#2[X]+>#3X]+>#1F[#3+>FX]->X", "F=FF"], colors .nature2));
	$(predefineds [2]) .on ("click", () => setOptions (5, 0, 25, 80, 0, 0, "", "FX", ["F=#0FF-[>#1->F+>F]+[>#2+>F->>F]", "X=#0FF+[>#1+>F]+[>#3->F]"], colors .nature3));
	$(predefineds [3]) .on ("click", () => setOptions (5, 0, 22, 62.354997, 0, 0, "", "F", ["F=#0FF-[#1-<F+>F+>F]+[#2+>F#2-<F-<F]"], colors .nature4));
	$(predefineds [4]) .on ("click", () => setOptions (3, 0, 27, 62.354997, 0, 0, "", "F", ["F=#0FF[#1-<F++>>F][#2+>F--<<F]#3++F--F"], colors .nature4));
	$(predefineds [5]) .on ("click", () => setOptions (12, 0, 90, 0, 0, 0, "", "FX", ["X=X+YF+", "Y=-FX-Y"], colors .black));
	$(predefineds [6]) .on ("click", () => setOptions (5, 0, 90, 0, 0, 0, "", "-F", ["F=F+F-F-F+F"], colors .black));
	$(predefineds [7]) .on ("click", () => setOptions (7, 0, 60, 0, 0, 0, "", "A", ["A=B-A-B", "B=A+B+A"], colors .black));
	$(predefineds [8]) .on ("click", () => setOptions (4, 0, 72, 0, 0, 0, "", "F-F-F-F-F", ["F=F-F++F-F", "X=FF"], colors .black));
	$(predefineds [9]) .on ("click", () => setOptions (5, 0, 20, 120, 0.5, 0.3, "", "B", ["A=#0AA", "B=#0A#1[>>+B>[+B][-B]]#0A#1[>+B[+B][-B]]>>-B"], colors .black));

	$(predefineds [0]) .trigger ("click");
}

function download ()
{
	const
	 	x3dSyntax = X3D .getBrowser () .currentScene .toVRMLString (),
		blob      = new Blob ([x3dSyntax], { type: "model/x3d+vrml;charset=utf-8" });

	saveAs (blob, "l-system.x3dv");

	return false;
}

function resetView (event)
{
	const Browser = X3D .getBrowser ();

	Browser .currentScene .getNamedNode ("Viewpoint") .viewAll = true;

	return false;
}

function setOptions (iterations, uTilt, vTilt, twist, angleVariation, lengthVariation, constants, axiom, rules, color)
{
	$("#iterations")       .val (iterations);
	$("#u-tilt")           .val (uTilt);
	$("#v-tilt")           .val (vTilt);
	$("#twist")            .val (twist);
	$("#angle-variation")  .val (angleVariation);
	$("#length-variation") .val (lengthVariation);
	$("#constants")        .val (constants);
	$("#axiom")            .val (axiom);

	for (var i = 0; i < 6; ++ i)
	{
		$("#rule-" + i) .val ((rules [i] || "") .trim ());
	}

	setColor (color);

	generate ();
	setTimeout (() => resetView ());
}

function setColor (color)
{
	var indexedLineSet = X3D .getBrowser () .currentScene .getNamedNode ("L-System");

	indexedLineSet .color .color = color;

	$("#colors") .empty ();

	for (var i = 0, l = color .length; i < l; ++ i)
	{
		var c = color [i];
		var r = Math .floor (c .r * 255);
		var g = Math .floor (c .g * 255);
		var b = Math .floor (c .b * 255);

		var div = $("<div/>")
			.addClass ("color")
			.css ("background-color", "rgb(" + r + ", " + g + ", " + b + ")")
			.text ("#XXX")
			.appendTo ($("#colors"));

		var hueb = new Huebee (div [0], { });

		hueb .on ("change", function (i, color)
		{
			var v = parseInt (color .substr (1), 16);
			var r = ((v >> 8) & 15) / 15;
			var g = ((v >> 4) & 15) / 15;
			var b = ((v >> 0) & 15) / 15;

			indexedLineSet .color .color [i] = new X3D .SFColor (r, g, b);
		}
		.bind (null, i))
	}

	$("<div/>")
		.addClass ("add-color")
		.addClass ("material-icons")
		.text ("add_circle")
		.attr ("title", "Add color.")
		.appendTo ($("#colors"))
		.on ("click", function ()
		{
			var color = indexedLineSet .color .color;

			color .push (new X3D .SFColor ());

			setColor (color);
		});

	$("<div/>")
		.addClass ("remove-color")
		.addClass ("material-icons")
		.text ("remove_circle")
		.attr ("title", "Remove color.")
		.appendTo ($("#colors"))
		.on ("click", function ()
		{
			var color = indexedLineSet .color .color;

			if (color .length == 0)
				return;

			color .pop ();

			setColor (color);
		});
}

function generate ()
{
	try
	{
		const lsystem = new LSystem ();

		lsystem .setIterations (+$("#iterations") .val ());
		lsystem .setConstants ($("#constants") .val ());
		lsystem .setAxiom ($("#axiom") .val ());

		const rules = [ ];

		for (let i = 0; i < 6; ++ i)
		{
			const rule = $("#rule-" + i) .val () .trim ();

			if (rule)
				rules .push (rule);
		}

		lsystem .setRules (rules);
		lsystem .generate ();

		const renderer = new TurtleRenderer (lsystem);

		renderer .setXAngle (+$("#u-tilt") .val () / 180 * Math .PI);
		renderer .setYAngle (+$("#twist") .val () / 180 * Math .PI);
		renderer .setZAngle (+$("#v-tilt") .val () / 180 * Math .PI);
		renderer .setAngleVariation (+$("#angle-variation") .val ());
		renderer .setLengthVariation (+$("#length-variation") .val ());

		renderer .generate ();

		const stack      = [ ];
		const root       = renderer .getTree ();
		const colorIndex = new X3D .MFInt32 ();
		const coordIndex = new X3D .MFInt32 ();
		const points     = new X3D .MFVec3f ();

		if (root)
		{
			const color = root .color;
			const coord = points .length;

			points .push (root .point);

			for (let i = 0, l = root .children .length; i < l; ++ i)
				stack .push ({ child: root .children [i], color: color, coord: coord });

			while (stack .length)
			{
				const first  = stack [stack .length - 1];

				let second = first .child;
				let color  = second .color;
				let coord  = points .length;

				stack .pop ();
				points .push (second .point);

				colorIndex .push (first .color);
				coordIndex .push (first .coord);

				while (second .children .length == 1)
				{
					colorIndex .push (color);
					coordIndex .push (coord);

					second = second .children [0];
					color  = second .color;
					coord  = points .length;

					points .push (second .point);
				}

				colorIndex .push (color);
				colorIndex .push (-1);

				coordIndex .push (coord);
				coordIndex .push (-1);

				for (let i = 0, l = second .children .length; i < l; ++ i)
					stack .push ({ child: second .children [i], color: color, coord: coord });
			}

			// Fit in box of size 1,1,1.

			let
				minX = Number .POSITIVE_INFINITY,
				minY = Number .POSITIVE_INFINITY,
				minZ = Number .POSITIVE_INFINITY,
				maxX = Number .NEGATIVE_INFINITY,
				maxY = Number .NEGATIVE_INFINITY,
				maxZ = Number .NEGATIVE_INFINITY;

			for (let i = 0, l = points .length; i < l; ++ i)
			{
				const p = points [i];

				minX = Math .min (minX, p .x);
				minY = Math .min (minY, p .y);
				minZ = Math .min (minZ, p .z);

				maxX = Math .max (maxX, p .x);
				maxY = Math .max (maxY, p .y);
				maxZ = Math .max (maxZ, p .z);
			}

			const size      = Math .max (maxX - minX, maxY - minY, maxZ - minZ);
			const center    = [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2];
			const normalize = false;

			if (normalize)
			{
				const scaleMatrix = new X3D .SFMatrix4d (1/size, 0, 0, 0,  0, 1/size, 0, 0,  0, 0, 1/size, 0,  -center[0]/size, -center[1]/size, -center[2]/size, 1);

				for (let i = 0, l = points .length; i < l; ++ i)
					points [i] = scaleMatrix .multVecMatrix (points [i]);
			}
			else
			{
				const transform = X3D .getBrowser () .currentScene .getNamedNode ("XForm");

				transform .translation = new X3D .SFVec3f (-center [0] / size, -center [1] / size, -center [2] / size);
				transform .scale       = new X3D .SFVec3f (1 / size, 1 / size, 1 / size);
			}
		}

		const indexedLineSet = X3D .getBrowser () .currentScene .getNamedNode ("L-System");

		indexedLineSet .colorIndex   = colorIndex;
		indexedLineSet .coordIndex   = coordIndex;
		indexedLineSet .coord .point = points;

		// Display line count.

		lineCount (coordIndex);
	}
	catch (error)
	{
		console .log (error);
		alert (error .message);
	}
}

function lineCount (coordIndex)
{
	var lines = 0;

	for (var i = 0, length = coordIndex .length; i < length; ++ i)
	{
		if (coordIndex [i] == -1)
		{
			-- lines;
			continue;
		}

		++ lines;
	}

	$(".lines") .text (lines .toLocaleString ($("html") .attr ("lang")) + " Lines");
}

/* TurtleRenderer */

function TurtleRenderer (lsystem)
{
	this .lsystem   = lsystem;
	this .tolerance = 1e-5;
}

TurtleRenderer .prototype =
{
	setXAngle: function (value)
	{
		this .xAngle = value;
	},
	setYAngle: function (value)
	{
		this .yAngle = value;
	},
	setZAngle: function (value)
	{
		this .zAngle = value;
	},
	setAngleVariation: function (value)
	{
		this .angleVariation = value;
	},
	setLengthVariation: function (value)
	{
		this .lengthVariation = value;
	},
	getTree: function ()
	{
		return this .tree;
	},
	generate: function ()
	{
		var
			xAngle = this .xAngle,
			yAngle = this .yAngle,
			zAngle = this .zAngle;

		var
			lsystem         = this .lsystem,
			xAxis           = new X3D .SFVec3f (1, 0, 0),
			yAxis           = new X3D .SFVec3f (0, 1, 0),
			zAxis           = new X3D .SFVec3f (0, 0, 1),
			angleVariation  = this .angleVariation,
			lengthVariation = this .lengthVariation,
			tolerance       = this .tolerance;

		var
			change        = true,
			color         = 0,
			lastColor     = -1,
			rotation      = new X3D .SFRotation (),
			point         = new X3D .SFVec3f (),
			lastDirection = new X3D .SFVec3f (),
			root          = { point: point, color: color, lineColor: -1, children: [] },
			node          = root,
			stack         = [ ];

		var commands = lsystem .getCommands ();

		for (var c = 0, l = commands .length; c < l; ++ c)
		{
			var cmd = commands [c];

			switch (cmd)
			{
				case "#": // Color
				{
					var index = parseFloat (commands [c + 1]);

					if (Number .isInteger (index) && index >= 0)
					{
						++ c;

						change      = index != lastColor;
						color       = index;
						node .color = index;
					}

					break;
				}
				case "\\": // Counterclockwise rotation about local x-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (xAxis), this .variation (xAngle, angleVariation)));
					break;
				}
				case "/": // Clockwise rotation about local x-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (xAxis), -this .variation (xAngle, angleVariation)));
					break;
				}
				case ">": // Counterclockwise rotation about local y-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (yAxis), this .variation (yAngle, angleVariation)));
					break;
				}
				case "<": // Clockwise rotation about local y-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (yAxis), -this .variation (yAngle, angleVariation)));
					break;
				}
				case "+": // Counterclockwise rotation about local z-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (zAxis), this .variation (zAngle, angleVariation)));
					break;
				}
				case "-": // Clockwise rotation about local z-axis
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (zAxis), -this .variation (zAngle, angleVariation)));
					break;
				}
				case '|': // Turn around 180°
				{
					rotation = rotation .multiply (new X3D .SFRotation (rotation .multVec (zAxis), Math .PI));
					break;
				}
				case "[":
				{
					stack .push ({
						node: node,
						point: point,
						rotation: rotation,
						color: color,
					});

					change    = true;
					lastColor = -1;
					break;
				}
				case "]": // Pop
				{
					if (stack .length == 0)
						break;

					var back = stack [stack .length - 1];

					change    = true;
					color     = back .color;
					lastColor = -1;
					rotation  = back .rotation;
					point     = back .point;
					node      = back .node;

					stack .pop ();
					break;
				}
				default: // Line
				{
					if (lsystem .isConstant (cmd))
						break;

					var length    = this .variation (1, lengthVariation);
					var direction = rotation .multVec (yAxis);

					point = point .add (direction .multiply (length));

					if (change || Math .abs (lastDirection .distance (direction)) > tolerance)
					{
						change        = false;
						lastColor     = color;
						lastDirection = direction;

						var child = { point: point, color: color, lineColor: -1, children: [] };

						node .children .push (child);

						node = child;
					}
					else
					{
						node .point = point;
					}

					break;
				}
			}
		}

		this .tree = root;
	},
	variation: function (value, variation)
	{
		var v = value * variation;

		return this .random (Math .max (0, value - v), value + v);
	},
	random: function (min, max)
	{
		return min + Math .random () * (max - min);
	},
};

/* L-System */

function LSystem ()
{
}

LSystem .prototype =
{
	setIterations: function (value)
	{
		this .iterations = value;
	},
	setConstants: function (value)
	{
		this .constants = value;
	},
	setAxiom: function (value)
	{
		this .axiom = value;
	},
	getCommands: function ()
	{
		return this .commands;
	},
	setRules: function (value)
	{
		this .rules = new Map ();

		value .forEach (function (rule)
		{
			rule = rule .replace (/\s+/);

			if (rule .length == 0)
				return;

			if (rule .length > 1 && rule [1] == "=")
				this .rules .set (rule [0], rule .substr (2));
		},
		this)
	},
	isConstant: function (value)
	{
		return this .constants .indexOf (value) >= 0;
	},
	generate: function ()
	{
		var
			rules    = this .rules,
			commands = this .axiom;

		// Process for each iteration.
		for (var i = 0; i < this .iterations; ++ i)
		{
			var cmds = "";

			// Process each character of the axiom.
			for (var c = 0, length = commands .length; c < length; ++ c)
			{
				var cmd = commands [c];

				var rule = rules .get (cmd);

				if (rule !== undefined)
					cmds += rule;
				else
					cmds += cmd;

				if (cmds .length > 100000000)
					throw new Error ("L-System: generated command string too large! 100,000,000 commands maximum.");
			}

			commands = cmds;
		}

		this .commands = commands;
		//console .log (commands);
	},
};
