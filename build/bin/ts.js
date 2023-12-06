#!/usr/bin/env node
"use strict";

const
   { sh } = require ("shell-tools"),
   fs     = require ("fs");

const
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   concreteNodes = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode
      .filter (node => node .InterfaceDefinition ?.componentInfo)
      .sort ((a, b) => a .name .localeCompare (b .name))
      .map (node => [node .name, node])),
   abstractNodes = new Map (x3duom .X3dUnifiedObjectModel .AbstractNodeTypes .AbstractNodeType
      .concat (x3duom .X3dUnifiedObjectModel .AbstractObjectTypes .AbstractObjectType)
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
   // Inheritance

   const baseTypes = [
      node .InterfaceDefinition .Inheritance ?.baseType,
      node .InterfaceDefinition .AdditionalInheritance ?.baseType,
   ]
   .filter (type => type)
   .map (type => `${type}Proxy`);

   if (!baseTypes .length)
      baseTypes .push ("SFNode");

   const inheritance = baseTypes .join (", ");

   // Fields

   if (!node .InterfaceDefinition .field)
      node .InterfaceDefinition .field = [ ];

   if (!Array .isArray (node .InterfaceDefinition .field))
      node .InterfaceDefinition .field = [node .InterfaceDefinition .field];

   const fields = node .InterfaceDefinition .field
      .filter (field => !field .inheritedFrom)
      .filter (field => !field .name .match (/^(?:DEF|USE|IS|id|class)$/) && !field .description ?.match (/CSS/))
      .sort ((a, b) => a .name .localeCompare (b .name));

   if (node .name === "X3DChildNode")
      console .log (fields);

   const properties = fields
      .map (field => `   /**
   *${FieldDescription (field)}
   */
   ${FieldAccessType (field)}${field .name}: ${FieldType (field)},`)
      .join ("\n");

   // Generate class

   const string = `/** ${node .InterfaceDefinition .appinfo} */
interface ${node .name}Proxy${inheritance ? ` extends ${inheritance}`: ""}
{
${properties}
}`;

   return string;
}

function FieldDescription (field)
{
   let strings = [ ];

   if (field .description)
      strings .push (` ${field .description}`, "");

   const type = field .type === "xs:NMTOKEN" ? "SFString" : field .type;

   strings .push (` This field is of access type is '${field .accessType}' and type ${type}.`);

   return strings .join ("\n   *");
}

function FieldAccessType (field)
{
   return field .accessType === "outputOnly" ? "readonly " : "";
}

function FieldType (field)
{
   switch (field .type)
   {
      case "SFBool":
         return "boolean";
      case "SFDouble":
      case "SFFloat":
      case "SFInt32":
      case "SFTime":
         return "number";
      case "SFString":
      case "xs:NMTOKEN":
      {
         if (Array .isArray (field .enumeration))
            return field .enumeration .map (e => `"${e .value}"`) .join (" | ");

         return "string";
      }
      case "SFNode":
      {
         return field .acceptableNodeTypes
            .split (/[|,]/)
            .map (type => `${type .trim ()}Proxy`)
            .join (" | ") || "SFNode";
      }
      case "MFNode":
      {
         return `MFNode <${field .acceptableNodeTypes
            .split (/[|,]/)
            .map (type => `${type .trim ()}Proxy`)
            .join (" | ") || "SFNode"}>`;
      }
      case "MFString":
      {
         if (Array .isArray (field .enumeration))
         {
            return `MFString <${field .enumeration
               .flatMap (e => e .value .split (/\s*,\s*|\s+/))
               .filter (unique)
               .map (v => `"${v .replace (/["']/g, "")}"`)
               .join (" | ")}>`;
         }

         return field .type;
      }
      default:
         return field .type;
   }
}

function unique (value, index, array)
{
   return array .indexOf (value) === index;
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
