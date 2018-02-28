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
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
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

	function PointSet (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .PointSet);

		this .setGeometryType (0);

		this .colorNode    = null;
		this .coordNode    = null;
		this .transparent_ = true;
	}

	PointSet .prototype = $.extend (Object .create (X3DLineGeometryNode .prototype),
	{
		constructor: PointSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "attrib",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fogCoord", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "color",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "coord",    new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "PointSet";
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

			var browser = this .getBrowser ();

			this .setPrimitiveMode (browser .getContext () .POINTS);
			this .setSolid (false);

			this .set_attrib__ ();
			this .set_color__ ();
			this .set_coord__ ();
		},
		getShader: function (browser)
		{
			return browser .getPointShader ();
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
				this .colorNode .removeInterest ("addNodeEvent", this);

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
				this .colorNode .addInterest ("addNodeEvent", this);
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

			var
				attribNodes = this .getAttrib (),
				numAttrib   = attribNodes .length,
				attribs     = this .getAttribs (),
				colorNode   = this .colorNode,
				coordNode   = this .coordNode,
				colorArray  = this .getColors (),
				vertexArray = this .getVertices ();

			for (var a = 0; a < numAttrib; ++ a)
			{
				for (var i = 0, length = coordNode .point_ .length; i < length; ++ i)
					attribNodes [a] .addValue (i, attribs [a]);
			}
			
			if (this .colorNode)
			{
				for (var i = 0, length = coordNode .point_ .length; i < length; ++ i)
					colorNode .addColor (i, colorArray);
			}

			for (var i = 0, length = coordNode .point_ .length; i < length; ++ i)
				coordNode .addPoint (i, vertexArray);
		},
	});

	return PointSet;
});
