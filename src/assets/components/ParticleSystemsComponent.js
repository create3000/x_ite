import Components                  from "../../x_ite/Components.js";
import X3DParticleSystemsContext   from "../../x_ite/Browser/ParticleSystems/X3DParticleSystemsContext.js";
import BoundedPhysicsModel         from "../../x_ite/Components/ParticleSystems/BoundedPhysicsModel.js";
import ConeEmitter                 from "../../x_ite/Components/ParticleSystems/ConeEmitter.js";
import ExplosionEmitter            from "../../x_ite/Components/ParticleSystems/ExplosionEmitter.js";
import ForcePhysicsModel           from "../../x_ite/Components/ParticleSystems/ForcePhysicsModel.js";
import ParticleSystem              from "../../x_ite/Components/ParticleSystems/ParticleSystem.js";
import PointEmitter                from "../../x_ite/Components/ParticleSystems/PointEmitter.js";
import PolylineEmitter             from "../../x_ite/Components/ParticleSystems/PolylineEmitter.js";
import SurfaceEmitter              from "../../x_ite/Components/ParticleSystems/SurfaceEmitter.js";
import VolumeEmitter               from "../../x_ite/Components/ParticleSystems/VolumeEmitter.js";
import WindPhysicsModel            from "../../x_ite/Components/ParticleSystems/WindPhysicsModel.js";
import X3DParticleEmitterNode      from "../../x_ite/Components/ParticleSystems/X3DParticleEmitterNode.js";
import X3DParticlePhysicsModelNode from "../../x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode.js";

Components .add ({
   name: "ParticleSystems",
   concreteNodes:
   [
      BoundedPhysicsModel,
      ConeEmitter,
      ExplosionEmitter,
      ForcePhysicsModel,
      ParticleSystem,
      PointEmitter,
      PolylineEmitter,
      SurfaceEmitter,
      VolumeEmitter,
      WindPhysicsModel,
   ],
   abstractNodes:
   [
      X3DParticleEmitterNode,
      X3DParticlePhysicsModelNode,
   ],
   browserContext: X3DParticleSystemsContext,
});

export default undefined;
