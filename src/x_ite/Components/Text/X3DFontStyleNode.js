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
import FileLoader    from "../../InputOutput/FileLoader.js";
import X3DConstants  from "../../Base/X3DConstants.js";
import URLs          from "../../Browser/Networking/URLs.js";

/*
 * Font paths for default SERIF, SANS and TYPEWRITER families.
 */

const Fonts = new Map ([
   ["SERIF", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Droid/DroidSerif-Regular.ttf")],
      ["ITALIC",     URLs .getFontsURL ("Droid/DroidSerif-Italic.ttf")],
      ["BOLD",       URLs .getFontsURL ("Droid/DroidSerif-Bold.ttf")],
      ["BOLDITALIC", URLs .getFontsURL ("Droid/DroidSerif-BoldItalic.ttf")],
   ])],
   ["SANS", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Ubuntu/Ubuntu-R.ttf")],
      ["ITALIC",     URLs .getFontsURL ("Ubuntu/Ubuntu-RI.ttf")],
      ["BOLD",       URLs .getFontsURL ("Ubuntu/Ubuntu-B.ttf")],
      ["BOLDITALIC", URLs .getFontsURL ("Ubuntu/Ubuntu-BI.ttf")],
   ])],
   ["TYPEWRITER", new Map ([
      ["PLAIN",      URLs .getFontsURL ("Ubuntu/UbuntuMono-R.ttf")],
      ["ITALIC",     URLs .getFontsURL ("Ubuntu/UbuntuMono-RI.ttf")],
      ["BOLD",       URLs .getFontsURL ("Ubuntu/UbuntuMono-B.ttf")],
      ["BOLDITALIC", URLs .getFontsURL ("Ubuntu/UbuntuMono-BI.ttf")],
   ])],
]);

function X3DFontStyleNode (executionContext)
{
   X3DNode      .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .X3DFontStyleNode);

   this .familyStack = [ ];
   this .alignments  = [ ];
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

      this .font        = null;
      this .familyIndex = 0;

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
   getNumberOfURLs ()
   {
      return this ._url .length + this ._family .length;
   },
   getDefaultFont (familyName)
   {
      const family = Fonts .get (familyName);

      if (family)
         return family .get (this ._style .getValue ()) ?? family .get ("PLAIN");

      return;
   },
   loadData ()
   {
      this .familyStack .length = 0;

      // Build family stack.

      for (const fileURL of this ._url)
         this .familyStack .push (fileURL);

      for (const familyName of this ._family)
         this .familyStack .push (this .getDefaultFont (familyName) ?? familyName);

      // Add default font to family array.

      this .familyStack .push (this .getDefaultFont ("SERIF"));

      this .loadNext ();
   },
   loadNext ()
   {
      if (this .familyStack .length === 0)
      {
         this .setLoadState (X3DConstants .FAILED_STATE);
         this .font = null;
         return;
      }

      this .family = this .familyStack .shift ();
      this .URL    = new URL (this .family, this .getExecutionContext () .getBaseURL ());

      this .getBrowser () .getFont (this .URL, this .getCache ())
         .then (this .setFont .bind (this))
         .catch (this .setError .bind (this));
   },
   setError (error)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading font '${decodeURI (this .URL .href)}':`, error);

      this .loadNext ();
   },
   setFont (font)
   {
      this .font = font;

      this .setLoadState (X3DConstants .COMPLETE_STATE);
      this .addNodeEvent ();
   },
   getFont ()
   {
      return this .font;
   },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DNode      .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DFontStyleNode, X3DNode .getStaticProperties ("X3DFontStyleNode", "Text", 1));

export default X3DFontStyleNode;
