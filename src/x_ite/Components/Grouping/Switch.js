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
import X3DGroupingNode      from "./X3DGroupingNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Switch (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .Switch);

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("choice", this ._children);
}

Object .assign (Object .setPrototypeOf (Switch .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._whichChoice .addInterest ("requestRebuild", this);
   },
   getSubBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .boundedObject ?.getBBox (bbox, shadows) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   clearChildren ()
   { },
   addChildren ()
   {
      this .set_children__ ();
   },
   removeChildren ()
   {
      this .set_children__ ();
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
      this .visibleObject   = null;
      this .bboxObject      = null;

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
               this .visibleObject = childNode;
         }

         if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
         {
            childNode ._display     .addInterest ("requestRebuild", this);
            childNode ._bboxDisplay .addInterest ("requestRebuild", this);

            if (childNode .isBBoxVisible ())
               this .bboxObject = childNode;
         }
      }

      this .set_objects__ ();
   },
   set_children__ ()
   {
      const whichChoice = this ._whichChoice .getValue ();

      if (whichChoice >= 0 && whichChoice < this ._children .length)
      {
         this .setChild (X3DCast (X3DConstants .X3DChildNode, this ._children [whichChoice]));
      }
      else
      {
         this .setChild (null);
      }
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
      this .setPickableObject (this .getTransformSensors () .size || this .pickableObject);
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
      this .setVisibleObject (this .visibleObject || this .bboxObject);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         {
            this .pointingObject ?.traverse (type, renderObject);
            return;
         }
         case TraverseType .CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
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

            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            if (browser .getPickable () .at (-1))
               this .visibleObject ?.traverse (type, renderObject);
            else
               this .pickableObject ?.traverse (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .COLLISION:
         {
            this .collisionObject ?.traverse (type, renderObject);
            return;
         }
         case TraverseType .SHADOW:
         {
            this .shadowObject ?.traverse (type, renderObject);
            return;
         }
         case TraverseType .DISPLAY:
         {
            this .visibleObject ?.traverse    (type, renderObject);
            this .bboxObject    ?.displayBBox (type, renderObject);
            return;
         }
      }
   },
});

Object .defineProperties (Switch,
{
   ... X3DNode .getStaticProperties ("Switch", "Grouping", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichChoice",    new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Switch;
