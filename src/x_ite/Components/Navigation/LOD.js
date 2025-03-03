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
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function LOD (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .LOD);

   this .setVisibleObject (true);

   // Units

   this ._center .setUnit ("length");
   this ._range  .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("level", this ._children); // VRML2

   // Private properties

   this .frameRate        = 60;
   this .keepCurrentLevel = false;
}

Object .assign (Object .setPrototypeOf (LOD .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._children .addInterest ("set_child__", this);
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
      this .set_level__ (Math .min (this ._level_changed .getValue (), this ._children .length - 1));
   },
   set_level__ (level)
   {
      // Remove node.

      if (this .childNode)
      {
         const childNode = this .childNode;

         childNode ._isCameraObject   .removeInterest ("set_child__", this);
         childNode ._isPickableObject .removeInterest ("set_child__", this);
         childNode ._isVisibleObject  .removeInterest ("set_child__", this);

         if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
         {
            childNode ._display     .removeInterest ("set_child__", this);
            childNode ._bboxDisplay .removeInterest ("set_child__", this);
         }
      }

      this .childNode = null;

      // Add node.

      if (level >= 0 && level < this ._children .length)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, this ._children [level]);

         if (childNode)
         {
            childNode ._isCameraObject   .addInterest ("set_child__", this);
            childNode ._isPickableObject .addInterest ("set_child__", this);
            childNode ._isVisibleObject  .addInterest ("set_child__", this);

            this .childNode = childNode;

            if (childNode .isCameraObject ())
               this .cameraObject = childNode;

            if (childNode .isVisibleObject ())
            {
               this .visibleNode = childNode;

               if (childNode .isPickableObject ())
                  this .pickableObject = childNode;
            }

            if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
            {
               childNode ._display     .addInterest ("set_child__", this);
               childNode ._bboxDisplay .addInterest ("set_child__", this);

               if (childNode .isBBoxVisible ())
                  this .boundedObject = childNode;
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
   getLevel: (() =>
   {
      const
         FRAMES         = 180, // Number of frames after wich a level change takes in affect.
         FRAME_RATE_MIN = 20,  // Lowest level of detail.
         FRAME_RATE_MAX = 55;  // Highest level of detail.

      return function (browser, modelViewMatrix)
      {
         if (this ._range .length === 0)
         {
            this .frameRate = ((FRAMES - 1) * this .frameRate + browser .currentFrameRate) / FRAMES;

            const size = this ._children .length;

            switch (size)
            {
               case 0:
                  return -1;
               case 1:
                  return 0;
               case 2:
                  return +(this .frameRate > FRAME_RATE_MAX);
               default:
               {
                  const fraction = 1 - Algorithm .clamp ((this .frameRate - FRAME_RATE_MIN) / (FRAME_RATE_MAX - FRAME_RATE_MIN), 0, 1);

                  return Math .min (Math .floor (fraction * size), size - 1);
               }
            }
         }

         const distance = modelViewMatrix .translate (this ._center .getValue ()) .origin .magnitude ();

         return Algorithm .upperBound (this ._range, 0, this ._range .length, distance);
      };
   })(),
   traverse: (() =>
   {
      const modelViewMatrix = new Matrix4 ();

      return function (type, renderObject)
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
               if (!this .keepCurrentLevel)
               {
                  let
                     level        = this .getLevel (this .getBrowser (), modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ())),
                     currentLevel = this ._level_changed .getValue ();

                  if (this ._forceTransitions .getValue ())
                  {
                     if (level > currentLevel)
                        level = currentLevel + 1;

                     else if (level < currentLevel)
                        level = currentLevel - 1;
                  }

                  if (level !== currentLevel)
                  {
                     this ._level_changed = level;

                     this .set_level__ (Math .min (level, this ._children .length - 1));
                  }
               }

               this .visibleNode   ?.traverse    (type, renderObject);
               this .boundedObject ?.displayBBox (type, renderObject);
               return;
            }
         }
      };
   })(),
});

Object .defineProperties (LOD,
{
   ... X3DNode .getStaticProperties ("LOD", "Navigation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "forceTransitions", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "range",            new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed",    new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LOD;
