const box = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 4.0//EN" "http://www.web3d.org/specifications/x3d-4.0.dtd">
<X3D profile='Interchange' version='4.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-4.0.xsd'>
  <head>
    <component name='ParticleSystems' level='3'/>
  </head>
  <Scene>
    <Viewpoint
        description='Initial View'
        position='4.737889 4.718629 7.435519'
        orientation='-0.640652763184828 0.744770464531058 0.186764536745701 0.746185800293648'/>
    <ParticleSystem
        geometryType='GEOMETRY'
        maxParticles='10'
        bboxSize='10 10 10'>
      <PointEmitter
          direction='0 0 0'
          speed='1'/>
      <Appearance>
        <Material
            diffuseColor='0 0.5 1'/>
      </Appearance>
      <Box/>
    </ParticleSystem>
  </Scene>
</X3D>
`;

let
   autoUpdate = true,
   changed    = false;

// Also change version in playground.html!
require .config ({ paths: { "vs": "https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs" }});
require (["vs/editor/editor.main"], async () =>
{
   const browser = X3D .getBrowser ();

   browser .getContextMenu () .setUserMenu (updateUserMenu .bind (null, $("x3d-canvas")));

   await browser .loadComponents (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));

   addVRMLEncoding (monaco, browser);

   const editor = monaco .editor .create (document .getElementById ("editor"),
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

   // Handle color scheme changes.

   const colorScheme = window .matchMedia ("(prefers-color-scheme: dark)")

   colorScheme .addEventListener ("change", event => changeColorScheme (event));

   changeColorScheme ()

   function changeColorScheme ()
   {
      const darkMode = (window .matchMedia ?.("(prefers-color-scheme: dark)") .matches || $("html") .attr ("data-mode") === "dark") && ($("html") .attr ("data-mode") !== "light");

      monaco .editor .setTheme (darkMode ? "vs-dark" : "vs-light");
   }

   // Handle url parameter.

   const url = new URL (document .location .href) .searchParams .get ("url");

   if (url)
   {
      browser .endUpdate ();

      browser .baseURL = url;

      await browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      const encoding = { XML: "XML", JSON: "JSON", VRML: "VRML" } [browser .currentScene .encoding] ?? "XML";

      monaco .editor .setModelLanguage (editor .getModel (), encoding .toLowerCase ());

      editor .setValue (browser .currentScene [`to${encoding}String`] ());

      $(() => updateLanguage (encoding));

      browser .beginUpdate ();
   }

   let timeoutId;

   editor .getModel () .onDidChangeContent (() =>
   {
      changed = true;

      $("#refresh-button") .addClass ("selected");

      if (!autoUpdate)
         return;

      clearTimeout (timeoutId);

      timeoutId = setTimeout (() => applyChanges (monaco, editor), 1000);
   });

   if (!url)
      editor .setValue (box);

   updateToolbar ($(".playground .toolbar"), $("x3d-canvas"), monaco, editor);

   // Keyboard shortcuts.

   $("#editor") .on ("keydown", event =>
   {
      // Apply changes when CommandOrCtrl-s is pressed.

      if (!(event .key === "s" && (event .ctrlKey || event .metaKey)))
         return;

      event .preventDefault ();
      applyChanges (monaco, editor);
   });
});

async function applyChanges (monaco, editor)
{
   const
      browser         = X3D .getBrowser (),
      activeViewpoint = browser .getActiveViewpoint (),
      text            = editor .getValue (),
      url             = encodeURI (`data:,${text}`);

   $("#refresh-button") .addClass ("selected");

   if (activeViewpoint)
   {
      var
         positionOffset    = activeViewpoint ._positionOffset    .copy (),
         orientationOffset = activeViewpoint ._orientationOffset .copy ();
   }

   await browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

   if (activeViewpoint && browser .getActiveViewpoint ())
   {
      browser .getActiveViewpoint () ._positionOffset    = positionOffset;
      browser .getActiveViewpoint () ._orientationOffset = orientationOffset;
   }

   monaco .editor .setModelLanguage (editor .getModel (), browser .currentScene .encoding .toLowerCase ());

   changed = false;

   $("#refresh-button") .removeClass ("selected");
   updateLanguage (browser .currentScene .encoding);
}

function updateUserMenu (canvas)
{
   const browser = canvas .prop ("browser");

   return {
      "antialiased": {
         name: "Antialiased",
         type: "checkbox",
         selected: browser .getBrowserOption ("Antialiased"),
         events: {
            click () { canvas .attr ("antialiased", !browser .getBrowserOption ("Antialiased")); },
         },
      },
      "pixelated": {
         name: "Pixelated",
         type: "checkbox",
         selected: updateUserMenu .pixelated,
         events: {
            click ()
            {
               updateUserMenu .pixelated = !updateUserMenu .pixelated;

               canvas .css ("image-rendering", updateUserMenu .pixelated ? "pixelated" : "unset");
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
         },
      },
      "separator0": "--------",
      "oit": {
         name: "Order Independent Transparency",
         type: "checkbox",
         selected: browser .getBrowserOption ("OrderIndependentTransparency"),
         events: {
            click () { canvas .attr ("orderIndependentTransparency", !browser .getBrowserOption ("OrderIndependentTransparency")); },
         },
      },
      "log": {
         name: "Logarithmic Depth Buffer",
         type: "checkbox",
         selected: browser .getBrowserOption ("LogarithmicDepthBuffer"),
         events: {
            click () { canvas .attr ("logarithmicDepthBuffer", !browser .getBrowserOption ("LogarithmicDepthBuffer")); },
         },
      },
   };
}

function updateToolbar (toolbar, canvas, monaco, editor)
{
   const browser = canvas .prop ("browser");

   toolbar .empty ();

   const autoUpdateButton = $("<span></span>")
      .addClass (autoUpdate ? "selected" : "")
      .append ($("<span></span>")
         .addClass (["icon", "fa-solid"])
         .addClass (autoUpdate ? "fa-check" : "fa-xmark"))
      .append ($("<span></span>")
         .addClass ("label")
         .text ("Auto Update"))
      .on ("click", () =>
      {
         autoUpdate = !autoUpdate;

         if (autoUpdate && changed)
            applyChanges (monaco, editor);

         autoUpdateButton
            .removeClass ("selected")
            .addClass (autoUpdate ? "selected" : "");

         autoUpdateButton .find (".icon")
            .removeClass (["fa-check", "fa-xmark"])
            .addClass (autoUpdate ? "fa-check" : "fa-xmark");
      })
      .appendTo (toolbar);

   $("<span></span>")
      .attr ("title", "Apply changes.")
      .attr ("id", "refresh-button")
      .addClass (["fa-solid", "fa-arrows-rotate"])
      .on ("click", () =>
      {
         applyChanges (monaco, editor);
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const playButton = $("<span></span>")
      .attr ("title", "Toggle browser update on/off.")
      .addClass (["fa-solid", "fa-play"])
      .addClass (browser .isLive () ? "selected" : "")
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

   $("<span></span>")
      .attr ("title", "View all objects in scene.")
      .addClass (["fa-solid", "fa-arrows-to-dot"])
      .on ("click", () =>
      {
         browser .viewAll ();
      })
      .appendTo (toolbar);

   // Right side

   $("<span></span>")
      .addClass (["language", "JSON"])
      .addClass (browser .currentScene .encoding === "JSON" ? "selected" : "")
      .css ("float", "right")
      .attr ("title", "Convert to X3D JSON Encoding.")
      .text ("JSON")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toJSONString ());
         monaco .editor .setModelLanguage (editor .getModel (), "json");
         updateLanguage ("JSON");
      })
      .appendTo (toolbar);

   $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .addClass (["language", "VRML"])
      .addClass (browser .currentScene .encoding === "VRML" ? "selected" : "")
      .css ("float", "right")
      .attr ("title", "Convert to X3D VRML Encoding.")
      .text ("VRML")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toVRMLString ());
         monaco .editor .setModelLanguage (editor .getModel (), "vrml");
         updateLanguage ("VRML");
      })
      .appendTo (toolbar);

   $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .addClass (["language", "XML"])
      .addClass (browser .currentScene .encoding === "XML" ? "selected" : "")
      .css ("float", "right")
      .attr ("title", "Convert to X3D XML Encoding.")
      .text ("XML")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toXMLString ());
         monaco .editor .setModelLanguage (editor .getModel (), "xml");
         updateLanguage ("XML");
      })
      .appendTo (toolbar);
}

function updateLanguage (encoding)
{
   $(".language") .removeClass ("selected");
   $(`.language.${encoding}`) .addClass ("selected");
}

function addVRMLEncoding (monaco, browser)
{
   monaco .languages .setMonarchTokensProvider ("vrml",
   {
      defaultToken: "invalid",
      tokenPostfix: ".vrml",
      keywords: [
         "PROFILE", "COMPONENT", "UNIT", "META", "DEF", "USE", "EXTERNPROTO", "PROTO", "IS", "ROUTE", "TO", "IMPORT", "EXPORT", "AS",
      ],
      profiles: Array .from (browser .supportedProfiles, ({name}) => name),
      components: Array .from (browser .supportedComponents, ({name}) => name),
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
