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
	"x-ite/Components/Rendering/X3DLineGeometryNode",
	"x-ite/Bits/X3DCast",
	"x-ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLineGeometryNode,
          X3DCast,
          X3DConstants)
{
"use strict";

	function LineSet (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .LineSet);

		this .setGeometryType (1);

		this .colorNode = null;
		this .coordNode = null;
	}

	LineSet .prototype = $.extend (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: LineSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "vertexCount", new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "attrib",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fogCoord",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "color",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "coord",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "LineSet";
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

			this .attrib_ .addInterest ("set_attrib__", this);
			this .color_  .addInterest ("set_color__", this);
			this .coord_  .addInterest ("set_coord__", this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINES);
			this .setSolid (false);
			
			this .set_attrib__ ();
			this .set_color__ ();
			this .set_coord__ ();
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
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest ("addNodeEvent", this);

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest ("addNodeEvent", this);
		},
		build: function ()
		{
			if (! this .coordNode || this .coordNode .isEmpty ())
				return;

			// Fill GeometryNode

			var
				vertexCount = this .vertexCount_ .getValue (),
				attribNodes = this .getAttrib (),
				numAttrib   = attribNodes .length,
				attribs     = this .getAttribs (),
				colorNode   = this .colorNode,
				coordNode   = this .coordNode,
				size        = coordNode .getSize (),
				index       = 0;

			for (var c = 0, length = vertexCount .length; c < length; ++ c)
			{
				var count = vertexCount [c] .getValue ();

				if (index + count > size)
					break;

				if (count > 1)
				{
					count = 2 * count - 2; // numVertices for line lines trip

					for (var i = 0; i < count; ++ i, index += i & 1)
					{
						for (var a = 0; a < numAttrib; ++ a)
							attrib [a] .addValue (attribs [a], index);

						if (colorNode)
							this .addColor (colorNode .get1Color (index));

						this .addVertex (coordNode .get1Point (index));
					}

					++ index;
				}
				else
					index += count;
			}
		},
	});

	return LineSet;
});


