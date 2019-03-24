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
	"x_ite/Fields",
	"x_ite/Browser/Navigation/ExamineViewer",
	"x_ite/Browser/Navigation/WalkViewer",
	"x_ite/Browser/Navigation/FlyViewer",
	"x_ite/Browser/Navigation/PlaneViewer",
	"x_ite/Browser/Navigation/NoneViewer",
	"x_ite/Browser/Navigation/LookAtViewer",
	"x_ite/Components/Lighting/DirectionalLight",
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
		this .addChildObjects ("activeLayer",          new Fields .SFNode (),
		                       "activeNavigationInfo", new Fields .SFNode (),
		                       "activeViewpoint",      new Fields .SFNode (),
		                       "availableViewers",     new Fields .MFString (),
		                       "viewer",               new Fields .SFString ("EXAMINE"));
		
		this .activeCollisions = new Set ();
		this .viewerNode       = new NoneViewer (this);
	}

	X3DNavigationContext .prototype =
	{
		initialize: function ()
		{
			this .viewer_ .addInterest ("set_viewer__", this);

			this .initialized () .addInterest ("set_world__",    this);
			this .shutdown ()    .addInterest ("remove_world__", this);

			this .headlightContainer = getHeadLight (this);
			this .viewerNode .setup ();
		},
		getHeadlight: function ()
		{
			return this .headlightContainer;
		},
		getActiveLayer: function ()
		{
			return this .activeLayer_ .getValue ();
		},
		getActiveNavigationInfo: function ()
		{
			return this .activeNavigationInfo_ .getValue ();
		},
		getActiveViewpoint: function ()
		{
			return this .activeViewpoint_ .getValue ();
		},
		getCurrentViewer: function ()
		{
			return this .viewer_ .getValue ();
		},
		getViewer: function ()
		{
			return this .viewerNode;
		},
		addCollision: function (object)
		{
			this .activeCollisions .add (object);
		},
		removeCollision: function (object)
		{
			this .activeCollisions .delete (object);
		},
		getCollisionCount: function ()
		{
			return this .activeCollisions .size;
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
			if (this .activeLayer_ .getValue ())
			{
				this .activeLayer_ .getValue () .getNavigationInfoStack () .removeInterest ("set_activeNavigationInfo__", this);
				this .activeLayer_ .getValue () .getViewpointStack ()      .removeInterest ("set_activeViewpoint__",      this);
			}

			this .activeLayer_ = this .getWorld () .getActiveLayer ();

			if (this .activeLayer_ .getValue ())
			{
				this .activeLayer_ .getValue () .getNavigationInfoStack () .addInterest ("set_activeNavigationInfo__", this);
				this .activeLayer_ .getValue () .getViewpointStack ()      .addInterest ("set_activeViewpoint__",      this);
			}

			this .set_activeNavigationInfo__ ();
			this .set_activeViewpoint__ ();
		},
		set_activeNavigationInfo__: function ()
		{
			if (this .activeNavigationInfo_ .getValue ())
				this .activeNavigationInfo_ .getValue () .viewer_ .removeFieldInterest (this .viewer_);

			if (this .activeLayer_ .getValue ())
			{
				this .activeNavigationInfo_ = this .activeLayer_ .getValue () .getNavigationInfo ();
	
				this .activeNavigationInfo_ .getValue () .viewer_ .addFieldInterest (this .viewer_);
	
				this .viewer_ = this .activeNavigationInfo_ .getValue () .viewer_;
			}
			else
			{
				this .activeNavigationInfo_ = null;
				this .viewer_               = "NONE";
			}
		},
		set_activeViewpoint__: function ()
		{
			if (this .activeLayer_ .getValue ())
				this .activeViewpoint_ = this .activeLayer_ .getValue () .getViewpoint ();
			else
				this .activeViewpoint_ = null;
		},
		set_viewer__: function (viewer)
		{
			if (this .activeNavigationInfo_ .getValue ())
				this .availableViewers_ = this .activeNavigationInfo_ .getValue () .availableViewers_;
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
