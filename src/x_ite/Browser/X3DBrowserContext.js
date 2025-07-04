import Fields                         from "../Fields.js";
import X3DConstants                   from "../Base/X3DConstants.js";
import X3DBaseNode                    from "../Base/X3DBaseNode.js";
import X3DCoreContext                 from "./Core/X3DCoreContext.js";
import X3DEnvironmentalEffectsContext from "./EnvironmentalEffects/X3DEnvironmentalEffectsContext.js";
import X3DGeometry3DContext           from "./Geometry3D/X3DGeometry3DContext.js";
import X3DGroupingContext             from "./Grouping/X3DGroupingContext.js";
import X3DLayeringContext             from "./Layering/X3DLayeringContext.js";
import X3DLightingContext             from "./Lighting/X3DLightingContext.js";
import X3DNavigationContext           from "./Navigation/X3DNavigationContext.js";
import X3DNetworkingContext           from "./Networking/X3DNetworkingContext.js";
import X3DPickingContext              from "./Picking/X3DPickingContext.js";
import X3DPointingDeviceSensorContext from "./PointingDeviceSensor/X3DPointingDeviceSensorContext.js";
import X3DRenderingContext            from "./Rendering/X3DRenderingContext.js";
import X3DScriptingContext            from "./Scripting/X3DScriptingContext.js";
import X3DShadersContext              from "./Shaders/X3DShadersContext.js";
import X3DShapeContext                from "./Shape/X3DShapeContext.js";
import X3DSoundContext                from "./Sound/X3DSoundContext.js";
import X3DTexturingContext            from "./Texturing/X3DTexturingContext.js";
import X3DTimeContext                 from "./Time/X3DTimeContext.js";
import X3DRoutingContext              from "../Routing/X3DRoutingContext.js";
import AbstractNodes                  from "../Configuration/AbstractNodes.js"
import ConcreteNodes                  from "../Configuration/ConcreteNodes.js"
import X3DWorld                       from "../Execution/X3DWorld.js";
import TraverseType                   from "../Rendering/TraverseType.js";
import StopWatch                      from "../../standard/Time/StopWatch.js";
import DEVELOPMENT                    from "../DEVELOPMENT.js";

const
   _world          = Symbol (),
   _tainted        = Symbol (),
   _limitFrameRate = Symbol (),
   _traverse       = Symbol (),
   _renderCallback = Symbol (),
   _animFrame      = Symbol (),
   _previousTime   = Symbol (),
   _systemTime     = Symbol (),
   _browserTime    = Symbol (),
   _cameraTime     = Symbol (),
   _collisionTime  = Symbol (),
   _displayTime    = Symbol (),
   _processEvents  = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

const
   browsers        = new Set (),
   browserContexts = [
      X3DRoutingContext,
      X3DScriptingContext,
      X3DCoreContext,
      X3DNetworkingContext,
      X3DTexturingContext,
      X3DShadersContext,
      X3DRenderingContext,
      X3DShapeContext,
      X3DGroupingContext,
      X3DGeometry3DContext,
      X3DPointingDeviceSensorContext,
      X3DNavigationContext,
      X3DLayeringContext,
      X3DEnvironmentalEffectsContext,
      X3DLightingContext,
      X3DPickingContext,
      X3DSoundContext,
      X3DTimeContext,
   ];

function X3DBrowserContext (element)
{
   browsers .add (this);

   X3DBaseNode .call (this, this);

   for (const browserContext of browserContexts)
      browserContext .call (this, element);

   this .addChildObjects (X3DConstants .outputOnly, "initialized",    new Fields .SFTime (),
                          X3DConstants .outputOnly, "shutdown",       new Fields .SFTime (),
                          X3DConstants .outputOnly, "prepareEvents",  new Fields .SFTime (),
                          X3DConstants .outputOnly, "timeEvents",     new Fields .SFTime (),
                          X3DConstants .outputOnly, "cameraEvents",   new Fields .SFTime (),
                          X3DConstants .outputOnly, "sensorEvents",   new Fields .SFTime (),
                          X3DConstants .outputOnly, "displayEvents",  new Fields .SFTime (),
                          X3DConstants .outputOnly, "finishedEvents", new Fields .SFTime (),
                          X3DConstants .outputOnly, "endEvents",      new Fields .SFTime ());

   this [_tainted]        = false;
   this [_previousTime]   = 0;
   this [_renderCallback] = this [_traverse] .bind (this);
   this [_systemTime]     = new StopWatch ();
   this [_browserTime]    = new StopWatch ();
   this [_cameraTime]     = new StopWatch ();
   this [_collisionTime]  = new StopWatch ();
   this [_displayTime]    = new StopWatch ();
};

