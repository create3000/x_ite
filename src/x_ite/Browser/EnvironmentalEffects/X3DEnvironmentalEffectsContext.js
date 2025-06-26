import TextureProperties from "../../Components/Texturing/TextureProperties.js";

const _backgroundTextureProperties = Symbol ();

function X3DEnvironmentalEffectsContext () { }

Object .assign (X3DEnvironmentalEffectsContext .prototype,
{
   getBackgroundTextureProperties ()
   {
      return this [_backgroundTextureProperties] ??= (() =>
      {
         const backgroundTextureProperties = new TextureProperties (this .getPrivateScene ());

         backgroundTextureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         backgroundTextureProperties ._boundaryModeT       = "CLAMP_TO_EDGE";
         backgroundTextureProperties ._boundaryModeR       = "CLAMP_TO_EDGE";
         backgroundTextureProperties ._minificationFilter  = "NICEST";
         backgroundTextureProperties ._magnificationFilter = "NICEST";
         backgroundTextureProperties ._textureCompression  = "DEFAULT";
         backgroundTextureProperties .setup ();

         return backgroundTextureProperties;
      })();
   },
});

export default X3DEnvironmentalEffectsContext;
