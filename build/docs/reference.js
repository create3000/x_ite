#!/usr/bin/env node
"use strict";

const
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

const
   excludes      = new Set (["ProtoInstance"]),
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   experimental  = xml (sh (`cat`, `build/lib/x3duom.xml`)),
   concreteNodes = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode
      .filter (node => node .InterfaceDefinition ?.componentInfo)
      .concat (experimental .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode)
      .filter (uniqueMerge)
      .filter (node => !excludes .has (node .name))
      .sort ((a, b) => a .name .localeCompare (b .name))
      .map (node => [node .name, node])),
   abstractNodes = new Map (x3duom .X3dUnifiedObjectModel .AbstractNodeTypes .AbstractNodeType
      .concat (x3duom .X3dUnifiedObjectModel .AbstractObjectTypes .AbstractObjectType)
      .filter (node => node .InterfaceDefinition ?.componentInfo)
      .sort ((a, b) => a .name .localeCompare (b .name))
      .map (node => [node .name, node]));

let constants = sh ("cat", "docs/_posts/reference/constants-services.md");

function main ()
{
   console .log ("Updating reference of X3DConstants types ...");

   ConcreteNodesConstants ();
   AbstractNodesConstants ();

   fs .writeFileSync ("docs/_posts/reference/constants-services.md", constants);
}

function ConcreteNodesConstants ()
{
   const string = `<!-- CONCRETE NODE TYPES START -->
<!-- DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED. -->

${[... concreteNodes .keys ()] .map (typeName => `- ${typeName}`) .join ("\n")}

<!-- CONCRETE NODE TYPES END -->`;

   constants = constants .replace (/(<!-- CONCRETE NODE TYPES START -->).*?(<!-- CONCRETE NODE TYPES END -->)/s, string);
}

function AbstractNodesConstants ()
{
   const string = `<!-- ABSTRACT NODE TYPES START -->
<!-- DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED. -->

${[... abstractNodes .keys ()] .map (typeName => `- ${typeName}`) .join ("\n")}

<!-- ABSTRACT NODE TYPES END -->`;

   constants = constants .replace (/(<!-- ABSTRACT NODE TYPES START -->).*?(<!-- ABSTRACT NODE TYPES END -->)/s, string);
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

function uniqueMerge (value, index, array)
{
   const i = array .findIndex (f => f .name === value .name);

   if (i === index)
      return true;

   merge (array [i], value);

   return false;
}

function merge (target = { }, source = { })
{
   for (const key of Object .keys (source))
   {
      if (Array .isArray (source [key]))
         target [key] .push (... source [key]);
      else if (source [key] instanceof Object)
         target [key] = merge (target [key], source [key]);
      else
         target [key] = source [key];
   }

   return target;
}

main ();
