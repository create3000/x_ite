import SFNode from "./SFNode.js";

const cache = new WeakMap ();

const SFNodeCache =
{
   get (baseNode)
   {
      const node = cache .get (baseNode);

      if (node)
      {
         return node;
      }
      else
      {
         const node = new SFNode (baseNode);

         this .set (baseNode, node);

         return node;
      }
   },
   set (baseNode, node)
   {
      cache .set (baseNode, node);
   },
   delete (baseNode)
   {
      cache .delete (baseNode);
   },
};

export default SFNodeCache;
