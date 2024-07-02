"use strict";

const { sh } = require ("shell-tools");

const
   excludes      = new Set (["ProtoInstance"]),
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   experimental  = xml (sh (`cat`, `${__dirname}/../../src/x3duom.xml`)),
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

function xml (string)
{
   const { XMLParser } = require ("fast-xml-parser");

   const parser = new XMLParser ({
      ignoreAttributes: false,
      attributeNamePrefix: "",
   });

   return parser .parse (string);
}

function unique (value, index, array)
{
   return array .indexOf (value) === index;
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

module .exports = {
   concreteNodes,
   abstractNodes,
   xml,
   unique,
   uniqueMerge,
   merge,
};
