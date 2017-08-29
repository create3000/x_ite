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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x-ite/Fields",
	"x-ite/Basic/X3DFieldDefinition",
	"x-ite/Basic/FieldDefinitionArray",
	"x-ite/Components/Rendering/X3DGeometryNode",
	"x-ite/Bits/X3DConstants",
	"standard/Math/Numbers/Complex",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode, 
          X3DConstants,
          Complex,
          Vector2,
          Vector3)
{
"use strict";

	function Cylinder (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Cylinder);
	}

	Cylinder .prototype = $.extend (Object .create (X3DGeometryNode .prototype),
	{
		constructor: Cylinder,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "top",      new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "side",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bottom",   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "height",   new Fields .SFFloat (2)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool (true)),
		]),
		getTypeName: function ()
		{
			return "Cylinder";
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
				this .getBrowser () .getCylinderOptions () .addInterest ("eventsProcessed", this);
			else
				this .getBrowser () .getCylinderOptions () .removeInterest ("eventsProcessed", this);
		},
		build: function ()
		{
			var
				options    = this .getBrowser () .getCylinderOptions (),
				xDimension = options .xDimension_ .getValue (),
				texCoords  = [ ],
				normals    = this .getNormals (),
				vertices   = this .getVertices ();

			this .getTexCoords () .push (texCoords);

			var
				radius = this .radius_ .getValue (),
				y1     = this .height_ .getValue () / 2,
				y2     = -y1;

			if (this .side_ .getValue ())
			{
				for (var i = 0; i < xDimension; ++ i)
				{
					var
						u1     = i / xDimension,
						theta1 = 2 * Math .PI * u1,
						n1     = Complex .Polar (-1, theta1),
						p1     = Complex .multiply (n1, radius);

					var
						u2     = (i + 1) / xDimension,
						theta2 = 2 * Math .PI * u2,
						n2     = Complex .Polar (-1, theta2),
						p2     = Complex .multiply (n2, radius);

					// p1 - p4
					//  | \ |
					// p2 - p3

					// Triangle one

					// p1
					texCoords .push (u1, 1, 0, 1);
					normals .push (n1 .imag,  0, n1 .real);
					vertices .push (p1 .imag, y1, p1 .real, 1);

					// p2
					texCoords .push (u1, 0, 0, 1);
					normals .push (n1 .imag,  0, n1 .real);
					vertices .push (p1 .imag, y2, p1 .real, 1);

					// p3
					texCoords .push (u2, 0, 0, 1);
					normals .push (n2 .imag,  0, n2 .real);
					vertices .push (p2 .imag, y2, p2 .real, 1);

					// Triangle two

					// p1
					texCoords .push (u1, 1, 0, 1);
					normals .push (n1 .imag,  0, n1 .real);
					vertices .push (p1 .imag, y1, p1 .real, 1);

					// p3
					texCoords .push (u2, 0, 0, 1);
					normals .push (n2 .imag,  0, n2 .real);
					vertices .push (p2 .imag, y2, p2 .real, 1);

					// p4
					texCoords .push (u2, 1, 0, 1);
					normals .push (n2 .imag,  0, n2 .real);
					vertices .push (p2 .imag, y1, p2 .real, 1);
				}
			}

			if (this .top_ .getValue ())
			{
				var
					texCoord = [ ],
					points   = [ ];

				for (var i = 0; i < xDimension; ++ i)
				{
					var
						u     = i / xDimension,
						theta = 2 * Math .PI * u,
						t     = Complex .Polar (-1, theta);

					texCoord .push (new Vector2 ((t .imag + 1) / 2, -(t .real - 1) / 2));
					points   .push (new Vector3 (t .imag * radius, y1, t .real * radius));
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

					texCoords .push (t0 .x, t0 .y, 0, 1);
					normals .push (0, 1, 0);
					vertices .push (p0 .x, p0 .y, p0 .z, 1);

					texCoords .push (t1 .x, t1 .y, 0, 1);
					normals .push (0, 1, 0);
					vertices .push (p1 .x, p1 .y, p1 .z, 1);

					texCoords .push (t2 .x, t2 .y, 0, 1);
					normals .push (0, 1, 0);
					vertices .push (p2 .x, p2 .y, p2 .z, 1);
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
						t     = Complex .Polar (-1, theta);

					texCoord .push (new Vector2 ((t .imag + 1) / 2, (t .real + 1) / 2));
					points   .push (new Vector3 (t .imag * radius, y2, t .real * radius));
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

					texCoords .push (t0 .x, t0 .y, 0, 1);
					normals .push (0, -1, 0);
					vertices .push (p0 .x, p0 .y, p0 .z, 1);

					texCoords .push (t1 .x, t1 .y, 0, 1);
					normals .push (0, -1, 0);
					vertices .push (p1 .x, p1 .y, p1 .z, 1);

					texCoords .push (t2 .x, t2 .y, 0, 1);
					normals .push (0, -1, 0);
					vertices .push (p2 .x, p2 .y, p2 .z, 1);
				}
			}

			this .setSolid (this .solid_ .getValue ());
			this .setNormals (normals);
			this .setExtents ();
		},
		setExtents: function ()
		{
			var
				radius = this .radius_ .getValue (),
				y1     = this .height_ .getValue () / 2,
				y2     = -y1;

			if (! this .top_ .getValue () && ! this .side_ .getValue () && ! this .bottom_ .getValue ())
			{
				this .getMin () .set (0, 0, 0);
				this .getMax () .set (0, 0, 0);
			}

			else if (! this .top_ .getValue () && ! this .side_ .getValue ())
			{
				this .getMin () .set (-radius, y2, -radius);
				this .getMax () .set ( radius, y2,  radius);
			}

			else if (! this .bottom_ .getValue () && ! this .side_ .getValue ())
			{
				this .getMin () .set (-radius, y1, -radius);
				this .getMax () .set ( radius, y1,  radius);
			}

			else
			{
				this .getMin () .set (-radius, y2, -radius);
				this .getMax () .set ( radius, y1,  radius);
			}
		},
	});

	return Cylinder;
});


