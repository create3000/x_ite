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

import FontStyle from "../../Components/Text/FontStyle.js";

const
   _defaultFontStyle = Symbol (),
   _fontCache        = Symbol (),
   _glyphCache       = Symbol ();

function X3DTextContext ()
{
   this [_fontCache]  = new Map ();
   this [_glyphCache] = new Map (); // [font] [primitiveQuality] [glyphIndex]
}

Object .assign (X3DTextContext .prototype,
{
   getDefaultFontStyle ()
   {
      this [_defaultFontStyle] = new FontStyle (this .getPrivateScene ());
      this [_defaultFontStyle] .setPrivate (true);
      this [_defaultFontStyle] .setup ();

      this .getDefaultFontStyle = function () { return this [_defaultFontStyle]; };

      Object .defineProperty (this, "getDefaultFontStyle", { enumerable: false });

      return this [_defaultFontStyle];
   },
   getFont (url, cache = true)
   {
      return new Promise (async (resolve, reject) =>
      {
         url = url .toString ();

         let deferred = this [_fontCache] .get (url);

         if (!deferred)
         {
            try
            {
               this [_fontCache] .set (url, deferred = $.Deferred ());

               const response = await fetch (url, { cache: cache ? "default" : "reload" });

               if (response .ok)
               {
                  const
                     buffer = await response .arrayBuffer (),
                     font   = opentype .parse (buffer);

                  deferred .resolve (font);
               }
               else
               {
                  throw new Error (response .statusText || response .status);
               }
            }
            catch (error)
            {
               deferred .reject (error);
            }
         }

         deferred .done (resolve) .fail (reject);
      });
   },
   getGlyph (font, primitiveQuality, glyphIndex)
   {
      let cachedFont = this [_glyphCache] .get (font);

      if (!cachedFont)
         this [_glyphCache] .set (font, cachedFont = [ ]);

      let cachedQuality = cachedFont [primitiveQuality];

      if (!cachedQuality)
         cachedQuality = cachedFont [primitiveQuality] = [ ];

      let cachedGlyph = cachedQuality [glyphIndex];

      if (!cachedGlyph)
         cachedGlyph = cachedQuality [glyphIndex] = { };

      return cachedGlyph;
   },
});

export default X3DTextContext;
