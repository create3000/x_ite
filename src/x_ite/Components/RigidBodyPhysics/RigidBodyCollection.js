import Fields                from "../../Fields.js";
import X3DFieldDefinition    from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray  from "../../Base/FieldDefinitionArray.js";
import X3DNode               from "../Core/X3DNode.js";
import X3DChildNode          from "../Core/X3DChildNode.js";
import X3DBoundedObject      from "../Grouping/X3DBoundedObject.js";
import X3DConstants          from "../../Base/X3DConstants.js";
import X3DCast               from "../../Base/X3DCast.js";
import AppliedParametersType from "../../Browser/RigidBodyPhysics/AppliedParametersType.js";

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

   this .deltaTime       = 0;
   this .bodyNodes       = [ ];
   this .otherBodyNodes  = [ ];
   this .actors          = [ ];
   this .jointNodes      = [ ];
   this .otherJointNodes = [ ];
}

Object .assign (Object .setPrototypeOf (RigidBodyCollection .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   async initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this .PhysX   = await browser .getPhysX ();
      this .physics = await browser .getPhysics ();

      const
         gravity   = new this .PhysX .PxVec3 (... this ._gravity),
         sceneDesc = new this .PhysX .PxSceneDesc (this.tolerances);

      sceneDesc .set_gravity (gravity);
      sceneDesc .set_cpuDispatcher (this .PhysX .DefaultCpuDispatcherCreate (0));
      sceneDesc .set_filterShader (this .PhysX .DefaultFilterShader());

      this .scene   = this .physics .createScene (sceneDesc);
      this .gravity = gravity;

      this .PhysX .destroy (sceneDesc);

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
      if (this .isDefaultBBoxSize ())
         return bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getTimeStep ()
   {
      const DELAY = 15; // Delay in frames when dt full applies.

      const
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
   set_gravity__ ()
   {
      const
         gravity = this .gravity,
         value   = this ._gravity .getValue ();

      gravity .x = value .x;
      gravity .y = value .y;
      gravity .z = value .z;

      this .scene .setGravity (gravity);
   },
   set_contactSurfaceThickness__ ()
   {
      // Margin is set in CollidableShape.
      // for (const bodyNode of this .bodyNodes)
      //    bodyNode .getRigidBody () .getCollisionShape () .setMargin (this ._contactSurfaceThickness .getValue ());
   },
   set_collider__ ()
   {
      this .colliderNode ?.removeInterest ("set_colliderParameters__", this);

      this .colliderNode = X3DCast (X3DConstants .CollisionCollection, this ._collider);

      this .colliderNode ?.addInterest ("set_colliderParameters__", this);

      this .set_colliderParameters__ ();
   },
   set_colliderParameters__ ()
   {
      // const colliderNode = this .colliderNode;

      // for (const bodyNode of this .bodyNodes)
      // {
      //    const rigidBody = bodyNode .getRigidBody ();

      //    rigidBody .setFriction (0.5);
      //    rigidBody .setRollingFriction (0);
      // }

      // if (!colliderNode)
      //    return;

      // for (const parameter of colliderNode .getAppliedParameters ())
      // {
      //    switch (parameter)
      //    {
      //       case AppliedParametersType .FRICTION_COEFFICIENT_2:
      //       {
      //          for (const bodyNode of this .bodyNodes)
      //          {
      //             const rigidBody = bodyNode .getRigidBody ();

      //             rigidBody .setFriction (colliderNode ._frictionCoefficients .x);
      //             rigidBody .setRollingFriction (colliderNode ._frictionCoefficients .y);
      //          }

      //          break;
      //       }
      //    }
      // }
   },
   set_bounce__ ()
   {
      // const colliderNode = this .colliderNode;

      // if (colliderNode ?._enabled .getValue ())
      // {
      //    if (colliderNode .getAppliedParameters () .has (AppliedParametersType .BOUNCE))
      //    {
      //       for (const bodyNode of this .bodyNodes)
      //       {
      //          const rigidBody = bodyNode .getRigidBody ();

      //          if (rigidBody .getLinearVelocity () .length () >= colliderNode ._minBounceSpeed .getValue ())
      //             rigidBody .setRestitution (colliderNode ._bounce .getValue ());
      //          else
      //             rigidBody .setRestitution (0);
      //       }

      //       return;
      //    }
      // }

      // for (const bodyNode of this .bodyNodes)
      //    bodyNode .getRigidBody () .setRestitution (0);
   },
   set_bodies__ ()
   {
      for (const bodyNode of this .bodyNodes)
      {
         bodyNode ._actors .removeInterest ("set_actors__", this);
         bodyNode .setCollection (null);
      }

      for (const otherBodyNode of this .otherBodyNodes)
         otherBodyNode ._collection .removeInterest ("set_bodies__", this);

      this .bodyNodes .length = 0;

      for (const node of this ._bodies)
      {
         const bodyNode = X3DCast (X3DConstants .RigidBody, node);

         if (!bodyNode)
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

      for (const bodyNode of this .bodyNodes)
         bodyNode ._actors .addInterest ("set_actors__", this);

      this .set_colliderParameters__ ();
      this .set_contactSurfaceThickness__ ();
      this .set_actors__ ();
      this .set_joints__ ();
   },
   set_actors__ ()
   {
      for (const actor of this .actors .filter (actor => !actor .released))
         this .scene .removeActor (actor);

      this .actors .length = 0;

      for (const bodyNode of this .bodyNodes)
      {
         if (!bodyNode ._enabled .getValue ())
            continue;

         const actor = bodyNode .getActor ();

         if (!actor || actor .released)
            continue;

         this .actors .push (actor);
      }

      for (const actor of this .actors)
         this .scene .addActor (actor);
   },
   set_joints__ ()
   {
      // for (const jointNode of this .jointNodes)
      //    jointNode .setCollection (null);

      // this .jointNodes .length = 0;

      // for (const otherJointNode of this .otherJointNodes)
      //    otherJointNode ._collection .removeInterest ("set_joints__", this);

      // this .otherJointNodes .length = 0;

      // for (const node of this ._joints)
      // {
      //    const jointNode = X3DCast (X3DConstants .X3DRigidJointNode, node);

      //    if (!jointNode)
      //       continue;

      //    if (jointNode .getCollection ())
      //    {
      //       jointNode ._collection .addInterest ("set_joints__", this);
      //       this .otherJointNodes .push (bodyNode);
      //       continue;
      //    }

      //    jointNode .setCollection (this);

      //    this .jointNodes .push (jointNode);
      // }
   },
   update ()
   {
      const
         scene      = this .scene,
         iterations = this ._iterations .getValue ();

      if (this ._preferAccuracy .getValue ())
      {
         const deltaTime = this .getTimeStep () / iterations;

         for (let i = 0; i < iterations; ++ i)
         {
            for (const bodyNode of this .bodyNodes)
               bodyNode .applyForces ();

            scene .simulate (deltaTime);
         }
      }
      else
      {
         const deltaTime = this .getTimeStep ();

         for (const bodyNode of this .bodyNodes)
            bodyNode .applyForces ();

         scene .simulate (deltaTime);
      }

      scene .fetchResults (true);

      for (const bodyNode of this .bodyNodes)
         bodyNode .update ();
   },
   dispose ()
   {
      this .PhysX .destroy (this .gravity);
      this .PhysX .destroy (this .scene);

      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (RigidBodyCollection,
{
   ... X3DNode .getStaticProperties ("RigidBodyCollection", "RigidBodyPhysics", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_contacts",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "preferAccuracy",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "errorCorrection",         new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "iterations",              new Fields .SFInt32 (10)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gravity",                 new Fields .SFVec3f (0, -9.8, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "constantForceMix",        new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxCorrectionSpeed",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "contactSurfaceThickness", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoDisable",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableLinearSpeed",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "disableAngularSpeed",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",              new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collider",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bodies",                  new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "joints",                  new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default RigidBodyCollection;
