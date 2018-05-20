/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/RigidBodyPhysics/X3DRigidJointNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"lib/ammojs/ammo",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DRigidJointNode, 
          X3DConstants,
          Vector3,
          Ammo)
{
"use strict";

	function DoubleAxisHingeJoint (executionContext)
	{
		X3DRigidJointNode .call (this, executionContext);

		this .addType (X3DConstants .DoubleAxisHingeJoint);

		this .anchorPoint_             .setUnit ("length");
		this .minAngle1_               .setUnit ("angle");
		this .maxAngle1_               .setUnit ("angle");
		this .desiredAngularVelocity1_ .setUnit ("angularRate");
		this .desiredAngularVelocity2_ .setUnit ("angularRate");
		this .stopConstantForceMix1_   .setUnit ("force");
		this .suspensionForce_         .setUnit ("force");

		this .joint   = null;
		this .outputs = { };
	}

	DoubleAxisHingeJoint .prototype = Object .assign (Object .create (X3DRigidJointNode .prototype),
	{
		constructor: DoubleAxisHingeJoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",               new Fields .MFString ("NONE")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",               new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "axis1",                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "axis2",                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "minAngle1",                 new Fields .SFFloat (-3.14159)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxAngle1",                 new Fields .SFFloat (3.14159)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "desiredAngularVelocity1",   new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "desiredAngularVelocity2",   new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxTorque1",                new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxTorque2",                new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopBounce1",               new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopConstantForceMix1",     new Fields .SFFloat (0.001)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopErrorCorrection1",      new Fields .SFFloat (0.8)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "suspensionForce",           new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "suspensionErrorCorrection", new Fields .SFFloat (0.8)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint",          new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint",          new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body1Axis",                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body2Axis",                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge1Angle",               new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge2Angle",               new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge1AngleRate",           new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "hinge2AngleRate",           new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body1",                     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body2",                     new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "DoubleAxisHingeJoint";
		},
		getComponentName: function ()
		{
			return "RigidBodyPhysics";
		},
		getContainerField: function ()
		{
			return "joints";
		},
		initialize: function ()
		{
			X3DRigidJointNode .prototype .initialize .call (this);
		
			this .anchorPoint_ .addInterest ("set_joint__", this);
			this .axis1_       .addInterest ("set_joint__", this);
			this .axis2_       .addInterest ("set_joint__", this);
		},
		addJoint: (function ()
		{
			var
				localAnchorPoint1 = new Vector3 (0, 0, 0),
				localAnchorPoint2 = new Vector3 (0, 0, 0),
				loclaAxis1        = new Vector3 (0, 0, 0),
				loclaAxis2        = new Vector3 (0, 0, 0);

			return function ()
			{
				if (! this .getCollection ())
					return;
	
				if (! this .getBody1 ())
					return;
		
				if (! this .getBody2 ())
					return;
			
			   if (this .getBody1 () .getCollection () !== this .getCollection ())
					return;
			
			   if (this .getBody2 () .getCollection () !== this .getCollection ())
					return;

				localAnchorPoint1 .assign (this .anchorPoint_ .getValue ());
				localAnchorPoint2 .assign (this .anchorPoint_ .getValue ());
				localAxis1        .assign (this .axis1_ .getValue ());
				localAxis2        .assign (this .axis2_ .getValue ());

				this .getInverseMatrix1 () .multVecMatrix (localAnchorPoint1);
				this .getInverseMatrix2 () .multVecMatrix (localAnchorPoint2);
				this .getInverseMatrix1 () .multDirMatrix (localAxis1) .normalize ();
				this .getInverseMatrix2 () .multDirMatrix (localAxis2) .normalize ();

				this .joint = new Ammo .btHingeConstraint (this .getBody1 () .getRigidBody (),
				                                           this .getBody2 () .getRigidBody (),
				                                           new Ammo .btVector3 (localAnchorPoint1 .x, localAnchorPoint1 .y, localAnchorPoint1 .z),
				                                           new Ammo .btVector3 (localAnchorPoint2 .x, localAnchorPoint2 .y, localAnchorPoint2 .z),
				                                           new Ammo .btVector3 (localAxis1 .x, localAxis1 .y, localAxis1 .z),
				                                           new Ammo .btVector3 (localAxis2 .x, localAxis2 .y, localAxis2 .z),
				                                           false);

				this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);

				if (this .outputs .body1AnchorPoint)
					this .body1AnchorPoint_ = localAnchorPoint1;

				if (this .outputs .body2AnchorPoint)
					this .body2AnchorPoint_ = localAnchorPoint2;

				if (this .outputs .body1Axis)
					this .body1AnchorPoint_ = localAxis1;

				if (this .outputs .body2Axis)
					this .body2AnchorPoint_ = localAxis2;
			};
		})(),
		removeJoint: function ()
		{
			if (! this .joint)
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

			for (var i = 0, length = this .forceOutput_ .length; i < length; ++ i)
			{
				var value = this .forceOutput_ [i];

				if (value == "ALL")
				{
					this .outputs .body1AnchorPoint = true;
					this .outputs .body2AnchorPoint = true;
					this .outputs .body1Axis        = true;
					this .outputs .body2Axis        = true;
					this .outputs .hinge1Angle      = true;
					this .outputs .hinge2Angle      = true;
					this .outputs .hinge1AngleRate  = true;
					this .outputs .hinge2AngleRate  = true;
				}
				else
				{
					this .outputs [value] = true;
				}
			}
		},
	});

	return DoubleAxisHingeJoint;
});


