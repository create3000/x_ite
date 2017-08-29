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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"x-ite/Fields",
	"x-ite/Browser/Navigation/ExamineViewer",
	"x-ite/Browser/Navigation/WalkViewer",
	"x-ite/Browser/Navigation/FlyViewer",
	"x-ite/Browser/Navigation/PlaneViewer",
	"x-ite/Browser/Navigation/NoneViewer",
	"x-ite/Browser/Navigation/LookAtViewer",
	"x-ite/Components/Lighting/DirectionalLight",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          ExamineViewer,
          WalkViewer,
          FlyViewer,
          PlaneViewer,
          NoneViewer,
          LookAtViewer,
          DirectionalLight,
          Matrix4)
{
"use strict";
	
	function getHeadLight (browser)
	{
		var light = new DirectionalLight (browser .getPrivateScene ());

		light .setup ();

		var headlightContainer = light .getLights () .pop ();

		headlightContainer .set (browser, light, null, Matrix4 .Identity);
		headlightContainer .dispose = function () { };

		return headlightContainer;
	};

	function X3DNavigationContext ()
	{
		this .addChildObjects ("availableViewers", new Fields .MFString (),
		                       "viewer",           new Fields .SFString ("EXAMINE"));
		
		this .activeCollisions   = { };
		this .collisionCount     = 0;
		this .activeLayerNode    = null;
		this .navigationInfoNode = null;
		this .viewerNode         = null;
	}

	X3DNavigationContext .prototype =
	{
		initialize: function ()
		{
			this .viewer_ .addInterest ("set_viewer__", this);

			this .initialized () .addInterest ("set_world__", this);
			this .shutdown ()    .addInterest ("remove_world__", this);

			this .headlightContainer = getHeadLight (this);
		},
		getHeadlight: function ()
		{
			return this .headlightContainer;
		},
		getActiveLayer: function ()
		{
			return this .activeLayerNode;
		},
		getCurrentViewer: function ()
		{
			return this .viewer_ .getValue ();
		},
		addCollision: function (object)
		{
			if (this .activeCollisions .hasOwnProperty (object .getId ()))
				return;

			this .activeCollisions [object .getId ()] = true;

			++ this .collisionCount;
		},
		removeCollision: function (object)
		{
			if (! this .activeCollisions .hasOwnProperty (object .getId ()))
				return;

			delete this .activeCollisions [object .getId ()];

			-- this .collisionCount;
		},
		getCollisionCount: function ()
		{
			return this .collisionCount;
		},
		remove_world__: function ()
		{
			this .getWorld () .activeLayer_ .removeInterest ("set_activeLayer__", this);
		},
		set_world__: function ()
		{
			this .getWorld () .activeLayer_ .addInterest ("set_activeLayer__", this);

			this .set_activeLayer__ ();
		},
		set_activeLayer__: function ()
		{
			if (this .activeLayerNode)
				this .activeLayerNode .getNavigationInfoStack () .removeInterest ("set_navigationInfo__", this);

			this .activeLayerNode = this .getWorld () .getActiveLayer ();

			if (this .activeLayerNode)
				this .activeLayerNode .getNavigationInfoStack () .addInterest ("set_navigationInfo__", this);

			this .set_navigationInfo__ ();
		},
		set_navigationInfo__: function ()
		{
			if (this .navigationInfoNode)
				this .navigationInfoNode .viewer_ .removeFieldInterest (this .viewer_);

			if (! this .activeLayerNode)
			{
				this .navigationInfoNode = null;

				this .viewer_ = "NONE";
				return;
			}

			this .navigationInfoNode = this .activeLayerNode .getNavigationInfo ();

			this .navigationInfoNode .viewer_ .addFieldInterest (this .viewer_);

			this .viewer_ = this .navigationInfoNode .viewer_;
		},
		set_viewer__: function (viewer)
		{
			if (this .navigationInfoNode)
				this .availableViewers_ = this .navigationInfoNode .availableViewers_;
			else
				this .availableViewers_ .length = 0;

			// Create viewer node.

			if (this .viewerNode)
				this .viewerNode .dispose ();

			switch (viewer .getValue ())
			{
				case "EXAMINE":
					this .viewerNode = new ExamineViewer (this);
					break;
				case "WALK":
					this .viewerNode = new WalkViewer (this);
					break;
				case "FLY":
					this .viewerNode = new FlyViewer (this);
					break;
				case "PLANE":
				case "PLANE_create3000.de":
					this .viewerNode = new PlaneViewer (this);
					break;
				case "NONE":
					this .viewerNode = new NoneViewer (this);
					break;
				case "LOOKAT":
					this .viewerNode = new LookAtViewer (this);
					break;
				default:
					this .viewerNode = new ExamineViewer (this);
					break;
			}

			this .viewerNode .setup ();
		},
	};

	return X3DNavigationContext;
});
