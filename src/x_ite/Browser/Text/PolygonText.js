/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import PrimitiveQuality from "../Core/PrimitiveQuality.js";
import X3DTextGeometry  from "./X3DTextGeometry.js";
import X3DGeometryNode  from "../../Components/Rendering/X3DGeometryNode.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";
import Triangle3        from "../../../standard/Math/Geometry/Triangle3.js";
import Bezier           from "../../../standard/Math/Algorithms/Bezier.js";

function PolygonText (text, fontStyle)
{
   X3DTextGeometry .call (this, text, fontStyle);

   text ._transparent = false;

   this .texCoordArray = X3DGeometryNode .createArray ();
}

PolygonText .prototype = Object .assign (Object .create (X3DTextGeometry .prototype),
{
   constructor: PolygonText,
   getTransparent: function ()
   {
      return false;
   },
   getMatrix: function ()
   {
      return Matrix4 .Identity;
   },
   build: (function ()
   {
      var
         min = new Vector3 (0, 0, 0),
         max = new Vector3 (0, 0, 0);

      return function ()
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
            spacing          = fontStyle ._spacing .getValue (),
            origin           = text ._origin .getValue (),
            sizeUnitsPerEm   = size / font .unitsPerEm,
            primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
            texCoordArray    = this .texCoordArray,
            normalArray      = text .getNormals (),
            vertexArray      = text .getVertices ();

         // Set texCoords.

         text .getMultiTexCoords () .push (texCoordArray);

         this .getBBox () .getExtents (min, max);
         text .getMin () .assign (min);
         text .getMax () .assign (max);

         if (fontStyle ._horizontal .getValue ())
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
                     glyphVertices = this .getGlyphGeometry (font, glyph, primitiveQuality),
                     xOffset       = minorAlignment .x + translation .x + advanceWidth + g * charSpacing,
                     yOffset       = minorAlignment .y + translation .y;

                  for (var v = 0, vl = glyphVertices .length; v < vl; ++ v)
                  {
                     var
                        x = glyphVertices [v] .x * size + xOffset,
                        y = glyphVertices [v] .y * size + yOffset;

                     texCoordArray .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
                     normalArray   .push (0, 0, 1);
                     vertexArray   .push (x, y, 0, 1);
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
               leftToRight = fontStyle ._leftToRight .getValue (),
               topToBottom = fontStyle ._topToBottom .getValue (),
               first       = leftToRight ? 0 : text ._string .length - 1,
               last        = leftToRight ? text ._string .length  : -1,
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
                     glyphVertices = this .getGlyphGeometry (font, line [g], primitiveQuality);

                  for (var v = 0, vl = glyphVertices .length; v < vl; ++ v)
                  {
                     var
                        x = glyphVertices [v] .x * size + minorAlignment .x + translation .x,
                        y = glyphVertices [v] .y * size + minorAlignment .y + translation .y;

                     texCoordArray .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
                     normalArray   .push (0, 0, 1);
                     vertexArray   .push (x, y, 0, 1);
                  }
               }
            }
         }
      };
   })(),
   getGlyphExtents: function (font, glyph, primitiveQuality, min, max)
   {
      var
         glyphCache = this .getBrowser () .getGlyph (font, primitiveQuality, glyph .index),
         extents    = glyphCache .extents;

      if (extents)
      {
         min .assign (extents .min);
         max .assign (extents .max);
         return;
      }

      var vertices = this .getGlyphGeometry (font, glyph, primitiveQuality);

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

      var extents = glyphCache .extents = { };

      extents .min = min .copy ();
      extents .max = max .copy ();
   },
   getGlyphGeometry: function (font, glyph, primitiveQuality)
   {
      var
         glyphCache    = this .getBrowser () .getGlyph (font, primitiveQuality, glyph .index),
         glyphGeometry = glyphCache .geometry;

      if (glyphGeometry)
         return glyphGeometry;

      glyphGeometry = glyphCache .geometry = [ ];

      this .createGlyphGeometry (glyph, glyphGeometry, primitiveQuality);

      return glyphGeometry;
   },
   createGlyphGeometry: (function ()
   {
      var
         points = [ ],
         curves = [ ],
         normal = new Vector3 (0, 0, 0);

      return function (glyph, vertices, primitiveQuality)
      {
         // Get curves for the current glyph.

         var
            dimension  = this .getBezierDimension (primitiveQuality),
            path       = glyph .getPath (0, 0, 1),
            commands   = path .commands,
            x          = 0,
            y          = 0;

         points .length = 0;
         curves .length = 0;

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
                     if (points [0] .x === points .at (-1) .x && points [0] .y === points .at (-1) .y)
                        points .pop ();

                     curves .push (points);
                  }

                  points = [ ];

                  if (command .type === "M")
                     points .push (new Vector3 (command .x, -command .y, 0));

                  break;
               }
               case "L": // Linear
               {
                  points .push (new Vector3 (command .x, -command .y, 0));
                  break;
               }
               case "Q": // Quadric
               {
                  var
                     curve = new Bezier (x, -y, command .x1, -command .y1, command .x, -command .y),
                     lut   = curve .getPoints ("quadric", dimension);

                  for (var l = 1, ll = lut .length; l < ll; ++ l)
                     points .push (new Vector3 (lut [l] .x, lut [l] .y, 0));

                  break;
               }
               case "C": // Cubic
               {
                  var
                     curve = new Bezier (x, -y, command .x1, -command .y1, command .x2, -command .y2, command .x, -command .y),
                     lut   = curve .getPoints ("cubic", dimension);

                  for (var l = 1, ll = lut .length; l < ll; ++ l)
                     points .push (new Vector3 (lut [l] .x, lut [l] .y, 0));

                  break;
               }
               default:
                  continue;
            }

            x = command .x;
            y = command .y;
         }

         // Triangulate contours.

         curves = curves .map (function (curve)
         {
            Triangle3 .getPolygonNormal (curve, normal);

            if (normal .dot (Vector3 .zAxis) > 0)
               return curve;

            return curve .reverse ();
         });

         curves .push (vertices);

         Triangle3 .triangulatePolygon .apply (Triangle3, curves);
      };
   })(),
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
   display: function (gl, renderContext)
   { },
   transformLine: function (line)
   { },
   transformMatrix: function (matrix)
   { },
});

export default PolygonText;
