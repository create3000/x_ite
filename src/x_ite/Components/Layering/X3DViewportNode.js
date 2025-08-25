import X3DNode         from "../Core/X3DNode.js";
import X3DGroupingNode from "../Grouping/X3DGroupingNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";

function X3DViewportNode (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .X3DViewportNode);
}

Object .setPrototypeOf (X3DViewportNode .prototype, X3DGroupingNode .prototype);

Object .defineProperties (X3DViewportNode, X3DNode .getStaticProperties ("X3DViewportNode", "Layering", 1));

export default X3DViewportNode;
