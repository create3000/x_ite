import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "./X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DNormalNode (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNormalNode);
}

Object .setPrototypeOf (X3DNormalNode .prototype, X3DGeometricPropertyNode .prototype);

Object .defineProperties (X3DNormalNode, X3DNode .getStaticProperties ("X3DNormalNode", "Rendering", 2));

export default X3DNormalNode;
