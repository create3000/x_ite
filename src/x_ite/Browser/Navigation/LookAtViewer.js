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
	"x_ite/Components/Followers/PositionChaser",
	"x_ite/Components/Followers/OrientationChaser",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DConstants,
          X3DViewer,
          PositionChaser,
          OrientationChaser,
          Vector2,
          Vector3,
          Rotation4)
{
"use strict";

	var macOS = /Mac OS X/i .test (navigator .userAgent)

	var
		SCROLL_FACTOR = macOS ? 1 / 120 : 1 / 20,
		MOVE_TIME     = 0.3,
		ROTATE_TIME   = 0.3;

	function LookAtViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		this .button                 = -1;
		this .fromVector             = new Vector3 (0, 0, 0);
		this .toVector               = new Vector3 (0, 0, 0);

		this .touch1                 = new Vector2 (0, 0);
		this .touch2                 = new Vector2 (0, 0);
		this .tapStart               = 0;
		this .dblTapInterval         = 0.4;

		this .positionChaser         = new PositionChaser (executionContext);
		this .centerOfRotationChaser = new PositionChaser (executionContext);
		this .orientationChaser      = new OrientationChaser (executionContext);
	}

	LookAtViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
	{
		constructor: LookAtViewer,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .outputOnly, "isActive", new Fields .SFBool ()),
		]),
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			var
			   browser = this .getBrowser (),
			   element = browser .getSurface ();

			// Bind pointing device events.

			element .bind ("mousedown.LookAtViewer",  this .mousedown  .bind (this));
			element .bind ("mouseup.LookAtViewer",    this .mouseup    .bind (this));
			element .bind ("dblclick.LookAtViewer",   this .dblclick   .bind (this));
			element .bind ("mousewheel.LookAtViewer", this .mousewheel .bind (this));

			element .bind ("touchstart.LookAtViewer", this .touchstart .bind (this));
			element .bind ("touchend.LookAtViewer",   this .touchend   .bind (this));

			// Setup chaser.

			this .positionChaser .duration_ = MOVE_TIME;
			this .positionChaser .setPrivate (true);
			this .positionChaser .setup ();

			this .centerOfRotationChaser .duration_ = MOVE_TIME;
			this .centerOfRotationChaser .setPrivate (true);
			this .centerOfRotationChaser .setup ();

			this .orientationChaser .duration_ = ROTATE_TIME;
			this .orientationChaser .setPrivate (true);
			this .orientationChaser .setup ();
		},
		mousedown: function (event)
		{
			if (this .getBrowser () .getContextMenu () .getActive ())
				return;

			if (this .button >= 0)
				return;

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (event .button)
			{
				case 0:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					$(document) .bind ("mouseup.LookAtViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.LookAtViewer" + this .getId (), this .mousemove .bind (this));
					$(document) .bind ("touchend.LookAtViewer"  + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("touchmove.LookAtViewer" + this .getId (), this .touchmove .bind (this));

					this .getActiveViewpoint () .transitionStop ();

					// Look around.

					this .trackballProjectToSphere (x, y, this .fromVector);

					this .isActive_ = true;
					break;
				}
			}
		},
		mouseup: function (event)
		{
			if (event .button !== this .button)
				return;

			this .button = -1;

			$(document) .unbind (".LookAtViewer" + this .getId ());

			switch (event .button)
			{
				case 0:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .isActive_ = false;
					break;
				}
			}
		},
		dblclick: function (event)
		{
			// Stop event propagation.
			event .preventDefault ();
			event .stopImmediatePropagation ();

			var
				element = this .getBrowser () .getSurface (),
				offset  = element .offset (),
				x       = event .pageX - offset .left - parseFloat (element .css ('borderLeftWidth')),
				y       = element .innerHeight () - (event .pageY - offset .top - parseFloat (element .css ('borderTopWidth')));

			this .disconnect ();
			this .lookAtPoint (x, y, this .getStraightenHorizon ());
		},
		mousemove: function (event)
		{
			this .getBrowser () .addBrowserEvent ();

			this .event = event;

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .button)
			{
				case 0:
				{
					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					// Look around

					var toVector  = this .trackballProjectToSphere (x, y, this .toVector);

					this .addRotation (this .fromVector, toVector);
					this .fromVector .assign (toVector);
					break;
				}
			}
		},
		mousewheel: (function ()
		{
			var
				step        = new Vector3 (0, 0, 0),
				translation = new Vector3 (0, 0, 0);

			return function (event)
			{
				// Stop event propagation.
				event .preventDefault ();
				event .stopImmediatePropagation ();

				// Change viewpoint position.

				var viewpoint = this .getActiveViewpoint ();

				viewpoint .transitionStop ();

				step        = this .getDistanceToCenter (step) .multiply (event .zoomFactor || SCROLL_FACTOR),
				translation = viewpoint .getUserOrientation () .multVecRot (translation .set (0, 0, step .abs ()));

				if (event .deltaY > 0)
					this .addMove (translation .negate (), Vector3 .Zero);

				else if (event .deltaY < 0)
					this .addMove (translation, Vector3 .Zero);
			};
		})(),
		touchstart: function (event)
		{
			var touches = event .originalEvent .touches;

			switch (touches .length)
			{
				case 1:
				{
					// Start move (button 0).

					this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
					break;
				}
				case 2:
				{
					// End move (button 0).

					this .touchend (event);

					// Start look around (button 0).

					event .button = 0;
					event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
					event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

					this .mousedown (event);

					// Start zoom (mouse wheel).

					this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
					this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
					break;
				}
				case 3:
				{
					this .touchend (event);
					break;
				}
			}
		},
		touchend: function (event)
		{
			switch (this .button)
			{
				case 0:
				{
					// End look around (button 0).
					this .mouseup (event);
					break;
				}
			}

			// Start dblclick (button 0).

			if (this .getBrowser () .getCurrentTime () - this .tapStart < this .dblTapInterval)
			{
				event .button = 1;
				event .pageX  = this .touch1 .x;
				event .pageY  = this .touch1 .y;

				this .dblclick (event);
			}

			this .tapStart = this .getBrowser () .getCurrentTime ();
		},
		touchmove: (function ()
		{
			var
				MOVE_ANGLE   = 0.7,
				ZOOM_ANGLE   = -0.7,
				touch1Change = new Vector2 (0, 0),
				touch2Change = new Vector2 (0, 0);

			return function (event)
			{
				var touches = event .originalEvent .touches;

				switch (touches .length)
				{
					case 1:
					{
						// Move (button 0).
						break;
					}
					case 2:
					{
						touch1Change .set (touches [0] .pageX, touches [0] .pageY) .subtract (this .touch1) .normalize ();
						touch2Change .set (touches [1] .pageX, touches [1] .pageY) .subtract (this .touch2) .normalize ();

						var
							move = touch1Change .dot (touch2Change) > MOVE_ANGLE,
							zoom = touch1Change .dot (touch2Change) < ZOOM_ANGLE;

						if (move)
						{
							// Look around (button 0).

							event .button = 0;
							event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
							event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

							this .mousemove (event);
						}
						else if (zoom)
						{
							// Zoom (mouse wheel).

							var distance1 = this .touch1 .distance (this .touch2);

							this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
							this .touch2 .set (touches [1] .pageX, touches [1] .pageY);

							var
								distance2 = this .touch1 .distance (this .touch2),
								delta     = distance2 - distance1;

							event .deltaY     = delta;
							event .zoomFactor = Math .abs (delta) / $(window) .width ();

							this .mousewheel (event);
						}

						this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
						this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
						break;
					}
				}
			};
		})(),
		set_positionOffset__: function (value)
		{
			var viewpoint = this .getActiveViewpoint ();

			viewpoint .positionOffset_ = value;
		},
		set_centerOfRotationOffset__: function (value)
		{
			var viewpoint = this .getActiveViewpoint ();

			viewpoint .centerOfRotationOffset_ = value;
		},
		set_orientationOffset__: function (value)
		{
			var viewpoint = this .getActiveViewpoint ();

			viewpoint .orientationOffset_ = value;
		},
		addMove: (function ()
		{
			var
				positionOffset         = new Vector3 (0, 0, 0),
				centerOfRotationOffset = new Vector3 (0, 0, 0);

			return function (positionOffsetChange, centerOfRotationOffsetChange)
			{
				var viewpoint = this .getActiveViewpoint ();

				if (this .positionChaser .isActive_ .getValue () && this .positionChaser .value_changed_ .hasInterest ("set_positionOffset__", this))
				{
					positionOffset
						.assign (this .positionChaser .set_destination_ .getValue ())
						.add (positionOffsetChange);

					this .positionChaser .set_destination_ = positionOffset;
				}
				else
				{
					positionOffset
						.assign (viewpoint .positionOffset_ .getValue ())
						.add (positionOffsetChange);

					this .positionChaser .set_value_       = viewpoint .positionOffset_;
					this .positionChaser .set_destination_ = positionOffset;
				}

				if (this .centerOfRotationChaser .isActive_ .getValue () && this .centerOfRotationChaser .value_changed_ .hasInterest ("set_centerOfRotationOffset__", this))
				{
					centerOfRotationOffset
						.assign (this .centerOfRotationChaser .set_destination_ .getValue ())
						.add (centerOfRotationOffsetChange);

					this .centerOfRotationChaser .set_destination_ = centerOfRotationOffset;
				}
				else
				{
					centerOfRotationOffset
						.assign (viewpoint .centerOfRotationOffset_ .getValue ())
						.add (centerOfRotationOffsetChange);

					this .centerOfRotationChaser .set_value_       = viewpoint .centerOfRotationOffset_;
					this .centerOfRotationChaser .set_destination_ = centerOfRotationOffset;
				}

				this .disconnect ();
				this .positionChaser         .value_changed_ .addInterest ("set_positionOffset__",         this);
				this .centerOfRotationChaser .value_changed_ .addInterest ("set_centerOfRotationOffset__", this);
			};
		})(),
		addRotation: (function ()
		{
			var
				userOrientation   = new Rotation4 (0, 0, 1, 0),
				orientationOffset = new Rotation4 (0, 0, 1, 0);

			return function (fromVector, toVector)
			{
				var viewpoint = this .getActiveViewpoint ();

				if (this .orientationChaser .isActive_ .getValue () && this .orientationChaser .value_changed_ .hasInterest ("set_orientationOffset__", this))
				{
					userOrientation
						.setFromToVec (toVector, fromVector)
						.multRight (viewpoint .getOrientation ())
						.multRight (this .orientationChaser .set_destination_ .getValue ());

					viewpoint .straightenHorizon (userOrientation);

					orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

					this .orientationChaser .set_destination_ = orientationOffset;
				}
				else
				{
					userOrientation
						.setFromToVec (toVector, fromVector)
						.multRight (viewpoint .getUserOrientation ());

					viewpoint .straightenHorizon (userOrientation);

					orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

					this .orientationChaser .set_value_       = viewpoint .orientationOffset_;
					this .orientationChaser .set_destination_ = orientationOffset;
				}

				this .disconnect ();
				this .orientationChaser .value_changed_ .addInterest ("set_orientationOffset__", this);
			};
		})(),
		disconnect: function ()
		{
			this .orientationChaser      .value_changed_ .removeInterest ("set_orientationOffset__", this);
			this .positionChaser         .value_changed_ .removeInterest ("set_positionOffset__",         this)
			this .centerOfRotationChaser .value_changed_ .removeInterest ("set_centerOfRotationOffset__", this)
		},
		dispose: function ()
		{
			this .getBrowser () .getSurface () .unbind (".LookAtViewer");
			$(document) .unbind (".LookAtViewer" + this .getId ());
		},
	});

	return LookAtViewer;
});
