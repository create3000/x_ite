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
	"x-ite/Components/Texturing/X3DTextureNode",
	"x-ite/Bits/X3DCast",
	"x-ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DTextureNode,
          X3DCast,
          X3DConstants)
{
"use strict";

   var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

	function X3DTexture2DNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTexture2DNode);

		this .width  = 0;
		this .height = 0;
		this .flipY  = false;
		this .data   = null;
	}

	X3DTexture2DNode .prototype = $.extend (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DTexture2DNode,
		initialize: function ()
		{
			X3DTextureNode .prototype .initialize .call (this);
			
			var gl = this .getBrowser () .getContext ();
			
			this .target = gl .TEXTURE_2D;

			this .repeatS_           .addInterest ("updateTextureProperties", this);
			this .repeatT_           .addInterest ("updateTextureProperties", this);
			this .textureProperties_ .addInterest ("set_textureProperties__", this);

			gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
			gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
		
			this .set_textureProperties__ ();
		},
		set_textureProperties__: function ()
		{
			if (this .texturePropertiesNode)
				this .texturePropertiesNode .removeInterest ("updateTextureProperties", this);

			this .texturePropertiesNode = X3DCast (X3DConstants .TextureProperties, this .textureProperties_);

			if (! this .texturePropertiesNode)
				this .texturePropertiesNode = this .getBrowser () .getDefaultTextureProperties ();

			this .texturePropertiesNode .addInterest ("updateTextureProperties", this);

			this .updateTextureProperties ();
		},
		getTarget: function ()
		{
			return this .target;
		},
		getWidth: function ()
		{
			return this .width;
		},
		getHeight: function ()
		{
			return this .height;
		},
		getFlipY: function ()
		{
			return this .flipY;
		},
		getData: function ()
		{
			return this .data;
		},
		setTexture: function (width, height, transparent, data, flipY)
		{
			try
			{
				this .transparent_ = transparent;
				this .width        = width;
				this .height       = height;
				this .flipY        = flipY;
				this .data         = data;
	
				var gl = this .getBrowser () .getContext ();
	
				gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, flipY);
				gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);
				gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
				gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, width, height, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);
	
				this .updateTextureProperties ();
				this .addNodeEvent ();
			}
			catch (error)
			{ }
		},
		updateTexture: function (data, flipY)
		{
			try
			{
				this .data = data;
	
				var gl = this .getBrowser () .getContext ();
	
				gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, flipY);
				gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
				gl .texSubImage2D (gl .TEXTURE_2D, 0, 0, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);
	
				if (this .texturePropertiesNode .generateMipMaps_ .getValue ())
					gl .generateMipmap (gl .TEXTURE_2D);
	
				this .addNodeEvent ();
			}
			catch (error)
			{ }
		},
		updateTextureProperties: function ()
		{
			var gl = this .getBrowser () .getContext ();

			X3DTextureNode .prototype .updateTextureProperties .call (this,
			                                                          gl .TEXTURE_2D,
			                                                          this .textureProperties_ .getValue (),
			                                                          this .texturePropertiesNode,
			                                                          this .width,
			                                                          this .height,
			                                                          this .repeatS_ .getValue (),
			                                                          this .repeatT_ .getValue (),
			                                                          false);
		},
		clear: function ()
		{
			this .setTexture (1, 1, false, defaultData, false);
		},
		resize: function (input, inputWidth, inputHeight, outputWidth, outputHeight)
		{
		   // Nearest neighbor scaling algorithm for very small images.

			var
				output = new Uint8Array (outputWidth * outputHeight * 4),
				scaleX = outputWidth / inputWidth,
				scaleY = outputHeight / inputHeight;

			for (var y = 0; y < outputHeight; ++ y)
			{
				var
					inputW  = Math .floor (y / scaleY) * inputWidth,
					outputW = y * outputWidth;

				for (var x = 0; x < outputWidth; ++ x)
				{
					var
						index       = (inputW + Math.floor (x / scaleX)) * 4,
						indexScaled = (outputW + x) * 4;

					output [indexScaled]     = input [index];
					output [indexScaled + 1] = input [index + 1];
					output [indexScaled + 2] = input [index + 2];
					output [indexScaled + 3] = input [index + 3];
				}
			}

			return output;
		},
		setShaderUniforms: function (gl, shaderObject, i)
		{
			shaderObject .textureTypeArray [i] = 2;
			gl .activeTexture (gl .TEXTURE2);
			gl .bindTexture (gl .TEXTURE_2D, this .getTexture ());
			gl .uniform1iv (shaderObject .x3d_TextureType, shaderObject .textureTypeArray); // TODO: Put this in X3DProgramableShaderObject
		},
	});

	return X3DTexture2DNode;
});


