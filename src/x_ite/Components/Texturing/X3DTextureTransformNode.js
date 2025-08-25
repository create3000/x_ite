import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function X3DTextureTransformNode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTextureTransformNode);
}

Object .setPrototypeOf (X3DTextureTransformNode .prototype, X3DAppearanceChildNode .prototype);

Object .defineProperties (X3DTextureTransformNode, X3DNode .getStaticProperties ("X3DTextureTransformNode", "Texturing", 1));

export default X3DTextureTransformNode;
