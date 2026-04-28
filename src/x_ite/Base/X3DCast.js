import Fields  from "../Fields.js";
import X3DNode from "../Components/Core/X3DNode.js";

function X3DCast (type, node, innerNode = true)
{
   try
   {
      if (node instanceof Fields .SFNode)
         node = node .getValue ();

      node = innerNode ? node ?.getInnerNode () : node ?.valueOf ();

      if (node instanceof X3DNode)
      {
         if (node .getType () .includes (type))
            return node;
      }
   }
   catch
   { }

   return null;
}

export default X3DCast;
