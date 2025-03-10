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

import Fields                       from "../../Fields.js";
import X3DFieldDefinition           from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray         from "../../Base/FieldDefinitionArray.js";
import X3DNode                      from "../Core/X3DNode.js";
import X3DProductStructureChildNode from "./X3DProductStructureChildNode.js";
import X3DBoundedObject             from "../Grouping/X3DBoundedObject.js";
import X3DConstants                 from "../../Base/X3DConstants.js";
import TraverseType                 from "../../Rendering/TraverseType.js";
import X3DCast                      from "../../Base/X3DCast.js";

function CADFace (executionContext)
{
   X3DProductStructureChildNode .call (this, executionContext);
   X3DBoundedObject             .call (this, executionContext);

   this .addType (X3DConstants .CADFace);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFTime ());

   this .setBoundedObject (true);
   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);
}

Object .assign (Object .setPrototypeOf (CADFace .prototype, X3DProductStructureChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DProductStructureChildNode .prototype .initialize .call (this);
      X3DBoundedObject             .prototype .initialize .call (this);

      this ._rebuild  .addInterest ("set_children__",       this);
      this ._bboxSize .addInterest ("set_boundedObjects__", this);
      this ._shape    .addInterest ("requestRebuild",       this);

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .boundedObject ?.getBBox (bbox, shadows) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   set_children__ ()
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

      const childNode = X3DCast (X3DConstants .X3DChildNode, this ._shape);

      if (childNode)
      {
         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .LOD:
               case X3DConstants .Transform:
               case X3DConstants .X3DShapeNode:
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

                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }

      this .set_pointingObjects__ ();
      this .set_cameraObjects__ ();
      this .set_pickableObjects__ ();
      this .set_collisionObjects__ ();
      this .set_shadowObjects__ ();
      this .set_visibleObjects__ ();
      this .set_boundedObjects__ ();
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
   dispose ()
   {
      X3DBoundedObject             .prototype .dispose .call (this);
      X3DProductStructureChildNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (CADFace,
{
   ... X3DNode .getStaticProperties ("CADFace", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shape",       new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CADFace;
