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
import Ammo                  from "../../../lib/ammojs/AmmoClass.js";

function RigidBodyCollection (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .RigidBodyCollection);

   // Units

   this ._gravity                 .setUnit ("acceleration");
   this ._constantForceMix        .setUnit ("force");
   this ._maxCorrectionSpeed      .setUnit ("speed");
   this ._contactSurfaceThickness .setUnit ("length");
   this ._disableLinearSpeed      .setUnit ("length");
   this ._disableAngularSpeed     .setUnit ("angularRate");

   // Members

   this .broadphase             = new Ammo .btDbvtBroadphase ();
   this .collisionConfiguration = new Ammo .btDefaultCollisionConfiguration ();
   this .dispatcher             = new Ammo .btCollisionDispatcher (this .collisionConfiguration);
   this .solver                 = new Ammo .btSequentialImpulseConstraintSolver ();
   this .dynamicsWorld          = new Ammo .btDiscreteDynamicsWorld (this .dispatcher, this .broadphase, this .solver, this .collisionConfiguration);
   this .deltaTime              = 0;
   this .colliderNode           = null;
   this .bodyNodes              = [ ];
   this .otherBodyNodes         = [ ];
   this .rigidBodies            = [ ];
   this .jointNodes             = [ ];
   this .otherJointNodes        = [ ];
}

