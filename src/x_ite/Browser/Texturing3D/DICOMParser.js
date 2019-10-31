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
	"lib/jpeg/jpeg",
	"jpegLossless",
	"lib/jpeg/jpx",
	"x_ite/DEBUG",
],
function (dicomParser,
          jpeg,
          jpegLossless,
          OpenJPEG,
          DEBUG)
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
			this .getBitsStored ();
			this .getPixelRepresentation ();
			this .getPlanarConfiguration ();
			this .getTansferSyntax ();
			this .getPixelData ();

			if (DEBUG)
				console .log (this);

			return this .dicom;
		},
		getPhotometricInterpretation: function ()
		{
			// https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280004
			this .photometricInterpretation = this .dataSet .string ("x00280004");
		},
		getComponents: function ()
		{
			// https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280002
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
		getBitsStored: function ()
		{
			this .bitsStored  = this .dataSet .uint16 ("x00280101");
		},
		getPixelRepresentation: function ()
		{
			this .pixelRepresentation = this .dataSet .uint16 ("x00280103") || 0;
		},
		getPlanarConfiguration: function ()
		{
			this .planarConfiguration = this .dataSet .uint16 ("x00280006") || 0;
		},
		getTansferSyntax: function ()
		{
			this .transferSyntax = this .dataSet .string ("x00020010");
		},
		getPixelData: function ()
		{
			var
				dicom        = this .dicom,
				pixelElement = this .dataSet .elements .x7fe00010 || this .dataSet .elements .x7fe00008, // pixel or float pixel
				imageLength  = dicom .width * dicom .height * dicom .components,
				byteLength   = imageLength * dicom .depth,
				bytes        = new Uint8Array (byteLength),
				frames       = this .getFrames (pixelElement);

			frames .forEach (function (frame, f)
			{
				// https://www.dicomlibrary.com/dicom/transfer-syntax/

				switch (this .transferSyntax)
				{
					case "1.2.840.10008.1.2":      // Implicit VR Little Endian
					case "1.2.840.10008.1.2.1":    // Explicit VR Little Endian
					case "1.2.840.10008.1.2.1.99": // Deflated Explicit VR Little Endian
					{
						frame = this .decodeLittleEndian (frame);
						break;
					}
					case "1.2.840.10008.1.2.2": // Explicit VR Big Endian (retired)
					{
						frame = this .decodeBigEndian (frame);
						break;
					}
					case "1.2.840.10008.1.2.5": // RLE Lossless
					{
						frame = this .decodeRLE (frame);
						break;
					}
					case "1.2.840.10008.1.2.4.50": // JPEG Baseline lossy process 1 (8 bit)
					case "1.2.840.10008.1.2.4.51": // JPEG Baseline lossy process 2 & 4 (12 bit)
					{
						frame = this .decodeJPEGBaseline (frame);
						break;
					}
					case "1.2.840.10008.1.2.4.57": // JPEG Lossless, Nonhierarchical (Processes 14)
					case "1.2.840.10008.1.2.4.70": // JPEG Lossless, Nonhierarchical (Processes 14 [Selection 1])
					{
						frame = this .decodeJPEGLossless (frame);
						break;
					}
					case "1.2.840.10008.1.2.4.90": // JPEG 2000 Lossless
					case "1.2.840.10008.1.2.4.91": // JPEG 2000 Lossy
					{
						frame = this .decodeJPEG2000 (frame);
						break;
					}
					case "1.2.840.10008.1.2.4.52":
					case "1.2.840.10008.1.2.4.53":
					case "1.2.840.10008.1.2.4.54":
					case "1.2.840.10008.1.2.4.55":
					case "1.2.840.10008.1.2.4.56":
					case "1.2.840.10008.1.2.4.58":
					case "1.2.840.10008.1.2.4.59":
					case "1.2.840.10008.1.2.4.60":
					case "1.2.840.10008.1.2.4.61":
					case "1.2.840.10008.1.2.4.62":
					case "1.2.840.10008.1.2.4.63":
					case "1.2.840.10008.1.2.4.64":
					case "1.2.840.10008.1.2.4.65":
					case "1.2.840.10008.1.2.4.66":
					case "1.2.840.10008.1.2.4.80": // JPEG-LS Lossless Image Compression
					case "1.2.840.10008.1.2.4.81": // JPEG-LS Lossy (Near-Lossless) Image Compression
					case "1.2.840.10008.1.2.4.92":
					case "1.2.840.10008.1.2.4.93":
					{
						// JPEG
						throw new Error ("DICOM: this JPEG encoding (" + this .transferSyntax + ") is not supported.");
					}
					default:
					{
						throw new Error ("DICOM: unsupported transfer syntax '" + this .transferSyntax + "'.");
					}
				}

				frame = this .getTypedArray (frame);

				if (this .pixelRepresentation === 1 && this .bitsStored !== undefined)
				{
					var shift = 32 - this .bitsStored;

					for (var i = 0, length = frame .length; i < length; ++ i)
						frame [i] = frame [i] << shift >> shift;
				}

				var b = f * imageLength;

				switch (this .photometricInterpretation)
				{
					case "MONOCHROME1":
					case "MONOCHROME2":
					case "RGB":
					{
						var normalize = this .getPixelOffsetAndFactor (frame);

						for (var i = 0, length = frame .length; i < length; ++ i, ++ b)
							bytes [b] = (frame [i] - normalize .offset) * normalize .factor;

						// Invert MONOCHROME1 pixels.

						if (this .photometricInterpretation === "MONOCHROME1")
						{
							for (var i = 0, length = bytes .length; i < length; ++ i)
								bytes [i] = 255 - bytes [i];
						}

						break;
					}
					default:
						throw new Error ("DICOM: unsupported image type '" + this .photometricInterpretation + "'.");
				}
			},
			this);

			// Set Uint8Array.

			dicom .data = bytes;
		},
		getFrames: function (pixelElement)
		{
			var frames = [ ];

			if (pixelElement .encapsulatedPixelData)
			{
				if (pixelElement .basicOffsetTable .length)
				{
					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
						frames .push (dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i));
				}
				else if (this .dicom .depth !== pixelElement .fragments .length)
				{
					var basicOffsetTable = dicomParser .createJPEGBasicOffsetTable (this .dataSet, pixelElement);

					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
						frames .push (dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i, basicOffsetTable));
				}
				else
				{
					for (var i = 0, length = this .dicom .depth; i < length; ++ i)
						frames .push (dicomParser .readEncapsulatedPixelDataFromFragments (this .dataSet, pixelElement, i));
				}
			}
			else
			{
				if (pixelElement .fragments)
				{
					pixelElement .fragments .forEach (function (fragment)
					{
						frames .push (new Uint8Array (this .dataSet .byteArray .buffer, fragment .position, fragment .length));
					},
					this);
				}
				else
				{
					frames .push (new Uint8Array (this .dataSet .byteArray .buffer, pixelElement .dataOffset, pixelElement .length));
				}
			}

			if (this .bitsAllocated === 1)
			{
				var pixelsPerFrame = this .dicom .width * this .dicom .height * this .dicom .components;

				frames = frames .map (function (frame, i)
				{
					var frameOffset = pixelElement .dataOffset + i * pixelsPerFrame / 8;

					return this .unpackBinaryFrame (this .dataSet .byteArray, frameOffset, pixelsPerFrame);
				},
				this);

				this .bitsAllocated = 8;
			}

			return frames;
		},
		getTypedArray: function (frame)
		{
			switch (this .bitsAllocated)
			{
				case 8:
					return new (this .pixelRepresentation ? Int8Array : Uint8Array) (frame .buffer, frame .byteOffset, frame .length);
				case 16:
					return new (this .pixelRepresentation ? Int16Array : Uint16Array) (frame .buffer, frame .byteOffset, frame .length / 2);
				case 32:
					return new Float32Array (frame .buffer, frame .byteOffset, frame .length / 4);
			}
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
		unpackBinaryFrame: function (byteArray, frameOffset, pixelsPerFrame)
		{
			function isBitSet (byte, bitPos)
			{
				return byte & (1 << bitPos);
			}

			// Create a new pixel array given the image size
			var pixelData = new Uint8Array (pixelsPerFrame);

			for (var i = 0; i < pixelsPerFrame; ++ i)
			{
				// Compute byte position
				var bytePos = Math .floor (i / 8);

				// Get the current byte
				var byte = byteArray [bytePos + frameOffset];

				// Bit position (0-7) within byte
				var bitPos = (i % 8);

				// Check whether bit at bitpos is set
				pixelData [i] = isBitSet (byte, bitPos) ? 1 : 0;
			}

			return pixelData;
		},
		decodeLittleEndian: function (pixelData)
		{
			var
				buffer = pixelData .buffer,
				offset = pixelData.byteOffset,
				length = pixelData.length;

			if (this .bitsAllocated === 16)
			{
			  // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
			  // buffers on it

			  if (offset % 2)
			  {
					buffer = buffer .slice (offset);
					offset = 0;
				}

				return new Uint8Array (buffer, offset, length);

			}
			else if (this .bitsAllocated === 32)
			{
				// if pixel data is not aligned on even boundary, shift it
				if (offset % 2)
				{
					buffer = buffer .slice (offset);
					offset = 0;
			  	}

				return new Uint8Array (buffer, offset, length);
			}

			return pixelData;
		},
		decodeBigEndian: function (pixelData)
		{
			function swap16 (value)
			{
				return ((value & 0xFF) << 8) | ((value >> 8) & 0xFF);
			}

			if (this .bitsAllocated === 16)
			{
				var
					buffer = pixelData .buffer,
					offset = pixelData .byteOffset,
					length = pixelData .length;

				// if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
				// buffers on it

				if (offset % 2)
				{
					buffer = buffer .slice (offset);
					offset = 0;
				}

				pixelData = new Uint16Array (buffer, offset, length / 2);

				// Do the byte swap
				for (var i = 0, l = pixelData .length; i < l; ++ i)
					pixelData [i] = swap16 (pixelData [i]);

				return new Uint8Array (buffer, offset, length);
			}

			return pixelData;
		},
		decodeRLE: function  (pixelData)
		{
			if (this .bitsAllocated === 8)
			{
				if (this .planarConfiguration)
					 return this .decodeRLE8Planar (pixelData);

				return this .decodeRLE8 (pixelData);
			}

			if (this .bitsAllocated === 16)
				return this .decodeRLE16 (pixelData);

			throw new Error ("DICOM: unsupported pixel format for RLE.");
		},
		decodeRLE8: function  (pixelData)
		{
			const frameData  = pixelData;
			const frameSize  = this .dicom .width * this .dicom .height;
			const components = this .dicom .components;
			const outFrame   = new ArrayBuffer (frameSize * this .dicom .components);
			const header     = new DataView (frameData .buffer, frameData .byteOffset);
			const data       = new Int8Array(frameData .buffer, frameData .byteOffset);
			const out        = new Int8Array (outFrame);

			let   outIndex    = 0;
			const numSegments = header .getInt32 (0, true);

			for (let s = 0; s < numSegments; ++ s)
			{
				outIndex = s;

				let inIndex  = header .getInt32 ((s + 1) * 4, true);
				let maxIndex = header .getInt32 ((s + 2) * 4, true);

				if (maxIndex === 0)
					maxIndex = frameData.length;

				const endOfSegment = frameSize * numSegments;

				while (inIndex < maxIndex)
				{
					const n = data [inIndex ++];

					if (n >= 0 && n <= 127)
					{
						// copy n bytes
						for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++ i)
						{
							out [outIndex] = data [inIndex ++];
							outIndex += components;
						}
					}
					else if (n <= -1 && n >= -127)
					{
						const value = data [inIndex ++];

						// run of n bytes
						for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++ j)
						{
							out [outIndex] = value;
							outIndex += components;
						}
				 	}
				}
			}

			return out;
		},
		decodeRLE8Planar: function  (pixelData)
		{
			const frameData = pixelData;
			const frameSize = this .dicom .width * this .dicom .height;
			const outFrame  = new ArrayBuffer (frameSize * this .dicom .components);
			const header    = new DataView (frameData .buffer, frameData .byteOffset);
			const data      = new Int8Array (frameData .buffer, frameData .byteOffset);
			const out       = new Int8Array (outFrame);

			let   outIndex    = 0;
			const numSegments = header .getInt32 (0, true);

			for (let s = 0; s < numSegments; ++ s)
			{
				outIndex = s * frameSize;

				let inIndex  = header .getInt32 ((s + 1) * 4, true);
				let maxIndex = header .getInt32 ((s + 2) * 4, true);

				if (maxIndex === 0)
					maxIndex = frameData .length;

				const endOfSegment = frameSize * numSegments;

				while (inIndex < maxIndex)
				{
					const n = data [inIndex ++];

					if (n >= 0 && n <= 127)
					{
						// copy n bytes
						for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++ i)
						{
							out [outIndex] = data [inIndex ++];
							outIndex ++;
						}
					}
					else if (n <= -1 && n >= -127)
					{
						const value = data[inIndex++];

						// run of n bytes
						for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++ j)
						{
							out [outIndex] = value;
							outIndex ++;
						}
				 	}
				}
			}

			return out;
		},
		decodeRLE16: function  (pixelData)
		{
			const frameData = pixelData;
			const frameSize = this .dicom .width * this .dicom .height;
			const outFrame  = new ArrayBuffer (frameSize * this .dicom .components * 2);
			const header    = new DataView (frameData.buffer, frameData.byteOffset);
			const data      = new Int8Array (frameData.buffer, frameData.byteOffset);
			const out       = new Int8Array (outFrame);

			const numSegments = header .getInt32 (0, true);

			for (let s = 0; s < numSegments; ++ s)
			{
				let   outIndex = 0;
				const highByte = (s === 0 ? 1 : 0);

			  	let inIndex  = header .getInt32 ((s + 1) * 4, true);
			  	let maxIndex = header .getInt32 ((s + 2) * 4, true);

				if (maxIndex === 0)
					maxIndex = frameData.length;

				while (inIndex < maxIndex)
				{
					const n = data [inIndex ++];

					if (n >= 0 && n <= 127)
					{
						for (let i = 0; i < n + 1 && outIndex < frameSize; ++ i)
						{
							out[(outIndex * 2) + highByte] = data[inIndex++];
							outIndex++;
						}
					}
					else if (n <= -1 && n >= -127)
					{
						const value = data [inIndex ++];

						for (let j = 0; j < -n + 1 && outIndex < frameSize; ++ j)
						{
							out [(outIndex * 2) + highByte] = value;
							outIndex++;
						}
					}
				}
			}

			return out;
		},
		/*
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
		*/
		decodeJPEGBaseline: function (pixelData)
		{
			var jpeg = new JpegImage ();

			jpeg .parse (pixelData);

			jpeg .colorTransform = true; // default is true

			var data = jpeg .getData (this .dicom .width, this .dicom .height);

			this .bitsAllocated = 8;

			return data;
		 },
		 decodeJPEGLossless: function (pixelData)
		 {
			var
				decoder = new jpegLossless .lossless .Decoder (),
				buffer  = decoder .decompress (pixelData);

			return new Uint8Array (buffer);
		},
		decodeJPEG2000: function (pixelData)
		{
			var jpxImage = new JpxImage ();

			jpxImage .parse (pixelData);

			var tileCount = jpxImage .tiles.length;

			if (tileCount !== 1)
				throw new Error("DICOM: JPEG2000 decoder returned a tileCount of " + tileCount + ", when 1 is expected.");

			return new Uint8Array (jpxImage .tiles [0] .items .buffer);
		},
	 };

	// ftp://medical.nema.org/medical/dicom/DataSets/WG04/

	return DicomParser;
});
