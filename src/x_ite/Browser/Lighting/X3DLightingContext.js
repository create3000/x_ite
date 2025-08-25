import TextureBuffer     from "../../Rendering/TextureBuffer.js";
import ImageTexture      from "../../Components/Texturing/ImageTexture.js";
import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import URLs              from "../Networking/URLs.js";
import Filter2FS         from "./Filter2.fs.js";

const
   _maxLights                = Symbol (),
   _textures                 = Symbol (),
   _shadowBuffers            = Symbol (),
   _environmentTextureShader = Symbol ();

function X3DLightingContext ()
{
   const
      gl                   = this .getContext (),
      maxTextureImageUnits = gl .getParameter (gl .MAX_TEXTURE_IMAGE_UNITS);

   if (maxTextureImageUnits > 8)
      this [_maxLights] = 8;
   else
      this [_maxLights] = 2;

   this [_textures]      = new Map ();
   this [_shadowBuffers] = [ ]; // Shadow buffer cache
}

Object .assign (X3DLightingContext .prototype,
{
   getMaxLights ()
   {
      return this [_maxLights];
   },
   getLibraryTexture (name)
   {
      return this [_textures] .get (name) ?? this .createLibraryTexture (name);
   },
   createLibraryTexture (name)
   {
      const
         texture           = new ImageTexture (this .getPrivateScene ()),
         textureProperties = new TextureProperties (this .getPrivateScene ());

      textureProperties ._generateMipMaps     = false;
      textureProperties ._minificationFilter  = "AVG_PIXEL";
      textureProperties ._magnificationFilter = "AVG_PIXEL";
      textureProperties ._boundaryModeS       = "CLAMP_TO_BOUNDARY";
      textureProperties ._boundaryModeT       = "CLAMP_TO_BOUNDARY";
      textureProperties ._boundaryModeR       = "CLAMP_TO_BOUNDARY";

      textureProperties .setup ();

      texture ._url               = [URLs .getLibraryURL (name)];
      texture ._textureProperties = textureProperties;

      texture .setup ();

      this [_textures] .set (name, texture)

      return texture;
   },
   popShadowBuffer (shadowMapSize)
   {
      try
      {
         const shadowBuffers = this [_shadowBuffers] [shadowMapSize];

         if (shadowBuffers)
         {
            if (shadowBuffers .length)
               return shadowBuffers .pop ();
         }
         else
            this [_shadowBuffers] [shadowMapSize] = [ ];

         return new TextureBuffer ({
            browser: this,
            width: shadowMapSize,
            height: shadowMapSize,
            float: true,
         });
      }
      catch (error)
      {
         // Couldn't create texture buffer.
         console .error (error);

         return null;
      }
   },
   pushShadowBuffer (buffer)
   {
      if (buffer)
         this [_shadowBuffers] [buffer .getWidth ()] .push (buffer);
   },
   getEnvironmentTextureShader ()
   {
      return this [_environmentTextureShader] ??= this .createShader ("EnvironmentTexture", "FullScreen", `data:x-shader/x-fragment,${Filter2FS}`, [ ], ["x3d_TextureEXT", "x3d_TextureSizeEXT", "x3d_TextureLinearEXT", "x3d_CurrentFaceEXT", "x3d_DistributionEXT", "x3d_SampleCountEXT", "x3d_RoughnessEXT", "x3d_LodBiasEXT", "x3d_IntensityEXT"]);
   },
   filterEnvironmentTexture ({ name, texture, distribution, sampleCount, roughness })
   {
      // Render the texture.

      const
         gl             = this .getContext (),
         currentProgram = gl .getParameter (gl .CURRENT_PROGRAM),
         shaderNode     = this .getEnvironmentTextureShader (),
         framebuffer    = gl .createFramebuffer (),
         size           = texture .getSize (),
         filtered       = texture .getExecutionContext () .createNode ("ImageCubeMapTexture", false);

      // Setup texture.

      filtered .setName (name);
      filtered .setPrivate (true);
      filtered .setup ();
      filtered .setSize (size);
      filtered .setLinear (true);

      // Resize texture.

      const data = new Uint8Array (size * size * 4);

      gl .bindTexture (filtered .getTarget (), filtered .getTexture ());

      for (const target of filtered .getTargets ())
         gl .texImage2D (target, 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, data);

      if (roughness .length > 1)
      {
         gl .generateMipmap (gl .TEXTURE_CUBE_MAP);
         gl .texParameteri (gl .TEXTURE_CUBE_MAP, gl .TEXTURE_MIN_FILTER, gl .LINEAR_MIPMAP_LINEAR);
         gl .texParameteri (gl .TEXTURE_CUBE_MAP, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
      }

      // Setup defaults.

      gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
      gl .disable (gl .DEPTH_TEST);
      gl .enable (gl .CULL_FACE);
      gl .frontFace (gl .CCW);
      gl .clearColor (0, 0, 0, 0);
      gl .bindVertexArray (this .getFullscreenVertexArrayObject ());

      // Setup specular texture uniforms.

      const specularTextureUnit = this .popTextureUnit ();

      gl .useProgram (shaderNode .getProgram ());
      gl .activeTexture (gl .TEXTURE0 + specularTextureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, texture .getTexture ());
      gl .uniform1i (shaderNode .x3d_TextureEXT, specularTextureUnit);
      gl .uniform1i (shaderNode .x3d_TextureSizeEXT, size);
      gl .uniform1i (shaderNode .x3d_TextureLinearEXT, texture .isLinear ());
      gl .uniform1i (shaderNode .x3d_DistributionEXT, distribution);
      gl .uniform1i (shaderNode .x3d_SampleCountEXT, sampleCount);
      gl .uniform1f (shaderNode .x3d_LodBiasEXT, 0);
      gl .uniform1f (shaderNode .x3d_IntensityEXT, 1);

      for (const [level, r] of roughness .entries ())
      {
         const mipSize = size >> level;

         // console .log (level, mipSize, r, filtered .getLevels ());

         // Setup mip level uniforms.

         gl .uniform1f (shaderNode .x3d_RoughnessEXT, r);

         // Generate images.

         gl .viewport (0, 0, mipSize, mipSize);
         gl .scissor  (0, 0, mipSize, mipSize);

         for (let i = 0; i < 6; ++ i)
         {
            gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, filtered .getTargets () [i], filtered .getTexture (), level);

            gl .clear (gl .COLOR_BUFFER_BIT);
            gl .uniform1i (shaderNode .x3d_CurrentFaceEXT, i);
            gl .drawArrays (gl .TRIANGLES, 0, 6);
         }
      }

      gl .enable (gl .DEPTH_TEST);
      gl .deleteFramebuffer (framebuffer);
      gl .useProgram (currentProgram);

      this .pushTextureUnit (specularTextureUnit);

      return filtered;
   },
});

export default X3DLightingContext;
