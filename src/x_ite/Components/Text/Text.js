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
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Text (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Text);

   // Units

   this ._length     .setUnit ("length");
   this ._maxExtent  .setUnit ("length");
   this ._origin     .setUnit ("length");
   this ._textBounds .setUnit ("length");
   this ._lineBounds .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Text .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._fontStyle .addInterest ("set_fontStyle__", this);

      this .set_fontStyle__ ();
   },
   getMatrix ()
   {
      return this .textGeometry .getMatrix ();
   },
   getLength (index)
   {
      if (index < this ._length .length)
         return Math .max (0, this ._length [index]);

      return 0;
   },
   set_live__ ()
   {
      X3DGeometryNode .prototype .set_live__ .call (this);

      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
      {
         browser .getBrowserOptions () ._PrimitiveQuality .addInterest ("requestRebuild", this);
         browser .getBrowserOptions () ._TextCompression  .addInterest ("requestRebuild", this);
      }
      else
      {
         browser .getBrowserOptions () ._PrimitiveQuality .removeInterest ("requestRebuild", this);
         browser .getBrowserOptions () ._TextCompression  .removeInterest ("requestRebuild", this);
      }
   },
   set_fontStyle__ ()
   {
      this .fontStyleNode ?.removeInterest ("requestRebuild", this);

      this .fontStyleNode = X3DCast (X3DConstants .X3DFontStyleNode, this ._fontStyle)
         ?? this .getBrowser () .getDefaultFontStyle ();

      this .fontStyleNode .addInterest ("requestRebuild", this);

      this .textGeometry = this .fontStyleNode .getTextGeometry (this);
   },
   build ()
   {
      this .textGeometry .update ();
      this .textGeometry .build ();

      this .setSolid (this ._solid .getValue ());
   },
   traverse (type, renderObject)
   {
      this .textGeometry .traverse (type, renderObject);

      X3DGeometryNode .prototype .traverse .call (this, type, renderObject);
   },
   display (gl, renderContext)
   {
      this .textGeometry .display (gl, renderContext);

      X3DGeometryNode .prototype .display .call (this, gl, renderContext);

      renderContext .textureNode = null;
   },
   transformLine (line)
   {
      // Apply screen nodes transformation in place here.
      return this .textGeometry .transformLine (line);
   },
   transformMatrix (matrix)
   {
      // Apply screen nodes transformation in place here.
      return this .textGeometry .transformMatrix (matrix);
   },
});

Object .defineProperties (Text,
{
   ... X3DNode .getStaticProperties ("Text", "Text", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "string",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "length",     new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxExtent",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "origin",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "textBounds", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "lineBounds", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fontStyle",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Text;
