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
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function ($,
          X3DGeometryNode,
          X3DCast,
          X3DConstants,
          Vector3)
{
"use strict";

	function X3DComposedGeometryNode (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DComposedGeometryNode);

		this .colorNode    = null;
		this .texCoordNode = null;
		this .normalNode   = null;
		this .coordNode    = null;
	}

	X3DComposedGeometryNode .prototype = $.extend (Object .create (X3DGeometryNode .prototype),
	{
		constructor: X3DComposedGeometryNode,
		initialize: function ()
		{
			X3DGeometryNode .prototype .initialize .call (this);

			this .attrib_   .addInterest ("set_attrib__", this);
			this .color_    .addInterest ("set_color__", this);
			this .texCoord_ .addInterest ("set_texCoord__", this);
			this .normal_   .addInterest ("set_normal__", this);
			this .coord_    .addInterest ("set_coord__", this);

			this .set_attrib__ ();
			this .set_color__ ();
			this .set_texCoord__ ();
			this .set_normal__ ();
			this .set_coord__ ();
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
		getCoord: function ()
		{
			return this .coordNode;
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
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest ("addNodeEvent", this);

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest ("addNodeEvent", this);
		},
		getPolygonIndex: function (index)
		{
			return index;
		},
		getTriangleIndex: function (index)
		{
			return index;
		},
		build: function (verticesPerPolygon, polygonsSize, verticesPerFace, trianglesSize)
		{
			if (! this .coordNode || this .coordNode .isEmpty ())
				return;

			// Set size to a multiple of verticesPerPolygon.

			polygonsSize  -= polygonsSize % verticesPerPolygon;
			trianglesSize -= trianglesSize % verticesPerFace;

			var
				colorPerVertex  = this .colorPerVertex_ .getValue (),
				normalPerVertex = this .normalPerVertex_ .getValue (),
				attribNodes     = this .getAttrib (),
				numAttrib       = attribNodes .length,
				attribs         = this .getAttribs (),
				colorNode       = this .getColor (),
				texCoordNode    = this .getTexCoord (),
				normalNode      = this .getNormal (),
				coordNode       = this .getCoord (),
				textCoords      = this .getTexCoords (),
				face            = 0;

			if (texCoordNode)
				texCoordNode .init (textCoords);
		
			// Fill GeometryNode
		
			for (var i = 0; i < trianglesSize; ++ i)
			{
				face = Math .floor (i / verticesPerFace);

				var index = this .getPolygonIndex (this .getTriangleIndex (i));

				for (var a = 0; a < numAttrib; ++ a)
					attrib [a] .addValue (attribs [a], index);

				if (colorNode)
				{
					if (colorPerVertex)
						this .addColor (colorNode .get1Color (index));
					else
						this .addColor (colorNode .get1Color (face));
				}

				if (texCoordNode)
					texCoordNode .addTexCoord (textCoords, index);
	
				if (normalNode)
				{
					if (normalPerVertex)
						this .addNormal (normalNode .get1Vector (index));

					else
						this .addNormal (normalNode .get1Vector (face));
				}

				this .addVertex (coordNode .get1Point (index));
			}
		
			// Autogenerate normal if not specified.

			if (! this .getNormal ())
				this .buildNormals (verticesPerPolygon, polygonsSize, trianglesSize);

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
		buildNormals: function (verticesPerPolygon, polygonsSize, trianglesSize)
		{
			var normals = this .createNormals (verticesPerPolygon, polygonsSize);

			for (var i = 0; i < trianglesSize; ++ i)
				this .addNormal (normals [this .getTriangleIndex (i)]);
		},
		createNormals: function (verticesPerPolygon, polygonsSize)
		{
			var normals = this .createFaceNormals (verticesPerPolygon, polygonsSize);
		
			if (this .normalPerVertex_ .getValue ())
			{
				var normalIndex = [ ];
		
				for (var i = 0; i < polygonsSize; ++ i)
				{
					var index = this .getPolygonIndex (i);

					if (! normalIndex [index])
						normalIndex [index] = [ ];

					normalIndex [index] .push (i);
				}

				return this .refineNormals (normalIndex, normals, Math .PI);
			}
		
			return normals;
		},
		createFaceNormals: function (verticesPerPolygon, polygonsSize)
		{
			var
				cw      = ! this .ccw_ .getValue (),
				coord   = this .coordNode,
				normals = [ ];

			for (var i = 0; i < polygonsSize; i += verticesPerPolygon)
			{
				var normal = this .getPolygonNormal (verticesPerPolygon, coord);

				if (cw)
					normal .negate ();

				for (var n = 0; n < verticesPerPolygon; ++ n)
					normals .push (normal);
			}

			return normals;
		},
		getPolygonNormal: function (verticesPerPolygon, coord)
		{
			// Determine polygon normal.
			// We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

			var
				normal = new Vector3 (0, 0, 0),
				next   = coord .get1Point (this .getPolygonIndex (0));

			for (var i = 0; i < verticesPerPolygon; ++ i)
			{
				var
					current = next,
					next    = coord .get1Point (this .getPolygonIndex ((i + 1) % verticesPerPolygon));

				normal .x += (current .y - next .y) * (current .z + next .z);
				normal .y += (current .z - next .z) * (current .x + next .x);
				normal .z += (current .x - next .x) * (current .y + next .y);
			}

			return normal .normalize ();
		},
	});

	return X3DComposedGeometryNode;
});


