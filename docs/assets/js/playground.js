const box = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 4.0//EN" "http://www.web3d.org/specifications/x3d-4.0.dtd">
<X3D profile='Full' version='4.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-4.0.xsd'>
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

require .config ({ paths: { "vs": "https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs" }});
require (["vs/editor/editor.main"], async () =>
{
   const darkMode = (window .matchMedia ?.("(prefers-color-scheme: dark)") .matches || $("html") .attr ("data-mode") === "dark") && ($("html") .attr ("data-mode") !== "light");

   addVRMLEncoding (monaco);

   const editor = monaco .editor .create (document .getElementById ("editor"),
   {
      language: "xml",
      theme: darkMode ? "vs-dark" : "vs-light",
      contextmenu: true,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: "on",
      wrappingIndent: "indent",
      minimap: { enabled: false },
   });

   const url = new URL (document .location .href) .searchParams .get ("url");

   if (url)
   {
      const Browser = X3D .getBrowser ();

      Browser .endUpdate ();

      Browser .baseURL = url;

      await Browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

      const encoding = { XML: "XML", JSON: "JSON", VRML: "VRML" } [Browser .currentScene .encoding] ?? "XML";

      monaco .editor .setModelLanguage (editor .getModel (), encoding .toLowerCase ());

      editor .setValue (Browser .currentScene [`to${encoding}String`] ());

      Browser .beginUpdate ();
   }

   let timeoutId;

   editor .getModel () .onDidChangeContent (() =>
   {
      clearTimeout (timeoutId);

      timeoutId = setTimeout (() => applyChanges (monaco, editor), 1000);
   });

   if (!url)
      editor .setValue (box);

   updateToolbar ($(".playground .toolbar"), $("x3d-canvas"), monaco, editor);
});

async function applyChanges (monaco, editor)
{
   const
      Browser         = X3D .getBrowser (),
      activeViewpoint = Browser .getActiveViewpoint (),
      text            = editor .getValue (),
      url             = encodeURI (`data:,${text}`);

   if (activeViewpoint)
   {
      var
         positionOffset    = activeViewpoint ._positionOffset    .copy (),
         orientationOffset = activeViewpoint ._orientationOffset .copy ();
   }

   await Browser .loadURL (new X3D .MFString (url)) .catch (Function .prototype);

   if (activeViewpoint && Browser .getActiveViewpoint ())
   {
      Browser .getActiveViewpoint () ._positionOffset    = positionOffset;
      Browser .getActiveViewpoint () ._orientationOffset = orientationOffset;
   }

   monaco .editor .setModelLanguage (editor .getModel (), Browser .currentScene .encoding .toLowerCase ());
}

let shading = "PHONG";

