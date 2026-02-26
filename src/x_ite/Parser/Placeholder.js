import Fields          from "../Fields.js";
import X3DNode         from "../Components/Core/X3DNode.js";
import X3DImportedNode from "../Execution/X3DImportedNode.js";

class Placeholder extends X3DNode
{
   #parser;
   #name;
   #namedNodes;
   #importedNodes;
   #type;
   #typeName;

   constructor (parser, name, type = X3DNode, typeName)
   {
      super (parser .getExecutionContext ());

      this .#parser        = parser;
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
         ? localNode .getExportedNode (this .#type)
         : localNode;

      if (node)
      {
         this .#parser .checkNodeType (node, this .#name, this .#type, this .#typeName);

         for (const parent of Array .from (this .getParents ()))
         {
            if (!(parent instanceof Fields .SFNode))
               continue;

            parent .setValue (node);
         }
      }
      else
      {
         console .warn (`X3DParser error: Named or imported node '${name}' not found.`);

         this .dispose ();
      }
   }
}

export default Placeholder;
