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

      this ._whichChoice .addInterest ("set_child__", this);
      this ._children    .addInterest ("set_child__", this);

      this .set_child__ ();
   },
   getSubBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
      {
         const boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .visibleNode);

         return boundedObject ?.getBBox (bbox, shadows) ?? bbox .set ();
      }

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   clear () { },
   add () { },
   remove () { },
   set_child__ ()
   {
      // Remove node.

      if (this .childNode)
      {
         this .childNode ._isCameraObject   .removeInterest ("set_child__", this);
         this .childNode ._isPickableObject .removeInterest ("set_child__", this);
      }

      if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
      {
         this .childNode ._display     .removeInterest ("set_child__", this);
         this .childNode ._bboxDisplay .removeInterest ("set_child__", this);
      }

      this .childNode = null;

      // Add node.

      const whichChoice = this ._whichChoice .getValue ();

      if (whichChoice >= 0 && whichChoice < this ._children .length)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, this ._children [whichChoice]);

         if (childNode)
         {
            childNode ._isCameraObject   .addInterest ("set_child__", this);
            childNode ._isPickableObject .addInterest ("set_child__", this);

            this .childNode = childNode;

            if (childNode .isCameraObject ())
               this .cameraObject = childNode;

            if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
            {
               childNode ._display     .addInterest ("set_child__", this);
               childNode ._bboxDisplay .addInterest ("set_child__", this);

               if (this .childNode .isVisible ())
               {
                  this .visibleNode = childNode;

                  if (childNode .isPickableObject ())
                     this .pickableObject = childNode;
               }

               if (childNode .isBBoxVisible ())
                  this .boundedObject = childNode;
            }
            else
            {
               this .visibleNode = childNode;

               if (childNode .isPickableObject ())
                  this .pickableObject = childNode;
            }
         }
      }

      this .set_cameraObjects__ ();
      this .set_transformSensors__ ();
   },
   set_cameraObjects__ ()
   {
      this .setCameraObject (this .cameraObject ?.isCameraObject ());
   },
   set_transformSensors__ ()
   {
      this .setPickableObject (this .getTransformSensors () .size || this .pickableObject);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         case TraverseType .SHADOW:
         {
            this .visibleNode ?.traverse (type, renderObject);
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
               this .visibleNode ?.traverse (type, renderObject);
            else
               this .pickableObject ?.traverse (type, renderObject);

            pickingHierarchy .pop ();
            return;
         }
         case TraverseType .COLLISION:
         {
            this .visibleNode ?.traverse (type, renderObject);
            return;
         }
         case TraverseType .DISPLAY:
         {
            this .visibleNode   ?.traverse    (type, renderObject);
            this .boundedObject ?.displayBBox (type, renderObject);
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
