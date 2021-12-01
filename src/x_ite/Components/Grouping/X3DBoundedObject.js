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
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
],
function (Fields,
          X3DCast,
          X3DConstants,
          Vector3,
			 Matrix4,
          Box3)
{
"use strict";

	function X3DBoundedObject (executionContext)
	{
		this .addType (X3DConstants .X3DBoundedObject);

		this .addChildObjects ("transformSensors_changed", new Fields .SFTime ());

		this .bboxSize_   .setUnit ("length");
		this .bboxCenter_ .setUnit ("length");

		this .childBBox            = new Box3 (); // Must be unique for each X3DBoundedObject.
		this .transformSensorNodes = new Set ();
	}

	X3DBoundedObject .prototype =
	{
		constructor: X3DBoundedObject,
		initialize: function () { },
		getDefaultBBoxSize: (function ()
		{
			const defaultBBoxSize = new Vector3 (-1, -1, -1);

			return function ()
			{
				return defaultBBoxSize;
			};
		})(),
		getBBox: function (nodes, bbox, shadow)
		{
			// Must be unique for each X3DBoundedObject.
			const childBBox = this .childBBox;

			// Add bounding boxes.

			bbox .set ();

			for (var i = 0, length = nodes .length; i < length; ++ i)
			{
				const node = nodes [i];

				if (node .getBBox)
					bbox .add (node .getBBox (childBBox, shadow));
			}

			return bbox;
		},
		displayBBox: (function ()
		{
			const
				bbox   = new Box3 (),
				matrix = new Matrix4 ();

			return function (type, renderObject)
			{
				const modelViewMatrix = renderObject .getModelViewMatrix ();

				this .getBBox (bbox) .multRight (modelViewMatrix .get ());

				matrix .set (bbox .center, null, bbox .size);

				modelViewMatrix .pushMatrix (matrix);

				this .getBrowser () .getBBoxNode () .traverse (type, renderObject);

				modelViewMatrix .pop ();
			};
		})(),
		addTransformSensor: function (transformSensorNode)
		{
			this .transformSensorNodes .add (transformSensorNode);

			this .transformSensors_changed_ = this .getBrowser () .getCurrentTime ();
		},
		removeTransformSensor: function (transformSensorNode)
		{
			this .transformSensorNodes .delete (transformSensorNode);

			this .transformSensors_changed_ = this .getBrowser () .getCurrentTime ();
		},
		getTransformSensors: function ()
		{
			return this .transformSensorNodes;
		},
	};

	return X3DBoundedObject;
});
