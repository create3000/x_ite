const
   webpack = require ("webpack"),
   madge   = require ("madge"),
   path    = require ("path"),
   fs      = require ("fs")

const
   TerserPlugin           = require ("terser-webpack-plugin"),
   WebpackShellPluginNext = require ("webpack-shell-plugin-next"),
   StringReplacePlugin    = require ("string-replace-webpack-plugin")

module .exports = async () =>
{
   async function deps (filename)
   {
      const
         graph = await madge (filename),
         deps  = new Set ()

      for (const files of Object .values (graph .obj ()))
      {
         for (const file of files)
            deps .add (path .resolve (path .dirname (filename), file))
      }

      return deps
   }

   const
      x_ite_deps = await deps (path .resolve (__dirname, "src/x_ite.js")),
      targets    = [ ]

   x_ite_deps .add (path .resolve (__dirname, "src/x_ite/Namespace.js"))

   const namespace =
   {
      test: /\.js$/,
      exclude: /Namespace\.js$/,
      use: [
         {
            loader: StringReplacePlugin .replace ({
               replacements: [
                  {
                     pattern: /export\s+default\s+(.+)$/sg,
                     replacement: function (match, m, offset, string)
                     {
                        const
                           ns  = path .resolve (__dirname, "src/x_ite/Namespace.js"),
                           rel = path .relative (path .dirname (this .resourcePath), ns),
                           key = path .relative (path .resolve (__dirname, "src"), this .resourcePath) .replace (/\.js$/, "")

                        return `const __default__ = ${m};
import Namespace from "./${rel}";
Namespace .set ("${key}", __default__);
export default __default__;`;
                     },
                  },
               ],
            }),
         },
      ],
   }

   targets .push ({
      entry: {
         "x_ite": "./src/x_ite.js",
         "x_ite.min": "./src/x_ite.js",
      },
      output: {
         path: path .resolve (__dirname, "dist"),
         filename: "[name].js",
         library: {
            name: "X3D",
            export: ["default"],
            type: "umd",
         },
      },
      mode: "production",
      module: {
         rules: [namespace],
      },
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
            jquery_fullscreen: "jquery-fullscreen-plugin/jquery.fullscreen.js",
            jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
            libtess: "libtess/libtess.cat.js",
            pako: "pako/dist/pako_inflate.js",
            ResizeSensor: "css-element-queries/src/ResizeSensor.js",
         }),
         new WebpackShellPluginNext ({
            logging: false,
            onBuildStart: {
               scripts: [
                  `echo 'Bundling x_ite ...'`,
                  `npm rebuild node-sass`,
                  `perl -p0e 's|\\/\\*.*?\\*\\/||sg' src/x_ite.css | npx node-sass --output-style compressed > dist/x_ite.css`,
                  `perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite.css`,
                  `perl -p0i -e 's|".*?"|'\`npm pkg get version\`'|sg' src/x_ite/Browser/VERSION.js`,
                  `perl -p0i -e 's/export default (?:true|false);/export default false;/sg' src/x_ite/DEBUG.js`,
               ],
               blocking: true,
               parallel: false,
            },
            onBuildEnd: {
               scripts: [
                  // Version
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite{,.min}.js`,
                  `perl -p0i -e 's|^(/\\*.*?\\*/)?\\s*|/* X_ITE v'$npm_package_version' */|sg' dist/x_ite{,.min}.js`,
                  // Source Maps
                  `perl -p0i -e 's|sourceMappingURL=.*?\\.map||sg' dist/x_ite{,.min}.js`,
                  // Debug
                  `perl -p0i -e 's/export default (?:true|false);/export default true;/sg' src/x_ite/DEBUG.js`,
                  // Licenses
                  `cp LICENSE.md dist/LICENSE.md`,
                  `echo '\`\`\`' >> dist/LICENSE.md`,
                  `cat dist/x_ite.min.js.LICENSE.txt >> dist/LICENSE.md`,
                  `rm dist/x_ite.min.js.LICENSE.txt`,
                  `echo '\`\`\`' >> dist/LICENSE.md`,
               ],
               blocking: false,
               parallel: false,
            },
        }),
      ],
      node: {
         __filename: false,
      },
      resolve: {
         fallback: {
            process: false,
         },
      },
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   })

   const dependencies = {
      "Layout": ["Text"],
      "Picking": ["RigidBodyPhysics"],
      "VolumeRendering": ["CADGeometry", "Texturing3D"],
   }

   function resolveDeps (name)
   {
      let deps = [ ]

      for (const d of dependencies [name] || [ ])
         deps = [... deps, ... resolveDeps (d), d]

      return deps
   }

   for (const filename of fs .readdirSync ("./src/assets/components/"))
   {
      const
         name           = path .parse (filename) .name,
         component_deps = [x_ite_deps]

      for (const dependency of resolveDeps (name))
         component_deps .push (await deps (path .resolve (__dirname, `src/assets/components/${dependency}.js`)))

      targets .push ({
         entry: {
            [name]: "./src/assets/components/" + filename,
            [name + ".min"]: "./src/assets/components/" + filename,
         },
         output: {
            path: path .resolve (__dirname, "dist/assets/components"),
            filename: "[name].js",
         },
         mode: "production",
         module: {
            rules: [namespace],
         },
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
            new StringReplacePlugin (),
            new webpack .ProvidePlugin ({
               $: path .resolve (__dirname, "src/lib/jquery.js"),
               jQuery: path .resolve (__dirname, "src/lib/jquery.js"),
               // Per component
               ... {
                  Text: {
                     opentype: "opentype.js/dist/opentype.js",
                  },
                  Texturing3D: {
                     CharLS: "CharLS.js/dist/charLS-DynamicMemory-browser.js",
                     dicomParser: "dicom-parser/dist/dicomParser.js",
                     jpeg: "jpeg-lossless-decoder-js/release/current/lossless.js",
                     OpenJPEG: "OpenJPEG.js/dist/openJPEG-DynamicMemory-browser.js",
                     JpegImage: "jpeg-js/lib/decoder.js",
                  },
               }
               [name] || { },
            }),
            new WebpackShellPluginNext ({
               logging: false,
               onBuildStart: {
                  scripts: [
                     `echo 'Bundling ${name} ...'`,
                  ],
                  blocking: false,
                  parallel: false,
               },
               onBuildEnd: {
                  scripts: [
                     // Version
                     `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}{,.min}.js`,
                     `perl -p0i -e 's|^(/\\*.*?\\*/)?\\s*|/* X_ITE v'$npm_package_version' */|sg' dist/assets/components/${name}{,.min}.js`,
                     // Source Maps
                     `perl -p0i -e 's|sourceMappingURL=.*?\\.map||sg' dist/assets/components/${name}{,.min}.js`,
                     // Per component
                     ... {
                        Texturing3D: [
                           `perl -p0i -e 's|("./index.js"\\).*?\\})|$1.bind({})|sg' dist/assets/components/${name}{,.min}.js`,
                           `perl -p0i -e 's/[,;]*(var\\s+)?(CharLS|OpenJPEG)\\s*=\\s*function/;module.exports=function/sg' dist/assets/components/${name}{,.min}.js`,
                        ],
                     }
                     [name] || [ ],
                  ],
                  blocking: false,
                  parallel: false,
               },
            }),
         ],
         externals: [
            function ({ context, request }, callback)
            {
               const filename = path .resolve (context, request)

               for (const deps of component_deps)
               {
                  if (! deps .has (filename))
                     continue

                  const module = path .relative (path .resolve (__dirname, "src"), filename) .replace (/\.js$/, "")

                  return callback (null, `var window [Symbol .for ("X_ITE.X3D")] .require ("${module}")`)
               }

               return callback ()
            },
         ],
         resolve: {
            fallback: {
               process: false,
               path: false,
               fs: false,
            },
         },
         stats: "errors-warnings",
         performance: {
            hints: "warning",
            maxEntrypointSize: 10_000_000,
            maxAssetSize: 10_000_000,
         },
      })
   }

   targets .parallelism = 4

   return targets
}
