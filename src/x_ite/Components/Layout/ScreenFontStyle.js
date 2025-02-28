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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DFontStyleNode     from "../Text/X3DFontStyleNode.js";
import ScreenText           from "../../Browser/Layout/ScreenText.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function ScreenFontStyle (executionContext)
{
   X3DFontStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ScreenFontStyle);
}

Object .assign (Object .setPrototypeOf (ScreenFontStyle .prototype, X3DFontStyleNode .prototype),
{
   initialize ()
   {
      X3DFontStyleNode .prototype .initialize .call (this);

      this .getBrowser () .getRenderingProperties () ._ContentScale .addInterest ("addNodeEvent", this);
   },
   getTextGeometry (text)
   {
      return new ScreenText (text, this);
   },
   getScale ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getRenderingProperty ("PixelsPerPoint");
   },
   getContentScale ()
   {
      return this .getBrowser () .getRenderingProperty ("ContentScale");
   },
});

Object .defineProperties (ScreenFontStyle,
{
   ... X3DNode .getStaticProperties ("ScreenFontStyle", "Layout", 2, "fontStyle", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "language",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "family",      new Fields .MFString ("SERIF")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "style",       new Fields .SFString ("PLAIN")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSize",   new Fields .SFFloat (12)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "spacing",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "horizontal",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftToRight", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topToBottom", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "justify",     new Fields .MFString ("BEGIN")),
      ]),
      enumerable: true,
   },
});

export default ScreenFontStyle;
