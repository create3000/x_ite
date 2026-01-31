import Fields from "../Fields.js";

function X3DCast (type, node, innerNode = true)
{
   try
   {
      if (node instanceof Fields .SFNode)
         node = node .getValue ();

      if (innerNode)
         node = node ?.getInnerNode ();

      node = node ?.valueOf ();

      if (node ?.getType () .includes (type))
         return node;
   }
   catch
   { }

   return null;
}

export default X3DCast;