Object .assign (Object .setPrototypeOf (RigidBodyCollection .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled                 .addInterest ("set_enabled__",                 this);
      this ._set_contacts            .addInterest ("set_contacts__",                this);
      this ._gravity                 .addInterest ("set_gravity__",                 this);
      this ._contactSurfaceThickness .addInterest ("set_contactSurfaceThickness__", this);
      this ._collider                .addInterest ("set_collider__",                this);
      this ._bodies                  .addInterest ("set_bodies__",                  this);
      this ._joints                  .addInterest ("set_joints__",                  this);

      this .set_enabled__ ();
      this .set_gravity__ ();
      this .set_collider__ ();
      this .set_bodies__ ();
   },
   getBBox (bbox, shadows)
   {
      return bbox .set ();
   },
   getDynamicsWorld ()
   {
      return this .dynamicsWorld;
   },
   getTimeStep ()
   {
      const DELAY = 15; // Delay in frames when dt full applies.

      var
         dt        = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ()),
         deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

      return deltaTime;
   },
   set_enabled__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
         this .getBrowser () .sensorEvents () .addInterest ("update", this);
      else
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);
   },
   set_contacts__ ()
   {
   },
   set_gravity__: (() =>
   {
      var gravity = new Ammo .btVector3 (0, 0, 0);

      return function ()
      {
         gravity .setValue (this ._gravity .x,
                            this ._gravity .y,
                            this ._gravity .z);

         this .dynamicsWorld .setGravity (gravity);
      };
   })(),
   set_contactSurfaceThickness__ ()
   {
      for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
         this .bodyNodes [i] .getRigidBody () .getCollisionShape () .setMargin (this ._contactSurfaceThickness .getValue ());
   },
   set_collider__ ()
   {
      this .colliderNode = X3DCast (X3DConstants .CollisionCollection, this ._collider);
   },
   set_bounce__ ()
   {
      var
         colliderNode = this .colliderNode,
         bodyNodes    = this .bodyNodes;

      if (colliderNode && colliderNode ._enabled .getValue ())
      {
         if (colliderNode .getAppliedParameters () .has (AppliedParametersType .BOUNCE))
         {
            for (var i = 0, length = bodyNodes .length; i < length; ++ i)
            {
               var rigidBody = bodyNodes [i] .getRigidBody ();

               if (rigidBody .getLinearVelocity () .length () >= colliderNode ._minBounceSpeed .getValue ())
                  rigidBody .setRestitution (colliderNode ._bounce .getValue ());
               else
                  rigidBody .setRestitution (0);
            }

            return;
         }
      }

      for (var i = 0, length = bodyNodes .length; i < length; ++ i)
         bodyNodes [i] .getRigidBody () .setRestitution (0);
   },
   set_frictionCoefficients__ ()
   {
      if (this .colliderNode && this .colliderNode ._enabled .getValue ())
      {
         if (this .colliderNode .getAppliedParameters () .has (AppliedParametersType .FRICTION_COEFFICIENT_2))
         {
            for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
            {
               var rigidBody = this .bodyNodes [i] .getRigidBody ();

               rigidBody .setFriction (this .colliderNode ._frictionCoefficients .x);
               rigidBody .setRollingFriction (this .colliderNode ._frictionCoefficients .y);
            }

            return;
         }
      }

      for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
      {
         var rigidBody = this .bodyNodes [i] .getRigidBody ();

         rigidBody .setFriction (0.5);
         rigidBody .setRollingFriction (0);
      }
   },
   set_bodies__ ()
   {
      for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
      {
         var bodyNode = this .bodyNodes [i];

         bodyNode ._enabled .removeInterest ("set_dynamicsWorld__", this);
         bodyNode .setCollection (null);
      }

      for (var i = 0, length = this .otherBodyNodes .length; i < length; ++ i)
         this .otherBodyNodes [i] ._collection .removeInterest ("set_bodies__", this);

      this .bodyNodes .length = 0;

      for (var i = 0, length = this ._bodies .length; i < length; ++ i)
      {
         var bodyNode = X3DCast (X3DConstants .RigidBody, this ._bodies [i]);

         if (! bodyNode)
            continue;

         if (bodyNode .getCollection ())
         {
            bodyNode ._collection .addInterest ("set_bodies__", this);
            this .otherBodyNodes .push (bodyNode);
            continue;
         }

         bodyNode .setCollection (this);

         this .bodyNodes .push (bodyNode);
      }

      for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
         this .bodyNodes [i] ._enabled .addInterest ("set_dynamicsWorld__", this);

      this .set_contactSurfaceThickness__ ();
      this .set_dynamicsWorld__ ();
      this .set_joints__ ();
   },
   set_dynamicsWorld__ ()
   {
      for (var i = 0, length = this .rigidBodies .length; i < length; ++ i)
         this .dynamicsWorld .removeRigidBody (this .rigidBodies [i]);

      this .rigidBodies .length = 0;

      for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
      {
         var bodyNode = this .bodyNodes [i];

         if (! bodyNode ._enabled .getValue ())
            continue;

         this .rigidBodies .push (bodyNode .getRigidBody ());
      }

      for (var i = 0, length = this .rigidBodies .length; i < length; ++ i)
         this .dynamicsWorld .addRigidBody (this .rigidBodies [i]);
   },
   set_joints__ ()
   {
      for (var i = 0, length = this .jointNodes .length; i < length; ++ i)
         this .jointNodes [i] .setCollection (null);

      this .jointNodes .length = 0;

      for (var i = 0, length = this .otherJointNodes .length; i < length; ++ i)
         this .otherJointNodes [i] ._collection .removeInterest ("set_joints__", this);

      this .otherJointNodes .length = 0;

      for (var i = 0, length = this ._joints .length; i < length; ++ i)
      {
         var jointNode = X3DCast (X3DConstants .X3DRigidJointNode, this ._joints [i]);

         if (! jointNode)
            continue;

         if (jointNode .getCollection ())
         {
            jointNode ._collection .addInterest ("set_joints__", this);
            this .otherJointNodes .push (bodyNode);
            continue;
         }

         jointNode .setCollection (this);

         this .jointNodes .push (jointNode);
      }
   },
   update ()
   {
      try
      {
         var
            deltaTime  = this .getTimeStep (),
            iterations = this ._iterations .getValue (),
            gravity    = this ._gravity .getValue ();

         this .set_bounce__ ();
         this .set_frictionCoefficients__ ();

         if (this ._preferAccuracy .getValue ())
         {
            deltaTime /= iterations;

            for (var i = 0; i < iterations; ++ i)
            {
               for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
                  this .bodyNodes [i] .applyForces (gravity);

               this .dynamicsWorld .stepSimulation (deltaTime, 0);
            }
         }
         else
         {
            for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
               this .bodyNodes [i] .applyForces (gravity);

            this .dynamicsWorld .stepSimulation (deltaTime, iterations + 2, deltaTime / iterations);
         }

         for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
            this .bodyNodes [i] .update ();
      }
      catch (error)
      {
         console .error (error);
      }
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (RigidBodyCollection, X3DNode .getStaticProperties ("RigidBodyCollection", "RigidBodyPhysics", 2, "children", "3.2"));

Object .defineProperties (RigidBodyCollection,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_contacts",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gravity",                 new Fields .SFVec3f (0, -9.8, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "preferAccuracy",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "errorCorrection",         new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "iterations",              new Fields .SFInt32 (10)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "constantForceMix",        new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxCorrectionSpeed",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "contactSurfaceThickness", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoDisable",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableLinearSpeed",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableAngularSpeed",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collider",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bodies",                  new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",                  new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",              new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default RigidBodyCollection;
