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

	function SingleAxisHingeJoint (executionContext)
	{
		X3DRigidJointNode .call (this, executionContext);

		this .addType (X3DConstants .SingleAxisHingeJoint);

		this .anchorPoint_      .setUnit ("length");
		this .minAngle_         .setUnit ("angle");
		this .maxAngle_         .setUnit ("angle");
		this .body1AnchorPoint_ .setUnit ("length");
		this .body2AnchorPoint_ .setUnit ("length");
		this .angle_            .setUnit ("angle");
		this .angleRate_        .setUnit ("angularRate");

		this .joint   = null;
		this .outputs = { };
	}

	SingleAxisHingeJoint .prototype = Object .assign (Object .create (X3DRigidJointNode .prototype),
	{
		constructor: SingleAxisHingeJoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",         new Fields .MFString ("NONE")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "anchorPoint",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "axis",                new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "minAngle",            new Fields .SFFloat (-3.14159)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxAngle",            new Fields .SFFloat (3.14159)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopBounce",          new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopErrorCorrection", new Fields .SFFloat (0.8)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body1AnchorPoint",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "body2AnchorPoint",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "angle",               new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "angleRate",           new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body1",               new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body2",               new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "SingleAxisHingeJoint";
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
		
			this .forceOutput_ .addInterest ("set_forceOutput__", this);
			this .anchorPoint_ .addInterest ("set_joint__",       this);
			this .axis_        .addInterest ("set_joint__",       this);

			this .set_forceOutput__ ();
		},
		addJoint: (function ()
		{
			var
				anchorPoint1 = new Vector3 (0, 0, 0),
				anchorPoint2 = new Vector3 (0, 0, 0),
				axis1        = new Vector3 (0, 0, 0),
				axis2        = new Vector3 (0, 0, 0);

			return function ()
			{
				if (this .getCollection ())
				{
					if (this .getBody1 () && this .getBody1 () .getCollection () === this .getCollection () && this .getBody2 () && this .getBody2 () .getCollection () === this .getCollection ())
					{
						anchorPoint1 .assign (this .anchorPoint_ .getValue ());
						anchorPoint2 .assign (this .anchorPoint_ .getValue ());
						axis1        .assign (this .axis_ .getValue ());
						axis2        .assign (this .axis_ .getValue ());

						this .getInverseMatrix1 () .multVecMatrix (anchorPoint1);
						this .getInverseMatrix2 () .multVecMatrix (anchorPoint2);
						this .getInverseMatrix1 () .multDirMatrix (axis1) .normalize ();
						this .getInverseMatrix2 () .multDirMatrix (axis2) .normalize ();

						this .joint = new Ammo .btHingeConstraint (this .getBody1 () .getRigidBody (),
						                                           this .getBody2 () .getRigidBody (),
						                                           new Ammo .btVector3 (anchorPoint1 .x, anchorPoint1 .y, anchorPoint1 .z),
						                                           new Ammo .btVector3 (anchorPoint2 .x, anchorPoint2 .y, anchorPoint2 .z),
						                                           new Ammo .btVector3 (axis1 .x, axis1 .y, axis1 .z),
						                                           new Ammo .btVector3 (axis2 .x, axis2 .y, axis2 .z),
						                                           false);

						this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);

						if (this .outputs .body1AnchorPoint)
							this .body1AnchorPoint_ = anchorPoint1;
				
						if (this .outputs .body2AnchorPoint)
							this .body2AnchorPoint_ = anchorPoint2;
					}
				}
			};
		})(),
		removeJoint: function ()
		{
			if (this .joint)
			{
				if (this .getCollection ())
					this .getCollection () .getDynamicsWorld () .removeConstraint (this .joint);

				Ammo .destroy (this .joint);
				this .joint = null;
			}
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
					this .outputs .angle            = true;
					this .outputs .angularRate      = true;
				}
				else
				{
					this .outputs [value] = true;
				}
			}
		},
	});

	return SingleAxisHingeJoint;
});


