import TextureBuffer     from "../../Rendering/TextureBuffer.js";
import ImageTexture      from "../../Components/Texturing/ImageTexture.js";
import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import URLs              from "../Networking/URLs.js";
import Diffuse2FS        from "./Diffuse2.fs.js";

const
   _maxLights     = Symbol (),
   _textures      = Symbol (),
   _shadowBuffers = Symbol (),
   _diffuseShader = Symbol ();

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
   getDiffuseTextureShader ()
   {
      return this [_diffuseShader] ??= this .createShader ("Panorama", "FullScreen", `data:x-shader/x-fragment,${Diffuse2FS}`, [ ], ["x3d_SpecularTextureEXT", "x3d_CurrentFaceEXT"]);
   },
});

export default X3DLightingContext;
