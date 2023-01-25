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
      const
         min = new Vector3 (0, 0, 0),
         max = new Vector3 (0, 0, 0);

      return function ()
      {
         const
            fontStyle = this .getFontStyle (),
            font      = fontStyle .getFont ();

         if (!font)
            return;

         const
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
            for (let l = 0, length = glyphs .length; l < length; ++ l)
            {
               const
                  line        = glyphs [l],
                  charSpacing = charSpacings [l],
                  translation = translations [l];

               let advanceWidth = 0;

               for (let g = 0, gl = line .length; g < gl; ++ g)
               {
                  const
                     glyph         = line [g],
                     glyphVertices = this .getGlyphGeometry (font, glyph, primitiveQuality),
                     xOffset       = minorAlignment .x + translation .x + advanceWidth + g * charSpacing,
                     yOffset       = minorAlignment .y + translation .y;

                  for (let v = 0, vl = glyphVertices .length; v < vl; ++ v)
                  {
                     const
                        x = glyphVertices [v] .x * size + xOffset,
                        y = glyphVertices [v] .y * size + yOffset;

                     texCoordArray .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
                     normalArray   .push (0, 0, 1);
                     vertexArray   .push (x, y, 0, 1);
                  }

                  // Calculate advanceWidth.

                  let kerning = 0;

                  if (g + 1 < line .length)
                     kerning = font .getKerningValue (glyph, line [g + 1]);

                  advanceWidth += (glyph .advanceWidth + kerning) * sizeUnitsPerEm;
               }
            }
         }
         else
         {
            const
               leftToRight = fontStyle ._leftToRight .getValue (),
               topToBottom = fontStyle ._topToBottom .getValue (),
               first       = leftToRight ? 0 : text ._string .length - 1,
               last        = leftToRight ? text ._string .length  : -1,
               step        = leftToRight ? 1 : -1;

            for (let l = first, t = 0; l !== last; l += step)
            {
               const
                  line     = glyphs [l],
                  numChars = line .length,
                  firstG   = topToBottom ? 0 : numChars - 1,
                  lastG    = topToBottom ? numChars : -1,
                  stepG    = topToBottom ? 1 : -1;

               for (let g = firstG; g !== lastG; g += stepG, ++ t)
               {
                  const
                     translation   = translations [t],
                     glyphVertices = this .getGlyphGeometry (font, line [g], primitiveQuality);

                  for (let v = 0, vl = glyphVertices .length; v < vl; ++ v)
                  {
                     const
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
      const
         glyphCache = this .getBrowser () .getGlyph (font, primitiveQuality, glyph .index),
         extents    = glyphCache .extents;

      if (extents)
      {
         min .assign (extents .min);
         max .assign (extents .max);
      }
      else
      {
         const vertices = this .getGlyphGeometry (font, glyph, primitiveQuality);

         if (vertices .length)
         {
            min .assign (vertices [0]) .min (... vertices);
            max .assign (vertices [0]) .max (... vertices);
         }
         else
         {
            min .set (0, 0, 0);
            max .set (0, 0, 0);
         }

         const extents = glyphCache .extents = { };

         extents .min = min .copy ();
         extents .max = max .copy ();
      }
   },
   getGlyphGeometry: function (font, glyph, primitiveQuality)
   {
      const
         glyphCache    = this .getBrowser () .getGlyph (font, primitiveQuality, glyph .index),
         glyphGeometry = glyphCache .geometry;

      if (glyphGeometry)
      {
         return glyphGeometry;
      }
      else
      {
         const glyphGeometry = glyphCache .geometry = [ ];

         this .createGlyphGeometry (glyph, glyphGeometry, primitiveQuality);

         return glyphGeometry;
      }
   },
   createGlyphGeometry: function (glyph, vertices, primitiveQuality)
   {
      // Get contours for the current glyph.

      const
         steps = this .getBezierSteps (primitiveQuality),
         path  = glyph .getPath (0, 0, 1);

      let
         contours = [ ],
         points   = [ ],
         x        = 0,
         y        = 0;

      for (const command of path .commands)
      {
         switch (command .type)
         {
            case "M": // Start
            case "Z": // End
            {
               // Filter consecutive identical points.
               points = points .filter ((p, i, a) => !p .equals (a [(i + 1) % a .length]));

               if (points .length > 2)
                  contours .push (points);

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
               const
                  curve = new Bezier (x, -y, command .x1, -command .y1, command .x, -command .y),
                  lut   = curve .getPoints ("quadric", steps);

               for (const p of lut)
                  points .push (new Vector3 (p .x,p .y, 0));

               break;
            }
            case "C": // Cubic
            {
               const
                  curve = new Bezier (x, -y, command .x1, -command .y1, command .x2, -command .y2, command .x, -command .y),
                  lut   = curve .getPoints ("cubic", steps);

               for (const p of lut)
                  points .push (new Vector3 (p .x, p .y, 0));

               break;
            }
            default:
               continue;
         }

         x = command .x;
         y = command .y;
      }

      return this .triangulatePolygon (contours, vertices);
   },
   getBezierSteps: function (primitiveQuality)
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
   triangulatePolygon: (function ()
   {
      // Function called for each vertex of tessellator output.

      function vertexCallback (point, triangles)
      {
         triangles .push (point);
      }

      const tessy = new libtess .GluTesselator ();

      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule .GLU_TESS_WINDING_ODD);
      tessy .gluTessNormal (0, 0, 1);

      return function (contours, triangles)
      {
         tessy .gluTessBeginPolygon (triangles);

         for (const points of contours)
         {
            tessy .gluTessBeginContour ();

            for (const point of points)
               tessy .gluTessVertex (point, point);

            tessy .gluTessEndContour ();
         }

         tessy .gluTessEndPolygon ();

         return triangles;
      };
   })(),
   display: function (gl, renderContext)
   { },
   transformLine: function (line)
   { },
   transformMatrix: function (matrix)
   { },
});

export default PolygonText;
