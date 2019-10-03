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
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"x_ite/Browser/NURBS/NURBS",
	"standard/Math/Algorithm",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Geometry/Triangle3",
	"nurbs",
],
function (X3DParametricGeometryNode,
          X3DConstants,
          X3DCast,
          NURBS,
          Algorithm,
          Vector3,
          Triangle3,
          nurbs)
{
"use strict";

	function X3DNurbsSurfaceGeometryNode (executionContext)
	{
		X3DParametricGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);

		this .tessellationScale = 1;
		this .uKnots            = [ ];
		this .vKnots            = [ ];
		this .weights           = [ ];
		this .controlPoints     = [ ];
		this .mesh              = { };
		this .sampleOptions     = { resolution: [ ], closed: [ ] };
		this .textUKnots        = [ ];
		this .textVKnots        = [ ];
		this .textWeights       = [ ];
		this .texControlPoints  = [ ];
		this .texMesh           = { };
	}

	X3DNurbsSurfaceGeometryNode .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
	{
		constructor: X3DNurbsSurfaceGeometryNode,
		initialize: function ()
		{
			X3DParametricGeometryNode .prototype .initialize .call (this);

			this .texCoord_     .addInterest ("set_texCoord__",     this);
			this .controlPoint_ .addInterest ("set_controlPoint__", this);

			this .set_texCoord__ ();
			this .set_controlPoint__ ();
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest ("requestRebuild", this);

			if (this .nurbsTexCoordNode)
				this .nurbsTexCoordNode .removeInterest ("requestRebuild", this);

			this .texCoordNode      = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);
			this .nurbsTexCoordNode = X3DCast (X3DConstants .NurbsTextureCoordinate,   this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest ("requestRebuild", this);

			if (this .nurbsTexCoordNode)
				this .nurbsTexCoordNode .addInterest ("requestRebuild", this);
		},
		set_controlPoint__: function ()
		{
			if (this .controlPointNode)
				this .controlPointNode .removeInterest ("requestRebuild", this);

			this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this .controlPoint_);

			if (this .controlPointNode)
				this .controlPointNode .addInterest ("requestRebuild", this);
		},
		setTessellationScale: function (value)
		{
			this .tessellationScale = value;

			this .requestRebuild ();
		},
		getUTessellation: function (numKnots)
		{
			return Math .floor (NURBS .getTessellation (this .uTessellation_ .getValue (), numKnots - this .uOrder_ .getValue ()) * this .tessellationScale);
		},
		getVTessellation: function (numKnots)
		{
			return Math .floor (NURBS .getTessellation (this .vTessellation_ .getValue (), numKnots - this .vOrder_ .getValue ()) * this .tessellationScale);
		},
		getUClosed: function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
		{
			if (this .uClosed_ .getValue ())
				return NURBS .getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode);

			return false;
		},
		getVClosed: function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
		{
			if (this .vClosed_ .getValue ())
				return NURBS .getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode);

			return false;
		},
		getUVWeights: function (result, uDimension, vDimension, weight)
		{
			return NURBS .getUVWeights (result, uDimension, vDimension, weight);
		},
		getTexControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, texCoordNode)
		{
			return NURBS .getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, texCoordNode);
		},
		getUVControlPoints: function (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
		{
			return NURBS .getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode);
		},
		getTrimmingContours: function ()
		{
			return undefined;
		},
		build: function ()
		{
			if (this .uOrder_ .getValue () < 2)
				return;

			if (this .vOrder_ .getValue () < 2)
				return;

			if (this .uDimension_ .getValue () < this .uOrder_ .getValue ())
				return;

			if (this .vDimension_ .getValue () < this .vOrder_ .getValue ())
				return;

			if (! this .controlPointNode)
				return;

			if (this .controlPointNode .getSize () !== this .uDimension_ .getValue () * this .vDimension_ .getValue ())
				return;

			// Order and dimension are now positive numbers.

			// ControlPoints

			var
				uClosed       = this .getUClosed (this .uOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .uKnot_, this .weight_, this .controlPointNode),
				vClosed       = this .getVClosed (this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .vKnot_, this .weight_, this .controlPointNode),
				weights       = this .getUVWeights (this .weights, this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .weight_),
				controlPoints = this .getUVControlPoints (this .controlPoints, uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), weights, this .controlPointNode);

			// Knots

			var
				uKnots = this .getKnots (this .uKnots, uClosed, this .uOrder_ .getValue (), this .uDimension_ .getValue (), this .uKnot_),
				vKnots = this .getKnots (this .vKnots, vClosed, this .vOrder_ .getValue (), this .vDimension_ .getValue (), this .vKnot_),
				uScale = uKnots [uKnots .length - 1] - uKnots [0],
				vScale = vKnots [vKnots .length - 1] - vKnots [0];

			// Initialize NURBS tesselllator

			var
				uDegree = this .uOrder_ .getValue () - 1,
				vDegree = this .vOrder_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open", "open"],
				degree: [uDegree, vDegree],
				knots: [uKnots, vKnots],
				points: controlPoints,
				debug: false,
			});

			var sampleOptions = this .sampleOptions;

			sampleOptions .resolution [0]   = this .getUTessellation (uKnots .length);
			sampleOptions .resolution [1]   = this .getVTessellation (vKnots .length);
			sampleOptions .closed [0]       = uClosed;
			sampleOptions .closed [1]       = vClosed;
			sampleOptions .domain           = undefined;
			sampleOptions .trimmingContours = this .getTrimmingContours ();

			var
				mesh        = nurbs .sample (this .mesh, surface, sampleOptions),
				faces       = mesh .faces,
				points      = mesh .points,
				vertexArray = this .getVertices ();

			for (var i = 0, length = faces .length; i < length; ++ i)
			{
				var
					index = faces [i] * 4,
					w     = points [index + 3];

				vertexArray .push (points [index] / w, points [index + 1] / w, points [index + 2] / w, 1);
			}

			this .buildNurbsTexCoords (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), uKnots, vKnots, this .uDimension_ .getValue (), this .vDimension_ .getValue (), weights, surface .domain);
			this .buildNormals (faces, points);
			this .setSolid (this .solid_ .getValue ());
			this .setCCW (true);
		},
		buildNurbsTexCoords: (function ()
		{
			var
				defaultTexUKnots        = [ ],
				defaultTexVKnots        = [ ],
				defaultTexControlPoints = [[[0, 0, 0, 1], [0, 1, 0, 1]], [[1, 0, 0, 1], [1, 1, 0, 1]]];

			function getDefaultTexKnots (result, knots)
			{
				result [0] = result [1] = knots [0];
				result [2] = result [3] = knots [knots .length - 1];
				return result;
			}

			return function (uClosed, vClosed, uOrder, vOrder, uKnots, vKnots, uDimension, vDimension, weights, domain)
			{
				var sampleOptions = this .sampleOptions;

				delete sampleOptions .domain;

				if (this .texCoordNode && this .texCoordNode .getSize () === uDimension * vDimension)
				{
					var
						texUDegree       = uOrder - 1,
						texVDegree       = vOrder - 1,
						texUKnots        = uKnots,
						texVKnots        = vKnots,
						texControlPoints = this .getTexControlPoints (this .texControlPoints, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, this .texCoordNode);
				}
				else if (this .nurbsTexCoordNode && this .nurbsTexCoordNode .isValid ())
				{
					var
						node             = this .nurbsTexCoordNode,
						texUDegree       = node .uOrder_ .getValue () - 1,
						texVDegree       = node .vOrder_ .getValue () - 1,
						texUKnots        = this .getKnots (this .texUKnots, false, node .uOrder_ .getValue (), node .uDimension_ .getValue (), node .uKnot_),
						texVKnots        = this .getKnots (this .texVKnots, false, node .vOrder_ .getValue (), node .vDimension_ .getValue (), node .vKnot_),
						texWeights       = this .getUVWeights (this .texWeights, node .uDimension_ .getValue (), node .vDimension_ .getValue (), node .weight_);
						texControlPoints = node .getControlPoints (texWeights);
				}
				else
				{
					var
						texUDegree       = 1,
						texVDegree       = 1,
						texUKnots        = getDefaultTexKnots (defaultTexUKnots, uKnots),
						texVKnots        = getDefaultTexKnots (defaultTexVKnots, vKnots),
						texControlPoints = defaultTexControlPoints;

					sampleOptions .domain = domain;
				}

				var texSurface = this .texSurface = (this .texSurface || nurbs) ({
					boundary: ["open", "open"],
					degree: [texUDegree, texVDegree],
					knots: [texUKnots, texVKnots],
					points: texControlPoints,
				});

				sampleOptions .closed [0] = false;
				sampleOptions .closed [1] = false;

				var
					texMesh       = nurbs .sample (this .texMesh, texSurface, sampleOptions),
					faces         = texMesh .faces,
					points        = texMesh .points,
					texCoordArray = this .getTexCoords ();

				for (var i = 0, length = faces .length; i < length; ++ i)
				{
					var index = faces [i] * 4;

					texCoordArray .push (points [index], points [index + 1], points [index + 2], points [index + 3]);
				}

				this .getMultiTexCoords () .push (this .getTexCoords ());
			};
		})(),
		buildNormals: function (faces, points)
		{
			var
				normals     = this .createNormals (faces, points),
				normalArray = this .getNormals ();

			for (var i = 0, length = normals .length; i < length; ++ i)
			{
				var normal = normals [i];

				normalArray .push (normal .x, normal .y, normal .z);
			}
		},
		createNormals: function (faces, points)
		{
			var normals = this .createFaceNormals (faces, points);

			var normalIndex = [ ];

			for (var i = 0, length = faces .length; i < length; ++ i)
			{
				var
					index      = faces [i],
					pointIndex = normalIndex [index];

				if (! pointIndex)
					pointIndex = normalIndex [index] = [ ];

				pointIndex .push (i);
			}

			return this .refineNormals (normalIndex, normals, Algorithm .radians (85));
		},
		createFaceNormals: (function ()
		{
			var
				v1 = new Vector3 (0, 0, 0),
				v2 = new Vector3 (0, 0, 0),
				v3 = new Vector3 (0, 0, 0);

			return function (faces, points)
			{
				var normals = this .faceNormals || [ ];

				for (var i = 0, length = faces .length; i < length; i += 3)
				{
					var
						index1 = faces [i]     * 4,
						index2 = faces [i + 1] * 4,
						index3 = faces [i + 2] * 4,
						w1     = points [index1 + 3],
						w2     = points [index2 + 3],
						w3     = points [index3 + 3];

					v1 .set (points [index1] / w1, points [index1 + 1] / w1, points [index1 + 2] / w1);
					v2 .set (points [index2] / w2, points [index2 + 1] / w2, points [index2 + 2] / w2);
					v3 .set (points [index3] / w3, points [index3 + 1] / w3, points [index3 + 2] / w3);

					var normal = Triangle3 .normal (v1, v2 ,v3, normals [i] || new Vector3 (0, 0, 0));

					normals [i]     = normal;
					normals [i + 1] = normal;
					normals [i + 2] = normal;
				}

				normals .length = length;

				return normals;
			};
		})(),
	});

	return X3DNurbsSurfaceGeometryNode;
});
