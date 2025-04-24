#!/usr/bin/env node
"use strict";

const
   fs                 = require ("fs"),
   path               = require ("path"),
   { sh, systemSync } = require ("shell-tools");

const
   components = path .resolve ("./", "src/x_ite/Components"),
   posts      = path .resolve ("./", "docs/_posts/"),
   prof       = path .resolve ("./", "docs/_posts/profiles"),
   comp       = path .resolve ("./", "docs/_posts/components"),
   nav        = path .resolve ("./", "docs/_data/nav");

function createIndex ()
{
   const filenames = sh (`find ${components} -mindepth 2 -maxdepth 2 -type f`)
      .trim () .split (/[\r\n]+/) .sort ();

   const index = new Map ();

   for (const filename of filenames)
   {
      const m = filename .match (/([^\/]+)\/([^\/]+)\.js$/);

      if (m [1] === "Annotation")
         continue;

      if (m [2] .match (/^X3D/))
         continue;

      let nodes = index .get (m [1]);

      if (!nodes)
         index .set (m [1], nodes = [ ]);

      nodes .push (m [2]);
   }

   return index;
}

function getSpecificationRange (component, node)
{
   const
      filename = `${components}/${component}/${node}.js`,
      file     = fs .readFileSync (filename) .toString (),
      match    = file .match (/getSpecificationRange.*?(\[.*?\])/s),
      range    = eval (match [1]);

   if (range [1] == Infinity)
      return range [0];

   return `${range [0]} - ${range [1]}`;
}

function updateNav ()
{
   for (const [component, nodes] of createIndex ())
   {
      let text = "";

      text += `- title: "${component}"\n`;
      text += `  children:\n`;

      for (const node of nodes .sort ())
      {
         const slug = `${component}/${node}` .toLowerCase () .replace (/_/g, "-");

         text += `    - title: "${node}"\n`;
         text += `      url: /components/${slug}/\n`;
      }

      const yml = path .resolve (nav, `components-${component}.yml`);

      fs .writeFileSync (yml, text);
   }
}

function updateComponents (supported)
{
   let
      list  = "\n\n",
      count = 0,
      all   = 0;

   const supportedComponents = sh (`cat`, `src/x_ite/Configuration/SupportedComponents.js`);

   for (const [component, nodes] of createIndex ())
   {
      list += `### ${component}\n\n`;

      const title = supportedComponents .match (new RegExp (`add\\s\\("${component}".*?title:\\s*"(.*?)"`, "s")) [1]
      const level = supportedComponents .match (new RegExp (`add\\s\\("${component}".*?level:\\s*(\\d)`, "s")) [1];

      list += `${title}<br>\n`;
      list += `Highest supported level: **${level}**\n`;
      list += `{: .small }\n\n`;

      for (const node of nodes .sort ())
      {
         const
            slug = `${component}/${node}` .toLowerCase () .replace (/_/g, "-"),
            file = sh (`cat`, `src/x_ite/Components/${component}/${node}.js`);

         if (!(file .includes ("NOT SUPPORTED") || file .includes ("EXPERIMENTAL")))
            ++ count;

         if (!file .includes ("EXPERIMENTAL"))
            ++ all;

         if (supported && file .includes ("NOT SUPPORTED"))
            continue;

         list += `- [${node}](/x_ite/components/${slug}/)`;

         if (fs .existsSync (`../media/docs/examples/${component}/${node}`))
            list += ` [<i class="fa-regular fa-image example-icon" title="Comes with example."></i>](/x_ite/components/${slug}/#example)`;

         if (file .includes ("NOT SUPPORTED"))
            list += ` <small class="red">not supported</small>`;

         else if (file .includes ("DEPRECIATED"))
            list += ` <small class="yellow">depreciated</small>`;

         else if (file .includes ("EXPERIMENTAL"))
            list += ` <small class="blue">experimental</small>`;

         list += `\n`;
      }

      list += `\n`;
   }

   const md = supported
      ? path .resolve (posts, `supported-nodes.md`)
      : path .resolve (comp, `overview.md`);

   let text = fs .readFileSync (md) .toString ();

   text = text .replace (/Currently \d+ out of \d+ nodes \(\d+%\) are implemented./, `Currently ${count} out of ${all} nodes (${Math .ceil (count / all * 100)}%) are implemented.`)
   text = text .replace (/<!-- COMPONENTS BEGIN -->.*?<!-- COMPONENTS END -->/s, `<!-- COMPONENTS BEGIN -->${list}<!-- COMPONENTS END -->`);

   fs .writeFileSync (md, text);
}

