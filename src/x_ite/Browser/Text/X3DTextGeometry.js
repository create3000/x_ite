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

import TextAlignment from "./TextAlignment.js";
import Box2          from "../../../standard/Math/Geometry/Box2.js";
import Box3          from "../../../standard/Math/Geometry/Box3.js";
import Vector2       from "../../../standard/Math/Numbers/Vector2.js";
import Vector3       from "../../../standard/Math/Numbers/Vector3.js";
import Matrix3       from "../../../standard/Math/Numbers/Matrix3.js";

const
   bbox         = new Box2 (),
   lineBBox     = new Box2 (),
   min          = new Vector2 (),
   max          = new Vector2 (),
   glyphMin     = new Vector2 (),
   glyphMax     = new Vector2 (),
   min3         = new Vector3 (),
   max3         = new Vector3 (),
   size         = new Vector2 (),
   center       = new Vector2 (),
   size1_2      = new Vector2 (),
   translation1 = new Vector2 (),
   translation2 = new Vector2 (),
   lineBound    = new Vector2 (),
   origin       = new Vector3 (),
   box2         = new Box2 (),
   zero2        = new Vector2 (),
   zero3        = new Vector3 ();

function X3DTextGeometry (text, fontStyle)
{
   this .browser        = text .getBrowser ();
   this .text           = text;
   this .fontStyle      = fontStyle;
   this .glyphs         = [ ];
   this .minorAlignment = new Vector2 ();
   this .lineIndices    = [ ];
   this .translations   = [ ];
   this .charSpacings   = [ ];
   this .scales         = [ ];
   this .bearing        = new Vector2 ();
   this .bbox           = new Box3 ();
}

