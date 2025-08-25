import PixelTexture          from "../../Components/Texturing/PixelTexture.js";
import TextureProperties     from "../../Components/Texturing/TextureProperties.js";
import OpacityMapVolumeStyle from "../../Components/VolumeRendering/OpacityMapVolumeStyle.js";

const
   _defaultVoxelsNode         = Symbol (),
   _defaultVolumeStyle        = Symbol (),
   _defaultBlendedVolumeStyle = Symbol (),
   _defaultTransferFunction   = Symbol ();

function X3DVolumeRenderingContext () { }

Object .assign (X3DVolumeRenderingContext .prototype,
{
   getDefaultVoxels ()
   {
      return this [_defaultVoxelsNode] ??= (() =>
      {
         const defaultVoxelsNode = this .getPrivateScene () .createNode ("PixelTexture3D", false);

         defaultVoxelsNode ._image = [1, 1, 1, 1, 255];
         defaultVoxelsNode .repeatS = true;
         defaultVoxelsNode .repeatT = true;
         defaultVoxelsNode .repeatR = true;

         defaultVoxelsNode .setup ();

         return defaultVoxelsNode;
      })();
      },
   getDefaultVolumeStyle ()
   {
      return this [_defaultVolumeStyle] ??= (() =>
      {
         const defaultVolumeStyle = new OpacityMapVolumeStyle (this .getPrivateScene ());

         defaultVolumeStyle .setup ();

         return defaultVolumeStyle;
      })();
   },
   getDefaultBlendedVolumeStyle ()
   {
      return this [_defaultBlendedVolumeStyle] ??= (() =>
      {
         const defaultBlendedVolumeStyle = new OpacityMapVolumeStyle (this .getPrivateScene ());

         defaultBlendedVolumeStyle .setup ();

         return defaultBlendedVolumeStyle;
      })();
   },
   getDefaultTransferFunction ()
   {
      return this [_defaultTransferFunction] ??= (() =>
      {
         const textureProperties = new TextureProperties (this .getPrivateScene ());

         textureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         textureProperties ._boundaryModeT       = "REPEAT";
         textureProperties ._magnificationFilter = "DEFAULT";
         textureProperties ._minificationFilter  = "DEFAULT";
         textureProperties ._generateMipMaps     = true;
         textureProperties ._textureCompression  = "DEFAULT";

         textureProperties .setup ();

         const defaultTransferFunction = new PixelTexture (this .getPrivateScene ());

         defaultTransferFunction ._textureProperties = textureProperties;
         defaultTransferFunction ._image .width      = 256;
         defaultTransferFunction ._image .height     = 1;
         defaultTransferFunction ._image .comp       = 2;
         defaultTransferFunction ._image .array      = Array .from ({ length: 256 }, (v, i) => (i << 8) | i);

         defaultTransferFunction .setup ();

         return defaultTransferFunction;
      })();
   },
});

export default X3DVolumeRenderingContext;
