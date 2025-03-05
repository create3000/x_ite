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

   // Private properties

   this .allowedTypes              = new Set ();
   this .children                  = new Set ();
   this .pointingDeviceSensorNodes = new Set ();
   this .pointingNodes             = new Set ();
   this .clipPlaneNodes            = new Set ();
   this .displayNodes              = new Set ();
   this .cameraObjects             = new Set ();
   this .pickableSensorNodes       = new Set ();
   this .pickableObjects           = new Set ();
   this .collisionObjects          = new Set ();
   this .shadowObjects             = new Set ();
   this .childNodes                = new Set ();
   this .visibleNodes              = new Set ();
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

      this ._addChildren    .addInterest ("set_addChildren__",    this);
      this ._removeChildren .addInterest ("set_removeChildren__", this);
      this ._children       .addInterest ("requestRebuild",       this);

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .getSubBBox (bbox, shadows);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getSubBBox (bbox, shadows)
   {
      return X3DBoundedObject .prototype .getBBox .call (this, this .visibleNodes, bbox, shadows);
   },
   addAllowedTypes (... types)
   {
      for (const type of types)
         this .allowedTypes .add (type);
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

      for (const node of this .children)
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
         this .removeChildren (this ._removeChildren);

         if (!this ._children .isTainted ())
         {
            this ._children .removeInterest ("requestRebuild", this);
            this ._children .addInterest ("connectChildren", this);
         }

         this ._children = Array .from (this ._children) .filter (child => this .children .has (child));
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

      this .children                  .clear ();
      this .pointingDeviceSensorNodes .clear ();
      this .pointingNodes             .clear ();
      this .clipPlaneNodes            .clear ();
      this .displayNodes              .clear ();
      this .cameraObjects             .clear ();
      this .pickableSensorNodes       .clear ();
      this .pickableObjects           .clear ();
      this .collisionObjects          .clear ();
      this .shadowObjects             .clear ();
      this .childNodes                .clear ();
      this .visibleNodes              .clear ();
      this .boundedObjects            .clear ();
   },
   addChildren (children)
   {
      // Order of children must be preserved.

      for (const child of children)
         this .addChild (child);

      // // if (this .getName () === "VisibleNodes")
      // {
      //    // console .warn ("visibleNodes",    this .visibleNodes    .size);
      //    // console .warn ("pointingNodes",   this .pointingNodes   .size);
      //    // console .warn ("pickableObjects", this .pickableObjects .size);
      //    // console .warn ("shadowObjects",   this .shadowObjects   .size);
      //    console .warn ("collisionObjects",   this .collisionObjects   .size);

      //    // for (const node of this .pickableObjects)
      //    //    console .log (node .getTypeName (), node .getName ());
      // }

      this .set_objects__ ();
   },
   addChild (child)
   {
      this .children .add (child);

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
            {
               this .displayNodes .add (childNode);
               continue;
            }
            case X3DConstants .X3DLightNode:
            {
               this .displayNodes .add (childNode);
               continue;
            }
            case X3DConstants .TransformSensor:
            case X3DConstants .X3DPickSensorNode:
            {
               childNode ._isPickableObject .addInterest ("requestRebuild", this);

               if (childNode .isPickableObject ())
                  this .pickableSensorNodes .add (childNode);

               continue;
            }
            case X3DConstants .X3DChildNode:
            {
               childNode ._isPointingObject  .addInterest ("requestRebuild", this);
               childNode ._isCameraObject    .addInterest ("requestRebuild", this);
               childNode ._isPickableObject  .addInterest ("requestRebuild", this);
               childNode ._isCollisionObject .addInterest ("requestRebuild", this);
               childNode ._isShadowObject    .addInterest ("requestRebuild", this);
               childNode ._isVisibleObject   .addInterest ("requestRebuild", this);

               this .childNodes .add (childNode);

               if (childNode .isVisible ())
               {
                  if (childNode .isPointingObject ())
                     this .pointingNodes .add (childNode);

                  if (childNode .isCameraObject ())
                     this .cameraObjects .add (childNode);

                  if (childNode .isPickableObject ())
                     this .pickableObjects .add (childNode);

                  if (childNode .isCollisionObject ())
                     this .collisionObjects .add (childNode);

                  if (childNode .isShadowObject ())
                     this .shadowObjects .add (childNode);

                  if (childNode .isVisibleObject ())
                     this .visibleNodes .add (childNode);
               }

               if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
               {
                  childNode ._display     .addInterest ("requestRebuild", this);
                  childNode ._bboxDisplay .addInterest ("requestRebuild", this);

                  if (childNode .isBBoxVisible ())
                     this .boundedObjects .add (childNode);
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
      this .children .delete (child);

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
            {
               this .displayNodes .delete (childNode);
               continue;
            }
            case X3DConstants .X3DLightNode:
            {
               this .displayNodes .delete (childNode);
               continue;
            }
            case X3DConstants .TransformSensor:
            case X3DConstants .X3DPickSensorNode:
            {
               childNode ._isPickableObject .removeInterest ("requestRebuild", this);

               this .pickableSensorNodes .delete (childNode);
               continue;
            }
            case X3DConstants .X3DChildNode:
            {
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

               this .pointingNodes    .delete (childNode);
               this .cameraObjects    .delete (childNode);
               this .pickableObjects  .delete (childNode);
               this .collisionObjects .delete (childNode);
               this .shadowObjects    .delete (childNode);
               this .childNodes       .delete (childNode);
               this .visibleNodes     .delete (childNode);
               this .boundedObjects   .delete (childNode);
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
      this .set_pointingObjects__ ();
      this .set_cameraObjects__ ();
      this .set_pickableObjects__ ();
      this .set_collisionObjects__ ();
      this .set_shadowObjects__ ();
      this .set_visibleObjects__ ();
   },
   set_pointingObjects__ ()
   {
      this .setPointingObject (this .pointingNodes .size);
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
      this .setVisibleObject (this .visibleNodes .size || this .boundedObjects .size);
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

            for (const pointingNode of this .pointingNodes)
               pointingNode .traverse (type, renderObject);

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
               for (const visibleNode of this .visibleNodes)
                  visibleNode .traverse (type, renderObject);
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

            for (const visibleNode of this .visibleNodes)
               visibleNode .traverse (type, renderObject);

            for (const boundedObject of this .boundedObjects)
               boundedObject .displayBBox (type, renderObject);

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
