const
   webpack = require ("webpack"),
   path    = require ("path"),
   fs      = require ("fs")

const config = [{
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
}]

const plugins = {
   "RigidBodyPhysics.js": {

   },
   "Texturing3D.js": {

   },
}

for (const component of ["Geometry2D.js"] || fs .readdirSync ("./src/assets/components/"))
{
   config .push ({
      entry: "./src/assets/components/" + component,
      output: {
         path: path .resolve (__dirname, "dist/assets/components"),
         filename: component,
      },
      mode: "production",
      optimization: {
         minimize: false,
      },
      plugins: [
         new webpack .ProvidePlugin (plugins [component] || { }),
      ],
      resolve: {
         fallback: { "path": false, "fs": false },
      },
      stats: "minimal",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   })
}

config .parallelism = 4

module.exports = config
