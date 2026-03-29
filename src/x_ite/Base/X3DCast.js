import Fields      from "../Fields.js";
import X3DBaseNode from "./X3DBaseNode.js";

function X3DCast (type, node, innerNode = true)
{
   if (node instanceof Fields .SFNode)
      node = node .getValue ();

   node = innerNode ? node ?.getInnerNode () : node ?.valueOf ();

   if (node instanceof X3DBaseNode)
   {
      if (node .getType () .includes (type))
         return node;
   }

   return null;
}

export default X3DCast;
