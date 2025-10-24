import Fields from "../Fields.js";

function X3DCast (type, node, innerNode = true)
{
   try
   {
      if (node)
      {
         if (node instanceof Fields .SFNode)
            node = node .getValue ();

         if (node)
         {
            if (innerNode)
               node = node .getInnerNode ();
            else
               node = node .valueOf ();

            if (node .getType () .includes (type))
               return node;
         }
      }
   }
   catch
   { }

   return null;
}

export default X3DCast;
