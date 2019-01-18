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
	"x_ite/Browser/NURBS/NURBS",
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"nurbs",
	"nurbs/extras/sample",
],
function (NURBS,
          X3DParametricGeometryNode, 
          X3DCast,
          X3DConstants,
          nurbs,
          sample)
{
"use strict";

	function X3DNurbsSurfaceGeometryNode (executionContext)
	{
		X3DParametricGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);

		this .mesh = { };
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
		getUVWeights: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weight)
		{
			return NURBS .getUVWeights (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weight);
		},
		getUVControlPoints: function (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
		{
			return NURBS .getUVControlPoints (uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode);
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
				controlPoints = this .getUVControlPoints (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .controlPointNode);

			// Knots
		
			var
				uKnots = this .getKnots (uClosed, this .uOrder_ .getValue (), this .uDimension_ .getValue (), this .uKnot_),
				vKnots = this .getKnots (vClosed, this .vOrder_ .getValue (), this .vDimension_ .getValue (), this .vKnot_),
				uScale = uKnots [uKnots .length - 1] - uKnots [0],
				vScale = vKnots [vKnots .length - 1] - vKnots [0];

			var weights = this .getUVWeights (uClosed, vClosed, this .uOrder_ .getValue (), this .vOrder_ .getValue (), this .uDimension_ .getValue (), this .vDimension_ .getValue (), this .weight_);

			// Initialize NURBS tesselllator

			var
				uDegree = this .uOrder_ .getValue () - 1,
				vDegree = this .vOrder_ .getValue () - 1;

			var surface = this .surface = (this .surface || nurbs) ({
				boundary: ["open", "open"],
				degree: [uDegree, vDegree],
				knots: [uKnots, vKnots],
				weights: weights,
				points: controlPoints,
				debug: false,
			});

			var
				mesh        = sample (this .mesh, surface),
				cells       = mesh .cells,
				normals     = mesh .normals,
				points      = mesh .positions,
				normalArray = this .getNormals (),
				vertexArray = this .getVertices ();

			for (var i = 0, length = cells .length; i < length; ++ i)
			{
				var index = cells [i] * 3;

				normalArray .push (normals [index], normals [index + 1], normals [index + 2]);
				vertexArray .push (points [index], points [index + 1], points [index + 2], 1);
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (true);
		},
	});

	return X3DNurbsSurfaceGeometryNode;
});