function updateToolbar (toolbar, canvas, monaco, editor)
{
   const browser = canvas .prop ("browser");

   toolbar .empty ();

   const play = $("<span></span>")
      .attr ("title", "Toggle browser update on/off.")
      .addClass (["fa-solid", "fa-play"])
      .addClass (browser .isLive () ? "selected" : "")
      .on ("click", () =>
      {
         if (browser .isLive ())
            browser .endUpdate ();
         else
            browser .beginUpdate ();

         play .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .attr ("title", "View all objects in scene.")
      .addClass (["fa-solid", "fa-arrows-to-eye"])
      .on ("click", () =>
      {
         browser .viewAll ();
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("separator") .appendTo (toolbar);

   const antialiased = $("<span></span>")
      .text ("antialiased")
      .attr ("title", "Toggle antialiasing on/off.")
      .addClass ("selected")
      .on ("click", () =>
      {
         const value = !browser .getBrowserOption ("Antialiased");

         canvas .attr ("antialiased", value);

         antialiased .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const contentScale = $("<span></span>")
      .text ("contentScale 1.0")
      .attr ("index", 1)
      .attr ("title", "Toggle contentScale between 0.1, 1.0, 2.0, auto.")
      .on ("click", () =>
      {
         const
            index = (parseInt (contentScale .attr ("index")) + 1) % 4,
            value = [0.1, 1, 2, "auto"][index];

         canvas .attr ("contentScale", value);

         contentScale
            .attr ("index", index)
            .text ("contentScale " + (value === "auto" ? "auto" : value .toFixed (1)))
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   const pixelated = $("<span></span>")
      .text ("pixelated")
      .attr ("title", "Set CSS property image-rendering to pixelated.")
      .on ("click", () =>
      {
         canvas .css ("image-rendering", pixelated .hasClass ("selected") ? "unset" : "pixelated");

         pixelated .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("separator") .appendTo (toolbar);

   const oit = $("<span></span>")
      .text ("oit")
      .attr ("title", "Toggle order independent transparency on/off.")
      .on ("click", () =>
      {
         const value = !browser .getBrowserOption ("OrderIndependentTransparency");

         canvas .attr ("orderIndependentTransparency", value);

         oit .toggleClass ("selected");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("separator") .appendTo (toolbar);

   $("<span></span>")
      .text ("point")
      .attr ("title", "Set shading to POINT.")
      .on ("click", () =>
      {
         browser .setBrowserOption ("Shading", shading = "POINT");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .text ("wireframe")
      .attr ("title", "Set shading to WIREFRAME.")
      .on ("click", () =>
      {
         browser .setBrowserOption ("Shading", shading = "WIREFRAME");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .text ("flat")
      .attr ("title", "Set shading to FLAT.")
      .on ("click", () =>
      {
         browser .setBrowserOption ("Shading", shading = "FLAT");
      })
      .appendTo (toolbar);

   $("<span></span>") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .text ("phong")
      .attr ("title", "Set shading to PHONG.")
      .on ("click", () =>
      {
         browser .setBrowserOption ("Shading", shading = "PHONG");
      })
      .appendTo (toolbar);

   browser .setBrowserOption ("Shading", shading);

   // Right side

   $("<span></span>")
      .text ("JSON")
      .css ("float", "right")
      .attr ("title", "Convert to X3D JSON Encoding.")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toJSONString ());
         monaco .editor .setModelLanguage (editor .getModel (), "json");
      })
      .appendTo (toolbar);

   $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .text ("VRML")
      .css ("float", "right")
      .attr ("title", "Convert to X3D VRML Encoding.")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toVRMLString ());
         monaco .editor .setModelLanguage (editor .getModel (), "vrml");
      })
      .appendTo (toolbar);

   $("<span></span>") .css ("float", "right") .addClass ("dot") .appendTo (toolbar);

   $("<span></span>")
      .text ("XML")
      .css ("float", "right")
      .attr ("title", "Convert to X3D XML Encoding.")
      .on ("click", () =>
      {
         editor .setValue (browser .currentScene .toXMLString ());
         monaco .editor .setModelLanguage (editor .getModel (), "xml");
      })
      .appendTo (toolbar);
}

function addVRMLEncoding (monaco)
{
   monaco .languages .setMonarchTokensProvider ("vrml",
   {
      keywords: [
         "PROFILE", "COMPONENT", "UNIT", "META", "DEF", "USE", "EXTERNPROTO", "PROTO", "IS", "ROUTE", "TO", "IMPORT", "EXPORT", "AS"
      ],
      accessTypes: [
         "initializeOnly", "inputOnly", "outputOnly", "inputOutput",
      ],
      fieldTypes: [
         "SFBool", "SFColor", "SFColorRGBA", "SFDouble", "SFFloat", "SFImage", "SFInt32", "SFMatrix3d", "SFMatrix3f", "SFMatrix4d", "SFMatrix4f", "SFNode", "SFRotation", "SFString", "SFTime", "SFVec2d", "SFVec2f", "SFVec3d", "SFVec3f", "SFVec4d", "SFVec4f", "MFBool", "MFColor", "MFColorRGBA", "MFDouble", "MFFloat", "MFImage", "MFInt32", "MFMatrix3d", "MFMatrix3f", "MFMatrix4d", "MFMatrix4f", "MFNode", "MFRotation", "MFString", "MFVec2d", "MFVec2f", "MFVec3d", "MFVec3f", "MFVec4d", "MFVec4f",
      ],
      brackets: [
         { open: "{", close: "}", token: "delimiter.curly" },
         { open: "[", close: "]", token: "delimiter.bracket" },
      ],
      escapes: /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      tokenizer: {
         root: [
            [/[,:.]/, "delimiter"],
            [/TRUE|FALSE/, "constant"],
            [/[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/, {
               cases: {
                  "@keywords": "keyword",
                  "@accessTypes": "keyword",
                  "@fieldTypes": "keyword",
                  "@default": "type.identifier",
               },
            }],
            [/#.*/, "comment"],
            [/[{}\[\]]/, "@brackets"],
            [/[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/, "number.float"],
            [/0[xX][\da-fA-F]+/, "number.hex"],
            [/[+-]?\d+/, "number"],
            [/"/, "string.quote",  "@string" ],
         ],
         string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, "string.quote", "@pop"],
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
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "\"", close: "\"" },
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
