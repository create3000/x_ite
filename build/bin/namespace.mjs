import madge  from "madge"
import repeat from "repeat-string"
import path   from "path"
import fs     from "fs"

// Dependencies

const
   graph = await madge ("./src/x_ite.js"),
   set   = new Set ()

for (const files of Object .values (graph .obj ()))
{
   for (const file of files)
   set .add (file)
}

const dependencies = [... set] .sort ()
   .filter (f => path .basename (f) .match (/^[^.]+\.js$/))
   .filter (f => ! f .match (/(Namespace|X3D|X3DCanvas)\.js$/))

// Imports

const m = new Map ()

function k (v)
{
   if (m .get (v) === undefined)
      m .set (v, 0);

   m .set (v, m .get (v) + 1)

   return v + m .get (v);
}

const $l1 = dependencies .map (f => f .replace (/.*\//, "")) .reduce ((p, c) => Math .max (p, c .length), 0)

const imports = dependencies .map (filename =>
{
   const
      m = filename .match (/([^\/]+)$/),
      v = m [1] .replace (/\.js$/, "");

   return `import ${k(v)} ${repeat (" ", $l1 - m [1] .length)} from "../${filename}";`
})
.join ("\n")

// Values

m .clear ()

const $l2 = dependencies .reduce ((p, c) => Math .max (p, c .length), 0)

const values = dependencies .map (filename =>
{
   const
      v = filename .replace (/\.js$/, ""),
      m = v .match (/([^\/]+)$/)

   return `["${v}",${repeat(" ", $l2 - v .length - 3)} ${k(m [1])}]`
})
.join (",\n   ")

// File

const text = `${imports}

const Namespace = new Map ([
   ${values},
]);

Namespace .set ("x_ite/X3D/Namespace", Namespace);

export default Namespace;
`

let file = fs .readFileSync ("./src/x_ite/Namespace.js") .toString ()

file = file .replace (/(\/\*.*?\*\/).*/sg, "$1\n\n\n" + text)

fs .writeFileSync ("./src/x_ite/Namespace.js", file)
