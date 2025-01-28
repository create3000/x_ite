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
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function CollisionSensor (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .CollisionSensor);

   this .contactCache = [ ];
}

Object .assign (Object .setPrototypeOf (CollisionSensor .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      X3DSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this ._collider .addInterest ("set_collider__", this);

      this .set_collider__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue () && this .colliderNode)
      {
         this .getBrowser () .sensorEvents () .addInterest ("update", this);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);
      }
   },
   set_collider__ ()
   {
      this .colliderNode = X3DCast (X3DConstants .CollisionCollection, this ._collider);

      this .set_live__ ();
   },
   update: (() =>
   {
      var
         collidableNodesIndex = new Map (),
         collisionWorlds      = new Set (),
         intersectionNodes    = new Set (),
         contactNodes         = [ ],
         position             = new Vector3 (),
         contactNormal        = new Vector3 ();

      return function ()
      {
         var
            colliderNode    = this .colliderNode,
            collidableNodes = colliderNode .getCollidables ();

         collidableNodesIndex .clear ();
         collisionWorlds      .clear ();

         for (var i = 0, length = collidableNodes .length; i < length; ++ i)
         {
            var
               collidableNode = collidableNodes [i],
               bodyNode       = collidableNodes [i] .getBody ();

            if (bodyNode)
            {
               collidableNodesIndex .set (bodyNode .getRigidBody () .ptr, collidableNode);

               var collection = bodyNode .getCollection ();

               if (collection)
                  collisionWorlds .add (collection .getDynamicsWorld ());
            }
         }

         intersectionNodes .clear ();
         contactNodes .length = 0;

         collisionWorlds .forEach (collisionWorld =>
         {
            //collisionWorld .performDiscreteCollisionDetection ();

            var
               dispatcher   = collisionWorld .getDispatcher (),
               numManifolds = dispatcher .getNumManifolds ();

            for (var i = 0; i < numManifolds; ++ i)
            {
               var
                  contactManifold = dispatcher .getManifoldByIndexInternal (i),
                  numContacts     = contactManifold .getNumContacts ();

               for (var j = 0; j < numContacts; ++ j)
               {
                  var pt = contactManifold .getContactPoint (j);

                  if (pt .getDistance () <= 0)
                  {
                     var
                        collidableNode1 = collidableNodesIndex .get (contactManifold .getBody0 () .ptr),
                        collidableNode2 = collidableNodesIndex .get (contactManifold .getBody1 () .ptr);

                     if (! collidableNode1 && ! collidableNode2)
                        continue;

                     var contactNode = this .getContact (contactNodes .length);

                     var
                        btPosition      = pt .getPositionWorldOnA (),
                        btContactNormal = pt .get_m_normalWorldOnB ();

                     contactNode ._position                 = position .set (btPosition .x (), btPosition .y (), btPosition .z ());
                     contactNode ._contactNormal            = contactNormal .set (btContactNormal .x (), btContactNormal .y (), btContactNormal .z ());
                     contactNode ._depth                    = -pt .getDistance ();
                     // contactNode ._frictionDirection        = context .frictionDirection;
                     contactNode ._appliedParameters        = colliderNode ._appliedParameters;
                     contactNode ._bounce                   = colliderNode ._bounce;
                     contactNode ._minBounceSpeed           = colliderNode ._minBounceSpeed;
                     contactNode ._frictionCoefficients     = colliderNode ._frictionCoefficients;
                     contactNode ._surfaceSpeed             = colliderNode ._surfaceSpeed;
                     contactNode ._slipCoefficients         = colliderNode ._slipFactors;
                     contactNode ._softnessConstantForceMix = colliderNode ._softnessConstantForceMix;
                     contactNode ._softnessErrorCorrection  = colliderNode ._softnessErrorCorrection;

                     if (collidableNode1)
                     {
                        intersectionNodes .add (collidableNode1);

                        contactNode .geometry1_ = collidableNode1;
                        contactNode .body1_     = collidableNode1 .getBody ();
                     }

                     if (collidableNode2)
                     {
                        intersectionNodes .add (collidableNode2);

                        contactNode .geometry2_ = collidableNode2;
                        contactNode .body2_     = collidableNode2 .getBody ();
                     }

                     contactNodes .push (contactNode);
                  }
               }
            }
         });

         var active = !! contactNodes .length;

         if (this ._isActive .getValue () !== active)
            this ._isActive = active;

         if (intersectionNodes .size)
         {
            var i = 0;

            intersectionNodes .forEach (intersectionNode => this ._intersections [i ++] = intersectionNode);

            this ._intersections .length = i;
         }

         if (contactNodes .length)
         {
            var i = 0;

            contactNodes .forEach (contactNode => this ._contacts [i ++] = contactNode);

            this ._contacts .length = i;
         }
      };
   })(),
   getContact (index)
   {
      const contactNode = this .contactCache [index];

      if (contactNode)
      {
         return contactNode;
      }
      else
      {
         const contactNode = this .contactCache [index] = this .getExecutionContext () .createNode ("Contact", false);

         contactNode .setup ();

         return contactNode;
      }
   },
});

Object .defineProperties (CollisionSensor,
{
   ... X3DNode .getStaticProperties ("CollisionSensor", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "intersections", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "contacts",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "collider",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollisionSensor;
