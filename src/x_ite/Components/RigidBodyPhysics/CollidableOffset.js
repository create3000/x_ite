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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import TraverseType           from "../../Rendering/TraverseType.js";

function CollidableOffset (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableOffset);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (CollidableOffset .prototype, X3DNBodyCollidableNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_collidableGeometry__", this);

      this ._collidable .addFieldInterest (this ._rebuild);

      this ._rebuild .addInterest ("set_collidable__", this);

      this .set_collidable__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .visibleNode ?.getBBox (bbox, shadows) .multRight (this .getMatrix ()) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_collidable__ ()
   {
      // Remove node.

      if (this .collidableNode)
      {
         const collidableNode = this .collidableNode;

         collidableNode .removeInterest ("addNodeEvent", this);
         collidableNode ._compoundShape_changed .removeFieldInterest (this ._compoundShape_changed);

         collidableNode ._isPointingObject .removeFieldInterest (this ._rebuild);
         collidableNode ._isCameraObject   .removeFieldInterest (this ._rebuild);
         collidableNode ._isPickableObject .removeFieldInterest (this ._rebuild);
         collidableNode ._isVisibleObject  .removeFieldInterest (this ._rebuild);

         if (X3DCast (X3DConstants .X3DBoundedObject, collidableNode))
         {
            collidableNode ._display     .removeFieldInterest (this ._rebuild);
            collidableNode ._bboxDisplay .removeFieldInterest (this ._rebuild);
         }
      }

      // Clear node.

      this .collidableNode = null;
      this .pointingNode   = null;
      this .cameraObject   = null;
      this .pickableObject = null;
      this .visibleNode    = null;
      this .boundedObject  = null;

      // Add node.

      const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._collidable);

      if (collidableNode)
      {
         collidableNode .addInterest ("addNodeEvent", this);
         collidableNode ._compoundShape_changed .addFieldInterest (this ._compoundShape_changed);

         collidableNode ._isPointingObject .addFieldInterest (this ._rebuild);
         collidableNode ._isCameraObject   .addFieldInterest (this ._rebuild);
         collidableNode ._isPickableObject .addFieldInterest (this ._rebuild);
         collidableNode ._isVisibleObject  .addFieldInterest (this ._rebuild);

         this .collidableNode = collidableNode;

         if (collidableNode .isVisible ())
         {
            if (collidableNode .isPointingObject ())
               this .pointingNode = collidableNode;

            if (collidableNode .isCameraObject ())
               this .cameraObject = collidableNode;

            if (collidableNode .isPickableObject ())
               this .pickableObject = collidableNode;

            if (collidableNode .isVisibleObject ())
               this .visibleNode = collidableNode;
         }

         if (X3DCast (X3DConstants .X3DBoundedObject, collidableNode))
         {
            collidableNode ._display     .addFieldInterest (this ._rebuild);
            collidableNode ._bboxDisplay .addFieldInterest (this ._rebuild);

            if (collidableNode .isBBoxVisible ())
               this .boundedObject = collidableNode;
         }

         delete this .traverse;
      }
      else
      {
         this .traverse = Function .prototype;
      }

      this .setPointingObject (this .pointingNode);
      this .setCameraObject   (this .cameraObject);
      this .setPickableObject (this .pickableObject);
      this .setVisibleObject  (this .visibleNode);

      this .set_collidableGeometry__ ();
   },
   set_collidableGeometry__ ()
   {
      if (this .getCompoundShape () .getNumChildShapes ())
         this .getCompoundShape () .removeChildShapeByIndex (0);

      if (this .collidableNode && this ._enabled .getValue ())
         this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .collidableNode .getCompoundShape ());

      this ._compoundShape_changed = this .getBrowser () .getCurrentTime ();
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      switch (type)
      {
         case TraverseType .POINTER:
         {
            this .pointingNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .SHADOW:
         {
            this .visibleNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .PICKING:
         {
            const
               browser          = this .getBrowser (),
               pickingHierarchy = browser .getPickingHierarchy ();

            pickingHierarchy .push (this);

            if (browser .getPickable () .at (-1))
               this .visibleNode ?.traverse (type, renderObject);
            else
               this .pickableObject ?.traverse (type, renderObject);

            pickingHierarchy .pop ();
            break;
         }
         case TraverseType .COLLISION:
         {
            this .visibleNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .DISPLAY:
         {
            this .visibleNode   ?.traverse    (type, renderObject);
            this .boundedObject ?.displayBBox (type, renderObject);
            break;
         }
      }

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (CollidableOffset,
{
   ... X3DNode .getStaticProperties ("CollidableOffset", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collidable",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollidableOffset;
