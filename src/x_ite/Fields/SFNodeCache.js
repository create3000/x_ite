import SFNode from "./SFNode.js";

const cache = new WeakMap ();

// const r = new FinalizationRegistry (t => console .error (`object deleted ${--i} ${t}`));
// let i = 0;

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

         // i += 2;
         // console .warn (`baseNode ${i} ${baseNode .getTypeName ()}`);
         // r .register (baseNode, `baseNode ${baseNode .getTypeName ()}`);
         // r .register (node, `node ${baseNode .getTypeName ()}`);

         return node;
      }
   },
   set (baseNode, node)
   {
      node .dispose = dispose;

      // WeakMap allows associating data to objects in a way that doesn't prevent
      // the key objects from being collected, even if the values reference the keys.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
      cache .set (baseNode, node);
   },
   delete (baseNode)
   {
      cache .delete (baseNode);
   },
};

function dispose ()
{
   this .getValue () ?.dispose ();

   SFNode .prototype .dispose .call (this);
}

export default SFNodeCache;
