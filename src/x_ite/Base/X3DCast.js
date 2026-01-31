import Fields from "../Fields.js";

function X3DCast (type, node, innerNode = true)
{
   try
   {
      if (node instanceof Fields .SFNode)
         node = node .getValue ();

      node = innerNode ? node ?.getInnerNode () : node ?.valueOf ();

      if (node ?.getType () .includes (type))
         return node;
   }
   catch
   { }

   return null;
}

export default X3DCast;
