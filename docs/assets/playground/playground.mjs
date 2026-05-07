const MONACO_VERSION = $(`script[src*="monaco-editor"]`) .attr ("src") .match (/\/monaco-editor(@?.*?)\//) [1];

class Playground
{
   autoUpdate = true;
   changed    = false;

   static run ()
   {
      this .playground = new Playground ();
   }

   constructor ()
   {
      require .config ({ paths: { "vs": `https://cdn.jsdelivr.net/npm/monaco-editor${MONACO_VERSION}/min/vs` }});
      require (["vs/editor/editor.main"], () => this .setup ());
   }

   async setup ()
   {
      // Handle color scheme changes.
      // Must be done at first.

      window .matchMedia ("(prefers-color-scheme: dark)")
         .addEventListener ("change", () => this .changeColorScheme ());

      this .changeColorScheme ();

      // Create editor.

      const
         browser = X3D .getBrowser (),
         model   = monaco .editor .createModel ("", "xml"),
         editor  = monaco .editor .create (document .getElementById ("editor"),
         {
            model: model,
            language: "xml",
            contextmenu: true,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            wrappingIndent: "indent",
            minimap: { enabled: false },
            bracketPairColorization: { enabled: true },
         });

      this .browser      = browser;
      this .canvas       = $(browser .element);
      this .localStorage = this .browser .getLocalStorage () .addNameSpace ("Playground.");
      this .editor       = editor;
      this .model        = model;

      this .localStorage .setDefaultValues ({
         fullSize: false,
      });

      const
         searchParams = new URL (location) .searchParams,
         url          = searchParams .get ("url") ?? "/x_ite/assets/playground/playground.x3d";

      if (searchParams .get ("play") === "false")
         browser .endUpdate ();

      if (searchParams .has ("fullSize"))
         this .localStorage .fullSize = searchParams .get ("fullSize") === "true";

      this .addVRMLEncoding ();
      this .addGLSL ();
      this .updateToolbar ();

      browser .contextMenu .userMenu = () => this .updateUserMenu ();

      await browser .loadComponents (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));

      // Handle url parameter.

      browser .baseURL = url;

      await browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      const encoding = { XML: "XML", JSON: "JSON", VRML: "VRML" } [browser .currentScene .encoding] ?? "XML";

      this .updateLanguage (encoding);

      model .setValue (browser .currentScene [`to${encoding}String`] ());
      model .onDidChangeContent (event => this .onDidChangeContent (event));

      // Keyboard shortcuts.

      $("#editor") .on ("keydown", event => this .onKeyDown (event));

      // Console

      this .redirectConsoleMessages ();

      console .info (X3D .getBrowser () .getWelcomeMessage ());
   }

   changeColorScheme ()
   {
      const darkMode = (window .matchMedia ?.("(prefers-color-scheme: dark)") .matches || $("html") .attr ("data-mode") === "dark") && ($("html") .attr ("data-mode") !== "light");

      monaco .editor .setTheme (darkMode ? "vs-dark" : "vs-light");
   }

   timeoutId;

   onDidChangeContent (event)
   {
      if (event .isFlush)
         return;

      this .changed = true;

      $("#refresh-button") .addClass ("selected");

      if (!this .autoUpdate)
         return;

      clearTimeout (this .timeoutId);

      this .timeoutId = setTimeout (() => this .applyChanges (), 1000);
   }

   onKeyDown (event)
   {
      // Apply changes when CommandOrCtrl-s is pressed.

      if (!(event .key === "s" && (event .ctrlKey || event .metaKey)))
         return;

      event .preventDefault ();
      this .applyChanges ();
   }

   openFile (input)
   {
      const file = input .prop ("files") [0];

      if (!file)
         return;

      const fileReader = new FileReader ();

      fileReader .addEventListener ("load", async () =>
      {
         await this .browser .loadURL (new X3D .MFString (fileReader .result)) .catch (Function .prototype);

         this .model .setValue (this .browser .currentScene .toXMLString ());
         this .updateLanguage ("XML");
      });

      fileReader .readAsDataURL (file);
   }

   async applyChanges ()
   {
      const
         browser         = this .browser,
         editor          = this .editor,
         activeViewpoint = browser .getActiveViewpoint (),
         text            = editor .getValue (),
         url             = encodeURI (`data:,${text}`);

      $("#refresh-button") .addClass ("selected");

      // If there is no active layer, then active viewpoint is null.
      const
         userPosition         = activeViewpoint ?.getUserPosition () .copy (),
         userOrientation      = activeViewpoint ?.getUserOrientation () .copy (),
         userCenterOfRotation = activeViewpoint ?.getUserCenterOfRotation () .copy (),
         fieldOfViewScale     = activeViewpoint ?.getFieldOfViewScale (),
         nearDistance         = activeViewpoint ?.getNearDistance (),
         farDistance          = activeViewpoint ?.getFarDistance ();

      try
      {
         await browser .loadURL (new X3D .MFString (url));

         // If there is no active layer, then active viewpoint is null.
         const activeViewpoint = browser .getActiveViewpoint ();

         if (activeViewpoint && userPosition)
         {
            activeViewpoint .setUserPosition (userPosition);
            activeViewpoint .setUserOrientation (userOrientation);
            activeViewpoint .setUserCenterOfRotation (userCenterOfRotation);
            activeViewpoint .setFieldOfViewScale (fieldOfViewScale);
            activeViewpoint .setNearDistance (nearDistance);
            activeViewpoint .setFarDistance (farDistance);
         }

         this .changed = false;

         this .updateLanguage (browser .currentScene .encoding);

         $("#refresh-button") .removeClass ("selected");
      }
      catch (error)
      {
         console .error (error);
      }
   }

   updateToolbar ()
   {
      const
         browser = this .browser,
         model   = this .model,
         toolbar = $(".playground .toolbar");

      toolbar .empty ();

      const suffixes = [
         ".x3d",
         ".x3dz",
         ".x3dj",
         ".x3djz",
         ".x3dv",
         ".x3dvz",
         ".wrl",
         ".wrz",
         ".vrml",
         ".gltf",
         ".glb",
         ".vrm",
         ".obj",
         ".stl",
         ".ply",
         ".svg",
         ".svgz",
      ];

      const openFile = $("<input></input>")
         .attr ("type", "file")
         .attr ("accept", suffixes .join (","))
         .css ({ "position": "absolute", "visibility": "hidden" })
         .on ("change", () =>
         {
            this .openFile (openFile);
         })
         .appendTo (toolbar);

      $("<button></button>")
         .attr ("title", "Open a file (X3D, VRML, glTF (GLB), VRM, OBJ, STL, PLY, SVG).")
         .addClass ("material-symbols-outlined")
         .text ("file_open")
         .on ("click", () =>
         {
            openFile .trigger ("click");
         })
         .appendTo (toolbar);

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      const autoUpdateButton = $("<button></button>")
         .addClass (this .autoUpdate ? "selected" : "")
         .append ($("<span></span>")
            .addClass (["icon", "material-symbols-outlined"])
            .text (this .autoUpdate ? "check" : "close"))
         .append ($("<span></span>")
            .addClass ("label")
            .text ("Auto Update"))
         .on ("click", () =>
         {
            this .autoUpdate = !this .autoUpdate;

            if (this .autoUpdate && this .changed)
               this .applyChanges ();

            autoUpdateButton
               .removeClass ("selected")
               .addClass (this .autoUpdate ? "selected" : "");

            autoUpdateButton .find (".icon")
               .text (this .autoUpdate ? "check" : "close");
         })
         .appendTo (toolbar);

      $("<button></button>")
         .attr ("title", "Apply changes.")
         .attr ("id", "refresh-button")
         .addClass ("material-symbols-outlined")
         .text ("autorenew")
         .on ("click", () =>
         {
            this .applyChanges ();
         })
         .appendTo (toolbar);

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      const playButton = $("<button></button>")
         .attr ("title", "Toggle browser update on/off.")
         .addClass ("material-icons")
         .addClass (browser .isLive () ? "selected" : "")
         .css ("transform", "scale(1.3)")
         .text ("play_arrow")
         .on ("click", () =>
         {
            if (browser .isLive ())
               browser .endUpdate ();
            else
               browser .beginUpdate ();
         })
         .appendTo (toolbar);

      browser .getLive () .addFieldCallback ("playground", () =>
      {
         playButton
            .removeClass ("selected")
            .addClass (browser .isLive () ? "selected" : "");
      });

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      $("<button></button>")
         .attr ("title", "View all objects in scene.")
         .addClass ("material-symbols-outlined")
         .text ("center_focus_strong")
         .on ("click", () =>
         {
            browser .viewAll ();
         })
         .appendTo (toolbar);

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      this .fullSizeButton = $("<button></button>")
         .attr ("title", "View browser in full size.")
         .addClass ("material-symbols-outlined")
         .text ("fullscreen")
         .on ("click", () =>
         {
            this .setFullSize (!this .localStorage .fullSize);
         })
         .appendTo (toolbar);

      this .setFullSize (this .localStorage .fullSize);

      // Right side

      const right = $("<div></div>")
         .css ("float", "right")
         .appendTo (toolbar);

      $("<button></button>")
         .attr ("title", "Convert to X3D XML Encoding.")
         .addClass (["language", "XML"])
         .addClass (browser .currentScene .encoding === "XML" ? "selected" : "")
         .text ("XML")
         .on ("click", () =>
         {
            model .setValue (browser .currentScene .toXMLString ());
            this .updateLanguage ("XML");
         })
         .appendTo (right);

      $("<span></span>") .addClass ("dot") .appendTo (right);

      $("<button></button>")
         .attr ("title", "Convert to X3D VRML Encoding.")
         .addClass (["language", "VRML"])
         .addClass (browser .currentScene .encoding === "VRML" ? "selected" : "")
         .text ("VRML")
         .on ("click", () =>
         {
            model .setValue (browser .currentScene .toVRMLString ());
            this .updateLanguage ("VRML");
         })
         .appendTo (right);

      $("<span></span>") .addClass ("dot") .appendTo (right);

      $("<button></button>")
         .attr ("title", "Convert to X3D JSON Encoding.")
         .addClass (["language", "JSON"])
         .addClass (browser .currentScene .encoding === "JSON" ? "selected" : "")
         .text ("JSON")
         .on ("click", () =>
         {
            model .setValue (browser .currentScene .toJSONString ());
            this .updateLanguage ("JSON");
         })
         .appendTo (right);
   }

   updateLanguage (encoding)
   {
      $(".language") .removeClass ("selected");
      $(`.language.${encoding}`) .addClass ("selected");

      monaco .editor .setModelLanguage (this .model, encoding .toLowerCase ());
   }

   setFullSize (fullSize)
   {
      this .localStorage .fullSize = fullSize;

      this .fullSizeButton
         .removeClass ("selected")
         .addClass (fullSize ? "selected" : "");

      if (fullSize)
      {
         this .viewState = this .editor .saveViewState ();

         this .editor .setModel (null);

         $(".playground x3d-canvas") .css ("height", "100%");
         $(".playground .console") .hide ();
         $(".playground .viewer-column2") .hide ();
      }
      else
      {
         $(".playground x3d-canvas") .css ("height", "");
         $(".playground .console") .show ();
         $(".playground .viewer-column2") .show ();

         this .editor .setModel (this .model);
         this .editor .restoreViewState (this .viewState);
      }
   }

   pixelated = false;

   updateUserMenu ()
   {
      const
         browser = this .browser,
         canvas  = this .canvas;

      return {
         "content-scale": {
            name: "Content Scale",
            items: {
               radio1: {
                  name: "0.1",
                  type: "radio",
                  radio: "content-scale",
                  selected: browser .getBrowserOption ("ContentScale") === 0.1,
                  value: "0.1",
                  events: {
                     click () { canvas .attr ("contentScale", "0.1"); },
                  },
               },
               radio2: {
                  name: "1",
                  type: "radio",
                  radio: "content-scale",
                  selected: browser .getBrowserOption ("ContentScale") === 1,
                  value: "1",
                  events: {
                     click () { canvas .attr ("contentScale", "1"); },
                  },
               },
               radio3: {
                  name: "2",
                  type: "radio",
                  radio: "content-scale",
                  selected: browser .getBrowserOption ("ContentScale") === 2,
                  value: "2",
                  events: {
                     click () { canvas .attr ("contentScale", "2"); },
                  },
               },
               radio4: {
                  name: "Auto",
                  type: "radio",
                  radio: "content-scale",
                  selected: browser .getBrowserOption ("ContentScale") === -1,
                  value: "auto",
                  events: {
                     click () { canvas .attr ("contentScale", "auto"); },
                  },
               },
               "separator0": "--------",
               "antialiased": {
                  name: "Antialiased",
                  type: "checkbox",
                  selected: browser .getBrowserOption ("Antialiased"),
                  events: {
                     click ()
                     {
                        canvas .attr ("antialiased", String (!browser .getBrowserOption ("Antialiased")));
                     },
                  },
               },
               "pixelated": {
                  name: "Pixelated",
                  type: "checkbox",
                  selected: this .pixelated,
                  events: {
                     click: () =>
                     {
                        this .pixelated = !this .pixelated;

                        canvas .css ("image-rendering", this .pixelated ? "pixelated" : "unset");
                     },
                  },
               },
            },
         },
         "oit": {
            name: "Order Independent Transparency",
            type: "checkbox",
            selected: browser .getBrowserOption ("OrderIndependentTransparency"),
            events: {
               click ()
               {
                  canvas .attr ("orderIndependentTransparency", String (!browser .getBrowserOption ("OrderIndependentTransparency")));
               },
            },
         },
         "log": {
            name: "Logarithmic Depth Buffer",
            type: "checkbox",
            selected: browser .getBrowserOption ("LogarithmicDepthBuffer"),
            events: {
               click ()
               {
                  canvas .attr ("logarithmicDepthBuffer", String (!browser .getBrowserOption ("LogarithmicDepthBuffer")));
               },
            },
         },
      };
   }

   redirectConsoleMessages ()
   {
      const output = (log, command) =>
      {
         return (... args) =>
         {
            log .apply (console, args);

            this .addConsoleMessage (command, args .map (String) .join (" "));
         };
      }

      for (const command of ["debug", "log", "info", "warn", "error"])
         console [command] = output (console [command], command);
   }

   CONSOLE_MAX = 1000;

   excludes = [
      /No suitable|of an UNKNOWN touch/,
   ];

   #messageTime = 0;

   addConsoleMessage (level, message)
   {
      if (this .excludes .some (exclude => exclude .test (message)))
         return;

      const
         console = $(".console"),
         text    = $("<p></p>") .addClass (level) .text (message);

      if (performance .now () - this .#messageTime > 1000)
         console .append ($("<p></p>") .addClass ("splitter"));

      this .#messageTime = performance .now ();

      console .children (`:not(:nth-last-child(-n+${this .CONSOLE_MAX}))`) .remove ();
      console .append (text);
      console .scrollTop (console .prop ("scrollHeight"));
   }

   addVRMLEncoding ()
   {
      const browser = this .browser;

      monaco .languages .setMonarchTokensProvider ("vrml",
      {
         defaultToken: "invalid",
         tokenPostfix: ".vrml",
         keywords: [
            "PROFILE", "COMPONENT", "UNIT", "META", "EXTERNPROTO", "PROTO", "IS", "DEF", "USE", "ROUTE", "TO", "IMPORT", "EXPORT", "AS", "DESCRIPTION",
         ],
         profiles: Array .from (browser .supportedProfiles, ({name}) => name),
         components: Array .from (browser .supportedComponents, ({name}) => name) .filter (name => !name .match (/^(WebXR|X_ITE)$/)),
         nodes: Array .from (browser .concreteNodes, ({typeName}) => typeName),
         accessTypes: [
            // X3D
            "initializeOnly", "inputOnly", "outputOnly", "inputOutput",
            // VRML
            "field", "eventIn", "eventOut", "exposedField",
         ],
         // fieldTypes: Array .from (browser .fieldTypes, ({typeName}) => typeName),
         fieldTypes: [
            "SFBool", "SFColor", "SFColorRGBA", "SFDouble", "SFFloat", "SFImage", "SFInt32", "SFMatrix3d", "SFMatrix3f", "SFMatrix4d", "SFMatrix4f", "SFNode", "SFRotation", "SFString", "SFTime", "SFVec2d", "SFVec2f", "SFVec3d", "SFVec3f", "SFVec4d", "SFVec4f", "MFBool", "MFColor", "MFColorRGBA", "MFDouble", "MFFloat", "MFImage", "MFInt32", "MFMatrix3d", "MFMatrix3f", "MFMatrix4d", "MFMatrix4f", "MFNode", "MFRotation", "MFString", "MFVec2d", "MFVec2f", "MFVec3d", "MFVec3f", "MFVec4d", "MFVec4f",
         ],
         id: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/,
         escapes: /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
         tokenizer: {
            root: [
               [/[,:.]/, "delimiter"],
               [/TRUE|FALSE|NULL/, "constant"],
               [/PROTO|EXTERNPROTO/, "regexp", "@typeName"],
               [/UNIT|DEF|USE|ROUTE|TO|EXPORT|IMPORT|AS/, "regexp", "@name"],
               [/@id(?=\s*\{)/, "type.identifier"], // type names
               [/@id/, {
                  cases: {
                     "@keywords": "regexp",
                     "@profiles": "keyword",
                     "@components": "keyword",
                     "@nodes": "type.identifier",
                     "@accessTypes": "regexp",
                     "@fieldTypes": "type.identifier",
                     "@default": "attribute.name", // field names
                  },
               }],
               [/#\/\*/, { token: "comment", bracket: "@open", next: "@blockComment" }],
               [/#.*/, "comment"],
               [/[{}\[\]]/, "@brackets"],
               [/[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/, "number.float"],
               [/0[xX][\da-fA-F]+/, "number.hex"],
               [/[+-]?\d+/, "number"],
               [/(")((?:ecmascript|javascript|vrmlscript):|data:(?:text|application)\/javascript,)/, [
                  "string.quote",
                  { token: "comment", bracket: "@open", next: "@stringEmbedded", nextEmbedded: "text/javascript" }
               ]],
               [/(")(data:x-shader\/(?:x-vertex|x-fragment),)/, [
                  "string.quote",
                  { token: "comment", bracket: "@open", next: "@stringEmbedded", nextEmbedded: "x-shader/x-vertex" }
               ]],
               [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
            ],
            typeName: [
               [/@id/, "type.identifier", "@pop"],
            ],
            name: [
               [/@id/, "constant", "@pop"],
            ],
            blockComment: [
               [/[^#\/*]+/, "comment"],
               [/\*\/#/, "comment", "@pop"],
               [/[#\/*]/, "comment"]
            ],
            stringEmbedded: [
               [/[^\\"]+/,  "string"],
               [/@escapes/, "string.escape"],
               [/\\./,      "string.escape.invalid"],
               [/(?<!\\)"/, { token: "string.quote", bracket: "@close", next: "@pop", nextEmbedded: "@pop" }]
            ],
            string: [
               [/[^\\"]+/,  "string"],
               [/@escapes/, "string.escape"],
               [/\\./,      "string.escape.invalid"],
               [/"/,        { token: "string.quote", bracket: "@close", next: "@pop" }]
            ],
         },
      });

      monaco .languages .register ({
         id: "vrml",
         extensions: [".x3dv"],
         aliases: ["VRML"],
         mimetypes: ["model/x3d+vrml"],
      });

      monaco .languages .setLanguageConfiguration ("vrml",
      {
         comments: {
            lineComment: "#",
            blockComment: ["#/*", "*/#"]
         },
         brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
         autoClosingPairs: [
         { open: "{", close: "}" },
         { open: "[", close: "]" },
         { open: "(", close: ")" },
         { open: "\"", close: "\"" },
         { open: "'", close: "'" },
         ],
      });
   }

   addGLSL ()
   {
      const conf = {
         comments: {
            lineComment: "//",
            blockComment: ["/*", "*/"]
         },
         brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"]
         ],
         autoClosingPairs: [
            { open: "[", close: "]" },
            { open: "{", close: "}" },
            { open: "(", close: ")" },
            { open: "'", close: "'", notIn: ["string", "comment"] },
            { open: '"', close: '"', notIn: ["string"] }
         ],
         surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: '"', close: '"' },
            { open: "'", close: "'" }
         ]
      };

      const keywords = [
         "break", "case", "const", "continue", "discard", "do", "else", "flat", "for", "highp", "if", "in", "inout", "invariant", "lowp", "mediump", "out", "precision", "return", "smooth", "struct", "switch", "uniform", "while",
      ];

      const types = [
         "bool", "bvec2", "bvec3", "bvec4", "float", "int", "ivec2", "ivec3", "ivec4", "mat2", "mat2x2", "mat2x3", "mat2x4", "mat3", "mat3x2", "mat3x3", "mat3x4", "mat4", "mat4x2", "mat4x3", "mat4x4", "sampler2D", "sampler3D", "samplerCube", "uint", "uvec2", "uvec3", "uvec4", "vec2", "vec3", "vec4", "void",
      ];

      const functions = [
         "abs", "acos", "acosh", "all", "any", "asin", "asinh", "atan", "atanh", "ceil", "clamp", "cos", "cosh", "cross ", "degrees", "determinant", "dFdx", "dFdy", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floatBitsToInt", "floatBitsToUint", "floor", "fract", "fwidth", "greaterThan", "greaterThanEqual", "intBitsToFloat", "inverse", "inversesqrt", "isinf", "isnan", "length", "lessThan ", "lessThanEqual", "log", "log2", "main", "matrixCompMult", "max", "min", "mix", "mod", "modf", "normalize", "not", "notEqual", "outerProduct", "packUnorm2x16", "pow", "radians", "reflect", "refract", "round", "roundEven", "sign", "sin", "sinh", "smoothstep", "sqrt", "step", "tan", "tanh", "texelFetch", "texelFetchOffset", "texture", "textureGrad", "textureGradOffset", "textureLod", "textureLodOffset", "textureProj", "textureProjGrad", "textureProjLod", "textureProjLodOffset", "textureSize", "transpose", "trunc", "uintBitsToFloat",
      ];

      const constants = [
         "false", "true",
      ];

      const builtins = [
         "gl_ClipDistance", "gl_CullDistance", "gl_FragCoord", "gl_FragDepth", "gl_FrontFacing", "gl_GlobalInvocationID", "gl_HelperInvocation", "gl_InstanceID", "gl_InvocationID", "gl_Layer", "gl_LocalInvocationID", "gl_LocalInvocationIndex", "gl_NumSamples", "gl_NumWorkGroups", "gl_PatchVerticesIn", "gl_PointCoord", "gl_PointSize", "gl_Position", "gl_PrimitiveID", "gl_PrimitiveIDIn", "gl_SampleID", "gl_SampleMask", "gl_SampleMaskIn", "gl_SamplePosition", "gl_TessCoord", "gl_TessLevelInner", "gl_TessLevelOuter", "gl_VertexID", "gl_ViewportIndex", "gl_WorkGroupID", "gl_WorkGroupSize",
      ];

      const language = {
         tokenPostfix: ".glsl",
         // Set defaultToken to invalid to see what you do not tokenize yet
         defaultToken: "invalid",
         keywords,
         types,
         functions,
         constants,
         builtins,
         operators: [
            "=",
            ">",
            "<",
            "!",
            "~",
            "?",
            ":",
            "==",
            "<=",
            ">=",
            "!=",
            "&&",
            "||",
            "++",
            "--",
            "+",
            "-",
            "*",
            "/",
            "&",
            "|",
            "^",
            "%",
            "<<",
            ">>",
            ">>>",
            "+=",
            "-=",
            "*=",
            "/=",
            "&=",
            "|=",
            "^=",
            "%=",
            "<<=",
            ">>=",
            ">>>="
         ],
         symbols: /[=><!~?:&|+\-*\/\^%]+/,
         escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
         integersuffix: /([uU](ll|LL|l|L)|(ll|LL|l|L)?[uU]?)/,
         floatsuffix: /[fFlL]?/,
         encoding: /u|u8|U|L/,

         tokenizer: {
            root: [
               // data:mime-type,
               [/data:x-shader\/x-(?:vertex|fragment),/, "string"],

               // x3d_SpecialVariable
               [/x3d_\w+/, "keyword"],

               // identifiers and keywords

               [/[a-zA-Z_]\w*/,
               {
                  cases: {
                     "@keywords": { token: "keyword.$0" },
                     "@types": { token: "type.identifier" },
                     "@functions": { token: "attribute.name" },
                     "@constants": { token: "constant" },
                     "@builtins": { token: "regexp" },
                     "@default": "identifier",
                  }
               }],

               // Version
               [/#version\s+\d+\s+es/, "keyword.directive"],

               // Preprocessor directive (#define)
               [/^\s*#\s*\w+/, "keyword.directive"],

               // whitespace
               { include: "@whitespace" },

               // delimiters and operators
               [/[{}()\[\]]/, "@brackets"],
               [/@symbols/,
               {
                  cases: {
                     "@operators": "operator",
                     "@default": "",
                  }
               }],

               // numbers
               [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, "number.float"],
               [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, "number.float"],
               [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, "number.hex"],
               [/0[0-7']*[0-7](@integersuffix)/, "number.octal"],
               [/0[bB][0-1']*[0-1](@integersuffix)/, "number.binary"],
               [/\d[\d']*\d(@integersuffix)/, "number"],
               [/\d(@integersuffix)/, "number"],

               // delimiter: after number because of .\d floats
               [/[;,.]/, "delimiter"],
            ],

            comment: [
               [/[^\/*]+/, "comment"],
               [/\/\*/, "comment", "@push"],
               ["\\*/", "comment", "@pop"],
               [/[\/*]/, "comment"],
            ],

            whitespace: [
               [/[ \t\r\n]+/, "white"],
               [/\/\*/, "comment", "@comment"],
               [/\/\/.*$/, "comment"],
            ]
         }
      };

      monaco .languages .register ({ id: "glsl", mimetypes: ["x-shader/x-vertex", "x-shader/x-fragment"] });
      monaco .languages .setMonarchTokensProvider ("glsl", language);
      monaco .languages .setLanguageConfiguration ("glsl", conf);
   }
}

Playground .run ();
