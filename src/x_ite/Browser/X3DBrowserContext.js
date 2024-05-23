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
   _world           = Symbol (),
   _tainted         = Symbol (),
   _limitFrameRate  = Symbol (),
   _traverse        = Symbol (),
   _renderCallback  = Symbol (),
   _previousTime    = Symbol (),
   _systemTime      = Symbol (),
   _browserTime     = Symbol (),
   _cameraTime      = Symbol (),
   _collisionTime   = Symbol (),
   _displayTime     = Symbol (),
   _processEvents   = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

const
   browsers        = new Set (),
   browserContexts = [ ];

function X3DBrowserContext (element)
{
   X3DBaseNode                    .call (this, this);
   X3DRoutingContext              .call (this);
   X3DScriptingContext            .call (this);
   X3DCoreContext                 .call (this, element);
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

   browsers .add (this);

   for (const browserContext of browserContexts)
      browserContext .call (this);

   this .addChildObjects (X3DConstants .outputOnly, "initialized",    new SFTime (),
                          X3DConstants .outputOnly, "shutdown",       new SFTime (),
                          X3DConstants .outputOnly, "prepareEvents",  new SFTime (),
                          X3DConstants .outputOnly, "timeEvents",     new SFTime (),
                          X3DConstants .outputOnly, "sensorEvents",   new SFTime (),
                          X3DConstants .outputOnly, "displayEvents",  new SFTime (),
                          X3DConstants .outputOnly, "finishedEvents", new SFTime ());

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
   initialize ()
   {
      X3DBaseNode                    .prototype .initialize ?.call (this);
      X3DRoutingContext              .prototype .initialize ?.call (this);
      X3DScriptingContext            .prototype .initialize ?.call (this);
      X3DCoreContext                 .prototype .initialize ?.call (this);
      X3DNetworkingContext           .prototype .initialize ?.call (this);
      X3DTexturingContext            .prototype .initialize ?.call (this);
      X3DShadersContext              .prototype .initialize ?.call (this);
      X3DRenderingContext            .prototype .initialize ?.call (this);
      X3DShapeContext                .prototype .initialize ?.call (this);
      X3DGroupingContext             .prototype .initialize ?.call (this);
      X3DGeometry3DContext           .prototype .initialize ?.call (this);
      X3DPointingDeviceSensorContext .prototype .initialize ?.call (this);
      X3DNavigationContext           .prototype .initialize ?.call (this);
      X3DLayeringContext             .prototype .initialize ?.call (this);
      X3DEnvironmentalEffectsContext .prototype .initialize ?.call (this);
      X3DLightingContext             .prototype .initialize ?.call (this);
      X3DPickingContext              .prototype .initialize ?.call (this);
      X3DSoundContext                .prototype .initialize ?.call (this);
      X3DTimeContext                 .prototype .initialize ?.call (this);

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
      this [_world] = new X3DWorld (executionContext);
      this [_world] .setup ();
   },
   addBrowserEvent ()
   {
      if (this [_tainted])
         return;

      this [_tainted] = true;

      requestAnimationFrame (this [_renderCallback]);
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
         requestAnimationFrame (this [_renderCallback]);

         return true;
      }
   },
   [_traverse] (now)
   {
      // Limit frame rate.

      if (this [_limitFrameRate] (now))
         return;

      // Start

      this [_systemTime] .stop ();
      this [_browserTime] .start ();

      // time

      this .advanceTime ();

      // Events

      this .addTaintedField (this ._prepareEvents);
      this [_processEvents] ();

      this .addTaintedField (this ._timeEvents);
      this [_processEvents] ();

      // Camera

      this [_cameraTime] .start ();
      this [_world] .traverse (TraverseType .CAMERA);
      this [_cameraTime] .stop ();

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

      this .getFrameBuffer () .clear ();
      this [_world] .traverse (TraverseType .DISPLAY);

      this .addTaintedField (this ._finishedEvents);
      this [_processEvents] ();

      this .getFrameBuffer () .blit ();
      this [_displayTime] .stop ();

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

      for (const browserContext of browserContexts)
         browserContext .prototype .dispose ?.call (this);

      X3DTimeContext                 .prototype .dispose ?.call (this);
      X3DSoundContext                .prototype .dispose ?.call (this);
      X3DPickingContext              .prototype .dispose ?.call (this);
      X3DLightingContext             .prototype .dispose ?.call (this);
      X3DEnvironmentalEffectsContext .prototype .dispose ?.call (this);
      X3DLayeringContext             .prototype .dispose ?.call (this);
      X3DNavigationContext           .prototype .dispose ?.call (this);
      X3DPointingDeviceSensorContext .prototype .dispose ?.call (this);
      X3DGeometry3DContext           .prototype .dispose ?.call (this);
      X3DGroupingContext             .prototype .dispose ?.call (this);
      X3DShapeContext                .prototype .dispose ?.call (this);
      X3DRenderingContext            .prototype .dispose ?.call (this);
      X3DShadersContext              .prototype .dispose ?.call (this);
      X3DTexturingContext            .prototype .dispose ?.call (this);
      X3DNetworkingContext           .prototype .dispose ?.call (this);
      X3DCoreContext                 .prototype .dispose ?.call (this);
      X3DScriptingContext            .prototype .dispose ?.call (this);
      X3DRoutingContext              .prototype .dispose ?.call (this);
      X3DBaseNode                    .prototype .dispose ?.call (this);
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
