import X3DTextGeometry from "../Text/X3DTextGeometry.js";
import TextAlignment   from "../Text/TextAlignment.js";
import PixelTexture    from "../../Components/Texturing/PixelTexture.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Box3            from "../../../standard/Math/Geometry/Box3.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";

function ScreenText (text, fontStyle)
{
   X3DTextGeometry .call (this, text, fontStyle);

   text .setTransparent (true);

   this .textureNode     = new PixelTexture (text .getExecutionContext ());
   this .context         = document .createElement ("canvas") .getContext ("2d", { willReadFrequently: true });
   this .modelViewMatrix = new Matrix4 ();
   this .matrix          = new Matrix4 ();

   this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
   this .textureNode .setup ();
}

Object .assign (Object .setPrototypeOf (ScreenText .prototype, X3DTextGeometry .prototype),
{
   modelViewMatrix: new Matrix4 (),
   getMatrix ()
   {
      return this .matrix;
   },
   update: (() =>
   {
      const
         min = new Vector3 (),
         max = new Vector3 (1, 1, 0);

      return function ()
      {
         X3DTextGeometry .prototype .update .call (this);

         const
            fontStyle = this .getFontStyle (),
            text      = this .getText (),
            offset    = 1; // For antialiasing border on bottom and right side

         text ._textBounds .x = Math .ceil (text ._textBounds .x) + offset;
         text ._textBounds .y = Math .ceil (text ._textBounds .y) + offset;

         this .getBBox () .getExtents (min, max);

         min .x -= offset;
         min .y -= offset;

         switch (fontStyle .getMajorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
               min .x = Math .floor (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case TextAlignment .MIDDLE:
               min .x = Math .round (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case TextAlignment .END:
               max .x = Math .ceil (max .x);
               min .x = max .x - text ._textBounds .x;
               break;
         }

         switch (fontStyle .getMinorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
               max .y = Math .ceil (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case TextAlignment .MIDDLE:
               max .y = Math .round (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case TextAlignment .END:
               min .y = Math .floor (min .y);
               max .y = min .y + text ._textBounds .y;
               break;
         }

         text ._origin .x = min .x;
         text ._origin .y = max .y;

         this .getBBox () .setExtents (min, max);
      };
   })(),
   build: (() =>
   {
      const
         min = new Vector3 (),
         max = new Vector3 (1, 1, 0);

      return function ()
      {
         const
            fontStyle = this .getFontStyle (),
            font      = fontStyle .getFont ();

         if (!font)
            return;

         const
            text           = this .getText (),
            glyphs         = this .getGlyphs (),
            minorAlignment = this .getMinorAlignment (),
            translations   = this .getTranslations (),
            charSpacings   = this .getCharSpacings (),
            scales         = this .getScales (),
            size           = fontStyle .getScale (), // in pixel
            sizeUnitsPerEm = size / font .unitsPerEm,
            texCoordArray  = text .getTexCoords (),
            normalArray    = text .getNormals (),
            vertexArray    = text .getVertices (),
            canvas         = this .context .canvas,
            cx             = this .context;

         // Set texCoord.

         text .getMultiTexCoords () .push (texCoordArray);

         // Triangle one and two.

         this .getBBox () .getExtents (min, max);

         normalArray .push (0, 0, 1,
                            0, 0, 1,
                            0, 0, 1,
                            0, 0, 1,
                            0, 0, 1,
                            0, 0, 1);

         vertexArray .push (min .x, min .y, 0, 1,
                            max .x, min .y, 0, 1,
                            max .x, max .y, 0, 1,
                            min .x, min .y, 0, 1,
                            max .x, max .y, 0, 1,
                            min .x, max .y, 0, 1);

         // Generate texture.

         const
            width  = text ._textBounds .x,
            height = text ._textBounds .y;

         // Scale canvas.

         canvas .width  = Algorithm .nextPowerOfTwo (width),
         canvas .height = Algorithm .nextPowerOfTwo (height);

         const
            w = width  / canvas .width,
            h = height / canvas .height,
            y = 1 - h;

         texCoordArray .push (0, y, 0, 1,
                              w, y, 0, 1,
                              w, 1, 0, 1,
                              0, y, 0, 1,
                              w, 1, 0, 1,
                              0, 1, 0, 1);

         // Setup canvas.

         cx .fillStyle = "rgba(255,255,255,0)";
         cx .fillRect (0, 0, canvas .width, canvas .height);
         cx .fillStyle = "rgba(255,255,255,1)";

         cx .save ();
         cx .translate (0, canvas .height);
         cx .scale (1, -1);

         // Draw glyphs.

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
                     glyph = line [g],
                     x     = minorAlignment .x + translation .x + advanceWidth * scale + g * charSpacing - min .x,
                     y     = minorAlignment .y + translation .y - max .y;

                  cx .save ();
                  cx .translate (x, -y);
                  cx .scale (scale, 1);

                  this .drawGlyph (cx, font, glyph, size);

                  cx .restore ();

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
                  line        = glyphs [l],
                  numChars    = line .length,
                  firstG      = topToBottom ? 0 : numChars - 1,
                  lastG       = topToBottom ? numChars : -1,
                  stepG       = topToBottom ? 1 : -1,
                  charSpacing = charSpacings [l],
                  scale       = scales [l];

               for (let g = firstG; g !== lastG; g += stepG, ++ t)
               {
                  const translation = translations [t];

                  const
                     x = minorAlignment .x + translation .x - min .x,
                     y = minorAlignment .y + translation .y * scale - g * charSpacing - max .y;

                  cx .save ();
                  cx .translate (x, -y);
                  cx .scale (1, scale);

                  this .drawGlyph (cx, font, line [g], size);

                  cx .restore ();
               }
            }
         }

         cx .restore ();

         // Transfer texture data.

         const imageData = cx .getImageData (0, 0, canvas .width, canvas .height);

         // If the canvas is to large imageData is null.

         if (imageData)
            this .textureNode .setTextureData (canvas .width, canvas .height, true, true, new Uint8Array (imageData .data .buffer));
         else
            this .textureNode .clear ();
      };
   })(),
   drawGlyph (cx, font, glyph, size)
   {
      //console .log (glyph .name, x, y);

      // Get curves for the current glyph.

      const
         path     = glyph .getPath (0, 0, size),
         commands = path .commands;

      cx .beginPath ();

      for (let i = 0, cl = commands .length; i < cl; ++ i)
      {
         const command = commands [i];

         switch (command .type)
         {
            case "M": // Start
            {
               cx .moveTo (command .x, command .y);
               continue;
            }
            case "Z": // End
            {
               cx .closePath ();
               continue;
            }
            case "L": // Linear
            {
               cx .lineTo (command .x, command .y);
               continue;
            }
            case "Q": // Cubic
            {
               cx .quadraticCurveTo (command .x1, command .y1, command .x, command .y);
               continue;
            }
            case "C": // Bezier
            {
               cx .bezierCurveTo (command .x1, command .y1, command .x2, command .y2, command .x, command .y);
               continue;
            }
         }
      }

      if (path .fill)
         cx .fill ();

      if (path .stroke)
      {
         cx .lineWidth = path .strokeWidth;
         cx .stroke ();
      }
   },
   getGlyphExtents (font, glyph, primitiveQuality, min, max)
   {
      const unitsPerEm = font .unitsPerEm;

      min .set ((glyph .xMin || 0) / unitsPerEm, (glyph .yMin || 0) / unitsPerEm, 0);
      max .set ((glyph .xMax || 0) / unitsPerEm, (glyph .yMax || 0) / unitsPerEm, 0);
   },
   traverse: (() =>
   {
      const bbox = new Box3 ();

      return function (type, renderObject)
      {
         this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix, 1, true);

         this .modelViewMatrix
            .assign (renderObject .getModelViewMatrix () .get ())
            .multLeft (this .matrix);

         // Update Text bbox.

         bbox .assign (this .getBBox ()) .multRight (this .matrix);

         this .getText () .setBBox (bbox);
      };
   })(),
   displaySimple (gl, renderContext, shaderNode)
   {
      renderContext .modelViewMatrix .set (this .modelViewMatrix);

      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix, false, renderContext .modelViewMatrix);
   },
   display (gl, renderContext)
   {
      renderContext .modelViewMatrix .set (this .modelViewMatrix);

      renderContext .textureNode = this .textureNode;
   },
   transformLine: (() =>
   {
      const invMatrix = new Matrix4 ();

      return function (line)
      {
         // Apply screen nodes transformation in place here.
         return line .multLineMatrix (invMatrix .assign (this .matrix) .inverse ());
      };
   })(),
   transformMatrix (matrix)
   {
      // Apply screen nodes transformation in place here.
      return matrix .multLeft (this .matrix);
   },
});

export default ScreenText;
