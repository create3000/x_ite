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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";

function CollidableOffset (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableOffset);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFTime ());
}

Object .assign (Object .setPrototypeOf (CollidableOffset .prototype, X3DNBodyCollidableNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._rebuild .addInterest ("set_collidable__", this);

      this ._enabled    .addInterest ("set_collidableGeometry__", this);
      this ._collidable .addInterest ("requestRebuild",           this);

      this .set_child__ ();
   },
   set_child__ ()
   {
      // Remove node.

      if (this .getChild ())
      {
         const collidableNode = this .getChild ();

         collidableNode .removeInterest ("addNodeEvent", this);
         collidableNode ._compoundShape .removeFieldInterest (this ._compoundShape);
      }

      // Add node.

      const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._collidable);

      this .setChild (collidableNode);

      if (collidableNode)
      {
         collidableNode .addInterest ("addNodeEvent", this);
         collidableNode ._compoundShape .addFieldInterest (this ._compoundShape);
      }

      this .set_collidableGeometry__ ();
   },
   set_collidableGeometry__ ()
   {
      if (this .getCompoundShape () .getNumChildShapes ())
         this .getCompoundShape () .removeChildShapeByIndex (0);

      if (this .getChild () && this ._enabled .getValue ())
         this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .getChild () .getCompoundShape ());

      this ._compoundShape = this .getBrowser () .getCurrentTime ();
   },
});

Object .defineProperties (CollidableOffset,
{
   ... X3DNode .getStaticProperties ("CollidableOffset", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collidable",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollidableOffset;
