import X3DBaseNode from "../Base/X3DBaseNode.js";

function BindableStack (executionContext, defaultNode)
{
   X3DBaseNode .call (this, executionContext);

   this .nodes = [ defaultNode ];
}

Object .assign (Object .setPrototypeOf (BindableStack .prototype, X3DBaseNode .prototype),
{
   get ()
   {
      return this .nodes;
   },
   top ()
   {
      return this .nodes .at (-1);
   },
   pushOnTop (node)
   {
      if (node !== this .nodes [0])
      {
         this .nodes .at (-1) ._isBound = false;
         this .nodes .push (node);
      }

      // Don't do set_bind.
      node ._isBound  = true;
      node ._bindTime = this .getBrowser () .getCurrentTime ();

      this .addNodeEvent ();
   },
   update (layerNode, removedNodes, changedNodes)
   {
      if (!removedNodes .length && !changedNodes .length)
         return;

      // Save top node for later use.

      const
         fromNode  = this .top (),
         boundNode = this .nodes .at (-1);

      // Remove invisible nodes and unbind them if needed.

      for (const removedNode of removedNodes)
      {
         const index = this .nodes .indexOf (removedNode);

         if (index > 0)
            this .nodes .splice (index, 1);
      }

      // Unbind nodes with set_bind false and pop top node.

      if (boundNode !== this .nodes [0])
      {
         if (changedNodes .some (node => !node ._set_bind .getValue () && node === boundNode))
         {
            this .nodes .pop ();
         }
      }

      // Push nodes with set_bind true to top of stack.

      for (const bindNode of changedNodes)
      {
         if (!bindNode ._set_bind .getValue ())
            continue;

         const index = this .nodes .indexOf (bindNode);

         if (index > -1)
            this .nodes .splice (index, 1);

         this .nodes .push (bindNode);
      }

      // Bind top node if not bound.

      const top = this .nodes .at (-1);

      if (top !== boundNode)
      {
         // First unbind last bound node.

         boundNode ._isBound = false;

         // Now bind new top node.

         top ._isBound  = true;
         top ._bindTime = this .getBrowser () .getCurrentTime ();

         // Do transition.

         top .transitionStart (layerNode, fromNode);
      }
      else
      {
         // Do transition.

         if (changedNodes .includes (top))
            top .transitionStart (layerNode, fromNode);
      }

      this .addNodeEvent ();
   },
});

for (const key of Object .keys (BindableStack .prototype))
   Object .defineProperty (BindableStack .prototype, key, { enumerable: false });

Object .defineProperties (BindableStack,
{
   typeName:
   {
      value: "BindableStack",
      enumerable: true,
   },
});

export default BindableStack;
