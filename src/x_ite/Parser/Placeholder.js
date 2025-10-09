import Fields               from "../Fields.js";
import X3DNode              from "../Components/Core/X3DNode.js";
import X3DImportedNodeProxy from "../Components/Core/X3DImportedNodeProxy.js";
import X3DPrototypeInstance from "../Components/Core/X3DPrototypeInstance.js";
import X3DImportedNode      from "../Execution/X3DImportedNode.js";
import X3DConstants         from "../Base/X3DConstants.js";

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
         ? new X3DImportedNodeProxy (this .getExecutionContext (), localNode)
         : node;

      if (!node)
      {
         this .#parser .lastIndex  = this .#lastIndex;
         this .#parser .lineNumber = this .#lineNumber;

         throw new Error (`Named node '${name}' not found.`);
      }

      this .checkPlaceholderType (node);

      for (const parent of this .getParents ())
      {
         if (!(parent instanceof Fields .SFNode))
            continue;

         parent .setValue (node);
      }
   }

   checkPlaceholderType (node)
   {
      const
         name = this .#name,
         type = this .#type;

      if (type !== X3DNode)
      {
         if (type === X3DPrototypeInstance)
         {
            if (!node .getType () .includes (X3DConstants .X3DPrototypeInstance))
            {
               console .warn (`XML Parser: DEF/USE mismatch, '${name}', referenced node is not of type X3DPrototypeInstance.`);
            }
            else if (this .#typeName !== node .getTypeName ())
            {
               console .warn (`XML Parser: DEF/USE mismatch, '${name}', name ${this .#typeName} != ${node .getTypeName ()}.`);
            }
         }
         else if (type !== node .constructor)
         {
            console .warn (`XML Parser: DEF/USE mismatch, '${name}', ${type .typeName} != ${node .getTypeName ()}.`);
         }
      }
   }
}

export default Placeholder;
