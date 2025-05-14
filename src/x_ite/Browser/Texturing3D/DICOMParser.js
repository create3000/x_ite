/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import { Decoder } from "../../../../node_modules/jpeg-lossless-decoder-js/release/lossless.js";

function DicomParser ()
{
   this .dicom = { dicom: false };
}

Object .assign (DicomParser .prototype,
{
   parse (input)
   {
      try
      {
         this .dataSet      = dicomParser .parseDicom (new Uint8Array (input));
         this .dicom .dicom = true;
      }
      catch (error)
      {
         console .error (error);
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

      // if (DEVELOPMENT)
      //    console .log (this);

      return this .dicom;
   },
   getPhotometricInterpretation ()
   {
      // https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280004
      this .photometricInterpretation = this .dataSet .string ("x00280004");
   },
   getComponents ()
   {
      // https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280002
      this .dicom .components = this .dataSet .uint16 ("x00280002");
   },
   getWidth ()
   {
      this .dicom .width = this .dataSet .uint16 ("x00280011");
   },
   getHeight ()
   {
      this .dicom .height = this .dataSet .uint16 ("x00280010");
   },
   getDepth ()
   {
      if (this .dataSet .elements .x00280008)
      {
         this .dicom .depth = this .dataSet .intString ("x00280008");
      }
      else
         this .dicom .depth = 1;
   },
   getBitsAllocated ()
   {
      this .bitsAllocated  = this .dataSet .uint16 ("x00280100");
   },
   getBitsStored ()
   {
      this .bitsStored  = this .dataSet .uint16 ("x00280101");
   },
   getPixelRepresentation ()
   {
      this .pixelRepresentation = this .dataSet .uint16 ("x00280103") || 0;
   },
   getPlanarConfiguration ()
   {
      this .planarConfiguration = this .dataSet .uint16 ("x00280006") || 0;
   },
   getTansferSyntax ()
   {
      this .transferSyntax = this .dataSet .string ("x00020010");
   },
   getPixelData ()
   {
      var
         dicom        = this .dicom,
         pixelElement = this .dataSet .elements .x7fe00010 || this .dataSet .elements .x7fe00008, // pixel or float pixel
         components   = this .photometricInterpretation === "PALETTE COLOR" ? 3 : this .dicom .components,
         imageLength  = dicom .width * dicom .height * components,
         byteLength   = imageLength * dicom .depth,
         bytes        = new Uint8Array (byteLength),
         frames       = this .getFrames (pixelElement);

      frames .forEach ((frame, f) =>
      {
         // Handle transfer syntax.

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
            case "1.2.840.10008.1.2.4.80": // JPEG-LS Lossless Image Compression
            case "1.2.840.10008.1.2.4.81": // JPEG-LS Lossy (Near-Lossless) Image Compression
            {
               frame = this .decodeJPEGLS (frame);
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

         // Convert to stored type array (int, uint, float, 8/16 bit).

         frame = this .getTypedArray (frame);

         // Handle bits stored.

         if (this .pixelRepresentation === 1 && this .bitsStored !== undefined)
         {
            var shift = 32 - this .bitsStored;

            for (var i = 0, length = frame .length; i < length; ++ i)
               frame [i] = frame [i] << shift >> shift;
         }

         // Handle photometric interpretation.

         switch (this .photometricInterpretation)
         {
            case "MONOCHROME1":
            case "MONOCHROME2":
            {
               break;
            }
            case "RGB":
            case "YBR_RCT":
            case "YBR_ICT":
            case "YBR_FULL_422":
            {
               if (this .planarConfiguration === 1)
                  frame = this .convertRGBColorByPlane (frame);

               break;
            }
            case "YBR_FULL":
            {
               if (this .planarConfiguration === 0)
                  frame = this .convertYBRFullByPixel (frame);
               else
                  frame = this .convertYBRFullByPlane (frame);

               break;
            }
            case "PALETTE COLOR":
            {
               frame = this .convertPaletteColor (frame);
               break;
            }
            default:
            {
               throw new Error ("DICOM: unsupported image type '" + this .photometricInterpretation + "'.");
            }
         }

         // Normalize frame pixel data in the range [0, 255], and assign to image block;

         frame = this .flipImage (frame, components);

         var
            normalize = this .getNormalizeOffsetAndFactor (frame),
            b         = f * imageLength;

         for (var i = 0, length = frame .length; i < length; ++ i, ++ b)
            bytes [b] = (frame [i] - normalize .offset) * normalize .factor;
      });

      // Invert MONOCHROME1 pixels.

      if (this .photometricInterpretation === "MONOCHROME1")
      {
         for (var i = 0, length = bytes .length; i < length; ++ i)
            bytes [i] = 255 - bytes [i];
      }

      // Set Uint8Array.

      dicom .components = components;
      dicom .data       = bytes;
   },
   getFrames (pixelElement)
   {
      var frames = [ ];

      if (pixelElement && pixelElement .encapsulatedPixelData)
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
         var pixelsPerFrame = this .dicom .width * this .dicom .height * this .dicom .components;

         switch (this .bitsAllocated)
         {
            case 1:
            {
               for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               {
                  var frameOffset = pixelElement .dataOffset + i * pixelsPerFrame / 8;

                  frames .push (this .unpackBinaryFrame (this .dataSet .byteArray, frameOffset, pixelsPerFrame));
               }

               this .bitsAllocated = 8;
               break;
            }
            case 8:
            case 16:
            case 32:
            {
               var bytesAllocated = this .bitsAllocated / 8;

               for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               {
                  var frameOffset = pixelElement .dataOffset + i * pixelsPerFrame * bytesAllocated;

                  frames .push (new Uint8Array (this .dataSet .byteArray .buffer, frameOffset, pixelsPerFrame * bytesAllocated));
               }

               break;
            }
            default:
               throw new Error ("DICOM: unsupported pixel format.");
         }
      }

      return frames;
   },
   getTypedArray (frame)
   {
      switch (this .bitsAllocated)
      {
         case 8:
            return new (this .pixelRepresentation ? Int8Array : Uint8Array) (frame .buffer, frame .byteOffset, frame .length);
         case 16:
            return new (this .pixelRepresentation ? Int16Array : Uint16Array) (frame .buffer, frame .byteOffset, frame .length / 2);
         case 32:
            return new Float32Array (frame .buffer, frame .byteOffset, frame .length / 4);
         default:
            throw new Error ("DICOM: unsupported pixel format.");
      }
   },
   flipImage (frame, components)
   {
      var
         width  = this .dicom .width,
         height = this .dicom .height,
         out    = new (frame .constructor) (frame .length);

      for (var y = 0; y < height; ++ y)
      {
         var
            inputRow  = components * width * (height - 1 - y),
            outputRow = components * width * y;

         for (var x = 0, w = components * width; x < w; ++ x)
         {
            out [outputRow + x] = frame [inputRow + x];
         }
      }

      return out;
   },
   getNormalizeOffsetAndFactor (data)
   {
      var
         min = Number .POSITIVE_INFINITY,
         max = Number .NEGATIVE_INFINITY;

      for (var i = 0, length = data .length; i < length; ++ i)
      {
         min = Math .min (min, data [i]);
         max = Math .max (max, data [i]);
      }

      var diverence = max - min;

      return { offset: min, factor: diverence ? 1 / diverence * 255 : 0 };
   },
   unpackBinaryFrame (byteArray, frameOffset, pixelsPerFrame)
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
   decodeLittleEndian (pixelData)
   {
      var
         buffer = pixelData .buffer,
         offset = pixelData .byteOffset,
         length = pixelData .length;

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
         if (offset % 4)
         {
            buffer = buffer .slice (offset);
            offset = 0;
         }

         return new Uint8Array (buffer, offset, length);
      }

      return pixelData;
   },
   decodeBigEndian (pixelData)
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
   decodeRLE  (pixelData)
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
   decodeRLE8  (pixelData)
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
   decodeRLE8Planar  (pixelData)
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
                  ++ outIndex;
               }
            }
            else if (n <= -1 && n >= -127)
            {
               const value = data[inIndex++];

               // run of n bytes
               for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++ j)
               {
                  out [outIndex] = value;
                  ++ outIndex;
               }
             }
         }
      }

      return out;
   },
   decodeRLE16  (pixelData)
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
                  ++ outIndex;
               }
            }
            else if (n <= -1 && n >= -127)
            {
               const value = data [inIndex ++];

               for (let j = 0; j < -n + 1 && outIndex < frameSize; ++ j)
               {
                  out [(outIndex * 2) + highByte] = value;
                  ++ outIndex;
               }
            }
         }
      }

      return out;
   },
   decodeJPEGBaseline (pixelData)
   {
      const jpeg = new JpegImage ();

      jpeg .opts =
      {
         colorTransform: true,
         tolerantDecoding: true,
         maxResolutionInMP: 100, // Don't decode more than 100 megapixels
         maxMemoryUsageInMB: 512, // Don't decode if memory footprint is more than 512MB
      };

      JpegImage .resetMaxMemoryUsage (jpeg .opts .maxMemoryUsageInMB * 1024 * 1024);

      jpeg .parse (pixelData);

      const data = jpeg .getData (this .dicom .width, this .dicom .height);

      this .bitsAllocated = 8;

      return data;
    },
    decodeJPEGLossless (pixelData)
    {
      const
         decoder = new Decoder (),
         buffer  = decoder .decompress (pixelData);

      return new Uint8Array (buffer);
   },
   decodeJPEGLS (pixelData)
   {
      const image = this .jpegLSDecode (pixelData, this .pixelRepresentation === 1);

      // throw error if not success or too much data
      if (image .result !== 0 && image .result !== 6)
         throw new Error (`DICOM: JPEG-LS decoder failed to decode frame (error code ${image .result}).`);

      return new Uint8Array (image .pixelData .buffer);
   },
   jpegLSDecode: (() =>
   {
      const charLS = CharLS ();

      return function (data, isSigned)
      {
         // prepare input parameters
         const dataPtr = charLS._malloc(data.length);

         charLS.writeArrayToMemory(data, dataPtr);

         // prepare output parameters
         const imagePtrPtr = charLS._malloc(4);
         const imageSizePtr = charLS._malloc(4);
         const widthPtr = charLS._malloc(4);
         const heightPtr = charLS._malloc(4);
         const bitsPerSamplePtr = charLS._malloc(4);
         const stridePtr = charLS._malloc(4);
         const allowedLossyErrorPtr = charLS._malloc(4);
         const componentsPtr = charLS._malloc(4);
         const interleaveModePtr = charLS._malloc(4);

         // Decode the image
         const result = charLS.ccall(
            'jpegls_decode',
            'number',
            ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
            [dataPtr, data.length, imagePtrPtr, imageSizePtr, widthPtr, heightPtr, bitsPerSamplePtr, stridePtr, componentsPtr, allowedLossyErrorPtr, interleaveModePtr]
         );

         // Extract result values into object
         const image = {
            result,
            width: charLS.getValue(widthPtr, 'i32'),
            height: charLS.getValue(heightPtr, 'i32'),
            bitsPerSample: charLS.getValue(bitsPerSamplePtr, 'i32'),
            stride: charLS.getValue(stridePtr, 'i32'),
            components: charLS.getValue(componentsPtr, 'i32'),
            allowedLossyError: charLS.getValue(allowedLossyErrorPtr, 'i32'),
            interleaveMode: charLS.getValue(interleaveModePtr, 'i32'),
            pixelData: undefined
         };

         // Copy image from emscripten heap into appropriate array buffer type
         const imagePtr = charLS.getValue(imagePtrPtr, '*');

         if (image.bitsPerSample <= 8) {
            image.pixelData = new Uint8Array(image.width * image.height * image.components);
            image.pixelData.set(new Uint8Array(charLS.HEAP8.buffer, imagePtr, image.pixelData.length));
         } else if (isSigned) {
            image.pixelData = new Int16Array(image.width * image.height * image.components);
            image.pixelData.set(new Int16Array(charLS.HEAP16.buffer, imagePtr, image.pixelData.length));
         } else {
            image.pixelData = new Uint16Array(image.width * image.height * image.components);
            image.pixelData.set(new Uint16Array(charLS.HEAP16.buffer, imagePtr, image.pixelData.length));
         }

         // free memory and return image object
         charLS._free(dataPtr);
         charLS._free(imagePtr);
         charLS._free(imagePtrPtr);
         charLS._free(imageSizePtr);
         charLS._free(widthPtr);
         charLS._free(heightPtr);
         charLS._free(bitsPerSamplePtr);
         charLS._free(stridePtr);
         charLS._free(componentsPtr);
         charLS._free(interleaveModePtr);

         return image;
      };
   })(),
   decodeJPEG2000 (pixelData)
   {
      var
         bytesPerPixel = this .bitsAllocated <= 8 ? 1 : 2,
         signed        = this .pixelRepresentation === 1,
         image         = this .decodeOpenJPEG (pixelData, bytesPerPixel, signed);

      if (image .nbChannels > 1)
         this .photometricInterpretation = "RGB";

      return new Uint8Array (image .pixelData .buffer);
   },
   decodeOpenJPEG: (() =>
   {
      const openJPEG = OpenJPEG ();

      return function (data, bytesPerPixel, signed)
      {
         const dataPtr = openJPEG._malloc(data.length);

         openJPEG.writeArrayToMemory(data, dataPtr);

         // create param outpout
         const imagePtrPtr = openJPEG._malloc(4);
         const imageSizePtr = openJPEG._malloc(4);
         const imageSizeXPtr = openJPEG._malloc(4);
         const imageSizeYPtr = openJPEG._malloc(4);
         const imageSizeCompPtr = openJPEG._malloc(4);

         const t0 = new Date().getTime();
         const ret = openJPEG.ccall('jp2_decode', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'],
         [dataPtr, data.length, imagePtrPtr, imageSizePtr, imageSizeXPtr, imageSizeYPtr, imageSizeCompPtr]);
         // add num vomp..etc

         if (ret !== 0) {
            console.log('[opj_decode] decoding failed!');
            openJPEG._free(dataPtr);
            openJPEG._free(openJPEG.getValue(imagePtrPtr, '*'));
            openJPEG._free(imageSizeXPtr);
            openJPEG._free(imageSizeYPtr);
            openJPEG._free(imageSizePtr);
            openJPEG._free(imageSizeCompPtr);

            return;
         }

         const imagePtr = openJPEG.getValue(imagePtrPtr, '*');

         const image = {
            length: openJPEG.getValue(imageSizePtr, 'i32'),
            sx: openJPEG.getValue(imageSizeXPtr, 'i32'),
            sy: openJPEG.getValue(imageSizeYPtr, 'i32'),
            nbChannels: openJPEG.getValue(imageSizeCompPtr, 'i32'), // hard coded for now
            perf_timetodecode: undefined,
            pixelData: undefined
         };

         // Copy the data from the EMSCRIPTEN heap into the correct type array
         const length = image.sx * image.sy * image.nbChannels;
         const src32 = new Int32Array(openJPEG.HEAP32.buffer, imagePtr, length);

         if (bytesPerPixel === 1) {
            if (Uint8Array.from) {
               image.pixelData = Uint8Array.from(src32);
            } else {
               image.pixelData = new Uint8Array(length);
               for (let i = 0; i < length; i++) {
                  image.pixelData[i] = src32[i];
               }
            }
         } else if (signed) {
            if (Int16Array.from) {
               image.pixelData = Int16Array.from(src32);
            } else {
               image.pixelData = new Int16Array(length);
               for (let i = 0; i < length; i++) {
                  image.pixelData[i] = src32[i];
               }
            }
         } else if (Uint16Array.from) {
            image.pixelData = Uint16Array.from(src32);
         } else {
            image.pixelData = new Uint16Array(length);
            for (let i = 0; i < length; i++) {
               image.pixelData[i] = src32[i];
            }
         }

         const t1 = new Date().getTime();

         image.perf_timetodecode = t1 - t0;

         // free
         openJPEG._free(dataPtr);
         openJPEG._free(imagePtrPtr);
         openJPEG._free(imagePtr);
         openJPEG._free(imageSizePtr);
         openJPEG._free(imageSizeXPtr);
         openJPEG._free(imageSizeYPtr);
         openJPEG._free(imageSizeCompPtr);

         return image;
      };
   })(),
   convertRGBColorByPlane (pixelData)
   {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertRGBColorByPlane: RGB buffer length must be divisble by 3.");

      var
         numPixels = pixelData .length / 3,
         rgbIndex  = 0,
         rIndex    = 0,
         gIndex    = numPixels,
         bIndex    = numPixels * 2,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
        out [rgbIndex ++] = pixelData [rIndex ++]; // red
        out [rgbIndex ++] = pixelData [gIndex ++]; // green
        out [rgbIndex ++] = pixelData [bIndex ++]; // blue
      }

      return out;
    },
    convertYBRFullByPixel (pixelData)
    {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertYBRFullByPixel: YBR buffer length must be divisble by 3.");

      console .log (pixelData);

      var
         numPixels = pixelData .length / 3,
         ybrIndex  = 0,
         rgbIndex  = 0,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
         var
            y  = pixelData [ybrIndex ++],
            cb = pixelData [ybrIndex ++],
            cr = pixelData [ybrIndex ++];

         out [rgbIndex ++] = y + 1.40200 * (cr - 128);                        // red
         out [rgbIndex ++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green
         out [rgbIndex ++] = y + 1.77200 * (cb - 128);                        // blue
      }

      return out;
    },
    convertYBRFullByPlane (pixelData)
    {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertYBRFullByPlane: YBR buffer length must be divisble by 3.");

      var
         numPixels = pixelData .length / 3,
         rgbIndex  = 0,
         yIndex    = 0,
         cbIndex   = numPixels,
         crIndex   = numPixels * 2,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
         var
            y  = pixelData [yIndex ++],
            cb = pixelData [cbIndex ++],
            cr = pixelData [crIndex ++];

        out [rgbIndex++] = y + 1.40200 * (cr - 128);                        // red
        out [rgbIndex++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green
        out [rgbIndex++] = y + 1.77200 * (cb - 128);                        // blue
      }

      return out;
   },
   convertPaletteColor (pixelData)
   {
      function convertLUTto8Bit (lut, shift)
      {
         if (lut .cleaned)
            return lut .cleaned;

         const numEntries = lut .length;
         const cleanedLUT = new Uint8ClampedArray (numEntries);

         for (let i = 0; i < numEntries; ++i)
            cleanedLUT [i] = lut [i] >> shift;

         lut .cleaned = cleanedLUT;

         return cleanedLUT;
      }

      const LUT       = this .getLUT ();
      const numPixels = this .dicom .width * this .dicom .height;
      const rData     = LUT .redPaletteColorLookupTableData;
      const gData     = LUT .greenPaletteColorLookupTableData;
      const bData     = LUT .bluePaletteColorLookupTableData;
      const len       = LUT .redPaletteColorLookupTableData .length;

      let palIndex = 0;
      let rgbIndex = 0;

      const start = LUT .redPaletteColorLookupTableDescriptor [1];
      const shift = LUT .redPaletteColorLookupTableDescriptor [2] === 8 ? 0 : 8;

      const rDataCleaned = convertLUTto8Bit (rData, shift);
      const gDataCleaned = convertLUTto8Bit (gData, shift);
      const bDataCleaned = convertLUTto8Bit (bData, shift);

      let out = new Uint8Array (pixelData .length * 3);

      for (let i = 0; i < numPixels; ++ i)
      {
         let value = pixelData [palIndex++];

         if (value < start)
            value = 0;
         else if (value > start + len - 1)
            value = len - 1;
         else
            value -= start;

         out [rgbIndex++] = rDataCleaned [value];
         out [rgbIndex++] = gDataCleaned [value];
         out [rgbIndex++] = bDataCleaned [value];
      }

      return out;
   },
   getLUT ()
   {
      if (this .LUT)
          return this .LUT;

      this .LUT = { };

      this .populatePaletteColorLut (this .dataSet, this .LUT);

      return this .LUT;
   },
   populatePaletteColorLut (dataSet, imagePixelModule)
   {
      imagePixelModule .redPaletteColorLookupTableDescriptor   = this .getLutDescriptor (dataSet, 'x00281101');
      imagePixelModule .greenPaletteColorLookupTableDescriptor = this .getLutDescriptor (dataSet, 'x00281102');
      imagePixelModule .bluePaletteColorLookupTableDescriptor  = this .getLutDescriptor (dataSet, 'x00281103');

      // The first Palette Color Lookup Table Descriptor value is the number of entries in the lookup table.
      // When the number of table entries is equal to 2ˆ16 then this value shall be 0.
      // See https://dicom.nema.org/MEDICAL/DICOM/current/output/chtml/part03/sect_C.7.6.3.html#sect_C.7.6.3.1.5
      if (imagePixelModule .redPaletteColorLookupTableDescriptor [0] === 0)
      {
         imagePixelModule .redPaletteColorLookupTableDescriptor   [0] = 65536;
         imagePixelModule .greenPaletteColorLookupTableDescriptor [0] = 65536;
         imagePixelModule .bluePaletteColorLookupTableDescriptor  [0] = 65536;
      }

      // The third Palette Color Lookup Table Descriptor value specifies the number of bits for each entry in the Lookup Table Data.
      // It shall take the value of 8 or 16.
      // The LUT Data shall be stored in a format equivalent to 8 bits allocated when the number of bits for each entry is 8, and 16 bits allocated when the number of bits for each entry is 16, where in both cases the high bit is equal to bits allocated-1.
      // The third value shall be identical for each of the Red, Green and Blue Palette Color Lookup Table Descriptors.
      //
      // Note: Some implementations have encoded 8 bit entries with 16 bits allocated, padding the high bits;
      // this can be detected by comparing the number of entries specified in the LUT Descriptor with the actual value length of the LUT Data entry.
      // The value length in bytes should equal the number of entries if bits allocated is 8, and be twice as long if bits allocated is 16.
      const numLutEntries    = imagePixelModule .redPaletteColorLookupTableDescriptor [0];
      const lutData          = dataSet .elements .x00281201;
      const lutBitsAllocated = lutData .length === numLutEntries ? 8 : 16;

      // If the descriptors do not appear to have the correct values, correct them
      if (imagePixelModule.redPaletteColorLookupTableDescriptor [2] !== lutBitsAllocated)
      {
         imagePixelModule .redPaletteColorLookupTableDescriptor   [2] = lutBitsAllocated;
         imagePixelModule .greenPaletteColorLookupTableDescriptor [2] = lutBitsAllocated;
         imagePixelModule .bluePaletteColorLookupTableDescriptor  [2] = lutBitsAllocated;
      }

      imagePixelModule .redPaletteColorLookupTableData   = this .getLutData (dataSet, 'x00281201', imagePixelModule .redPaletteColorLookupTableDescriptor);
      imagePixelModule .greenPaletteColorLookupTableData = this .getLutData (dataSet, 'x00281202', imagePixelModule .greenPaletteColorLookupTableDescriptor);
      imagePixelModule .bluePaletteColorLookupTableData  = this .getLutData (dataSet, 'x00281203', imagePixelModule .bluePaletteColorLookupTableDescriptor);
   },
   getLutDescriptor  (dataSet, tag)
   {
      if (! dataSet .elements [tag] || dataSet .elements [tag] .length !== 6)
         return;

      return [dataSet .uint16 (tag, 0), dataSet .uint16 (tag, 1), dataSet .uint16 (tag, 2)];
   },
   getLutData  (lutDataSet, tag, lutDescriptor)
   {
      const lut     = [];
      const lutData = lutDataSet .elements [tag];

      for (let i = 0; i < lutDescriptor [0]; ++ i)
      {
         // Output range is always unsigned
         if (lutDescriptor [2] === 16)
            lut [i] = lutDataSet .uint16 (tag, i);
         else
            lut [i] = lutDataSet .byteArray [i + lutData .dataOffset];
      }

      return lut;
   },
});

// ftp://medical.nema.org/medical/dicom/DataSets/WG04/

export default DicomParser;
