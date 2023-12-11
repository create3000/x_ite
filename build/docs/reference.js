#!/usr/bin/env node
"use strict";

const
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

const { concreteNodes, abstractNodes } = require ("../lib/x3duom");

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

main ();
