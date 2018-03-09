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
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"jquery-mousewheel",
],
function ($,
          X3DViewer,
          PositionChaser,
          OrientationChaser,
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
		MOVE_TIME         = 0.3,
		ROTATE_TIME       = 0.4,
		FRAME_RATE        = 60;

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
			   browser   = this .getBrowser (),
			   canvas    = browser .getCanvas (),
				viewpoint = this .getActiveViewpoint ();

			// Bind pointing device events.

			canvas .bind ("mousedown.ExamineViewer",  this .mousedown  .bind (this));
			canvas .bind ("mouseup.ExamineViewer",    this .mouseup    .bind (this));
			canvas .bind ("dblclick.ExamineViewer",   this .dblclick   .bind (this));
			canvas .bind ("mousewheel.ExamineViewer", this .mousewheel .bind (this));

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
		mousedown: function (event)
		{
			if (this .button >= 0)
				return;
		
			this .pressTime = performance .now ();

			var
				offset = this .getBrowser () .getCanvas () .offset (),
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
					
					$(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));

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
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;
					
					this .getBrowser () .getCanvas () .unbind ("mousemove.ExamineViewer");

					$(document) .bind ("mouseup.ExamineViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.ExamineViewer" + this .getId (), this .mousemove .bind (this));
		
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
		
			$(document) .unbind ("mousemove.ExamineViewer" + this .getId ());
			$(document) .unbind ("mouseup.ExamineViewer"   + this .getId ());

			switch (event .button)
			{
				case 0:
				{
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
				offset = this .getBrowser () .getCanvas () .offset (), 
				x      = event .pageX - offset .left,
				y      = this .getBrowser () .getCanvas () .height () - (event .pageY - offset .top);

			this .lookAt (x, y);
		},
		mousemove: function (event)
		{
			var
				offset = this .getBrowser () .getCanvas () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .button)
			{
				case 0:
				{
					// Stop event propagation.

					event .preventDefault ();

					// Move.

					var
						viewpoint = this .getActiveViewpoint (),
						toVector  = this .trackballProjectToSphere (x, y, this .toVector);

					this .rotation .setFromToVec (toVector, this .fromVector);

					if (Math .abs (this .rotation .angle) < SPIN_ANGLE && performance .now () - this .pressTime < MOTION_TIME)
						return false;

					this .addRotate (this .rotation);

					this .fromVector .assign (toVector);
					this .motionTime = performance .now ();
					break;
				}
				case 1:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					// Move.

					var
						viewpoint   = this .getActiveViewpoint (),
						toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
						translation = viewpoint .getUserOrientation () .multVecRot (this .fromPoint .copy () .subtract (toPoint));

					this .addMove (translation, translation);

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

			// Change viewpoint position.

			var
				browser   = this .getBrowser (),
				viewpoint = this .getActiveViewpoint ();

			browser .prepareEvents () .removeInterest ("spin", this);
			viewpoint .transitionStop ();

			var
				step        = this .getDistanceToCenter (new Vector3 (0, 0, 0)) .multiply (SCROLL_FACTOR),
				translation = viewpoint .getUserOrientation () .multVecRot (new Vector3 (0, 0, step .abs ()));

			if (event .deltaY > 0)
				this .addMove (translation .negate (), new Vector3 (0, 0, 0));		
			
			else if (event .deltaY < 0)
				this .addMove (translation, new Vector3 (0, 0, 0));
		},
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

			viewpoint .orientationOffset_ = this .getOrientationOffset (value .getValue (), this .initialOrientationOffset);
			viewpoint .positionOffset_    = this .getPositionOffset (this .initialPositionOffset, this .initialOrientationOffset, viewpoint .orientationOffset_ .getValue ());
		},
		addRotate: function (rotationChange)
		{
			var viewpoint = this .getActiveViewpoint ();

			if (this .rotationChaser .value_changed_ .hasInterest ("set_rotation__", this))
			{
				var rotation = this .rotationChaser .set_destination_ .getValue ()
					.multLeft (rotationChange);

				this .rotationChaser .set_destination_ = rotation;
			}
			else
			{
				this .rotationChaser .set_value_       = new Rotation4 ();
				this .rotationChaser .set_destination_ = rotationChange;

				this .initialOrientationOffset .assign (viewpoint .orientationOffset_ .getValue ());
				this .initialPositionOffset    .assign (viewpoint .positionOffset_    .getValue ());
			}

			this .disconnect ();
			this .rotationChaser .value_changed_ .addInterest ("set_rotation__", this);
		},
		addSpinning: function (rotationChange)
		{
			try
			{
				this .disconnect ();
				this .getBrowser () .prepareEvents () .addInterest ("spin", this);

				this .rotation .assign (new Rotation4 (0, 0, 1, 0) .slerp (rotationChange, SPIN_FACTOR));
			}
			catch (error)
			{
				console .log (error);
			}
		},
		addMove: function (positionOffsetChange, centerOfRotationOffsetChange)
		{
			var viewpoint = this .getActiveViewpoint ();

			if (this .positionChaser .value_changed_ .hasInterest ("set_positionOffset__", this))
			{
				var positionOffset = this .positionChaser .set_destination_ .getValue ()
					.add (positionOffsetChange);

				this .positionChaser .set_destination_ = positionOffset;
			}
			else
			{
				var positionOffset = viewpoint .positionOffset_ .getValue ()
					.copy ()
					.add (positionOffsetChange);

				this .positionChaser .set_value_       = viewpoint .positionOffset_;
				this .positionChaser .set_destination_ = positionOffset;
			}

			if (this .centerOfRotationChaser .value_changed_ .hasInterest ("set_centerOfRotationOffset__", this))
			{
				var centerOfRotationOffset = this .centerOfRotationChaser .set_destination_ .getValue ()
					.add (centerOfRotationOffsetChange);

				this .centerOfRotationChaser .set_destination_ = centerOfRotationOffset;
			}
			else
			{
				var centerOfRotationOffset = viewpoint .centerOfRotationOffset_ .getValue ()
					.copy ()
					.add (centerOfRotationOffsetChange);

				this .centerOfRotationChaser .set_value_       = viewpoint .centerOfRotationOffset_;
				this .centerOfRotationChaser .set_destination_ = centerOfRotationOffset;
			}

			this .disconnect ();
			this .positionChaser         .value_changed_ .addInterest ("set_positionOffset__",         this);
			this .centerOfRotationChaser .value_changed_ .addInterest ("set_centerOfRotationOffset__", this);
		},
		getPositionOffset: function (positionOffsetBefore, orientationOffsetBefore, orientationOffsetAfter)
		{
			var
				viewpoint = this .getActiveViewpoint (),
				distance  = this .getDistanceToCenter (new Vector3 (0, 0, 0), positionOffsetBefore);

			return (orientationOffsetBefore
				.copy ()
				.inverse ()
				.multRight (orientationOffsetAfter)
				.multVecRot (distance .copy ())
				.subtract (distance)
				.add (positionOffsetBefore));
		},
		getOrientationOffset: function (rotation, orientationOffsetBefore)
		{
			var viewpoint = this .getActiveViewpoint ();

			var userOrientation = (rotation
				.copy ()
				.multRight (viewpoint .getOrientation ())
				.multRight (orientationOffsetBefore));

			if (this .getBrowser () .getBrowserOption ("StraightenHorizon"))
				viewpoint .straightenHorizon (userOrientation);

			return (viewpoint .getOrientation ()
				.copy ()
				.inverse ()
				.multRight (userOrientation));
		},
		disconnect: function ()
		{
			var browser = this .getBrowser ();

			this .positionChaser .value_changed_ .removeInterest ("set_positionOffset__",         this);
			this .rotationChaser .value_changed_ .removeInterest ("set_rotation__",               this);
			this .positionChaser .value_changed_ .removeInterest ("set_centerOfRotationOffset__", this);

			browser .prepareEvents () .removeInterest ("spin", this);
		},
		dispose: function ()
		{
			this .disconnect ();
			this .getBrowser () .getCanvas () .unbind (".ExamineViewer");
			$(document) .unbind (".ExamineViewer" + this .getId ());
		},
	});

	return ExamineViewer;
});
