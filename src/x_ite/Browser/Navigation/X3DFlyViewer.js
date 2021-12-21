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
	"x_ite/Components/Followers/OrientationChaser",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Camera",
	"jquery-mousewheel",
],
function ($,
          X3DViewer,
          OrientationChaser,
          Vector3,
          Rotation4,
          Matrix4,
          Camera)
{
"use strict";

	var macOS = /Mac OS X/i .test (navigator .userAgent)

	var
		SPEED_FACTOR           = 0.007,
		SHIFT_SPEED_FACTOR     = 4 * SPEED_FACTOR,
		ROTATION_SPEED_FACTOR  = 1.4,
		ROTATION_LIMIT         = 40,
		PAN_SPEED_FACTOR       = SPEED_FACTOR,
		PAN_SHIFT_SPEED_FACTOR = 1.4 * PAN_SPEED_FACTOR,
		ROLL_ANGLE             = macOS ? Math .PI / 512 : Math .PI / 32,
		ROTATE_TIME            = 0.3;

	var
		MOVE = 0,
		PAN  = 1;

	function X3DFlyViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		var gl = this .getBrowser () .getContext ();

		this .button            = -1;
		this .fromVector        = new Vector3 (0, 0, 0);
		this .toVector          = new Vector3 (0, 0, 0);
		this .direction         = new Vector3 (0, 0, 0);
		this .startTime         = 0;
		this .lineBuffer        = gl .createBuffer ();
		this .lineCount         = 2;
		this .lineVertices      = new Array (this .lineCount * 4);
		this .lineArray         = new Float32Array (this .lineVertices);
		this .event             = null;
		this .lookAround        = false;
		this .orientationChaser = new OrientationChaser (executionContext);
	}

	X3DFlyViewer .prototype = Object .assign (Object .create (X3DViewer .prototype),
	{
		constructor: X3DFlyViewer,
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			const
			   browser = this .getBrowser (),
			   element = browser .getSurface ();

			// Bind pointing device events.

			element .bind ("mousedown.X3DFlyViewer",  this .mousedown  .bind (this));
			element .bind ("mouseup.X3DFlyViewer",    this .mouseup    .bind (this));
			element .bind ("mousewheel.X3DFlyViewer", this .mousewheel .bind (this));

			element .bind ("touchstart.X3DFlyViewer", this .touchstart .bind (this));
			element .bind ("touchend.X3DFlyViewer",   this .touchend   .bind (this));

			browser .controlKey_ .addInterest ("set_controlKey_", this);

			// Setup look around chaser.

			this .orientationChaser .duration_ = ROTATE_TIME;
			this .orientationChaser .setPrivate (true);
			this .orientationChaser .setup ();

			// Preload line shader.


				this .initShaders ()
		},
		initShaders: function ()
		{
			const browser = this .getBrowser ();

			if (!browser .getBrowserOption ("Rubberband"))
				return;

			browser .getLineShader ();
			browser .getDepthShader ();
		},
		addCollision: function () { },
		removeCollision: function () { },
		set_controlKey_: function ()
		{
			if (this .event && this .event .button === 0)
			{
				this .button = -1;
				this .mousedown (this .event);
			}
		},
		mousedown: function (event)
		{
			if (this .button >= 0)
				return;

			this .event = event;

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .getButton (event .button))
			{
				case 0:
				{
					// Start walk or fly.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					$(document) .bind ("mouseup.X3DFlyViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.X3DFlyViewer" + this .getId (), this .mousemove .bind (this));
					$(document) .bind ("touchend.X3DFlyViewer"  + this .getId (), this .touchend  .bind (this));
					$(document) .bind ("touchmove.X3DFlyViewer" + this .getId (), this .touchmove .bind (this));

					this .disconnect ();
					this .getActiveViewpoint () .transitionStop ();
					this .getBrowser () .setCursor ("MOVE");
					this .addCollision ();

					if (this .getBrowser () .getControlKey () || this .lookAround)
					{
						// Look around.

						this .trackballProjectToSphere (x, y, this .fromVector);
					}
					else
					{
						// Move.

						this .fromVector .set (x, 0, y);
						this .toVector   .assign (this .fromVector);

						this .getFlyDirection (this .fromVector, this .toVector, this .direction);
						this .addFly ();

						if (this .getBrowser () .getBrowserOption ("Rubberband"))
							this .getBrowser () .finished () .addInterest ("display", this, MOVE);
					}

					this .isActive_ = true;
					break;
				}
				case 1:
				{
					// Start pan.

					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;

					$(document) .bind ("mouseup.X3DFlyViewer"   + this .getId (), this .mouseup   .bind (this));
					$(document) .bind ("mousemove.X3DFlyViewer" + this .getId (), this .mousemove .bind (this));

					this .disconnect ();
					this .getActiveViewpoint () .transitionStop ();
					this .getBrowser () .setCursor ("MOVE");
					this .addCollision ();

					this .fromVector .set (x, -y, 0);
					this .toVector   .assign (this .fromVector);
					this .direction  .set (0, 0, 0);

					this .addPan ();

					if (this .getBrowser () .getBrowserOption ("Rubberband"))
						this .getBrowser () .finished () .addInterest ("display", this, PAN);

					this .isActive_ = true;
					break;
				}
			}
		},
		mouseup: function (event)
		{
			event .preventDefault ();

			if (event .button !== this .button)
				return;

			this .event  = null;
			this .button = -1;

			$(document) .unbind (".X3DFlyViewer" + this .getId ());

			this .disconnect ();
			this .getBrowser () .setCursor ("DEFAULT");
			this .removeCollision ();

			this .isActive_ = false;
		},
		mousemove: function (event)
		{
			this .getBrowser () .addBrowserEvent ();

			this .event = event;

			var
				offset = this .getBrowser () .getSurface () .offset (),
				x      = event .pageX - offset .left,
				y      = event .pageY - offset .top;

			switch (this .getButton (this .button))
			{
				case 0:
				{
					if (this .getBrowser () .getControlKey () || this .lookAround)
					{
						// Stop event propagation.
						event .preventDefault ();
						event .stopImmediatePropagation ();

						// Look around

						var toVector = this .trackballProjectToSphere (x, y, this .toVector);

						this .addRotation (this .fromVector, toVector);
						this .fromVector .assign (toVector);
						break;
					}
					else
					{
						// Fly

						this .toVector .set (x, 0, y);
						this .getFlyDirection (this .fromVector, this .toVector, this .direction);
						break;
					}
				}
				case 1:
				{
					// Stop event propagation.
					event .preventDefault ();
					event .stopImmediatePropagation ();

					// Pan

					this .toVector  .set (x, -y, 0);
					this .direction .assign (this .toVector) .subtract (this .fromVector);
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

			var viewpoint = this .getActiveViewpoint ();

			viewpoint .transitionStop ();

			if (event .deltaY > 0)
				this .addRoll (-ROLL_ANGLE);

			else if (event .deltaY < 0)
				this .addRoll (ROLL_ANGLE);
		},
		touchstart: function (event)
		{
			var touches = event .originalEvent .touches;

			switch (touches .length)
			{
				case 1:
				{
					// Start fly or walk (button 0).

					event .button = 0;
					event .pageX  = touches [0] .pageX;
					event .pageY  = touches [0] .pageY;

					this .mousedown (event);
					break;
				}
				case 2:
				{
					// End fly or walk (button 0).

					this .touchend (event);

					// Start look around (button 0).

					this .lookAround = true;
					event .button    = 0;
					event .pageX     = (touches [0] .pageX + touches [1] .pageX) / 2;
					event .pageY     = (touches [0] .pageY + touches [1] .pageY) / 2;

					this .mousedown (event);
					break;
				}
				case 3:
				{
					// End look around (button 0).

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
					// End move or look around (button 0).
					this .lookAround = false;
					event .button    = 0;

					this .mouseup (event);
					break;
				}
			}
		},
		touchmove: function (event)
		{
			var touches = event .originalEvent .touches;

			switch (touches .length)
			{
				case 1:
				{
					// Fly or walk (button 0).

					event .button = 0;
					event .pageX  = touches [0] .pageX;
					event .pageY  = touches [0] .pageY;

					this .mousemove (event);
					break;
				}
				case 2:
				{
					// Fly or walk (button 0).

					event .button = 0;
					event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
					event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

					this .mousemove (event);
					break;
				}
			}
		},
		fly: (function ()
		{
			var
				upVector           = new Vector3 (0, 0, 0),
				direction          = new Vector3 (0, 0, 0),
				axis               = new Vector3 (0, 0, 0),
				userOrientation    = new Rotation4 (0, 0, 1, 0),
				orientationOffset  = new Rotation4 (0, 0, 1, 0),
				rubberBandRotation = new Rotation4 (0, 0, 1, 0),
				up                 = new Rotation4 (0, 0, 1, 0),
				geoRotation        = new Rotation4 (0, 0, 1, 0);

			return function ()
			{
				var
					navigationInfo = this .getNavigationInfo (),
					viewpoint      = this .getActiveViewpoint (),
					now            = performance .now (),
					dt             = (now - this .startTime) / 1000;

				upVector .assign (viewpoint .getUpVector ());

				// Rubberband values

				up .setFromToVec (Vector3 .yAxis, upVector);

				if (this .direction .z > 0)
					rubberBandRotation .setFromToVec (up .multVecRot (direction .assign (this .direction)), up .multVecRot (axis .set (0, 0, 1)));
				else
					rubberBandRotation .setFromToVec (up .multVecRot (axis .set (0, 0, -1)), up .multVecRot (direction .assign (this .direction)));

				var rubberBandLength = this .direction .abs ();

				// Determine positionOffset.

				var speedFactor = 1 - rubberBandRotation .angle / (Math .PI / 2);

				speedFactor *= navigationInfo .speed_ .getValue ();
				speedFactor *= viewpoint .getSpeedFactor ();
				speedFactor *= this .getBrowser () .getShiftKey () ? SHIFT_SPEED_FACTOR : SPEED_FACTOR;
				speedFactor *= dt;

				var translation = this .getTranslationOffset (direction .assign (this .direction) .multiply (speedFactor));

				this .getActiveLayer () .constrainTranslation (translation, true);

				viewpoint .positionOffset_ = translation .add (viewpoint .positionOffset_ .getValue ());

				// Determine weight for rubberBandRotation.

				var weight = ROTATION_SPEED_FACTOR * dt * Math .pow (rubberBandLength / (rubberBandLength + ROTATION_LIMIT), 2);

				// Determine userOrientation.

				userOrientation
					.assign (Rotation4 .Identity)
					.slerp (rubberBandRotation, weight)
					.multRight (viewpoint .getUserOrientation ());

				// Straighten horizon of userOrientation.

				if (viewpoint .getTypeName () !== "GeoViewpoint")
						viewpoint .straightenHorizon (userOrientation);

				// Determine orientationOffset.

				orientationOffset
					.assign (viewpoint .getOrientation ())
					.inverse ()
					.multRight (userOrientation);

				// Set orientationOffset.

				viewpoint .orientationOffset_ = orientationOffset;

				// GeoRotation

				geoRotation .setFromToVec (upVector, viewpoint .getUpVector ());

				viewpoint .orientationOffset_ = geoRotation .multLeft (viewpoint .orientationOffset_ .getValue ());

				this .startTime = now;
			};
		})(),
		pan: (function ()
		{
			var
				direction = new Vector3 (0, 0, 0),
				axis      = new Vector3 (0, 0, 0);

			return function ()
			{
				var
					navigationInfo = this .getNavigationInfo (),
					viewpoint      = this .getActiveViewpoint (),
					now            = performance .now (),
					dt             = (now - this .startTime) / 1000,
					upVector       = viewpoint .getUpVector ();

				this .constrainPanDirection (direction .assign (this .direction));

				var speedFactor = 1;

				speedFactor *= navigationInfo .speed_ .getValue ();
				speedFactor *= viewpoint .getSpeedFactor ();
				speedFactor *= this .getBrowser () .getShiftKey () ? PAN_SHIFT_SPEED_FACTOR : PAN_SPEED_FACTOR;
				speedFactor *= dt;

				var
					orientation = viewpoint .getUserOrientation () .multRight (new Rotation4 (viewpoint .getUserOrientation () .multVecRot (axis .assign (Vector3 .yAxis)), upVector)),
					translation = orientation .multVecRot (direction .multiply (speedFactor));

				this .getActiveLayer () .constrainTranslation (translation, true);

				viewpoint .positionOffset_ = translation .add (viewpoint .positionOffset_ .getValue ());

				this .startTime = now;
			};
		})(),
		set_orientationOffset__: function (value)
		{
			var viewpoint = this .getActiveViewpoint ();

			viewpoint .orientationOffset_ = value;
		},
		addFly: function ()
		{
			if (this .startTime)
				return;

			this .getBrowser () .prepareEvents () .addInterest ("fly", this);
			this .getBrowser () .addBrowserEvent ();

			this .startTime = performance .now ();
		},
		addPan: function ()
		{
			if (this .startTime)
				return;

			this .disconnect ();
			this .getBrowser () .prepareEvents () .addInterest ("pan", this);
			this .getBrowser () .addBrowserEvent ();

			this .startTime = performance .now ();
		},
		addRoll: (function ()
		{
			var
				orientationOffset = new Rotation4 (0, 0, 1, 0),
				roll              = new Rotation4 (0, 0, 1, 0);

			return function (rollAngle)
			{
				var viewpoint = this .getActiveViewpoint ();

				if (this .orientationChaser .isActive_ .getValue () && this .orientationChaser .value_changed_ .hasInterest ("set_orientationOffset__", this))
				{
					orientationOffset
						.assign (viewpoint .getOrientation ())
						.inverse ()
						.multRight (roll .set (1, 0, 0, rollAngle))
						.multRight (viewpoint .getOrientation ())
						.multRight (this .orientationChaser .set_destination_ .getValue ());

					this .orientationChaser .set_destination_ = orientationOffset;
				}
				else
				{
					orientationOffset
						.assign (viewpoint .getOrientation ())
						.inverse ()
						.multRight (roll .set (1, 0, 0, rollAngle))
						.multRight (viewpoint .getUserOrientation ());

					this .orientationChaser .set_value_       = viewpoint .orientationOffset_;
					this .orientationChaser .set_destination_ = orientationOffset;
				}

				this .disconnect ();
				this .orientationChaser .value_changed_ .addInterest ("set_orientationOffset__", this);
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

					if (viewpoint .getTypeName () !== "GeoViewpoint")
						viewpoint .straightenHorizon (userOrientation);

					orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

					this .orientationChaser .set_destination_ = orientationOffset;
				}
				else
				{
					userOrientation
						.setFromToVec (toVector, fromVector)
						.multRight (viewpoint .getUserOrientation ());

					if (viewpoint .getTypeName () !== "GeoViewpoint")
						viewpoint .straightenHorizon (userOrientation);

					orientationOffset .assign (viewpoint .getOrientation ()) .inverse () .multRight (userOrientation);

					this .orientationChaser .set_value_       = viewpoint .orientationOffset_;
					this .orientationChaser .set_destination_ = orientationOffset;
				}

				this .disconnect ();
				this .orientationChaser .value_changed_ .addInterest ("set_orientationOffset__", this);
			};
		})(),
		display: (function ()
		{
			var
				fromPoint             = new Vector3 (0, 0, 0),
				toPoint               = new Vector3 (0, 0, 0),
				projectionMatrix      = new Matrix4 (),
				projectionMatrixArray = new Float32Array (Matrix4 .Identity),
				modelViewMatrixArray  = new Float32Array (Matrix4 .Identity);

			return function (interest, type)
			{
				// Configure HUD

				var
					browser  = this .getBrowser (),
					viewport = browser .getViewport (),
					width    = viewport [2],
					height   = viewport [3];

				Camera .ortho (0, width, 0, height, -1, 1, projectionMatrix);

				projectionMatrixArray .set (projectionMatrix);

				// Display Rubberband.

				if (type === MOVE)
				{
					fromPoint .set (this .fromVector .x, height - this .fromVector .z, 0);
					toPoint   .set (this .toVector   .x, height - this .toVector   .z, 0);
				}
				else
				{
					fromPoint .set (this .fromVector .x, height + this .fromVector .y, 0);
					toPoint   .set (this .toVector   .x, height + this .toVector   .y, 0);
				}

				this .transfer (fromPoint, toPoint);

				var
					gl         = browser .getContext (),
					shaderNode = browser .getLineShader (),
					lineWidth  = gl .getParameter (gl .LINE_WIDTH);

				if (shaderNode .getValid ())
				{
					shaderNode .enable (gl);
					shaderNode .enableVertexAttribute (gl, this .lineBuffer);

					gl .uniform1i (shaderNode .x3d_NumClipPlanes,         0);
					gl .uniform1i (shaderNode .x3d_FogType,               0);
					gl .uniform1i (shaderNode .x3d_ColorMaterial,         false);
					gl .uniform1i (shaderNode .x3d_LinePropertiesApplied, false);

					gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
					gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);

					gl .disable (gl .DEPTH_TEST);

					// Draw a black and a white line.
					gl .lineWidth (2);
					gl .uniform3f (shaderNode .x3d_EmissiveColor, 0, 0, 0);
					gl .uniform1f (shaderNode .x3d_Transparency,  0);

					gl .drawArrays (gl .LINES, 0, this .lineCount);

					gl .lineWidth (1);
					gl .uniform3f (shaderNode .x3d_EmissiveColor, 1, 1, 1);

					gl .drawArrays (gl .LINES, 0, this .lineCount);
					gl .enable (gl .DEPTH_TEST);

					gl .lineWidth (lineWidth);
					shaderNode .disable (gl);
				}
			};
		})(),
		transfer: function (fromPoint, toPoint)
		{
			var
				gl           = this .getBrowser () .getContext (),
				lineVertices = this .lineVertices;

			lineVertices [0] = fromPoint .x;
			lineVertices [1] = fromPoint .y;
			lineVertices [2] = fromPoint .z;
			lineVertices [3] = 1;

			lineVertices [4] = toPoint .x;
			lineVertices [5] = toPoint .y;
			lineVertices [6] = toPoint .z;
			lineVertices [7] = 1;

			this .lineArray .set (lineVertices);

			// Transfer line.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .lineBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .lineArray, gl .STATIC_DRAW);
		},
		disconnect: function ()
		{
			var browser = this .getBrowser ();

			browser .addBrowserEvent ();

			browser .prepareEvents () .removeInterest ("fly", this);
			browser .prepareEvents () .removeInterest ("pan", this);
			browser .finished ()      .removeInterest ("display", this);

			this .orientationChaser .value_changed_ .removeInterest ("set_orientationOffset__", this);

			this .startTime = 0;
		},
		dispose: function ()
		{
			this .disconnect ();
			this .getBrowser () .controlKey_ .removeInterest ("set_controlKey_", this);
			this .getBrowser () .getSurface () .unbind (".X3DFlyViewer");
			$(document) .unbind (".X3DFlyViewer" + this .getId ());
		},
	});

	return X3DFlyViewer;
});
