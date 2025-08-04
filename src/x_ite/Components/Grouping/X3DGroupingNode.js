import Fields           from "../../Fields.js";
import X3DNode          from "../Core/X3DNode.js";
import X3DChildNode     from "../Core/X3DChildNode.js";
import X3DBoundedObject from "./X3DBoundedObject.js";
import TraverseType     from "../../Rendering/TraverseType.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import X3DCast          from "../../Base/X3DCast.js";

function X3DGroupingNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DGroupingNode);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFTime ());

   this .setBoundedObject (true);
   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);

   // Private properties

   this .allowedTypes              = new Set ();
   this .pointingDeviceSensorNodes = new Set ();
   this .pointingObjects           = new Set ();
   this .clipPlaneNodes            = new Set ();
   this .displayNodes              = new Set ();
   this .cameraObjects             = new Set ();
   this .pickableSensorNodes       = new Set ();
   this .pickableObjects           = new Set ();
   this .collisionObjects          = new Set ();
   this .shadowObjects             = new Set ();
   this .childNodes                = new Set ();
   this .visibleObjects            = new Set ();
   this .boundedObjects            = new Set ();
   this .sensors                   = [ ];
}

Object .assign (Object .setPrototypeOf (X3DGroupingNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._rebuild          .addInterest ("set_children__",        this);
      this ._transformSensors .addInterest ("set_pickableObjects__", this);

      this ._bboxSize       .addInterest ("set_boundedObjects__", this);
      this ._addChildren    .addInterest ("set_addChildren__",    this);
      this ._removeChildren .addInterest ("set_removeChildren__", this);
      this ._children       .addInterest ("requestRebuild",       this);

      this .set_children__ ();
   },
   addAllowedTypes (... types)
   {
      for (const type of types)
         this .allowedTypes .add (type);
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .getSubBBox (bbox, shadows);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getSubBBox (bbox, shadows)
   {
      return X3DBoundedObject .prototype .getBBox .call (this, this .boundedObjects, bbox, shadows);
   },
   getShapes (shapes, modelViewMatrix)
   {
      for (const visibleObject of this .visibleObjects)
         visibleObject .getShapes (shapes, modelViewMatrix);

      return shapes;
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   set_addChildren__ ()
   {
      if (this ._addChildren .length === 0)
         return;

      this ._addChildren .setTainted (true);

      const addChildren = new Set (this ._addChildren);

      for (const node of this ._children)
         addChildren .delete (node);

      this .addChildren (addChildren);

      if (!this ._children .isTainted ())
      {
         this ._children .removeInterest ("requestRebuild", this);
         this ._children .addInterest ("connectChildren", this);
      }

      for (const child of addChildren)
         this ._children .push (child);

      this ._addChildren .length = 0;
      this ._addChildren .setTainted (false);
   },
   set_removeChildren__ ()
   {
      if (this ._removeChildren .length === 0)
         return;

      this ._removeChildren .setTainted (true);

      if (this ._children .length > 0)
      {
         const removeChildren = new Set (this ._removeChildren);

         this .removeChildren (removeChildren);

         if (!this ._children .isTainted ())
         {
            this ._children .removeInterest ("requestRebuild", this);
            this ._children .addInterest ("connectChildren", this);
         }

         this ._children = this ._children .filter (child => !removeChildren .has (child));
      }

      this ._removeChildren .length = 0;
      this ._removeChildren .setTainted (false);
   },
   set_children__ ()
   {
      this .clearChildren ();
      this .addChildren (this ._children);
   },
   connectChildren ()
   {
      this ._children .removeInterest ("connectChildren", this);
      this ._children .addInterest ("requestRebuild", this);
   },
   clearChildren ()
   {
      for (const childNode of this .childNodes)
      {
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

      this .boundedObjects            .clear ();
      this .pointingDeviceSensorNodes .clear ();
      this .pointingObjects           .clear ();
      this .clipPlaneNodes            .clear ();
      this .displayNodes              .clear ();
      this .cameraObjects             .clear ();
      this .pickableSensorNodes       .clear ();
      this .pickableObjects           .clear ();
      this .collisionObjects          .clear ();
      this .shadowObjects             .clear ();
      this .childNodes                .clear ();
      this .visibleObjects            .clear ();
   },
   addChildren (children)
   {
      // Make sure that the order of children is preserved,
      // otherwise flickering of transparent objects may occur.

      for (const child of children)
         this .addChild (child);

      this .set_objects__ ();
   },
   addChild (child)
   {
      const childNode = X3DCast (X3DConstants .X3DChildNode, child);

      if (!childNode)
         return;

      const type = childNode .getType ();

      if (this .allowedTypes .size)
      {
         if (!type .some (Set .prototype .has, this .allowedTypes))
            return;
      }

      for (let t = type .length - 1; t >= 0; -- t)
      {
         switch (type [t])
         {
            case X3DConstants .X3DPointingDeviceSensorNode:
            {
               this .pointingDeviceSensorNodes .add (childNode);
               continue;
            }
            case X3DConstants .ClipPlane:
            {
               this .clipPlaneNodes .add (childNode);
               this .displayNodes   .add (childNode);
               continue;
            }
            case X3DConstants .LocalFog:
            case X3DConstants .X3DLightNode:
            {
               this .displayNodes .add (childNode);
               continue;
            }
            case X3DConstants .TransformSensor:
            case X3DConstants .X3DPickSensorNode:
            {
               if (childNode .isPickableObject ())
                  this .pickableSensorNodes .add (childNode);

               continue;
            }
            case X3DConstants .X3DChildNode:
            {
               childNode ._isBoundedObject   .addInterest ("requestRebuild", this);
               childNode ._isPointingObject  .addInterest ("requestRebuild", this);
               childNode ._isCameraObject    .addInterest ("requestRebuild", this);
               childNode ._isPickableObject  .addInterest ("requestRebuild", this);
               childNode ._isCollisionObject .addInterest ("requestRebuild", this);
               childNode ._isShadowObject    .addInterest ("requestRebuild", this);
               childNode ._isVisibleObject   .addInterest ("requestRebuild", this);

               this .childNodes .add (childNode);

               if (childNode .isVisible ())
               {
                  if (childNode .isBoundedObject ())
                     this .boundedObjects .add (childNode);

                  if (childNode .isPointingObject ())
                     this .pointingObjects .add (childNode);

                  if (childNode .isCameraObject ())
                     this .cameraObjects .add (childNode);

                  if (childNode .isPickableObject () && !this .pickableSensorNodes .has (childNode))
                     this .pickableObjects .add (childNode);

                  if (childNode .isCollisionObject ())
                     this .collisionObjects .add (childNode);

                  if (childNode .isShadowObject ())
                     this .shadowObjects .add (childNode);

                  if (childNode .isVisibleObject ())
                     this .visibleObjects .add (childNode);
               }

               if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
               {
                  childNode ._display     .addInterest ("requestRebuild", this);
                  childNode ._bboxDisplay .addInterest ("requestRebuild", this);

                  if (childNode .isBBoxVisible ())
                     this .visibleObjects .add (childNode .getBBoxNode ());
               }

               break;
            }
            default:
               continue;
         }

         break;
      }
   },
   removeChildren (children)
   {
      for (const child of children)
         this .removeChild (child);

      this .set_objects__ ();
   },
   removeChild (child)
   {
      const childNode = X3DCast (X3DConstants .X3DChildNode, child);

      if (!childNode)
         return;

      const type = childNode .getType ();

      for (let t = type .length - 1; t >= 0; -- t)
      {
         switch (type [t])
         {
            case X3DConstants .X3DPointingDeviceSensorNode:
            {
               this .pointingDeviceSensorNodes .delete (childNode);
               continue;
            }
            case X3DConstants .ClipPlane:
            {
               this .clipPlaneNodes .delete (childNode);
               this .displayNodes   .delete (childNode);
               continue;
            }
            case X3DConstants .LocalFog:
            case X3DConstants .X3DLightNode:
            {
               this .displayNodes .delete (childNode);
               continue;
            }
            case X3DConstants .TransformSensor:
            case X3DConstants .X3DPickSensorNode:
            {
               this .pickableSensorNodes .delete (childNode);
               continue;
            }
            case X3DConstants .X3DChildNode:
            {
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

               this .boundedObjects   .delete (childNode);
               this .pointingObjects  .delete (childNode);
               this .cameraObjects    .delete (childNode);
               this .pickableObjects  .delete (childNode);
               this .collisionObjects .delete (childNode);
               this .shadowObjects    .delete (childNode);
               this .childNodes       .delete (childNode);
               this .visibleObjects   .delete (childNode);
               break;
            }
            default:
               continue;
         }

         break;
      }
   },
   set_objects__ ()
   {
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
      this .setBoundedObject (this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
   set_pointingObjects__ ()
   {
      this .setPointingObject (this .pointingObjects .size);
   },
   set_cameraObjects__ ()
   {
      this .setCameraObject (this .cameraObjects .size);
   },
   set_pickableObjects__ ()
   {
      this .setPickableObject (this .getTransformSensors () .size || this .pickableSensorNodes .size || this .pickableObjects .size);
   },
   set_collisionObjects__ ()
   {
      this .setCollisionObject (this .collisionObjects .size);
   },
   set_shadowObjects__ ()
   {
      this .setShadowObject (this .shadowObjects .size);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         {
            const
               pointingDeviceSensorNodes = this .pointingDeviceSensorNodes,
               clipPlaneNodes            = this .clipPlaneNodes,
               sensors                   = this .sensors;

            sensors .length = 0;

            if (pointingDeviceSensorNodes .size)
            {
               for (const pointingDeviceSensorNode of pointingDeviceSensorNodes)
                  pointingDeviceSensorNode .push (renderObject, sensors);

               if (sensors .length)
                  renderObject .getSensors () .push (sensors);
            }

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .push (renderObject);

            for (const pointingObject of this .pointingObjects)
               pointingObject .traverse (type, renderObject);

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .pop (renderObject);

            if (sensors .length)
               renderObject .getSensors () .pop ();

            return;
         }
         case TraverseType .CAMERA:
         {
            for (const cameraObject of this .cameraObjects)
               cameraObject .traverse (type, renderObject);

            return;
         }
         case TraverseType .PICKING:
         {
            if (this .getTransformSensors () .size)
            {
               const modelMatrix = renderObject .getModelViewMatrix () .get ();

               for (const transformSensorNode of this .getTransformSensors ())
                  transformSensorNode .collect (modelMatrix);
            }

            for (const pickableSensorNode of this .pickableSensorNodes)
               pickableSensorNode .traverse (type, renderObject);

            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            if (browser .getPickable () .at (-1))
            {
               for (const visibleObject of this .visibleObjects)
                  visibleObject .traverse (type, renderObject);
            }
            else
            {
               for (const pickableObject of this .pickableObjects)
                  pickableObject .traverse (type, renderObject);
            }

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .COLLISION:
         {
            const clipPlaneNodes = this .clipPlaneNodes;

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .push (renderObject);

            for (const collisionObject of this .collisionObjects)
               collisionObject .traverse (type, renderObject);

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .pop (renderObject);

            return;
         }
         case TraverseType .SHADOW:
         {
            // Nodes that are not visible do not cast shadows.

            const clipPlaneNodes = this .clipPlaneNodes;

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .push (renderObject);

            for (const shadowObject of this .shadowObjects)
               shadowObject .traverse (type, renderObject);

            for (const clipPlaneNode of clipPlaneNodes)
               clipPlaneNode .pop (renderObject);

            return;
         }
         case TraverseType .DISPLAY:
         {
            const displayNodes = this .displayNodes;

            for (const displayNode of displayNodes)
               displayNode .push (renderObject, this);

            for (const visibleObject of this .visibleObjects)
               visibleObject .traverse (type, renderObject);

            for (const displayNode of displayNodes)
               displayNode .pop (renderObject);

            return;
         }
      }
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DGroupingNode, X3DNode .getStaticProperties ("X3DGroupingNode", "Grouping", 1));

export default X3DGroupingNode;
