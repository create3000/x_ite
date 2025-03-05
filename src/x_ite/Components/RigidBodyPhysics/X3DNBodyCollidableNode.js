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

   this .addChildObjects (X3DConstants .outputOnly, "body",          new Fields .SFNode (),
                          X3DConstants .outputOnly, "compoundShape", new Fields .SFTime (),
                          X3DConstants .outputOnly, "rebuild",       new Fields .SFTime ());

   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);

   // Units

   this ._translation .setUnit ("length");

   // Members

   this .compoundShape = new Ammo .btCompoundShape ()
   this .offset        = new Vector3 ();
   this .matrix        = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (X3DNBodyCollidableNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._rebuild .addInterest ("set_child__", this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .visibleNode ?.getBBox (bbox, shadows) .multRight (this .getMatrix ()) ?? bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getLocalTransform: (() =>
   {
      var
         m = new Matrix4 (),
         o = new Ammo .btVector3 (0, 0, 0),
         l = new Ammo .btTransform ();

      return function ()
      {
         m .assign (this .getMatrix ());
         m .translate (this .offset);

         //this .localTransform .setFromOpenGLMatrix (m);

         o .setValue (m [12], m [13], m [14]);

         l .getBasis () .setValue (m [0], m [4], m [8],
                                   m [1], m [5], m [9],
                                   m [2], m [6], m [10]);

         l .setOrigin (o);

         return l;
      };
   })(),
   setBody (value)
   {
      this ._body = value;
   },
   getBody ()
   {
      return this ._body .getValue ();
   },
   getCompoundShape ()
   {
      return this .compoundShape;
   },
   setOffset (x, y, z)
   {
      this .offset .set (x, y, z);
   },
   getOffset ()
   {
      return this .offset;
   },
   getMatrix ()
   {
      return this .matrix;
   },
   getChild ()
   {
      return this .childNode;
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   set_child__ (childNode)
   {
      // Remove node.

      if (this .childNode)
      {
         const childNode = this .childNode;

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

      this .childNode  = null;
      this .pointingNode    = null;
      this .cameraObject    = null;
      this .pickableObject  = null;
      this .collisionObject = null;
      this .shadowObject    = null;
      this .visibleNode     = null;
      this .boundedObject   = null;

      // Add node.

      if (childNode)
      {
         childNode ._isPointingObject  .addInterest ("requestRebuild", this);
         childNode ._isCameraObject    .addInterest ("requestRebuild", this);
         childNode ._isPickableObject  .addInterest ("requestRebuild", this);
         childNode ._isCollisionObject .addInterest ("requestRebuild", this);
         childNode ._isShadowObject    .addInterest ("requestRebuild", this);
         childNode ._isVisibleObject   .addInterest ("requestRebuild", this);

         this .childNode = childNode;

         if (childNode .isVisible ())
         {
            if (childNode .isPointingObject ())
               this .pointingNode = childNode;

            if (childNode .isCameraObject ())
               this .cameraObject = childNode;

            if (childNode .isPickableObject ())
               this .pickableObject = childNode;

            if (childNode .isCollisionObject ())
               this .collisionObject = childNode;

            if (childNode .isShadowObject ())
               this .shadowObject = childNode;

            if (childNode .isVisibleObject ())
               this .visibleNode = childNode;
         }

         if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
         {
            childNode ._display     .addInterest ("requestRebuild", this);
            childNode ._bboxDisplay .addInterest ("requestRebuild", this);

            if (childNode .isBBoxVisible ())
               this .boundedObject = childNode;
         }

         delete this .traverse;
      }
      else
      {
         this .traverse = Function .prototype;
      }

      this .setPointingObject  (this .pointingNode);
      this .setCameraObject    (this .cameraObject);
      this .setPickableObject  (this .pickableObject);
      this .setCollisionObject (this .collisionObject);
      this .setShadowObject    (this .shadowObject);
      this .setVisibleObject   (this .visibleNode);
   },
   eventsProcessed ()
   {
      this .matrix .set (this ._translation .getValue (),
                         this ._rotation    .getValue ());

      if (this .compoundShape .getNumChildShapes ())
         this .compoundShape .updateChildTransform (0, this .getLocalTransform (), true);
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
            this .pointingNode ?.traverse (type, renderObject);
            break;
         }
         case TraverseType .CAMERA:
         {
            this .cameraObject ?.traverse (type, renderObject);
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
            this .visibleNode   ?.traverse (type, renderObject);
            this .boundedObject ?.displayBBox (type, renderObject);
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
