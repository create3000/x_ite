import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DParticlePhysicsModelNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DParticlePhysicsModelNode);
}

Object .assign (Object .setPrototypeOf (X3DParticlePhysicsModelNode .prototype, X3DNode .prototype),
{
   addForce ()
   { },
});

Object .defineProperties (X3DParticlePhysicsModelNode, X3DNode .getStaticProperties ("X3DParticlePhysicsModelNode", "ParticleSystems", 1));

export default X3DParticlePhysicsModelNode;
