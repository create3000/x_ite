---
title: Free Online X3D File Format Converter
date: 2023-02-21
categories: [Laboratory]
tags: [X3D, File, Format, Converter]
x_ite: true
---
<style>
#drop-zone {
  box-sizing: border-box;
  border: 8px dashed lightskyblue;
}

#drop-zone .center {
  padding: 3rem;
  text-align: center;
  font-size: 200%;
  font-weight: bold;
  margin: 0;
  background: aliceblue;
}

#convert-files,
#converting-files {
   display: none;
}

#drop-zone x3d-canvas,
#drop-zone input[type=file] {
  display: none;
}

#drop-zone a {
  border: none;
}

#drop-zone select {
  color: unset;
  position: relative;
  top: -6px;
}
</style>

<script defer src="https://create3000.github.io/media/laboratory/l-system/FileSaver.js-2.0.0/dist/FileSaver.min.js"></script>
<script defer>
$(() =>
{
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
      const input = $("<input></input>")
         .attr ("type", "file")
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
      "XML":  ["model/x3d+xml",  ".x3d",  "toXMLString"],
      "VRML": ["model/x3d+vrml", ".x3dv", "toVRMLString"],
      "JSON": ["model/x3d+json", ".x3dj", "toJSONString"],
   };

   async function convert (encoding, files)
   {
      const [mimeType, extension, toString] = formats [encoding];

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

            Browser .currentScene .setMetaData ("converter", `${Browser .name} V${Browser .version}, ${Browser .providerURL}`);
            Browser .currentScene .setMetaData ("converted", new Date () .toUTCString ());

            link (mimeType, file .name .replace (/\.[^.]+$/, "") + extension, Browser .currentScene [toString] ());
         }
         catch (error)
         {
            console .error (error);
         }
      }

      $("#converting-files") .hide ();
      $("#open-files") .show ();
   }

   function link (mimeType, name, x3dSyntax)
   {
      const a = $("<a></a>")
         .text (name)
         .attr ("href", "#")
         .on ("click", download .bind (null, mimeType, name, x3dSyntax));

      $("<li></li>") .append (a) .appendTo ($("#download-links"));
   }

   function download (mimeType, name, x3dSyntax)
   {
      const blob = new Blob ([x3dSyntax], { type: `${mimeType};charset=utf-8` });

      saveAs (blob, name);

      return false;
   }
});
</script>

## Upload and Convert

Convert **X3D, VRML, glTF (GLB), OBJ, STL, PLY,** and **SVG** to an X3D format of your choice.

<div id="drop-zone">
   <p id="open-files" class="center">
      <a href="#">Choose a file</a> or drag it here.
      <input type="file" />
   </p>
   <p id="convert-files" class="center">
      <a href="#">Convert file to ...</a>
      <select>
         <option value="XML" selected>X3D XML Encoding</option>
         <option value="VRML">X3D VRML Encoding</option>
         <option value="JSON">X3D JSON Encoding</option>
      </select>
   </p>
   <p id="converting-files" class="center">
      Converting files ...
   </p>
</div>

### Converted Files

Your converted files will appear here.

<ul id="download-links"></ul>

## Command Line Tool

If you are looking for a command line tool to convert files, have a look at [x3d-tidy](https://www.npmjs.com/package/x3d-tidy){:target="_blank"}. It is a [Node](https://nodejs.org/) program and it can be run via `npx x3d-tidy`.
