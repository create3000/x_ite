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
	"x_ite/Browser/Navigation/X3DViewer",
	"x_ite/Components/Followers/PositionChaser",
	"x_ite/Components/Followers/OrientationChaser",
	"x_ite/Components/Geospatial/GeoViewpoint",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"jquery-mousewheel",
],
function ($,
          X3DViewer,
          PositionChaser,
          OrientationChaser,
          GeoViewpoint,
          Vector2,
          Vector3,
          Rotation4)
{
"use strict";

	var
		MOTION_TIME       = 0.05 * 1000,
		SPIN_RELEASE_TIME = 0.04 * 1000,
		SPIN_ANGLE        = 0.003,
		SPIN_FACTOR       = 0.6,
		SCROLL_FACTOR     = 1.0 / 20.0,
		MOVE_TIME         = 0.2,
		ROTATE_TIME       = 0.2,
		MAX_ANGLE         = 0.95;

	function ExamineViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		this .button                   = -1;
		this .orientationOffset        = new Rotation4 (0, 0, 1, 0);
		this .fromVector               = new Vector3 (0, 0, 0);
		this .toVector                 = new Vector3 (0, 0, 0);
		this .fromPoint                = new Vector3 (0, 0, 0);
		this .toPoint                  = new Vector3 (0, 0, 0);
		this .rotation                 = new Rotation4 (0, 0, 1, 0);
		this .pressTime                = 0;
		this .motionTime               = 0;

		this .touch1                   = new Vector2 (0, 0);
		this .touch2                   = new Vector2 (0, 0);
		this .tapStart                 = 0;
		this .dblTapInterval           = 0.4;

		this .initialPositionOffset    = new Vector3 (0, 0, 0);
		this .initialOrientationOffset = new Rotation4 (0, 0, 1, 0);
		this .positionChaser           = new PositionChaser (executionContext);
		this .centerOfRotationChaser   = new PositionChaser (executionContext);
		this .rotationChaser           = new OrientationChaser (executionContext);
	}

	ExamineViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
	{
		constructor: ExamineViewer,
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			var
			   browser = this .getBrowser (),
			   element = browser .getElement ();

			// Bind pointing device events.

			browser .activeViewpoint_ .addInterest ("set_activeViewpoint__", this);

			element .bind ("mousedown.ExamineViewer",  this .mousedown  .bind (this));
			element .bind ("mouseup.ExamineViewer",    this .mouseup    .bind (this));
			element .bind ("dblclick.ExamineViewer",   this .dblclick   .bind (this));
			element .bind ("mousewheel.ExamineViewer", this .mousewheel .bind (this));

			element .bind ("touchstart.ExamineViewer",  this .touchstart .bind (this));
			element .bind ("touchend.ExamineViewer",    this .touchend   .bind (this));

			// Setup scroll chaser.

			this .positionChaser .duration_ = MOVE_TIME;
			this .positionChaser .setPrivate (true);
			this .positionChaser .setup ();

			this .centerOfRotationChaser .duration_ = MOVE_TIME;
			this .centerOfRotationChaser .setPrivate (true);
			this .centerOfRotationChaser .setup ();

			this .rotationChaser .duration_ = ROTATE_TIME;
			this .rotationChaser .setPrivate (true);
			this .rotationChaser .setup ();
		},
		set_activeViewpoint__: function ()
		{
			this .disconnect ();
		},
		mousedown: function (event)
		{
			if (this .button >= 0)
				return;
		
			this .pressTime = performance .now ();

			var
				offset = this .getBrowser () .getElement () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (event .button)
			{
				case 0:
				{
					// Start rotate.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					$(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
					$(document) .bind ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
					$(document) .bind ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));

					this .disconnect ();
					this .getActiveViewpoint () .transitionStop ();
					this .getBrowser () .setCursor ("MOVE");

					this .trackballProjectToSphere (x, y, this .fromVector);
					this .rotation .assign (Rotation4 .Identity);

					this .motionTime = 0;			
					break;
				}
				case 1:
				{
					// Start pan.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					$(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
					$(document) .bind ("touchend.ExamineViewer"  + this .getId (), this .touchend  .bind (this));
					$(document) .bind ("touchmove.ExamineViewer" + this .getId (), this .touchmove .bind (this));
		
					this .disconnect ();
					this .getActiveViewpoint () .transitionStop ();
					this .getBrowser () .setCursor ("MOVE");

					this .getPointOnCenterPlane (x, y, this .fromPoint);
					break;
				}
			}
		},
		mouseup: function (event)
		{
			if (event .button !== this .button)
				return;

			this .button = -1;
		
			$(document) .unbind (".ExamineViewer" + this .getId ());

			switch (event .button)
			{
				case 0:
				{
					// End rotate.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .getBrowser () .setCursor ("DEFAULT");

					if (Math .abs (this .rotation .angle) > SPIN_ANGLE && performance .now () - this .motionTime < SPIN_RELEASE_TIME)
					{
						if (this .getBrowser () .getBrowserOption ("StraightenHorizon"))
							this .addRotate (this .rotation .pow (4));
						else
							this .addSpinning (this .rotation);
					}

					break;
				}
				case 1:
				{
					// End pan.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .getBrowser () .setCursor ("DEFAULT");
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
				offset = this .getBrowser () .getElement () .offset (), 
				x      = event .pageX - offset .left,
				y      = this .getBrowser () .getElement () .height () - (event .pageY - offset .top);

			this .disconnect ();
			this .lookAtBBox (x, y, this .getBrowser () .getBrowserOption ("StraightenHorizon"));
		},
		mousemove: (function ()
		{
			var fromPoint = new Vector3 (0, 0, 0);

			return function (event)
			{
				var
					offset = this .getBrowser () .getElement () .offset (),
					x      = event .pageX - offset .left,
					y      = event .pageY - offset .top;
	
				switch (this .button)
				{
					case 0:
					{
						// Rotate view around Viewpoint.centerOfRotation.

						// Stop event propagation.
						event .preventDefault ();
						event .stopImmediatePropagation ();
	
						var toVector = this .trackballProjectToSphere (x, y, this .toVector);
	
						this .rotation .setFromToVec (toVector, this .fromVector);
	
						if (Math .abs (this .rotation .angle) < SPIN_ANGLE && performance .now () - this .pressTime < MOTION_TIME)
							return;
	
						this .addRotate (this .rotation);
	
						this .fromVector .assign (toVector);
						this .motionTime = performance .now ();
						break;
					}
					case 1:
					{
						// Move view along center plane.

						// Stop event propagation.
						event .preventDefault ();
						event .stopImmediatePropagation ();
	
						var
							viewpoint   = this .getActiveViewpoint (),
							toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
							translation = viewpoint .getUserOrientation () .multVecRot (fromPoint .assign (this .fromPoint) .subtract (toPoint));
	
						this .addMove (translation, translation);
	
						this .fromPoint .assign (toPoint);
						break;
					}
				}
			};
		})(),
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
	
				var
					browser   = this .getBrowser (),
					viewpoint = this .getActiveViewpoint ();
	
				browser .prepareEvents () .removeInterest ("spin", this);
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
					// Start rotate (button 0).

					event .button = 0;
					event .pageX  = touches [0] .pageX;
					event .pageY  = touches [0] .pageY;
		
					this .mousedown (event);

					// Remember tap.

					this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
					break;
				}
				case 2:
				{
					// End rotate (button 0).

					this .touchend (event);

					// Start move (button 1).

					event .button = 1;
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
					// End move (button 1).
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
					// End rotate (button 0).
					event .button = 0;
					this .mouseup (event);

					// Start dblclick (button 0).

					if (this .getBrowser () .getCurrentTime () - this .tapStart < this .dblTapInterval)
					{
						event .button = 0;
						event .pageX  = this .touch1 .x;
						event .pageY  = this .touch1 .y;

						this .dblclick (event);
					}

					this .tapStart = this .getBrowser () .getCurrentTime ();
					break;
				}
				case 1:
				{
					// End move (button 1).
					event .button = 1;
					this .mouseup (event);
					break;
				}
			}
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
						// Rotate (button 0).
	
						event .pageX = touches [0] .pageX;
						event .pageY = touches [0] .pageY;
			
						this .mousemove (event);
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
							// Move (button 1).
		
							event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
							event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;
		
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
		spin: function ()
		{
			var viewpoint = this .getActiveViewpoint ();

			this .orientationOffset .assign (viewpoint .orientationOffset_ .getValue ());

			viewpoint .orientationOffset_ = this .getOrientationOffset (this .rotation, this .orientationOffset);
			viewpoint .positionOffset_    = this .getPositionOffset (viewpoint .positionOffset_ .getValue (), this .orientationOffset, viewpoint .orientationOffset_ .getValue ());
		},
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
		set_rotation__: function (value)
		{
			var viewpoint = this .getActiveViewpoint ();

			try
			{
				viewpoint .orientationOffset_ = this .getOrientationOffset (value .getValue (), this .initialOrientationOffset);
			}
			catch (error)
			{
				this .rotationChaser .set_destination_ = this .rotationChaser .value_changed_;
				this .rotationChaser .value_changed_ .removeInterest ("set_rotation__", this)
			}

			viewpoint .positionOffset_ = this .getPositionOffset (this .initialPositionOffset, this .initialOrientationOffset, viewpoint .orientationOffset_ .getValue ());
		},
		addRotate: function (rotationChange)
		{
			var viewpoint = this .getActiveViewpoint ();

			if (this .rotationChaser .isActive_ .getValue () && this .rotationChaser .value_changed_ .hasInterest ("set_rotation__", this))
			{
				var rotation = this .rotationChaser .set_destination_ .getValue ()
					.multLeft (rotationChange);

				this .rotationChaser .set_destination_ = rotation;
			}
			else
			{
				this .rotationChaser .set_value_       = Rotation4 .Identity;
				this .rotationChaser .set_destination_ = rotationChange;

				this .initialOrientationOffset .assign (viewpoint .orientationOffset_ .getValue ());
				this .initialPositionOffset    .assign (viewpoint .positionOffset_    .getValue ());
			}

			this .disconnect ();
			this .rotationChaser .value_changed_ .addInterest ("set_rotation__", this);
		},
		addSpinning: (function ()
		{
			var rotation = new Rotation4 (0, 0, 1, 0);

			return function (rotationChange)
			{
				try
				{
					this .disconnect ();
					this .getBrowser () .prepareEvents () .addInterest ("spin", this);
	
					this .rotation .assign (rotation .assign (Rotation4 .Identity) .slerp (rotationChange, SPIN_FACTOR));
				}
				catch (error)
				{
					console .log (error);
				}
			};
		})(),
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
		getPositionOffset: (function ()
		{
			var
				distance = new Vector3 (0, 0, 0),
				d        = new Vector3 (0, 0, 0),
				oob      = new Rotation4 (0, 0, 1, 0);

			return function (positionOffsetBefore, orientationOffsetBefore, orientationOffsetAfter)
			{
				this .getDistanceToCenter (distance, positionOffsetBefore);
	
				return (oob
					.assign (orientationOffsetBefore)
					.inverse ()
					.multRight (orientationOffsetAfter)
					.multVecRot (d .assign (distance))
					.subtract (distance)
					.add (positionOffsetBefore));
			};
		})(),
		getOrientationOffset: (function ()
		{
			var
				userOrientationBefore = new Rotation4 (0, 0, 1, 0),
				userOrientationAfter  = new Rotation4 (0, 0, 1, 0),
				orientationOffset     = new Rotation4 (0, 0, 1, 0),
				zAxis                 = new Vector3 (0, 0, 0);

			return function (rotation, orientationOffsetBefore)
			{
				var
					viewpoint         = this .getActiveViewpoint (),
					straightenHorizon = this .getBrowser () .getBrowserOption ("StraightenHorizon");
	
				userOrientationBefore
					.assign (rotation)
					.multRight (viewpoint .getOrientation ())
					.multRight (orientationOffsetBefore);
	
				if (straightenHorizon && ! (viewpoint instanceof GeoViewpoint))
					viewpoint .straightenHorizon (userOrientationBefore);
	
				var orientationOffsetAfter = orientationOffset
					.assign (viewpoint .getOrientation ())
					.inverse ()
					.multRight (userOrientationBefore);

				userOrientationAfter
					.assign (viewpoint .getOrientation ())
					.multRight (orientationOffsetAfter);

				if (straightenHorizon)
				{
					if (Math .abs (viewpoint .getUpVector () .dot (userOrientationAfter .multVecRot (zAxis .assign (Vector3 .zAxis)))) < MAX_ANGLE)
						return orientationOffsetAfter;

					throw 1;
				}
				else
				{
					return orientationOffsetAfter;
				}
			};
		})(),
		disconnect: function ()
		{
			var browser = this .getBrowser ();

			this .positionChaser         .value_changed_ .removeInterest ("set_positionOffset__",         this)
			this .centerOfRotationChaser .value_changed_ .removeInterest ("set_centerOfRotationOffset__", this)
			this .rotationChaser         .value_changed_ .removeInterest ("set_rotation__",               this);

			browser .prepareEvents () .removeInterest ("spin", this);
		},
		dispose: function ()
		{
			var browser = this .getBrowser ();

			this .disconnect ();
			browser .activeViewpoint_ .removeInterest ("set_activeViewpoint__", this);
			browser .getElement () .unbind (".ExamineViewer");
			$(document) .unbind (".ExamineViewer" + this .getId ());
		},
	});

	return ExamineViewer;
});
