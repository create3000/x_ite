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
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Quaternion           from "../../../standard/Math/Numbers/Quaternion.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function RigidBody (executionContext)
{
   X3DNode          .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .RigidBody);

   this .addChildObjects (X3DConstants .inputOutput, "collection",    new Fields .SFNode (),
                          X3DConstants .outputOnly,  "transform",     new Fields .SFTime (),
                          X3DConstants .outputOnly,  "otherGeometry", new Fields .MFNode ());

   // Units

   this ._position            .setUnit ("length");
   this ._linearVelocity      .setUnit ("speed");
   this ._angularVelocity     .setUnit ("angularRate");
   this ._mass                .setUnit ("mass");
   this ._forces              .setUnit ("force");
   this ._torques             .setUnit ("force");
   this ._disableLinearSpeed  .setUnit ("speed");
   this ._disableAngularSpeed .setUnit ("angularRate");

   // Private properties

   this .compoundShape      = new Ammo .btCompoundShape ();
   this .motionState        = new Ammo .btDefaultMotionState ();
   this .constructionInfo   = new Ammo .btRigidBodyConstructionInfo (0, this .motionState, this .compoundShape);
   this .rigidBody          = new Ammo .btRigidBody (this .constructionInfo);
   this .geometryNodes      = [ ];
   this .otherGeometryNodes = [ ];
   this .matrix             = new Matrix4 ();
   this .force              = new Vector3 ();
   this .torque             = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (RigidBody .prototype, X3DNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DNode          .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._linearVelocity       .addInterest ("set_linearVelocity__",     this);
      this ._angularVelocity      .addInterest ("set_angularVelocity__",    this);
      this ._useFiniteRotation    .addInterest ("set_finiteRotationAxis__", this);
      this ._finiteRotationAxis   .addInterest ("set_finiteRotationAxis__", this);
      this ._autoDamp             .addInterest ("set_damping__",            this);
      this ._linearDampingFactor  .addInterest ("set_damping__",            this);
      this ._angularDampingFactor .addInterest ("set_damping__",            this);
      this ._forces               .addInterest ("set_forces__",             this);
      this ._torques              .addInterest ("set_torques__",            this);
      this ._disableTime          .addInterest ("set_disable__",            this);
      this ._disableTime          .addInterest ("set_disable__",            this);
      this ._disableLinearSpeed   .addInterest ("set_disable__",            this);
      this ._disableAngularSpeed  .addInterest ("set_disable__",            this);
      this ._geometry             .addInterest ("set_geometry__",           this);
      this ._otherGeometry        .addInterest ("set_geometry__",           this);

      this ._fixed   .addInterest ("set_massProps__", this);
      this ._mass    .addInterest ("set_massProps__", this);
      this ._inertia .addInterest ("set_massProps__", this);

      this ._transform .addInterest ("set_transform__", this);

      this .set_forces__ ();
      this .set_torques__ ();
      this .set_geometry__ ();
   },
   getBBox (bbox, shadows)
   {
      return bbox .set ();
   },
   setCollection (value)
   {
      this ._collection = value;
   },
   getCollection ()
   {
      return this ._collection .getValue ();
   },
   getRigidBody ()
   {
      return this .rigidBody;
   },
   getMatrix ()
   {
      return this .matrix;
   },
   set_position__ ()
   {
      for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
         this .geometryNodes [i] ._translation = this ._position;
   },
   set_orientation__ ()
   {
      for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
         this .geometryNodes [i] ._rotation = this ._orientation;
   },
   set_transform__: (() =>
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

         m .set (this ._position .getValue (), this ._orientation .getValue ());

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
   set_linearVelocity__: (() =>
   {
      var lv = new Ammo .btVector3 (0, 0, 0);

      return function ()
      {
         if (this ._fixed .getValue ())
            lv .setValue (0, 0, 0);
         else
            lv .setValue (this ._linearVelocity .x, this ._linearVelocity .y, this ._linearVelocity .z);

         this .rigidBody .setLinearVelocity (lv);
         this .rigidBody .activate ();
      };
   }) (),
   set_angularVelocity__: (() =>
   {
      var av = new Ammo .btVector3 (0, 0, 0);

      return function ()
      {
         if (this ._fixed .getValue ())
            av .setValue (0, 0, 0);
         else
            av .setValue (this ._angularVelocity .x, this ._angularVelocity .y, this ._angularVelocity .z);

         this .rigidBody .setAngularVelocity (av);
         this .rigidBody .activate ();
      };
   })(),
   set_finiteRotationAxis__: (() =>
   {
      var angularFactor = new Ammo .btVector3 (1, 1, 1);

      return function ()
      {
         if (this ._useFiniteRotation .getValue ())
            angularFactor .setValue (this ._finiteRotationAxis .x, this ._finiteRotationAxis .y, this ._finiteRotationAxis .z);
         else
            angularFactor .setValue (1, 1, 1);

         this .rigidBody .setAngularFactor (angularFactor);
      };
   })(),
   set_damping__ ()
   {
      if (this ._autoDamp .getValue ())
         this .rigidBody .setDamping (this ._linearDampingFactor .getValue (), this ._angularDampingFactor .getValue ());
      else
         this .rigidBody .setDamping (0, 0);

      this .rigidBody .activate ();
   },
   set_centerOfMass__: (() =>
   {
      var
         rotation     = new Ammo .btQuaternion (0, 0, 0, 1),
         origin       = new Ammo .btVector3 (0, 0, 0),
         centerOfMass = new Ammo .btTransform (rotation, origin);

      return function ()
      {
         origin .setValue (this ._centerOfMass .x, this ._centerOfMass .y, this ._centerOfMass .z);
         centerOfMass .setOrigin (origin);

         this .rigidBody .setCenterOfMassTransform (centerOfMass);
      };
   })(),
   set_massProps__: (() =>
   {
      var localInertia = new Ammo .btVector3 (0, 0, 0);

      return function ()
      {
         var inertia = this ._inertia;

         localInertia .setValue (inertia [0] + inertia [1] + inertia [2],
                                 inertia [3] + inertia [4] + inertia [5],
                                 inertia [6] + inertia [7] + inertia [8]);

         this .compoundShape .calculateLocalInertia (this ._fixed .getValue () ? 0 : this ._mass .getValue (), localInertia);

         this .rigidBody .setMassProps (this ._fixed .getValue () ? 0 : this ._mass .getValue (), localInertia);
      };
   })(),
   set_forces__ ()
   {
      this .force .set (0, 0, 0);

      for (var i = 0, length = this ._forces .length; i < length; ++ i)
         this .force .add (this ._forces [i] .getValue ());
   },
   set_torques__ ()
   {
      this .torque .set (0, 0, 0);

      for (var i = 0, length = this ._torques .length; i < length; ++ i)
         this .torque .add (this ._torques [i] .getValue ());
   },
   set_disable__ ()
   {
      if (this ._autoDisable .getValue ())
      {
         this .rigidBody .setSleepingThresholds (this ._disableLinearSpeed .getValue (), this ._disableAngularSpeed .getValue ());
      }
      else
      {
         this .rigidBody .setSleepingThresholds (0, 0);
      }
   },
   set_geometry__ ()
   {
      var geometryNodes = this .geometryNodes;

      for (var i = 0, length = geometryNodes .length; i < length; ++ i)
      {
         var geometryNode = geometryNodes [i];

         geometryNode .removeInterest ("addEvent", this ._transform);
         geometryNode ._compoundShape .removeInterest ("set_compoundShape__", this);

         geometryNode .setBody (null);

         geometryNode ._translation .removeFieldInterest (this ._position);
         geometryNode ._rotation    .removeFieldInterest (this ._orientation);

         this ._position    .removeFieldInterest (geometryNode ._translation);
         this ._orientation .removeFieldInterest (geometryNode ._rotation);
      }

      for (var i = 0, length = this .otherGeometryNodes .length; i < length; ++ i)
         this .otherGeometryNodes [i] ._body .removeInterest ("set_body__", this);

      geometryNodes .length = 0;

      for (var i = 0, length = this ._geometry .length; i < length; ++ i)
      {
         var geometryNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._geometry [i]);

         if (! geometryNode)
            continue;

         if (geometryNode .getBody ())
         {
            geometryNode ._body .addInterest ("set_body__", this);
            this .otherGeometryNodes .push (geometryNode);
            continue;
         }

         geometryNode .setBody (this);

         geometryNodes .push (geometryNode);
      }

      for (var i = 0, length = geometryNodes .length; i < length; ++ i)
      {
         var geometryNode = geometryNodes [i];

         geometryNode .addInterest ("addEvent", this ._transform);
         geometryNode ._compoundShape .addInterest ("set_compoundShape__", this);

         geometryNode ._translation .addFieldInterest (this ._position);
         geometryNode ._rotation    .addFieldInterest (this ._orientation);

         this ._position    .addFieldInterest (geometryNode ._translation);
         this ._orientation .addFieldInterest (geometryNode ._rotation);
      }

      this .set_compoundShape__ ();
   },
   set_body__ ()
   {
      this ._otherGeometry .addEvent ();
   },
   set_compoundShape__: (() =>
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
   applyForces: (() =>
   {
      var
         g = new Ammo .btVector3 (0, 0, 0),
         f = new Ammo .btVector3 (0, 0, 0),
         t = new Ammo .btVector3 (0, 0, 0),
         z = new Ammo .btVector3 (0, 0, 0);

      return function (gravity)
      {
         if (this ._fixed .getValue ())
            return;

         if (this ._useGlobalGravity .getValue ())
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
   update: (() =>
   {
      var
         transform       = new Ammo .btTransform (),
         position        = new Vector3 (),
         quaternion      = new Quaternion (),
         orientation     = new Rotation4 (),
         linearVelocity  = new Vector3 (),
         angularVelocity = new Vector3 ();

      return function ()
      {
         this .motionState .getWorldTransform (transform);

         var
            btOrigin          = transform .getOrigin (),
            btQuaternion      = transform .getRotation (),
            btLinearVeloctity = this .rigidBody .getLinearVelocity (),
            btAngularVelocity = this .rigidBody .getAngularVelocity ();

         quaternion .set (btQuaternion .x (), btQuaternion .y (), btQuaternion .z (), btQuaternion .w ());

         this ._position        = position .set (btOrigin .x (), btOrigin .y (), btOrigin .z ());
         this ._orientation     = orientation .setQuaternion (quaternion);
         this ._linearVelocity  = linearVelocity .set (btLinearVeloctity .x (), btLinearVeloctity .y (), btLinearVeloctity .z ());
         this ._angularVelocity = angularVelocity .set (btAngularVelocity .x (), btAngularVelocity .y (), btAngularVelocity .z ());
      };
   })(),
   dispose ()
   {
      Ammo .destroy (this .rigidBody);
      Ammo .destroy (this .constructionInfo);
      Ammo .destroy (this .motionState);
      Ammo .destroy (this .compoundShape);

      X3DBoundedObject .prototype .dispose .call (this);
      X3DNode          .prototype .dispose .call (this);
   },
});

Object .defineProperties (RigidBody,
{
   ... X3DNode .getStaticProperties ("RigidBody", "RigidBodyPhysics", 2, "bodies", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fixed",                new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "position",             new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",          new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "linearVelocity",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "angularVelocity",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "useFiniteRotation",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "finiteRotationAxis",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoDamp",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "linearDampingFactor",  new Fields .SFFloat (0.001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "angularDampingFactor", new Fields .SFFloat (0.001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "centerOfMass",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "massDensityModel",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "useGlobalGravity",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "forces",               new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "torques",              new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "inertia",              new Fields .SFMatrix3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoDisable",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableTime",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableLinearSpeed",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableAngularSpeed",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",             new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default RigidBody;
