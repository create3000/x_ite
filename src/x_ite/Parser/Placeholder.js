import Fields          from "../Fields.js";
import X3DNode         from "../Components/Core/X3DNode.js";
import X3DImportedNode from "../Execution/X3DImportedNode.js";

class Placeholder extends X3DNode
{
   #parser;
   #lastIndex;
   #lineNumber;
   #name;
   #namedNodes;
   #importedNodes;
   #type;
   #typeName;

   constructor (parser, name, type = X3DNode, typeName)
   {
      super (parser .getExecutionContext ());

      this .#parser        = parser;
      this .#lastIndex     = parser .lastIndex,
      this .#lineNumber    = parser .lineNumber;
      this .#namedNodes    = parser .getNamedNodes ();
      this .#importedNodes = parser .getImportedNodes ();

      this .#name     = name;
      this .#type     = type;
      this .#typeName = typeName;
   }

   getComponentInfo ()
   {
      return this .#type .componentInfo;
   }

   getContainerField ()
   {
      return this .#type .containerField;
   }

   getSpecificationRange ()
   {
      return this .#type .specificationRange;
   }

   replaceWithNode ()
   {
      const
         name      = this .#name,
         localNode = this .#namedNodes .get (name) ?? this .#importedNodes .get (name);

      const node = localNode instanceof X3DImportedNode
         ? localNode .getProxyNode (this .#type)
         : localNode;

      if (!node)
      {
         this .#parser .lastIndex  = this .#lastIndex;
         this .#parser .lineNumber = this .#lineNumber;

         throw new Error (`Named node '${name}' not found.`);
      }

      this .#parser .checkNodeType (node, this .#name, this .#type, this .#typeName);

      for (const parent of new Set (this .getParents ()))
      {
         if (!(parent instanceof Fields .SFNode))
            continue;

         parent .setValue (node);
      }
   }
}

export default Placeholder;
