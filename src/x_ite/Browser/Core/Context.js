import MOBILE      from "../../MOBILE.js";
import DEVELOPMENT from "../../DEVELOPMENT.js";

const Context =
{
   excludes: new Set ([
      "WEBGL_debug_renderer_info",
      "WEBGL_polygon_mode",
   ]),
   create (canvas, preserveDrawingBuffer)
   {
      const options = { preserveDrawingBuffer };

      const gl = canvas .getContext ("webgl2", { ... options, antialias: false });

      if (!gl)
         throw new Error ("Couldn't create WebGL context.");

      gl .getVersion = () => 2;

      // Load extensions.

      for (const extension of gl .getSupportedExtensions () .filter (extension => !this .excludes .has (extension)))
         gl .getExtension (extension);

      // Feature detection:

      if (MOBILE)
      {
         // At least on iOS and Samsung Galaxy, float 32 textures are not supported.
         // We use half float textures instead.

         // Use defineProperty to overwrite property.
         Object .defineProperty (gl, "RGBA32F",
         {
            value: gl .RGBA16F,
            enumerable: true,
         });
      }

      return gl;
   },
}

export default Context;
