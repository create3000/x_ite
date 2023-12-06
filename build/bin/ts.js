#!/usr/bin/env node
"use strict";

const
   { systemSync, sh } = require ("shell-tools"),
   fs                 = require ("fs");

const
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   concreteNodes = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode .map (node => [node .name, node])),
   abstractNodes = new Map (x3duom .X3dUnifiedObjectModel .AbstractNodeTypes .AbstractNodeType .map (node => [node .name, node]));

let ts = sh ("cat", "src/x_ite.d.ts");

function ConcreteNodesConstants ()
{
   const string = `// CONCRETE NODE TYPES CONSTANTS START

${[... concreteNodes .keys ()] .sort () .map (typeName => `   readonly ${typeName}: number;`) .join ("\n")}

   // CONCRETE NODE TYPES CONSTANTS END`;

   ts = ts .replace (/(\/\/ CONCRETE NODE TYPES CONSTANTS START).*?(\/\/ CONCRETE NODE TYPES CONSTANTS END)/s, string);
}

function AbstractNodesConstants ()
{

   const string = `// ABSTRACT NODE TYPES CONSTANTS START

${[... abstractNodes .keys ()] .sort () .map (typeName => `   readonly ${typeName}: number;`) .join ("\n")}

   // ABSTRACT NODE TYPES CONSTANTS END`;

   ts = ts .replace (/(\/\/ ABSTRACT NODE TYPES CONSTANTS START).*?(\/\/ ABSTRACT NODE TYPES CONSTANTS END)/s, string);
}

function main ()
{
   console .log ("Updating TypeScript types ...");

   ConcreteNodesConstants ();
   AbstractNodesConstants ();

   fs .writeFileSync ("src/x_ite.d.ts", ts);
}

function xml (string)
{
   const { XMLParser } = require ("fast-xml-parser")

   const parser = new XMLParser ({
      ignoreAttributes: false,
      attributeNamePrefix: "",
   });

   return parser .parse (string);
}

main ();
