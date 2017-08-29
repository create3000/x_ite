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
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Triangle3,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	var
		matrix    = new Matrix4 (),
		rotations = [ ];

	function Extrusion (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Extrusion);
	}

	Extrusion .prototype = $.extend (Object .create (X3DGeometryNode .prototype),
	{
		constructor: Extrusion,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "beginCap",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "endCap",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSection", new Fields .MFVec2f (new Vector2 (1, 1), new Vector2 (1, -1), new Vector2 (-1, -1), new Vector2 (-1, 1), new Vector2 (1, 1))),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "orientation",  new Fields .MFRotation (new Rotation4 ())),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",        new Fields .MFVec2f (new Vector2 (1, 1))),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "spine",        new Fields .MFVec3f (new Vector3 (0, 0, 0), new Vector3 (0, 1, 0))),
		]),
		getTypeName: function ()
		{
			return "Extrusion";
		},
		getComponentName: function ()
		{
			return "Geometry3D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		getClosedOrientation: function ()
		{
			var orientation = this .orientation_ .getValue ();

			if (orientation .length)
			{
				var
					firstOrientation = orientation [0] .getValue (),
					lastOrientation  = orientation [orientation .length - 1] .getValue ();

				return firstOrientation .equals (lastOrientation);
			}

			return true;
		},
		createPoints: function ()
		{
			var
				crossSection = this .crossSection_. getValue (),
				orientation  = this .orientation_. getValue (),
				scale        = this .scale_. getValue (),
				spine        = this .spine_. getValue (),
				points       = [ ];

			// calculate SCP rotations

			var rotations = this .createRotations ();

			// calculate vertices.
			
			for (var i = 0, length = spine .length; i < length; ++ i)
			{
				matrix .identity ();
				matrix .translate (spine [i] .getValue ());

				if (orientation .length)
					matrix .rotate (orientation [Math .min (i, orientation .length - 1)] .getValue ());

				matrix .multLeft (rotations [i]);

				if (scale .length)
				{
					var s = scale [Math .min (i, scale .length - 1)] .getValue ();
					matrix .scale (new Vector3 (s .x, 1, s .y));
				}

				for (var cs = 0, csLength = crossSection .length; cs < csLength; ++ cs)
				{
					var vector = crossSection [cs] .getValue ();
					points .push (matrix .multVecMatrix (new Vector3 (vector .x, 0, vector .y)));
				}
			}

			return points;
		},
		createRotations: function ()
		{
			// calculate SCP rotations

			var
				spine       = this .spine_ .getValue (),
				numSpines   = spine .length,
				firstSpine  = spine [0] .getValue (),
				lastSpine   = spine [spine .length - 1] .getValue (),
				closedSpine = firstSpine .equals (lastSpine) && this .getClosedOrientation ();

			// Extend or shrink static rotations array:
			for (var i = rotations .length; i < numSpines; ++ i)
				rotations [i] = new Matrix4 ();

			rotations .length = numSpines;

			// SCP axes:
			var
				SCPxAxis,
				SCPyAxis,
				SCPzAxis = new Vector3 (0, 0, 0);

			// SCP for the first point:
			if (closedSpine)
			{
				SCPyAxis = Vector3 .subtract (spine [1] .getValue (), spine [spine .length - 2] .getValue ()) .normalize ();
				SCPzAxis = Vector3 .subtract (spine [1] .getValue (), spine [0] .getValue ())
				           .cross (Vector3 .subtract (spine [spine .length - 2] .getValue (), spine [0] .getValue ()))
				           .normalize ();
			}
			else
			{
				SCPyAxis = Vector3 .subtract (spine [1] .getValue (), spine [0] .getValue ()) .normalize ();

				// Find first defined Z-axis.
				for (var i = 1, length = spine .length - 1; i < length; ++ i)
				{
					SCPzAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i] .getValue ())
					           .cross (Vector3 .subtract (spine [i - 1] .getValue (), spine [i] .getValue ()))
					           .normalize ();

					if (! SCPzAxis .equals (Vector3 .Zero))
						break;
				}
			}

			// The entire spine is coincident:
			if (SCPyAxis .equals (Vector3 .Zero))
				SCPyAxis .set (0, 1, 0);

			// The entire spine is collinear:
			if (SCPzAxis .equals (Vector3 .Zero))
				SCPzAxis = new Rotation4 (new Vector3 (0, 1, 0), SCPyAxis) .multVecRot (new Vector3 (0, 0, 1));

			// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
			SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

			rotations [0] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
			                    SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
			                    SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
			                    0,           0,           0,           1);

			// For all points other than the first or last:

			var
				SCPyAxisPrevious = SCPyAxis,
				SCPzAxisPrevious = SCPzAxis;

			for (var i = 1, length = spine .length - 1; i < length; ++ i)
			{
				SCPyAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i - 1] .getValue ()) .normalize ();
				SCPzAxis = Vector3 .subtract (spine [i + 1] .getValue (), spine [i] .getValue ())
				           .cross (Vector3 .subtract (spine [i - 1] .getValue (), spine [i] .getValue ()))
				           .normalize ();

				// g.
				if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
					SCPzAxis .negate ();

				// The two points used in computing the Y-axis are coincident.
				if (SCPyAxis .equals (Vector3 .Zero))
					SCPyAxis = SCPyAxisPrevious;
				else
					SCPyAxisPrevious = SCPyAxis;

				// The three points used in computing the Z-axis are collinear.
				if (SCPzAxis .equals (Vector3 .Zero))
					SCPzAxis = SCPzAxisPrevious;
				else
					SCPzAxisPrevious = SCPzAxis;

				// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
				SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

				rotations [i] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
				                    SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
				                    SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
				                    0,           0,           0,           1);
			}

			// SCP for the last point
			if (closedSpine)
			{
				// The SCPs for the first and last points are the same.
				rotations [numSpines - 1] .assign (rotations [0]);
			}
			else
			{
				SCPyAxis = Vector3 .subtract (spine [spine .length - 1] .getValue (), spine [spine .length - 2] .getValue ()) .normalize ();
				
				if (spine .length > 2)
				{
					SCPzAxis = Vector3 .subtract (spine [spine .length - 1] .getValue (), spine [spine .length - 2] .getValue ())
					           .cross (Vector3 .subtract (spine [spine .length - 3] .getValue (), spine [spine .length - 2] .getValue ()))
					           .normalize ();
				}

				// g.
				if (SCPzAxisPrevious .dot (SCPzAxis) < 0)
					SCPzAxis .negate ();

				// The two points used in computing the Y-axis are coincident.
				if (SCPyAxis .equals (Vector3 .Zero))
					SCPyAxis = SCPyAxisPrevious;

				// The three points used in computing the Z-axis are collinear.
				if (SCPzAxis .equals (Vector3 .Zero))
					SCPzAxis = SCPzAxisPrevious;

				// We do not have to normalize SCPxAxis, as SCPyAxis and SCPzAxis are orthogonal.
				SCPxAxis = Vector3 .cross (SCPyAxis, SCPzAxis);

				rotations [numSpines - 1] .set (SCPxAxis .x, SCPxAxis .y, SCPxAxis .z, 0,
				                                SCPyAxis .x, SCPyAxis .y, SCPyAxis .z, 0,
				                                SCPzAxis .x, SCPzAxis .y, SCPzAxis .z, 0,
				                                0,           0,           0,           1);
			}

			return rotations;
		},
		build: function ()
		{
			var
				cw           = ! this .ccw_ .getValue (),
				crossSection = this .crossSection_. getValue (),
				spine        = this .spine_. getValue (),
				texCoords    = [ ];

			if (spine .length < 2 || crossSection .length < 2)
				return;

			this .getTexCoords () .push (texCoords);

			var crossSectionSize = crossSection .length; // This one is used only in the INDEX macro.

			function INDEX (n, k) { return n * crossSectionSize + k; }

			var
				firstSpine  = spine [0] .getValue (),
				lastSpine   = spine [spine .length - 1] .getValue (),
				closedSpine = firstSpine .equals (lastSpine) && this .getClosedOrientation ();

			var
				firstCrossSection  = crossSection [0] .getValue (),
				lastCrossSection   = crossSection [crossSection .length - 1] .getValue (),
				closedCrossSection = firstCrossSection .equals (lastCrossSection);

			// For caps calculation

			var
				min = crossSection [0] .getValue () .copy (),
				max = crossSection [0] .getValue () .copy ();

			for (var k = 1, length = crossSection .length; k < length; ++ k)
			{
				min .min (crossSection [k] .getValue ());
				max .max (crossSection [k] .getValue ());
			}

			var
				capSize      = Vector2 .subtract (max, min),
				capMax       = Math .max (capSize .x, capSize .y),
				numCapPoints = closedCrossSection ? crossSection .length - 1 : crossSection .length;

			// Create

			var
				normalIndex = [ ],
			   normals     = [ ],
				points      = this .createPoints ();

			for (var p = 0, length = points .length; p < length; ++ p)
				normalIndex [p] = [ ];

			// Build body.

			var
				numCrossSection_1 = crossSection .length - 1,
				numSpine_1        = spine .length - 1;

			var
				indexLeft  = INDEX (0, 0),
				indexRight = INDEX (0, closedCrossSection ? 0 : numCrossSection_1);

			for (var n = 0; n < numSpine_1; ++ n)
			{
				for (var k = 0; k < numCrossSection_1; ++ k)
				{
					var
						n1 = closedSpine && n === spine .length - 2 ? 0 : n + 1,
						k1 = closedCrossSection && k === crossSection .length - 2 ? 0 : k + 1;

					// k      k+1
					//
					// p4 ----- p3   n+1
					//  |     / |
					//  |   /   |
					//  | /     |
					// p1 ----- p2   n

					var
						i1 = INDEX (n,  k),
						i2 = INDEX (n,  k1),
						i3 = INDEX (n1, k1),
						i4 = INDEX (n1, k),
						p1 = points [i1],
						p2 = points [i2],
						p3 = points [i3],
						p4 = points [i4],
						l1 = p2 .distance (p3) >= 1e-7,
						l2 = p4 .distance (p1) >= 1e-7;

					if (cw)
					{
						var
							normal1 = Triangle3 .normal (p3, p2, p1, new Vector3 (0, 0, 0)),
							normal2 = Triangle3 .normal (p4, p3, p1, new Vector3 (0, 0, 0));
					}
					else
					{
						var
							normal1 = Triangle3 .normal (p1, p2, p3, new Vector3 (0, 0, 0)),
							normal2 = Triangle3 .normal (p1, p3, p4, new Vector3 (0, 0, 0));
					}

					// Merge points on the left and right side if spine is coincident for better normal generation.
		
					if (k == 0)
					{
						if (l2)
							indexLeft = i1;
						else
						{
							i1 = indexLeft;
							p1 = points [i1];
						}
					}
		
					if (k == crossSection .length - 2)
					{
						if (l1)
							indexRight = i2;
						else
						{
							i3 = indexRight;
							p3 = points [i3];
						}
					}

					// If there are coincident spine points then one length can be zero.

					// Triangle one

					if (l1)
					{
						// p1
						if (l2)
							texCoords .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
						else
						{
							// Cone case: ((texCoord1 + texCoord4) / 2)
							var y = (n / numSpine_1 + (n + 1) / numSpine_1) / 2;

							texCoords .push (k / numCrossSection_1, y, 0, 1);
						}

						normalIndex [i1] .push (normals .length);
						normals .push (normal1);
						this .addVertex (p1);
	
						// p2
						texCoords .push ((k + 1) / numCrossSection_1, n / numSpine_1, 0, 1);
						normalIndex [i2] .push (normals .length);
						normals .push (normal1);
						this .addVertex (p2);
	
						// p3
						texCoords .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						normalIndex [i3] .push (normals .length);
						normals .push (normal1);
						this .addVertex (p3);
					}

					// Triangle two

					if (l2)
					{
						// p1
						texCoords .push (k / numCrossSection_1, n / numSpine_1, 0, 1);
						normalIndex [i1] .push (normals .length);
						normals .push (normal2);
						this .addVertex (p1);
	
						// p3
						if (l1)
							texCoords .push ((k + 1) / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						else
						{
							// Cone case: ((texCoord3 + texCoord2) / 2)
							var y = ((n + 1) / numSpine_1 + n / numSpine_1) / 2;

							texCoords .push ((k + 1) / numCrossSection_1, y, 0, 1);
						}

						normalIndex [i3] .push (normals .length);
						normals .push (normal2);
						this .addVertex (p3);
	
						// p4
						texCoords .push (k / numCrossSection_1, (n + 1) / numSpine_1, 0, 1);
						normalIndex [i4] .push (normals .length);
						normals .push (normal2);
						this .addVertex (p4);
					}
				}
			}

			// Refine body normals and add them.

			normals = this .refineNormals (normalIndex, normals, this .creaseAngle_ .getValue ());

			for (var i = 0; i < normals .length; ++ i)
				this .addNormal (normals [i]);

			// Build caps

			if (capMax && crossSection .length > 2)
			{
				if (this .beginCap_ .getValue ())
				{
					var
						j         = 0, // spine
						polygon   = [ ],
						triangles = [ ];

					for (var k = 0; k < numCapPoints; ++ k)
					{
						var
							index = INDEX (j, numCapPoints - 1 - k),
							point = points [index] .copy ();
						point .index    = index;
						point .texCoord = Vector2 .subtract (crossSection [numCapPoints - 1 - k] .getValue (), min) .divide (capMax);
						polygon .push (point);
					}

					if (this .convex_ .getValue ())
						Triangle3 .triangulateConvexPolygon (polygon, triangles);

					else
						Triangle3 .triangulatePolygon (polygon, triangles);

					if (triangles .length >= 3)
					{
						var normal = Triangle3 .normal (points [triangles [0] .index],
						                                points [triangles [1] .index],
						                                points [triangles [2] .index],
						                                new Vector3 (0, 0, 0));

						if (cw)
							normal .negate ();

						this .addCap (texCoords, normal, points, triangles);
					}
				}

				if (this .endCap_ .getValue ())
				{
					var
						j         = spine .length - 1, // spine
						polygon   = [ ],
						triangles = [ ];

					for (var k = 0; k < numCapPoints; ++ k)
					{
						var
							index = INDEX (j, k),
							point = points [index] .copy ();
						point .index    = index;
						point .texCoord = Vector2 .subtract (crossSection [k] .getValue (), min) .divide (capMax);
						polygon .push (point);
					}

					if (this .convex_ .getValue ())
						Triangle3 .triangulateConvexPolygon (polygon, triangles);

					else
						Triangle3 .triangulatePolygon (polygon, triangles);

					if (triangles .length >= 3)
					{
						var normal = Triangle3 .normal (points [triangles [0] .index],
						                                points [triangles [1] .index],
						                                points [triangles [2] .index],
						                                new Vector3 (0, 0, 0));

						if (cw)
							normal .negate ();

						this .addCap (texCoords, normal, points, triangles);
					}
				}
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
		addCap: function (texCoords, normal, vertices, triangles)
		{
			for (var i = 0; i < triangles .length; i += 3)
			{
				var
					p0 = vertices [triangles [i]     .index],
					p1 = vertices [triangles [i + 1] .index],
					p2 = vertices [triangles [i + 2] .index],
					t0 = triangles [i]     .texCoord,
					t1 = triangles [i + 1] .texCoord,
					t2 = triangles [i + 2] .texCoord;

				texCoords .push (t0 .x, t0 .y, 0, 1);
				texCoords .push (t1 .x, t1 .y, 0, 1);
				texCoords .push (t2 .x, t2 .y, 0, 1);

				this .addNormal (normal);
				this .addNormal (normal);
				this .addNormal (normal);
				
				this .addVertex (p0);
				this .addVertex (p1);
				this .addVertex (p2);
			}
		},
	});

	return Extrusion;
});


