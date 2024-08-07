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
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function MotorJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .MotorJoint);

   // Units

   this ._axis1Angle      .setUnit ("angle");
   this ._axis2Angle      .setUnit ("angle");
   this ._axis3Angle      .setUnit ("angle");
   this ._motor1Angle     .setUnit ("angle");
   this ._motor2Angle     .setUnit ("angle");
   this ._motor3Angle     .setUnit ("angle");
   this ._motor1AngleRate .setUnit ("angularRate");
   this ._motor2AngleRate .setUnit ("angularRate");
   this ._motor3AngleRate .setUnit ("angularRate");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this ._motor1Axis = new Vector3 ();
      this ._motor2Axis = new Vector3 ();
      this ._motor3Axis = new Vector3 ();
   }
}

Object .setPrototypeOf (MotorJoint .prototype, X3DRigidJointNode .prototype);

Object .defineProperties (MotorJoint,
{
   typeName:
   {
      value: "MotorJoint",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "RigidBodyPhysics", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "joints",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "autoCalc",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "forceOutput",          new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis1Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis2Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis3Angle",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis1Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis2Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axis3Torque",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabledAxes",          new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor1Axis",           new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor2Axis",           new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "motor3Axis",           new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop1Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop2Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop3Bounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop1ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop2ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stop3ErrorCorrection", new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor1Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor2Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor3Angle",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor1AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor2AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "motor3AngleRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "body1",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "body2",                new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default MotorJoint;
