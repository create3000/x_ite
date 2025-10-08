import Fields               from "../Fields.js";
import X3DNode              from "../Components/Core/X3DNode.js";
import X3DPrototypeInstance from "../Components/Core/X3DPrototypeInstance.js";
import X3DConstants         from "../Base/X3DConstants.js";

class Placeholder extends X3DNode
{
   #executionContext;
   #name;
   #type;
   #typeName;

   constructor (executionContext, name, type = X3DNode, typeName)
   {
      super (executionContext);

      this .#executionContext = executionContext;
      this .#name             = name;
      this .#type             = type;
      this .#typeName         = typeName;
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
      const node = this .#executionContext .getLocalNode (this .#name) .getValue ();

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
