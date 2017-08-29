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
	"x-ite/Basic/X3DFieldDefinition",
	"x-ite/Basic/FieldDefinitionArray",
	"x-ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
	"x-ite/Bits/X3DCast",
	"x-ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode,
          X3DCast,
          X3DConstants)
{
"use strict";

   var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

	function ComposedCubeMapTexture (executionContext)
	{
		X3DEnvironmentTextureNode .call (this, executionContext);

		this .addType (X3DConstants .ComposedCubeMapTexture);

		this .textures   = [null, null, null, null, null, null];
		this .loadStates = 0;
	}

	ComposedCubeMapTexture .prototype = $.extend (Object .create (X3DEnvironmentTextureNode .prototype),
	{
		constructor: ComposedCubeMapTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "front",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "back",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "left",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "right",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "bottom",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "top",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ComposedCubeMapTexture";
		},
		getComponentName: function ()
		{
			return "CubeMapTexturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DEnvironmentTextureNode .prototype .initialize .call (this);

			// Upload default data.

			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (this .getTarget (), this .getTexture ());

			for (var i = 0; i < 6; ++ i)
				gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

			// Initialize.

			this .isLive () .addInterest ("set_live__", this);

			this .front_  .addInterest ("set_texture__", this, 0);
			this .back_   .addInterest ("set_texture__", this, 1);
			this .left_   .addInterest ("set_texture__", this, 2);
			this .right_  .addInterest ("set_texture__", this, 3);
			this .top_    .addInterest ("set_texture__", this, 5);
			this .bottom_ .addInterest ("set_texture__", this, 4);

			this .set_texture__ (this .front_,  0);
			this .set_texture__ (this .back_,   1);
			this .set_texture__ (this .left_,   2);
			this .set_texture__ (this .right_,  3);
			this .set_texture__ (this .top_,    4);
			this .set_texture__ (this .bottom_, 5);

			this .set_live__ ();
		},
		set_texture__: function (node, index)
		{
			var texture = this .textures [index];

			if (texture)
			{
				var callbackName = "set_loadState__" + texture .getId () + "_" + index;

				texture .removeInterest ("set_loadState__", this);
				texture .loadState_ .removeFieldCallback (callbackName);
			}

			var texture = this .textures [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

			if (texture)
			{
				var callbackName = "set_loadState__" + texture .getId () + "_" + index;

				texture .addInterest ("set_loadState__", this, texture, index);
				texture .loadState_ .addFieldCallback (callbackName, this .set_loadState__ .bind (this, null, texture, index));
			}

			this .set_loadState__ (null, texture, index);
		},
		set_loadState__: function (output, texture, index)
		{
			if (texture)
				this .setLoadStateBit (texture .checkLoadState (), index);
			else
				this .setLoadStateBit (X3DConstants .NOT_STARTED, index);

			this .setTextures ();
		},
		setLoadStateBit: function (loadState, bit)
		{
			if (loadState === X3DConstants .COMPLETE_STATE)
				this .loadStates |= 1 << bit;
			else
				this .loadStates &= ~(1 << bit);
		},
		isComplete: function ()
		{
			if (this .loadStates !== 0x3f) // 0b111111
				return false;

			var
				textures = this .textures,
				size     = textures [0] .getWidth ();

			for (var i = 0; i < 6; ++ i)
			{
				var texture = textures [i];

				if (texture .getWidth () !== size)
					return false;

				if (texture .getHeight () !== size)
					return false;
			}

			return true;
		},
		setTextures: function ()
		{
			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (this .getTarget (), this .getTexture ());
			gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

			if (this .isComplete ())
			{
				var textures = this .textures;

				for (var i = 0; i < 6; ++ i)
				{
					var
						gl      = this .getBrowser () .getContext (),
						texture = textures [i],
						width   = texture .getWidth (),
						height  = texture .getHeight (),
						data    = texture .getData ();
	
					gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, !texture .getFlipY ());
					gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);

					if (data instanceof Uint8Array)
						gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
					else
					{
						gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, data);
					}
				}

				this .set_textureQuality__ ();
			}
			else
			{
				for (var i = 0; i < 6; ++ i)
				{
					gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, 1, 1, false, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
				}
			}

			this .set_transparent__ ();
		},
		set_transparent__: function ()
		{
			var
				textures    = this .textures,
				transparent = false;

			if (this .isComplete ())
			{
				for (var i = 0; i < 6; ++ i)
				{
					if (textures [i] .transparent_ .getValue ())
					{
						transparent = true;
						break;
					}
				}
			}

			if (transparent !== this .transparent_ .getValue ())
				this .transparent_ = transparent;
		},
	});

	return ComposedCubeMapTexture;
});


