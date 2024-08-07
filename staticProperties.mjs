import { sh, systemSync } from "shell-tools";
import fs from "fs";

const files = sh (`find src/x_ite/Components -type f -mindepth 2`) .trim () .split ("\n");

for (const filename of files)
{
   let file = sh (`cat ${filename}`)

   let m = file .match (/import (X3DConstants\s*)/)

   if (!m)
   {
      console .log ("no:", filename)
      continue
   }

   file = file .replace (/import X3DNode\s*/, `import X3DNode${" ".repeat(l - 7)}`)

   fs .writeFileSync (filename, file);
}
