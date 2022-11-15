const
   webpack = require ("webpack"),
   path    = require ("path"),
   fs      = require ("fs")

const
   TerserPlugin           = require ("terser-webpack-plugin"),
   WebpackShellPluginNext = require ("webpack-shell-plugin-next"),
   MiniCssExtractPlugin   = require ("mini-css-extract-plugin"),
   CssMinimizerPlugin     = require ("css-minimizer-webpack-plugin")

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
            extractComments: true,
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
      new webpack .ProvidePlugin ({
         $: "jquery",
         jQuery: "jquery",
         jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
         libtess: "libtess/libtess.cat.js",
         opentype: "opentype.js/dist/opentype.js",
         pako: "pako/dist/pako_inflate.js",
         ResizeSensor: "css-element-queries/src/ResizeSensor.js",
      }),
      new WebpackShellPluginNext ({
         onBuildStart: {
            scripts: [
               `perl -p0i -e 's/export default (?:true|false);/export default false;/sg' src/x_ite/DEBUG.js`,
            ],
            blocking: false,
            parallel: false,
         },
         onBuildEnd: {
            scripts: [
               `perl -p0i -e 's/export default (?:true|false);/export default true;/sg' src/x_ite/DEBUG.js`,
               `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite.js`,
               `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite.min.js`,
               `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.js`,
               `perl -p0i -e 's|^/\\*.*?\\*/|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.min.js`,
               // LICENSES
               `cp LICENSE.md dist/LICENSE.md`,
               `echo '\`\`\`' >> dist/LICENSE.md`,
               `cat dist/x_ite.min.js.LICENSE.txt >> dist/LICENSE.md`,
               `rm dist/x_ite.min.js.LICENSE.txt`,
               `echo '\`\`\`' >> dist/LICENSE.md`,
            ],
            blocking: false,
            parallel: false,
         }
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
         new WebpackShellPluginNext ({
            onBuildEnd: {
               scripts: [
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}.js`,
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}.min.js`,
                  `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/assets/components/${name}.js`,
                  `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/assets/components/${name}.min.js`,
               ],
               blocking: false,
               parallel: false,
            }
         }),
      ],
      resolve: {
         fallback: {
            path: false,
            fs: false,
         },
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
   plugins: [
      new MiniCssExtractPlugin ({
         filename: "[name].css",
      }),
      new WebpackShellPluginNext ({
         onBuildEnd: {
            scripts: [
               `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.css`,
            ],
            blocking: false,
            parallel: false,
         }
      }),
   ],
   stats: "errors-only",
})

config .parallelism = 4

module.exports = config
