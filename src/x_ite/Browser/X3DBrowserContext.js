/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x_ite/Fields/SFTime",
	"x_ite/Base/X3DObject",
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Browser/Core/X3DCoreContext",
	"x_ite/Routing/X3DRoutingContext",
	"x_ite/Browser/Scripting/X3DScriptingContext",
	"x_ite/Browser/Networking/X3DNetworkingContext",
	"x_ite/Browser/Shaders/X3DShadersContext",
	"x_ite/Browser/Rendering/X3DRenderingContext",
	"x_ite/Browser/Shape/X3DShapeContext",
	"x_ite/Browser/Grouping/X3DGroupingContext",
	"x_ite/Browser/Geometry3D/X3DGeometry3DContext",
	"x_ite/Browser/PointingDeviceSensor/X3DPointingDeviceSensorContext",
	"x_ite/Browser/Navigation/X3DNavigationContext",
	"x_ite/Browser/Layering/X3DLayeringContext",
	"x_ite/Browser/EnvironmentalEffects/X3DEnvironmentalEffectsContext",
	"x_ite/Browser/Lighting/X3DLightingContext",
	"x_ite/Browser/Picking/X3DPickingContext",
	"x_ite/Browser/Sound/X3DSoundContext",
	"x_ite/Browser/Text/X3DTextContext",
	"x_ite/Browser/Texturing/X3DTexturingContext",
	"x_ite/Browser/Time/X3DTimeContext",
	"x_ite/Execution/World",
	"x_ite/Bits/TraverseType",
],
function ($,
          SFTime,
          X3DObject,
          X3DBaseNode,
          X3DCoreContext,
          X3DRoutingContext,
          X3DScriptingContext,
          X3DNetworkingContext,
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
          X3DTextContext,
          X3DTexturingContext,
          X3DTimeContext,
          World,
          TraverseType)
{
"use strict";

	const contexts = [ ];

	function X3DBrowserContext (element)
	{
		X3DBaseNode                    .call (this, this);
		X3DRoutingContext              .call (this);
		X3DCoreContext                 .call (this, element);
		X3DScriptingContext            .call (this);
		X3DNetworkingContext           .call (this);
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
		X3DTextContext                 .call (this);
		X3DTexturingContext            .call (this);
		X3DTimeContext                 .call (this);

		contexts .forEach (function (context) { context .call (this); }, this);

		this .addChildObjects ("initialized",   new SFTime (),
		                       "shutdown",      new SFTime (),
		                       "prepareEvents", new SFTime (),
		                       "timeEvents",    new SFTime (),
		                       "sensorEvents",  new SFTime (),
		                       "finished",      new SFTime ());

		this .changedTime     = 0;
		this .renderCallback  = this .traverse .bind (this);
		this .systemTime      = 0;
		this .systemStartTime = 0;
		this .browserTime     = 0;
		this .cameraTime      = 0;
		this .collisionTime   = 0;
		this .displayTime     = 0;
	};

	X3DBrowserContext .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
		X3DRoutingContext .prototype,
		X3DCoreContext .prototype,
		X3DScriptingContext .prototype,
		X3DNetworkingContext .prototype,
		X3DShadersContext .prototype,
		X3DRenderingContext .prototype,
		X3DShapeContext .prototype,
		X3DGroupingContext .prototype,
		X3DGeometry3DContext .prototype,
		X3DPointingDeviceSensorContext .prototype,
		X3DNavigationContext .prototype,
		X3DLayeringContext .prototype,
		X3DEnvironmentalEffectsContext .prototype,
		X3DLightingContext .prototype,
		X3DPickingContext .prototype,
		X3DSoundContext .prototype,
		X3DTextContext .prototype,
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
			X3DTextContext                 .prototype .initialize .call (this);
			X3DTexturingContext            .prototype .initialize .call (this);
			X3DTimeContext                 .prototype .initialize .call (this);

			contexts .forEach (function (context)
			{
				if (context .prototype .initialize)
					context .prototype .initialize .call (this);
			}
			.bind (this));
		},
		initialized: function ()
		{
			return this .initialized_;
		},
		shutdown: function ()
		{
			return this .shutdown_;
		},
		prepareEvents: function ()
		{
			return this .prepareEvents_;
		},
		timeEvents: function ()
		{
			return this .timeEvents_;
		},
		sensorEvents: function ()
		{
			return this .sensorEvents_;
		},
		finished: function ()
		{
			return this .finished_;
		},
		getBrowser: function ()
		{
			return this;
		},
		getWorld: function ()
		{
			return this .world;
		},
		setExecutionContext: function (executionContext)
		{
			this .world = new World (executionContext);
			this .world .setup ();
		},
		getExecutionContext: function ()
		{
			return this .world .getExecutionContext ();
		},
		addBrowserEvent: function ()
		{
			if (this .changedTime === this .getCurrentTime ())
				return;

			this .changedTime = this .getCurrentTime ();

			this .requestAnimationFrame ();
		},
		requestAnimationFrame: function ()
		{
			window .requestAnimationFrame (this .renderCallback);
		},
		traverse: function (time)
		{
			const gl = this .getContext ();

			const t0 = performance .now ();
			this .systemTime = t0 - this .systemStartTime;
			this .advanceTime (time);

			this .prepareEvents_ .processInterests ();
			this .processEvents ();

			this .timeEvents_ .processInterests ();
			this .processEvents ();

			const t1 = performance .now ();
			this .world .traverse (TraverseType .CAMERA, null);
			this .cameraTime = performance .now () - t1;

			const t2 = performance .now ();
			if (this .getCollisionCount ())
				this .world .traverse (TraverseType .COLLISION, null);
			this .collisionTime = performance .now () - t2;

			this .sensorEvents_ .processInterests ();
			this .processEvents ();

			// XXX: The depth buffer must be cleared here, although it is cleared in each layer, otherwise there is a
			// XXX: phantom image in the depth buffer at least in Firefox.

			const t3 = performance .now ();
			gl .clearColor (0, 0, 0, 0);
			gl .clear (gl .COLOR_BUFFER_BIT);
			this .world .traverse (TraverseType .DISPLAY, null);
			this .displayTime = performance .now () - t3;

			this .browserTime     = performance .now () - t0;
			this .systemStartTime = performance .now ();

			this .finished_ .processInterests ();
		},
		toStream: X3DObject .prototype .toStream,
	});

	Object .assign (X3DBrowserContext,
	{
		addContext: function (context)
		{
			const X3D = require ("x_ite/X3D");

			contexts .push (context);

			Object .assign (X3DBrowserContext .prototype, context .prototype);

			$("X3DCanvas") .each (function (i, canvas)
			{
				const browser = X3D .getBrowser (canvas);

				context .call (browser);

				if (context .prototype .initialize)
					context .prototype .initialize .call (browser);
			});
		},
	});

	return X3DBrowserContext;
});