Object .assign (Object .setPrototypeOf (X3DBrowserContext .prototype, X3DBaseNode .prototype),
   ... browserContexts .map (browserContext => browserContext .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      for (const browserContext of browserContexts)
         browserContext .prototype .initialize ?.call (this);
   },
   initialized ()
   {
      return this ._initialized;
   },
   shutdown ()
   {
      return this ._shutdown;
   },
   prepareEvents ()
   {
      return this ._prepareEvents;
   },
   timeEvents ()
   {
      return this ._timeEvents;
   },
   cameraEvents ()
   {
      return this ._cameraEvents;
   },
   sensorEvents ()
   {
      return this ._sensorEvents;
   },
   displayEvents ()
   {
      return this ._displayEvents;
   },
   finishedEvents ()
   {
      return this ._finishedEvents;
   },
   endEvents ()
   {
      return this ._endEvents;
   },
   getBrowser ()
   {
      return this;
   },
   getWorld ()
   {
      return this [_world];
   },
   getExecutionContext ()
   {
      return this [_world] .getExecutionContext ();
   },
   setExecutionContext (executionContext)
   {
      this .getDefaultScene () .setExecutionContext (executionContext);

      this [_world] = new X3DWorld (executionContext);
      this [_world] .setup ();
      this [_world] .bindBindables ();
   },
   setSession (session)
   {
      this .getSession () .cancelAnimationFrame (this [_animFrame]);

      X3DRenderingContext .prototype .setSession .call (this, session);

      this [_tainted] = false;

      this .addBrowserEvent ();
   },
   addBrowserEvent ()
   {
      if (this [_tainted])
         return;

      this [_tainted]   = true;
      this [_animFrame] = this .getSession () .requestAnimationFrame (this [_renderCallback]);
   },
   nextFrame ()
   {
      return new Promise (resolve =>
      {
         const key = Symbol ();

         this .addBrowserEvent ();

         this ._endEvents .addFieldCallback (key, () =>
         {
            this ._endEvents .removeFieldCallback (key);
            resolve ();
         });
      });
   },
   [_limitFrameRate] (now)
   {
      if (now > this [_previousTime])
      {
         this [_previousTime] = now;
         this [_tainted]      = false;

         return false;
      }
      else
      {
         this .getSession () .requestAnimationFrame (this [_renderCallback]);

         return true;
      }
   },
   [_traverse] (now, frame)
   {
      // Limit frame rate.

      if (this [_limitFrameRate] (now))
         return;

      // Start

      this [_systemTime] .stop ();
      this [_browserTime] .start ();

      // Time

      this .advanceTime ();
      this .xrFrame (frame);

      // Events

      this .addTaintedField (this ._prepareEvents);
      this [_processEvents] ();

      this .addTaintedField (this ._timeEvents);
      this [_processEvents] ();

      // Camera

      this [_cameraTime] .start ();
      this [_world] .traverse (TraverseType .CAMERA);
      this [_cameraTime] .stop ();

      this .addTaintedField (this ._cameraEvents);
      this [_processEvents] ();

      // Collision

      this [_collisionTime] .start ();

      if (this .getCollisionCount ())
         this [_world] .traverse (TraverseType .COLLISION);

      this [_collisionTime] .stop ();

      // Events

      this .addTaintedField (this ._sensorEvents);
      this [_processEvents] ();

      // Display

      this [_displayTime] .start ()
      this .addTaintedField (this ._displayEvents);
      this [_processEvents] ();

      for (const frameBuffer of this .getFramebuffers ())
         frameBuffer .clear ();

      this [_world] .traverse (TraverseType .DISPLAY);

      this .addTaintedField (this ._finishedEvents);
      this [_processEvents] ();

      for (const frameBuffer of this .getFramebuffers ())
         frameBuffer .blit ();

      this [_displayTime] .stop ();

      this .addTaintedField (this ._endEvents);
      this [_processEvents] ();

      // Finish

      this [_browserTime] .stop ();
      this [_systemTime] .start ();
   },
   getSystemTime ()
   {
      return this [_systemTime];
   },
   getBrowserTime ()
   {
      return this [_browserTime];
   },
   getCameraTime ()
   {
      return this [_cameraTime];
   },
   getCollisionTime ()
   {
      return this [_collisionTime];
   },
   getDisplayTime ()
   {
      return this [_displayTime];
   },
   dispose ()
   {
      browsers .delete (this);

      this [_tainted] = true;

      this .getSession () .cancelAnimationFrame (this [_animFrame]);

      for (const browserContext of browserContexts .slice () .reverse ())
         browserContext .prototype .dispose ?.call (this);

      X3DBaseNode .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DBrowserContext .prototype))
   Object .defineProperty (X3DBrowserContext .prototype, key, { enumerable: false });

Object .assign (X3DBrowserContext,
{
   addComponent ({ name, concreteNodes, abstractNodes, browserContext, external })
   {
      if (concreteNodes)
      {
         for (const ConcreteNode of concreteNodes)
            ConcreteNodes .add (ConcreteNode .typeName, ConcreteNode);
      }

      if (abstractNodes)
      {
         for (const AbstractNode of abstractNodes)
            AbstractNodes .add (AbstractNode .typeName, AbstractNode);
      }

      if (browserContext)
      {
         browserContexts .push (browserContext);

         const keys = Object .keys (browserContext .prototype)
            .filter (k => !k .match (/^(?:initialize|dispose)$/))
            .concat (Object .getOwnPropertySymbols (browserContext .prototype));

         for (const key of keys)
         {
            Object .defineProperty (X3DBrowserContext .prototype, key,
            {
               value: browserContext .prototype [key],
               writable: true,
            });
         }
      }

      for (const browser of browsers)
      {
         if (concreteNodes)
         {
            for (const ConcreteNode of concreteNodes)
               browser .addConcreteNode (ConcreteNode);
         }

         if (abstractNodes)
         {
            for (const AbstractNode of abstractNodes)
               browser .addAbstractNode (AbstractNode);
         }

         if (browserContext)
         {
            browserContext .call (browser);
            browserContext .prototype .initialize ?.call (browser);

            // Process events from context creation. This will setup nodes like
            // geometry option nodes before any node is created.
            browser [_processEvents] ();
         }
      }

      if (external && DEVELOPMENT)
         console .info (`Done loading external component '${name}'.`);
   },
});

export default X3DBrowserContext;
