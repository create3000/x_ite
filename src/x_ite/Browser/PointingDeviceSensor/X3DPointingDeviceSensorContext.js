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
	"x_ite/Browser/PointingDeviceSensor/PointingDevice",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Algorithms/MergeSort",
	"standard/Math/Algorithm",
],
function ($,
          PointingDevice,
          TraverseType,
          X3DConstants,
          Line3,
          ViewVolume,
          Vector2,
          Vector3,
          Matrix4,
          MergeSort,
          Algorithm)
{
"use strict";

	var line = new Line3 (Vector3 .Zero, Vector3 .Zero);

	function X3DPointingDeviceSensorContext ()
	{
		this .pointingDevice = new PointingDevice (this);

		this .pointer        = new Vector2 (0, 0);
		this .hitRay         = new Line3 (Vector3 .Zero, Vector3 .Zero);
		this .hits           = [ ];
		this .enabledSensors = [{ }];
		this .selectedLayer  = null;
		this .overSensors    = { };
		this .activeSensors  = { };

		this .hitPointSorter = new MergeSort (this .hits, function (lhs, rhs) { return lhs .intersection .point .z < rhs .intersection .point .z; });
		this .layerSorter    = new MergeSort (this .hits, function (lhs, rhs) { return lhs .layerNumber < rhs .layerNumber; });

		this .pointerTime = 0;
	}

	X3DPointingDeviceSensorContext .prototype =
	{
		initialize: function ()
		{
			// Make element focusable.
			this .getElement () .attr ("tabindex", this .getElement () .attr ("tabindex") || 0);
			this .setCursor ("DEFAULT");

			this .pointingDevice .setup ();
		},
		setCursor: function (value)
		{
			this .cursorType = value;

			var div = this .getSurface ();

			switch (value)
			{
				case "HAND": // Hand with finger
					div .css ("cursor", "pointer");
					break;
				case "MOVE": // Hand grabed something
					div .css ("cursor", "move");
					break;
				case "CROSSHAIR":
					div .css ("cursor", "crosshair");
					break;
				default:
				{
					if (this .loadCount_ .getValue ())
						div .css ("cursor", "wait");
					else if (this .pointingDevice && this .pointingDevice .isOver)
						div .css ("cursor", "pointer");
					else
						div .css ("cursor", "default");
					break;
				}
			}
		},
		getCursor: function ()
		{
			return this .cursorType;
		},
		isPointerInRectangle: function (rectangle)
		{
			return this .pointer .x > rectangle .x &&
			       this .pointer .x < rectangle .x + rectangle .z &&
			       this .pointer .y > rectangle .y &&
			       this .pointer .y < rectangle .y + rectangle .w;
		},
		setLayerNumber: function (value)
		{
			this .layerNumber = value;
		},
		getSelectedLayer: function ()
		{
			return this .selectedLayer;
		},
		setHitRay: function (projectionMatrix, viewport)
		{
			try
			{
				ViewVolume .unProjectRay (this .pointer .x, this .pointer .y, Matrix4 .Identity, projectionMatrix, viewport, this .hitRay);
			}
			catch (error)
			{
				this .hitRay .set (Vector3 .Zero, Vector3 .Zero);
			}
		},
		getHitRay: function ()
		{
			return this .hitRay;
		},
		getSensors: function ()
		{
			return this .enabledSensors;
		},
		addHit: function (intersection, layer, shape, modelViewMatrix)
		{
			this .hits .push ({
				pointer:         this .pointer,
				hitRay:          this .hitRay .copy (),
				intersection:    intersection,
				sensors:         this .enabledSensors [this .enabledSensors .length - 1],
				layer:           layer,
				layerNumber:     this .layerNumber,
				shape:           shape,
				modelViewMatrix: modelViewMatrix .copy (),
			});
		},
		getHits: function ()
		{
			return this .hits;
		},
		getNearestHit: function ()
		{
			return this .hits [this .hits .length - 1];
		},
		buttonPressEvent: function (x, y)
		{
			this .touch (x, y);

			if (this .hits .length === 0)
				return false;

			var nearestHit = this .getNearestHit ();

			this .selectedLayer = nearestHit .layer;
			this .activeSensors = nearestHit .sensors;

			for (var key in this .activeSensors)
				this .activeSensors [key] .set_active__ (true, nearestHit);

			return ! $.isEmptyObject (nearestHit .sensors);
		},
		buttonReleaseEvent: function ()
		{
			this .selectedLayer = null;

			for (var key in this .activeSensors)
				this .activeSensors [key] .set_active__ (false, null);

			this .activeSensors = { };

			// Selection

			return true;
		},
		motionNotifyEvent: function (x, y)
		{
			this .touch (x, y);

			this .motion ();

			return this .hits .length && ! $.isEmptyObject (this .hits [this .hits .length - 1] .sensors);
		},
		leaveNotifyEvent: function ()
		{
		},
		touch: function (x, y)
		{
			if (this .getViewer () .isActive_ .getValue ())
			{
				this .pointerTime = 0;
				return;
			}

			var t0 = performance .now ();

			this .pointer .set (x, y);

			// Clear hits.

			this .hits .length = 0;

			// Pick.

			this .getWorld () .traverse (TraverseType .POINTER, null);

			// Picking end.

			this .hitPointSorter .sort (0, this .hits .length);
			this .layerSorter    .sort (0, this .hits .length);

			this .addBrowserEvent ();
			this .pointerTime = performance .now () - t0;
		},
		motion: function ()
		{
			if (this .hits .length)
			{
				var nearestHit = this .hits [this .hits .length - 1];
			}
			else
			{
				var hitRay = this .selectedLayer ? this .hitRay : line;

				var nearestHit = {
					pointer:         this .pointer,
					modelViewMatrix: new Matrix4 (),
					hitRay:          hitRay,
					intersection:    null,
					sensors:         { },
					shape:           null,
					layer:           null,
					layerNumber:     0,
				};
			}

			// Set isOver to FALSE for appropriate nodes

			if (this .hits .length)
			{
				var difference = Algorithm .set_difference (this .overSensors, nearestHit .sensors, { }, function (lhs, rhs) {
					return lhs .getNode () < rhs .getNode ();
				});
			}
			else
			{
				var difference = Object .assign ({ }, this .overSensors);
			}

			for (var key in difference)
				difference [key] .set_over__ (false, nearestHit);

			// Set isOver to TRUE for appropriate nodes

			if (this .hits .length)
			{
				this .overSensors = nearestHit .sensors;

				for (var key in this .overSensors)
					this .overSensors [key] .set_over__ (true, nearestHit);
			}
			else
			{
				this .overSensors = { };
			}

			// Forward motion event to active drag sensor nodes

			for (var key in this .activeSensors)
			{
				this .activeSensors [key] .set_motion__ (nearestHit);
			}
		},
	};

	return X3DPointingDeviceSensorContext;
});
