export default class KTXDecoder {

   constructor (context, externalKtxlib, scriptDir)
   {
      this .gl     = context;
      this .libktx = null;

      if (context !== undefined)
      {
         if (externalKtxlib === undefined && LIBKTX !== undefined)
         {
            externalKtxlib = LIBKTX;
         }
         if (externalKtxlib !== undefined)
         {
            this .initialized = this .init (context, externalKtxlib, scriptDir);
         }
         else
         {
            console .error ("Failed to initalize KTXDecoder: ktx library undefined");
            return undefined;
         }
      }
      else
      {
         console .error ("Failed to initalize KTXDecoder: WebGL context undefined");
         return undefined;
      }
   }

   async init (context, externalKtxlib, scriptDir)
   {
      this .libktx = await externalKtxlib({preinitializedWebGLContext: context}, scriptDir);

      this .libktx .GL .makeContextCurrent (this .libktx .GL .createContext (null, { majorVersion: 2.0 }));
   }

   transcode (ktexture)
   {
      if (!ktexture .needsTranscoding)
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

      if (ktexture .transcodeBasis (format, 0) !== this .libktx .ErrorCode .SUCCESS)
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

      const data     = new Uint8Array ($.ungzip (arrayBuffer));
      const ktexture = new this .libktx .ktxTexture (data);

      this .transcode (ktexture);

      const uploadResult = ktexture .glUpload ();

      if (uploadResult .texture === null)
         throw new Error ("Could not load KTX data");

      uploadResult .texture .levels        = 1 + Math .floor (Math .log2 (ktexture .baseWidth));
      uploadResult .texture .baseWidth     = ktexture .baseWidth;
      uploadResult .texture .baseHeight    = ktexture .baseHeight;
      uploadResult .texture .baseDepth     = ktexture .baseDepth ?? 1;
      uploadResult .texture .numComponents = ktexture .numComponents;
      uploadResult .texture .target        = uploadResult .target;

      ktexture .delete ();

      return uploadResult .texture;
   }
}
