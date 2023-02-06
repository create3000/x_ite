/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import SFTime                         from "../Fields/SFTime.js";
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
import X3DWorld                       from "../Execution/X3DWorld.js";
import TraverseType                   from "../Rendering/TraverseType.js";

const
   _world           = Symbol (),
   _changedTime     = Symbol (),
   _limitFrameRate  = Symbol (),
   _traverse        = Symbol (),
   _renderCallback  = Symbol (),
   _previousTime    = Symbol (),
   _systemTime      = Symbol (),
   _systemStartTime = Symbol (),
   _browserTime     = Symbol (),
   _cameraTime      = Symbol (),
   _collisionTime   = Symbol (),
   _displayTime     = Symbol (),
   _processEvents   = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

const browserContexts = [ ];

function X3DBrowserContext (element)
{
   X3DBaseNode                    .call (this, this);
   X3DRoutingContext              .call (this);
   X3DCoreContext                 .call (this, element);
   X3DScriptingContext            .call (this);
   X3DNetworkingContext           .call (this);
   X3DTexturingContext            .call (this);
   X3DShadersContext              .call (this);
   X3DRenderingContext            .call (this);
   X3DShapeContext                .call (this);
   X3DGroupingContext             .call (this);
   X3DGeometry3DContext           .call (this);
   X3DPointingDeviceSensorContext .call (this);
   X3DNavigationContext           .call (this);
   X3DLayeringContext             .call (this);
   X3DEnvironmentalEffectsContext .call (this);
   X3DLightingContext             .call (this);
   X3DPickingContext              .call (this);
   X3DSoundContext                .call (this);
   X3DTimeContext                 .call (this);

   for (const browserContext of browserContexts)
      browserContext .call (this);

   this .addChildObjects ("initialized",   new SFTime (),
                          "shutdown",      new SFTime (),
                          "prepareEvents", new SFTime (),
                          "timeEvents",    new SFTime (),
                          "sensorEvents",  new SFTime (),
                          "finished",      new SFTime ());

   this [_changedTime]     = 0;
   this [_previousTime]    = 0;
   this [_renderCallback]  = this [_traverse] .bind (this);
   this [_systemTime]      = 0;
   this [_systemStartTime] = 0;
   this [_browserTime]     = 0;
   this [_cameraTime]      = 0;
   this [_collisionTime]   = 0;
   this [_displayTime]     = 0;
};

