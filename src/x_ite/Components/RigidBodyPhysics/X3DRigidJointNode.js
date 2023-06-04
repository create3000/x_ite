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
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";

function X3DRigidJointNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DRigidJointNode);

   this .addChildObjects ("collection", new Fields .SFNode ());

   this .bodyNode1             = null;
   this .bodyNode2             = null;
   this .initialInverseMatrix1 = new Matrix4 ();
   this .initialInverseMatrix2 = new Matrix4 ();
   this .output                = false;
}

X3DRigidJointNode .prototype = Object .assign (Object .create (X3DNode .prototype),
{
   constructor: X3DRigidJointNode,
   initialize: function ()
   {
      X3DNode .prototype .initialize .call (this);

      this ._forceOutput .addInterest ("set_forceOutput__", this);
      this ._body1       .addInterest ("set_body1__",       this);
      this ._body2       .addInterest ("set_body2__",       this);

      this .set_forceOutput__ ();
      this .set_body1__ ();
      this .set_body2__ ();
   },
   setCollection: function (value)
   {
      this .removeJoint ();

      this ._collection = value;

      this .addJoint ();
   },
   getCollection: function ()
   {
      return this ._collection .getValue ();
   },
   getBody1: function ()
   {
      return this .bodyNode1;
   },
   getBody2: function ()
   {
      return this .bodyNode2;
   },
   getInitialInverseMatrix1: function ()
   {
      return this .initialInverseMatrix1;
   },
   getInitialInverseMatrix2: function ()
   {
      return this .initialInverseMatrix2;
   },
   setOutput: function (value)
   {
      this .output = value;

      if (value)
      {
         if (this .bodyNode1)
            this .bodyNode1 .addInterest ("update1", this);

         if (this .bodyNode2)
            this .bodyNode2 .addInterest ("update2", this);
      }
      else
      {
         if (this .bodyNode1)
            this .bodyNode1 .removeInterest ("update1", this);

         if (this .bodyNode2)
            this .bodyNode2 .removeInterest ("update2", this);
      }
   },
   addJoint: function ()
   { },
   removeJoint: function ()
   { },
   set_forceOutput__: function ()
   { },
   set_joint__: function ()
   {
      this .removeJoint ();
      this .addJoint ();
   },
   set_body1__: function ()
   {
      this .removeJoint ();

      if (this .bodyNode1)
      {
         this .bodyNode1 .removeInterest ("update1", this);
         this .bodyNode1 ._collection .removeInterest ("set_joint__", this);
      }

      this .bodyNode1 = X3DCast (X3DConstants .RigidBody, this ._body1);

      if (this .bodyNode1)
      {
         this .bodyNode1 ._collection .addInterest ("set_joint__", this);

         this .initialize1 ();
         this .addJoint ();
         this .setOutput (this .output);
      }
   },
   set_body2__: function ()
   {
      this .removeJoint ();

      if (this .bodyNode2)
      {
         this .bodyNode2 .removeInterest ("update2", this);
         this .bodyNode2 ._collection .removeInterest ("set_joint__", this);
      }

      this .bodyNode2 = X3DCast (X3DConstants .RigidBody, this ._body2);

      if (this .bodyNode2)
      {
         this .bodyNode2 ._collection .addInterest ("set_joint__", this);

         this .initialize2 ();
         this .addJoint ();
         this .setOutput (this .output);
      }
   },
   initialize1: function ()
   {
      this .initialInverseMatrix1 .set (this .bodyNode1 ._position .getValue (), this .bodyNode1 ._orientation .getValue ());
      this .initialInverseMatrix1 .inverse ();
   },
   initialize2: function ()
   {
      this .initialInverseMatrix2 .set (this .bodyNode2 ._position .getValue (), this .bodyNode2 ._orientation .getValue ());
      this .initialInverseMatrix2 .inverse ();
   },
   update1: function ()
   { },
   update2: function ()
   { },
   dispose: function ()
   {
      this .removeJoint ();

      X3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DRigidJointNode,
{
   typeName:
   {
      value: "X3DRigidJointNode",
      enumerable: true,
   },
   componentName:
   {
      value: "RigidBodyPhysics",
      enumerable: true,
   },
});

export default X3DRigidJointNode;