// function updateComponents ()
// {
//    let list = "\n\n";

//    for (const [component, nodes] of createIndex ())
//    {
//       list += `## ${component}\n\n`;
//       list += `| Node | Version | Status |\n`;
//       list += `|------|---------|--------|\n`;

//       for (const node of nodes .sort ())
//       {
//          const
//             slug    = `${component}/${node}` .toLowerCase () .replace (/_/g, "-"),
//             version = getSpecificationRange (component, node);

//          list += `| [${node}](${slug}) | ${version} | <span class="green">implemented</span> |\n`;
//       }

//       list += `\n`;
//    }

//    const md = path .resolve (tabs, `components.md`);

//    let text = fs .readFileSync (md) .toString ();

//    text = text .replace (/<!-- COMPONENTS BEGIN -->.*?<!-- COMPONENTS END -->/s, `<!-- COMPONENTS BEGIN -->${list}<!-- COMPONENTS END -->`);

//    fs .writeFileSync (md, text);
// }

function updateProfiles ()
{
   let list = "\n\n";

   const supportedProfiles = sh (`cat`, `src/x_ite/Configuration/SupportedProfiles.js`);

   supportedProfiles .match (/add\s*\("(.*?)"/sg) .sort () .forEach (m =>
   {
      m = m .match (/add\s*\("(.*?)"/s);

      list += `### ${m [1]}\n\n`;

      const title = supportedProfiles .match (new RegExp (`add\\s\\("${m [1]}".*?title:\\s*"(.*?)"`, "s")) [1]

      list += `${title}\n`;
      list += `{: .small }\n\n`;

      supportedProfiles .match (new RegExp (`"${m [1]}".*?components:\\s*\\[\\s*(.*?)\\s*\\]`, "s")) [1] .split ("\n") .map (c => c.match (/"(.*?)",\s*(\d)/s)) .sort ((a, b) => a [1] .localeCompare (b [1], "en")) .forEach (([_, component, level]) =>
      {
         if (component === "Annotation")
            return;

         list += `- [${component}](/x_ite/components/overview/#${component .toLowerCase ()}) : **${level}**\n`;
      });

      list += `\n`;
   });

   const md = path .resolve (prof, `overview.md`);

   let text = fs .readFileSync (md) .toString ();

   text = text .replace (/<!-- PROFILES BEGIN -->.*?<!-- PROFILES END -->/s, `<!-- PROFILES BEGIN -->${list}<!-- PROFILES END -->`);

   fs .writeFileSync (md, text);
}

async function addNodeStubs ()
{
   const access = new Map ([
      ["initializeOnly", ""],
      ["inputOutput", "in"],
      ["outputOnly", "out"],
      ["inputOutput", "in, out"],
   ]);

   for (const [component, nodes] of createIndex ())
   {
      for (const node of nodes .sort ())
      {
         const
            js = path .resolve (components, `${component}/${node}.js`),
            md = path .resolve (comp, `${component}/${node}.md`);

         if (fs .existsSync (md))
            continue;

         const file = fs .readFileSync (js) .toString ();

         let m = file .match (/getContainerField.*?"(.*?)"/s);

         const containerField = m [1];

         m = file .match (/X3DFieldDefinition\s*\(X3DConstants\s*\.(\w+),\s*"(\w+)",\s*new\s*Fields\s*\.(\w+)/sg);

         let fields = "";

         for (const s of m)
         {
            let sm = s .match (/X3DFieldDefinition\s*\(X3DConstants\s*\.(\w+),\s*"(\w+)",\s*new\s*Fields\s*\.(\w+)/s);

            fields += `### ${sm [3]} [${access .get (sm [1])}] **${sm [2]}** <small></small>\n\n`;
         }

         let text = `
---
title: ${node}
date: ${new Date() .toISOString () .slice (0, 10)}
nav: components-${component}
categories: [components, ${component}]
tags: [${node}, ${component}]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

${node} ...

The ${node} node belongs to the **${component}** component and its default container field is *${containerField}.* It is available since X3D version 4.0 or later.

## Hierarchy

\`\`\`
+ X3DNode
\`\`\`

## Fields

{: .fields }

${fields}

## External Links

- [X3D Specification of ${node}](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/${component .toLowerCase ()}.html#${node})
`;

         text = text .trim () .replace (/\n{3,}/g, "\n\n");

         systemSync (`mkdir -p ${path .dirname (md)}`);

         fs .writeFileSync (md, text);
      }
   }
}

updateNav ();
updateComponents (false);
updateComponents (true);
updateProfiles ();
addNodeStubs ();
