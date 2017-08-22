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
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Components/Shaders/X3DVertexAttributeNode",
	"excite/Bits/X3DConstants",
	"standard/Math/Algorithm",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVertexAttributeNode, 
          X3DConstants,
          Algorithm)
{
"use strict";

	function FloatVertexAttribute (executionContext)
	{
		X3DVertexAttributeNode .call (this, executionContext);

		this .addType (X3DConstants .FloatVertexAttribute);
	}

	FloatVertexAttribute .prototype = $.extend (Object .create (X3DVertexAttributeNode .prototype),
	{
		constructor: FloatVertexAttribute,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "name",          new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "numComponents", new Fields .SFInt32 (4)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "value",         new Fields .MFFloat ()),
		]),
		getTypeName: function ()
		{
			return "FloatVertexAttribute";
		},
		getComponentName: function ()
		{
			return "Shaders";
		},
		getContainerField: function ()
		{
			return "attrib";
		},
		addValue: function (array, index)
		{
			var
				size  = Algorithm .clamp (this .numComponents_ .getValue (), 1, 4),
				first = index * size,
				last  = first + size;
		
			if (last <= this .value_ .length)
			{
				for (; first < last; ++ first)
					array .push (this .value_ [first]);
			}
			else
			{
				for (; first < last; ++ first)
					array .push (0);
			}
		},
		enable: function (gl, shaderNode, buffer)
		{
			shaderNode .enableFloatAttrib (gl, this .name_ .getValue (), buffer, Algorithm .clamp (this .numComponents_ .getValue (), 1, 4));
		},
		disable: function (gl, shaderNode)
		{
			shaderNode .disableFloatAttrib (gl, this .name_ .getValue ());
		},
	});

	return FloatVertexAttribute;
});


