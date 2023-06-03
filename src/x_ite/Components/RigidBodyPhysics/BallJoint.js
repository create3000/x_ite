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
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function BallJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .BallJoint);

   this ._anchorPoint .setUnit ("length");

   this .joint             = null;
   this .outputs           = { };
   this .localAnchorPoint1 = new Vector3 (0, 0, 0);
   this .localAnchorPoint2 = new Vector3 (0, 0, 0);
}

BallJoint .prototype = Object .assign (Object .create (X3DRigidJointNode .prototype),
{
   constructor: BallJoint,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",      new Fields .MFString ("NONE")),
      new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",      new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint", new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint", new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "body1",            new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "body2",            new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "BallJoint";
   },
   getComponentName: function ()
   {
      return "RigidBodyPhysics";
   },
   getContainerField: function ()
   {
      return "joints";
   },
   getSpecificationRange: function ()
   {
      return ["3.2", "Infinity"];
   },
   initialize: function ()
   {
      X3DRigidJointNode .prototype .initialize .call (this);

      this ._anchorPoint .addInterest ("set_anchorPoint__", this);
   },
   addJoint: function ()
   {
      if (!this .getCollection ())
         return;

      if (!this .getBody1 ())
         return;

      if (!this .getBody2 ())
         return;

      if (this .getBody1 () .getCollection () !== this .getCollection ())
         return;

      if (this .getBody2 () .getCollection () !== this .getCollection ())
         return;

      this .joint = new Ammo .btPoint2PointConstraint (this .getBody1 () .getRigidBody (),
                                                       this .getBody2 () .getRigidBody (),
                                                       new Ammo .btVector3 (),
                                                       new Ammo .btVector3 ());

      this .set_anchorPoint__ ();

      this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);
   },
   removeJoint: function ()
   {
      if (!this .joint)
         return;

      if (this .getCollection ())
         this .getCollection () .getDynamicsWorld () .removeConstraint (this .joint);

      Ammo .destroy (this .joint);
      this .joint = null;
   },
   set_forceOutput__: function ()
   {
      for (var key in this .outputs)
         delete this .outputs [key];

      for (var i = 0, length = this ._forceOutput .length; i < length; ++ i)
      {
         var value = this ._forceOutput [i];

         if (value == "ALL")
         {
            this .outputs .body1AnchorPoint = true;
            this .outputs .body2AnchorPoint = true;
         }
         else
         {
            this .outputs [value] = true;
         }
      }

      this .setOutput (!$.isEmptyObject (this .outputs));
   },
   set_anchorPoint__: function ()
   {
      if (this .joint)
      {
         var
            localAnchorPoint1 = this .localAnchorPoint1,
            localAnchorPoint2 = this .localAnchorPoint2;

         this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1 .assign (this ._anchorPoint .getValue ()));
         this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this ._anchorPoint .getValue ()));

         this .joint .setPivotA (new Ammo .btVector3 (localAnchorPoint1 .x, localAnchorPoint1 .y, localAnchorPoint1 .z));
         this .joint .setPivotB (new Ammo .btVector3 (localAnchorPoint2 .x, localAnchorPoint2 .y, localAnchorPoint2 .z));
      }
   },
   update1: (function ()
   {
      var localAnchorPoint1 = new Vector3 (0, 0, 0);

      return function ()
      {
         if (this .outputs .body1AnchorPoint)
            this ._body1AnchorPoint = this .getBody1 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix1 () .multVecMatrix (localAnchorPoint1 .assign (this .localAnchorPoint1)));
      };
   })(),
   update2: (function ()
   {
      var localAnchorPoint2 = new Vector3 (0, 0, 0);

      return function ()
      {
         if (this .outputs .body2AnchorPoint)
            this ._body2AnchorPoint = this .getBody2 () .getMatrix () .multVecMatrix (this .getInitialInverseMatrix2 () .multVecMatrix (localAnchorPoint2 .assign (this .localAnchorPoint2)));
      };
   })(),
});

Object .defineProperties (BallJoint,
{
   typeName:
   {
      value: "BallJoint",
   },
   componentName:
   {
      value: "RigidBodyPhysics",
   },
   containerField:
   {
      value: "joints",
   },
   specificationRange:
   {
      value: Object .freeze (["3.2", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",      new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",            new Fields .SFNode ()),
      ]),
   },
});

export default BallJoint;
