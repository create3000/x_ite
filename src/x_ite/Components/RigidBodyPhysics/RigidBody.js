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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/Bits/X3DCast",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   "lib/ammojs/AmmoJS",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          X3DCast,
          Vector3,
          Rotation4,
          Matrix4,
          Ammo)
{
"use strict";

   function RigidBody (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .RigidBody);

      this .addChildObjects ("collection",    new Fields .SFNode (),
                             "transform",     new Fields .SFTime (),
                             "otherGeometry", new Fields .MFNode ());

      this .position_            .setUnit ("length");
      this .linearVelocity_      .setUnit ("speed");
      this .angularVelocity_     .setUnit ("angularRate");
      this .mass_                .setUnit ("mass");
      this .forces_              .setUnit ("force");
      this .torques_             .setUnit ("force");
      this .disableLinearSpeed_  .setUnit ("speed");
      this .disableAngularSpeed_ .setUnit ("angularRate");

      this .compoundShape      = new Ammo .btCompoundShape ();
      this .motionState        = new Ammo .btDefaultMotionState ();
      this .constructionInfo   = new Ammo .btRigidBodyConstructionInfo (0, this .motionState, this .compoundShape);
      this .rigidBody          = new Ammo .btRigidBody (this .constructionInfo);
      this .geometryNodes      = [ ];
      this .otherGeometryNodes = [ ];
      this .matrix             = new Matrix4 ();
      this .force              = new Vector3 (0, 0, 0);
      this .torque             = new Vector3 (0, 0, 0);
   }

   RigidBody .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: RigidBody,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fixed",                new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",             new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",          new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linearVelocity",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "angularVelocity",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "useFiniteRotation",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "finiteRotationAxis",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoDamp",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linearDampingFactor",  new Fields .SFFloat (0.001)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "angularDampingFactor", new Fields .SFFloat (0.001)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfMass",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "massDensityModel",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "useGlobalGravity",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forces",               new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "torques",              new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "inertia",              new Fields .SFMatrix3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoDisable",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "disableTime",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "disableLinearSpeed",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "disableAngularSpeed",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry",             new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "RigidBody";
      },
      getComponentName: function ()
      {
         return "RigidBodyPhysics";
      },
      getContainerField: function ()
      {
         return "bodies";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         this .linearVelocity_       .addInterest ("set_linearVelocity__",     this);
         this .angularVelocity_      .addInterest ("set_angularVelocity__",    this);
         this .useFiniteRotation_    .addInterest ("set_finiteRotationAxis__", this);
         this .finiteRotationAxis_   .addInterest ("set_finiteRotationAxis__", this);
         this .autoDamp_             .addInterest ("set_damping__",            this);
         this .linearDampingFactor_  .addInterest ("set_damping__",            this);
         this .angularDampingFactor_ .addInterest ("set_damping__",            this);
         this .forces_               .addInterest ("set_forces__",             this);
         this .torques_              .addInterest ("set_torques__",            this);
         this .disableTime_          .addInterest ("set_disable__",            this);
         this .disableTime_          .addInterest ("set_disable__",            this);
         this .disableLinearSpeed_   .addInterest ("set_disable__",            this);
         this .disableAngularSpeed_  .addInterest ("set_disable__",            this);
         this .geometry_             .addInterest ("set_geometry__",           this);
         this .otherGeometry_        .addInterest ("set_geometry__",           this);

         this .fixed_   .addInterest ("set_massProps__", this);
         this .mass_    .addInterest ("set_massProps__", this);
         this .inertia_ .addInterest ("set_massProps__", this);

         this .transform_ .addInterest ("set_transform__", this);

         this .set_forces__ ();
         this .set_torques__ ();
         this .set_geometry__ ();
      },
      setCollection: function (value)
      {
         this .collection_ = value;
      },
      getCollection: function ()
      {
         return this .collection_ .getValue ();
      },
      getRigidBody: function ()
      {
         return this .rigidBody;
      },
      getMatrix: function ()
      {
         return this .matrix;
      },
      set_position__: function ()
      {
         for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
            this .geometryNodes [i] .translation_ = this .position_;
      },
      set_orientation__: function ()
      {
         for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
            this .geometryNodes [i] .rotation_ = this .orientation_;
      },
      set_transform__: (function ()
      {
         var
            o  = new Ammo .btVector3 (0, 0, 0),
            t  = new Ammo .btTransform (),
            im = new Matrix4 (),
            it = new Ammo .btTransform (),
            io = new Ammo .btVector3 (0, 0, 0);

         return function ()
         {
            var m = this .matrix;

            m .set (this .position_ .getValue (), this .orientation_ .getValue ());

            //t .setFromOpenGLMatrix (m);

            o .setValue (m [12], m [13], m [14]);

            t .getBasis () .setValue (m [0], m [4], m [8],
                                      m [1], m [5], m [9],
                                      m [2], m [6], m [10]);

            t .setOrigin (o);

            //

            im .assign (m);
            im .inverse ();

            //it .setFromOpenGLMatrix (im);

            io .setValue (im [12], im [13], im [14]);

            it .getBasis () .setValue (im [0], im [4], im [8],
                                       im [1], im [5], im [9],
                                       im [2], im [6], im [10]);

            it .setOrigin (io);

            var compoundShape = this .compoundShape;

            for (var i = 0, length = this .compoundShape .getNumChildShapes (); i < length; ++ i)
               compoundShape .updateChildTransform (i, it, false);

            this .compoundShape .recalculateLocalAabb ();
            this .motionState .setWorldTransform (t);

            this .rigidBody .setMotionState (this .motionState);
         };
      })(),
      set_linearVelocity__: (function ()
      {
         var lv = new Ammo .btVector3 (0, 0, 0);

         return function ()
         {
            if (this .fixed_ .getValue ())
               lv .setValue (0, 0, 0);
            else
               lv .setValue (this .linearVelocity_ .x, this .linearVelocity_ .y, this .linearVelocity_ .z);

            this .rigidBody .setLinearVelocity (lv);
            this .rigidBody .activate ();
         };
      }) (),
      set_angularVelocity__: (function ()
      {
         var av = new Ammo .btVector3 (0, 0, 0);

         return function ()
         {
            if (this .fixed_ .getValue ())
               av .setValue (0, 0, 0);
            else
               av .setValue (this .angularVelocity_ .x, this .angularVelocity_ .y, this .angularVelocity_ .z);

            this .rigidBody .setAngularVelocity (av);
            this .rigidBody .activate ();
         };
      })(),
      set_finiteRotationAxis__: (function ()
      {
         var angularFactor = new Ammo .btVector3 (1, 1, 1);

         return function ()
         {
            if (this .useFiniteRotation_ .getValue ())
               angularFactor .setValue (this .finiteRotationAxis_ .x, this .finiteRotationAxis_ .y, this .finiteRotationAxis_ .z);
            else
               angularFactor .setValue (1, 1, 1);

            this .rigidBody .setAngularFactor (angularFactor);
         };
      })(),
      set_damping__: function ()
      {
         if (this .autoDamp_ .getValue ())
            this .rigidBody .setDamping (this .linearDampingFactor_ .getValue (), this .angularDampingFactor_ .getValue ());
         else
            this .rigidBody .setDamping (0, 0);

         this .rigidBody .activate ();
      },
      set_centerOfMass__: (function ()
      {
         var
            rotation     = new Ammo .btQuaternion (0, 0, 0, 1),
            origin       = new Ammo .btVector3 (0, 0, 0),
            centerOfMass = new Ammo .btTransform (rotation, origin);

         return function ()
         {
            origin .setValue (this .centerOfMass_ .x, this .centerOfMass_ .y, this .centerOfMass_ .z);
            centerOfMass .setOrigin (origin);

            this .rigidBody .setCenterOfMassTransform (centerOfMass);
         };
      })(),
      set_massProps__: (function ()
      {
         var localInertia = new Ammo .btVector3 (0, 0, 0);

         return function ()
         {
            var inertia = this .inertia_;

            localInertia .setValue (inertia [0] + inertia [1] + inertia [2],
                                    inertia [3] + inertia [4] + inertia [5],
                                    inertia [6] + inertia [7] + inertia [8]);

            this .compoundShape .calculateLocalInertia (this .fixed_ .getValue () ? 0 : this .mass_ .getValue (), localInertia);

            this .rigidBody .setMassProps (this .fixed_ .getValue () ? 0 : this .mass_ .getValue (), localInertia);
         };
      })(),
      set_forces__: function ()
      {
         this .force .set (0, 0, 0);

         for (var i = 0, length = this .forces_ .length; i < length; ++ i)
            this .force .add (this .forces_ [i] .getValue ());
      },
      set_torques__: function ()
      {
         this .torque .set (0, 0, 0);

         for (var i = 0, length = this .torques_ .length; i < length; ++ i)
            this .torque .add (this .torques_ [i] .getValue ());
      },
      set_disable__: function ()
      {
         if (this .autoDisable_ .getValue ())
         {
            this .rigidBody .setSleepingThresholds (this .disableLinearSpeed_ .getValue (), this .disableAngularSpeed_ .getValue ());
         }
         else
         {
            this .rigidBody .setSleepingThresholds (0, 0);
         }
      },
      set_geometry__: function ()
      {
         var geometryNodes = this .geometryNodes;

         for (var i = 0, length = geometryNodes .length; i < length; ++ i)
         {
            var geometryNode = geometryNodes [i];

            geometryNode .removeInterest ("addEvent", this .transform_);
            geometryNode .compoundShape_changed_ .removeInterest ("set_compoundShape__", this);

            geometryNode .setBody (null);

            geometryNode .translation_ .removeFieldInterest (this .position_);
            geometryNode .rotation_    .removeFieldInterest (this .orientation_);

            this .position_    .removeFieldInterest (geometryNode .translation_);
            this .orientation_ .removeFieldInterest (geometryNode .rotation_);
         }

         for (var i = 0, length = this .otherGeometryNodes .length; i < length; ++ i)
            this .otherGeometryNodes [i] .body_ .removeInterest ("set_body__", this);

         geometryNodes .length = 0;

         for (var i = 0, length = this .geometry_ .length; i < length; ++ i)
         {
            var geometryNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this .geometry_ [i]);

            if (! geometryNode)
               continue;

            if (geometryNode .getBody ())
            {
               geometryNode .body_ .addInterest ("set_body__", this);
               this .otherGeometryNodes .push (geometryNode);
               continue;
            }

            geometryNode .setBody (this);

            geometryNodes .push (geometryNode);
         }

         for (var i = 0, length = geometryNodes .length; i < length; ++ i)
         {
            var geometryNode = geometryNodes [i];

            geometryNode .addInterest ("addEvent", this .transform_);
            geometryNode .compoundShape_changed_ .addInterest ("set_compoundShape__", this);

            geometryNode .translation_ .addFieldInterest (this .position_);
            geometryNode .rotation_    .addFieldInterest (this .orientation_);

            this .position_    .addFieldInterest (geometryNode .translation_);
            this .orientation_ .addFieldInterest (geometryNode .rotation_);
         }

         this .set_compoundShape__ ();
      },
      set_body__: function ()
      {
         this .otherGeometry_ .addEvent ();
      },
      set_compoundShape__: (function ()
      {
         var transform = new Ammo .btTransform ();

         return function ()
         {
            var compoundShape = this .compoundShape;

            for (var i = compoundShape .getNumChildShapes () - 1; i >= 0; -- i)
               compoundShape .removeChildShapeByIndex (i);

            for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
               compoundShape .addChildShape (transform, this .geometryNodes [i] .getCompoundShape ());

            this .set_position__ ();
            this .set_orientation__ ();
            this .set_transform__ ();
            this .set_linearVelocity__ ();
            this .set_angularVelocity__ ();
            this .set_finiteRotationAxis__ ();
            this .set_damping__ ();
            this .set_centerOfMass__ ();
            this .set_massProps__ ();
            this .set_disable__ ();
         };
      })(),
      applyForces: (function ()
      {
         var
            g = new Ammo .btVector3 (0, 0, 0),
            f = new Ammo .btVector3 (0, 0, 0),
            t = new Ammo .btVector3 (0, 0, 0),
            z = new Ammo .btVector3 (0, 0, 0);

         return function (gravity)
         {
            if (this .fixed_ .getValue ())
               return;

            if (this .useGlobalGravity_ .getValue ())
               g .setValue (gravity .x, gravity .y, gravity .z);
            else
               g .setValue (0, 0, 0);

            f .setValue (this .force  .x, this .force  .y, this .force  .z);
            t .setValue (this .torque .x, this .torque .y, this .torque .z);

            this .rigidBody .setGravity (g);
            this .rigidBody .applyForce (f, z);
            this .rigidBody .applyTorque (t);
         };
      })(),
      update: (function ()
      {
         var
            transform       = new Ammo .btTransform (),
            position        = new Vector3 (0, 0, 0),
            orientation     = new Rotation4 (0, 0, 1, 0),
            linearVelocity  = new Vector3 (0, 0, 0),
            angularVelocity = new Vector3 (0, 0, 0);

         return function ()
         {
            this .motionState .getWorldTransform (transform);

            var
               btOrigin          = transform .getOrigin (),
               btQuaternion      = transform .getRotation (),
               btLinearVeloctity = this .rigidBody .getLinearVelocity (),
               btAngularVelocity = this .rigidBody .getAngularVelocity ();

            orientation .value .set (btQuaternion .x (), btQuaternion .y (), btQuaternion .z (), btQuaternion .w ());

            this .position_        = position .set (btOrigin .x (), btOrigin .y (), btOrigin .z ());
            this .orientation_     = orientation;
            this .linearVelocity_  = linearVelocity .set (btLinearVeloctity .x (), btLinearVeloctity .y (), btLinearVeloctity .z ());
            this .angularVelocity_ = angularVelocity .set (btAngularVelocity .x (), btAngularVelocity .y (), btAngularVelocity .z ());
         };
      })(),
      dispose: function ()
      {
         Ammo .destroy (this .rigidBody);
         Ammo .destroy (this .constructionInfo);
         Ammo .destroy (this .motionState);
         Ammo .destroy (this .compoundShape);

         X3DNode .prototype .dispose .call (this);
      },
   });

   return RigidBody;
});
