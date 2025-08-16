import Vector3   from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4 from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4   from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo      from "../../../lib/ammojs/AmmoClass.js";

function VolumePicker ()
{
   this .broadphase             = new Ammo .btDbvtBroadphase ();
   this .collisionConfiguration = new Ammo .btDefaultCollisionConfiguration ();
   this .dispatcher             = new Ammo .btCollisionDispatcher (this .collisionConfiguration);
   this .collisionWorld         = new Ammo .btCollisionWorld (this .dispatcher, this .broadphase, this .collisionConfiguration);

   this .compoundShape1         = new Ammo .btCompoundShape ();
   this .motionState1           = new Ammo .btDefaultMotionState ();
   this .constructionInfo1      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState1, this .compoundShape1);
   this .rigidBody1             = new Ammo .btRigidBody (this .constructionInfo1);

   this .compoundShape2         = new Ammo .btCompoundShape ();
   this .motionState2           = new Ammo .btDefaultMotionState ();
   this .constructionInfo2      = new Ammo .btRigidBodyConstructionInfo (0, this .motionState2, this .compoundShape2);
   this .rigidBody2             = new Ammo .btRigidBody (this .constructionInfo2);

   this .collisionWorld .addCollisionObject (this .rigidBody1);
   this .collisionWorld .addCollisionObject (this .rigidBody2);
}

Object .assign (VolumePicker .prototype,
{
   constuctor: VolumePicker,
   setChildShape1 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape1, matrix, childShape);
   },
   setChildShape2 (matrix, childShape)
   {
      this .setChildShape (this .compoundShape2, matrix, childShape);
   },
   setChildShape1Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape1, transform, localScaling, childShape);
   },
   setChildShape2Components (transform, localScaling, childShape)
   {
      this .setChildShapeComponents (this .compoundShape2, transform, localScaling, childShape);
   },
   setChildShape: (() =>
   {
      const
         translation = new Vector3 (),
         rotation    = new Rotation4 (),
         scale       = new Vector3 (1),
         s           = new Ammo .btVector3 (0, 0, 0);

      return function (compoundShape, matrix, childShape)
      {
         if (compoundShape .getNumChildShapes ())
            compoundShape .removeChildShapeByIndex (0);

         if (childShape .getNumChildShapes ())
         {
            matrix .get (translation, rotation, scale);

            s .setValue (scale .x, scale .y, scale .z);

            childShape .setLocalScaling (s);
            compoundShape .addChildShape (this .getTransform (translation, rotation), childShape);
         }
      };
   })(),
   setChildShapeComponents (compoundShape, transform, localScaling, childShape)
   {
      if (compoundShape .getNumChildShapes ())
         compoundShape .removeChildShapeByIndex (0);

      if (childShape .getNumChildShapes ())
      {
         childShape .setLocalScaling (localScaling);
         compoundShape .addChildShape (transform, childShape);
      }
   },
   contactTest ()
   {
      this .collisionWorld .performDiscreteCollisionDetection ();

      const numManifolds = this .dispatcher .getNumManifolds ();

      for (let i = 0; i < numManifolds; ++ i)
      {
         const
            contactManifold = this .dispatcher .getManifoldByIndexInternal (i),
            numContacts     = contactManifold .getNumContacts ();

         for (let j = 0; j < numContacts; ++ j)
         {
            const pt = contactManifold .getContactPoint (j);

            if (pt .getDistance () <= 0)
               return true;
         }
      }

      return false;
   },
   getTransform: (() =>
   {
      const
         T = new Ammo .btTransform (),
         o = new Ammo .btVector3 (0, 0, 0),
         m = new Matrix4 ();

      return function (translation, rotation, transform)
      {
         const t = transform || T;

         m .set (translation, rotation);

         o .setValue (m [12], m [13], m [14]);

         t .getBasis () .setValue (m [0], m [4], m [8],
                                   m [1], m [5], m [9],
                                   m [2], m [6], m [10]);

         t .setOrigin (o);

         return t;
      };
   })(),
});

export default VolumePicker;
