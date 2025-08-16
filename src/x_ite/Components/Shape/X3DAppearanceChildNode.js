import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DAppearanceChildNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DAppearanceChildNode);
}

Object .setPrototypeOf (X3DAppearanceChildNode .prototype, X3DNode .prototype);

Object .defineProperties (X3DAppearanceChildNode, X3DNode .getStaticProperties ("X3DAppearanceChildNode", "Shape", 1));

export default X3DAppearanceChildNode;
