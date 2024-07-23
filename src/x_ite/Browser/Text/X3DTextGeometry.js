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
   bbox        = new Box2 (),
   lineBBox    = new Box2 (),
   min         = new Vector2 (),
   max         = new Vector2 (),
   glyphMin    = new Vector2 (),
   glyphMax    = new Vector2 (),
   min3        = new Vector3 (),
   max3        = new Vector3 (),
   size        = new Vector2 (),
   center      = new Vector2 (),
   size1_2     = new Vector2 (),
   translation = new Vector2 (),
   lineBound   = new Vector2 (),
   origin      = new Vector3 (),
   vector      = new Vector2 (),
   box2        = new Box2 (),
   zero2       = new Vector2 (),
   zero3       = new Vector3 ();

function X3DTextGeometry (text, fontStyle)
{
   this .browser        = text .getBrowser ();
   this .text           = text;
   this .fontStyle      = fontStyle;
   this .glyphs         = [ ];
   this .minorAlignment = new Vector2 ();
   this .translations   = [ ];
   this .scales         = [ ];
   this .bearing        = new Vector2 ();
   this .yPad           = [ ];
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

      if (numLines === 0 || ! fontStyle .getFont ())
      {
         text ._origin     .setValue (zero3);
         text ._textBounds .setValue (zero2);

         this .bbox .set ();
         return;
      }

      if (fontStyle ._horizontal .getValue ())
      {
         this .resizeArray (this .translations, numLines);
         this .resizeArray (this .scales,       numLines);

         this .horizontal (text, fontStyle);
      }
      else
      {
         const string = text ._string;

         let numChars = 0;

         for (var i = 0, length = string .length; i < length; ++ i)
            numChars += string [i] .length;

         this .resizeArray (this .translations, numChars);
         this .resizeArray (this .scales,       numLines);

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
         font        = fontStyle .getFont (),
         string      = text ._string,
         numLines    = string .length,
         maxExtent   = Math .max (0, text ._maxExtent .getValue ()),
         topToBottom = fontStyle ._topToBottom .getValue (),
         scale       = fontStyle .getScale (),
         spacing     = fontStyle ._spacing .getValue ();

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

         this .getHorizontalLineExtents (fontStyle, line, min, max, ll);

         size .assign (max) .subtract (min);

         // Calculate and lineBounds.

         const
            length = text .getLength (l),
            w      = size .x * scale;

         lineBound .set (w, ll == 0 ? max .y - font .descender / font .unitsPerEm * scale : spacing);

         if (length)
         {
            lineBound .x = length;
            size .x      = length / scale;
         }

         this .scales [ll]     = lineBound .x / w;
         text ._lineBounds [l] = lineBound;

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

            for (const i of this .translations .keys ())
               this .translations [i] .x *= s;

            for (const i of this .scales .keys ())
               this .scales [i] *= s;

            for (const i of text ._lineBounds .keys ())
               text ._lineBounds [i] .x *= s;

            bbox .multRight (new Matrix3 (s,0,0, 0,1,0, 0,0,0));
         }
      }

      // console .log ("size", bbox .size, "center", bbox .center);

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
         yPad             = this .yPad,
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality ();

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

            var glyphNumber = topToBottom ? g : numChars - g - 1;

            this .translations [t] .set ((spacing - size .x - min .x) / 2, -glyphNumber);

            // Calculate center.

            center .assign (min) .add (size1_2 .assign (size) .divide (2)) .add (this .translations [t]);

            // Add bbox.

            lineBBox .add (box2 .set (size, center));
         }

         // Get line extents.

         lineBBox .getExtents (min, max);

         size .assign (max) .subtract (min);

         // Calculate lineBounds.

         const
            lineNumber = leftToRight ? l : numLines - l - 1,
            padding    = (spacing - size .x) / 2,
            length     = text .getLength (l);

         lineBound .set (l === 0 ? spacing - padding: spacing, numChars ? size .y : 0) .multiply (scale);

         const h = lineBound .y;

         if (length)
         {
            lineBound .y = length;
            size .y      = length / scale;
            min .y       = max .y - size .y;
         }

         this .scales [l]      = lineBound .y / h;
         text ._lineBounds [l] = lineBound;

         // Calculate line translation.

         switch (fontStyle .getMajorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
               translation .set (lineNumber * spacing, -max .y);
               break;
            case TextAlignment .MIDDLE:
               translation .set (lineNumber * spacing, (size .y / 2 - max .y));
               break;
            case TextAlignment .END:
            {
               // This is needed to make maxExtend work.
               if (numChars)
                  this .getGlyphExtents (font, glyphs [topToBottom ? numChars - 1 : 0], primitiveQuality, glyphMin .assign (Vector2 .Zero), vector);

               translation .set (lineNumber * spacing, (size .y / this .scales [l] - max .y + glyphMin .y));
               break;
            }
         }

         // Calculate glyph translation

         for (let tt = t0; tt < t; ++ tt)
            this .translations [tt] .add (translation) .multiply (scale);

         // Calculate ypad to extend line bounds.

         switch (fontStyle .getMajorAlignment ())
         {
            case TextAlignment .BEGIN:
            case TextAlignment .FIRST:
               yPad [l] = max .y + translation .y;
               break;
            case TextAlignment .MIDDLE:
               yPad [l] = 0;
               break;
            case TextAlignment .END:
               yPad [l] = min .y + translation .y;
               break;
         }

         // Calculate center.

         center .assign (min) .add (size1_2 .assign (size) .divide (2));

         // Add bbox.

         bbox .add (box2 .set (size .multiply (scale), center .add (translation) .multiply (scale)));
      }

      if (maxExtent)
      {
         const extent = text ._lineBounds .reduce ((p, c) => Math .max (p, c .y), 0);

         if (extent > maxExtent)
         {
            const s = maxExtent / extent;

            for (const i of this .scales .keys ())
               this .scales [i] *= s;

            for (const i of text ._lineBounds .keys ())
               text ._lineBounds [i] .y *= s;

            bbox .multRight (new Matrix3 (1,0,0, 0,s,0, 0,0,0));
         }
      }

      // Get text extents.

      bbox .getExtents (min, max);

      size .assign (max) .subtract (min);

      // Extend lineBounds.

      switch (fontStyle .getMajorAlignment ())
      {
         case TextAlignment .BEGIN:
         case TextAlignment .FIRST:
         {
            const lineBounds = text ._lineBounds;

            for (var i = 0, length = lineBounds .length; i < length; ++ i)
               lineBounds [i] .y += max .y - yPad [i] * scale;

            break;
         }
         case TextAlignment .MIDDLE:
            break;
         case TextAlignment .END:
         {
            const lineBounds = text ._lineBounds;

            for (var i = 0, length = lineBounds .length; i < length; ++ i)
               lineBounds [i] .y += yPad [i] * scale - min .y;

            break;
         }
      }

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
      var glypes = this .glyphs [lineNumber];

      if (! glypes)
         glypes = this .glyphs [lineNumber] = [ ];

      glypes .length = line .length;

      var
         first = normal ? 0 : line .length - 1,
         last  = normal ? line .length : -1,
         step  = normal ? 1 : -1;

      for (var c = first, g = 0; c !== last; c += step, ++ g)
         glypes [g] = font .charToGlyph (line [c]);

      return glypes;
   },
   getHorizontalLineExtents (fontStyle, line, min, max, lineNumber)
   {
      var
         font             = fontStyle .getFont (),
         normal           = fontStyle ._horizontal .getValue () ? fontStyle ._leftToRight .getValue () : fontStyle ._topToBottom .getValue (),
         glyphs           = this .stringToGlyphs (font, line, normal, lineNumber),
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
         xMin             = 0,
         xMax             = 0,
         yMin             = Number .POSITIVE_INFINITY,
         yMax             = Number .NEGATIVE_INFINITY;

      for (var g = 0, length = glyphs .length; g < length; ++ g)
      {
         var
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

         xMin  = glyphMin .x;
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
