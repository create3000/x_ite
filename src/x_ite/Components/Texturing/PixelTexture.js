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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function PixelTexture (executionContext)
{
   X3DTexture2DNode .call (this, executionContext);

   this .addType (X3DConstants .PixelTexture);

   this .addChildObjects (X3DConstants .outputOnly, "loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));
}

Object .assign (Object .setPrototypeOf (PixelTexture .prototype, X3DTexture2DNode .prototype),
{
   initialize ()
   {
      X3DTexture2DNode .prototype .initialize .call (this);

      this ._image .addInterest ("set_image__", this);

      this .set_image__ ();
   },
   getTextureType ()
   {
      return 2;
   },
   checkLoadState ()
   {
      return this ._loadState .getValue ();
   },
   convert (data, comp, array, length)
   {
      switch (comp)
      {
         case 1:
         {
            for (let i = 0, index = 0; i < length; ++ i, index += 4)
            {
               const pixel = array [i];

               data [index]     =
               data [index + 1] =
               data [index + 2] = pixel & 255;
               data [index + 3] = 255;
            }

            break;
         }
         case 2:
         {
            for (let i = 0, index = 0; i < length; ++ i, index += 4)
            {
               const pixel = array [i];

               data [index]     =
               data [index + 1] =
               data [index + 2] = (pixel >>> 8) & 255;
               data [index + 3] = pixel & 255;
            }

            break;
         }
         case 3:
         {
            for (let i = 0, index = 0; i < length; ++ i, index += 4)
            {
               const pixel = array [i];

               data [index]     = (pixel >>> 16) & 255;
               data [index + 1] = (pixel >>>  8) & 255;
               data [index + 2] = pixel & 255;
               data [index + 3] = 255;
            }

            break;
         }
         case 4:
         {
            for (let i = 0, index = 0; i < length; ++ i, index += 4)
            {
               const pixel = array [i];

               data [index]     = (pixel >>> 24);
               data [index + 1] = (pixel >>> 16) & 255;
               data [index + 2] = (pixel >>>  8) & 255;
               data [index + 3] = pixel & 255;
            }

            break;
         }
      }
   },
   resize (input, inputWidth, inputHeight, outputWidth, outputHeight)
   {
      // Nearest neighbor scaling algorithm for very small images for WebGL 1.

      const
         output = new Uint8Array (outputWidth * outputHeight * 4),
         scaleX = outputWidth / inputWidth,
         scaleY = outputHeight / inputHeight;

      for (let y = 0; y < outputHeight; ++ y)
      {
         const
            inputW  = Math .floor (y / scaleY) * inputWidth,
            outputW = y * outputWidth;

         for (let x = 0; x < outputWidth; ++ x)
         {
            const
               index       = (inputW + Math .floor (x / scaleX)) * 4,
               indexScaled = (outputW + x) * 4;

            output [indexScaled]     = input [index];
            output [indexScaled + 1] = input [index + 1];
            output [indexScaled + 2] = input [index + 2];
            output [indexScaled + 3] = input [index + 3];
         }
      }

      return output;
   },
   set_image__ ()
   {
      const
         gl          = this .getBrowser () .getContext (),
         comp        = this ._image .comp,
         array       = this ._image .array,
         transparent = !(comp % 2);

      let
         width  = this ._image .width,
         height = this ._image .height,
         data   = null;

      if (width > 0 && height > 0 && comp > 0 && comp < 5)
      {
         if (gl .getVersion () >= 2 || (Algorithm .isPowerOfTwo (width) && Algorithm .isPowerOfTwo (height)))
         {
            data = new Uint8Array (width * height * 4);

            this .convert (data, comp, array .getValue (), array .length);
         }
         else if (Math .max (width, height) < this .getBrowser () .getMinTextureSize () && !this ._textureProperties .getValue ())
         {
            data = new Uint8Array (width * height * 4);

            this .convert (data, comp, array .getValue (), array .length);

            const
               inputWidth  = width,
               inputHeight = height;

            width  = Algorithm .nextPowerOfTwo (inputWidth)  * 8;
            height = Algorithm .nextPowerOfTwo (inputHeight) * 8;
            data   = this .resize (data, inputWidth, inputHeight, width, height);
         }
         else
         {
            this .canvas ??= [document .createElement ("canvas"), document .createElement ("canvas")];

            const
               canvas1   = this .canvas [0],
               canvas2   = this .canvas [1],
               cx1       = canvas1 .getContext ("2d", { willReadFrequently: true }),
               cx2       = canvas2 .getContext ("2d", { willReadFrequently: true }),
               imageData = cx1 .createImageData (width, height);

            // Use .canvas to support foreign 2d libs.
            cx1 .canvas .width  = width;
            cx1 .canvas .height = height;

            this .convert (imageData .data, comp, array .getValue (), array .length);
            cx1 .putImageData (imageData, 0, 0);

            width  = Algorithm .nextPowerOfTwo (width);
            height = Algorithm .nextPowerOfTwo (height);

            // Use .canvas to support foreign 2d libs.
            cx2 .canvas .width  = width;
            cx2 .canvas .height = height;

            cx2 .clearRect (0, 0, width, height);
            cx2 .drawImage (canvas1, 0, 0, canvas1 .width, canvas1 .height, 0, 0, width, height);

            data = new Uint8Array (cx2 .getImageData (0, 0, width, height) .data .buffer);
         }

         this .setTextureData (width, height, true, transparent && this .isImageTransparent (data), data);

         this ._loadState = X3DConstants .COMPLETE_STATE;
      }
      else
      {
         this .clearTexture ();
         this ._loadState = X3DConstants .FAILED_STATE;
      }
   },
});

Object .defineProperties (PixelTexture,
{
   ... X3DNode .getStaticProperties ("PixelTexture", "Texturing", 1, "texture", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "image",             new Fields .SFImage ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default PixelTexture;
