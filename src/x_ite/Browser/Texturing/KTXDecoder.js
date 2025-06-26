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

      const { gl, libktx } = this;

      const
         astcSupported  = !!gl .getExtension ("WEBGL_compressed_texture_astc"),
         etcSupported   = !!gl .getExtension ("WEBGL_compressed_texture_etc1"),
         dxtSupported   = !!gl .getExtension ("WEBGL_compressed_texture_s3tc"),
         bptcSupported  = !!gl .getExtension ("EXT_texture_compression_bptc"),
         pvrtcSupported = !!gl .getExtension ("WEBGL_compressed_texture_pvrtc") || !!gl .getExtension ("WEBKIT_WEBGL_compressed_texture_pvrtc");

      if (astcSupported)
         var format = libktx .TranscodeTarget .ASTC_4x4_RGBA;
      else if (bptcSupported)
         var format = libktx .TranscodeTarget .BC7_RGBA;
      else if (dxtSupported)
         var format = libktx .TranscodeTarget .BC1_OR_3;
      else if (pvrtcSupported)
         var format = libktx .TranscodeTarget .PVRTC1_4_RGBA;
      else if (etcSupported)
         var format = libktx .TranscodeTarget .ETC;
      else
         var format = libktx .TranscodeTarget .RGBA4444;

      if (ktxTexture .transcodeBasis (format, 0) !== libktx .ErrorCode .SUCCESS)
         console .warn ("Texture transcode failed. See console for details.");
   }

   async loadKTXFromURL (url, cache = true)
   {
      const response = await fetch (url, { cache: cache ? "default" : "reload" });

      if (!response .ok)
         throw new Error ("Couldn't fetch KTX image.");

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
         texture      = uploadResult .object;

      if (!texture)
         throw new Error ("Could not load KTX data");

      texture .baseWidth     = ktxTexture .baseWidth;
      texture .baseHeight    = ktxTexture .baseHeight;
      texture .baseDepth     = ktxTexture .baseDepth ?? 1; // TODO: No support.
      texture .numComponents = ktxTexture .numComponents;
      texture .target        = uploadResult .target;

      ktxTexture .delete ();

      return texture;
   }
}
