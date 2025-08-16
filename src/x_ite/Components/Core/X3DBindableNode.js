import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "./X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

let modificationCount = 0;

function X3DBindableNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DBindableNode);

   this .modificationCount = 0;
}

Object .assign (Object .setPrototypeOf (X3DBindableNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_bind .addInterest ("set_bind__", this);
   },
   isCameraObject ()
   {
      return true;
   },
   getModificationCount ()
   {
      return this .modificationCount;
   },
   transitionStart ()
   { },
   set_bind__ ()
   {
      if (modificationCount === Number .MAX_SAFE_INTEGER)
         modificationCount = 0;

      this .modificationCount = ++ modificationCount;
   },
});

Object .defineProperties (X3DBindableNode, X3DNode .getStaticProperties ("X3DBindableNode", "Core", 1));

Object .defineProperties (X3DBindableNode,
{
   getModificationCount:
   {
      value ()
      {
         return modificationCount;
      },
      enumerable: false,
   },
});

export default X3DBindableNode;
