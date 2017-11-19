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
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DCast,
          X3DConstants,
          Triangle3,
          Vector2,
          Vector3)
{
"use strict";

	function ElevationGrid (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .ElevationGrid);

		this .xSpacing_    .setUnit ("length");
		this .zSpacing_    .setUnit ("length");
		this .creaseAngle_ .setUnit ("angle");
		this .height_      .setUnit ("length");

		this .colorNode    = null;
		this .texCoordNode = null;
		this .normalNode   = null;
		this .coordNode    = null;
	}

	ElevationGrid .prototype = $.extend (Object .create (X3DGeometryNode .prototype),
	{
		constructor: ElevationGrid,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "xDimension",      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "zDimension",      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "xSpacing",        new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "zSpacing",        new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",     new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "height",          new Fields .MFFloat ()),
		]),
		getTypeName: function ()
		{
			return "ElevationGrid";
		},
		getComponentName: function ()
		{
			return "Geometry3D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DGeometryNode .prototype .initialize .call (this);

			this .attrib_   .addInterest ("set_attrib__", this);
			this .color_    .addInterest ("set_color__", this);
			this .texCoord_ .addInterest ("set_texCoord__", this);
			this .normal_   .addInterest ("set_normal__", this);

			this .set_attrib__ ();
			this .set_color__ ();
			this .set_texCoord__ ();
			this .set_normal__ ();
		},
		set_attrib__: function ()
		{
			var attribNodes = this .getAttrib ();

			for (var i = 0, length = attribNodes .length; i < length; ++ i)
				attribNodes [i] .removeInterest ("addNodeEvent", this);

			attribNodes .length = 0;

			for (var i = 0, length = this .attrib_ .length; i < length; ++ i)
			{
				var attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, this .attrib_ [i]);

				if (attribNode)
					attribNodes .push (attribNode);
			}

			for (var i = 0; i < this .attribNodes .length; ++ i)
				attribNodes [i] .addInterest ("addNodeEvent", this);
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest ("addNodeEvent", this);
				this .colorNode .removeInterest ("set_transparent__", this);
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest ("addNodeEvent", this);
				this .colorNode .addInterest ("set_transparent__", this);

				this .set_transparent__ ();
			}
			else
				this .transparent_ = false;
		},
		set_transparent__: function ()
		{
			this .transparent_ = this .colorNode .isTransparent ();
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest ("addNodeEvent", this);

			this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest ("addNodeEvent", this);

			this .setCurrentTexCoord (this .texCoordNode);
		},
		set_normal__: function ()
		{
			if (this .normalNode)
				this .normalNode .removeInterest ("addNodeEvent", this);

			this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this .normal_);

			if (this .normalNode)
				this .normalNode .addInterest ("addNodeEvent", this);
		},
		getColor: function ()
		{
			return this .colorNode;
		},
		getTexCoord: function ()
		{
			return this .texCoordNode;
		},
		getNormal: function ()
		{
			return this .normalNode;
		},
		getHeight: function (index)
		{
			if (index < this .height_ .length)
				return this .height_ [index];

			return 0;
		},
		createTexCoords: function ()
		{
			var
				texCoords  = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSize      = xDimension - 1,
				zSize      = zDimension - 1;

			for (var z = 0; z < zDimension; ++ z)
			{
				for (var x = 0; x < xDimension; ++ x)
					texCoords .push (new Vector2 (x / xSize, z / zSize));
			}

			return texCoords;
		},
		createNormals: function (points, coordIndex, creaseAngle)
		{
			var
				cw          = ! this .ccw_ .getValue (),
				normalIndex = [ ],
				normals     = [ ];

			for (var p = 0; p < points .length; ++ p)
				normalIndex [p] = [ ];

			for (var c = 0; c < coordIndex .length; c += 3)
			{
				var
					c0 = coordIndex [c],
					c1 = coordIndex [c + 1],
					c2 = coordIndex [c + 2];
				
				normalIndex [c0] .push (normals .length);
				normalIndex [c1] .push (normals .length + 1);
				normalIndex [c2] .push (normals .length + 2);

				var normal = Triangle3 .normal (points [c0], points [c1], points [c2], new Vector3 (0, 0, 0));

				if (cw)
					normal .negate ();

				normals .push (normal);
				normals .push (normal);
				normals .push (normal);
			}

			return this .refineNormals (normalIndex, normals, this .creaseAngle_ .getValue ());
		},
		createCoordIndex: function ()
		{
			// p1 - p4 
			//  | \ |
			// p2 - p3

			var
				coordIndex = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSize      = xDimension - 1,
				zSize      = zDimension - 1;

			for (var z = 0; z < zSize; ++ z)
			{
				for (var x = 0; x < xSize; ++ x)
				{
					var
						i1 =       z * xDimension + x,
						i2 = (z + 1) * xDimension + x,
						i3 = (z + 1) * xDimension + (x + 1),
						i4 =       z * xDimension + (x + 1);

					coordIndex .push (i1); // p1
					coordIndex .push (i2); // p2
					coordIndex .push (i3); // p3

					coordIndex .push (i1); // p1
					coordIndex .push (i3); // p3
					coordIndex .push (i4); // p4
				}
			}

			return coordIndex;
		},
		createPoints: function ()
		{
			var
				points     = [ ],
				xDimension = this .xDimension_ .getValue (),
				zDimension = this .zDimension_ .getValue (),
				xSpacing   = this .xSpacing_ .getValue (),
				zSpacing   = this .zSpacing_ .getValue ();

			for (var z = 0; z < zDimension; ++ z)
			{
				for (var x = 0; x < xDimension; ++ x)
				{
					points .push (new Vector3 (xSpacing * x,
					                           this .getHeight (x + z * xDimension),
					                           zSpacing * z));
				}
			}

			return points;
		},
		build: function ()
		{
			if (this .xDimension_ .getValue () < 2 || this .zDimension_ .getValue () < 2)
				return;

			var
				colorPerVertex  = this .colorPerVertex_ .getValue (),
				normalPerVertex = this .normalPerVertex_ .getValue (),
				coordIndex      = this .createCoordIndex (),
				attribNodes     = this .getAttrib (),
				numAttrib       = attribNodes .length,
				attribs         = this .getAttribs (),
				colorNode       = this .getColor (),
				texCoordNode    = this .getTexCoord (),
				normalNode      = this .getNormal (),
				points          = this .createPoints (),
				face            = 0;

			if (texCoordNode)
				texCoordNode .init (this .getTexCoords ());
			else
			{
				var texCoords = this .createTexCoords ();
				this .getTexCoords () .push ([ ]);
			}

			// Build geometry

			for (var c = 0, numCoordIndices = coordIndex .length; c < numCoordIndices; ++ face)
			{
				for (var p = 0; p < 6; ++ p, ++ c)
				{
					var index = coordIndex [c];

					for (var a = 0; a < numAttrib; ++ a)
						attribNodes [a] .addValue (attribs [a], index);

					if (colorNode)
					{
						if (colorPerVertex)
							this .addColor (colorNode .get1Color (index));
						else
							this .addColor (colorNode .get1Color (face));
					}
						
					if (texCoordNode)
						texCoordNode .addTexCoord (this .getTexCoords (), index);

					else
					{
						var t = texCoords [index];
						this .getTexCoords () [0] .push (t .x, t .y, 0, 1);
					}

					if (normalNode)
					{
						if (normalPerVertex)
							this .addNormal (normalNode .get1Vector (index));

						else
							this .addNormal (normalNode .get1Vector (face));
					}

					this .addVertex (points [index]);
				}
			}

			// Add auto-generated normals if needed.

			if (! normalNode)
			{
				var normals = this .createNormals (points, coordIndex);

				for (var i = 0; i < normals .length; ++ i)
					this .addNormal (normals [i]);
			}

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
	});

	return ElevationGrid;
});


