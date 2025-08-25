import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DLayoutNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DLayoutNode);
}

Object .setPrototypeOf (X3DLayoutNode .prototype, X3DChildNode .prototype);

Object .defineProperties (X3DLayoutNode, X3DNode .getStaticProperties ("X3DLayoutNode", "Layout", 1));

export default X3DLayoutNode;
