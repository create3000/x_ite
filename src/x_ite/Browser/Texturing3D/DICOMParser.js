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
	"dicom-parser",
],
function (dicomParser)
{
"use strict";

	function DicomParser ()
	{
		this .dicom = { dicom: false };
	}

	DicomParser .prototype =
	{
		parse: function (input)
		{
			try
			{
				var byteArray = new Uint8Array (input .length);

				for (var i = 0, length = input .length; i < length; ++ i)
					byteArray [i] = input .charCodeAt (i);

				this .dataSet = dicomParser .parseDicom (byteArray);
				this .dicom .dicom = true;
			}
			catch (error)
			{
				console .log (error);
				this .dicom .dicom = false;
				return this .dicom;
			}

			this .getType ();
			this .getComponents ();
			this .getWidth ();
			this .getHeight ();
			this .getDepth ();
			this .getBitsAllocated ();
			this .getPixelData ();

			console .log (this .dicom);

			return this .dicom;
		},
		getType: function ()
		{
			var
				typeElement = this .dataSet .elements .x00280004,
				type        = new Uint8Array (this .dataSet .byteArray .buffer, typeElement .dataOffset, typeElement .length);

			this .type = String .fromCharCode .apply (String, type) .trim ();

			console .log (this .type);
		},
		getComponents: function ()
		{
			var
				componentsElement = this .dataSet .elements .x00280002,
				components        = new Uint16Array (this .dataSet .byteArray .buffer, componentsElement .dataOffset, componentsElement .length);

			this .dicom .components = components [0];
		},
		getWidth: function ()
		{
			var
				widthElement = this .dataSet .elements .x00280011,
				width        = new Uint16Array (this .dataSet .byteArray .buffer, widthElement .dataOffset, widthElement .length);

			this .dicom .width = width [0];
		},
		getHeight: function ()
		{
			var
				heightElement = this .dataSet .elements .x00280010,
				height        = new Uint16Array (this .dataSet .byteArray .buffer, heightElement .dataOffset, heightElement .length);

			this .dicom .height = height [0];
		},
		getDepth: function ()
		{
			var depthElement = this .dataSet .elements .x00280008;

			if (depthElement)
			{
				var depth = new Uint16Array (this .dataSet .byteArray .buffer, depthElement .dataOffset, depthElement .length);

				this .dicom .depth = depth [0];
			}
			else
			{
				this .dicom .depth = 1;
			}
		},
		getBitsAllocated: function ()
		{
			var
				bitsElement = this .dataSet .elements .x00280100,
				bits        = new Uint16Array (this .dataSet .byteArray .buffer, bitsElement .dataOffset, bitsElement .length);

			this .bitsAllocated = bits [0];
			console .log (this .bitsAllocated);
		},
		getPixelData: function ()
		{
			var pixelElement = this .dataSet .elements .x7fe00010;

			switch (this .type)
			{
				case "MONOCHROME1":
				{
					switch (this .bitsAllocated)
					{
						case 8:
						{
							var data = new Uint8Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length);
							break;
						}
						case 16:
						{
							var
								data16 = new Uint16Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length / 2),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
						case 32:
						{
							var
								data16 = new Uint32Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length / 4),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
					}

					for (var i = 0, length = data .length; i < length; ++ i)
						data [i] = 255 - data [i];

					this .dicom .data = data;
					break;
				}
				case "MONOCHROME2":
				{
					switch (this .bitsAllocated)
					{
						case 8:
						{
							var data = new Uint8Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length);
							break;
						}
						case 16:
						{
							var
								data16 = new Uint16Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length / 2),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
						case 32:
						{
							var
								data16 = new Uint32Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length / 4),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
					}

					this .dicom .data = data;
					break;
				}
				default:
					throw new Error ("DICOM: unsupported image type '" + this .type + "'.");
			}
		},
		getPixelFactor: function (data)
		{
			var max = 0;

			for (var i = 0, length = data .length; i < length; ++ i)
				max = Math .max (max, data [i]);

			return 1 / max * 255;
		}
	};

	return DicomParser;
});
