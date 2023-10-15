export default class KTXDecoder
{
   constructor (gl, externalKtxlib, scriptDir)
   {
      this .gl          = gl;
      this .libktx      = null;
      this .initialized = this .init (gl, externalKtxlib, scriptDir);
   }

   async init (gl, externalKtxlib, scriptDir)
   {
      this .libktx = await externalKtxlib ({ preinitializedWebGLContext: gl }, scriptDir);

      this .libktx .GL .makeContextCurrent (this .libktx .GL .createContext (null, { majorVersion: gl .getVersion () }));
   }

   transcode (ktxTexture)
   {
      if (!ktxTexture .needsTranscoding)
         return;

      const
         astcSupported  = !!this .gl .getExtension ("WEBGL_compressed_texture_astc"),
         etcSupported   = !!this .gl .getExtension ("WEBGL_compressed_texture_etc1"),
         dxtSupported   = !!this .gl .getExtension ("WEBGL_compressed_texture_s3tc"),
         bptcSupported  = !!this .gl .getExtension ("EXT_texture_compression_bptc"),
         pvrtcSupported = !!this .gl .getExtension ("WEBGL_compressed_texture_pvrtc") || !!this .gl .getExtension ("WEBKIT_WEBGL_compressed_texture_pvrtc");

      if (astcSupported)
         var format = this .libktx .TranscodeTarget .ASTC_4x4_RGBA;
      else if (bptcSupported)
         var format = this .libktx .TranscodeTarget .BC7_RGBA;
      else if (dxtSupported)
         var format = this .libktx .TranscodeTarget .BC1_OR_3;
      else if (pvrtcSupported)
         var format = this .libktx .TranscodeTarget .PVRTC1_4_RGBA;
      else if (etcSupported)
         var format = this .libktx .TranscodeTarget .ETC;
      else
         var format = this .libktx .TranscodeTarget .RGBA8888;

      if (ktxTexture .transcodeBasis (format, 0) !== this .libktx .ErrorCode .SUCCESS)
         console .warn ("Texture transcode failed. See console for details.");
   }

   async loadKTXFromURL (uri)
   {
      const response = await fetch (uri);

      return this .loadKTXFromBuffer (await response .arrayBuffer ());
   }

   async loadKTXFromBuffer (arrayBuffer)
   {
      await this .initialized;

      const
         data       = new Uint8Array ($.ungzip (arrayBuffer)),
         ktxTexture = new this .libktx .ktxTexture (data);

      this .transcode (ktxTexture);

      const
         uploadResult = ktxTexture .glUpload (),
         texture      = uploadResult .texture;

      if (!texture)
         throw new Error ("Could not load KTX data");

      texture .levels        = 1 + Math .floor (Math .log2 (Math .max (ktxTexture .baseWidth, ktxTexture .baseHeight)));
      texture .baseWidth     = ktxTexture .baseWidth;
      texture .baseHeight    = ktxTexture .baseHeight;
      texture .baseDepth     = ktxTexture .baseDepth ?? 1;
      texture .numComponents = ktxTexture .numComponents;
      texture .target        = uploadResult .target;

      ktxTexture .delete ();

      return texture;
   }
}
