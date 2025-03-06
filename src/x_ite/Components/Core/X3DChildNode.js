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

import Fields       from "../../Fields.js";
import X3DNode      from "./X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import TraverseType from "../../Rendering/TraverseType.js";

function X3DChildNode (executionContext)
{
   if (this .getExecutionContext ())
      return;

   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DChildNode);

   this .addChildObjects (X3DConstants .outputOnly, "isPointingObject",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "isCameraObject",    new Fields .SFBool (),
                          X3DConstants .outputOnly, "isPickableObject",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "isCollisionObject", new Fields .SFBool (),
                          X3DConstants .outputOnly, "isShadowObject",    new Fields .SFBool (),
                          X3DConstants .outputOnly, "isVisibleObject",   new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DChildNode .prototype, X3DNode .prototype),
{
   setPointingObject (value)
   {
      if (!!value !== this ._isPointingObject .getValue ())
         this ._isPointingObject = value;
   },
   isPointingObject ()
   {
      return this ._isPointingObject .getValue ();
   },
   setCameraObject (value)
   {
      if (!!value !== this ._isCameraObject .getValue ())
         this ._isCameraObject = value;
   },
   isCameraObject ()
   {
      return this ._isCameraObject .getValue ();
   },
   setPickableObject (value)
   {
      if (!!value !== this ._isPickableObject .getValue ())
         this ._isPickableObject = value;
   },
   isPickableObject ()
   {
      return this ._isPickableObject .getValue ();
   },
   setShadowObject (value)
   {
      if (!!value !== this ._isShadowObject .getValue ())
         this ._isShadowObject = value;
   },
   isShadowObject ()
   {
      return this ._isShadowObject .getValue ();
   },
   setCollisionObject (value)
   {
      if (!!value !== this ._isCollisionObject .getValue ())
         this ._isCollisionObject = value;
   },
   isCollisionObject ()
   {
      return this ._isCollisionObject .getValue ();
   },
   setVisibleObject (value)
   {
      if (!!value !== this ._isVisibleObject .getValue ())
         this ._isVisibleObject = value;
   },
   isVisibleObject ()
   {
      return this ._isVisibleObject .getValue ();
   },
   isVisible ()
   {
      // This function will be overloaded by X3DBoundedObject.
      return true;
   },
   connectChildNode (childNode, exclude)
   {
      if (!exclude ?.includes (TraverseType .POINTER))
      {
         childNode ._isPointingObject .addFieldInterest (this ._isPointingObject);
         this .setPointingObject (childNode .isPointingObject ());
      }

      if (!exclude ?.includes (TraverseType .CAMERA))
      {
         childNode ._isCameraObject .addFieldInterest (this ._isCameraObject);
         this .setCameraObject (childNode .isCameraObject ());
      }

      if (!exclude ?.includes (TraverseType .PICKING))
      {
         childNode ._isPickableObject .addFieldInterest (this ._isPickableObject);
         this .setPickableObject (childNode .isPickableObject ());
      }

      if (!exclude ?.includes (TraverseType .COLLISION))
      {
         childNode ._isCollisionObject .addFieldInterest (this ._isCollisionObject);
         this .setCollisionObject (childNode .isCollisionObject ());
      }

      if (!exclude ?.includes (TraverseType .SHADOW))
      {
         childNode ._isShadowObject .addFieldInterest (this ._isShadowObject);
         this .setShadowObject (childNode .isShadowObject ());
      }

      if (!exclude ?.includes (TraverseType .DISPLAY))
      {
         childNode ._isVisibleObject .addFieldInterest (this ._isVisibleObject);
         this .setVisibleObject (childNode .isVisibleObject ());
      }
   },
   disconnectChildNode (childNode)
   {
      childNode ._isPointingObject  .removeFieldInterest (this ._isPointingObject);
      childNode ._isCameraObject    .removeFieldInterest (this ._isCameraObject);
      childNode ._isPickableObject  .removeFieldInterest (this ._isPickableObject);
      childNode ._isCollisionObject .removeFieldInterest (this ._isCollisionObject);
      childNode ._isShadowObject    .removeFieldInterest (this ._isShadowObject);
      childNode ._isVisibleObject   .removeFieldInterest (this ._isVisibleObject);
   },
});

Object .defineProperties (X3DChildNode, X3DNode .getStaticProperties ("X3DChildNode", "Core", 1));

export default X3DChildNode;
