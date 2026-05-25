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
      const { gl, libktx } = this;
      const { transcode_fmt } = libktx;

      let formatString;

      if (ktxTexture .needsTranscoding)
      {
         const
            astcSupported  = !!gl .getExtension ("WEBGL_compressed_texture_astc"),
            etcSupported   = !!gl .getExtension ("WEBGL_compressed_texture_etc1"),
            dxtSupported   = !!gl .getExtension ("WEBGL_compressed_texture_s3tc"),
            bptcSupported  = !!gl .getExtension ("EXT_texture_compression_bptc"),
            pvrtcSupported = !!gl .getExtension ("WEBGL_compressed_texture_pvrtc") || !!gl .getExtension ("WEBKIT_WEBGL_compressed_texture_pvrtc");

         let format;

         if (astcSupported)
         {
            formatString = "ASTC";
            format       = transcode_fmt .ASTC_4x4_RGBA;
         }
         else if (dxtSupported)
         {
            formatString = ktxTexture.numComponents == 4 ? "BC3" : "BC1";
            format       = transcode_fmt .BC1_OR_3;
         }
         else if (pvrtcSupported)
         {
            formatString = "PVRTC1";
            format       = transcode_fmt .PVRTC1_4_RGBA;
         }
         else if (etcSupported)
         {
            formatString = "ETC";
            format       = transcode_fmt .ETC;
         }
         else
         {
            formatString = "RGBA4444";
            format       = transcode_fmt .RGBA4444;
         }

         if (ktxTexture .transcodeBasis (format, 0) != libktx .error_code .SUCCESS)
            throw new Error ("Texture transcode failed. See console for details.");
      }

      const result = ktxTexture .glUpload ();

      if (result .error != gl .NO_ERROR)
         throw new Error (`WebGL error when uploading texture, code = ${result .error .toString (16)}`);

      if (result .object === undefined)
         throw new Error ("Texture upload failed. See console for details.");

      return {
         target: result .target,
         object: result .object,
         format: formatString,
      };
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
         data         = new Uint8Array ($.ungzip (arrayBuffer)),
         ktxTexture   = new this .libktx .ktxTexture (data),
         uploadResult = this .transcode (ktxTexture),
         texture      = uploadResult .object;

      texture .baseWidth     = ktxTexture .baseWidth;
      texture .baseHeight    = ktxTexture .baseHeight;
      texture .baseDepth     = ktxTexture .baseDepth ?? 1; // TODO: No support.
      texture .numComponents = ktxTexture .numComponents;
      texture .target        = uploadResult .target;

      ktxTexture .delete ();

      return texture;
   }
}
