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
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"lib/ammojs/ammo",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DRigidJointNode, 
          X3DConstants,
          Vector3,
          Rotation4,
          Matrix4,
          Ammo)
{
"use strict";

	function SliderJoint (executionContext)
	{
		X3DRigidJointNode .call (this, executionContext);

		this .addType (X3DConstants .SliderJoint);

		this .minSeparation_  .setUnit ("length");
		this .maxSeparation_  .setUnit ("length");
		this .sliderForce_    .setUnit ("force");
		this .separation_     .setUnit ("force");
		this .separationRate_ .setUnit ("speed");

		this .joint   = null;
		this .outputs = { };
	}

	SliderJoint .prototype = Object .assign (Object .create (X3DRigidJointNode .prototype),
	{
		constructor: SliderJoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",         new Fields .MFString ("NONE")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "axis",                new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "minSeparation",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxSeparation",       new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "sliderForce",         new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopBounce",          new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "stopErrorCorrection", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "separation",          new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "separationRate",      new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body1",               new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "body2",               new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "SliderJoint";
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
		
			this .axis_          .addInterest ("set_joint__",       this);
			this .minSeparation_ .addInterest ("set_separation__",  this);
			this .maxSeparation_ .addInterest ("set_separation__",  this);
		},
		addJoint: (function ()
		{
			var
				axisRotation = new Rotation4 (0, 0, 1, 0),
				matrixA      = new Matrix4 (),
				matrixB      = new Matrix4 (),
				origin       = new Ammo .btVector3 (0, 0, 0),
				frameInA     = new Ammo .btTransform (),
				frameInB     = new Ammo .btTransform ();

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

				axisRotation .setFromToVec (Vector3 .xAxis, this .axis_ .getValue ());

				matrixA .set (this .getBody1 () .position_ .getValue (), Rotation4 .multRight (this .getBody1 () .orientation_ .getValue (), axisRotation));
				matrixB .set (this .getBody1 () .position_ .getValue (), Rotation4 .multRight (this .getBody1 () .orientation_ .getValue (), axisRotation));

				origin .setValue (matrixA [12], matrixA [13], matrixA [14]);

				frameInA .getBasis () .setValue (matrixA [0], matrixA [4], matrixA [8],
				                                 matrixA [1], matrixA [5], matrixA [9],
				                                 matrixA [2], matrixA [6], matrixA [10]);

				frameInA .setOrigin (origin);

				origin .setValue (matrixB [12], matrixB [13], matrixB [14]);

				frameInA .getBasis () .setValue (matrixB [0], matrixB [4], matrixB [8],
				                                 matrixB [1], matrixB [5], matrixB [9],
				                                 matrixB [2], matrixB [6], matrixB [10]);

				frameInB .setOrigin (origin);

				this .joint = new Ammo .btSliderConstraint (this .getBody1 () .getRigidBody (),
				                                            this .getBody2 () .getRigidBody (),
				                                            frameInA,
				                                            frameInB,
				                                            true);
				
				this .joint .setLowerAngLimit (0);
				this .joint .setUpperAngLimit (0);

				this .set_separation__ ();

				this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);
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
					this .outputs .separation     = true;
					this .outputs .separationRate = true;
				}
				else
				{
					this .outputs [value] = true;
				}
			}
		},
		set_separation__: function ()
		{
			if (! this .joint)
				return;

			this .joint .setLowerLinLimit (this .minSeparation_ .getValue ());
			this .joint .setUpperLinLimit (this .maxSeparation_ .getValue ());
		},
	});

	return SliderJoint;
});


