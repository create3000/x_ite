import PrimitiveQuality from "../Core/PrimitiveQuality.js";
import X3DTextGeometry  from "./X3DTextGeometry.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";
import Bezier           from "../../../standard/Math/Algorithms/Bezier.js";
import libtess          from "../../../lib/libtess.js";

const _glyphCache = Symbol ();

function PolygonText (text, fontStyle)
{
   X3DTextGeometry .call (this, text, fontStyle);

   text .setTransparent (false);
}

Object .assign (Object .setPrototypeOf (PolygonText .prototype, X3DTextGeometry .prototype),
{
   getMatrix ()
   {
      return Matrix4 .Identity;
   },
   build: (() =>
   {
      const
         min = new Vector3 (),
         max = new Vector3 ();

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
            scales           = this .getScales (),
            size             = fontStyle .getScale (),
            spacing          = fontStyle ._spacing .getValue (),
            origin           = text ._origin .getValue (),
            sizeUnitsPerEm   = size / font .unitsPerEm,
            primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
            texCoordArray    = text .getTexCoords (),
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
                  translation = translations [l],
                  charSpacing = charSpacings [l],
                  scale       = scales [l];

               let advanceWidth = 0;

               for (let g = 0, gl = line .length; g < gl; ++ g)
               {
                  const
                     glyph         = line [g],
                     glyphVertices = this .getGlyphGeometry (font, glyph, primitiveQuality),
                     xOffset       = minorAlignment .x + translation .x + advanceWidth * scale + g * charSpacing,
                     yOffset       = minorAlignment .y + translation .y;

                  for (const { x: glyphX, y: glyphY } of glyphVertices)
                  {
                     const
                        x = glyphX * size * scale + xOffset,
                        y = glyphY * size + yOffset;

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
               last        = leftToRight ? text ._string .length : -1,
               step        = leftToRight ? 1 : -1;

            for (let l = first, t = 0; l !== last; l += step)
            {
               const
                  line        = glyphs [l],
                  numChars    = line .length,
                  firstG      = topToBottom ? 0 : numChars - 1,
                  lastG       = topToBottom ? numChars : -1,
                  stepG       = topToBottom ? 1 : -1,
                  charSpacing = charSpacings [l],
                  scale       = scales [l];

               for (let g = firstG; g !== lastG; g += stepG, ++ t)
               {
                  const
                     translation   = translations [t],
                     glyphVertices = this .getGlyphGeometry (font, line [g], primitiveQuality);

                  for (const { x: glyphX, y: glyphY } of glyphVertices)
                  {
                     const
                        x = glyphX * size + minorAlignment .x + translation .x,
                        y = glyphY * size * scale + minorAlignment .y + translation .y * scale - g * charSpacing;

                     texCoordArray .push ((x - origin .x) / spacing, (y - origin .y) / spacing, 0, 1);
                     normalArray   .push (0, 0, 1);
                     vertexArray   .push (x, y, 0, 1);
                  }
               }
            }
         }
      };
   })(),
   getGlyph (font, primitiveQuality, glyphIndex)
   {
      const
         cachedFont    = font [_glyphCache] ??= [ ],
         cachedQuality = cachedFont [primitiveQuality] ??= [ ],
         cachedGlyph   = cachedQuality [glyphIndex] ??= { };

      return cachedGlyph;
   },
   getGlyphExtents (font, glyph, primitiveQuality, min, max)
   {
      const
         glyphCache = this .getGlyph (font, primitiveQuality, glyph .index),
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
            min .set (0);
            max .set (0);
         }

         const extents = glyphCache .extents = { };

         extents .min = min .copy ();
         extents .max = max .copy ();
      }
   },
   getGlyphGeometry (font, glyph, primitiveQuality)
   {
      const glyphCache = this .getGlyph (font, primitiveQuality, glyph .index);

      return glyphCache .geometry ??= this .createGlyphGeometry (glyph, primitiveQuality);
   },
   createGlyphGeometry (glyph, primitiveQuality)
   {
      // Get contours for the current glyph.

      const
         steps    = this .getBezierSteps (primitiveQuality),
         path     = glyph .getPath (0, 0, 1),
         contours = [ ],
         vertices = [ ];

      let
         points = [ ],
         x      = 0,
         y      = 0;

      // Fix add missing Z command, to make sure the last contour is added.
      path .commands .push ({ type: "Z" });

      for (const { type, x1, y1, x2, y2, x: cx, y: cy } of path .commands)
      {
         switch (type)
         {
            case "M": // Start
            case "Z": // End
            {
               if (points .length > 2)
                  contours .push (points);

               points = [ ];

               if (type === "M")
                  points .push (new Vector3 (cx, -cy, 0));

               break;
            }
            case "L": // Linear
            {
               points .push (new Vector3 (cx, -cy, 0));
               break;
            }
            case "Q": // Quadric
            {
               Bezier .quadric (x, -y, 0, x1, -y1, 0, cx, -cy, 0, steps, points);
               break;
            }
            case "C": // Cubic
            {
               Bezier .cubic (x, -y, 0, x1, -y1, 0, x2, -y2, 0, cx, -cy, 0, steps, points);
               break;
            }
            default:
               continue;
         }

         x = cx;
         y = cy;
      }

      return this .triangulatePolygon (contours, vertices);
   },
   getBezierSteps (primitiveQuality)
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
   triangulatePolygon: (() =>
   {
      // Function called for each vertex of tessellator output.

      function vertexCallback (point, triangles)
      {
         triangles .push (point);
      }

      function combineCallback (coords, data, weight)
      {
         return new Vector3 (... coords);
      }

      const tessy = new libtess .GluTesselator ();

      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE,      combineCallback);
      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule .GLU_TESS_WINDING_NONZERO);
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
   displaySimple (gl, renderContext)
   { },
   display (gl, renderContext)
   { },
   transformLine (line)
   { },
   transformMatrix (matrix)
   { },
});

export default PolygonText;
