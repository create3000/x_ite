const
   webpack  = require ("webpack"),
   madge    = require ("madge"),
   path     = require ("path"),
   fs       = require ("fs"),
   os       = require ("os"),
   { exec } = require ("child_process"),
   { sh }   = require ("shell-tools");

for (const filename of fs .readdirSync ("./src/assets/lib/") .filter (filename => filename .match (/\.js$/)))
{
   console .log (`Compressing ${filename} ...`);

   exec (`terser -c -m -p bare_returns -o ./dist/assets/lib/${filename} ./src/assets/lib/${filename}`);
}

const
   TerserPlugin           = require ("terser-webpack-plugin"),
   WebpackShellPluginNext = require ("webpack-shell-plugin-next"),
   StringReplacePlugin    = require ("string-replace-webpack-plugin"),
   WrapperPlugin          = require ("wrapper-webpack-plugin");

module .exports = async () =>
{
   async function deps (filename)
   {
      const
         graph = await madge (filename),
         deps  = new Set ();

      for (const files of Object .values (graph .obj ()))
      {
         for (const file of files)
            deps .add (path .resolve (path .dirname (filename), file));
      }

      return deps;
   }

   const
      x_ite_deps = await deps (path .resolve (__dirname, "src/x_ite.js")),
      targets    = [ ];

   x_ite_deps .add (path .resolve (__dirname, "src/x_ite/Namespace.js"));

   const namespace =
   {
      test: /\.js$/,
      exclude: /(?:Namespace\.js|X3D\.js|x_ite\.js)$/,
      use: [
         {
            loader: StringReplacePlugin .replace ({
               replacements: [
                  {
                     pattern: /export\s+default\s+(.+)$/sg,
                     replacement: function (match, m, offset, string)
                     {
                        const
                           ns   = path .resolve (__dirname, "src/x_ite/Namespace.js"),
                           rel  = path .relative (path .dirname (this .resourcePath), ns),
                           base = path .basename (this .resourcePath, ".js");

                        return `const __default__ = ${m};
import Namespace from "./${rel}";
export default Namespace .add ("${base}", __default__);`;
                     },
                  },
               ],
            }),
         },
      ],
   };

   const compress_glsl = {
      test: /\.js$/,
      use: [
         {
            loader: StringReplacePlugin .replace ({
               replacements: [
                  {
                     pattern: /\/\*\s*glsl\s*\*\/\s*`(.*?)`;/sg,
                     replacement: function (match, m, offset, string)
                     {
                        const e = [ ];

                        const a = m .match (/^\s*/) [0]
                           .replace (/\n+/sg, "\n")
                           .replace (/s+/, "");

                        const s = "/* glsl */ `" + a + m
                           .replace (/(\s*)(\$\{(?:[^}{]|\{(?:[^}{]|\{(?:[^}{]|\{[^}{]*\})*\})*\})*\})(\s*)/sg, (s, s1, s2, s3) =>
                           {
                              return `${s1}__EXPRESSION_${e .push (s) - 1}__${s3}`;
                           })
                           .replace (/\/\*.*?\*\//sg, "") // Remove comments
                           .replace (/\/\/.*?\n/sg, "\n") // Remove comments
                           .replace (/(#.*?)\n/sg, "$1__PREPROCESSOR__") // Replace preprocessor lines
                           .replace (/\b(\d+\.)0\b/sg, "$1") // Remove trailing zeroes in numbers
                           .replace (/\b0(\.\d+)\b/sg, "$1") // Remove leading zeroes in numbers
                           .replace (/vec(\d)\s*\((\d+)\.\)/sg, "vec$1($2)") // Remove trailing dot in vecN
                           .replace (/\s+/sg, " ") // Remove multiple spaces
                           .replace (/\s*([(){}\[\],;=<>!+\-*\/&|?:\.])\s*/sg, "$1") // Remove spaces around operators
                           .replace (/(#.*?)__PREPROCESSOR__\s*/sg, "$1\n") // Restore preprocessor lines
                           .replace (/(.)#/sg, "$1\n#") // Restore preprocessor lines
                           .replace (/^\s+/mg, "") // Remove leading spaces
                           .replace (/$/, "\n") // Remove trailing spaces
                           .replace (/(\})\s+$/s, "$1") // Remove trailing spaces after closing braces
                           .replace (/\n+/sg, "\n") // Remove multiple newlines
                           .replace (/__EXPRESSION_(\d+)__/sg, (_, i) =>
                           {
                              return `${e [i]
                                 .replace (/^[ \t]+/mg, "")
                                 .replace (/\n+/sg, "\n")}`
                           }) + "`";

                        return s .replace (/[\n\s]{2,}/sg, "\n"); // Remove multiple newlines and spaces
                     },
                  },
               ],
            }),
         },
      ],
   };

   const integrities = sh (`find src -type f -name "*.css"`) .trim () .split (/[\r\n]+/) .map (src =>
   {
      const dist = src .replace ("src", "dist");

      sh (`npx --yes css-minify < '${src}' > '${dist}'`);
      sh (`perl -p0i -e 's|^|/* X_ITE v'$npm_package_version' */|sg' '${dist}'`);

      const
         name      = path .parse (src) .name .toLowerCase (),
         integrity = "sha384-" + sh (`shasum -b -a 384 '${dist}' | awk '{ print $1 }' | xxd -r -p | base64`) .trim (),
         action    = `perl -p0i -e 's|integrity-${name}-css|${integrity}|sg' dist/x_ite{,.min}.js`

      return action;
   });

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
         rules: [namespace, compress_glsl],
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
         new StringReplacePlugin (),
         new webpack .ProvidePlugin ({
            $: "jquery",
            jQuery: "jquery",
            jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
            libtess: "libtess/libtess.cat.js",
            pako: "pako/dist/pako_inflate.js",
            SuperGif: path .resolve (__dirname, "src/lib/libgif/libgif.js"),
            APNG: "apng-js",
         }),
         new WebpackShellPluginNext ({
            logging: false,
            onBuildStart: {
               scripts: [
                  `echo 'Bundling x_ite ...'`,
                  `perl -p0i -e 's|".*?"|'\`npm pkg get version\`'|sg' src/x_ite/BROWSER_VERSION.js`,
                  `perl -p0i -e 's/export default (?:true|false);/export default false;/sg' src/x_ite/DEVELOPMENT.js`,
               ],
               blocking: true,
               parallel: false,
            },
            onBuildEnd: {
               scripts: [
                  // Version
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite{,.min}.js`,
                  `perl -p0i -e 's|^(/\\*.*?\\*/)?\\s*|/* X_ITE v'$npm_package_version' */\\n|sg' dist/x_ite{,.min}.js`,
                  // Subresource Integrity Hash Values
                  ... integrities,
                  // asm
                  `perl -p0i -e 's|"use\\s+asm"\\s*;?||sg' dist/x_ite{,.min}.js`,
                  // Source Maps
                  `perl -p0i -e 's|sourceMappingURL=.*?\\.map||sg' dist/x_ite{,.min}.js`,
                  // Debug
                  `perl -p0i -e 's/export default (?:true|false);/export default true;/sg' src/x_ite/DEVELOPMENT.js`,
                  // Licenses
                  `cp LICENSE.md dist/LICENSE.md`,
                  `echo '\nADDITIONAL LICENSES\n-------------------\n' >> dist/LICENSE.md`,
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
            path: false,
            fs: false,
         },
         alias: {
           "jquery": "jquery/dist/jquery.slim.js",
         },
      },
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   });

   targets .push ({
      entry: {
         "x_ite": "./src/x_ite.js",
         "x_ite.min": "./src/x_ite.js",
      },
      output: {
         path: path .resolve (__dirname, "dist"),
         filename: "[name].mjs",
         library: {
            type: "module",
         },
      },
      experiments: {
         outputModule: true,
      },
      mode: "production",
      module: {
         parser: {
            javascript : { importMeta: false },
         },
         rules: [namespace, compress_glsl,
            {
               test: /URLs\.js$/,
               use: [
                  {
                     loader: StringReplacePlugin .replace ({
                        replacements: [
                           {
                              pattern: /\/\/ var/sg,
                              replacement: function (match, m, offset, string)
                              {
                                 return "var";
                              },
                           },
                        ],
                     }),
                  },
               ],
            },
            {
               test: /Features\.js$/,
               use: [
                  {
                     loader: StringReplacePlugin .replace ({
                        replacements: [
                           {
                              pattern: /MODULE = false/sg,
                              replacement: function (match, m, offset, string)
                              {
                                 return "MODULE = true";
                              },
                           },
                        ],
                     }),
                  },
               ],
            },
         ],
      },
      optimization: {
         minimize: true,
         minimizer: [
            new TerserPlugin ({
               include: /\.min\.mjs$/,
               parallel: true,
               extractComments: true,
               terserOptions: {
                  module: true,
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
            $: "jquery",
            jQuery: "jquery",
            jquery_mousewheel: "jquery-mousewheel/jquery.mousewheel.js",
            libtess: "libtess/libtess.cat.js",
            pako: "pako/dist/pako_inflate.js",
            SuperGif: path .resolve (__dirname, "src/lib/libgif/libgif.js"),
            APNG: "apng-js",
         }),
         new WebpackShellPluginNext ({
            logging: false,
            onBuildStart: {
               scripts: [
                  `echo 'Bundling x_ite module ...'`,
                  `perl -p0i -e 's|".*?"|'\`npm pkg get version\`'|sg' src/x_ite/BROWSER_VERSION.js`,
                  `perl -p0i -e 's/export default (?:true|false);/export default false;/sg' src/x_ite/DEVELOPMENT.js`,
               ],
               blocking: true,
               parallel: false,
            },
            onBuildEnd: {
               scripts: [
                  // Version
                  `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/x_ite{,.min}.mjs`,
                  `perl -p0i -e 's|^(/\\*.*?\\*/)?\\s*|/* X_ITE v'$npm_package_version' */\\n|sg' dist/x_ite{,.min}.mjs`,
                  // Subresource Integrity Hash Values
                  ... integrities,
                  // asm
                  `perl -p0i -e 's|"use\\s+asm"\\s*;?||sg' dist/x_ite{,.min}.mjs`,
                  // Source Maps
                  `perl -p0i -e 's|sourceMappingURL=.*?\\.map||sg' dist/x_ite{,.min}.mjs`,
                  // Debug
                  `perl -p0i -e 's/export default (?:true|false);/export default true;/sg' src/x_ite/DEVELOPMENT.js`,
                  // License
                  `rm dist/x_ite.min.mjs.LICENSE.txt`,
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
            path: false,
            fs: false,
         },
         alias: {
           "jquery": "jquery/dist/jquery.slim.js",
         },
      },
      stats: "errors-warnings",
      performance: {
         hints: "warning",
         maxEntrypointSize: 10_000_000,
         maxAssetSize: 10_000_000,
      },
   });

   const dependencies = {
      "Layout": ["Text"],
      "Picking": ["RigidBodyPhysics"],
      "VolumeRendering": ["CADGeometry", "Texturing3D"],
   };

   function resolveDeps (name)
   {
      let deps = [ ];

      for (const d of dependencies [name] || [ ])
         deps = [... deps, ... resolveDeps (d), d];

      return deps;
   }

   for (const filename of fs .readdirSync ("./src/assets/components/"))
   {
      const
         name           = path .parse (filename) .name .replace (/Component$/, ""),
         component_deps = [x_ite_deps];

      component_deps .push (... await Promise .all (resolveDeps (name)
         .map (dependency => deps (path .resolve (__dirname, `src/assets/components/${dependency}Component.js`)))));

      targets .push ({
         entry: {
            [`${name}Component`]: "./src/assets/components/" + filename,
            [`${name}Component.min`]: "./src/assets/components/" + filename,
         },
         output: {
            path: path .resolve (__dirname, "dist/assets/components"),
            filename: "[name].js",
         },
         mode: "production",
         module: {
            rules: [namespace, compress_glsl],
         },
         optimization: {
            minimize: true,
            minimizer: [
               new TerserPlugin ({
                  include: /\.min\.js$/,
                  parallel: true,
                  extractComments: false,
                  terserOptions: {
                     module: true,
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
            new WrapperPlugin ({
               test: /\.js$/,
               header: `const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D")];\n`,
            }),
            new webpack .ProvidePlugin ({
               $: path .resolve (__dirname, "src/lib/jquery.js"),
               jQuery: path .resolve (__dirname, "src/lib/jquery.js"),
               // Per component
               ... {
                  Texturing3D: {
                     CharLS: "CharLS.js/dist/charLS-DynamicMemory-browser.js",
                     dicomParser: "dicom-parser/dist/dicomParser.js",
                     OpenJPEG: "OpenJPEG.js/dist/openJPEG-DynamicMemory-browser.js",
                     jpegDecode: "jpeg-js/lib/decoder.js",
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
                     `perl -p0i -e 's|"X_ITE.X3D"|"X_ITE.X3D-'$npm_package_version'"|sg' dist/assets/components/${name}Component{,.min}.js`,
                     `perl -p0i -e 's|^(/\\*.*?\\*/)?\\s*|/* X_ITE v'$npm_package_version' */\\n|sg' dist/assets/components/${name}Component{,.min}.js`,
                     // asm
                     `perl -p0i -e 's|"use\\s+asm"\\s*;?||sg' dist/assets/components/${name}Component{,.min}.js`,
                     // Source Maps
                     `perl -p0i -e 's|sourceMappingURL=.*?\\.map||sg' dist/assets/components/${name}Component{,.min}.js`,
                     // Per component
                     ... {
                        Texturing3D: [
                           `perl -p0i -e 's|("./index.js"\\).*?\\})|$1.bind({})|sg' dist/assets/components/${name}Component{,.min}.js`,
                           `perl -p0i -e 's/[,;]*(var\\s+)?(CharLS|OpenJPEG)\\s*=\\s*function/;module.exports=function/sg' dist/assets/components/${name}Component{,.min}.js`,
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
               const filename = path .resolve (context, request);

               for (const deps of component_deps)
               {
                  if (!deps .has (filename))
                     continue;

                  const module = path .basename (filename, ".js");

                  return callback (null, `var __X_ITE_X3D__ .${module}`);
               }

               return callback ();
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
      });
   }

   console .log (`Using ${os .cpus () .length} CPUs to package X_ITE.`);

   targets .parallelism = os .cpus () .length;

   return targets;
};
