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
	"x_ite/Components/Core/X3DNode",
	"x_ite/Rendering/X3DRenderObject",
	"x_ite/Components/Layering/X3DViewportNode",
	"x_ite/Execution/BindableStack",
	"x_ite/Execution/BindableList",
	"x_ite/Components/Navigation/NavigationInfo",
	"x_ite/Components/EnvironmentalEffects/Fog",
	"x_ite/Components/EnvironmentalEffects/Background",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          X3DNode,
          X3DRenderObject,
          X3DViewportNode,
          BindableStack,
          BindableList,
          NavigationInfo,
          Fog,
          Background,
          X3DCast,
          TraverseType,
          X3DConstants,
          Camera,
          Vector3,
          Matrix4)
{
"use strict";

	var projectionMatrix = new Matrix4 ();

	function X3DLayerNode (executionContext, defaultViewpoint, groupNode)
	{
		X3DNode         .call (this, executionContext);
		X3DRenderObject .call (this, executionContext);

		this .addType (X3DConstants .X3DLayerNode);

		this .groupNode       = groupNode;
		this .currentViewport = null;

		this .defaultBackground     = new Background (executionContext);
		this .defaultFog            = new Fog (executionContext);
		this .defaultNavigationInfo = new NavigationInfo (executionContext);
		this .defaultViewpoint      = defaultViewpoint;

		this .backgroundStack     = new BindableStack (executionContext, this, this .defaultBackground);
		this .fogStack            = new BindableStack (executionContext, this, this .defaultFog);
		this .navigationInfoStack = new BindableStack (executionContext, this, this .defaultNavigationInfo);
		this .viewpointStack      = new BindableStack (executionContext, this, this .defaultViewpoint);

		this .backgrounds     = new BindableList (executionContext, this, this .defaultBackground)
		this .fogs            = new BindableList (executionContext, this, this .defaultFog);
		this .navigationInfos = new BindableList (executionContext, this, this .defaultNavigationInfo);
		this .viewpoints      = new BindableList (executionContext, this, this .defaultViewpoint);

		this .defaultBackground .setHidden (true);
		this .defaultFog        .setHidden (true);

		this .collisionTime = 0;
	}

	X3DLayerNode .prototype = $.extend (Object .create (X3DNode .prototype),
		X3DRenderObject .prototype,
	{
		constructor: X3DLayerNode,
		layer0: false,
		initialize: function ()
		{
			X3DNode         .prototype .initialize .call (this);
			X3DRenderObject .prototype .initialize .call (this);

			this .groupNode .children_ = this .children_;
			this .groupNode .setPrivate (true);
			this .groupNode .setup ();

			this .defaultNavigationInfo .setup ();
			this .defaultBackground     .setup ();
			this .defaultFog            .setup ();
			this .defaultViewpoint      .setup ();

			this .backgroundStack     .setup ();
			this .fogStack            .setup ();
			this .navigationInfoStack .setup ();
			this .viewpointStack      .setup ();
	
			this .backgrounds     .setup ();
			this .fogs            .setup ();
			this .navigationInfos .setup ();
			this .viewpoints      .setup ();

			this .viewport_       .addInterest ("set_viewport__", this);
			this .addChildren_    .addFieldInterest (this .groupNode .addChildren_);
			this .removeChildren_ .addFieldInterest (this .groupNode .removeChildren_);
			this .children_       .addFieldInterest (this .groupNode .children_);

			this .set_viewport__ ();
		},
		isLayer0: function (value)
		{
			this .layer0 = value;
			this .defaultBackground .setHidden (! value);
		},
		getLayer: function ()
		{
			return this;
		},
		getGroup: function ()
		{
			return this .groupNode;
		},
		getViewport: function ()
		{
			return this .currentViewport;
		},
		getBackground: function ()
		{
			return this .backgroundStack .top ();
		},
		getFog: function ()
		{
			return this .fogStack .top ();
		},
		getNavigationInfo: function ()
		{
			return this .navigationInfoStack .top ();
		},
		getViewpoint: function ()
		{
			return this .viewpointStack .top ();
		},
		getBackgrounds: function ()
		{
			return this .backgrounds;
		},
		getFogs: function ()
		{
			return this .fogs;
		},
		getNavigationInfos: function ()
		{
			return this .navigationInfos;
		},
		getViewpoints: function ()
		{
			return this .viewpoints;
		},
		getUserViewpoints: function ()
		{
			var userViewpoints = [ ];

			for (var i = 0; i < this .viewpoints .get () .length; ++ i)
			{
				var viewpoint = this .viewpoints .get () [i];

				if (viewpoint .description_ .length)
					userViewpoints .push (viewpoint);
			}

			return userViewpoints;
		},
		getBackgroundStack: function ()
		{
			return this .backgroundStack;
		},
		getFogStack: function ()
		{
			return this .fogStack;
		},
		getNavigationInfoStack: function ()
		{
			return this .navigationInfoStack;
		},
		getViewpointStack: function ()
		{
			return this .viewpointStack;
		},
		getBBox: function (bbox)
		{
			return this .groupNode .getBBox (bbox);
		},
		set_viewport__: function ()
		{
			this .currentViewport = X3DCast (X3DConstants .X3DViewportNode, this .viewport_);

			if (! this .currentViewport)
				this .currentViewport = this .getBrowser () .getDefaultViewport ();
		},
		bind: function (viewpointName)
		{
			this .traverse (TraverseType .CAMERA, this);

			// Bind first viewpoint in viewpoint list.

			var
				navigationInfo = this .navigationInfos .getBound (),
				background     = this .backgrounds     .getBound (),
				fog            = this .fogs            .getBound (),
				viewpoint      = this .viewpoints      .getBound (viewpointName);

			this .navigationInfoStack .forcePush (navigationInfo);
			this .backgroundStack     .forcePush (background);
			this .fogStack            .forcePush (fog);
			this .viewpointStack      .forcePush (viewpoint);

			navigationInfo .addLayer (this);
			background     .addLayer (this);
			fog            .addLayer (this);
			viewpoint      .addLayer (this);

			viewpoint .resetUserOffsets ();
		},
		traverse: function (type, renderObject)
		{
			renderObject = renderObject || this;

			var viewpoint = this .getViewpoint ();

			this .getCameraSpaceMatrix        () .pushMatrix (viewpoint .getCameraSpaceMatrix ());
			this .getInverseCameraSpaceMatrix () .pushMatrix (viewpoint .getInverseCameraSpaceMatrix ());
			this .getProjectionMatrix         () .pushMatrix (viewpoint .getProjectionMatrix (this));

			switch (type)
			{
				case TraverseType .POINTER:
					this .pointer (type, renderObject);
					break;
				case TraverseType .CAMERA:
					this .camera (type, renderObject);
					break;
				case TraverseType .COLLISION:
					this .collision (type, renderObject);
					break;
				case TraverseType .DEPTH:
				case TraverseType .DISPLAY:
					this .display (type, renderObject);
					break;
			}

			this .getProjectionMatrix         () .pop ();
			this .getInverseCameraSpaceMatrix () .pop ();
			this .getCameraSpaceMatrix        () .pop ();
		},
		pointer: function (type, renderObject)
		{
			if (this .isPickable_ .getValue ())
			{
				var
					browser  = this .getBrowser (),
					viewport = this .currentViewport .getRectangle (browser);

				if (browser .getSelectedLayer ())
				{
					if (browser .getSelectedLayer () !== this)
						return;
				}
				else
				{
					if (! browser .isPointerInRectangle (viewport))
						return;
				}

				browser .setHitRay (this .getProjectionMatrix () .get (), viewport);
				this .getModelViewMatrix () .pushMatrix (this .getInverseCameraSpaceMatrix () .get ());

				this .currentViewport .push (this);
				this .groupNode .traverse (type, renderObject);
				this .currentViewport .pop (this);

				this .getModelViewMatrix () .pop ()
			}
		},
		camera: function (type, renderObject)
		{
			this .getModelViewMatrix () .pushMatrix (Matrix4 .Identity);
	
			this .currentViewport .push (this);
			this .groupNode .traverse (type, renderObject);
			this .currentViewport .pop (this);

			this .navigationInfos .update ();
			this .backgrounds     .update ();
			this .fogs            .update ();
			this .viewpoints      .update ();

			this .getViewpoint () .update ();

			this .getModelViewMatrix () .pop ()
		},
		collision: function (type, renderObject)
		{
			this .collisionTime = 0;

			var
				navigationInfo  = this .getNavigationInfo (),
				collisionRadius = navigationInfo .getCollisionRadius (),
				avatarHeight    = navigationInfo .getAvatarHeight (),
				size            = Math .max (collisionRadius * 2, avatarHeight * 2);

			Camera .ortho (-size, size, -size, size, -size, size, projectionMatrix);

			this .getProjectionMatrix () .pushMatrix (projectionMatrix);
			this .getModelViewMatrix  () .pushMatrix (this .getInverseCameraSpaceMatrix () .get ());
	
			// Render
			this .currentViewport .push (this);
			renderObject .render (type, this .groupNode);
			this .currentViewport .pop (this);

			this .getModelViewMatrix  () .pop ()
			this .getProjectionMatrix () .pop ()
		},
		display: function (type, renderObject)
		{
			this .getNavigationInfo () .enable (type, renderObject);

			this .getModelViewMatrix () .pushMatrix (this .getInverseCameraSpaceMatrix () .get ());

			this .currentViewport .push (this);
			renderObject .render (type, this .groupNode);
			this .currentViewport .pop (this);

			this .getModelViewMatrix () .pop ()
		},
	});

	return X3DLayerNode;
});


