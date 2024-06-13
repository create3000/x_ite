#!/usr/bin/env node
"use strict";

const
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

const { concreteNodes, abstractNodes } = require ("../lib/x3duom");

const experimentalNodes = sh ("ls", "-C1", "src/x_ite/Components/X_ITE")
   .trim ()
   .split ("\n")
   .map (typeName => typeName .replace (/\.js$/, ""));

const
   experimentalConcreteNodes = experimentalNodes .filter (typeName => !typeName .match (/^X3D/)),
   experimentalAbstractNodes = experimentalNodes .filter (typeName => typeName .match (/^X3D/));

let constants = sh ("cat", "docs/_posts/reference/constants-services.md");

Array .prototype .unique ??= function ()
{
   return Array .from (new Set (this));
};

function cmpi (a, b)
{
   return a .toLowerCase () .localeCompare (b .toLowerCase ());
}

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

${Array .from (concreteNodes .keys ()) .concat (experimentalConcreteNodes) .unique () .sort (cmpi) .map (typeName => `- ${typeName}`) .join ("\n")}

<!-- CONCRETE NODE TYPES END -->`;

   constants = constants .replace (/(<!-- CONCRETE NODE TYPES START -->).*?(<!-- CONCRETE NODE TYPES END -->)/s, string);
}

function AbstractNodesConstants ()
{
   const string = `<!-- ABSTRACT NODE TYPES START -->
<!-- DO NOT EDIT THIS SECTION, THIS SECTION IS AUTOMATICALLY GENERATED. -->

${Array .from (abstractNodes .keys ()) .concat (experimentalAbstractNodes) .unique () .sort (cmpi) .map (typeName => `- ${typeName}`) .join ("\n")}

<!-- ABSTRACT NODE TYPES END -->`;

   constants = constants .replace (/(<!-- ABSTRACT NODE TYPES START -->).*?(<!-- ABSTRACT NODE TYPES END -->)/s, string);
}

main ();
