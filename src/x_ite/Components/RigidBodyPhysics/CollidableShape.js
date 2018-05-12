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
	"x_ite/Components/RigidBodyPhysics/X3DNBodyCollidableNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Vector3",
	"lib/ammojs/ammo",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNBodyCollidableNode, 
          X3DConstants,
          X3DCast,
          Vector3,
          Ammo)
{
"use strict";

	function CollidableShape (executionContext)
	{
		X3DNBodyCollidableNode .call (this, executionContext);

		this .addType (X3DConstants .CollidableShape);

		this .shapeNode      = null;
		this .geometryNode   = null;
		this .collisionShape = null;
		this .triangleMesh   = null;
	}

	CollidableShape .prototype = Object .assign (Object .create (X3DNBodyCollidableNode .prototype),
	{
		constructor: CollidableShape,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "shape",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CollidableShape";
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
			X3DNBodyCollidableNode .prototype .initialize .call (this);

			this .enabled_ .addInterest ("set_collidableGeometry__", this);
			this .shape_   .addInterest ("set_shape__",              this);

			this .set_shape__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .shape_);
		
				if (boundedObject)
					return boundedObject .getBBox (bbox);
		
				return bbox .set ();
			}
		
			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		createConcaveGeometry: function ()
		{
			var vertices = this .geometryNode .getVertices () .getValue ();

			if (vertices .length === 0)
				return null;

			this .triangleMesh = new Ammo .btTriangleMesh ();

			for (var i = 0, length = vertices .length; i < length; i += 12)
			{
				this .triangleMesh .addTriangle (new Ammo .btVector3 (vertices [i + 0], vertices [i + 1], vertices [i + 2]),
				                                 new Ammo .btVector3 (vertices [i + 4], vertices [i + 5], vertices [i + 6]),
				                                 new Ammo .btVector3 (vertices [i + 8], vertices [i + 9], vertices [i + 10]));	
			}

			return new Ammo .btBvhTriangleMeshShape (this .triangleMesh, false);
		},
		set_shape__: function ()
		{
			if (this .shapeNode)
			{
				this .shapeNode .isCameraObject_ .removeFieldInterest (this .isCameraObject_);
				this .shapeNode .geometry_ .removeInterest ("set_geometry__", this);
			}

			this .shapeNode = X3DCast (X3DConstants .Shape, this .shape_);

			if (this .shapeNode)
			{
				this .shapeNode .isCameraObject_ .addFieldInterest (this .isCameraObject_);
				this .shapeNode .geometry_ .addInterest ("set_geometry__", this);

				this .setCameraObject (this .shapeNode .getCameraObject ());

				delete this .traverse;
			}
			else
			{
				this .setCameraObject (false);

				this .traverse = Function .prototype;
			}

			this .set_geometry__ ();
		},
		set_geometry__: function ()
		{
			if (this .geometryNode)
				this .geometryNode .removeInterest ("set_collidableGeometry__", this);

			if (this .shapeNode)
				this .geometryNode = this .shapeNode .getGeometry ();
			else
				this .geometryNode = null;

			if (this .geometryNode)
				this .geometryNode .addInterest ("set_collidableGeometry__", this);

			this .set_collidableGeometry__ ();
		},
		set_collidableGeometry__: function ()
		{
			if (this .collisionShape)
			{
				this .getCompoundShape () .removeChildShapeByIndex (0);
				Ammo .destroy (this .collisionShape);
console .log (123);
			}

			this .setOffset (Vector3 .Zero);

			if (this .triangleMesh)
			{
				Ammo .destroy (this .triangleMesh);
				this .triangleMesh = null;
			}

			if (this .geometryNode && this .enabled_ .getValue ())
			{
				switch (this .geometryNode .getType () [this .geometryNode .getType () .length - 1])
				{
					case X3DConstants .Box:
					{
						var
							box  = this .geometryNode,
							size = box .size_ .getValue ();

						this .collisionShape = new Ammo .btBoxShape (new Ammo .btVector3 (size .x / 2, size .y / 2, size .z / 2));
						break;
					}
					case X3DConstants .Cone:
					{
						var cone = this .geometryNode;
		
						if (cone .side_ .getValue () && cone .bottom_ .getValue ())
							this .collisionShape = new Ammo .btConeShape (cone .bottomRadius_ .getValue (), cone .height_ .getValue ());
						else
							this .collisionShape = this .createConcaveGeometry ();

						break;
					}
					case X3DConstants .Cylinder:
					{
						var
							cylinder  = this .geometryNode,
							radius    = cylinder .radius_ .getValue (),
							height1_2 = cylinder .height_ .getValue () * 0.5;
		
						if (cylinder .side_ .getValue () && cylinder .top_ .getValue () && cylinder .bottom_ .getValue ())
							this .collisionShape = new Ammo .btCylinderShape (new Ammo .btVector3 (radius, height1_2, radius));
						else
							this .collisionShape = this .createConcaveGeometry ();

						break;
					}
					case X3DConstants .Sphere:
					{
						var sphere = this .geometryNode;
		
						this .collisionShape = new Ammo .btSphereShape (sphere .radius_ .getValue ());
						break;
					}
					default:
					{
						this .collisionShape = this .createConcaveGeometry ();
						break;
					}
				}
			}
			else
			{
				this .collisionShape = null;
			}

			if (this .collisionShape)
				this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .collisionShape);
		
			this .addNodeEvent ();
		},
		traverse: function (type, renderObject)
		{
			var modelViewMatrix = renderObject .getModelViewMatrix ();

			modelViewMatrix .push ();
			modelViewMatrix .multLeft (this .getMatrix ());
	
			this .shapeNode .traverse (type, renderObject);
		
			modelViewMatrix .pop ();
		},
	});

	return CollidableShape;
});


