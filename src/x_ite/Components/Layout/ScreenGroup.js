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
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import X3DProtoDeclaration  from "../../Prototype/X3DProtoDeclaration.js";

function ScreenGroup (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .ScreenGroup);

   // Private properties

   if (executionContext .getOuterNode () instanceof X3DProtoDeclaration)
      this .matrix = new Matrix4 ();
   else
      this .matrix = new Matrix4 (0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
}

Object .assign (Object .setPrototypeOf (ScreenGroup .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._bboxSize .addInterest ("set_visibleObjects__", this);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size || this .bboxObjects .size || this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
   getBBox (bbox, shadows)
   {
      return this .getSubBBox (bbox, shadows) .multRight (this .matrix);
   },
   getMatrix ()
   {
      return this .matrix;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         case TraverseType .PICKING:
         case TraverseType .SHADOW: // ???
            // No clone support for shadows, generated cube map texture and bbox
            break;
         default:
         {
            const browser = this .getBrowser ();

            browser .getScreenScaleMatrix (renderObject, this .matrix, browser .getRenderingProperty ("ContentScale"), false);
            break;
         }
      }

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (ScreenGroup,
{
   ... X3DNode .getStaticProperties ("ScreenGroup", "Layout", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ScreenGroup;
