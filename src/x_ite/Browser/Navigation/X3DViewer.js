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
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Components/Navigation/OrthoViewpoint",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (X3DBaseNode, OrthoViewpoint, ViewVolume, Vector3, Matrix4)
{
"use strict";
	
	var
		axis     = new Vector3 (0, 0, 0),
		distance = new Vector3 (0, 0, 0),
		far      = new Vector3 (0, 0, 0);

	function X3DViewer (executionContext)
	{
		X3DBaseNode .call (this, executionContext);
	}

	X3DViewer .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: X3DViewer,
		initialize: function ()
		{
		},
		getActiveLayer: function ()
		{
			return this .getBrowser () .getActiveLayer ();
		},
		getViewport: function ()
		{
			return this .getBrowser () .getActiveLayer () .getViewport ();
		},
		getNavigationInfo: function ()
		{
			return this .getBrowser () .getActiveLayer () .getNavigationInfo ();
		},
		getActiveViewpoint: function ()
		{
			return this .getBrowser () .getActiveLayer () .getViewpoint ();
		},
		getPointOnCenterPlane: function (x, y, result)
		{
			try
			{
				var
					navigationInfo   = this .getNavigationInfo (),
					viewpoint        = this .getActiveViewpoint (),
					viewport         = this .getViewport () .getRectangle (this .getBrowser ()),
					projectionMatrix = viewpoint .getProjectionMatrixWithLimits (navigationInfo .getNearValue (), navigationInfo .getFarValue (viewpoint), viewport);

				// Far plane point
				ViewVolume .unProjectPoint (x, this .getBrowser () .getViewport () [3] - y, 0.9, Matrix4 .Identity, projectionMatrix, viewport, far);

				if (viewpoint instanceof OrthoViewpoint)
					return result .set (far .x, far .y, -this .getDistanceToCenter (distance) .abs ());

				var direction = far .normalize ();

				return result .assign (direction) .multiply (this .getDistanceToCenter (distance) .abs () / direction .dot (axis .set (0, 0, -1)));
			}
			catch (error)
			{
				console .log (error);
				return result .set (0, 0, 0);
			}
		},
		getDistanceToCenter: function (distance)
		{
			var viewpoint = this .getActiveViewpoint ();

			return distance .assign (viewpoint .getUserPosition ()) .subtract (viewpoint .getUserCenterOfRotation ());
		},
		trackballProjectToSphere: function (x, y, vector)
		{
			x =  x / this .getBrowser () .getViewport () [2] - 0.5;
			y = -y / this .getBrowser () .getViewport () [3] + 0.5;

			return vector .set (x, y, tbProjectToSphere (0.5, x, y));
		},
		lookAt: function (x, y, straightenHorizon)
		{
			if (this .touch (x, y))
			{
				var hit = this .getBrowser () .getNearestHit ();

				this .getActiveViewpoint () .lookAtPoint (hit .intersection .point, 2 - 1.618034, straightenHorizon);
			}
		},
		touch: function (x, y)
		{
			this .getBrowser () .touch (x, y);
		
			return this .getBrowser () .getHits () .length;
		},
		easeInEaseOut: function (t)
		{
			return (1 - Math .cos (t * Math .PI)) / 2;
		},
		dispose: function () { },
	});

	function tbProjectToSphere (r, x, y)
	{
		var d = Math .sqrt (x * x + y * y);

		if (d < r * Math .sqrt (0.5)) // Inside sphere
		{
			return Math .sqrt (r * r - d * d);
		}

		// On hyperbola

		var t = r / Math .sqrt (2);
		return t * t / d;
	}

	return X3DViewer;
});
