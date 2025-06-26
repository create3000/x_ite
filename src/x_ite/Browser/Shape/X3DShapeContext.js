import Appearance        from "../../Components/Shape/Appearance.js";
import PointProperties   from "../../Components/Shape/PointProperties.js";
import LineProperties    from "../../Components/Shape/LineProperties.js";
import UnlitMaterial     from "../../Components/Shape/UnlitMaterial.js";
import ImageTexture      from "../../Components/Texturing/ImageTexture.js";
import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import URLs              from "../Networking/URLs.js";

const
   _linetypeTextures                 = Symbol (),
   _hatchStyleTextures               = Symbol (),
   _defaultAppearance                = Symbol (),
   _defaultPointProperties           = Symbol (),
   _defaultLineProperties            = Symbol (),
   _defaultMaterial                  = Symbol (),
   _lineFillTextureProperties        = Symbol (),
   _lineTransformShaderNode          = Symbol (),
   _lineTransformInstancedShaderNode = Symbol (),
   _lineTransformFeedback            = Symbol ();

function X3DShapeContext ()
{
   this [_lineTransformInstancedShaderNode] = [ ];
   this [_hatchStyleTextures]               = [ ];
}

Object .assign (X3DShapeContext .prototype,
{
   getDefaultAppearance ()
   {
      return this [_defaultAppearance] ??= (() =>
      {
         const defaultAppearance = new Appearance (this .getPrivateScene ());

         defaultAppearance .setPrivate (true);
         defaultAppearance .setup ();

         return defaultAppearance;
      })();
   },
   getLineStippleScale ()
   {
      return 1 / (this .getRenderingProperty ("PixelsPerPoint") * 32); // 32px
   },
   getDefaultPointProperties ()
   {
      return this [_defaultPointProperties] ??= (() =>
      {
         const defaultPointProperties = new PointProperties (this .getPrivateScene ());

         defaultPointProperties .setPrivate (true);
         defaultPointProperties .setup ();

         return defaultPointProperties;
      })();
   },
   getDefaultLineProperties ()
   {
      return this [_defaultLineProperties] ??= (() =>
      {
         const defaultLineProperties = new LineProperties (this .getPrivateScene ());

         defaultLineProperties ._applied = false;
         defaultLineProperties .setPrivate (true);
         defaultLineProperties .setup ();

         return defaultLineProperties;
      })();
   },
   getDefaultMaterial ()
   {
      return this [_defaultMaterial] ??= (() =>
      {
         const defaultMaterial = new UnlitMaterial (this .getPrivateScene ());

         defaultMaterial .setPrivate (true);
         defaultMaterial .setup ();

         return defaultMaterial;
      })();
   },
   getLinetypeTexture ()
   {
      return this [_linetypeTextures] ??= (() =>
      {
         const linetypeTextures = new ImageTexture (this .getPrivateScene ());

         linetypeTextures ._url [0]           = URLs .getLinetypeURL ();
         linetypeTextures ._textureProperties = this .getLineFillTextureProperties ();
         linetypeTextures .setPrivate (true);
         linetypeTextures .setup ();

         return linetypeTextures;
      })();
   },
   getHatchStyleTexture (index)
   {
      return this [_hatchStyleTextures] [index] ??= (() =>
      {
         const hatchStyleTexture = new ImageTexture (this .getPrivateScene ());

         hatchStyleTexture ._url [0]           = URLs .getHatchingURL (index);
         hatchStyleTexture ._textureProperties = this .getLineFillTextureProperties ();
         hatchStyleTexture .setPrivate (true);
         hatchStyleTexture .setup ();

         return hatchStyleTexture;
      })();
   },
   getLineFillTextureProperties ()
   {
      return this [_lineFillTextureProperties] ??= (() =>
      {
         const lineFillTextureProperties = new TextureProperties (this .getPrivateScene ());

         lineFillTextureProperties ._minificationFilter  = "NEAREST_PIXEL";
         lineFillTextureProperties ._magnificationFilter = "NEAREST_PIXEL";
         lineFillTextureProperties ._textureCompression  = "DEFAULT";
         lineFillTextureProperties .setPrivate (true);
         lineFillTextureProperties .setup ();

         return lineFillTextureProperties;
      })();
   },
   getLineTransformShader ()
   {
      return this [_lineTransformShaderNode] ??= this .createLineTransformShader (0, false);
   },
   getLineTransformInstancedShader (pass)
   {
      return this [_lineTransformInstancedShaderNode] [pass] ??= this .createLineTransformShader (pass, true);
   },
   createLineTransformShader (pass, instanced)
   {
      const options = [`X3D_PASS_${pass}`];

      if (instanced)
         options .push ("X3D_INSTANCING");

      const uniformNames = [
         [
            "viewport",
            "modelViewProjectionMatrix",
            "invModelViewProjectionMatrix",
            "linewidthScaleFactor1_2",
         ],
         [ ],
         [ ],
      ]
      [pass];

      const transformFeedbackVaryings = [
         [
            "coordIndex0", "lineStipple0", "fogDepth0", "color0", "vertex0",
            "coordIndex1", "lineStipple1", "fogDepth1", "color1", "vertex1",
            "coordIndex2", "lineStipple2", "fogDepth2", "color2", "vertex2",
         ],
         [
            "instanceMatrix0",
            "instanceMatrix1",
            "instanceMatrix2",
         ],
         [
            "instanceNormalMatrix0", "tangent0", "normal0",
            "instanceNormalMatrix1", "tangent1", "normal1",
            "instanceNormalMatrix2", "tangent2", "normal2",
         ],
      ]
      [pass];

      return this .createShader (`LineTransform${instanced ? "Instanced" : ""}`, "LineTransform", "LineTransform", options, uniformNames, transformFeedbackVaryings);
   },
   getLineTransformFeedback ()
   {
      return this [_lineTransformFeedback] ??= (() =>
      {
         const gl = this .getContext ();

         const lineTransformFeedback = gl .createTransformFeedback ();

         return lineTransformFeedback;
      })();
   },
});

export default X3DShapeContext;
