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
	"jpeg",
],
function (dicomParser,
          jpeg)
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
				var inputArray = new Uint8Array (input .length);

				for (var i = 0, length = input .length; i < length; ++ i)
					inputArray [i] = input .charCodeAt (i);

				this .dataSet      = dicomParser .parseDicom (inputArray);
				this .dicom .dicom = true;
			}
			catch (error)
			{
				console .log (error);
				this .dicom .dicom = false;
				return this .dicom;
			}

			this .getPhotometricInterpretation ();
			this .getComponents ();
			this .getWidth ();
			this .getHeight ();
			this .getDepth ();
			this .getBitsAllocated ();
			this .getPlanarConfiguration ();
			this .getTansferSyntax ();
			this .getPixelData ();

			console .log (this .dicom);

			return this .dicom;
		},
		getPhotometricInterpretation: function ()
		{
			// https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280004
			this .photometricInterpretation = this .dataSet .string ("x00280004");
			//console .log (this .photometricInterpretation);
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
			this .bitsAllocated  = this .dataSet .uint16 ("x00280100");
		},
		getPlanarConfiguration: function ()
		{
			this .planarConfiguration = this .dataSet .uint16 ("x00280006") || 0;
			//console .log (this .planarConfiguration);
		},
		getTansferSyntax: function ()
		{
			this .transferSyntax = this .dataSet .string ("x00020010");
			//console .log (this .transferSyntax);
		},
		getPixelData: function ()
		{
			var
				dicom        = this .dicom,
				pixelElement = this .dataSet .elements .x7fe00010 || dataSet .elements .x7fe00008,
				imageLength  = dicom .width * dicom .height * dicom .components,
				byteLength   = imageLength * dicom .depth,
				bytes        = new Uint32Array (byteLength),
				frames       = this .getFrames (pixelElement);

			frames .forEach (function (frame, i)
			{
				var
					frameArray  = frame .array,
					frameOffset = frame .position,
					frameLength = frame .length;

				// https://www.dicomlibrary.com/dicom/transfer-syntax/

				switch (this .transferSyntax)
				{
					case "1.2.840.10008.1.2":      // Implicit VR Little Endian
					case "1.2.840.10008.1.2.1":    // Explicit VR Little Endian
					case "1.2.840.10008.1.2.1.99": // Deflated Explicit VR Little Endian
					{
						break;
					}
					case "1.2.840.10008.1.2.5": // RLE Lossless
					{
						frameArray  = this .decodeRLE (frameArray .buffer, frameOffset, frameLength, imageLength * this .bitsAllocated / 8);
						frameOffset = 0;
						frameLength = frameArray .length;
						break;
					}
					case "1.2.840.10008.1.2.4.50": // JPEG Baseline lossy process 1 (8 bit)
					case "1.2.840.10008.1.2.4.51": // JPEG Baseline lossy process 2 & 4 (12 bit)
					{
						frameArray  = this .decodeJPEGBaseline (frameArray);
						frameOffset = 0;
						frameLength = frameArray .length;

						this .bitsAllocated = 8;
						break;
					}
					case "1.2.840.10008.1.2.2": // Explicit VR Big Endian (retired)
					{
						throw new Error ("DICOM: Explicit VR Big Endian is not supported.");
					}
					case "1.2.840.10008.1.2.4.52":
					case "1.2.840.10008.1.2.4.53":
					case "1.2.840.10008.1.2.4.54":
					case "1.2.840.10008.1.2.4.55":
					case "1.2.840.10008.1.2.4.56":
					case "1.2.840.10008.1.2.4.57": // JPEG Lossless, Nonhierarchical (Processes 14)
					case "1.2.840.10008.1.2.4.58":
					case "1.2.840.10008.1.2.4.59":
					case "1.2.840.10008.1.2.4.60":
					case "1.2.840.10008.1.2.4.61":
					case "1.2.840.10008.1.2.4.62":
					case "1.2.840.10008.1.2.4.63":
					case "1.2.840.10008.1.2.4.64":
					case "1.2.840.10008.1.2.4.65":
					case "1.2.840.10008.1.2.4.66":
					case "1.2.840.10008.1.2.4.70": // JPEG Lossless, Nonhierarchical (Processes 14 [Selection 1])
					case "1.2.840.10008.1.2.4.80": // JPEG-LS Lossless Image Compression
					case "1.2.840.10008.1.2.4.81": // JPEG-LS Lossy (Near-Lossless) Image Compression
					case "1.2.840.10008.1.2.4.90": // JPEG 2000 Lossless
					case "1.2.840.10008.1.2.4.91": // JPEG 2000 Lossy
					case "1.2.840.10008.1.2.4.92":
					case "1.2.840.10008.1.2.4.93":
					{
						// JPEG
						console .log (this .transferSyntax);
						throw new Error ("DICOM: this JPEG encoding is not supported.");
					}
					default:
					{
						throw new Error ("DICOM: unsupported transfer syntax '" + this .transferSyntax + "'.");
					}
				}

				var b = i * imageLength;

				switch (this .photometricInterpretation)
				{
					case "MONOCHROME1":
					case "MONOCHROME2":
					{
						switch (this .bitsAllocated)
						{
							case 8:
							{
								var data = new Uint8Array (frameArray .buffer, frameOffset, frameLength);

								for (var i = 0, length = data .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
							case 16:
							{
								var data = new Uint16Array (frameArray .buffer, frameOffset, frameLength / 2);

								for (var i = 0, length = data .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
							case 32:
							{
								var data = new Uint32Array (frameArray .buffer, frameOffset, frameLength / 4);

								for (var i = 0, length = data32 .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
						}

						break;
					}
					case "RGB":
					{
						switch (this .bitsAllocated)
						{
							case 8:
							{
								var data = new Uint8Array (frameArray .buffer, frameOffset, frameLength);

								for (var i = 0, length = data .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
							case 16:
							{
								var data = new Uint16Array (frameArray .buffer, frameOffset, frameLength / 2);

								for (var i = 0, length = data .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
							case 32:
							{
								var data = new Uint32Array (frameArray .buffer, frameOffset, frameLength / 4);

								for (var i = 0, length = data .length; i < length; ++ i)
									bytes [b ++] = data [i];

								break;
							}
						}

						break;
					}
					default:
						throw new Error ("DICOM: unsupported image type '" + this .photometricInterpretation + "'.");
				}
			}
			.bind (this));

			// Normalize pixels in the range [0, 255].

			var normalize = this .getPixelOffsetAndFactor (bytes);

			for (var i = 0, length = bytes .length; i < length; ++ i)
				bytes [i] = (bytes [i] - normalize .offset) * normalize .factor;

			// Invert MONOCHROME1 pixels.

			if (this .photometricInterpretation == "MONOCHROME1")
			{
				for (var i = 0, length = bytes .length; i < length; ++ i)
					bytes [i] = 255 - bytes [i];
			}

			// Set Uint8Array.

			dicom .data = new Uint8Array (bytes);
		},
		getFrames: function (pixelElement)
		{
			var frames = [ ];

			if (pixelElement .encapsulatedPixelData)
			{
				if (pixelElement .basicOffsetTable .length)
				{
					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
					{
						var array = dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i);

						frames .push ({ array: array, position: array .byteOffset, length: array .length });
					}
				}
				else if (this .dicom .depth !== pixelElement .fragments .length)
				{
					var basicOffsetTable = dicomParser .createJPEGBasicOffsetTable (this .dataSet, pixelElement);

					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
					{
						var array = dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i, basicOffsetTable);

						frames .push ({ array: array, position: array .byteOffset, length: array .length });
					}
				}
				else
				{
					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
					{
						var array = dicomParser .readEncapsulatedPixelDataFromFragments (this .dataSet, pixelElement, i);

						frames .push ({ array: array, position: array .byteOffset, length: array .length });
					}
				}
			}
			else
			{
				if (pixelElement .fragments)
				{
					pixelElement .fragments .forEach (function (fragment)
					{
						frames .push ({ array: this .dataSet .byteArray, position: fragment .position, length: fragment .length });
					}
					.bind (this));
				}
				else
				{
					frames .push ({ array: this .dataSet .byteArray, position: pixelElement .dataOffset, length: pixelElement .length });
				}
			}

			return frames;
		},
		getPixelOffsetAndFactor: function (data)
		{
			var
				min = Number .POSITIVE_INFINITY,
				max = Number .NEGATIVE_INFINITY;

			for (var i = 0, length = data .length; i < length; ++ i)
			{
				min = Math .min (min, data [i]);
				max = Math .max (max, data [i]);
			}

			return { offset: min, factor: 1 / (max - min) * 255 };
		},
		decodeRLE: function (buffer, offset, length, outputLength)
		{
			// http://dicom.nema.org/dicom/2013/output/chtml/part05/sect_G.5.html
			// http://dicom.nema.org/MEDICAL/dicom/2017b/output/chtml/part05/sect_G.3.2.html

			var
				header   = new DataView (buffer, offset, 64),
				segments = [ ];

			for (var i = 1, headerLength = header .getUint32 (0, true) + 1; i < headerLength; ++ i)
			{
				segments .push (header .getUint32 (i * 4, true));
			}

			segments .push (length);

			var
				segmentsLength = segments .length - 1,
				output         = new Uint8Array (outputLength);

			for (var s = 0; s < segmentsLength; ++ s)
			{
				var
					offset1 = segments [s],
					offset2 = segments [s + 1],
					input   = new Int8Array (buffer, offset + offset1, offset2 - offset1),
					i       = 0,
					o       = 0;

				while (i < input .length)
				{
					// Read the next source byte into n.
					var n = input [i ++];

					if (n >= 0 && n <= 127)
					{
						// Output the next n+1 bytes literally.
						for (var l = i + n + 1; i < l; ++ i, ++ o)
						{
							output [o * segmentsLength + s] = input [i];
						}
					}
					else if (n <= -1 && n >= -127)
					{
						// Output the next byte -n+1 times.
						var b = input [i ++];

						for (var k = 0, l = -n + 1; k < l; ++ k, ++ o)
						{
							output [o * segmentsLength + s] = b;
						}
					}
				}
			}

			return output;
		},
		decodeJPEGBaseline: function (pixelData)
		{
			var jpeg = new JpegImage ();

			jpeg .parse (pixelData);

			jpeg .colorTransform = false;

			return jpeg .getData (this .dicom .width, this .dicom .height);
		 },
	};

	// ftp://medical.nema.org/medical/dicom/DataSets/WG04/

	return DicomParser;
});