X3DBrowserContext .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   X3DCoreContext .prototype,
   X3DEnvironmentalEffectsContext .prototype,
   X3DGeometry3DContext .prototype,
   X3DGroupingContext .prototype,
   X3DLayeringContext .prototype,
   X3DLightingContext .prototype,
   X3DNavigationContext .prototype,
   X3DNetworkingContext .prototype,
   X3DPickingContext .prototype,
   X3DPointingDeviceSensorContext .prototype,
   X3DRenderingContext .prototype,
   X3DRoutingContext .prototype,
   X3DScriptingContext .prototype,
   X3DShadersContext .prototype,
   X3DShapeContext .prototype,
   X3DSoundContext .prototype,
   X3DTexturingContext .prototype,
   X3DTimeContext .prototype,
{
   constructor: X3DBrowserContext,
   initialize: function ()
   {
      X3DBaseNode                    .prototype .initialize .call (this);
      X3DRoutingContext              .prototype .initialize .call (this);
      X3DCoreContext                 .prototype .initialize .call (this);
      X3DScriptingContext            .prototype .initialize .call (this);
      X3DNetworkingContext           .prototype .initialize .call (this);
      X3DTexturingContext            .prototype .initialize .call (this);
      X3DShadersContext              .prototype .initialize .call (this);
      X3DRenderingContext            .prototype .initialize .call (this);
      X3DShapeContext                .prototype .initialize .call (this);
      X3DGroupingContext             .prototype .initialize .call (this);
      X3DGeometry3DContext           .prototype .initialize .call (this);
      X3DPointingDeviceSensorContext .prototype .initialize .call (this);
      X3DNavigationContext           .prototype .initialize .call (this);
      X3DLayeringContext             .prototype .initialize .call (this);
      X3DEnvironmentalEffectsContext .prototype .initialize .call (this);
      X3DLightingContext             .prototype .initialize .call (this);
      X3DPickingContext              .prototype .initialize .call (this);
      X3DSoundContext                .prototype .initialize .call (this);
      X3DTimeContext                 .prototype .initialize .call (this);

      for (const browserContext of browserContexts)
      {
         if (typeof browserContext .prototype .initialize === "function")
            browserContext .prototype .initialize .call (this);
      }

      // Process events from context creation. This will setup nodes like
      // geometry option nodes before any node is created.
      return this [_processEvents];
   },
   initialized: function ()
   {
      return this ._initialized;
   },
   shutdown: function ()
   {
      return this ._shutdown;
   },
   prepareEvents: function ()
   {
      return this ._prepareEvents;
   },
   timeEvents: function ()
   {
      return this ._timeEvents;
   },
   sensorEvents: function ()
   {
      return this ._sensorEvents;
   },
   finished: function ()
   {
      return this ._finished;
   },
   getBrowser: function ()
   {
      return this;
   },
   getWorld: function ()
   {
      return this [_world];
   },
   getExecutionContext: function ()
   {
      return this [_world] .getExecutionContext ();
   },
   setExecutionContext: function (executionContext)
   {
      this [_world] = new X3DWorld (executionContext);
      this [_world] .setup ();
   },
   addBrowserEvent: function ()
   {
      if (this [_changedTime] === this .getCurrentTime ())
         return;

      this [_changedTime] = this .getCurrentTime ();

      requestAnimationFrame (this [_renderCallback]);
   },
   [_limitFrameRate]: function (now)
   {
      if (now === this [_previousTime])
      {
         requestAnimationFrame (this [_renderCallback]);

         return true;
      }
      else
      {
         this [_previousTime] = now;

         return false;
      }
   },
   [_traverse]: function (now)
   {
      // Limit frame rate.

      if (this [_limitFrameRate] (now))
         return;

      // Start rendering.

      const gl = this .getContext ();

      const t0 = Date .now ();
      this [_systemTime] = t0 - this [_systemStartTime];
      this .advanceTime ();

      this ._prepareEvents .processInterests ();
      this [_processEvents] ();

      this ._timeEvents .processInterests ();
      this [_processEvents] ();

      const t1 = Date .now ();
      this [_world] .traverse (TraverseType .CAMERA, null);
      this [_cameraTime] = Date .now () - t1;

      const t2 = Date .now ();
      if (this .getCollisionCount ())
         this [_world] .traverse (TraverseType .COLLISION, null);
      this [_collisionTime] = Date .now () - t2;

      this ._sensorEvents .processInterests ();
      this [_processEvents] ();

      const t3 = Date .now ();
      this .getFrameBuffer () .bind ();
      gl .clearColor (0, 0, 0, 0);
      gl .clear (gl .COLOR_BUFFER_BIT);
      this [_world] .traverse (TraverseType .DISPLAY, null);
      this .getFrameBuffer () .blit ();
      this [_displayTime] = Date .now () - t3;

      this [_browserTime]     = Date .now () - t0;
      this [_systemStartTime] = Date .now ();

      this ._finished .processInterests ();
   },
   getSystemTime: function ()
   {
      return this [_systemTime];
   },
   getBrowserTime: function ()
   {
      return this [_browserTime];
   },
   getCameraTime: function ()
   {
      return this [_cameraTime];
   },
   getCollisionTime: function ()
   {
      return this [_collisionTime];
   },
   getDisplayTime: function ()
   {
      return this [_displayTime];
   },
});

for (const key of Reflect .ownKeys (X3DBrowserContext .prototype))
   Object .defineProperty (X3DBrowserContext .prototype, key, { enumerable: false });

Object .assign (X3DBrowserContext,
{
   addBrowserContext: function (browserContext)
   {
      browserContexts .push (browserContext);

      const keys = Object .keys (browserContext .prototype)
         .filter (k => ! k .match (/^(initialize|dispose)$/))
         .concat (Object .getOwnPropertySymbols (browserContext .prototype));

      for (const key of keys)
      {
         Object .defineProperty (X3DBrowserContext .prototype, key,
         {
            value: browserContext .prototype [key],
            enumerable: false,
            writable: true,
         });
      }

      $("x3d-canvas, X3DCanvas") .each (function (_, canvas)
      {
         const
            X3D     = window [Symbol .for ("X_ITE.X3D")],
            browser = X3D .getBrowser (canvas);

         if (! browser)
            return;

         browserContext .call (browser);

         if (typeof browserContext .prototype .initialize === "function")
            browserContext .prototype .initialize .call (browser);

         // Process events from context creation. This will setup nodes like
         // geometry option nodes before any node is created.
         browser [_processEvents] ();
      });
   },
});

export default X3DBrowserContext;
