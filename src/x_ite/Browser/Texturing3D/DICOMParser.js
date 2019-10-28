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
			this .getTansferSyntax ();
			this .getPixelData ();

			console .log (this .dicom);

			return this .dicom;
		},
		getType: function ()
		{
			this .type = this .dataSet .string ("x00280004");

			console .log (this .type);
		},
		getComponents: function ()
		{
			this .dicom .components = this .dataSet .uint16 ("x00280002");
		},
		getWidth: function ()
		{
			this .dicom .width = this .dataSet .uint16 ("x00280011");
		},
		getHeight: function ()
		{
			this .dicom .height = this .dataSet .uint16 ("x00280010");
		},
		getDepth: function ()
		{
			if (this .dataSet .elements .x00280008)
			{
				this .dicom .depth = this .dataSet .intString ("x00280008");
			}
			else
				this .dicom .depth = 1;
		},
		getBitsAllocated: function ()
		{
			this .bitsAllocated = this .dataSet .uint16 ("x00280100");
			console .log (this .bitsAllocated);
		},
		getTansferSyntax: function ()
		{
			this .transferSyntax = this .dataSet .string ("x00020010");
			console .log (this .transferSyntax);
		},
		getPixelData: function ()
		{
			var
				pixelElement = this .dataSet .elements .x7fe00010,
				byteArray    = this .dataSet .byteArray,
				dataOffset   = pixelElement .dataOffset,
				dataLength   = pixelElement .length;

			switch (this .transferSyntax)
			{
				case "1.2.840.10008.1.2.5":
				{
					// RLE
					throw new Error ("DICOM: RLE endocing is not supported.");
					break;
				}
				case "1.2.840.10008.1.2.4.51":
				{
					// JPEG
					throw new Error ("DICOM: JPEG endocing is not supported.");
					break;
				}
			}

			switch (this .type)
			{
				case "MONOCHROME1":
				case "MONOCHROME2":
				{
					switch (this .bitsAllocated)
					{
						case 8:
						{
							var data = new Uint8Array (byteArray .buffer, dataOffset, dataLength);

							break;
						}
						case 16:
						{
							var
								data16 = new Uint16Array (byteArray .buffer, dataOffset, dataLength / 2),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
						case 32:
						{
							var
								data16 = new Uint32Array (byteArray .buffer, dataOffset, dataLength / 4),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
					}

					if (this .type == "MONOCHROME1")
					{
						for (var i = 0, length = data .length; i < length; ++ i)
							data [i] = 255 - data [i];
					}

					this .dicom .data = data;
					break;
				}
				case "RGB":
				{
					switch (this .bitsAllocated)
					{
						case 8:
						{
							var data = new Uint8Array (byteArray .buffer, dataOffset, dataLength);

							break;
						}
						case 16:
						{
							var
								data16 = new Uint16Array (byteArray .buffer, dataOffset, dataLength / 2),
								data   = new Uint8Array (data16 .length),
								factor = this .getPixelFactor (data16);

							for (var i = 0, length = data16 .length; i < length; ++ i)
								data [i] = data16 [i] * factor;

							break;
						}
						case 32:
						{
							var
								data16 = new Uint32Array (byteArray .buffer, dataOffset, dataLength / 4),
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
