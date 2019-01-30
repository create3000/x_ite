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
	"x_ite/Components/Geometry3D/Extrusion",
	"x_ite/Components/NURBS/X3DParametricGeometryNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Extrusion, 
          X3DParametricGeometryNode, 
          X3DConstants,
          X3DCast)
{
"use strict";

	function NurbsSweptSurface (executionContext)
	{
		X3DParametricGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .NurbsSweptSurface);

		this .extrusion = new Extrusion (executionContext);
	}

	NurbsSweptSurface .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
	{
		constructor: NurbsSweptSurface,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSectionCurve", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve",   new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "NurbsSweptSurface";
		},
		getComponentName: function ()
		{
			return "NURBS";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DParametricGeometryNode .prototype .initialize .call (this);

			this .crossSectionCurve_ .addInterest ("set_crossSectionCurve__", this);
			this .trajectoryCurve_   .addInterest ("set_trajectoryCurve__",   this);

			var extrusion = this .extrusion;

			extrusion .beginCap_     = false;
			extrusion .endCap_       = false;
			extrusion .solid_        = true;
			extrusion .ccw_          = true;
			extrusion .convex_       = true;
			extrusion .creaseAngle_  = Math .PI;

			extrusion .setup ();

			extrusion .crossSection_ .setTainted (true);
			extrusion .spine_        .setTainted (true);

			this .set_crossSectionCurve__ ();
			this .set_trajectoryCurve__ ();
		},
		set_crossSectionCurve__: function ()
		{
			if (this .crossSectionCurveNode)
				this .crossSectionCurveNode .removeInterest ("requestRebuild", this);

			this .crossSectionCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this .crossSectionCurve_);

			if (this .crossSectionCurveNode)
				this .crossSectionCurveNode .addInterest ("requestRebuild", this);
		},
		set_trajectoryCurve__: function ()
		{
			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .rebuild_ .removeInterest ("requestRebuild", this);

			this .trajectoryCurveNode = X3DCast (X3DConstants .NurbsCurve, this .trajectoryCurve_);

			if (this .trajectoryCurveNode)
				this .trajectoryCurveNode .rebuild_ .addInterest ("requestRebuild", this);
		},
		build: function ()
		{
			if (! this .crossSectionCurveNode)
				return;
		
			if (! this .trajectoryCurveNode)
				return;

			var extrusion = this .extrusion;

			extrusion .crossSection_ = this .crossSectionCurveNode .tessellate (0);
			extrusion .spine_        = this .trajectoryCurveNode   .tessellate (0);

			extrusion .rebuild ();

			this .getColors ()    .assign (extrusion .getColors ());
			this .getTexCoords () .assign (extrusion .getTexCoords ());
			this .getNormals ()   .assign (extrusion .getNormals ());
			this .getVertices ()  .assign (extrusion .getVertices ());

			this .getMultiTexCoords () .push (this .getTexCoords ());

			if (! this .ccw_ .getValue ())
			{
				var normals = this .getNormals ();

				for (var i = 0, length = normals .length; i < length; ++ i)
					normals [i] = -normals [i];
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
	});

	return NurbsSweptSurface;
});


