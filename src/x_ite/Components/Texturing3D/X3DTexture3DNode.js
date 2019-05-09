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
	"x_ite/Components/Texturing/X3DTextureNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DTextureNode,
          X3DConstants)
{
"use strict";

	var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

	function X3DTexture3DNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTexture3DNode);
	}

	X3DTexture3DNode .prototype = Object .assign (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DTexture3DNode,
		initialize: function ()
		{
			X3DTextureNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .target = gl .TEXTURE_3D;

			this .repeatS_           .addInterest ("updateTextureProperties", this);
			this .repeatT_           .addInterest ("updateTextureProperties", this);
			this .repeatR_           .addInterest ("updateTextureProperties", this);
			this .textureProperties_ .addInterest ("set_textureProperties__", this);

			gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
			gl .texImage2D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

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
		getDepth: function ()
		{
			return this .depth;
		},
		getFlipY: function ()
		{
			return false;
		},
		getData: function ()
		{
			return this .data;
		},
		clearTexture: function ()
		{
			this .setTexture (1, 1, 1, false, defaultData, false);
		},
		setTexture: function (width, height, depth, transparent, data)
		{
			try
			{
				this .width  = width;
				this .height = height;
				this .depth  = depth;
				this .data   = data;

				var gl = this .getBrowser () .getContext ();

				if (gl .getVersion () < 2)
					return;

				gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);
				gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);
				gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
				gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, width, height, depth, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);

				this .setTransparent (transparent);
				this .updateTextureProperties ();
				this .addNodeEvent ();
			}
			catch (error)
			{ }
		},
		updateTextureProperties: function ()
		{
			var gl = this .getBrowser () .getContext ();

			X3DTextureNode .prototype .updateTextureProperties .call (this,
			                                                          gl .TEXTURE_3D,
			                                                          this .textureProperties_ .getValue (),
			                                                          this .texturePropertiesNode,
			                                                          this .width,
			                                                          this .height,
			                                                          this .repeatS_ .getValue (),
			                                                          this .repeatT_ .getValue (),
			                                                          this .repeatR_ .getValue ());
		},
		setShaderUniformsToChannel: function (gl, shaderObject, i)
		{
			if (gl .getVersion () >= 2)
			{
				gl .activeTexture (gl .TEXTURE0 + shaderObject .getBrowser () .getTexture3DUnits () [i]);
				gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
			}

			gl .uniform1i (shaderObject .x3d_TextureType [i], 3);
		},
	});

	return X3DTexture3DNode;
});
