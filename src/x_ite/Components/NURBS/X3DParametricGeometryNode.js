import X3DNode         from "../Core/X3DNode.js";
import X3DGeometryNode from "../Rendering/X3DGeometryNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import NURBS           from "../../Browser/NURBS/NURBS.js";

function X3DParametricGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .X3DParametricGeometryNode);
}

Object .assign (Object .setPrototypeOf (X3DParametricGeometryNode .prototype, X3DGeometryNode .prototype),
{
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS .getKnots (result, closed, order, dimension, knot);
   },
});

Object .defineProperties (X3DParametricGeometryNode, X3DNode .getStaticProperties ("X3DParametricGeometryNode", "NURBS", 1));

export default X3DParametricGeometryNode;
