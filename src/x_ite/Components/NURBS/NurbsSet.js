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
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DBoundedObject,
          X3DConstants,
          X3DCast)
{
"use strict";

	function remove (array, first, last, range, rfirst, rlast)
	{
		var set = { };

		for (var i = rfirst; i < rlast; ++ i)
			set [getId (range [i])] = true;

		function compare (value) { return set [getId (value)]; }

		return array .remove (first, last, compare);
	}

	function NurbsSet (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .NurbsSet);

		this .geometryNodes = [ ];
	}

	NurbsSet .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: NurbsSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellationScale", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addGeometry",       new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeGeometry",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "NurbsSet";
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
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .tessellationScale_ .addInterest ("set_tessellationScale__", this);
			this .addGeometry_       .addInterest ("set_addGeometry__",       this);
			this .removeGeometry_    .addInterest ("set_removeGeometry__",    this);
			this .geometry_          .addInterest ("set_geometry__",          this);

			this .set_geometry__ ();
		},
		getBBox: function (bbox)
		{
			// Add bounding boxes

			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
			{
				bbox .add (his .geometryNodes [i] .getBBox ());
			}

			return bbox;
		},
		set_tessellationScale__: function ()
		{
			var tessellationScale = Math .max (0, this .tessellationScale_ .getValue ());

			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
				this .geometryNodes [i] .setTessellationScale (tessellationScale);
		},
		set_addGeometry__: function ()
		{
			this .addGeometry_ .setTainted (true);

			this .addGeometry_ .erase (remove (this .addGeometry_, 0, this .addGeometry_ .length,
			                                   this .geometry_, 0, this .geometry_ .length),
			                           this .addGeometry_ .length);

			for (var i = 0, length = this .addGeometry_ .length; i < length; ++ i)
				this .geometry_ .push (this .addGeometry_ [i]);

			this .addGeometry_ .setTainted (false);
		},
		set_removeGeometry__: function ()
		{
			this .geometry_ .erase (remove (this .geometry_,       0, this .geometry_ .length,
			                                this .removeGeometry_, 0, this .removeGeometry_ .length),
			                        this .geometry__ .length);
		},
		set_geometry__: function ()
		{
			for (var i = 0, length = this .geometryNodes .length; i < length; ++ i)
				this .geometryNodes [i] .setTessellationScale (1);

			this .geometryNodes .length = 0;

			for (var i = 0, length = this .geometry_ .length; i < length; ++ i)
			{
				var geometryNode = X3DCast (X3DConstants .X3DNurbsSurfaceGeometryNode, this .geometry_ [i]);

				if (geometryNode)
					this .geometryNodes .push (geometryNode);
			}

			this .set_tessellationScale__ ();
		},
	});

	return NurbsSet;
});
