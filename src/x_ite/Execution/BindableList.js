import X3DBaseNode     from "../Base/X3DBaseNode.js";
import X3DBindableNode from "../Components/Core/X3DBindableNode.js";

function BindableList (executionContext, defaultNode)
{
   X3DBaseNode .call (this, executionContext);

   this .modificationCount = 0;
   this .nodes             = [ defaultNode ];
   this .collectedNodes    = [ defaultNode ];
   this .changedNodes      = [ ];
   this .removedNodes      = [ ];
}

Object .assign (Object .setPrototypeOf (BindableList .prototype, X3DBaseNode .prototype),
{
   get ()
   {
      return this .nodes;
   },
   getBound (name)
   {
      const length = this .nodes .length;

      if (length === 1)
         return this .nodes [0]; // Return default viewpoint.

      const enableInlineBindables = false;

      if (name)
      {
         // Return first viewpoint with @name.

         for (let i = 1; i < length; ++ i)
         {
            const
               node  = this .nodes [i],
               scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

            if (!enableInlineBindables && scene .getExecutionContext ())
               continue;

            if (node .getName () == name)
               return node;
         }
      }

      // Return first bound viewpoint in scene.

      for (let i = 1; i < length; ++ i)
      {
         const
            node  = this .nodes [i],
            scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

         if (!enableInlineBindables && scene .getExecutionContext ())
            continue;

         if (node ._isBound .getValue ())
            return node;
      }

      // Return first viewpoint in scene.

      for (let i = 1; i < length; ++ i)
      {
         const
            node  = this .nodes [i],
            scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

         if (!enableInlineBindables && scene .getExecutionContext ())
            continue;

         return node;
      }

      return this .nodes [0]; // Return default viewpoint.
   },
   push (node)
   {
      return this .collectedNodes .push (node);
   },
   update (layerNode, stack)
   {
      const { collectedNodes, changedNodes, removedNodes } = this;

      for (const node of collectedNodes)
      {
         if (node .getModificationCount () > this .modificationCount)
            changedNodes .push (node);
      }

      if (!equals (collectedNodes, this .nodes))
      {
         // Unbind nodes not in current list (collectedNodes);

         for (const node of this .nodes)
         {
            if (!collectedNodes .includes (node))
               removedNodes .push (node);
         }

         // Swap nodes.

         const tmp = this .nodes;

         this .nodes          = collectedNodes;
         this .collectedNodes = tmp;
      }

      // Clear collected nodes.

      this .collectedNodes .length = 1;

      // Update stack.

      stack .update (layerNode, removedNodes, changedNodes)

      changedNodes .length = 0;
      removedNodes .length = 0;

      // Advance modificationCount time.

      this .modificationCount = X3DBindableNode .getModificationCount ();
   },
});

for (const key of Object .keys (BindableList .prototype))
   Object .defineProperty (BindableList .prototype, key, { enumerable: false });

// Compares two nodes.

function equals (lhs, rhs)
{
   if (lhs .length !== rhs .length)
      return false;

   for (let i = 0; i < lhs .length; ++ i)
   {
      if (lhs [i] !== rhs [i])
         return false;
   }

   return true;
}

Object .defineProperties (BindableList,
{
   typeName:
   {
      value: "BindableList",
      enumerable: true,
   },
});

export default BindableList;
