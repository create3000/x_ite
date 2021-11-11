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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DCast,
          TraverseType,
          X3DConstants,
          Matrix4,
          Box3,
          Algorithm)
{
"use strict";

	function LOD (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .LOD);

		if (executionContext .getSpecificationVersion () == "2.0")
			this .addAlias ("level", this .children_); // VRML2

		this .center_ .setUnit ("length");
		this .range_  .setUnit ("length");

		this .frameRate        = 60;
		this .keepCurrentLevel = false;
	}

	LOD .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: LOD,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "forceTransitions", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "center",           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "range",            new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed",    new Fields .SFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LOD";
		},
		getComponentName: function ()
		{
			return "Navigation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);

			this .child = this .getChild (this .level_changed_ .getValue ());
			this .set_cameraObjects__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .child);

				if (boundedObject)
					return boundedObject .getBBox (bbox);

				return bbox .set ();
			}

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		getSubBBox: function (bbox)
		{
			return this .getBBox (bbox);
		},
		set_cameraObjects__: function ()
		{
			if (this .child && this .child .getCameraObject)
				this .setCameraObject (this .child .getCameraObject ());
			else
				this .setCameraObject (false);
		},
		set_pickableObjects__: function ()
		{
			if (this .getTransformSensors () .size)
				this .setPickableObject (true);
			else if (this .child && this .child .getPickableObject)
				this .setPickableObject (this .child .getPickableObject ());
			else
				this .setPickableObject (false);
		},
		getLevel: (function ()
		{
			var
				FRAMES         = 180, // Number of frames after wich a level change takes in affect.
				FRAME_RATE_MIN = 20,  // Lowest level of detail.
				FRAME_RATE_MAX = 55;  // Highest level of detail.

			return function (browser, modelViewMatrix)
			{
				if (this .range_ .length === 0)
				{
					var size = this .children_ .length;

					if (size < 2)
						return 0;

					this .frameRate = ((FRAMES - 1) * this .frameRate + browser .currentFrameRate) / FRAMES;

					if (size === 2)
						return (this .frameRate > FRAME_RATE_MAX) * 1;

					var fraction = 1 - Algorithm .clamp ((this .frameRate - FRAME_RATE_MIN) / (FRAME_RATE_MAX - FRAME_RATE_MIN), 0, 1);

					return Math .min (Math .floor (fraction * size), size - 1);
				}

				var distance = this .getDistance (modelViewMatrix);

				return Algorithm .upperBound (this .range_, 0, this .range_ .length, distance, Algorithm .less);
			};
		})(),
		getDistance: function (modelViewMatrix)
		{
			modelViewMatrix .translate (this .center_ .getValue ());

			return modelViewMatrix .origin .abs ();
		},
		traverse: (function ()
		{
			var
				modelViewMatrix = new Matrix4 (),
				bbox            = new Box3 ();

			return function (type, renderObject)
			{
				var child = this .child;

				switch (type)
				{
					case TraverseType .PICKING:
					{
						if (this .getTransformSensors () .size)
						{
							this .getBBox (bbox) .multRight (renderObject .getModelViewMatrix () .get ());

							this .getTransformSensors () .forEach (function (transformSensorNode)
							{
								transformSensorNode .collect (bbox);
							});
						}

						if (child)
						{
								var
								browser          = renderObject .getBrowser (),
								pickingHierarchy = browser .getPickingHierarchy ();

							pickingHierarchy .push (this);

							child .traverse (type, renderObject);

							pickingHierarchy .pop ();
						}

						return;
					}
					case TraverseType .DISPLAY:
					{
						if (! this .keepCurrentLevel)
						{
							var
								level        = this .getLevel (renderObject .getBrowser (), modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ())),
								currentLevel = this .level_changed_ .getValue ();

							if (this .forceTransitions_ .getValue ())
							{
								if (level > currentLevel)
									level = currentLevel + 1;

								else if (level < currentLevel)
									level = currentLevel - 1;
							}

							if (level !== currentLevel)
							{
								this .level_changed_ = level;

								child = this .child = this .getChild (Math .min (level, this .children_ .length - 1));

								this .set_cameraObjects__ ();
							}
						}

						if (child)
							child .traverse (type, renderObject);

						return;
					}
					default:
					{
						if (child)
							child .traverse (type, renderObject);

						return;
					}
				}
			};
		})(),
	});

	return LOD;
});
