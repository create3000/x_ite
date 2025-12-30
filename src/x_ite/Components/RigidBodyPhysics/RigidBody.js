import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Quaternion           from "../../../standard/Math/Numbers/Quaternion.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

function RigidBody (executionContext)
{
   X3DNode          .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .RigidBody);

   this .addChildObjects (X3DConstants .outputOnly, "transform",     new Fields .SFTime (),
                          X3DConstants .outputOnly, "otherGeometry", new Fields .MFNode ());

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

   this .geometryNodes      = [ ];
   this .otherGeometryNodes = [ ];
   this .shapes             = new Set ();
}

Object .assign (Object .setPrototypeOf (RigidBody .prototype, X3DNode .prototype),
   X3DBoundedObject .prototype,
{
   async initialize ()
   {
      X3DNode          .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this .PhysX           = await browser .getPhysX ();
      this .physics         = await browser .getPhysics ();
      this .pose            = new this .PhysX .PxTransform ();
      this .linearVelocity  = new this .PhysX .PxVec3 (0, 0, 0);
      this .angularVelocity = new this .PhysX .PxVec3 (0, 0, 0);
      this .centerOfMass    = new this .PhysX .PxTransform ();
      this .force           = new this .PhysX .PxVec3 (0, 0, 0);
      this .torque          = new this .PhysX .PxVec3 (0, 0, 0);

      this .centerOfMass .q .x = 0;
      this .centerOfMass .q .y = 0;
      this .centerOfMass .q .z = 0;
      this .centerOfMass .q .w = 1;

      this ._position             .addInterest ("addEvent",                 this ._transform);
      this ._orientation          .addInterest ("addEvent",                 this ._transform);
      this ._transform            .addInterest ("set_transform__",          this);
      this ._fixed                .addInterest ("set_fixed__",              this);
      this ._kinematic            .addInterest ("set_kinematic__",          this);
      this ._linearVelocity       .addInterest ("set_linearVelocity__",     this);
      this ._angularVelocity      .addInterest ("set_angularVelocity__",    this);
      this ._useFiniteRotation    .addInterest ("set_finiteRotationAxis__", this);
      this ._finiteRotationAxis   .addInterest ("set_finiteRotationAxis__", this);
      this ._autoDamp             .addInterest ("set_damping__",            this);
      this ._linearDampingFactor  .addInterest ("set_damping__",            this);
      this ._angularDampingFactor .addInterest ("set_damping__",            this);
      this ._mass                 .addInterest ("set_mass__",               this);
      this ._centerOfMass         .addInterest ("set_centerOfMass__",       this);
      this ._inertia              .addInterest ("set_inertia__",            this);
      this ._useGlobalGravity     .addInterest ("set_useGlobalGravity__",   this);
      this ._disableTime          .addInterest ("set_disable__",            this);
      this ._disableLinearSpeed   .addInterest ("set_disable__",            this);
      this ._disableAngularSpeed  .addInterest ("set_disable__",            this);
      this ._geometry             .addInterest ("set_geometry__",           this);
      this ._otherGeometry        .addInterest ("set_geometry__",           this);

      this .set_fixed__ ();
      this .set_kinematic__ ();
      this .set_geometry__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getCollection ()
   {
      return this .collection;
   },
   setCollection (collection)
   {
      if (this .actor)
         this .collection ?.getPhysicsScene () .removeActor (this .actor);

      this .collection = collection;

      if (this .actor)
         this .collection ?.getPhysicsScene () .addActor (this .actor);
   },
   set_fixed__ ()
   {
      this .fixed = this ._fixed .getValue ();

      this .set_geometry__ ();
   },
   set_kinematic__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      this .kinematic = this ._kinematic .getValue ();

      actor .setRigidBodyFlag (this .PhysX .PxRigidBodyFlagEnum .eKINEMATIC, this .kinematic);
   },
   set_position__ ()
   {
      for (const geometryNode of this .geometryNodes)
         geometryNode ._translation = this ._position;
   },
   set_orientation__ ()
   {
      for (const geometryNode of this .geometryNodes)
         geometryNode ._rotation = this ._orientation;
   },
   set_transform__: (() =>
   {
      const quaternion = new Quaternion ();

      return function ()
      {
         const { actor } = this;

         if (!actor)
            return;

         const
            position = this ._position .getValue (),
            pose     = this .pose,
            p        = pose .p,
            q        = pose .q;

         this ._orientation .getValue () .getQuaternion (quaternion);

         p .x = position .x;
         p .y = position .y;
         p .z = position .z;

         q .x = quaternion .x;
         q .y = quaternion .y;
         q .z = quaternion .z;
         q .w = quaternion .w;

         if (this .kinematic)
            actor .setKinematicTarget (pose);
         else
            actor .setGlobalPose (pose);
      };
   })(),
   set_linearVelocity__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      const
         value          = this ._linearVelocity .getValue (),
         linearVelocity = this .linearVelocity;

      linearVelocity .x = value .x;
      linearVelocity .y = value .y;
      linearVelocity .z = value .z;

      actor .setLinearVelocity (linearVelocity);
   },
   set_angularVelocity__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      const
         value           = this ._angularVelocity .getValue (),
         angularVelocity = this .angularVelocity;

      angularVelocity .x = value .x;
      angularVelocity .y = value .y;
      angularVelocity .z = value .z;

      actor .setAngularVelocity (angularVelocity);
   },
   set_finiteRotationAxis__: (() =>
   {
      // const angularFactor = new Ammo .btVector3 (1, 1, 1);

      return function ()
      {
         // if (this ._useFiniteRotation .getValue ())
         //    angularFactor .setValue (... this ._finiteRotationAxis);
         // else
         //    angularFactor .setValue (1, 1, 1);

         // this .rigidBody .setAngularFactor (angularFactor);
      };
   })(),
   set_damping__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      if (this ._autoDamp .getValue ())
      {
         actor .setLinearDamping (Algorithm .clamp (this ._linearDampingFactor .getValue (), 0, 1));
         actor .setAngularDamping (Algorithm .clamp (this ._angularDampingFactor .getValue (), 0, 1));
      }
      else
      {
         actor .setLinearDamping (0);
         actor .setAngularDamping (0);
      }
   },
   set_mass__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      actor .setMass (this ._mass .getValue ());
   },
   set_centerOfMass__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      const
         value        = this ._centerOfMass .getValue (),
         centerOfMass = this .centerOfMass,
         p            = centerOfMass .p;

      p .x = value .x;
      p .y = value .y;
      p .z = value .z;

      actor .setCMassLocalPose (centerOfMass);
   },
   set_inertia__ ()
   {
      const { actor, fixed } = this;

      if (!actor)
         return;

      if (fixed)
         return;

      const col0 = new this .PhysX .PxVec3 (
         this ._inertia [0],
         this ._inertia [1],
         this ._inertia [2],
      );

      const col1 = new this .PhysX .PxVec3 (
         this ._inertia [3],
         this ._inertia [4],
         this ._inertia [5],
      );

      const col2 = new this .PhysX .PxVec3 (
         this ._inertia [6],
         this ._inertia [7],
         this ._inertia [8],
      );

      const
         inertiaTensor = new this .PhysX .PxMat33 (col0, col1, col2),
         rotation      = new this .PhysX .PxQuat (0, 0, 0, 1),
         inertia       = this .PhysX .PxMassProperties .prototype .getMassSpaceInertia (inertiaTensor, rotation);

      actor .setMassSpaceInertiaTensor (inertia);

      this .PhysX .destroy (col0);
      this .PhysX .destroy (col1);
      this .PhysX .destroy (col2);
      this .PhysX .destroy (inertiaTensor);
      this .PhysX .destroy (rotation);
   },
   set_useGlobalGravity__ ()
   {
      this .actor ?.setActorFlag (this .PhysX .PxActorFlagEnum .eDISABLE_GRAVITY, !this ._useGlobalGravity .getValue ());
   },
   set_disable__ ()
   {
      // if (this ._autoDisable .getValue ())
      // {
      //    this .rigidBody .setSleepingThresholds (this ._disableLinearSpeed .getValue (), this ._disableAngularSpeed .getValue ());
      // }
      // else
      // {
      //    this .rigidBody .setSleepingThresholds (0, 0);
      // }
   },
   set_geometry__ ()
   {
      const geometryNodes = this .geometryNodes;

      // Detach shapes.

      for (const shape of this .shapes)
         this .actor .detachShape (shape);

      this .shapes .clear ();

      // Remove geometries.

      for (const geometryNode of geometryNodes)
      {
         geometryNode .setBody (null);

         geometryNode ._translation  .removeFieldInterest (this ._position);
         geometryNode ._rotation     .removeFieldInterest (this ._orientation);
         geometryNode ._physicsShape .removeInterest ("set_shapes__", this);

         this ._position    .removeFieldInterest (geometryNode ._translation);
         this ._orientation .removeFieldInterest (geometryNode ._rotation);
      }

      for (const otherGeometryNode of this .otherGeometryNodes)
         otherGeometryNode ._body .removeInterest ("set_body__", this);

      geometryNodes .length = 0;

      // Release actor.

      if (this .actor)
      {
         this .collection ?.getPhysicsScene () .removeActor (this .actor);
         this .actor .release ();

         this .actor = null;
      }

      // Add geometries.

      for (const node of this ._geometry)
      {
         const geometryNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, node);

         if (!geometryNode)
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

      for (const geometryNode of geometryNodes)
      {
         geometryNode ._translation . addFieldInterest (this ._position);
         geometryNode ._rotation     .addFieldInterest (this ._orientation);
         geometryNode ._physicsShape .addInterest ("set_shapes__", this);

         this ._position    .addFieldInterest (geometryNode ._translation);
         this ._orientation .addFieldInterest (geometryNode ._rotation);
      }

      // Create actor.

      this .actor = this .fixed
         ? this .physics .createRigidStatic (this .pose)
         : this .physics .createRigidDynamic (this .pose);

      if (!this .fixed)
         this .actor .setSolverIterationCounts (16, 4);

      this .collection ?.getPhysicsScene () .addActor (this .actor);

      // Setup actor properties.

      this .set_shapes__ ();
      this .set_position__ ();
      this .set_orientation__ ();
      this .set_transform__ ();
      this .set_kinematic__ ();
      this .set_linearVelocity__ ();
      this .set_angularVelocity__ ();
      this .set_finiteRotationAxis__ ();
      this .set_damping__ ();
      this .set_mass__ ();
      this .set_centerOfMass__ ();
      this .set_inertia__ ();
      this .set_useGlobalGravity__ ();
      this .set_disable__ ();
   },
   set_body__ ()
   {
      this ._otherGeometry .addEvent ();
   },
   set_shapes__ ()
   {
      for (const shape of this .shapes)
         this .actor .detachShape (shape);

      this .shapes .clear ();

      for (const geometryNode of this .geometryNodes)
      {
         const shape = geometryNode .getPhysicsShape (!this .fixed);

         if (!shape)
            continue;

         this .shapes .add (shape);
         this .actor .attachShape (shape);
      }
   },
   applyForces ()
   {
      const { actor, force, torque } = this;

      if (!actor)
         return;

      if (this .fixed)
         return;

      for (const value of this ._forces)
      {
         force .x = value .x;
         force .y = value .y;
         force .z = value .z;

         actor .addForce (force);
      }

      for (const value of this ._torques)
      {
         torque .x = value .x;
         torque .y = value .y;
         torque .z = value .z;

         actor .addTorque (torque);
      }
   },
   update: (() =>
   {
      const
         position        = new Vector3 (),
         quaternion      = new Quaternion (),
         orientation     = new Rotation4 (),
         rotation        = new Rotation4 (),
         linearVelocity  = new Vector3 (),
         angularVelocity = new Vector3 ();

      return function (deltaTime)
      {
         const { actor, fixed } = this;

         if (!actor)
            return;

         if (fixed)
            return;

         if (this .kinematic)
         {
            position
               .assign (this ._linearVelocity .getValue ())
               .multiply (deltaTime)
               .add (this ._position .getValue ());

            orientation .assign (this ._orientation .getValue ())
               .multRight (rotation .set (0, 0, 1, this ._angularVelocity .z * deltaTime))
               .multRight (rotation .set (0, 1, 0, this ._angularVelocity .y * deltaTime))
               .multRight (rotation .set (1, 0, 0, this ._angularVelocity .x * deltaTime));

            this ._position    = position;
            this ._orientation = orientation;
         }
         else
         {
            const
               transform = actor .getGlobalPose (),
               v         = actor .getLinearVelocity (),
               w         = actor .getAngularVelocity (),
               p         = transform .p,
               q         = transform .q;

            position .set (p .x, p .y, p .z);
            quaternion .set (q .x, q .y, q .z, q .w);

            this ._position        = position;
            this ._orientation     = orientation .setQuaternion (quaternion);
            this ._linearVelocity  = linearVelocity .set (v .x, v .y, v .z);
            this ._angularVelocity = angularVelocity .set (w .x, w .y, w .z);
         }
      };
   })(),
   dispose ()
   {
      if (this .pose)
      {
         if (this .actor)
            this .PhysX .destroy (this .actor);

         this .PhysX .destroy (this .pose);
         this .PhysX .destroy (this .linearVelocity);
         this .PhysX .destroy (this .angularVelocity);
         this .PhysX .destroy (this .centerOfMass);
         this .PhysX .destroy (this .force);
         this .PhysX .destroy (this .torque);
      }

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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "kinematic",            new Fields .SFBool ()),
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "inertia",              new Fields .SFMatrix3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "massDensityModel",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "useGlobalGravity",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "forces",               new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "torques",              new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoDisable",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableTime",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableLinearSpeed",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableAngularSpeed",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",             new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default RigidBody;
