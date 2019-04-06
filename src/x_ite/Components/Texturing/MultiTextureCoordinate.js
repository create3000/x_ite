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
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants,
          X3DCast)
{
"use strict";

	function MultiTextureCoordinate (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .MultiTextureCoordinate);
	}

	MultiTextureCoordinate .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: MultiTextureCoordinate,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "texCoord", new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "MultiTextureCoordinate";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .texCoord_ .addInterest ("set_texCoord__", this);

			this .set_texCoord__ ();
		},
		set_texCoord__: function ()
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				textureCoordinateNodes [i] .removeInterest ("addNodeEvent", this);

			textureCoordinateNodes .length = 0;

			for (var i = 0, length = this .texCoord_ .length; i < length; ++ i)
			{
				var node = this .texCoord_ [i];

				if (X3DCast (X3DConstants .MultiTextureCoordinate, node))
					continue;

				var textureCoordinateNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, node);

				if (textureCoordinateNode)
					textureCoordinateNodes .push (textureCoordinateNode);
			}

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				textureCoordinateNodes [i] .addInterest ("addNodeEvent", this);
		},
		isEmpty: function ()
		{
			return true;
		},
		getSize: function ()
		{
			return 0;
		},
		get1Point: function (index, vector)
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				return textureCoordinateNodes [i] .get1Point (index, vector);

			return vector .set (0, 0, 0, 1);
		},
		init: function (multiArray)
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				return textureCoordinateNodes [i] .init (multiArray);
		},
		addTexCoord: function (index, multiArray)
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				return textureCoordinateNodes [i] .addTexCoordToChannel (index, multiArray [i]);
		},
		addTexCoordToChannel: function (index, array)
		{ },
		getTexCoord: function (array)
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				return textureCoordinateNodes [i] .getTexCoord (array);

			return array;
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			var textureCoordinateNodes = this .textureCoordinateNode;

			for (var i = 0, length = textureCoordinateNodes .length; i < length; ++ i)
				textureCoordinateNodes [i] .setShaderUniformsToChannel (gl, shaderObject, i);

			for (var i = length, length = shaderObject .x3d_MaxTextures; i < length; ++ i)
				gl .uniform1i (shaderObject .x3d_TextureCoordinateGeneratorMode [i], 0);
		},
		setShaderUniformsToChannel: function (gl, shaderObject, channel)
		{ },
	});

	return MultiTextureCoordinate;
});


