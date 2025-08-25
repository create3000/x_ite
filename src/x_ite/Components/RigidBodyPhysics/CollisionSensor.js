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
      const
         collidableNodesIndex = new Map (),
         collisionWorlds      = new Set (),
         intersectionNodes    = new Set (),
         contactNodes         = [ ],
         position             = new Vector3 (),
         contactNormal        = new Vector3 ();

      return function ()
      {
         const
            colliderNode    = this .colliderNode,
            collidableNodes = colliderNode .getCollidables ();

         collidableNodesIndex .clear ();
         collisionWorlds      .clear ();

         for (const collidableNode of collidableNodes)
         {
            const bodyNode = collidableNode .getBody ();

            if (bodyNode)
            {
               collidableNodesIndex .set (bodyNode .getRigidBody () .ptr, collidableNode);

               const collection = bodyNode .getCollection ();

               if (collection)
                  collisionWorlds .add (collection .getDynamicsWorld ());
            }
         }

         intersectionNodes .clear ();
         contactNodes .length = 0;

         collisionWorlds .forEach (collisionWorld =>
         {
            //collisionWorld .performDiscreteCollisionDetection ();

            const
               dispatcher   = collisionWorld .getDispatcher (),
               numManifolds = dispatcher .getNumManifolds ();

            for (let i = 0; i < numManifolds; ++ i)
            {
               const
                  contactManifold = dispatcher .getManifoldByIndexInternal (i),
                  numContacts     = contactManifold .getNumContacts ();

               for (let j = 0; j < numContacts; ++ j)
               {
                  const pt = contactManifold .getContactPoint (j);

                  if (pt .getDistance () <= 0)
                  {
                     const
                        collidableNode1 = collidableNodesIndex .get (contactManifold .getBody0 () .ptr),
                        collidableNode2 = collidableNodesIndex .get (contactManifold .getBody1 () .ptr);

                     if (! collidableNode1 && ! collidableNode2)
                        continue;

                     const contactNode = this .getContact (contactNodes .length);

                     const
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

         const active = !! contactNodes .length;

         if (this ._isActive .getValue () !== active)
            this ._isActive = active;

         if (intersectionNodes .size)
         {
            let i = 0;

            intersectionNodes .forEach (intersectionNode => this ._intersections [i ++] = intersectionNode);

            this ._intersections .length = i;
         }

         if (contactNodes .length)
         {
            let i = 0;

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
