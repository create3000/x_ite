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
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Components/Geometry3D/IndexedFaceSet",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Algorithm",
	"standard/Math/Utility/BVH",
	"standard/Math/Algorithms/QuickSort",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedFaceSet,
          X3DConstants,
          Vector3,
          Rotation4,
          Line3,
          Plane3,
          Triangle3,
          Algorithm,
          BVH,
          QuickSort)
{
"use strict";

	var
		vertex1  = new Vector3 (0, 0, 0),
		vertex2  = new Vector3 (0, 0, 0),
		vertex3  = new Vector3 (0, 0, 0),
		point    = new Vector3 (0, 0, 0),
		normal   = new Vector3 (0, 0, 0),
		rotation = new Rotation4 (0, 0, 1, 0),
		line     = new Line3 (Vector3 .Zero, Vector3 .zAxis),
		plane    = new Plane3 (Vector3 .Zero, Vector3 .zAxis);

	function PlaneCompare (a, b)
	{
		return plane .getDistanceToPoint (a) < plane .getDistanceToPoint (b);
	}

	function VolumeEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .VolumeEmitter);

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .direction      = new Vector3 (0, 0, 0);
		this .volumeNode     = new IndexedFaceSet (executionContext);
		this .areaSoFarArray = [ 0 ];
		this .intersections  = [ ];
		this .sorter         = new QuickSort (this .intersections, PlaneCompare);
	}

	VolumeEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: VolumeEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "internal",    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",  new Fields .MFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "VolumeEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .direction_ .addInterest ("set_direction__", this);

			this .coordIndex_ .addFieldInterest (this .volumeNode .coordIndex_);
			this .coord_      .addFieldInterest (this .volumeNode .coord_);
	
			this .volumeNode .creaseAngle_ = Math .PI;
			this .volumeNode .convex_      = false;
			this .volumeNode .coordIndex_  = this .coordIndex_;
			this .volumeNode .coord_       = this .coord_;

			this .volumeNode .addInterest ("set_geometry__", this);
			this .volumeNode .setPrivate (true);
			this .volumeNode .setup ();

			this .set_direction__ ();
			this .set_geometry__ ();
		},
		set_direction__: function ()
		{
			this .direction .assign (this .direction_ .getValue ()) .normalize ();

			if (this .direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_geometry__: function ()
		{
			var
				areaSoFar      = 0,
				areaSoFarArray = this .areaSoFarArray,
				normals        = this .volumeNode .getNormals () .getValue (),
				vertices       = this .volumeNode .getVertices () .getValue ();

			this .normals  = normals;
			this .vertices = vertices;

			areaSoFarArray .length = 1;

			for (var i = 0, length = vertices .length; i < length; i += 12)
			{
				vertex1 .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);
				vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
				vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

				areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
				areaSoFarArray .push (areaSoFar);
			}

			this .bvh = new BVH (vertices, normals);
		},
		getRandomPosition: function (position)
		{
			// Get random point on surface

			// Determine index0.

			var
				areaSoFarArray = this .areaSoFarArray,
				length         = areaSoFarArray .length,
				fraction       = Math .random () * areaSoFarArray [length - 1],
				index0         = 0;

			if (length == 1 || fraction <= areaSoFarArray [0])
			{
				index0 = 0;
			}
			else if (fraction >= areaSoFarArray [length - 1])
			{
				index0 = length - 2;
			}
			else
			{
				var index = Algorithm .upperBound (areaSoFarArray, 0, length, fraction, Algorithm .less);

				if (index < length)
				{
					index0 = index - 1;
				}
				else
				{
					index0 = 0;
				}
			}

			// Random barycentric coordinates.

			var
				u = Math .random (),
				v = Math .random ();
		
			if (u + v > 1)
			{
				u = 1 - u;
				v = 1 - v;
			}

			var t = 1 - u - v;

			// Interpolate and determine random point on surface and normal.

			var
				i        = index0 * 12,
				vertices = this .vertices;

			point .x = u * vertices [i + 0] + v * vertices [i + 4] + t * vertices [i + 8];
			point .y = u * vertices [i + 1] + v * vertices [i + 5] + t * vertices [i + 9];
			point .z = u * vertices [i + 2] + v * vertices [i + 6] + t * vertices [i + 10];

			var
				i       = index0 * 9,
				normals = this .normals;

			normal .x = u * normals [i + 0] + v * normals [i + 3] + t * normals [i + 6];
			normal .y = u * normals [i + 1] + v * normals [i + 4] + t * normals [i + 7];
			normal .z = u * normals [i + 2] + v * normals [i + 5] + t * normals [i + 8];

			rotation .setFromToVec (Vector3 .zAxis, normal);
			rotation .multVecRot (this .getRandomSurfaceNormal (normal));

			// Setup random line throu volume for intersection text
			// and a plane corresponding to the line for intersection sorting.

			line  .set (point, normal);
			plane .set (point, normal);
	
			// Find random point in volume.

			var
				intersections    = this .intersections,
				numIntersections = this .bvh .intersectsLine (line, intersections);

			numIntersections -= numIntersections % 2; // We need an even count of intersections.

			if (numIntersections)
			{
				// Sort intersections along line with a little help from the plane.

				this .sorter .sort (0, numIntersections);

				// Select random intersection pair.

				var
					index  = Math .round (this .getRandomValue (0, numIntersections / 2 - 1)) * 2,
					point0 = intersections [index],
					point1 = intersections [index + 1],
					t      = Math .random ();
	
				// lerp
				position .x = point0 .x + (point1 .x - point0 .x) * t;
				position .y = point0 .y + (point1 .y - point0 .y) * t;
				position .z = point0 .z + (point1 .z - point0 .z) * t;
	
				return position;
			}

			// Discard point.

			return position .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
		},
		getRandomVelocity: function (velocity)
		{
			var
				direction = this .direction,
				speed     = this .getRandomSpeed ();

			velocity .x = direction .x * speed;
			velocity .y = direction .y * speed;
			velocity .z = direction .z * speed;

			return velocity;
 		},
	});

	return VolumeEmitter;
});


