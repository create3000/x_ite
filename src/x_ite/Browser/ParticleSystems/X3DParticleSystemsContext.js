import PointEmitter from "../../Components/ParticleSystems/PointEmitter.js";

const _defaultEmitter = Symbol ();

function X3DParticleSystemsContext () { }

Object .assign (X3DParticleSystemsContext .prototype,
{
   getDefaultEmitter ()
   {
      return this [_defaultEmitter] ??= (() =>
      {
         const defaultEmitter = new PointEmitter (this .getPrivateScene ());

         defaultEmitter .setPrivate (true);
         defaultEmitter .setup ();

         return defaultEmitter;
      })();
   },
});

export default X3DParticleSystemsContext;
