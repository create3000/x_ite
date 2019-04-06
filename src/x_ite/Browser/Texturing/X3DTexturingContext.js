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
	"x_ite/Components/Texturing/TextureProperties",
	"x_ite/Components/Texturing/TextureTransform",
	"x_ite/Components/Texturing/TextureCoordinate",
],
function (TextureProperties,
          TextureTransform,
          TextureCoordinate)
{
"use strict";

	function X3DTexturingContext ()
	{
		this .combinedTextureUnits     = [ ];
		this .defaultTextureProperties = new TextureProperties (this .getPrivateScene ());
		this .defaultTextureTransform  = new TextureTransform (this .getPrivateScene ());
		this .defaultTextureCoordinate = new TextureCoordinate (this .getPrivateScene ());
	}

	X3DTexturingContext .prototype =
	{
		initialize: function ()
		{
			var gl = this .getBrowser () .getContext ();

			// BrowserOptions
			{
				this .defaultTextureProperties .magnificationFilter_ = "NICEST";
				this .defaultTextureProperties .minificationFilter_  = "AVG_PIXEL_AVG_MIPMAP";
				this .defaultTextureProperties .textureCompression_  = "NICEST";
				this .defaultTextureProperties .generateMipMaps_     = true;
			}

			this .maxTextureSize          = gl .getParameter (gl .MAX_TEXTURE_SIZE);
			this .maxCombinedTextureUnits = gl .getParameter (gl .MAX_COMBINED_TEXTURE_IMAGE_UNITS);
			this .textureMemory           = NaN;

			var combinedTextureUnits = this .combinedTextureUnits;

			// For shaders
			for (var i = 1, length = this .maxCombinedTextureUnits; i < length; ++ i)
				combinedTextureUnits .push (i);

			this .defaultTextureProperties .setup ();
			this .defaultTextureTransform  .setup ();
			this .defaultTextureCoordinate .setup ();

			// There must always be a texture bound to the used texture units.

			this .shadowTextureUnit = this .getCombinedTextureUnits () .pop ();

			this .texture2DUnits = new Int32Array (this .getMaxTextures ());

			for (var i = 0, length = this .getMaxTextures (); i < length; ++ i)
				this .texture2DUnits [i] = this .getCombinedTextureUnits () .pop ();

         var defaultData = new Uint8Array ([ 0, 255, 255, 255 ]);

			// Texture 2D Units

			this .defaultTexture2D = gl .createTexture ();

			gl .bindTexture (gl .TEXTURE_2D, this .defaultTexture2D);
			gl .texImage2D  (gl .TEXTURE_2D, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

			gl .activeTexture (gl .TEXTURE0 + this .shadowTextureUnit);
			gl .bindTexture (gl .TEXTURE_2D, this .defaultTexture2D);

			for (var i = 0, length = this .texture2DUnits .length; i < length; ++ i)
			{
				gl .activeTexture (gl .TEXTURE0 + this .texture2DUnits [i]);
				gl .bindTexture (gl .TEXTURE_2D, this .defaultTexture2D);
			}
		
			// Cube Map Texture Units

			this .cubeMapTextureUnits = new Int32Array (this .getMaxTextures ());

			for (var i = 0, length = this .getMaxTextures (); i < length; ++ i)
				this .cubeMapTextureUnits [i] = this .getCombinedTextureUnits () .pop ();

 			this .defaultCubeMapTexture = gl .createTexture ();

			gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .defaultCubeMapTexture);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			gl .texImage2D  (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

			for (var i = 0, length = this .cubeMapTextureUnits .length; i < length; ++ i)
			{
				gl .activeTexture (gl .TEXTURE0 + this .cubeMapTextureUnits [i]);
				gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .defaultCubeMapTexture);
			}

			gl .activeTexture (gl .TEXTURE0);
		},
		getMaxTextures: function ()
		{
			return 1;
		},
		getMinTextureSize: function ()
		{
			return 16;
		},
		getMaxTextureSize: function ()
		{
			return this .maxTextureSize;
		},
		getMaxCombinedTextureUnits: function ()
		{
			return this .maxCombinedTextureUnits;
		},
		getCombinedTextureUnits: function ()
		{
			return this .combinedTextureUnits;
		},
		getTexture2DUnits: function ()
		{
			return this .texture2DUnits;
		},
		getCubeMapTextureUnits: function ()
		{
			return this .cubeMapTextureUnits;
		},
		getShadowTextureUnit: function ()
		{
			return this .shadowTextureUnit;
		},
		getTextureMemory: function ()
		{
			return this .textureMemory;
		},
		getDefaultTextureProperties: function ()
		{
			return this .defaultTextureProperties;
		},
		getDefaultTextureTransform: function ()
		{
			return this .defaultTextureTransform;
		},
		getDefaultTextureCoordinate: function ()
		{
			return this .defaultTextureCoordinate;
		},
	};

	return X3DTexturingContext;
});
