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
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo             from "../../../lib/ammojs/AmmoClass.js";

function X3DNBodyCollidableNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DNBodyCollidableNode);

   this .addChildObjects (X3DConstants .inputOutput, "body",                  new Fields .SFNode (),
                          X3DConstants .outputOnly,  "compoundShape_changed", new Fields .SFTime ());

   // Units

   this ._translation .setUnit ("length");

   // Members

   this .compoundShape  = new Ammo .btCompoundShape ()
   this .offset         = new Vector3 ();
   this .matrix         = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (X3DNBodyCollidableNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
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
   eventsProcessed ()
   {
      this .matrix .set (this ._translation .getValue (),
                         this ._rotation    .getValue ());

      if (this .compoundShape .getNumChildShapes ())
         this .compoundShape .updateChildTransform (0, this .getLocalTransform (), true);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DNBodyCollidableNode, X3DNode .staticProperties ("X3DNBodyCollidableNode", "RigidBodyPhysics", 1));

export default X3DNBodyCollidableNode;
