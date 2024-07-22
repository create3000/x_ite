$("#drop-zone") .on ("dragover", event =>
{
   event .stopPropagation ();
   event .preventDefault ();

   event .originalEvent .dataTransfer .dropEffect = "copy";
});

$("#drop-zone") .on ("drop", event =>
{
   event .stopPropagation ();
   event .preventDefault ();

   read (event .originalEvent .dataTransfer .files);
});

$("#open-files a") .on ("click", event =>
{
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
      ".obj",
      ".stl",
      ".ply",
      ".svg",
      ".svgz",
   ];

   const input = $("<input></input>")
      .attr ("type", "file")
      .attr ("accept", suffixes .join (","))
      .appendTo ($("#open-files"));

   input .on ("change", event =>
   {
      read (event .target .files);
      input .remove ();
   });

   input .trigger ("click");
   return false;
});

function read (files)
{
   read .files = [... files];

   $("#open-files") .hide ();
   $("#convert-files") .show ();
}

$("#convert-files a") .on ("click", event =>
{
   $("#convert-files") .hide ();
   $("#converting-files") .show ();

   convert ($("#drop-zone select") .val (), read .files);

   return false;
});

const formats = {
   "XML":  ["model/x3d+xml",  ".x3d"],
   "VRML": ["model/x3d+vrml", ".x3dv"],
   "JSON": ["model/x3d+json", ".x3dj"],
   "HTML": ["text/html",      ".html"],
};

async function convert (encoding, files)
{
   const [mimeType, extension] = formats [encoding];

   for (const file of files)
   {
      try
      {
         const
            Browser = X3D .createBrowser () .browser,
            url     = URL .createObjectURL (file);

         Browser .endUpdate ();
         Browser .setBrowserOption ("LoadUrlObjects",   false);
         Browser .setBrowserOption ("PrimitiveQuality", "HIGH");
         Browser .setBrowserOption ("TextureQuality",   "HIGH");

         await Browser .loadURL (new X3D .MFString (url));

         const
            scene     = Browser .currentScene,
            generator = scene .getMetaData ("generator") ?.filter (value => !value .startsWith (Browser .name)) ?? [ ];

         generator .push (`${Browser .name} V${Browser .version}, ${Browser .providerURL}`);

         scene .setMetaData ("generator", generator);
         scene .setMetaData ("modified", new Date () .toUTCString ());

         link (mimeType, file .name .replace (/\.[^.]+$/, "") + extension, output (scene, encoding, file .name));
      }
      catch (error)
      {
         console .error (error);
      }
   }

   $("#converting-files") .hide ();
   $("#open-files") .show ();
}

function output (scene, encoding, filename)
{
   switch (encoding)
   {
      case "XML":
         return scene .toXMLString ();
      case "VRML":
         return scene .toVRMLString ();
      case "JSON":
         return scene .toJSONString ();
      case "HTML":
         return getHTML (scene, filename);
   }
}

function getHTML (scene, filename)
{
   return /* html */ `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdn.jsdelivr.net/npm/x_ite@latest/dist/x_ite.min.js"></script>
    <style>
body {
  background-color: rgb(21, 22, 24);
  color: rgb(108, 110, 113);
}

a {
  color: rgb(106, 140, 191);
}

x3d-canvas {
  width: 768px;
  height: 432px;
}
    </style>
  </head>
  <body>
    <h1>${filename}</h1>
    <x3d-canvas>
${scene .toXMLString ({ html: true, indent: " " .repeat (6) }) .trimEnd ()}
    </x3d-canvas>
    <p>Made with <a href="https://create3000.github.io/x_ite/laboratory/x3d-file-converter/" target="_blank">X_ITE Online File Format Converter.</a></p>
  </body>
</html>`
}

function link (mimeType, name, x3dSyntax)
{
   const a = $("<a></a>")
      .text (name)
      .attr ("href", "#")
      .on ("click", () => download (mimeType, name, x3dSyntax));

   $("<li></li>") .append (a) .appendTo ($("#download-links"));
}

function download (mimeType, name, x3dSyntax)
{
   const blob = new Blob ([x3dSyntax], { type: `${mimeType};charset=utf-8` });

   saveAs (blob, name);

   return false;
}
