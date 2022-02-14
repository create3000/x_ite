/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/Bits/X3DCast",
   "x_ite/Browser/RigidBodyPhysics/AppliedParametersType",
   "lib/ammojs/AmmoJS",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants,
          X3DCast,
          AppliedParametersType,
          Ammo)
{
"use strict";

   function RigidBodyCollection (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .RigidBodyCollection);

      // Units

      this .gravity_                 .setUnit ("acceleration");
      this .constantForceMix_        .setUnit ("force");
      this .maxCorrectionSpeed_      .setUnit ("speed");
      this .contactSurfaceThickness_ .setUnit ("length");
      this .disableLinearSpeed_      .setUnit ("length");
      this .disableAngularSpeed_     .setUnit ("angularRate");

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

   RigidBodyCollection .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: RigidBodyCollection,
      fieldDefinitions: new FieldDefinitionArray ([
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableTime",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableLinearSpeed",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableAngularSpeed",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collider",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bodies",                  new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",                  new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "RigidBodyCollection";
      },
      getComponentName: function ()
      {
         return "RigidBodyPhysics";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this .isLive () .addInterest ("set_enabled__", this);

         this .enabled_                 .addInterest ("set_enabled__",                 this);
         this .set_contacts_            .addInterest ("set_contacts__",                this);
         this .gravity_                 .addInterest ("set_gravity__",                 this);
         this .contactSurfaceThickness_ .addInterest ("set_contactSurfaceThickness__", this);
         this .collider_                .addInterest ("set_collider__",                this);
         this .bodies_                  .addInterest ("set_bodies__",                  this);
         this .joints_                  .addInterest ("set_joints__",                  this);

         this .set_enabled__ ();
         this .set_gravity__ ();
         this .set_collider__ ();
         this .set_bodies__ ();
      },
      getDynamicsWorld: function ()
      {
         return this .dynamicsWorld;
      },
      getTimeStep: function ()
      {
         const DELAY = 15; // Delay in frames when dt full applies.

         var
            dt        = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ()),
            deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

         return deltaTime;
      },
      set_enabled__: function ()
      {
         if (this .isLive () .getValue () && this .enabled_ .getValue ())
            this .getBrowser () .sensorEvents () .addInterest ("update", this);
         else
            this .getBrowser () .sensorEvents () .removeInterest ("update", this);
      },
      set_contacts__: function ()
      {
      },
      set_gravity__: (function ()
      {
         var gravity = new Ammo .btVector3 (0, 0, 0);

         return function ()
         {
            gravity .setValue (this .gravity_ .x,
                               this .gravity_ .y,
                               this .gravity_ .z);

            this .dynamicsWorld .setGravity (gravity);
         };
      })(),
      set_contactSurfaceThickness__: function ()
      {
         for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
            this .bodyNodes [i] .getRigidBody () .getCollisionShape () .setMargin (this .contactSurfaceThickness_ .getValue ());
      },
      set_collider__: function ()
      {
         this .colliderNode = X3DCast (X3DConstants .CollisionCollection, this .collider_);
      },
      set_bounce__: function ()
      {
         var
            colliderNode = this .colliderNode,
            bodyNodes    = this .bodyNodes;

         if (colliderNode && colliderNode .enabled_ .getValue ())
         {
            if (colliderNode .getAppliedParameters () .has (AppliedParametersType .BOUNCE))
            {
               for (var i = 0, length = bodyNodes .length; i < length; ++ i)
               {
                  var rigidBody = bodyNodes [i] .getRigidBody ();

                  if (rigidBody .getLinearVelocity () .length () >= colliderNode .minBounceSpeed_ .getValue ())
                     rigidBody .setRestitution (colliderNode .bounce_ .getValue ());
                  else
                     rigidBody .setRestitution (0);
               }

               return;
            }
         }

         for (var i = 0, length = bodyNodes .length; i < length; ++ i)
            bodyNodes [i] .getRigidBody () .setRestitution (0);
      },
      set_frictionCoefficients__: function ()
      {
         if (this .colliderNode && this .colliderNode .enabled_ .getValue ())
         {
            if (this .colliderNode .getAppliedParameters () .has (AppliedParametersType .FRICTION_COEFFICIENT_2))
            {
               for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
               {
                  var rigidBody = this .bodyNodes [i] .getRigidBody ();

                  rigidBody .setFriction (this .colliderNode .frictionCoefficients_ .x);
                  rigidBody .setRollingFriction (this .colliderNode .frictionCoefficients_ .y);
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
      set_bodies__: function ()
      {
         for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
         {
            var bodyNode = this .bodyNodes [i];

            bodyNode .enabled_ .removeInterest ("set_dynamicsWorld__", this);
            bodyNode .setCollection (null);
         }

         for (var i = 0, length = this .otherBodyNodes .length; i < length; ++ i)
            this .otherBodyNodes [i] .collection_ .removeInterest ("set_bodies__", this);

         this .bodyNodes .length = 0;

         for (var i = 0, length = this .bodies_ .length; i < length; ++ i)
         {
            var bodyNode = X3DCast (X3DConstants .RigidBody, this .bodies_ [i]);

            if (! bodyNode)
               continue;

            if (bodyNode .getCollection ())
            {
               bodyNode .collection_ .addInterest ("set_bodies__", this);
               this .otherBodyNodes .push (bodyNode);
               continue;
            }

            bodyNode .setCollection (this);

            this .bodyNodes .push (bodyNode);
         }

         for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
            this .bodyNodes [i] .enabled_ .addInterest ("set_dynamicsWorld__", this);

         this .set_contactSurfaceThickness__ ();
         this .set_dynamicsWorld__ ();
         this .set_joints__ ();
      },
      set_dynamicsWorld__: function ()
      {
         for (var i = 0, length = this .rigidBodies .length; i < length; ++ i)
            this .dynamicsWorld .removeRigidBody (this .rigidBodies [i]);

         this .rigidBodies .length = 0;

         for (var i = 0, length = this .bodyNodes .length; i < length; ++ i)
         {
            var bodyNode = this .bodyNodes [i];

            if (! bodyNode .enabled_ .getValue ())
               continue;

            this .rigidBodies .push (bodyNode .getRigidBody ());
         }

         for (var i = 0, length = this .rigidBodies .length; i < length; ++ i)
            this .dynamicsWorld .addRigidBody (this .rigidBodies [i]);
      },
      set_joints__: function ()
      {
         for (var i = 0, length = this .jointNodes .length; i < length; ++ i)
            this .jointNodes [i] .setCollection (null);

         this .jointNodes .length = 0;

         for (var i = 0, length = this .otherJointNodes .length; i < length; ++ i)
            this .otherJointNodes [i] .collection_ .removeInterest ("set_joints__", this);

         this .otherJointNodes .length = 0;

         for (var i = 0, length = this .joints_ .length; i < length; ++ i)
         {
            var jointNode = X3DCast (X3DConstants .X3DRigidJointNode, this .joints_ [i]);

            if (! jointNode)
               continue;

            if (jointNode .getCollection ())
            {
               jointNode .collection_ .addInterest ("set_joints__", this);
               this .otherJointNodes .push (bodyNode);
               continue;
            }

            jointNode .setCollection (this);

            this .jointNodes .push (jointNode);
         }
      },
      update: function ()
      {
         try
         {
            var
               deltaTime  = this .getTimeStep (),
               iterations = this .iterations_ .getValue (),
               gravity    = this .gravity_ .getValue ();

            this .set_bounce__ ();
            this .set_frictionCoefficients__ ();

            if (this .preferAccuracy_ .getValue ())
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
   });

   return RigidBodyCollection;
});
