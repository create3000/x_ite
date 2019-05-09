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
	"x_ite/Components/Shape/X3DAppearanceChildNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Texturing/MultiTextureModeType",
	"x_ite/Browser/Texturing/MultiTextureSourceType",
	"x_ite/Browser/Texturing/MultiTextureFunctionType",
],
function (Fields,
          X3DAppearanceChildNode,
          X3DConstants,
          ModeType,
          SourceType,
          FunctionType)
{
"use strict";

	// Anisotropic Filtering in WebGL is handled by an extension, use one of getExtension depending on browser:

	var ANISOTROPIC_EXT = [
		"EXT_texture_filter_anisotropic",
		"MOZ_EXT_texture_filter_anisotropic",
		"WEBKIT_EXT_texture_filter_anisotropic",
	];

	function X3DTextureNode (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureNode);

		this .addChildObjects ("transparent", new Fields .SFBool ());

		this .transparent_ .setAccessType (X3DConstants .outputOnly);
	}

	X3DTextureNode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: X3DTextureNode,
		initialize: function ()
		{
			X3DAppearanceChildNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .texture = gl .createTexture ();
		},
		setTransparent: function (value)
		{
			if (value !== this .transparent_ .getValue ())
				this .transparent_ = value;
		},
		getTransparent: function ()
		{
			return this .transparent_ .getValue ();
		},
		getTexture: function ()
		{
			return this .texture;
		},
		updateTextureProperties: function (target, haveTextureProperties, textureProperties, width, height, repeatS, repeatT, repeatR)
		{
			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (target, this .getTexture ());

			if (Math .max (width, height) < this .getBrowser () .getMinTextureSize () && ! haveTextureProperties)
			{
				// Dont generate mipmaps.
				gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
				gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
			}
			else
			{
				if (textureProperties .generateMipMaps_ .getValue ())
					gl .generateMipmap (target);

				gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter ()]);
				gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter ()]);
			}

			if (haveTextureProperties)
			{
				gl .texParameteri (target, gl .TEXTURE_WRAP_S, gl [textureProperties .getBoundaryModeS ()]);
				gl .texParameteri (target, gl .TEXTURE_WRAP_T, gl [textureProperties .getBoundaryModeT ()]);

				if (gl .getVersion () >= 2)
					gl .texParameteri (target, gl .TEXTURE_WRAP_R, gl [textureProperties .getBoundaryModeR ()]);
			}
			else
			{
				gl .texParameteri (target, gl .TEXTURE_WRAP_S, repeatS ? gl .REPEAT : gl .CLAMP_TO_EDGE);
				gl .texParameteri (target, gl .TEXTURE_WRAP_T, repeatT ? gl .REPEAT : gl .CLAMP_TO_EDGE);

				if (gl .getVersion () >= 2)
					gl .texParameteri (target, gl .TEXTURE_WRAP_R, repeatR ? gl .REPEAT : gl .CLAMP_TO_EDGE);
			}

			//gl .texParameterfv (target, gl .TEXTURE_BORDER_COLOR, textureProperties .borderColor_ .getValue ());
			//gl .texParameterf  (target, gl .TEXTURE_PRIORITY,     textureProperties .texturePriority_ .getValue ());

			for (var i = 0; i < ANISOTROPIC_EXT .length; ++ i)
			{
				var ext = gl .getExtension (ANISOTROPIC_EXT [i]);

				if (ext)
				{
					gl .texParameterf (target, ext .TEXTURE_MAX_ANISOTROPY_EXT, textureProperties .anisotropicDegree_ .getValue ());
					break;
				}
			}
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			this .setShaderUniformsToChannel (gl, shaderObject, 0);

			gl .uniform1i (shaderObject .x3d_NumTextures, 1);
			gl .uniform1i (shaderObject .x3d_MultiTextureMode [0],      ModeType .MODULATE);
			gl .uniform1i (shaderObject .x3d_MultiTextureAlphaMode [0], ModeType .MODULATE);
			gl .uniform1i (shaderObject .x3d_MultiTextureSource [0],    SourceType .DEFAULT);
			gl .uniform1i (shaderObject .x3d_MultiTextureFunction [0],  FunctionType .DEFAULT);
		},
	});

	return X3DTextureNode;
});
