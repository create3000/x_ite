import TextureBuffer from "../../Rendering/TextureBuffer.js";

const
   _volumeScatterBuffer         = Symbol (),
   _transmissionBuffer          = Symbol (),
   _transmissionBackfacesBuffer = Symbol ();

function X3DX_ITEContext () { }

Object .assign (X3DX_ITEContext .prototype,
{
   initialize ()
   {
      this .addTextureBuffer (_volumeScatterBuffer);
      this .addTextureBuffer (_transmissionBuffer);
      this .addTextureBuffer (_transmissionBackfacesBuffer);
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
   getTransmissionBuffer ()
   {
      return this [_transmissionBuffer] ??= new TextureBuffer ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
         mipMaps: true,
      });
   },
   getTransmissionBackfacesBuffer ()
   {
      return this [_transmissionBackfacesBuffer] ??= new TextureBuffer ({
         browser: this,
         width: this ._viewport [2],
         height: this ._viewport [3],
      });
   },
});

export default X3DX_ITEContext;
