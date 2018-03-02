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
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DCast,
          TraverseType,
          X3DConstants,
          Matrix4)
{
"use strict";

	function LayoutGroup (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .LayoutGroup);

		this .viewportNode    = null;
		this .layoutNode      = null;
		this .modelViewMatrix = new Matrix4 ();
		this .screenMatrix    = new Matrix4 ();
	}

	LayoutGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: LayoutGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "layout",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "viewport",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LayoutGroup";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);

			this .viewport_ .addInterest ("set_viewport__", this);
			this .layout_   .addInterest ("set_layout__", this);
		
			this .set_viewport__ ();
			this .set_layout__ ();
		},
		set_viewport__: function ()
		{
			this .viewportNode = X3DCast (X3DConstants .X3DViewportNode, this .viewport_);
		},
		set_layout__: function ()
		{
			this .layoutNode = X3DCast (X3DConstants .X3DLayoutNode, this .layout_);
		},
		getBBox: function (bbox)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox) .multRight (this .getMatrix ());
		},
		getMatrix: function ()
		{
			try
			{
				if (this .layoutNode)
					this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
				else
					this .matrix .identity ();
			}
			catch (error)
			{ }
		
			return this .matrix;
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .POINTER:
				case TraverseType .CAMERA:
				case TraverseType .DEPTH:
				case TraverseType .DISPLAY:
				{
					if (this .viewportNode)
						this .viewportNode .push ();

					if (this .layoutNode)
					{
						var modelViewMatrix = renderObject .getModelViewMatrix ();

						this .modelViewMatrix .assign (modelViewMatrix .get ());

						modelViewMatrix .push ();
						modelViewMatrix .set (this .screenMatrix .assign (this .layoutNode .transform (type, renderObject)));
						renderObject .getLayouts () .push (this .layoutNode);

						X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

						renderObject .getLayouts () .pop ();
						modelViewMatrix .pop ();
					}
					else
						X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
		
					if (this .viewportNode)
						this .viewportNode .pop ();
		
					break;
				}
			}
		},
	});

	return LayoutGroup;
});


