import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function PixelTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);

   this .addType (X3DConstants .PixelTexture3D);
}

Object .assign (Object .setPrototypeOf (PixelTexture3D .prototype, X3DTexture3DNode .prototype),
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);

      this ._image .addInterest ("set_image__", this);

      this .set_image__ ();
   },
   set_image__: (() =>
   {
      const
         OFFSET     = 4,
         COMPONENTS = 0,
         WIDTH      = 1,
         HEIGHT     = 2,
         DEPTH      = 3;

      return function ()
      {
         try
         {
            const image = this ._image;

            if (image .length < OFFSET)
            {
               this .clearTexture ();
               return;
            }

            const
               gl          = this .getBrowser () .getContext (),
               components  = image [COMPONENTS],
               width       = image [WIDTH],
               height      = image [HEIGHT],
               depth       = image [DEPTH],
               transparent = !(components & 1),
               size3D      = width * height * depth;

            let data, format;

            switch (components)
            {
               case 1:
               {
                  data   = new Uint8Array (size3D);
                  format = gl .LUMINANCE;

                  for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
                  {
                     data [d ++] = image [i];
                  }

                  break;
               }
               case 2:
               {
                  data   = new Uint8Array (size3D * 2);
                  format = gl .LUMINANCE_ALPHA;

                  for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
                  {
                     const p = image [i];

                     data [d ++] = (p >>> 8) & 0xff;
                     data [d ++] = p & 0xff;
                  }

                  break;
               }
               case 3:
               {
                  data   = new Uint8Array (size3D * 3);
                  format = gl .RGB;

                  for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
                  {
                     const p = image [i];

                     data [d ++] = (p >>> 16) & 0xff;
                     data [d ++] = (p >>> 8)  & 0xff;
                     data [d ++] = p & 0xff;
                  }

                  break;
               }
               case 4:
               {
                  data   = new Uint8Array (size3D * 4);
                  format = gl .RGBA;

                  for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
                  {
                     const p = image [i];

                     data [d ++] = (p >>> 24) & 0xff;
                     data [d ++] = (p >>> 16) & 0xff;
                     data [d ++] = (p >>> 8)  & 0xff;
                     data [d ++] = p & 0xff;
                  }

                  break;
               }
               default:
               {
                  this .clearTexture ();
                  return;
               }
            }

            this .setTextureData (width, height, depth, transparent, format, data);
         }
         catch (error)
         {
            console .error (error);

            this .clearTexture ();
         }
      };
   })(),
});

Object .defineProperties (PixelTexture3D,
{
   ... X3DNode .getStaticProperties ("PixelTexture3D", "Texturing3D", 1, "texture", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "image",             new Fields .MFInt32 (0, 0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default PixelTexture3D;
