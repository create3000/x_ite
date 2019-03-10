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
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode, 
          X3DCast,
          X3DConstants)
{
"use strict";

	function IndexedLineSet (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .IndexedLineSet);

		this .setGeometryType (1);

		this .fogCoordNode = null;
		this .colorNode    = null;
		this .coordNode    = null;
	}

	IndexedLineSet .prototype = Object .assign (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: IndexedLineSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "colorIndex",     new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",     new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",         new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",          new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "IndexedLineSet";
		},
		getComponentName: function ()
		{
			return "Rendering";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DLineGeometryNode .prototype .initialize .call (this);

			this .attrib_   .addInterest ("set_attrib__",   this);
			this .fogCoord_ .addInterest ("set_fogCoord__", this);
			this .color_    .addInterest ("set_color__",    this);
			this .coord_    .addInterest ("set_coord__",    this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINES);
			this .setSolid (false);
			
			this .set_attrib__ ();
			this .set_fogCoord__ ();
			this .set_color__ ();
			this .set_coord__ ();
		},
		set_attrib__: function ()
		{
			var attribNodes = this .getAttrib ();

			for (var i = 0, length = attribNodes .length; i < length; ++ i)
				attribNodes [i] .removeInterest ("requestRebuild", this);

			attribNodes .length = 0;

			for (var i = 0, length = this .attrib_ .length; i < length; ++ i)
			{
				var attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, this .attrib_ [i]);

				if (attribNode)
					attribNodes .push (attribNode);
			}

			for (var i = 0; i < this .attribNodes .length; ++ i)
				attribNodes [i] .addInterest ("requestRebuild", this);
		},
		set_fogCoord__: function ()
		{
			if (this .fogCoordNode)
				this .fogCoordNode .removeInterest ("requestRebuild", this);

			this .fogCoordNode = X3DCast (X3DConstants .FogCoordinate, this .fogCoord_);

			if (this .fogCoordNode)
				this .fogCoordNode .addInterest ("requestRebuild", this);
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest ("requestRebuild",    this);
				this .colorNode .removeInterest ("set_transparent__", this);
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest ("requestRebuild",    this);
				this .colorNode .addInterest ("set_transparent__", this);

				this .set_transparent__ ();
			}
			else
				this .setTransparent (false);
		},
		set_transparent__: function ()
		{
			this .setTransparent (this .colorNode .isTransparent ());
		},
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest ("requestRebuild", this);

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest ("requestRebuild", this);
		},
		getColorPerVertexIndex: function (index)
		{
			if (index < this .colorIndex_ .length)
				return this .colorIndex_ [index];

			return this .coordIndex_ [index];
		},
		getColorIndex: function (index)
		{
			if (index < this .colorIndex_ .length)
				return this .colorIndex_ [index];

			return index;
		},
		getPolylineIndices: function ()
		{
			var
				coordIndex = this .coordIndex_,
				polylines  = [ ],
				polyline   = [ ];

			if (coordIndex .length)
			{
				var i = 0;

				for (var i = 0, length = coordIndex .length; i < length; ++ i)
				{
					var index = coordIndex [i];

					if (index >= 0)
						// Add vertex.
						polyline .push (i);

					else
					{
						// Negativ index.
						// Add polylines.
						polylines .push (polyline);

						polyline = [ ];
					}
				}

				if (coordIndex [coordIndex .length - 1] >= 0)
				{
					polylines .push (polyline);
				}
			}

			return polylines;
		},
		build: function ()
		{
			if (! this .coordNode || this .coordNode .isEmpty ())
				return;

			var
				coordIndex     = this .coordIndex_,
				polylines      = this .getPolylineIndices (),
				colorPerVertex = this .colorPerVertex_ .getValue (),
				attribNodes    = this .getAttrib (),
				numAttrib      = attribNodes .length,
				attribs        = this .getAttribs (),
				fogCoordNode   = this .fogCoordNode,
				colorNode      = this .colorNode,
				coordNode      = this .coordNode,
				fogDepthArray  = this .getFogDepths (),
				colorArray     = this .getColors (),
				vertexArray    = this .getVertices ();

			// Fill GeometryNode

			var face = 0;

			for (var p = 0, pl = polylines .length; p < pl; ++ p)
			{
				var polyline = polylines [p];
			
				// Create two vertices for each line.

				if (polyline .length > 1)
				{
					for (var line = 0, l_end = polyline .length - 1; line < l_end; ++ line)
					{
						for (var l = line, i_end = line + 2; l < i_end; ++ l)
						{
							var
								i     = polyline [l],
								index = coordIndex [i];

							for (var a = 0; a < numAttrib; ++ a)
								attribNodes [a] .addValue (index, attribs [a]);

							if (fogCoordNode)
								fogCoordNode .addDepth (index, fogDepthArray);

							if (colorNode)
							{
								if (colorPerVertex)
									colorNode .addColor (this .getColorPerVertexIndex (i), colorArray);
								else
									colorNode .addColor (this .getColorIndex (face), colorArray);
							}

							coordNode .addPoint (index, vertexArray);
						}
					}
				}

				++ face;
			}
		},
	});

	return IndexedLineSet;
});


