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
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Complex,
          Vector2,
          Vector3)
{
"use strict";

	function Cone (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Cone);

		this .height_       .setUnit ("length");
		this .bottomRadius_ .setUnit ("length");
	}

	Cone .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: Cone,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "side",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bottom",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "height",       new Fields .SFFloat (2)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bottomRadius", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new Fields .SFBool (true)),
		]),
		getTypeName: function ()
		{
			return "Cone";
		},
		getComponentName: function ()
		{
			return "Geometry3D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		set_live__: function ()
		{
			X3DGeometryNode .prototype .set_live__ .call (this);

			if (this .isLive () .getValue ())
				this .getBrowser () .getConeOptions () .addInterest ("eventsProcessed", this);
			else
				this .getBrowser () .getConeOptions () .removeInterest ("eventsProcessed", this);
		},
		build: function ()
		{
			var
				options       = this .getBrowser () .getConeOptions (),
				xDimension    = options .xDimension_ .getValue (),
				height        = this .height_ .getValue (),
				bottomRadius  = this .bottomRadius_ .getValue (),
				texCoordArray = this .getTexCoords (),
				normalArray   = this .getNormals (),
				vertexArray   = this .getVertices ();

			this .getMultiTexCoords () .push (texCoordArray);

			var
				y1 = height / 2,
				y2 = -y1,
				nz = Complex .Polar (1, -Math .PI / 2 + Math .atan (bottomRadius / height));

			if (this .side_ .getValue ())
			{
				for (var i = 0; i < xDimension; ++ i)
				{
					var
						u1     = (i + 0.5) / xDimension,
						theta1 = 2 * Math .PI * u1,
						n1     = Complex .Polar (nz .imag, theta1);

					var
						u2     = i / xDimension,
						theta2 = 2 * Math .PI * u2,
						p2     = Complex .Polar (-bottomRadius, theta2),
						n2     = Complex .Polar (nz .imag, theta2);

					var
						u3     = (i + 1) / xDimension,
						theta3 = 2 * Math .PI * u3,
						p3     = Complex .Polar (-bottomRadius, theta3),
						n3     = Complex .Polar (nz .imag, theta3);

					/*    p1
					 *   /  \
					 *  /    \
					 * p2 -- p3
					 */

					// p1
					texCoordArray .push (u1, 1, 0, 1);
					normalArray .push (n1 .imag, nz .real, n1 .real);
					vertexArray .push (0, y1, 0, 1);

					// p2
					texCoordArray .push (u2, 0, 0, 1);
					normalArray .push (n2 .imag, nz .real, n2 .real);
					vertexArray .push (p2 .imag, y2, p2 .real, 1);

					// p3
					texCoordArray .push (u3, 0, 0, 1);
					normalArray .push (n3 .imag , nz .real, n3 .real);
					vertexArray .push (p3 .imag, y2, p3 .real, 1);
				}
			}

			if (this .bottom_ .getValue ())
			{
				var
					texCoord = [ ],
					points   = [ ];

				for (var i = xDimension - 1; i > -1; -- i)
				{
					var
						u     = i / xDimension,
						theta = 2 * Math .PI * u,
						t     = Complex .Polar (-1, theta),
						p     = Complex .multiply (t, bottomRadius);

					texCoord .push (new Vector2 ((t .imag + 1) / 2, (t .real + 1) / 2));
					points .push (new Vector3 (p .imag, y2, p .real));
				}

				var
					t0 = texCoord [0],
					p0 = points [0];

				for (var i = 1, length = points .length - 1; i < length; ++ i)
				{
					var
						t1 = texCoord [i],
						t2 = texCoord [i + 1],
						p1 = points [i],
						p2 = points [i + 1];

					texCoordArray .push (t0 .x, t0 .y, 0, 1);
					normalArray .push (0, -1, 0);
					vertexArray .push (p0 .x, p0 .y, p0 .z, 1);

					texCoordArray .push (t1 .x, t1 .y, 0, 1);
					normalArray .push (0, -1, 0);
					vertexArray .push (p1 .x, p1 .y, p1 .z, 1);

					texCoordArray .push (t2 .x, t2 .y, 0, 1);
					normalArray .push (0, -1, 0);
					vertexArray .push (p2 .x, p2 .y, p2 .z, 1);
				}
			}

			this .setSolid (this .solid_ .getValue ());
			this .setExtents ();
		},
		setExtents: function ()
		{
			var
				bottomRadius = this .bottomRadius_ .getValue (),
				y1           = this .height_ .getValue () / 2,
				y2           = -y1;

			if (! this .side_ .getValue () && ! this .bottom_ .getValue ())
			{
				this .getMin () .set (0, 0, 0);
				this .getMax () .set (0, 0, 0);
			}

			else if (! this .side_ .getValue ())
			{
				this .getMin () .set (-bottomRadius, y2, -bottomRadius);
				this .getMax () .set ( bottomRadius, y2,  bottomRadius);
			}

			else
			{
				this .getMin () .set (-bottomRadius, y2, -bottomRadius);
				this .getMax () .set ( bottomRadius, y1, bottomRadius);
			}
		},
	});

	return Cone;
});


