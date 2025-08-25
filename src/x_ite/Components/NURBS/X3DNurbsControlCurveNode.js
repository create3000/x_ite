import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DNurbsControlCurveNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNurbsControlCurveNode);
}

Object .setPrototypeOf (X3DNurbsControlCurveNode .prototype, X3DNode .prototype);

Object .defineProperties (X3DNurbsControlCurveNode, X3DNode .getStaticProperties ("X3DNurbsControlCurveNode", "NURBS", 1));

export default X3DNurbsControlCurveNode;
