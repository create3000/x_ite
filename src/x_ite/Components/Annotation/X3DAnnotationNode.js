import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DAnnotationNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DAnnotationNode);
}

Object .assign (Object .setPrototypeOf (X3DAnnotationNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (X3DAnnotationNode, X3DNode .getStaticProperties ("X3DAnnotationNode", "Annotation", 1));

export default X3DAnnotationNode;
