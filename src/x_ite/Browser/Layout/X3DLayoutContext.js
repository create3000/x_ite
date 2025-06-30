import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4           from "../../../standard/Math/Numbers/Matrix4.js";
import ViewVolume        from "../../../standard/Math/Geometry/ViewVolume.js";

const _screenTextureProperties = Symbol ();

function X3DLayoutContext () { }

Object .assign (X3DLayoutContext .prototype,
{
   getScreenTextureProperties ()
   {
      return this [_screenTextureProperties] ??= (() =>
      {
         const screenTextureProperties = new TextureProperties (this .getPrivateScene ());

         screenTextureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeT       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeR       = "CLAMP_TO_EDGE";
         screenTextureProperties ._minificationFilter  = "NEAREST_PIXEL";
         screenTextureProperties ._magnificationFilter = "NEAREST_PIXEL";
         screenTextureProperties ._generateMipMaps     = false;
         screenTextureProperties ._textureCompression  = "DEFAULT";

         screenTextureProperties .setup ();

         return screenTextureProperties;
      })();
   },
   getScreenScaleMatrix: (() =>
   {
      const
         screenScale  = new Vector3 (),
         screenPoint  = new Vector3 (),
         screenMatrix = new Matrix4 ();

      return function (renderObject, matrix, contentScale, snap)
      {
         // throws domain error

         const
            modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
            projectionMatrix = renderObject .getProjectionMatrix () .get (),
            viewport         = renderObject .getViewVolume () .getViewport ();

         // Determine screenMatrix.
         // Same as in ScreenText.

         renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x * contentScale),
            y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y * contentScale),
            z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x * contentScale);

         screenMatrix .set (x .x, x .y, x .z, 0,
                            y .x, y .y, y .z, 0,
                            z .x, z .y, z .z, 0,
                            modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

         // Snap to whole pixel.

         if (snap)
         {
            ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .z = 0;
            screenMatrix .translate (screenPoint);
         }

         // Assign relative matrix.

         matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
      };
   })(),
});

export default X3DLayoutContext;
