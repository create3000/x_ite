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

import Fields        from "../../Fields.js";
import X3DNode       from "../Core/X3DNode.js";
import X3DUrlObject  from "../Networking/X3DUrlObject.js";
import TextAlignment from "../../Browser/Text/TextAlignment.js";
import X3DConstants  from "../../Base/X3DConstants.js";
import URLs          from "../../Browser/Networking/URLs.js";

/*
 * Font paths for default SERIF, SANS and TYPEWRITER families.
 */

const Fonts = new Map ([
   ["SERIF", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Droid/DroidSerif-Regular.woff2")],
      ["ITALIC",     URLs .getFontsURL ("Droid/DroidSerif-Italic.woff2")],
      ["BOLD",       URLs .getFontsURL ("Droid/DroidSerif-Bold.woff2")],
      ["BOLDITALIC", URLs .getFontsURL ("Droid/DroidSerif-BoldItalic.woff2")],
   ])],
   ["SANS", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Ubuntu/Ubuntu-R.woff2")],
      ["ITALIC",     URLs .getFontsURL ("Ubuntu/Ubuntu-RI.woff2")],
      ["BOLD",       URLs .getFontsURL ("Ubuntu/Ubuntu-B.woff2")],
      ["BOLDITALIC", URLs .getFontsURL ("Ubuntu/Ubuntu-BI.woff2")],
   ])],
   ["TYPEWRITER", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Ubuntu/UbuntuMono-R.woff2")],
      ["ITALIC",     URLs .getFontsURL ("Ubuntu/UbuntuMono-RI.woff2")],
      ["BOLD",       URLs .getFontsURL ("Ubuntu/UbuntuMono-B.woff2")],
      ["BOLDITALIC", URLs .getFontsURL ("Ubuntu/UbuntuMono-BI.woff2")],
   ])],
]);

function X3DFontStyleNode (executionContext)
{
   // To be of type X3DUrlObject ensures that it will work inside StaticGroup
   // and legacy implementation of load URLs over family field.

   X3DNode      .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .X3DFontStyleNode);

   this .addChildObjects (X3DConstants .inputOutput, "description",          new Fields .SFString (),
                          X3DConstants .inputOutput, "url",                  new Fields .MFString (),
                          X3DConstants .inputOutput, "load",                 new Fields .SFBool (true),
                          X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0),
                          X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600));

   this .alignments = [ ];
}

Object .assign (Object .setPrototypeOf (X3DFontStyleNode .prototype, X3DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DNode      .prototype .initialize .call (this);
      X3DUrlObject .prototype .initialize .call (this);

      this ._family  .addInterest ("set_url__",     this);
      this ._style   .addInterest ("set_url__",     this);
      this ._justify .addInterest ("set_justify__", this);

      // Don't call set_style__.
      this .set_justify__ ();

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_justify__ ()
   {
      const majorNormal = this ._horizontal .getValue () ? this ._leftToRight .getValue () : this ._topToBottom .getValue ();

      this .alignments [0] = this ._justify .length > 0
         ? this .getAlignment (0, majorNormal)
         : majorNormal ? TextAlignment .BEGIN : TextAlignment .END;

      const minorNormal = this ._horizontal .getValue () ? this ._topToBottom .getValue () : this ._leftToRight .getValue ();

      this .alignments [1] = this ._justify .length > 1
         ? this .getAlignment (1, minorNormal)
         : minorNormal ? TextAlignment .FIRST : TextAlignment .END;
   },
   getAllowEmptyUrl ()
   {
      return true;
   },
   getFont ()
   {
      return this .font;
   },
   getDefaultFont (fontFamily, fontStyle)
   {
      const family = Fonts .get (fontFamily);

      return family ?.get (fontStyle) ?? family ?.get ("PLAIN");
   },
   getMajorAlignment ()
   {
      return this .alignments [0];
   },
   getMinorAlignment ()
   {
      return this .alignments [1];
   },
   getAlignment (index, normal)
   {
      if (normal)
      {
         // Return for west-european normal alignment.

         switch (this ._justify [index])
         {
            case "FIRST":  return TextAlignment .FIRST;
            case "BEGIN":  return TextAlignment .BEGIN;
            case "MIDDLE": return TextAlignment .MIDDLE;
            case "END":    return TextAlignment .END;
         }
      }
      else
      {
         // Return appropriate alignment if topToBottom or leftToRight are FALSE.

         switch (this ._justify [index])
         {
            case "FIRST":  return TextAlignment .END;
            case "BEGIN":  return TextAlignment .END;
            case "MIDDLE": return TextAlignment .MIDDLE;
            case "END":    return TextAlignment .BEGIN;
         }
      }

      return index ? TextAlignment .FIRST : TextAlignment .BEGIN;
   },
   async loadData ()
   {
      // Wait for FontLibrary nodes to be setuped or changed.

      await $.sleep (0);

      // Add default font to family array.

      const
         browser          = this .getBrowser (),
         executionContext = this .getExecutionContext (),
         family           = this ._family .copy (),
         fontStyle        = this ._style .getValue ();

      family .push ("SERIF");

      this .font = null;

      for (const fontFamily of family)
      {
         // Try to get default font at first to protect these font families.

         const defaultFont = this .getDefaultFont (fontFamily, fontStyle);

         if (defaultFont)
         {
            const font = await browser .loadFont (new URL (defaultFont), true);

            if (font)
            {
               this .font = font;
               break;
            }
         }

         // Try to get font from family names.

         const font = await browser .getFont (executionContext, fontFamily, fontStyle);

         if (font)
         {
            this .font = font;
            break;
         }

         // DEPRECIATED: Try to get font by URL.

         const fileURL = new URL (fontFamily, executionContext .getBaseURL ());

         if (fileURL .protocol === "data:" || fileURL .pathname .match (/\.(?:woff2|woff|otf|ttf)$/i))
         {
            if (executionContext .getSpecificationVersion () >= 4.1)
               console .warn (`Loading a font file via family field is depreciated, please use new FontLibrary node instead.`);

            const font = await browser .loadFont (fileURL, this .getCache ());

            if (font)
            {
               this .font = font;
               break;
            }
         }
         else
         {
            console .warn (`Couldn't find font family '${fontFamily}' with style '${fontStyle}'.`);
         }
      }

      this .setLoadState (this .font ? X3DConstants .COMPLETE_STATE : X3DConstants .FAILED_STATE);
      this .addNodeEvent ();
   },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DNode      .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DFontStyleNode, X3DNode .getStaticProperties ("X3DFontStyleNode", "Text", 1));

export default X3DFontStyleNode;
