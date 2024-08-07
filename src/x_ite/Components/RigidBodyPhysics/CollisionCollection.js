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

import Fields                from "../../Fields.js";
import X3DFieldDefinition    from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray  from "../../Base/FieldDefinitionArray.js";
import X3DNode               from "../Core/X3DNode.js";
import X3DChildNode          from "../Core/X3DChildNode.js";
import X3DBoundedObject      from "../Grouping/X3DBoundedObject.js";
import X3DConstants          from "../../Base/X3DConstants.js";
import X3DCast               from "../../Base/X3DCast.js";
import AppliedParametersType from "../../Browser/RigidBodyPhysics/AppliedParametersType.js";

function CollisionCollection (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .CollisionCollection);

   this ._minBounceSpeed           .setUnit ("speed");
   this ._surfaceSpeed             .setUnit ("speed");
   this ._softnessConstantForceMix .setUnit ("force");

   this .appliedParameters   = new Set ();
   this .collidableNodes     = [ ];
   this .collisionSpaceNodes = [ ];
}

Object .assign (Object .setPrototypeOf (CollisionCollection .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._appliedParameters .addInterest ("set_appliedParameters__", this);
      this ._collidables       .addInterest ("set_collidables__",       this);

      this .set_appliedParameters__ ();
      this .set_collidables__ ();
   },
   getBBox (bbox, shadows)
   {
      return bbox .set ();
   },
   getAppliedParameters ()
   {
      return this .appliedParameters;
   },
   getCollidables ()
   {
      return this .collidableNodes;
   },
   set_appliedParameters__: (() =>
   {
      var appliedParametersIndex = new Map ([
         ["BOUNCE",                 AppliedParametersType .BOUNCE],
         ["USER_FRICTION",          AppliedParametersType .USER_FRICTION],
         ["FRICTION_COEFFICIENT-2", AppliedParametersType .FRICTION_COEFFICIENT_2],
         ["ERROR_REDUCTION",        AppliedParametersType .ERROR_REDUCTION],
         ["CONSTANT_FORCE",         AppliedParametersType .CONSTANT_FORCE],
         ["SPEED-1",                AppliedParametersType .SPEED_1],
         ["SPEED-2",                AppliedParametersType .SPEED_2],
         ["SLIP-1",                 AppliedParametersType .SLIP_1],
         ["SLIP-2",                 AppliedParametersType .SLIP_2],
      ]);

      return function ()
      {
         this .appliedParameters .clear ();

         for (var i = 0, length = this ._appliedParameters .length; i < length; ++ i)
         {
            var appliedParameter = appliedParametersIndex .get (this ._appliedParameters [i]);

            if (appliedParameter !== undefined)
               this .appliedParameters .add (appliedParameter);
         }
      };
   })(),
   set_collidables__ ()
   {
      var collisionSpaceNodes = this .collisionSpaceNodes;

      for (var i = 0, length = collisionSpaceNodes .length; i < length; ++ i)
         collisionSpaceNodes [i] .removeInterest ("collect", this);

      collisionSpaceNodes .length = 0;

      for (var i = 0, length = this ._collidables .length; i < length; ++ i)
      {
         var collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, this ._collidables [i]);

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
      var
         collidableNodes     = this .collidableNodes,
         collisionSpaceNodes = this .collisionSpaceNodes;

      collidableNodes     .length = 0;
      collisionSpaceNodes .length = 0;

      for (var i = 0, length = this ._collidables .length; i < length; ++ i)
      {
         var collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._collidables [i]);

         if (collidableNode)
         {
            collidableNodes .push (collidableNode);
            continue;
         }

         var collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, this ._collidables [i]);

         if (collisionSpaceNode)
         {
            Array .prototype .push .apply (collidableNodes, collisionSpaceNode .getCollidables ());
            continue;
         }
      }

      this .addNodeEvent ();
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (CollisionCollection, X3DNode .getStaticProperties ("CollisionCollection", "RigidBodyPhysics", 1, "collider", "3.2"));

Object .defineProperties (CollisionCollection,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appliedParameters",        new Fields .MFString ("BOUNCE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bounce",                   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "minBounceSpeed",           new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "frictionCoefficients",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceSpeed",             new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slipFactors",              new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "softnessConstantForceMix", new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "softnessErrorCorrection",  new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "collidables",              new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                 new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",               new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default CollisionCollection;
