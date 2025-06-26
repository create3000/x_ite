import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DParticlePhysicsModelNode from "./X3DParticlePhysicsModelNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import Vector3                     from "../../../standard/Math/Numbers/Vector3.js";

function ForcePhysicsModel (executionContext)
{
   X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType (X3DConstants .ForcePhysicsModel);

   // Units

   this ._force .setUnit ("force");
}

Object .assign (Object .setPrototypeOf (ForcePhysicsModel .prototype, X3DParticlePhysicsModelNode .prototype),
{
   addForce: (() =>
   {
      const force = new Vector3 ();

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            forces .set (force .assign (this ._force .getValue ()) .multiply (timeByMass), i * 4);
            forces [i * 4 + 3] = 0;

            return true;
         }
         else
         {
            return false;
         }
     };
   })(),
});

Object .defineProperties (ForcePhysicsModel,
{
   ... X3DNode .getStaticProperties ("ForcePhysicsModel", "ParticleSystems", 1, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "force",    new Fields .SFVec3f (0, -9.8, 0)),
      ]),
      enumerable: true,
   },
});

export default ForcePhysicsModel;
