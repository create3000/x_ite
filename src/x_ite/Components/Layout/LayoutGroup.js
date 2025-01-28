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
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function LayoutGroup (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .LayoutGroup);

   this .matrix          = new Matrix4 ();
   this .modelViewMatrix = new Matrix4 ();
   this .screenMatrix    = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (LayoutGroup .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._viewport .addInterest ("set_viewport__", this);
      this ._layout   .addInterest ("set_layout__", this);

      this .set_viewport__ ();
      this .set_layout__ ();
   },
   set_viewport__ ()
   {
      this .viewportNode = X3DCast (X3DConstants .X3DViewportNode, this ._viewport);
   },
   set_layout__ ()
   {
      this .layoutNode = X3DCast (X3DConstants .X3DLayoutNode, this ._layout);
   },
   getBBox (bbox, shadows)
   {
      return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadows) .multRight (this .getMatrix ());
   },
   getMatrix ()
   {
      if (this .layoutNode)
         return this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);

      return this .matrix .identity ();
   },
   getLayout ()
   {
      return this .layoutNode;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .COLLISION:
         {
            return;
         }
         default:
         {
            if (this .viewportNode)
               this .viewportNode .push ();

            if (this .layoutNode)
            {
               const modelViewMatrix = renderObject .getModelViewMatrix ();

               this .modelViewMatrix .assign (modelViewMatrix .get ());
               this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

               modelViewMatrix .push (this .screenMatrix);
               renderObject .getLayouts () .push (this .layoutNode);

               X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

               renderObject .getLayouts () .pop ();
               modelViewMatrix .pop ();
            }
            else
            {
               X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
            }

            if (this .viewportNode)
               this .viewportNode .pop ();

            return;
         }
      }
   },
});

Object .defineProperties (LayoutGroup,
{
   ... X3DNode .getStaticProperties ("LayoutGroup", "Layout", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "layout",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewport",       new Fields .SFNode ()),
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

export default LayoutGroup;
