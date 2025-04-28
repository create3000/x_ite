#!/usr/bin/env node
"use strict";

const { sh, systemSync } = require ("shell-tools");
const fs = require ("fs");

const files = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenWoodLeatherSofa/glTF/SheenWoodLeatherSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF/SunglassesKhronos.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf",
];

const width    = 400;
const height   = 240;
const border   = 20;
const rotation = "0.509086470924499 -0.842639596032569 -0.175469303069548 0.42682311202636";

function main ()
{
   console .log ("Generating glTF teaser...");

   // .md

   const links = ["light", "dark"] .flatMap (theme => files .map ((file, i) => `[![Teaser${i + 1}](/assets/laboratory/gltf-sample-viewer/teaser/${theme}-image${i + 1}.avif)](/x_ite/laboratory/gltf-sample-viewer/?url=${file}){: .${theme} .img-link .w-25 }`)) .join ("");

   const md = sh (`cat docs/_posts/getting-started.md`)
      .replace (/><br><br>\[!\[Teaser1\].*?\n/, `><br><br>${links}\n`);

   fs .writeFileSync (`docs/_posts/getting-started.md`, md);

   // Images

   process .chdir (`docs/assets/laboratory/gltf-sample-viewer/teaser/`);

   const resize = `${width - border * 2}x${height - border * 2}`;
   const size   = `${width}x${height}`;

   // Light and Dark Images

   for (const [theme, x3d, magick] of [["light", "white", "rgb(239, 240, 239)"], ["dark", "black", "black"]])
   {
      for (const [i, file] of files .entries ())
      {
         systemSync (`npx --yes x3d-image -s 3200x1800 -c LINEAR -m KHR_PBR_NEUTRAL -e CANNON -b "${x3d}" -r "${rotation}" -a -i "${file}" -o image.png`);
         systemSync (`magick image.png -trim -resize ${resize} -size ${size} "xc:${magick}" +swap -gravity center -composite -quality 50 ${theme}-image${i + 1}.avif`);
      }
   }

   // Cleanup

   systemSync (`rm image.png`);
}

main ();
