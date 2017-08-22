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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Rendering/X3DComposedGeometryNode",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposedGeometryNode, 
          X3DConstants)
{
"use strict";

	function IndexedQuadSet (executionContext)
	{
		X3DComposedGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .IndexedQuadSet);

		this .triangleIndex = [ ];
	}

	IndexedQuadSet .prototype = $.extend (Object .create (X3DComposedGeometryNode .prototype),
	{
		constructor: IndexedQuadSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "index",           new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",           new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "IndexedQuadSet";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DComposedGeometryNode .prototype .initialize .call (this);
		
			this .index_ .addInterest ("set_index__", this);
		
			this .set_index__ ();
		},
		set_index__: function ()
		{
			var
				index         = this .index_ .getValue (),
				length        = index .length,
				triangleIndex = this .triangleIndex;

			length -= length % 4;
			triangleIndex .length = 0;

			for (var i = 0; i < length; i += 4)
			{
				var
					i0 = i,
					i1 = i + 1,
					i2 = i + 2,
					i3 = i + 3;

				triangleIndex .push (i0, i1, i2,  i0, i2, i3);
			}
		},
		getTriangleIndex: function (i)
		{
			return this .triangleIndex [i];
		},
		getPolygonIndex: function (i)
		{
			return this .index_ [i];
		},
		build: function ()
		{
			X3DComposedGeometryNode .prototype .build .call (this, 4, this .index_ .length, 6, this .triangleIndex .length);
		},
	});

	return IndexedQuadSet;
});


