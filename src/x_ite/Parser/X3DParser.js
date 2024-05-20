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

import X3DProtoDeclaration from "../Prototype/X3DProtoDeclaration.js";

function X3DParser (scene)
{
   this .scene             = scene;
   this .executionContexts = [ scene ];
   this .prototypes        = [ ];
}

Object .assign (X3DParser .prototype,
{
   getBrowser ()
   {
      return this .scene .getBrowser ();
   },
   getScene ()
   {
      return this .scene;
   },
   getExecutionContext ()
   {
      return this .executionContexts .at (-1);
   },
   pushExecutionContext (executionContext)
   {
      return this .executionContexts .push (executionContext);
   },
   popExecutionContext ()
   {
      this .executionContexts .pop ();
   },
   getOuterNode ()
   {
      return this .getExecutionContext () .getOuterNode ();
   },
   isInsideProtoDeclaration ()
   {
      return this .getExecutionContext () .getOuterNode () instanceof X3DProtoDeclaration;
   },
   loadComponents ()
   {
      return this .getBrowser () .loadComponents (this .getScene ());
   },
   setUnits (units)
   {
      if (units)
         delete this .fromUnit;
      else
         this .fromUnit = function (category, value) { return value; };
   },
   fromUnit (category, value)
   {
      return this .scene .fromUnit (category, value);
   },
   convertColor (value, defaultColor = "white")
   {
      const
         wrap   = $("<div></div>") .hide () .css ("color", defaultColor) .appendTo ($("body")),
         div    = $("<div></div>").css ("color", value) .appendTo (wrap),
         rgb    = window .getComputedStyle (div [0]) .color,
         values = rgb .replace (/^rgba?\(|\)$/g, "") .split (/[\s,]+/) .map (s => parseFloat (s));

      wrap .remove ();

      values [0] /= 255;
      values [1] /= 255;
      values [2] /= 255;

      if (typeof values [3] !== "number")
         values [3] = 1;

      return values;
   },
   sanitizeName (name = "")
   {
      // NonIdFirstChar
      name = name .replace (/^[\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/, "");

      // NonIdChars
      name = name .replace (/[\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]+/g, "-");

      // Spaces
      name = name .trim () .replace (/[\s_-]+/g, "-");

      // Trim
      name = name .replace (/^-+|-+$/g, "");

      return name;
   },
   renameExistingNode (name)
   {
      try
      {
         const namedNode = this .getExecutionContext () .getNamedNode (name);

         this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (name), namedNode);
      }
      catch
      { }

      try
      {
         const importedName = this .getExecutionContext () .getUniqueImportName (name);

         this .getExecutionContext () .renameImportedNode (name, importedName);
      }
      catch
      { }
   },
});

export default X3DParser;
