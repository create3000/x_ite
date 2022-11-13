const
   webpack = require ("webpack"),
   path    = require ("path");

module .exports =
{
   entry: "./src/main.js",
   output: {
      path: path .resolve (__dirname, "dist"),
      filename: "bundle.js",
   },
   mode: "production",
   optimization: {
      minimize: false,
   },
   dependencies: [
      path .resolve (__dirname, "node_modules"),
   ],
   plugins: [
      new webpack .ProvidePlugin ({
         $: "jquery",
         pako: "pako",
      }),
   ],
   performance: {
      hints: "warning",
      maxEntrypointSize: 10_000_000,
      maxAssetSize: 10_000_000,
   },
};
