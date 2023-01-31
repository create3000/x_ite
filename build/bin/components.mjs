import fs            from "fs"
import path          from "path"
import child_process from "child_process"

const
   components = path .resolve ("./", "src/x_ite/Components"),
   nav        = path .resolve ("./", "docs/_data/nav"),
   tabs       = path .resolve ("./", "docs/_tabs");

function createIndex ()
{
   const filenames = child_process .execSync (`find ${components} -mindepth 2 -maxdepth 2 -type f`)
      .toString () .trim () .split (/\s+/) .sort ()

   const index = new Map ();

   for (const filename of filenames)
   {
      const m = filename .match (/([^\/]+)\/([^\/]+)\.js$/)

      if (m [1] === "Annotation")
         continue

      if (m [2] .match (/^X3D/))
         continue

      let nodes = index .get (m [1])

      if (!nodes)
         index .set (m [1], nodes = [ ])

      nodes .push (m [2])
   }

   return index
}

function updateNav ()
{
   for (const [component, nodes] of createIndex ())
   {
      let text = ""

      text += `- title: "${component}"\n`
      text += `  children:\n`

      for (const node of nodes .sort ())
      {
         const slug = `${component}/${node}` .toLowerCase () .replace (/_/g, "-")

         text += `    - title: "${node}"\n`
         text += `      url: /components/${slug}\n`
      }

      const yml = path .resolve (nav, `components-${component}.yml`)

      fs .writeFileSync (yml, text)
   }
}

function updateComponents ()
{
   let list = "\n\n"

   for (const [component, nodes] of createIndex ())
   {
      list += `## ${component}\n\n`

      for (const node of nodes .sort ())
      {
         const slug = `${component}/${node}` .toLowerCase () .replace (/_/g, "-")

         list += `- [${node}](${slug})\n`
      }

      list += `\n`
   }

   const md = path .resolve (tabs, `components.md`)

   let text = fs .readFileSync (md) .toString ()

   text = text .replace (/<!-- COMPONENTS BEGIN -->.*?<!-- COMPONENTS END -->/s, `<!-- COMPONENTS BEGIN -->${list}<!-- COMPONENTS END -->`)

   fs .writeFileSync (md, text)
}

async function addNodeStubs ()
{
   for (const [component, nodes] of createIndex ())
   {
      for (const node of nodes .sort ())
      {
         const module = await import (path .resolve (components, `${component}/${node}.js`))

         console .log (module)

         return
      }
   }
}

updateNav ()
updateComponents ()
addNodeStubs ()
