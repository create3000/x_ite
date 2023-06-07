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

import Vector3   from "../../standard/Math/Numbers/Vector3.js";
import Rotation4 from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4   from "../../standard/Math/Numbers/Matrix4.js";

function X3DOptimizer () { }

X3DOptimizer .prototype = {
   constructor: X3DOptimizer,
   removeGroups: false,
   removeEmptyGroups: false,
   combineGroupingNodes: false,
   optimizeSceneGraph (nodes)
   {
      const removedNodes = [ ];

      nodes .setValue (this .optimizeNodes (nodes, true, removedNodes));

      removedNodes .forEach (node => node .dispose ());
   },
   optimizeNodes (nodes, combine, removedNodes)
   {
      return [... nodes] .flatMap (node => this .optimizeNode (node, combine, removedNodes));
   },
   optimizeNode (node, combine, removedNodes)
   {
      if (!node)
         return [ ];

      switch (node .getNodeTypeName ())
      {
         case "Transform":
         {
            node .children = this .optimizeNodes (node .children, true, removedNodes);
            break;
         }
         case "Anchor":
         case "Group":
         {
            node .children = this .optimizeNodes (node .children, true, removedNodes);

            if (this .removeEmptyGroups)
            {
               if (node .children .length === 0)
                  return [ ];
            }

            if (this .removeGroups)
               break;

            return node;
         }
         case "LOD":
         case "Switch":
         {
            this .optimizeNodes (node .children, false, removedNodes);
            return node;
         }
         default:
         {
            return node;
         }
      }

      if (!combine)
         return node;

      if (this .removeEmptyGroups)
      {
         if (node .children .length === 0)
            return [ ];
      }

      if (!this .combineGroupingNodes)
         return node;

      if (node .getValue () .hasRoutes ())
         return node;

      if (node .getNodeTypeName () === "Transform")
      {
         this .combineSingleChild (node, removedNodes);

         if (!node .translation .getValue () .equals (Vector3 .Zero))
            return node;

         if (!node .rotation .getValue () .equals (Rotation4 .Identity))
            return node;

         if (!node .scale .getValue () .equals (Vector3 .One))
            return node;
      }

      removedNodes .push (node .getValue ());

      return [... node .children];
   },
   combineSingleChild (node, removedNodes)
   {
      if (node .children .length !== 1)
         return;

      const child = node .children [0];

      if (child .getNodeTypeName () !== "Transform")
         return;

      if (child .getValue () .hasRoutes ())
         return;

      // Combine single Transform nodes.

      const
         translation      = new Vector3 (0, 0, 0),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1, 1, 1),
         scaleOrientation = new Rotation4 (),
         nodeMatrix       = new Matrix4 (),
         childMatrix      = new Matrix4 ();

      nodeMatrix .set (node .translation .getValue (),
                        node .rotation .getValue (),
                        node .scale .getValue (),
                        node .scaleOrientation .getValue ());

      childMatrix .set (child .translation .getValue (),
                        child .rotation .getValue (),
                        child .scale .getValue (),
                        child .scaleOrientation .getValue ());

      nodeMatrix .multLeft (childMatrix);

      nodeMatrix .get (translation, rotation, scale, scaleOrientation);

      node .translation      = translation;
      node .rotation         = rotation;
      node .scale            = scale;
      node .scaleOrientation = scaleOrientation;
      node .children         = child .children;

      removedNodes .push (child .getValue ());
   },
};

export default X3DOptimizer;
