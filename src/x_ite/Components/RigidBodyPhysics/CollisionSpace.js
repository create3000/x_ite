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

import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DNBodyCollisionSpaceNode from "./X3DNBodyCollisionSpaceNode.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import X3DCast                    from "../../Base/X3DCast.js";

function CollisionSpace (executionContext)
{
   X3DNBodyCollisionSpaceNode .call (this, executionContext);

   this .addType (X3DConstants .CollisionSpace);

   this .collidableNodes     = [ ];
   this .collisionSpaceNodes = [ ];
}

Object .assign (Object .setPrototypeOf (CollisionSpace .prototype, X3DNBodyCollisionSpaceNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollisionSpaceNode .prototype .initialize .call (this);

      this ._collidables .addInterest ("set_collidables__", this);

      this .set_collidables__ ();
   },
   getBBox (bbox, shadows)
   {
      // TODO: add space node.
      if (this .isDefaultBBoxSize ())
         return X3DBoundedObject .getBBox (this .collidableNodes, bbox, shadows);

      return bbox;
   },
   getCollidables ()
   {
      return this .collidableNodes;
   },
   set_collidables__ ()
   {
      const collisionSpaceNodes = this .collisionSpaceNodes;

      for (const collisionSpaceNode of collisionSpaceNodes)
         collisionSpaceNode .removeInterest ("collect", this);

      collisionSpaceNodes .length = 0;

      for (const node of this ._collidables)
      {
         const collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, node);

         if (collisionSpaceNode)
         {
            collisionSpaceNode .addInterest ("collect", this);

            collisionSpaceNodes .push (collisionSpaceNode);
         }
      }

      this .collect ();
   },
   collect ()
   {
      const
         collidableNodes     = this .collidableNodes,
         collisionSpaceNodes = this .collisionSpaceNodes;

      collidableNodes     .length = 0;
      collisionSpaceNodes .length = 0;

      for (const node of this ._collidables)
      {
         const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, node);

         if (collidableNode)
         {
            collidableNodes .push (collidableNode);
            continue;
         }

         const collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, this ._collidables [i]);

         if (collisionSpaceNode)
         {
            Array .prototype .push .apply (collidableNodes, collisionSpaceNode .getCollidables ());
            continue;
         }
      }

      this .addNodeEvent ();
   },
});

Object .defineProperties (CollisionSpace,
{
   ... X3DNode .getStaticProperties ("CollisionSpace", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "useGeometry", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "collidables", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollisionSpace;
