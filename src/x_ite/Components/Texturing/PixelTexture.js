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
      try
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

         if (width < 0 || height < 0 || comp < 0 || comp > 4)
            throw new Error (`At least one dimension (${width} × ${height} or components ${comp}) is invalid.`);

         if (width === 0 || height === 0 || comp === 0)
         {
            this .clearTexture ();
            this ._loadState = X3DConstants .COMPLETE_STATE;
            return;
         }

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
      catch (error)
      {
         console .error (error);

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
