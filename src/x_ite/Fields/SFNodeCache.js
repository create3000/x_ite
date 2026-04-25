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

         return node;
      }
   },
   set (baseNode, node)
   {
      Object .defineProperties (node, properties);

      cache .set (baseNode, node);
   },
   delete (baseNode)
   {
      cache .delete (baseNode);
   },
};

const disable =
{
   value: undefined,
   configurable: true,
};

const properties =
{
   fromString: disable,
   fromVRMLString: disable,
   fromXMLString: disable,
   fromJSONString: disable,
   dispose:
   {
      value ()
      {
         this .getValue () ?.dispose ();

         SFNode .prototype .dispose .call (this);
      },
      configurable: true,
   },
};

export default SFNodeCache;
