import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DTangentNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTangentNode);
}

Object .setPrototypeOf (X3DTangentNode .prototype, X3DGeometricPropertyNode .prototype);

Object .defineProperties (X3DTangentNode, X3DNode .getStaticProperties ("X3DTangentNode", "Rendering", 5));

export default X3DTangentNode;
