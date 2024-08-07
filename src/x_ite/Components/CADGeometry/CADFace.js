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

   this .childNode     = null;
   this .visibleNode   = null;
   this .boundedObject = null;
}

Object .assign (Object .setPrototypeOf (CADFace .prototype, X3DProductStructureChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DProductStructureChildNode .prototype .initialize .call (this);
      X3DBoundedObject             .prototype .initialize .call (this);

      this ._shape .addInterest ("set_shape__", this);

      this .set_shape__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         return this .visibleNode ?.getBBox (bbox, shadows) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_shape__ ()
   {
      if (this .childNode)
      {
         this .childNode ._isCameraObject   .removeInterest ("set_cameraObject__",     this);
         this .childNode ._isPickableObject .removeInterest ("set_transformSensors__", this);

         this .childNode ._display     .removeInterest ("set_display__",     this);
         this .childNode ._bboxDisplay .removeInterest ("set_bboxDisplay__", this);
      }

      this .childNode = null;

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
                  childNode ._isCameraObject   .addInterest ("set_cameraObject__",     this);
                  childNode ._isPickableObject .addInterest ("set_transformSensors__", this);

                  childNode ._display     .addInterest ("set_display__",     this);
                  childNode ._bboxDisplay .addInterest ("set_bboxDisplay__", this);

                  this .childNode = childNode;
                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }

      if (this .childNode)
      {
         delete this .traverse;
      }
      else
      {
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
      this .setPickableObject (this .visibleNode ?.isPickableObject ());
   },
   set_display__ ()
   {
      if (this .childNode)
         this .visibleNode = this .childNode ._display .getValue () ? this .childNode : null;
      else
         this .visibleNode = null;

      this .set_cameraObject__ ();
      this .set_transformSensors__ ();
   },
   set_bboxDisplay__ ()
   {
      if (this .childNode)
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
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            this .visibleNode ?.traverse (type, renderObject);

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
            this .visibleNode ?.traverse (type, renderObject);

            this .boundedObject ?.displayBBox (type, renderObject);
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
