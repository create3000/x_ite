import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DUrlObject from "../Networking/X3DUrlObject.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DScriptNode (executionContext)
{
   X3DChildNode .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .X3DScriptNode);
}

Object .assign (Object .setPrototypeOf (X3DScriptNode .prototype, X3DChildNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);
      X3DUrlObject .prototype .initialize .call (this);
   },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DChildNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DScriptNode, X3DNode .getStaticProperties ("X3DScriptNode", "Scripting", 1));

export default X3DScriptNode;
