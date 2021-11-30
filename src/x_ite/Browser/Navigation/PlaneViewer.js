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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Navigation/X3DViewer",
	"x_ite/Components/Navigation/Viewpoint",
	"standard/Math/Numbers/Vector3",
	"jquery-mousewheel",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DConstants,
          X3DViewer,
          Viewpoint,
          Vector3)
{
"use strict";

	var macOS = /Mac OS X/i .test (navigator .userAgent)

	var SCROLL_FACTOR = macOS ? 1 / 160 : 1 / 20;

	var
		vector                 = new Vector3 (0 ,0, 0),
		positionOffset         = new Vector3 (0 ,0, 0),
		centerOfRotationOffset = new Vector3 (0, 0, 0);

	function PlaneViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		this .button    = -1;
		this .fromPoint = new Vector3 (0, 0, 0);
		this .toPoint   = new Vector3 (0, 0, 0);
	}

	PlaneViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
	{
		constructor: PlaneViewer,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .outputOnly, "isActive", new Fields .SFBool ()),
		]),
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			var
			   browser = this .getBrowser (),
			   element = browser .getSurface ();

			element .bind ("mousedown.PlaneViewer",  this .mousedown  .bind (this));
			element .bind ("mouseup.PlaneViewer",    this .mouseup    .bind (this));
			element .bind ("mousemove.PlaneViewer",  this .mousemove  .bind (this));
			element .bind ("mousewheel.PlaneViewer", this .mousewheel .bind (this));
		},
		mousedown: function (event)
		{
			if (this .button >= 0)
				return;

			this .pressTime = performance .now ();

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .getButton (event .button))
			{
				case 1:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					this .getBrowser () .getSurface () .unbind ("mousemove.PlaneViewer");
					$(document) .bind ("mouseup.PlaneViewer"   + this .getId (), this .mouseup .bind (this));
					$(document) .bind ("mousemove.PlaneViewer" + this .getId (), this .mousemove .bind (this));

					this .getActiveViewpoint () .transitionStop ();
					this .getBrowser () .setCursor ("MOVE");

					this .getPointOnCenterPlane (x, y, this .fromPoint);

					this .isActive_ = true;
					break;
				}
			}
		},
		mouseup: function (event)
		{
			// Stop event propagation.

			event .preventDefault ();
			event .stopImmediatePropagation ();

			if (event .button !== this .button)
				return;

			this .button = -1;

			$(document) .unbind (".PlaneViewer" + this .getId ());
			this .getBrowser () .getSurface () .bind ("mousemove.PlaneViewer", this .mousemove .bind (this));

			this .getBrowser () .setCursor ("DEFAULT");

			this .isActive_ = false;
		},
		mousemove: function (event)
		{
			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .getButton (this .button))
			{
				case 1:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					// Move.

					var
						viewpoint   = this .getActiveViewpoint (),
						toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
						translation = viewpoint .getUserOrientation () .multVecRot (this .fromPoint .subtract (toPoint));

					viewpoint .positionOffset_         = positionOffset         .assign (viewpoint .positionOffset_         .getValue ()) .add (translation);
					viewpoint .centerOfRotationOffset_ = centerOfRotationOffset .assign (viewpoint .centerOfRotationOffset_ .getValue ()) .add (translation);

					this .fromPoint .assign (toPoint);
					break;
				}
			}
		},
		mousewheel: function (event)
		{
			// Stop event propagation.

			event .preventDefault ();
			event .stopImmediatePropagation ();

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			// Change viewpoint position.

			var
				viewpoint = this .getActiveViewpoint (),
				fromPoint = this .getPointOnCenterPlane (x, y, this .fromPoint);

			viewpoint .transitionStop ();

			if (event .deltaY > 0) // Move backwards.
			{
				viewpoint .fieldOfViewScale_ = Math .max (0.00001, viewpoint .fieldOfViewScale_ .getValue () * (1 - SCROLL_FACTOR));
			}
			else if (event .deltaY < 0) // Move forwards.
			{
				viewpoint .fieldOfViewScale_ = viewpoint .fieldOfViewScale_ .getValue () * (1 + SCROLL_FACTOR);

				this .constrainFieldOfViewScale ();
			}

			if (viewpoint .set_fieldOfView___)
				viewpoint .set_fieldOfView___ (); // XXX: Immediately apply fieldOfViewScale;

			var
				toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
				translation = viewpoint .getUserOrientation () .multVecRot (vector .assign (fromPoint) .subtract (toPoint));

			viewpoint .positionOffset_         = positionOffset         .assign (viewpoint .positionOffset_         .getValue ()) .add (translation);
			viewpoint .centerOfRotationOffset_ = centerOfRotationOffset .assign (viewpoint .centerOfRotationOffset_ .getValue ()) .add (translation);
		},
		constrainFieldOfViewScale: function ()
		{
			var viewpoint = this .getActiveViewpoint ();

			if (viewpoint instanceof Viewpoint || viewpoint .getTypeName () === "GeoViewpoint")
			{
				if (viewpoint .fieldOfView_ .getValue () * viewpoint .fieldOfViewScale_ .getValue () >= Math .PI)
					viewpoint .fieldOfViewScale_ = (Math .PI - 0.001) / viewpoint .fieldOfView_ .getValue ();
			}
		},
		dispose: function ()
		{
			this .getBrowser () .getSurface () .unbind (".PlaneViewer");
			$(document) .unbind (".PlaneViewer" + this .getId ());
		},
	});

	return PlaneViewer;
});
