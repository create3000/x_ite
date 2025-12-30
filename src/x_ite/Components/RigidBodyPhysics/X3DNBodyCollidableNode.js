import Fields           from "../../Fields.js";
import X3DNode          from "../Core/X3DNode.js";
import X3DChildNode     from "../Core/X3DChildNode.js";
import X3DBoundedObject from "../Grouping/X3DBoundedObject.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import X3DCast          from "../../Base/X3DCast.js";
import TraverseType     from "../../Rendering/TraverseType.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo             from "../../../lib/ammojs/AmmoClass.js";

function X3DNBodyCollidableNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DNBodyCollidableNode);

   this .addChildObjects (X3DConstants .inputOutput, "body",         new Fields .SFNode (),
                          X3DConstants .outputOnly,  "physicsShape", new Fields .SFTime (),
                          X3DConstants .outputOnly,  "rebuild",      new Fields .SFTime ());


   this .setBoundedObject (true);
   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);

   // Units

   this ._translation .setUnit ("length");

   // Private properties

   this .parentEnabled  = true;
   this .enabled        = true;
   this .parentMatrix   = new Matrix4 ();
   this .offsetMatrix   = new Matrix4 ();
   this .matrix         = new Matrix4 ();
   this .visibleObjects = [ ];

   this .material = {
      staticFriction: 1,
      dynamicFriction: 1,
      restitution: 0,
   };
}

Object .assign (Object .setPrototypeOf (X3DNBodyCollidableNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   async initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this .PhysX   = await browser .getPhysX ();
      this .physics = await browser .getPhysics ();

      this ._rebuild  .addInterest ("set_child__",          this);
      this ._bboxSize .addInterest ("set_boundedObjects__", this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .boundedObject ?.getBBox (bbox, shadows) .multRight (this .matrix) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getShapes (shapes, parentModelMatrix)
   {
      const modelMatrix = parentModelMatrix .copy () .multLeft (this .matrix);

      for (const visibleObject of this .visibleObjects)
         visibleObject .getShapes (shapes, modelMatrix);

      return shapes;
   },
   setBody (value)
   {
      this ._body = value;

      this .setEnabled (this .parentEnabled);
      this .setLocalPose (this .parentMatrix);
   },
   getBody ()
   {
      return this ._body .getValue ();
   },
   getMatrix ()
   {
      return this .matrix;
   },
   getChild ()
   {
      return this .childNode;
   },
   setChild (childNode)
   {
      // Remove node.

      if (this .childNode)
      {
         const childNode = this .childNode;

         childNode ._isBoundedObject   .removeInterest ("requestRebuild", this);
         childNode ._isPointingObject  .removeInterest ("requestRebuild", this);
         childNode ._isCameraObject    .removeInterest ("requestRebuild", this);
         childNode ._isPickableObject  .removeInterest ("requestRebuild", this);
         childNode ._isCollisionObject .removeInterest ("requestRebuild", this);
         childNode ._isShadowObject    .removeInterest ("requestRebuild", this);
         childNode ._isVisibleObject   .removeInterest ("requestRebuild", this);

         if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
         {
            childNode ._display     .removeInterest ("requestRebuild", this);
            childNode ._bboxDisplay .removeInterest ("requestRebuild", this);
         }
      }

      // Clear node.

      this .childNode       = null;
      this .boundedObject   = null;
      this .pointingObject  = null;
      this .cameraObject    = null;
      this .pickableObject  = null;
      this .collisionObject = null;
      this .shadowObject    = null;

      this .visibleObjects .length = 0;

      // Add node.

      if (childNode)
      {
         childNode ._isBoundedObject   .addInterest ("requestRebuild", this);
         childNode ._isPointingObject  .addInterest ("requestRebuild", this);
         childNode ._isCameraObject    .addInterest ("requestRebuild", this);
         childNode ._isPickableObject  .addInterest ("requestRebuild", this);
         childNode ._isCollisionObject .addInterest ("requestRebuild", this);
         childNode ._isShadowObject    .addInterest ("requestRebuild", this);
         childNode ._isVisibleObject   .addInterest ("requestRebuild", this);

         this .childNode = childNode;

         if (childNode .isVisible ())
         {
            if (childNode .isBoundedObject ())
               this .boundedObject = childNode;

            if (childNode .isPointingObject ())
               this .pointingObject = childNode;

            if (childNode .isCameraObject ())
               this .cameraObject = childNode;

            if (childNode .isPickableObject ())
               this .pickableObject = childNode;

            if (childNode .isCollisionObject ())
               this .collisionObject = childNode;

            if (childNode .isShadowObject ())
               this .shadowObject = childNode;

            if (childNode .isVisibleObject ())
               this .visibleObjects .push (childNode);
         }

         if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
         {
            childNode ._display     .addInterest ("requestRebuild", this);
            childNode ._bboxDisplay .addInterest ("requestRebuild", this);

            if (childNode .isBBoxVisible ())
               this .visibleObjects .push (childNode .getBBoxNode ());
         }
      }

      this .set_boundedObjects__ ();
      this .set_pointingObjects__ ();
      this .set_cameraObjects__ ();
      this .set_pickableObjects__ ();
      this .set_collisionObjects__ ();
      this .set_shadowObjects__ ();
      this .set_visibleObjects__ ();
   },
   set_boundedObjects__ ()
   {
      this .setBoundedObject (this .boundedObject || !this .isDefaultBBoxSize ());
   },
   set_pointingObjects__ ()
   {
      this .setPointingObject (this .pointingObject);
   },
   set_cameraObjects__ ()
   {
      this .setCameraObject (this .cameraObject);
   },
   set_pickableObjects__ ()
   {
      this .setPickableObject (this .pickableObject);
   },
   set_collisionObjects__ ()
   {
      this .setCollisionObject (this .collisionObject);
   },
   set_shadowObjects__ ()
   {
      this .setShadowObject (this .shadowObject);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .length);
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   set_child__ ()
   { },
   eventsProcessed ()
   {
      this .matrix .set (this ._translation .getValue (),
                         this ._rotation    .getValue (),
                         this ._scale       .getValue ());

      if (this .getBody ())
         return;

      this .setLocalPose (this .parentMatrix);
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      switch (type)
      {
         case TraverseType .POINTER:
         {
            this .pointingObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .PICKING:
         {
            // X3DNBodyCollidableNode can't be pickTarget of a X3DPickSensorNode or TransformSensor,
            // so we do not need to add this node to the pickingHierarchy.

            if (this .getBrowser () .getPickable () .at (-1))
            {
               for (const visibleObject of this .visibleObjects)
                  visibleObject .traverse (type, renderObject);
            }
            else
            {
               this .pickableObject ?.traverse (type, renderObject);
            }

            break;
         }
         case TraverseType .COLLISION:
         {
            this .collisionObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .SHADOW:
         {
            this .shadowObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .DISPLAY:
         {
            for (const visibleObject of this .visibleObjects)
               visibleObject .traverse (type, renderObject);

            break;
         }
      }

      modelViewMatrix .pop ();
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DNBodyCollidableNode, X3DNode .getStaticProperties ("X3DNBodyCollidableNode", "RigidBodyPhysics", 1));

export default X3DNBodyCollidableNode;
