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
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTexture2DNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Algorithm",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix3",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture2DNode, 
          X3DConstants,
          Algorithm)
{
"use strict";

	function PixelTexture (executionContext)
	{
		X3DTexture2DNode .call (this, executionContext);

		this .addType (X3DConstants .PixelTexture);

		this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));
	}

	PixelTexture .prototype = Object .assign (Object .create (X3DTexture2DNode .prototype),
	{
		constructor: PixelTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "image",             new Fields .SFImage (0, 0, 0, new Fields .MFInt32 ())),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "PixelTexture";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture2DNode .prototype .initialize .call (this);

			this .image_ .addInterest ("set_image__", this);

			this .set_image__ ();
		},
		checkLoadState: function ()
		{
			return this .loadState_ .getValue ();
		},
		convert: function (data, comp, array, length)
		{
			switch (comp)
			{
				case 1:
				{
					for (var i = 0, index = 0; i < length; ++ i, index += 4)
					{
						var pixel = array [i];

						data [index] =
						data [index + 1] =
						data [index + 2] = pixel & 255;
						data [index + 3] = 255;
					}

					break;
				}
				case 2:
				{
					for (var i = 0, index = 0; i < length; ++ i, index += 4)
					{
						var pixel = array [i];

						data [index] =
						data [index + 1] =
						data [index + 2] = (pixel >>> 8) & 255;
						data [index + 3] = pixel & 255;
					}

					break;
				}
				case 3:
				{
					for (var i = 0, index = 0; i < length; ++ i, index += 4)
					{
						var pixel = array [i];

						data [index]     = (pixel >>> 16) & 255;
						data [index + 1] = (pixel >>>  8) & 255;
						data [index + 2] = pixel & 255;
						data [index + 3] = 255;
					}

					break;
				}
				case 4:
				{
					for (var i = 0, index = 0; i < length; ++ i, index += 4)
					{
						var pixel = array [i];

						data [index]     = (pixel >>> 24);
						data [index + 1] = (pixel >>> 16) & 255;
						data [index + 2] = (pixel >>>  8) & 255;
						data [index + 3] = pixel & 255;
					}

					break;
				}
			}
		},
		set_image__: function ()
		{
			var
				width       = this .image_ .width,
				height      = this .image_ .height,
				comp        = this .image_ .comp,
				array       = this .image_ .array,
				transparent = ! (comp % 2),
				data        = null;
		
			if (width > 0 && height > 0 && comp > 0 && comp < 5)
			{
				if (Algorithm .isPowerOfTwo (width) && Algorithm .isPowerOfTwo (height))
				{
					data = new Uint8Array (width * height * 4);

					this .convert (data, comp, array .getValue (), array .length);
				}
				else if (Math .max (width, height) < this .getBrowser () .getMinTextureSize () && ! this .textureProperties_ .getValue ())
				{
					data = new Uint8Array (width * height * 4);

					this .convert (data, comp, array .getValue (), array .length);

					var
						inputWidth  = width,
						inputHeight = height;

					width  = Algorithm .nextPowerOfTwo (inputWidth)  * 4;
					height = Algorithm .nextPowerOfTwo (inputHeight) * 4;

					data = this .resize (data, inputWidth, inputHeight, width, height);
				}
				else
				{
					var
						canvas1   = $("<canvas></canvas>") [0],
						canvas2   = $("<canvas></canvas>") [0],
						cx1       = canvas1 .getContext("2d"),
						cx2       = canvas2 .getContext("2d"),
						imageData = cx1 .createImageData (width, height);

					canvas1 .width  = width;
					canvas1 .height = height;

					this .convert (imageData .data, comp, array, array .length);
					cx1 .putImageData (imageData, 0, 0);

					width  = Algorithm .nextPowerOfTwo (width);
					height = Algorithm .nextPowerOfTwo (height);

					canvas2 .width  = width;
					canvas2 .height = height;
					
					cx2 .drawImage (canvas1, 0, 0, canvas1 .width, canvas1 .height, 0, 0, width, height);
	
					data = cx2 .getImageData (0, 0, width, height) .data;
				}

				this .setTexture (width, height, transparent, new Uint8Array (data), false);
				this .loadState_ = X3DConstants .COMPLETE_STATE;
			}
			else
			{
				this .clear ();
				this .loadState_ = X3DConstants .FAILED_STATE;
			}
		},
	});

	return PixelTexture;
});


