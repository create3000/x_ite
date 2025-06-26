import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DParticleEmitterNode from "./X3DParticleEmitterNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

function ConeEmitter (executionContext)
{
   X3DParticleEmitterNode .call (this, executionContext);

   this .addType (X3DConstants .ConeEmitter);

   // Units

   this ._position .setUnit ("length");
   this ._angle    .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (ConeEmitter .prototype, X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position  .addInterest ("set_position__", this);
      this ._direction .addInterest ("set_direction__", this);
      this ._angle     .addInterest ("set_angle__", this);

      this .addDefine ("#define X3D_CONE_EMITTER");

      this .addUniform ("position",  "uniform vec3  position;");
      this .addUniform ("direction", "uniform vec3  direction;");
      this .addUniform ("angle",     "uniform float angle;");

      this .addCallback (this .set_position__);
      this .addCallback (this .set_direction__);
      this .addCallback (this .set_angle__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
         {
            return getRandomSphericalVelocity ();
         }
         else
         {
            vec3  normal = getRandomNormalWithDirectionAndAngle (direction, angle);
            float speed  = getRandomSpeed ();

            return normal * speed;
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   },
   getBBox: (() =>
   {
      const bboxSize = new Vector3 ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this ._position .getValue ());
      };
   })(),
   set_position__ ()
   {
      const { x, y, z } = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", x, y, z );

      this ._bbox_changed .addEvent ();
   },
   set_direction__ ()
   {
      const { x, y, z } = this ._direction .getValue ();

      this .setUniform ("uniform3f", "direction", x, y, z );
   },
   set_angle__ ()
   {
      this .setUniform ("uniform1f", "angle", this ._angle .getValue ());
   },
});

Object .defineProperties (ConeEmitter,
{
   ... X3DNode .getStaticProperties ("ConeEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "angle",       new Fields .SFFloat (0.785398)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ConeEmitter;
