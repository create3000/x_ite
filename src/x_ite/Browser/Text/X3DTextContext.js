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

import FontStyle     from "../../Components/Text/FontStyle.js";
import URLs          from "../Networking/URLs.js";
import * as OpenType from "../../../lib/opentype/opentype.mjs";
import DEVELOPMENT   from "../../DEVELOPMENT.js";

const
   _defaultFontStyle = Symbol (),
   _fontCache        = Symbol (),
   _loadingFonts     = Symbol (),
   _families         = Symbol (),
   _library          = Symbol (),
   _wawoff2          = Symbol ();

function X3DTextContext ()
{
   this [_loadingFonts] = new Set ();
   this [_fontCache]    = new Map ();
   this [_families]     = new WeakMap ();
   this [_library]      = new WeakMap ();
}

Object .assign (X3DTextContext .prototype,
{
   getDefaultFontStyle ()
   {
      return this [_defaultFontStyle] ??= (() =>
      {
         const defaultFontStyle = new FontStyle (this .getPrivateScene ());

         defaultFontStyle .setPrivate (true);
         defaultFontStyle .setup ();

         return defaultFontStyle;
      })();
   },
   /**
    *
    * @param {URL} fileURL
    * @param {boolean} cache
    * @returns Promise<OpenType.Font>
    */
   loadFont (fileURL, cache = true)
   {
      let promise = cache ? this [_fontCache] .get (fileURL .href) : null;

      if (!promise)
      {
         promise = new Promise (async (resolve, reject) =>
         {
            try
            {
               const response = await fetch (fileURL, { cache: cache ? "default" : "reload" });

               if (!response .ok)
                  throw new Error (response .statusText || response .status);

               const
                  arrayBuffer  = await response .arrayBuffer (),
                  decompressed = await this .decompressFont (arrayBuffer),
                  font         = OpenType .parse (decompressed);

               if (DEVELOPMENT)
               {
                  if (fileURL .protocol !== "data:")
                     console .info (`Done loading font '${decodeURI (fileURL)}'.`);
               }

               resolve (font);
            }
            catch (error)
            {
               if (fileURL .protocol !== "data:")
                  console .warn (`Error loading font '${decodeURI (fileURL)}':`, error);

               resolve (null);
            }
            finally
            {
               this [_loadingFonts] .delete (promise);
            }
         });

         this [_loadingFonts] .add (promise);

         if (!fileURL .search)
            this [_fontCache] .set (fileURL .href, promise);
      }

      return promise;
   },
   registerFont (executionContext, font)
   {
      const
         scene    = executionContext .getLocalScene (),
         families = this [_families] .get (scene) ?? new Map ();

      this [_families] .set (scene, families);

      // fontFamily - fontStyle

      const fontFamilies = new Map (Object .values (font .names)
         .flatMap (name => Object .values (name .fontFamily ?? { }) .map (fontFamily => [fontFamily, name])));

      for (const [fontFamily, name] of fontFamilies)
      {
         const fontStyles = families .get (fontFamily .toUpperCase ()) ?? new Map ();

         families .set (fontFamily .toUpperCase (), fontStyles);

         for (const fontStyle of new Set (Object .values (name .fontSubfamily ?? { })))
         {
            if (this .getBrowserOption ("Debug"))
               console .info (`Registering font family ${fontFamily} - ${fontStyle}.`);

            fontStyles .set (fontStyle .toUpperCase () .replaceAll (" ", ""), font);
         }
      }

      // console .log (name .preferredFamily);
      // console .log (name .preferredSubfamily);
   },
   registerFontLibrary (executionContext, fontFamily, font)
   {
      const
         scene   = executionContext .getLocalScene (),
         library = this [_library] .get (scene) ?? new Map ();

      this [_library] .set (scene, library);

      // if (this .getBrowserOption ("Debug"))
      //    console .info (`Registering font named ${fontFamily}.`);

      library .set (fontFamily .toUpperCase (), font);
   },
   async getFont (executionContext, fontFamily, fontStyle)
   {
      try
      {
         fontFamily = fontFamily .toUpperCase ();
         fontStyle  = fontStyle .toUpperCase () .replaceAll (" ", "");

         const scene = executionContext .getLocalScene ();

         for (;;)
         {
            const
               library  = this [_library]  .get (scene),
               families = this [_families] .get (scene);

            const font = library ?.get (fontFamily)
               ?? families ?.get (fontFamily) ?.get (fontStyle);

            if (font)
               return font;

            await Promise .any (this [_loadingFonts]);
         }
      }
      catch
      {
         return null;
      }
   },
   async decompressFont (arrayBuffer)
   {
      if (this .isWoff2 (arrayBuffer))
      {
         const decompress = await this .getWoff2Decompressor ();

         return decompress (arrayBuffer);
      }

      return arrayBuffer;
   },
   isWoff2 (arrayBuffer)
   {
      if (arrayBuffer .byteLength < 4)
         return false;

      const
         dataView = new DataView (arrayBuffer),
         magic    = dataView .getUint32 (0, false);

      return magic === 0x774F4632; // 'wOF2'
   },
   async getWoff2Decompressor ()
   {
      return this [_wawoff2] ??= await this .loadWoff2Decompressor ();
   },
   async loadWoff2Decompressor ()
   {
      // https://www.npmjs.com/package/wawoff2

      const
         fileURL  = URLs .getLibraryURL ("decompress_binding.js"),
         response = await fetch (fileURL);

      if (!response .ok)
         throw new Error (response .statusText || response .status);

      const
         text    = await response .text (),
         wawoff2 = (new Function (text)) ();

      await new Promise (resolve => wawoff2 .onRuntimeInitialized = resolve);

      return arrayBuffer => wawoff2 .decompress (arrayBuffer);
   },
});

export default X3DTextContext;
