import { sh, systemSync } from "shell-tools";
import fs from "fs";

const files = sh (`find src/x_ite/Components -type f -mindepth 2`) .trim () .split ("\n");

for (const filename of files)
{
   if (filename .includes ("/X3D"))
      continue;

   if (filename .includes ("/X3DNode.js"))
      continue;

   let file = sh (`cat ${filename}`)

   // continue;
   console .log (filename)

   let s= file .match (/Object .defineProperties \((\w+), (X3DNode .getStaticProperties \(.*?\))\);/s)

   file = file .replace (/Object .defineProperties \((\w+), (X3DNode .getStaticProperties \(.*?\))\);\n+/s, ``)

   file = file .replace (/\{\s*fieldDefinitions:/s, `{\n   ... ${s [2]},\n   fieldDefinitions:`)

   // console .log (file)

   fs .writeFileSync (filename, file);
}
