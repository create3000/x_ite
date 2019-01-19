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
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/NURBS/NurbsPatchSurface",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Triangle2",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          NurbsPatchSurface, 
          X3DConstants,
          Line3,
          Triangle2,
          Vector3)
{
"use strict";

	function NurbsSurfaceInterpolator (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .NurbsSurfaceInterpolator);

		this .geometry = new NurbsPatchSurface (executionContext);
	}

	NurbsSurfaceInterpolator .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: NurbsSurfaceInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFVec2f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",           new Fields .SFInt32 (3)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",           new Fields .SFInt32 (3)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",            new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",            new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",           new Fields .MFDouble ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "normal_changed",   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed", new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "NurbsSurfaceInterpolator";
		},
		getComponentName: function ()
		{
			return "NURBS";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			this .set_fraction_ .addInterest ("set_fraction__", this);

			this .uOrder_       .addFieldInterest (this .geometry .uOrder_);
			this .vOrder_       .addFieldInterest (this .geometry .vOrder_);
			this .uDimension_   .addFieldInterest (this .geometry .uDimension_);
			this .vDimension_   .addFieldInterest (this .geometry .vDimension_);
			this .uKnot_        .addFieldInterest (this .geometry .uKnot_);
			this .vKnot_        .addFieldInterest (this .geometry .vKnot_);
			this .weight_       .addFieldInterest (this .geometry .weight_);
			this .controlPoint_ .addFieldInterest (this .geometry .controlPoint_);

			this .geometry .uTessellation_ = 128;
			this .geometry .vTessellation_ = 128;
			this .geometry .uOrder_        = this .uOrder_;
			this .geometry .vOrder_        = this .vOrder_;
			this .geometry .uDimension_    = this .uDimension_;
			this .geometry .vDimension_    = this .vDimension_;
			this .geometry .uKnot_         = this .uKnot_;
			this .geometry .vKnot_         = this .vKnot_;
			this .geometry .weight_        = this .weight_;
			this .geometry .controlPoint_  = this .controlPoint_;

			this .geometry .setup ();
		},
		set_fraction__: (function ()
		{
			var
				a     = new Vector3 (0, 0, 0),
				b     = new Vector3 (0, 0, 0),
				c     = new Vector3 (0, 0, 0),
				point = new Vector3 (0, 0, 0),
				line  = new Line3 (Vector3 .Zero, Vector3 .zAxis),
				uvt   = { };

			return function ()
			{
				var
					fraction       = this .set_fraction_ .getValue (),
					texCoordsArray = this .geometry .getTexCoords (),
					normalArray    = this .geometry .getNormals (),
					verticesArray  = this .geometry .getVertices ();
	
				for (var i4 = 0, i3 = 0, length = texCoordsArray .length; i4 < length; i4 += 12, i3 += 9)
				{
					a .set (texCoordsArray [i4 + 0], texCoordsArray [i4 + 1], 0);
					b .set (texCoordsArray [i4 + 4], texCoordsArray [i4 + 5], 0);
					c .set (texCoordsArray [i4 + 7], texCoordsArray [i4 + 9], 0);
	
					if (Triangle2 .isPointInTriangle (a, b, c, fraction))
					{
						line .set (point .set (fraction .x, fraction .y, 0), Vector3 .zAxis);

						if (line .intersectsTriangle (a, b, c, uvt))
						{
							var
								u = uvt .u,
								v = uvt .v,
								t = 1 - u - v;

							var normal = new Vector3 (t * normalArray [i3 + 0] + u * normalArray [i3 + 3] + v * normalArray [i3 + 6],
							                          t * normalArray [i3 + 1] + u * normalArray [i3 + 4] + v * normalArray [i3 + 7],
							                          t * normalArray [i3 + 2] + u * normalArray [i3 + 5] + v * normalArray [i3 + 8]);

							var position = new Vector3 (t * verticesArray [i4 + 0] + u * verticesArray [i4 + 4] + v * verticesArray [i4 +  8],
							                            t * verticesArray [i4 + 1] + u * verticesArray [i4 + 5] + v * verticesArray [i4 +  9],
							                            t * verticesArray [i4 + 2] + u * verticesArray [i4 + 6] + v * verticesArray [i4 + 10]);

							this .normal_changed_   = normal;
							this .position_changed_ = position;
						}
					}
				}
			};
		})(),
	});

	return NurbsSurfaceInterpolator;
});