Object .assign (X3DTextGeometry .prototype,
{
   getBrowser ()
   {
      return this .browser;
   },
   getText ()
   {
      return this .text;
   },
   getFontStyle ()
   {
      return this .fontStyle;
   },
   getGlyphs ()
   {
      return this .glyphs;
   },
   getMinorAlignment ()
   {
      return this .minorAlignment;
   },
   getTranslations ()
   {
      return this .translations;
   },
   getCharSpacings ()
   {
      return this .charSpacings;
   },
   getScales ()
   {
      return this .scales;
   },
   getBearing ()
   {
      return this .bearing;
   },
   getBBox ()
   {
      return this .bbox;
   },
   update ()
   {
      const
         text      = this .text,
         fontStyle = this .fontStyle,
         numLines  = text ._string .length;

      text ._lineBounds .length = numLines;
      this .glyphs      .length = 0;

      if (numLines === 0 || !fontStyle .getFont ())
      {
         text ._origin     .setValue (zero3);
         text ._textBounds .setValue (zero2);

         this .bbox .set ();
         return;
      }

      if (fontStyle ._horizontal .getValue ())
      {
         this .resizeArray (this .translations, numLines);

         this .lineIndices  .length = 0;
         this .charSpacings .length = numLines;
         this .scales       .length = numLines;

         this .horizontal (text, fontStyle);
      }
      else
      {
         const
            string   = text ._string,
            numChars = string .reduce ((p, c) => p + c .length, 0);

         this .resizeArray (this .translations, numChars);

         this .lineIndices  .length = numChars;
         this .charSpacings .length = numLines;
         this .scales       .length = numLines;

         this .vertical (text, fontStyle);
      }
   },
   resizeArray (array, size)
   {
      // Resize array in grow only fashion.

      for (var i = array .length; i < size; ++ i)
         array .push (new Vector2 ());

      array .length = size;
   },
   horizontal (text, fontStyle)
   {
      const
         font            = fontStyle .getFont (),
         string          = text ._string,
         numLines        = string .length,
         maxExtent       = Math .max (0, text ._maxExtent .getValue ()),
         topToBottom     = fontStyle ._topToBottom .getValue (),
         scale           = fontStyle .getScale (),
         spacing         = fontStyle ._spacing .getValue (),
         textCompression = this .getBrowser () .getBrowserOptions () .getTextCompression ();

      bbox .set ();

      // Calculate bboxes.

      const
         first = topToBottom ? 0 : numLines - 1,
         last  = topToBottom ? numLines : -1,
         step  = topToBottom ? 1 : -1;

      for (let l = first, ll = 0; l !== last; l += step, ++ ll)
      {
         const line = string [l];

         // Get line extents.

         const glyphs = this .getHorizontalLineExtents (fontStyle, line, min, max, ll);

         size .assign (max) .subtract (min);

         // Calculate charSpacing and lineBounds.

         const
            length = text .getLength (l),
            w      = size .x * scale;

         let charSpacing = 0;

         lineBound .set (w, ll == 0 ? max .y - font .descender / font .unitsPerEm * scale : spacing);

         if (length)
         {
            if (textCompression === 0 && glyphs .length > 1)
               charSpacing = (length - lineBound .x) / (glyphs .length - 1);

            lineBound .x = length;
            size .x      = length / scale;
         }

         this .charSpacings [ll] = charSpacing;
         this .scales [ll]       = textCompression === 1 ? lineBound .x / w : 1;
         text ._lineBounds [l]   = lineBound;

         // Calculate line translation.

         switch (fontStyle .getMajorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
               this .translations [ll] .set (0, -ll * spacing);
               break;
            case TextAlignment .MIDDLE:
               this .translations [ll] .set (-min .x - size .x / 2, -ll * spacing);
               break;
            case TextAlignment .END:
               this .translations [ll] .set (-min .x - size .x, -ll * spacing);
               break;
         }

         this .translations [ll] .multiply (scale);

         // Calculate center.

         center .assign (min) .add (size1_2 .assign (size) .divide (2));

         // Add bbox.

         bbox .add (box2 .set (size .multiply (scale), center .multiply (scale) .add (this .translations [ll])));
      }

      if (maxExtent)
      {
         const extent = text ._lineBounds .reduce ((p, c) => Math .max (p, c .x), 0);

         if (extent > maxExtent)
         {
            const s = maxExtent / extent;

            switch (textCompression)
            {
               case 0:
               {
                  for (const i of this .charSpacings .keys ())
                  {
                     if (text ._string [i] .length < 2)
                        continue;

                     this .charSpacings [i] -= (text ._lineBounds [i] .x - text ._lineBounds [i] .x * s)
                        / (text ._string [i] .length - 1);
                  }

                  break;
               }
               case 1:
               {
                  for (const i of this .scales .keys ())
                     this .scales [i] *= s;

                  break;
               }
            }

            for (const i of this .translations .keys ())
               this .translations [i] .x *= s;

            for (const i of text ._lineBounds .keys ())
               text ._lineBounds [i] .x *= s;

            bbox .multRight (new Matrix3 (s,0,0, 0,1,0, 0,0,0));
         }
      }

      //console .log ("size", bbox .size, "center", bbox .center);

      // Get text extents.

      bbox .getExtents (min, max);

      size .assign (max) .subtract (min);

      // Calculate text position

      text ._textBounds = size;
      this .bearing .set (0, -max .y);

      switch (fontStyle .getMinorAlignment ())
      {
         case TextAlignment .BEGIN:
            this .minorAlignment .assign (this .bearing);
            break;
         case TextAlignment .FIRST:
            this .minorAlignment .set (0, 0);
            break;
         case TextAlignment .MIDDLE:
            this .minorAlignment .set (0, size .y / 2 - max .y);
            break;
         case TextAlignment .END:
            this .minorAlignment .set (0, (numLines - 1) * spacing * scale);
            break;
      }

      // Translate bbox by minorAlignment.

      min .add (this .minorAlignment);
      max .add (this .minorAlignment);

      // The value of the origin field represents the upper left corner of the textBounds.

      text ._origin .setValue (origin .set (min .x, max .y, 0));

      this .bbox .setExtents (min3 .set (min .x, min .y, 0),
                              max3 .set (max .x, max .y, 0));
   },
   vertical (text, fontStyle)
   {
      const
         font             = fontStyle .getFont (),
         string           = text ._string,
         numLines         = string .length,
         maxExtent        = Math .max (0, text ._maxExtent .getValue ()),
         leftToRight      = fontStyle ._leftToRight .getValue (),
         topToBottom      = fontStyle ._topToBottom .getValue (),
         scale            = fontStyle .getScale (),
         spacing          = fontStyle ._spacing .getValue (),
<<<<<<< HEAD
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality ();
=======
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
         textCompression  = this .getBrowser () .getBrowserOptions () .getTextCompression ();
>>>>>>> text-length

      bbox .set ();

      // Calculate bboxes.

      const
         firstL = leftToRight ? 0 : numLines - 1,
         lastL  = leftToRight ? numLines : -1,
         stepL  = leftToRight ? 1 : -1;

      let t = 0; // Translation index

      for (let l = firstL; l !== lastL; l += stepL)
      {
         const glyphs = this .stringToGlyphs (font, string [l], true, l);

         const
            t0       = t,
            numChars = glyphs .length;

         // Calculate line bbox

         lineBBox .set ();

         const
            firstG = topToBottom ? 0 : numChars - 1,
            lastG  = topToBottom ? numChars : -1,
            stepG  = topToBottom ? 1 : -1;

         for (let g = firstG; g !== lastG; g += stepG, ++ t)
         {
            const glyph = glyphs [g];

            // Get glyph extents.

            this .getGlyphExtents (font, glyph, primitiveQuality, min, max);

            size .assign (max) .subtract (min);

            // Calculate glyph translation

            const glyphNumber = topToBottom ? g : numChars - g - 1;

            this .lineIndices [t] = l;
            this .translations [t] .set ((spacing - size .x - min .x) / 2, -glyphNumber);

            // Calculate center.

            center .assign (min) .add (size1_2 .assign (size) .divide (2)) .add (this .translations [t]);

            // Add bbox.

            lineBBox .add (box2 .set (size, center));
         }

         // Get line extents.

         lineBBox .getExtents (min, max);

         size .assign (max) .subtract (min);

         // Calculate charSpacing and lineBounds.

         const
            lineNumber = leftToRight ? l : numLines - l - 1,
            padding    = (spacing - size .x) / 2,
            length     = text .getLength (l);

         let charSpacing = 0;

         lineBound .set (l === 0 ? spacing - padding : spacing, numChars ? size .y : 0) .multiply (scale);

         const h = lineBound .y;

         if (length)
         {
            if (textCompression === 0 && glyphs .length > 1)
               charSpacing = (length - lineBound .y) / (glyphs .length - 1);

            lineBound .y = length;
            size .y      = length / scale;
            min .y       = max .y - size .y;
         }

         this .charSpacings [l] = charSpacing;
         this .scales [l]       = textCompression === 1 ? lineBound .y / h : 1;
         text ._lineBounds [l]  = lineBound;

         // Calculate line translation.

         switch (fontStyle .getMajorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
<<<<<<< HEAD
               translation .set (lineNumber * spacing, -max .y);
=======
               translation2 .assign (translation1 .set (lineNumber * spacing, -max .y));
>>>>>>> text-length
               break;
            case TextAlignment .MIDDLE:
               translation2 .assign (translation1 .set (lineNumber * spacing, (size .y / 2 - max .y)));
               break;
            case TextAlignment .END:
            {
               translation1 .set (lineNumber * spacing, (size .y / this .scales [l] - max .y));
               translation2 .set (lineNumber * spacing, (size .y - max .y));
               break;
            }
         }

         // Calculate glyph translation

<<<<<<< HEAD
         var space = 0;

         for (var tt = t0; tt < t; ++ tt)
         {
            this .translations [tt] .add (translation);

            this .translations [tt] .y -= space;

            this .translations [tt] .multiply (scale);

            space += charSpacing;
         }
=======
         for (let tt = t0; tt < t; ++ tt)
            this .translations [tt] .add (translation1) .multiply (scale);
>>>>>>> text-length

         // Calculate center.

         center .assign (min) .add (size1_2 .assign (size) .divide (2));

         // Add bbox.

         bbox .add (box2 .set (size .multiply (scale), center .add (translation2) .multiply (scale)));
      }

      if (maxExtent)
      {
         const extent = text ._lineBounds .reduce ((p, c) => Math .max (p, c .y), 0);

         if (extent > maxExtent)
         {
            const s = maxExtent / extent;

            switch (textCompression)
            {
               case 0:
               {
                  for (const i of this .charSpacings .keys ())
                  {
                     if (text ._string [i] .length < 2)
                        continue;

                     this .charSpacings [i] -= (text ._lineBounds [i] .y - text ._lineBounds [i] .y * s)
                        / (text ._string [i] .length - 1);
                  }

                  switch (fontStyle .getMajorAlignment ())
                  {
                     case TextAlignment .MIDDLE:
                     {
                        for (const t of this .translations .keys ())
                        {
                           const l = this .lineIndices [t];

                           this .translations [t] .y -= (text ._lineBounds [l] .y - text ._lineBounds [l] .y * s) / 2;
                        }

                        break;
                     }
                     case TextAlignment .END:
                     {
                        for (const t of this .translations .keys ())
                        {
                           const l = this .lineIndices [t];

                           this .translations [t] .y -= (text ._lineBounds [l] .y - text ._lineBounds [l] .y * s);
                        }

                        break;
                     }
                  }

                  break;
               }
               case 1:
               {
                  for (const i of this .scales .keys ())
                     this .scales [i] *= s;

                  break;
               }
            }

            for (const i of text ._lineBounds .keys ())
               text ._lineBounds [i] .y *= s;

            bbox .multRight (new Matrix3 (1,0,0, 0,s,0, 0,0,0));
         }
      }

      // Get text extents.

      bbox .getExtents (min, max);

      size .assign (max) .subtract (min);

      // Calculate text position

      text ._textBounds = size;

      switch (fontStyle .getMajorAlignment ())
      {
         case TextAlignment .BEGIN:
         case TextAlignment .FIRST:
            this .bearing .set (-min .x, max .y);
            break;
         case TextAlignment .MIDDLE:
            this .bearing .set (-min .x, 0);
            break;
         case TextAlignment .END:
            this .bearing .set (-min .x, min .y);
            break;
      }

      switch (fontStyle .getMinorAlignment ())
      {
         case TextAlignment .BEGIN:
         case TextAlignment .FIRST:
            this .minorAlignment .set (-min .x, 0);
            break;
         case TextAlignment .MIDDLE:
            this .minorAlignment .set (-min .x - size .x / 2, 0);
            break;
         case TextAlignment .END:
            this .minorAlignment .set (-min .x - size .x, 0);
            break;
      }

      // Translate bbox by minorAlignment.

      min .add (this .minorAlignment);
      max .add (this .minorAlignment);

      // The value of the origin field represents the upper left corner of the textBounds.

      text ._origin .setValue (origin .set (min .x, max .y, 0));

      this .bbox .setExtents (min3 .set (min .x, min .y, 0),
                              max3 .set (max .x, max .y, 0));
   },
   stringToGlyphs (font, line, normal, lineNumber)
   {
      const glyphs = this .glyphs [lineNumber]
         ?? (this .glyphs [lineNumber] = [ ]);

      glyphs .length = line .length;

      const
         first = normal ? 0 : line .length - 1,
         last  = normal ? line .length : -1,
         step  = normal ? 1 : -1;

      for (let c = first, g = 0; c !== last; c += step, ++ g)
         glyphs [g] = font .charToGlyph (line [c]);

      return glyphs;
   },
   getHorizontalLineExtents (fontStyle, line, min, max, lineNumber)
   {
      const
         font             = fontStyle .getFont (),
         normal           = fontStyle ._horizontal .getValue () ? fontStyle ._leftToRight .getValue () : fontStyle ._topToBottom .getValue (),
         glyphs           = this .stringToGlyphs (font, line, normal, lineNumber),
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality ();

      let
         xMin = 0,
         xMax = 0,
         yMin = Number .POSITIVE_INFINITY,
         yMax = Number .NEGATIVE_INFINITY;

      for (const g of glyphs .keys ())
      {
         const
            glyph   = glyphs [g],
            kerning = g + 1 < length ? font .getKerningValue (glyph, glyphs [g + 1]) : 0;

         this .getGlyphExtents (font, glyph, primitiveQuality, glyphMin, glyphMax);

         xMax += glyph .advanceWidth + kerning;
         yMin  = Math .min (yMin, glyphMin .y);
         yMax  = Math .max (yMax, glyphMax .y);
      }

      if (glyphs .length)
      {
         this .getGlyphExtents (font, glyphs [0], primitiveQuality, glyphMin, glyphMax);

         xMin = glyphMin .x;
      }
      else
      {
         yMin = 0;
         yMax = 0;
      }

      min .set (xMin, yMin);
      max .set (xMax / font .unitsPerEm, yMax);

      switch (fontStyle .getMajorAlignment ())
      {
         case TextAlignment .BEGIN:
         case TextAlignment .FIRST:
            min .x = 0;
            break;
      }

      return glyphs;
   },
   traverse (type, renderObject)
   { },
});

export default X3DTextGeometry;
