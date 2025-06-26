import X3DNode          from "../Core/X3DNode.js";
import X3DBoundedObject from "../Grouping/X3DBoundedObject.js";
import X3DConstants     from "../../Base/X3DConstants.js";

function X3DNBodyCollisionSpaceNode (executionContext)
{
   X3DNode          .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DNBodyCollisionSpaceNode);
}

Object .assign (Object .setPrototypeOf (X3DNBodyCollisionSpaceNode .prototype, X3DNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DNode          .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DNode          .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DNBodyCollisionSpaceNode, X3DNode .getStaticProperties ("X3DNBodyCollisionSpaceNode", "RigidBodyPhysics", 1));

export default X3DNBodyCollisionSpaceNode;
