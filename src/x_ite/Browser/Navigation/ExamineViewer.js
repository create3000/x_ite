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
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"jquery-mousewheel",
],
function ($,
          X3DViewer,
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
		SCROLL_TIME       = 0.3,
		FRAME_RATE        = 60;

	var
		positionOffset         = new Vector3 (0, 0, 0),
		centerOfRotationOffset = new Vector3 (0, 0, 0),
		distance               = new Vector3 (0, 0, 0),
		vector                 = new Vector3 (0, 0, 0),
		rotation               = new Rotation4 (0, 0, 1, 0),
		orientationOffset      = new Rotation4 (0, 0, 1, 0),
		result                 = new Rotation4 (0, 0, 1, 0);

	function ExamineViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		this .button                       = -1;
		this .positionOffset               = new Vector3 (0, 0, 0);
		this .orientationOffset            = new Rotation4 (0, 0, 1, 0);
		this .fromVector                   = new Vector3 (0, 0, 0);
		this .toVector                     = new Vector3 (0, 0, 0);
		this .fromPoint                    = new Vector3 (0, 0, 0);
		this .toPoint                      = new Vector3 (0, 0, 0);
		this .sourcePositionOffset         = new Vector3 (0, 0, 0);
		this .destinationPositionOffset    = new Vector3 (0, 0, 0);
		this .rotation                     = new Rotation4 (0, 0, 1, 0);
		this .pressTime                    = 0;
		this .motionTime                   = 0;
	}

	ExamineViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
	{
		constructor: ExamineViewer,
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			var
			   browser = this .getBrowser (),
			   canvas  = browser .getCanvas ();

			canvas .bind ("mousedown.ExamineViewer",  this .mousedown  .bind (this));
			canvas .bind ("mouseup.ExamineViewer",    this .mouseup    .bind (this));
			canvas .bind ("dblclick.ExamineViewer",   this .dblclick   .bind (this));
			canvas .bind ("mousewheel.ExamineViewer", this .mousewheel .bind (this));
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
						this .addSpinning ();
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

					var rotation = new Rotation4 (toVector, this .fromVector);

					if (Math .abs (rotation .angle) < SPIN_ANGLE && performance .now () - this .pressTime < MOTION_TIME)
						return false;

					this .addRotate (rotation);

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
						translation = viewpoint .getUserOrientation () .multVecRot (vector .assign (this .fromPoint) .subtract (toPoint));

					viewpoint .positionOffset_         = positionOffset .assign (viewpoint .positionOffset_ .getValue ()) .add (translation);
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

			// Change viewpoint position.

			var
				browser   = this .getBrowser (),
				viewpoint = this .getActiveViewpoint ();

			browser .prepareEvents () .removeInterest ("spin", this);
			viewpoint .transitionStop ();

			var step = this .getDistanceToCenter (distance) .multiply (SCROLL_FACTOR);

			viewpoint .getUserOrientation () .multVecRot (positionOffset .set (0, 0, step .abs ()));

			if (event .deltaY > 0)
				this .addScroll (positionOffset .negate ());		
			
			else if (event .deltaY < 0)
				this .addScroll (positionOffset);
		},
		spin: function ()
		{
			var viewpoint = this .getActiveViewpoint ();

			viewpoint .orientationOffset_ = this .getOrientationOffset ();
			viewpoint .positionOffset_    = this .getPositionOffset ();
		},
		scroll: function ()
		{
			var
				now          = performance .now (),
				elapsedTime  = (now - this .startTime) / 1000;

			if (elapsedTime > SCROLL_TIME)
				return this .disconnect ();

			var
				viewpoint = this .getActiveViewpoint (),
			   t         = this .easeInEaseOut (elapsedTime / SCROLL_TIME);

			viewpoint .positionOffset_ = positionOffset .assign (this .sourcePositionOffset) .lerp (this .destinationPositionOffset, t);
		},
		addRotate: function (rotationChange)
		{
			var viewpoint = this .getActiveViewpoint ();

			this .rotation .assign (rotationChange);

			viewpoint .orientationOffset_ = this .getOrientationOffset ();
			viewpoint .positionOffset_    = this .getPositionOffset ();

			return;
		},
		addSpinning: function (spinTime)
		{
			try
			{
				this .rotation .assign (rotation .assign (Rotation4 .Identity) .slerp (this .rotation, SPIN_FACTOR));

				this .getBrowser () .prepareEvents () .addInterest ("spin", this);
			}
			catch (error)
			{
				console .log (error);
			}
		},
		addScroll: function (positionOffsetChange)
		{
			var viewpoint = this .getActiveViewpoint ();

			if (this .getBrowser () .prepareEvents () .hasInterest ("scroll", this))
			{
				this .sourcePositionOffset      .assign (viewpoint .positionOffset_ .getValue ());
				this .destinationPositionOffset .add (positionOffsetChange);
			}
			else
			{
				this .sourcePositionOffset      .assign (viewpoint .positionOffset_ .getValue ());
				this .destinationPositionOffset .assign (Vector3 .add (viewpoint .positionOffset_ .getValue (), positionOffsetChange));
			}

			this .getBrowser () .prepareEvents () .addInterest ("scroll", this);
			this .getBrowser () .addBrowserEvent ();
		
			this .startTime = performance .now ();
		},
		getPositionOffset: function ()
		{
			var viewpoint = this .getActiveViewpoint ();

			this .getDistanceToCenter (distance);

			this .positionOffset .assign (viewpoint .positionOffset_ .getValue ());

			return (orientationOffset .assign (this .orientationOffset) .inverse ()
			        .multRight (viewpoint .orientationOffset_ .getValue ())
			        .multVecRot (vector .assign (distance))
			        .subtract (distance)
			        .add (viewpoint .positionOffset_ .getValue ()));
		},
		getOrientationOffset: function ()
		{
			var viewpoint = this .getActiveViewpoint ();

			this .orientationOffset .assign (viewpoint .orientationOffset_ .getValue ());

			return result .assign (viewpoint .getOrientation ()) .inverse () .multRight (this .rotation) .multRight (viewpoint .getUserOrientation ());
		},
		disconnect: function ()
		{
			var browser = this .getBrowser ();

			browser .prepareEvents () .removeInterest ("spin",   this);
			browser .prepareEvents () .removeInterest ("scroll", this);
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
