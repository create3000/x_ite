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
	"excite/Components/Shape/X3DAppearanceChildNode",
	"excite/Bits/X3DConstants",
	"excite/Bits/TraverseType",
],
function ($,
          X3DAppearanceChildNode, 
          X3DConstants,
          TraverseType)
{
"use strict";

	function X3DShaderNode (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DShaderNode);
	}

	X3DShaderNode .prototype = $.extend (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: X3DShaderNode,
		custom: true,
		setCustom: function (value)
		{
			this .custom = value;
		},
		getCustom: function ()
		{
			return this .custom;
		},
		setGeometryType: function (value)
		{
			this .setShading (value, this .getBrowser () .getBrowserOptions () .Shading_ .getValue ());
		},
		setShading: function (geometryType, shading)
		{
			var gl = this .getBrowser () .getContext ();

			switch (geometryType)
			{
				case 0:
				{
					switch (shading)
					{
						case "POINT":
						case "POINTSET":
						{
							this .primitiveMode = gl .POINTS;
							this .wireframe     = true;
							break;
						}
						case "WIREFRAME":
						{
							this .primitiveMode = gl .POINTS;
							this .wireframe     = true;
							break;
						}
						default:
						{
							// case FLAT:
							// case GOURAUD:
							// case PHONG:
		
							this .primitiveMode = gl .POINTS;
							this .wireframe     = true;
							break;
						}
					}

					break;
				}
				case 1:
				{
					switch (shading)
					{
						case "POINT":
						case "POINTSET":
						{
							this .primitiveMode = gl .POINTS;
							this .wireframe     = true;
							break;
						}
						case "WIREFRAME":
						{
							this .primitiveMode = gl .LINES;
							this .wireframe     = true;
							break;
						}
						default:
						{
							// case FLAT:
							// case GOURAUD:
							// case PHONG:

							this .primitiveMode = gl .LINES;
							this .wireframe     = true;
							break;
						}
					}

					break;
				}
				case 2:
				case 3:
				{
					switch (shading)
					{
						case "POINT":
						case "POINTSET":
						{
							this .primitiveMode = gl .POINTS;
							this .wireframe     = true;
							break;
						}
						case "WIREFRAME":
						{
							this .primitiveMode = gl .LINE_LOOP;
							this .wireframe     = true;
							break;
						}
						default:
						{
							// case FLAT:
							// case GOURAUD:
							// case PHONG:
		
							this .primitiveMode = gl .TRIANGLES;
							this .wireframe     = false;
							break;
						}
					}	

					break;
				}
			}
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .DISPLAY:
					renderObject .getShaders () [this .getId ()] = this;
					break;
				default:
					break;
			}
		},
	});

	return X3DShaderNode;
});


