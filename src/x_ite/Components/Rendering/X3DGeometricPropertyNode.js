import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DGeometricPropertyNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DGeometricPropertyNode);
}

Object .setPrototypeOf (X3DGeometricPropertyNode .prototype, X3DNode .prototype);

Object .defineProperties (X3DGeometricPropertyNode, X3DNode .getStaticProperties ("X3DGeometricPropertyNode", "Rendering", 1));

export default X3DGeometricPropertyNode;
