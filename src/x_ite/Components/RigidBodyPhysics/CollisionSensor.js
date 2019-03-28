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
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode, 
          X3DConstants,
          X3DCast,
          Vector3)
{
"use strict";

	function CollisionSensor (executionContext)
	{
		X3DSensorNode .call (this, executionContext);

		this .addType (X3DConstants .CollisionSensor);

		this .colliderNode = null;
	}

	CollisionSensor .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
	{
		constructor: CollisionSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",      new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "intersections", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "contacts",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "collider",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CollisionSensor";
		},
		getComponentName: function ()
		{
			return "RigidBodyPhysics";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DSensorNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);

			this .collider_ .addInterest ("set_collider__", this);

			this .set_collider__ ();
		},
		set_live__: function ()
		{
			if (this .getLive () && this .enabled_ .getValue () && this .colliderNode)
			{
				this .getBrowser () .sensorEvents () .addInterest ("update", this);
			}
			else
			{
				this .getBrowser () .sensorEvents () .removeInterest ("update", this);
			}
		},
		set_collider__: function ()
		{
			this .colliderNode = X3DCast (X3DConstants .CollisionCollection, this .collider_);

			this .set_live__ ();
		},
		update: (function ()
		{
			var
				collidableNodesIndex = new Map (),
				collisionWorlds      = new Set (),
				intersectionNodes    = new Set (),
				contactNodes         = [ ],
				position             = new Vector3 (0, 0, 0),
				contactNormal        = new Vector3 (0, 0, 0);
	
			return function ()
			{
				var
					colliderNode    = this .colliderNode,
					collidableNodes = colliderNode .getCollidables ();
	
				collidableNodesIndex .clear ();
				collisionWorlds      .clear ();
	
				for (var i = 0, length = collidableNodes .length; i < length; ++ i)
				{
					var
						collidableNode = collidableNodes [i],
						bodyNode       = collidableNodes [i] .getBody ();
	
					if (bodyNode)
					{
						collidableNodesIndex .set (bodyNode .getRigidBody () .ptr, collidableNode);
	
						var collection = bodyNode .getCollection ();
	
						if (collection)
							collisionWorlds .add (collection .getDynamicsWorld ());
					}
				}
	
				intersectionNodes .clear ();
				contactNodes .length = 0;

				collisionWorlds .forEach (function (collisionWorld)
				{
					collisionWorld .performDiscreteCollisionDetection ();
		
					var
						dispatcher   = collisionWorld .getDispatcher (),
						numManifolds = dispatcher .getNumManifolds ();

					for (var i = 0; i < numManifolds; ++ i)
					{
						var
							contactManifold = dispatcher .getManifoldByIndexInternal (i),
							numContacts     = contactManifold .getNumContacts ();

						for (var j = 0; j < numContacts; ++ j)
						{
							var pt = contactManifold .getContactPoint (j);
		
							if (pt .getDistance () <= 0)
							{
								var
									collidableNode1 = collidableNodesIndex .get (contactManifold .getBody0 () .ptr),
									collidableNode2 = collidableNodesIndex .get (contactManifold .getBody1 () .ptr);

								if (collidableNode1)
									intersectionNodes .add (collidableNode1);

								if (collidableNode2)
									intersectionNodes .add (collidableNode2);

								var contactNode = this .getExecutionContext () .createNode ("Contact", false);

								var
									btPosition      = pt .getPositionWorldOnA (),
									btContactNormal = pt .get_m_positionWorldOnA ();

								contactNode .position_                 = position .set (btPosition .x (), btPosition .y (), btPosition .z ());
								contactNode .contactNormal_            = contactNormal .set (btContactNormal .x (), btContactNormal .y (), btContactNormal .z ());
								contactNode .depth_                    = -pt .getDistance ();
//								contactNode .frictionDirection_        = context .frictionDirection;
								contactNode .appliedParameters_        = colliderNode .appliedParameters_;
								contactNode .bounce_                   = colliderNode .bounce_;
								contactNode .minBounceSpeed_           = colliderNode .minBounceSpeed_;
								contactNode .frictionCoefficients_     = colliderNode .frictionCoefficients_;
								contactNode .surfaceSpeed_             = colliderNode .surfaceSpeed_;
								contactNode .slipCoefficients_         = colliderNode .slipFactors_;
								contactNode .softnessConstantForceMix_ = colliderNode .softnessConstantForceMix_;
								contactNode .softnessErrorCorrection_  = colliderNode .softnessErrorCorrection_;

								if (collidableNode1)
								{
									contactNode .geometry1_ = collidableNode1;
									contactNode .body1_     = collidableNode1 .getBody ();
								}

								if (collidableNode2)
								{
									contactNode .geometry2_ = collidableNode2;
									contactNode .body2_     = collidableNode2 .getBody ();
								}
								
								contactNode .setup ();

								contactNodes .push (contactNode);
							}
						}
					}
				},
				this);

				var active = Boolean (contactNodes .length);

				if (this .isActive_ .getValue () !== active)
					this .isActive_ = active;

				if (intersectionNodes .size)
				{
					this .intersections_ .length = 0;

					intersectionNodes .forEach (function (intersectionNode)
					{
						this .intersections_ .push (intersectionNode);
					},
					this);
				}

				if (contactNodes .length)
				{
					this .contacts_ .length = 0;

					contactNodes .forEach (function (contactNode)
					{
						this .contacts_ .push (contactNode);
					},
					this);
				}
			};
		})(),
	});

	return CollisionSensor;
});


