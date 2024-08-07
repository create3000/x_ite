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

   let m = file .match (/(\s*\{\s*typeName:.*?\}\);)/s)

   if (!m)
   {
      console .log ("no:", filename)
      continue
   }

   // continue;
   console .log (filename)

   let n = m [1] .match (/typeName:\s*\{\s*value:\s*"(.*?)"/s)
   let c = m [1] .match (/name:\s*"(.*?)",\s*level:\s*(\d+)/s)
   let f = m [1] .match (/containerField:\s*\{\s*value:\s*"(.*?)"/s)
   let s = m [1] .match (/from:\s*"(.*?)",\s*to:\s*"(.*?)"/s)
   let d = m [1] .match (/(fieldDefinitions:.*?\},)/s)

   file = file .replace (/\s*\{\s*typeName:.*?\}\);/s, ` X3DNode .staticProperties ("${n [1]}", "${c [1]}", ${c [2]}, "${f [1]}", "${s [1]}", "${s [2]}"));

Object .defineProperties (${n [1]},
{
   ${d [1]}
});`)

   // console .log (file)

   fs .writeFileSync (filename, file);
}
