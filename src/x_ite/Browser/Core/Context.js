const Context =
{
   excludes: new Set ([
      "WEBGL_debug_renderer_info",
      "WEBGL_polygon_mode",
   ]),
   create (canvas, preserveDrawingBuffer)
   {
      const gl = canvas .getContext ("webgl2", { antialias: false, preserveDrawingBuffer });

      if (!gl)
         throw new Error ("Couldn't create WebGL context.");

      gl .getVersion = () => 2;

      // Load extensions.

      for (const extension of gl .getSupportedExtensions () .filter (extension => !this .excludes .has (extension)))
         gl .getExtension (extension);

      return gl;
   },
};

export default Context;
