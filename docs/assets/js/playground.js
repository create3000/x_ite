class Playground
{
   autoUpdate = true;
   changed    = false;

   constructor ()
   {
      // Also change version in playground.html!
      require .config ({ paths: { "vs": "https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs" }});
      require (["vs/editor/editor.main"], () => this .setup ());
   }

   async setup ()
   {
      this .browser = X3D .getBrowser ();
      this .canvas  = $(this .browser .element);

      this .browser .getContextMenu () .setUserMenu (() => this .updateUserMenu ());

      await this .browser .loadComponents (this .browser .getProfile ("Full"), this .browser .getComponent ("X_ITE"));

      this .addVRMLEncoding ();

      this .editor = monaco .editor .create (document .getElementById ("editor"),
      {
         language: "xml",
         contextmenu: true,
         automaticLayout: true,
         tabSize: 2,
         wordWrap: "on",
         wrappingIndent: "indent",
         minimap: { enabled: false },
         bracketPairColorization: { enabled: true },
      });

      this .updateToolbar ();

      // Handle color scheme changes.

      const colorScheme = window .matchMedia ("(prefers-color-scheme: dark)");

      colorScheme .addEventListener ("change", () => this .changeColorScheme ());

      this .changeColorScheme ();

      // Handle url parameter.

      const url = new URL (document .location .href) .searchParams .get ("url")
         ?? "/x_ite/assets/X3D/playground.x3d";

      this .browser .endUpdate ();

      this .browser .baseURL = url;

      await this .browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      const encoding = { XML: "XML", JSON: "JSON", VRML: "VRML" } [this .browser .currentScene .encoding] ?? "XML";

      monaco .editor .setModelLanguage (this .editor .getModel (), encoding .toLowerCase ());

      this .editor .setValue (this .browser .currentScene [`to${encoding}String`] ());

      this .updateLanguage (encoding);

      this .browser .beginUpdate ();

      this .editor .getModel () .onDidChangeContent (() => this .onDidChangeContent ());

      // Keyboard shortcuts.

      $("#editor") .on ("keydown", event => this .onKeyDown (event));
   }

   changeColorScheme ()
   {
      const darkMode = (window .matchMedia ?.("(prefers-color-scheme: dark)") .matches || $("html") .attr ("data-mode") === "dark") && ($("html") .attr ("data-mode") !== "light");

      monaco .editor .setTheme (darkMode ? "vs-dark" : "vs-light");
   }

   timeoutId;

   onDidChangeContent ()
   {
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

   async applyChanges ()
   {
      const
         activeViewpoint = this .browser .getActiveViewpoint (),
         text            = this .editor .getValue (),
         url             = encodeURI (`data:,${text}`);

      $("#refresh-button") .addClass ("selected");

      if (activeViewpoint)
      {
         var
            positionOffset    = activeViewpoint ._positionOffset    .copy (),
            orientationOffset = activeViewpoint ._orientationOffset .copy ();
      }

      await this .browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      if (activeViewpoint && this .browser .getActiveViewpoint ())
      {
         this .browser .getActiveViewpoint () ._positionOffset    = positionOffset;
         this .browser .getActiveViewpoint () ._orientationOffset = orientationOffset;
      }

      monaco .editor .setModelLanguage (this .editor .getModel (), this .browser .currentScene .encoding .toLowerCase ());

      this .changed = false;

      $("#refresh-button") .removeClass ("selected");
      this .updateLanguage (this .browser .currentScene .encoding);
   }

   updateToolbar ()
   {
      const toolbar = $(".playground .toolbar");

      toolbar .empty ();

      const autoUpdateButton = $("<span></span>")
         .addClass (this .autoUpdate ? "selected" : "")
         .append ($("<span></span>")
            .addClass (["icon", "fa-solid"])
            .addClass (this .autoUpdate ? "fa-check" : "fa-xmark"))
         .append ($("<span></span>")
            .addClass ("label")
            .text ("Auto Update"))
         .on ("click", () =>
         {
            this .autoUpdate = !this .autoUpdate;

            if (this .autoUpdate && this .changed)
               this .applyChanges (this .editor);

            autoUpdateButton
               .removeClass ("selected")
               .addClass (this .autoUpdate ? "selected" : "");

            autoUpdateButton .find (".icon")
               .removeClass (["fa-check", "fa-xmark"])
               .addClass (this .autoUpdate ? "fa-check" : "fa-xmark");
         })
         .appendTo (toolbar);

      $("<span></span>")
         .attr ("title", "Apply changes.")
         .attr ("id", "refresh-button")
         .addClass (["fa-solid", "fa-arrows-rotate"])
         .on ("click", () =>
         {
            this .applyChanges (this .editor);
         })
         .appendTo (toolbar);

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      const playButton = $("<span></span>")
         .attr ("title", "Toggle browser update on/off.")
         .addClass (["fa-solid", "fa-play"])
         .addClass (this .browser .isLive () ? "selected" : "")
         .on ("click", () =>
         {
            if (this .browser .isLive ())
               this .browser .endUpdate ();
            else
               this .browser .beginUpdate ();
         })
         .appendTo (toolbar);

      this .browser .getLive () .addFieldCallback ("playground", () =>
      {
         playButton
            .removeClass ("selected")
            .addClass (this .browser .isLive () ? "selected" : "");
      });

      $("<span></span>") .addClass ("dot") .appendTo (toolbar);

      $("<span></span>")
         .attr ("title", "View all objects in scene.")
         .addClass (["fa-solid", "fa-arrows-to-dot"])
         .on ("click", () =>
         {
            this .browser .viewAll ();
         })
         .appendTo (toolbar);

      // Right side

      $("<span></span>")
         .addClass (["language", "JSON"])
         .addClass (this .browser .currentScene .encoding === "JSON" ? "selected" : "")
         .css ("float", "right")
         .attr ("title", "Convert to X3D JSON Encoding.")
         .text ("JSON")
         .on ("click", () =>
         {
            this .editor .setValue (this .browser .currentScene .toJSONString ());
            monaco .editor .setModelLanguage (this .editor .getModel (), "json");
            this .updateLanguage ("JSON");
         })
         .appendTo (toolbar);

      $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

      $("<span></span>")
         .addClass (["language", "VRML"])
         .addClass (this .browser .currentScene .encoding === "VRML" ? "selected" : "")
         .css ("float", "right")
         .attr ("title", "Convert to X3D VRML Encoding.")
         .text ("VRML")
         .on ("click", () =>
         {
            this .editor .setValue (this .browser .currentScene .toVRMLString ());
            monaco .editor .setModelLanguage (this .editor .getModel (), "vrml");
            this .updateLanguage ("VRML");
         })
         .appendTo (toolbar);

      $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

      $("<span></span>")
         .addClass (["language", "XML"])
         .addClass (this .browser .currentScene .encoding === "XML" ? "selected" : "")
         .css ("float", "right")
         .attr ("title", "Convert to X3D XML Encoding.")
         .text ("XML")
         .on ("click", () =>
         {
            this .editor .setValue (this .browser .currentScene .toXMLString ());
            monaco .editor .setModelLanguage (this .editor .getModel (), "xml");
            this .updateLanguage ("XML");
         })
         .appendTo (toolbar);
   }

   updateLanguage (encoding)
   {
      $(".language") .removeClass ("selected");
      $(`.language.${encoding}`) .addClass ("selected");
   }

   pixelated = false;

   updateUserMenu ()
   {
      return {
         "antialiased": {
            name: "Antialiased",
            type: "checkbox",
            selected: this .browser .getBrowserOption ("Antialiased"),
            events: {
               click: () => { this .canvas .attr ("antialiased", !this .browser .getBrowserOption ("Antialiased")); },
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

                  this .canvas .css ("image-rendering", this .pixelated ? "pixelated" : "unset");
               },
            },
         },
         "content-scale": {
            name: "Content Scale",
            items: {
               radio1: {
                  name: "0.1",
                  type: "radio",
                  radio: "content-scale",
                  selected: this .browser .getBrowserOption ("ContentScale") === 0.1,
                  value: "0.1",
                  events: {
                     click: () => { this .canvas .attr ("contentScale", "0.1"); },
                  },
               },
               radio2: {
                  name: "1",
                  type: "radio",
                  radio: "content-scale",
                  selected: this .browser .getBrowserOption ("ContentScale") === 1,
                  value: "1",
                  events: {
                     click: () => { this .canvas .attr ("contentScale", "1"); },
                  },
               },
               radio3: {
                  name: "2",
                  type: "radio",
                  radio: "content-scale",
                  selected: this .browser .getBrowserOption ("ContentScale") === 2,
                  value: "2",
                  events: {
                     click: () => { this .canvas .attr ("contentScale", "2"); },
                  },
               },
               radio4: {
                  name: "Auto",
                  type: "radio",
                  radio: "content-scale",
                  selected: this .browser .getBrowserOption ("ContentScale") === -1,
                  value: "auto",
                  events: {
                     click: () => { this .canvas .attr ("contentScale", "auto"); },
                  },
               },
            },
         },
         "separator0": "--------",
         "oit": {
            name: "Order Independent Transparency",
            type: "checkbox",
            selected: this .browser .getBrowserOption ("OrderIndependentTransparency"),
            events: {
               click: () => { this .canvas .attr ("orderIndependentTransparency", !this .browser .getBrowserOption ("OrderIndependentTransparency")); },
            },
         },
         "log": {
            name: "Logarithmic Depth Buffer",
            type: "checkbox",
            selected: this .browser .getBrowserOption ("LogarithmicDepthBuffer"),
            events: {
               click: () => { this .canvas .attr ("logarithmicDepthBuffer", !this .browser .getBrowserOption ("LogarithmicDepthBuffer")); },
            },
         },
      };
   }

   addVRMLEncoding ()
   {
      monaco .languages .setMonarchTokensProvider ("vrml",
      {
         defaultToken: "invalid",
         tokenPostfix: ".vrml",
         keywords: [
            "PROFILE", "COMPONENT", "UNIT", "META", "DEF", "USE", "EXTERNPROTO", "PROTO", "IS", "ROUTE", "TO", "IMPORT", "EXPORT", "AS",
         ],
         profiles: Array .from (this .browser .supportedProfiles, ({name}) => name),
         components: Array .from (this .browser .supportedComponents, ({name}) => name),
         nodes: Array .from (this .browser .concreteNodes, ({typeName}) => typeName),
         accessTypes: [
            // X3D
            "initializeOnly", "inputOnly", "outputOnly", "inputOutput",
            // VRML
            "field", "eventIn", "eventOut", "exposedField",
         ],
         // fieldTypes: Array .from (this .browser .fieldTypes, ({typeName}) => typeName),
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
               [/DEF|USE|AS|ROUTE|TO|EXPORT/, "regexp", "@name"],
               [/(IMPORT)(\s+)(@id)(\s*)(\.)(\s*)(@id)/, ["regexp", "", "type.identifier", "", "delimiter", "", "type.identifier"]],
               [/@id(?=\s*\{)/, "keyword"], // type names
               [/@id/, {
                  cases: {
                     "@keywords": "regexp",
                     "@profiles": "keyword",
                     "@components": "keyword",
                     "@nodes": "keyword",
                     "@accessTypes": "regexp",
                     "@fieldTypes": "type.identifier",
                     "@default": "attribute.name", // field names
                  },
               }],
               [/#.*/, "comment"],
               [/[{}\[\]]/, "@brackets"],
               [/[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/, "number.float"],
               [/0[xX][\da-fA-F]+/, "number.hex"],
               [/[+-]?\d+/, "number"],
               [/"/,  { token: "string.quote", bracket: "@open", next: "@string" } ],
            ],
            typeName: [
               [/@id/, "keyword", "@pop"],
            ],
            name: [
               [/@id/, "type.identifier", "@pop"],
            ],
            string: [
               [/[^\\"]+/,  "string"],
               [/@escapes/, "string.escape"],
               [/\\./,      "string.escape.invalid"],
               [/"/,        { token: "string.quote", bracket: "@close", next: "@pop" } ]
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
}

const playground = new Playground ();

(() =>
{
   function output (log, classes)
   {
      let c;

      return function (... args)
      {
         const
            text     = args .join ("") + "\n",
            element  = $("<span></span>") .addClass (classes) .text (text),
            console  = c ??= $(".console"),
            children = console .children ();

         if (text .match (/No suitable|of an UNKNOWN touch/))
            return;

         log .apply (this, args);

         children .slice (0, Math .max (children .length - 200, 0)) .remove ();

         console .append (element);
         console .scrollTop (console .prop ("scrollHeight"));
      }
   }

   console .log   = output (console .log,   "log");
   console .info  = output (console .info,  ["info", "blue"]);
   console .warn  = output (console .warn,  ["warn", "yellow"]);
   console .error = output (console .error, ["error", "red"]);
   console .debug = output (console .debug, "debug");

   console .info (X3D .getBrowser () .getWelcomeMessage ());
})();
