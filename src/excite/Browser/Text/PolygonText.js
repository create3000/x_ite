/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Browser/Core/PrimitiveQuality",
	"excite/Browser/Text/X3DTextGeometry",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Triangle2",
	"bezier",
	"poly2tri",
	"earcut",
],
function ($,
          PrimitiveQuality,
          X3DTextGeometry,
          Vector3,
          Matrix4,
          Triangle2,
          bezier,
          poly2tri,
          earcut)
{
"use strict";

	var
		min    = new Vector3 (0, 0, 0),
		max    = new Vector3 (0, 0, 0),
		paths  = [ ],
		points = [ ],
		curves = [ ];

	function PolygonText (text, fontStyle)
	{
		X3DTextGeometry .call (this, text, fontStyle);

		text .transparent_ = false;

		this .texCoords = [ ];
	}

	PolygonText .prototype = $.extend (Object .create (X3DTextGeometry .prototype),
	{
		constructor: PolygonText,
		getMatrix: function ()
		{
			return Matrix4 .Identity;
		},
		build: function ()
		{
			var
				fontStyle = this .getFontStyle (),
				font      = fontStyle .getFont ();

			if (! font)
				return;

			var
				text             = this .getText (),
				glyphs           = this .getGlyphs (),
				minorAlignment   = this .getMinorAlignment (),
				translations     = this .getTranslations (),
				charSpacings     = this .getCharSpacings (),
				size             = fontStyle .getScale (),
				spacing          = fontStyle .spacing_ .getValue (),
				origin           = text .origin_ .getValue (),
				sizeUnitsPerEm   = size / font .unitsPerEm,
				primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
				texCoords        = this .texCoords,
				normals          = text .getNormals (),
				vertices         = text .getVertices ();

			texCoords .length = 0;
			text .getTexCoords () .push (texCoords);

			this .getBBox () .getExtents (min, max);
			text .getMin () .assign (min);
			text .getMax () .assign (max);

			if (fontStyle .horizontal_ .getValue ())
			{
				for (var l = 0, length = glyphs .length; l < length; ++ l)
				{
					var
						line         = glyphs [l],
						charSpacing  = charSpacings [l],
						translation  = translations [l],
						advanceWidth = 0;

					for (var g = 0, gl = line .length; g < gl; ++ g)
					{
						var
							glyph         = line [g],
							glyphVertices = this .getGlyphGeometry (glyph, primitiveQuality);
						
						for (var v = 0, vl = glyphVertices .length; v < vl; ++ v)
						{
							var
								x = glyphVertices [v] .x * size + minorAlignment .x + translation .x + advanceWidth + g * charSpacing,
								y = glyphVertices [v] .y * size + minorAlignment .y + translation .y;
		
							texCoords .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
							normals   .push (0, 0, 1);
							vertices  .push (x, y, 0, 1);
						}
		
						// Calculate advanceWidth.
		
						var kerning = 0;
		
						if (g + 1 < line .length)
							kerning = font .getKerningValue (glyph, line [g + 1]);
		
						advanceWidth += (glyph .advanceWidth + kerning) * sizeUnitsPerEm;
					}
				}
			}
			else
			{
				var
					leftToRight = fontStyle .leftToRight_ .getValue (),
					topToBottom = fontStyle .topToBottom_ .getValue (),
					first       = leftToRight ? 0 : text .string_ .length - 1,
					last        = leftToRight ? text .string_ .length  : -1,
					step        = leftToRight ? 1 : -1;

				for (var l = first, t = 0; l !== last; l += step)
				{
					var line = glyphs [l];

					var
					   numChars = line .length,
						firstG   = topToBottom ? 0 : numChars - 1,
						lastG    = topToBottom ? numChars : -1,
						stepG    = topToBottom ? 1 : -1;

					for (var g = firstG; g !== lastG; g += stepG, ++ t)
					{
						var
							translation   = translations [t],
							glyphVertices = this .getGlyphGeometry (line [g], primitiveQuality);

						for (var v = 0, vl = glyphVertices .length; v < vl; ++ v)
						{
							var
								x = glyphVertices [v] .x * size + minorAlignment .x + translation .x,
								y = glyphVertices [v] .y * size + minorAlignment .y + translation .y;
			
							texCoords .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
							normals   .push (0, 0, 1);
							vertices  .push (x, y, 0, 1);
						}
					}
				}
			}
		},
		getGlyphExtents: function (glyph, primitiveQuality, min, max)
		{
			var extents = glyph .extents [primitiveQuality];

			if (extents)
			{
				min .assign (extents .min);
				max .assign (extents .max);
				return;
			}

			var vertices = this .getGlyphGeometry (glyph, primitiveQuality);

			if (vertices .length)
			{
				var vertex = vertices [0];

				min .assign (vertex);
				max .assign (vertex);

				for (var i = 1, length = vertices .length; i < length; ++ i)
				{
					var vertex = vertices [i];

					min .min (vertex);
					max .max (vertex);
				}
			}
			else
			{
				min .set (0, 0, 0);
				max .set (0, 0, 0);			   
			}

			var extents = glyph .extents [primitiveQuality] = { };

			extents .min = min .copy ();
			extents .max = max .copy ();
		},
		getGlyphGeometry: function (glyph, primitiveQuality)
		{
			var
				fontStyle     = this .getFontStyle (),
				font          = fontStyle .getFont (),
				geometryCache = this .getBrowser () .getFontGeometryCache ();

			var cachedFont = geometryCache [font .fontName];

			if (! cachedFont)
				geometryCache [font .fontName] = cachedFont = [[], [], []];

			var cachedGeometry = cachedFont [primitiveQuality] [glyph .index];

			if (cachedGeometry)
				return cachedGeometry;

			cachedGeometry = cachedFont [primitiveQuality] [glyph .index] = [ ];

			this .createGlyphGeometry (glyph, cachedGeometry, primitiveQuality);

		   return cachedGeometry;
		},
		createGlyphGeometry: function (glyph, vertices, primitiveQuality)
		{
			var
				fontStyle  = this .getFontStyle (),
				font       = fontStyle .getFont (),
				components = glyph .components,
				dimension  = this .getBezierDimension (primitiveQuality),
				reverse    = font .outlinesFormat === "cff";

			paths  .length = 0;
			points .length = 0;
			curves .length = 0;
		
			if (glyph .isComposite)
			{
				for (var c = 0, cl = components .length; c < cl; ++ c)
				{
					var component = components [c];

					paths .push (font .glyphs .get (component .glyphIndex) .getPath (component .dx / font .unitsPerEm, component .dy / -font .unitsPerEm, 1));
				}
			}
			else
				paths .push (glyph .getPath (0, 0, 1));

			// Get curves for the current glyph.

			var
				x = 0,
				y = 0;

			for (var p = 0, pl = paths .length; p < pl; ++ p)
			{
				var commands = paths [p] .commands;

				for (var i = 0, cl = commands .length; i < cl; ++ i)
				{
					var command = commands [i];
										      
					switch (command .type)
					{
						case "M": // Start
						case "Z": // End
						{
							if (points .length > 2)
							{
								if (points [0] .x === points [points .length - 1] .x && points [0] .y === points [points .length - 1] .y)
									points .pop ();

								curves .push (reverse ? points .reverse () : points);
							}
								
							points = [ ];

							if (command .type === "M")
								points .push ({ x: command .x, y: -command .y });
							
							break;
						}
						case "L": // Linear
						{
							points .push ({ x: command .x, y: -command .y });
							break;
						}
						case "C": // Cubic
						{
							var
								curve = new Bezier (x, -y, command .x1, -command .y1, command .x2, -command .y2, command .x, -command .y),
								lut   = curve .getLUT (dimension);

							for (var l = 1, ll = lut .length; l < ll; ++ l)
								points .push (lut [l]);

							break;
						}
						case "Q": // Quadric
						{
							var
								curve = new Bezier (x, -y, command .x1, -command .y1, command .x, -command .y),
								lut   = curve .getLUT (dimension);

							for (var l = 1, ll = lut .length; l < ll; ++ l)
								points .push (lut [l]);
							
							break;
						}
						default:
						   continue;
					}

					x = command .x;
					y = command .y;
				}
			}

			// Determine contours and holes.

			var
				contours = [ ],
				holes    = [ ];

			switch (curves .length)
			{
			   case 0:
					break;
			   case 1:
					contours = curves;
					break;
				default:
				{
					for (var i = 0, cl = curves .length; i < cl; ++ i)
					{
						var
							curve       = curves [i],
							orientation = this .getCurveOrientation (curve);

						if (orientation < 0)
							contours .push (curve);
					   else
							holes .push (curve);
					}

					break;
				}
			}

			/*
			if (glyph .name [0] == "O")
				console .log (glyph .name, "\n",
				              "font: ", font, "\n",
				              "glyph: ", glyph, "\n",
				              "paths: ", paths, "\n",
				              "contours: ", contours, "\n",
				              "holes: ", holes);
			*/
			   
			// Determine the holes for every contour.

			contours .map (this .removeCollinearPoints);
			holes    .map (this .removeCollinearPoints);

			switch (contours .length)
			{
				case 0:
					break;
				case 1:
					contours [0] .holes = holes;
					break;
				default:
				{
					for (var c = 0, cl = contours .length; c < cl; ++ c)
						contours [c] .holes = [ ];

					for (var h = 0, hl = holes .length; h < hl; ++ h)
					{
						var hole = holes [h];

						for (var c = 0, cl = contours .length; c < cl; ++ c)
						{
							var contour = contours [c];

							// Copy contour, as isPointInPolygon will shuffle the points.
							if (this .isPointInPolygon (contour .slice (), hole [0]))
							{
								contour .holes .push (hole);
								break;
							}
						}
					}

				   break;
				}
			}

			// Triangulate contours.

			for (var i = 0, length = contours .length; i < length; ++ i)
				this .triangulate (contours [i], contours [i] .holes, vertices);
		},
		getBezierDimension: function (primitiveQuality)
		{
			switch (primitiveQuality)
			{
				case PrimitiveQuality .LOW:
					return 3;
				case PrimitiveQuality .HIGH:
					return 7;
				default:
					return 5;
			}
		},
		getCurveOrientation: function (curve)
		{
			// From Wikipedia:

			var
				minX     = Number .POSITIVE_INFINITY,
				minIndex = 0;

			for (var i = 0, length = curve .length; i < length; ++ i)
			{
				if (curve [i] .x < minX)
				{
					minX     = curve [i] .x;
					minIndex = i;
				}
			}

			var
				a = curve [(minIndex + length - 1) % length],
				b = curve [minIndex],
				c = curve [(minIndex + 2) % length];

		   return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
		},
		/*isPointInPolygon: function (polygon, point)
		{
			// earcut version
			// not always working!!!

			try
			{
				// Triangulate polygon.

				var coords = [ ];

				for (var p = 0; p < contour .length; ++ p)
					coords .push (contour [p] .x, contour [p] .y);

				var t = earcut (coords, holesIndices);

				for (var i = 0; i < t .length; i += 3)
				{
				   var  
						a = polygon [t [i]],
						b = polygon [t [i + 1]],
						c = polygon [t [i + 2]];
					
					if (Triangle2 .isPointInTriangle (a, b, c, point))
						return true;
				}

				return false;
			}
			catch (error)
			{
				//console .warn (error);
			}
		},*/
		isPointInPolygon: function (polygon, point)
		{
			// poly2tri version

			try
			{
				// Triangulate polygon.

				var
					context = new poly2tri .SweepContext (polygon),
					ts      = context .triangulate () .getTriangles ();

				for (var i = 0, length = ts .length; i < length; ++ i)
				{
					var  
						a = ts [i] .getPoint (0),
						b = ts [i] .getPoint (1),
						c = ts [i] .getPoint (2);
					
					if (Triangle2 .isPointInTriangle (a, b, c, point))
						return true;
				}

				return false;
			}
			catch (error)
			{
				//console .warn (error);
			}
		},
		removeCollinearPoints: function (polygon)
		{
			function isCollinear (a, b, c)
			{
				return Math .abs ((a.y - b.y) * (a.x - c.x) - (a.y - c.y) * (a.x - b.x)) < 1e-8;
			}

			for (var i = 0, k = 0, length = polygon .length; i < length; ++ i)
			{
				var
					i0 = (i - 1 + length) % length,
					i1 = (i + 1) % length;

				if (isCollinear (polygon [i0], polygon [i], polygon [i1]))
					continue;

				polygon [k ++] = polygon [i];
			}

		   polygon .length = k;
		},
		triangulate: function (polygon, holes, triangles)
		{
		   try
			{
				// Triangulate polygon.
				var
					context = new poly2tri .SweepContext (polygon) .addHoles (holes),
					ts      = context .triangulate () .getTriangles ();

				for (var i = 0, length = ts .length; i < length; ++ i)
				{
					triangles .push (ts [i] .getPoint (0), ts [i] .getPoint (1), ts [i] .getPoint (2));
				}
			}
			catch (error)
			{
				//console .warn (error);
				this .earcutTriangulate (polygon, holes, triangles);
			}
		},
		earcutTriangulate: function (polygon, holes, triangles)
		{
		   try
			{
				// Triangulate polygon.

				var
					coords       = [ ],
					holesIndices = [ ];

				for (var p = 0, pl = polygon .length; p < pl; ++ p)
					coords .push (polygon [p] .x, polygon [p] .y);

				for (var h = 0, hsl = holes .length; h < hsl; ++ h)
				{
					var hole = holes [h];

					for (var p = 0, hl = hole .length; p < hl; ++ p)
					{
						holesIndices .push (coords .length / 2);
						coords .push (hole [p] .x, hole [p] .y);
						polygon .push (hole [p]);
					}
				}

				var t = earcut (coords, holesIndices);

				for (var i = 0, tl = t .length; i < tl; ++ i)
					triangles .push (polygon [t [i]]);
			}
			catch (error)
			{
				//console .warn (error);
			}
		},
		display: function (context)
		{ },
		transformLine: function (line)
		{ },
		transformMatrix: function (matrix)
		{ },
	});

	return PolygonText;
});
