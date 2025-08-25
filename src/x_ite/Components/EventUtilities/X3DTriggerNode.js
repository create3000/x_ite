import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DTriggerNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTriggerNode);
}

Object .setPrototypeOf (X3DTriggerNode .prototype, X3DChildNode .prototype);

Object .defineProperties (X3DTriggerNode, X3DNode .getStaticProperties ("X3DTriggerNode", "EventUtilities", 1));

export default X3DTriggerNode;
