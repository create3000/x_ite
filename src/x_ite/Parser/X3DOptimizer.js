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

import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import X3DConstants from "../Base/X3DConstants.js";

function X3DOptimizer () { }

Object .assign (X3DOptimizer .prototype,
{
   removeGroups: false,
   removeEmptyGroups: false,
   combineGroupingNodes: false,
   optimizeInterpolators: false,
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

      if (this .optimizeInterpolators)
         this .removeInterpolatorsWithOnlyOneValue (node, removedNodes);

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
         case "Collision":
         case "LOD":
         case "Switch":
         {
            this .optimizeNodes (node .children, false, removedNodes);
            return node;
         }
         case "HAnimJoint":
         case "HAnimSegment":
         case "HAnimSite":
         {
            node .children = this .optimizeNodes (node .children, true, removedNodes);
            return node;
         }
         case "HAnimHumanoid":
         {
            node .skeleton = this .optimizeNodes (node .skeleton, true, removedNodes);
            node .skin     = this .optimizeNodes (node .skin,     true, removedNodes);
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
         node = this .combineSingleChild (node, removedNodes);

         if (!node .translation .getValue () .equals (Vector3 .Zero))
            return node;

         if (!node .rotation .getValue () .equals (Rotation4 .Identity))
            return node;

         if (!node .scale .getValue () .equals (Vector3 .One))
            return node;
      }

      if (node .children)
      {
         removedNodes .push (node);

         return [... node .children];
      }

      return node;
   },
   removeInterpolatorsWithOnlyOneValue (node, removedNodes)
   {
      for (const field of node .getValue () .getFields ())
      {
         if (field .getInputRoutes () .size !== 1)
            continue;

         const
            route      = Array .from (field .getInputRoutes ()) [0],
            sourceNode = route .sourceNode;

         if (!sourceNode .getNodeType () .includes (X3DConstants .X3DInterpolatorNode))
            continue;

         if (sourceNode .key .length !== 1)
            continue;

         node [route .destinationField] = sourceNode .keyValue [0];

         removedNodes .push (sourceNode);

         route .dispose ();
      }
   },
   combineSingleChild (node, removedNodes)
   {
      if (node .children .length !== 1)
         return node;

      const child = node .children [0];

      if (!child .getNodeTypeName () .match (/^(?:Transform|HAnimHumanoid)$/))
         return node;

      if (child .getValue () .hasRoutes ())
         return node;

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
                       node .scaleOrientation .getValue (),
                       node .center .getValue ());

      childMatrix .set (child .translation .getValue (),
                        child .rotation .getValue (),
                        child .scale .getValue (),
                        child .scaleOrientation .getValue (),
                        child .center .getValue ());

      nodeMatrix .multLeft (childMatrix);

      nodeMatrix .get (translation, rotation, scale, scaleOrientation, child .center .getValue ());

      child .translation      = translation;
      child .rotation         = rotation;
      child .scale            = scale;
      child .scaleOrientation = scaleOrientation;

      if (!child .getNodeTypeName () && node .getNodeTypeName ())
      {
         const executionContext = child .getExecutionContext ();

         executionContext .addNamedNode (executionContext .getUniqueName (node .getNodeTypeName ()), child);
      }

      removedNodes .push (node);

      return child;
   },
});

export default X3DOptimizer;
