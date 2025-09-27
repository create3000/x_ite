import TextureBuffer from "../../Rendering/TextureBuffer.js";

const
   _transmissionBuffer  = Symbol (),
   _volumeScatterBuffer = Symbol ();

function X3DX_ITEContext () { }

Object .assign (X3DX_ITEContext .prototype,
{
   initialize ()
   {
      this .addTextureBuffer (_transmissionBuffer);
      this .addTextureBuffer (_volumeScatterBuffer);
   },
   getTransmissionBuffer ()
   {
      return this [_transmissionBuffer] ??= new TextureBuffer ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
         mipMaps: true,
      });
   },
   getVolumeScatterBuffer ()
   {
      return this [_volumeScatterBuffer] ??= new TextureBuffer ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
         float: true,
      });
   },
});

export default X3DX_ITEContext;
