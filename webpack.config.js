const
   webpack = require ("webpack"),
   path    = require ("path"),
   fs      = require ("fs")

const
   TerserPlugin         = require ("terser-webpack-plugin"),
   MiniCssExtractPlugin = require ("mini-css-extract-plugin"),
   CssMinimizerPlugin   = require ("css-minimizer-webpack-plugin")

const config = [{
   entry: {
      "x_ite": "./src/x_ite.js",
      "x_ite.min": "./src/x_ite.js",
   },
   output: {
      path: path .resolve (__dirname, "dist"),
      filename: "[name].js",
   },
   mode: "production",
   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin ({
            include: /\.min\.js$/,
            parallel: true,
            extractComments: false,
            terserOptions: {
               compress: true,
               mangle: true,
               format: {
                  comments: false,
               },
            },
         }),
      ],
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
   const name = path .parse (component) .name

   config .push ({
      entry: {
         [name]: "./src/assets/components/" + component,
         [name + ".min"]: "./src/assets/components/" + component,
      },
      output: {
         path: path .resolve (__dirname, "dist/assets/components"),
         filename: "[name].js",
      },
      mode: "production",
      optimization: {
         minimize: true,
         minimizer: [
            new TerserPlugin ({
               include: /\.min\.js$/,
               parallel: true,
               extractComments: false,
               terserOptions: {
                  compress: true,
                  mangle: true,
                  format: {
                     comments: false,
                  },
               },
            }),
         ],
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

config .push ({
   entry: {
      "x_ite": "./src/x_ite.css",
   },
   output: {
      path: path .resolve (__dirname, "dist"),
   },
   mode: "production",
   module: {
      rules: [
         {
            test: /.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: {
                     url: false
                  },
               },
             ]
         },
      ],
   },
   optimization: {
      minimize: true,
      minimizer: [
         new CssMinimizerPlugin ({
            parallel: true,
            minify: CssMinimizerPlugin .cssoMinify,
            exclude: /\.png$/,
            minimizerOptions: {
               preset: [
                  "default",
                  {
                     discardComments: { removeAll: true },
                  },
               ],
            },
         }),
      ],
   },
   plugins: [new MiniCssExtractPlugin ({
      filename: "[name].css",
   })],
})

config .parallelism = 4

module.exports = config
