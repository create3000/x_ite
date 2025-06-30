import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DParticlePhysicsModelNode from "./X3DParticlePhysicsModelNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import Vector3                     from "../../../standard/Math/Numbers/Vector3.js";
import Algorithm                   from "../../../standard/Math/Algorithm.js";

function WindPhysicsModel (executionContext)
{
   X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType (X3DConstants .WindPhysicsModel);

   // Units

   this ._speed .setUnit ("speed");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._direction = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (WindPhysicsModel .prototype, X3DParticlePhysicsModelNode .prototype),
{
   getRandomSpeed (emitterNode)
   {
      const
         speed     = Math .max (this ._speed .getValue (), 0),
         variation = speed * Math .max (this ._gustiness .getValue (), 0);

      return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
   },
   addForce: (() =>
   {
      const force = new Vector3 ();

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            const
               surfaceArea = emitterNode .getSurfaceArea (),
               speed       = this .getRandomSpeed (emitterNode),
               pressure    = 10 ** (2 * Math .log (speed)) * 0.64615;

            if (this ._direction .getValue () .equals (Vector3 .Zero))
               emitterNode .getRandomNormal (force);
            else
               force .assign (this ._direction .getValue ()) .normalize ();

            forces .set (force .multiply (surfaceArea * pressure * timeByMass), i * 4);
            forces [i * 4 + 3] = Math .PI * Algorithm .clamp (this ._turbulence .getValue (), 0, 1);

            return true;
         }
         else
         {
            return false;
         }
      }
   })(),
});

Object .defineProperties (WindPhysicsModel,
{
   ... X3DNode .getStaticProperties ("WindPhysicsModel", "ParticleSystems", 1, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",  new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",      new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gustiness",  new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "turbulence", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default WindPhysicsModel;
