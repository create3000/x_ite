---
title: Free Online X3D File Format Converter
date: 2023-02-21
categories: [Laboratory]
tags: [X3D, File, Format, Converter, Laboratory]
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

<script defer src="https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"></script>
<script type="module" src="/x_ite/assets/laboratory/x3d-file-converter/x3d-file-converter.mjs"></script>

## Upload and Convert

Convert **X3D, VRML (.wrl), glTF (GLB), OBJ, STL, PLY,** and **SVG** to an X3D format of your choice.

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
      <option value="HTML">HTML Document</option>
    </select>
  </p>
  <p id="converting-files" class="center">Converting files ...</p>
</div>

### Converted Files

Your converted files will appear here.

<ul id="download-links"></ul>

[<i class="fa-solid fa-heart"></i> Support us on Patreon](https://patreon.com/X_ITE){: .patreon }

## Command Line Tool

If you are looking for a command line tool to convert files, have a look at [x3d-tidy](https://www.npmjs.com/package/x3d-tidy). It is a [Node](https://nodejs.org/) program and it can be run via `npx x3d-tidy`.
