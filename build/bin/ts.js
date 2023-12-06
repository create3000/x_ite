#!/usr/bin/env node
"use strict";

const
   { systemSync, sh } = require ("shell-tools"),
   fs                 = require ("fs");

const
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   concreteNodes = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode
      .filter (node => node .InterfaceDefinition ?.componentInfo)
      .sort ((a, b) => a .name .localeCompare (b .name))
      .map (node => [node .name, node])),
   abstractNodes = new Map (x3duom .X3dUnifiedObjectModel .AbstractNodeTypes .AbstractNodeType
      .filter (node => node .InterfaceDefinition ?.componentInfo)
      .sort ((a, b) => a .name .localeCompare (b .name))
      .map (node => [node .name, node]));

let ts = sh ("cat", "src/x_ite.d.ts");

function ConcreteNodesConstants ()
{
   const string = `// CONCRETE NODE TYPES CONSTANTS START

   // Concrete Node Types

${[... concreteNodes .keys ()] .map (typeName => `   readonly ${typeName}: number;`) .join ("\n")}

   // CONCRETE NODE TYPES CONSTANTS END`;

   ts = ts .replace (/(\/\/ CONCRETE NODE TYPES CONSTANTS START).*?(\/\/ CONCRETE NODE TYPES CONSTANTS END)/s, string);
}

function AbstractNodesConstants ()
{
   const string = `// ABSTRACT NODE TYPES CONSTANTS START

   // Abstract Node Types

${[... abstractNodes .keys ()] .map (typeName => `   readonly ${typeName}: number;`) .join ("\n")}

   // ABSTRACT NODE TYPES CONSTANTS END`;

   ts = ts .replace (/(\/\/ ABSTRACT NODE TYPES CONSTANTS START).*?(\/\/ ABSTRACT NODE TYPES CONSTANTS END)/s, string);
}

function ConcreteNode (node)
{
   if (node .name === "MetadataBoolean")
      console .log (node);

   const inheritance = [
      node .InterfaceDefinition .Inheritance ?.baseType,
      node .InterfaceDefinition .AdditionalInheritance ?.baseType,
   ]
   .filter (type => type)
   .join (", ");

   const string = `/** ${node .InterfaceDefinition .appinfo} */
interface ${node .name}Proxy${inheritance ? ` extends ${inheritance}`: ""}
{

}`;

   return string;
}

function AbstractNode (node)
{
   return ConcreteNode (node);
}

function NodeTypes ()
{
   const string = `// NODES START

${[... concreteNodes .values ()] .map (ConcreteNode) .join ("\n\n")}

${[... abstractNodes .values ()] .map (AbstractNode) .join ("\n\n")}

type ConcreteNodesType = {
${[... concreteNodes .keys ()] .map (typeName => `   ${typeName}: ${typeName}Proxy,`) .join ("\n")}
}
&
{ [name: string]: SFNode } // catch all;

   // NODES END`;

   ts = ts .replace (/(\/\/ NODES START).*?(\/\/ NODES END)/s, string);
}

function main ()
{
   console .log ("Updating TypeScript types ...");

   ConcreteNodesConstants ();
   AbstractNodesConstants ();
   NodeTypes ();

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
