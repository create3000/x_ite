
import PhysX    from "../../../../node_modules/physx-js-webidl/physx-js-webidl.mjs";
import URLs     from "../Networking/URLs.js";
import Features from "../../Features.js";


const
   _PhysX   = Symbol (),
   _physics = Symbol ();

function X3DRigidBodyPhysicsContext () { }

Object .assign (X3DRigidBodyPhysicsContext .prototype,
{
   async initialize ()
   {
      if (!this .getBrowserOption ("Debug"))
         return;

      const
         PhysX   = await this .getPhysX (),
         version = PhysX .PHYSICS_VERSION;

      console .log (`PhysX version: ${(version >> 24) & 0xff}.${(version >> 16) & 0xff}.${(version >> 8) & 0xff}`);
   },
   getPhysX ()
   {
      return this [_PhysX] ??= PhysX ({
         locateFile: () => URLs .getLibraryURL ("physx-js-webidl.wasm"),
      });
   },
   getPhysics ()
   {
      return this [_physics] ??= this .createPhysics ();
   },
   async createPhysics ()
   {
      const
         PhysX      = await this .getPhysX (),
         version    = PhysX .PHYSICS_VERSION,
         allocator  = new PhysX .PxDefaultAllocator (),
         errorCb    = new PhysX .PxDefaultErrorCallback (),
         foundation = PhysX .CreateFoundation (version, allocator, errorCb),
         tolerances = new PhysX .PxTolerancesScale (),
         physics    = PhysX .CreatePhysics (version, foundation, tolerances);

      if (Features .ENVIRONMENT === "NODE")
         PhysX .destroy = Function .prototype;

      return physics;
   }
});

export default X3DRigidBodyPhysicsContext;
