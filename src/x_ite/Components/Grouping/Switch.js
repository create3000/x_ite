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

   // Private properties

   this .childNode     = null;
   this .visibleNode   = null;
   this .boundedObject = null;
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
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
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
      if (this .childNode)
      {
         this .childNode ._isCameraObject   .removeInterest ("set_cameraObject__",     this);
         this .childNode ._isPickableObject .removeInterest ("set_transformSensors__", this);
      }

      if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
      {
         this .childNode ._display     .removeInterest ("set_display__",     this);
         this .childNode ._bboxDisplay .removeInterest ("set_bboxDisplay__", this);
      }

      const whichChoice = this ._whichChoice .getValue ();

      if (whichChoice >= 0 && whichChoice < this ._children .length)
      {
         this .childNode = X3DCast (X3DConstants .X3DChildNode, this ._children [whichChoice]);

         if (this .childNode)
         {
            this .childNode ._isCameraObject   .addInterest ("set_cameraObject__",     this);
            this .childNode ._isPickableObject .addInterest ("set_transformSensors__", this);

            if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
            {
               this .childNode ._display     .addInterest ("set_display__",     this);
               this .childNode ._bboxDisplay .addInterest ("set_bboxDisplay__", this);
            }

            delete this .traverse;
         }
      }
      else
      {
         this .childNode = null;

         this .traverse = Function .prototype;
      }

      this .set_display__ ();
      this .set_bboxDisplay__ ();
   },
   set_cameraObject__ ()
   {
      this .setCameraObject (this .visibleNode ?.isCameraObject ());
   },
   set_transformSensors__ ()
   {
      this .setPickableObject (this .getTransformSensors () .size || this .visibleNode ?.isPickableObject ());
   },
   set_display__ ()
   {
      if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
         this .visibleNode = this .childNode ._display .getValue () ? this .childNode : null;
      else
         this .visibleNode = this .childNode;

      this .set_cameraObject__ ();
      this .set_transformSensors__ ();
   },
   set_bboxDisplay__ ()
   {
      if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
         this .boundedObject = this .childNode ._bboxDisplay .getValue () ? this .childNode : null;
      else
         this .boundedObject = null;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         case TraverseType .CAMERA:
         case TraverseType .SHADOW:
         {
            this .visibleNode ?.traverse (type, renderObject);
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

            const visibleNode = this .visibleNode;

            if (visibleNode)
            {
               const
                  browser          = this .getBrowser (),
                  pickingHierarchy = browser .getPickingHierarchy ();

               pickingHierarchy .push (this);

               visibleNode .traverse (type, renderObject);

               pickingHierarchy .pop ();
            }

            return;
         }
         case TraverseType .COLLISION:
         {
            this .visibleNode ?.traverse (type, renderObject);
            return;
         }
         case TraverseType .DISPLAY:
         {
            this .visibleNode ?.traverse (type, renderObject);

            this .boundedObject ?.displayBBox (type, renderObject);
            return;
         }
      }
   },
});

Object .defineProperties (Switch, X3DNode .staticProperties ("Switch", "Grouping", 2, "children", "2.0", "Infinity"));

Object .defineProperties (Switch,
{
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
