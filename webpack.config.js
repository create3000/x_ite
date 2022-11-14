const
   webpack = require ("webpack"),
   path    = require ("path");

module .exports =
{
   entry: "./src/x_ite.js",
   output: {
      path: path .resolve (__dirname, "dist"),
      filename: "x_ite.js",
   },
   mode: "production",
   optimization: {
      minimize: false,
   },
   // dependencies: [
   //    path .resolve (__dirname, "node_modules"),
   // ],
   plugins: [
      new webpack .ProvidePlugin ({
         $: "jquery",
         jQuery: "jquery",
         jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
         libtess: "libtess/libtess.cat.js",
         opentype: "opentype.js/dist/opentype.js",
         pako: "pako/dist/pako_inflate.js",
         ResizeSensor: "css-element-queries/src/ResizeSensor.js",
      }),
   ],
   stats: "minimal",
   performance: {
      hints: "warning",
      maxEntrypointSize: 10_000_000,
      maxAssetSize: 10_000_000,
   },
};
