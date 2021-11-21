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
		this .childNode        = null;
		this .visibleNode      = null;
		this .boundedObject    = null;
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
			new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
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

			this .children_ .addInterest ("set_child__", this);
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .childNode);

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
		clear: function () { },
		add: function () { },
		remove: function () { },
		set_child__: function ()
		{
			this .set_level (Math .min (this .level_changed_ .getValue (), this .children_ .length - 1));
		},
		set_level__: function (level)
		{
			if (this .childNode)
				this .childNode .isCameraObject_ .removeInterest ("set_cameraObject__", this);

			if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
			{
				this .childNode .visible_     .removeInterest ("set_visible__",     this);
				this .childNode .bboxDisplay_ .removeInterest ("set_bboxDisplay__", this);
			}

			if (level >= 0 && level < this .children_ .length)
			{
				this .childNode = X3DCast (X3DConstants .X3DChildNode, this .children_ [level]);

				if (this .childNode)
				{
					this .childNode .isCameraObject_ .addInterest ("set_cameraObject__", this);

					if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
					{
						this .childNode .visible_     .addInterest ("set_visible__",     this);
						this .childNode .bboxDisplay_ .addInterest ("set_bboxDisplay__", this);
					}
				}
			}
			else
			{
				this .childNode = null;
			}

			this .set_transformSensors__ ();
			this .set_visible__ ();
			this .set_bboxDisplay__ ();
		},
		set_cameraObject__: function ()
		{
			if (this .childNode && this .childNode .getCameraObject ())
			{
				if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
				{
					this .setCameraObject (this .childNode .visible_ .getValue ());
				}
				else
				{
					this .setCameraObject (true);
				}
			}
			else
			{
				this .setCameraObject (false);
			}
		},
		set_transformSensors__: function ()
		{
			this .setPickableObject (Boolean (this .getTransformSensors () .size || this .childNode && this .childNode .getPickableObject ()));
		},
		set_visible__: function ()
		{
			if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
			{
				this .visibleNode = this .childNode .visible_ .getValue () ? this .childNode : null;
			}
			else
			{
				this .visibleNode = this .childNode;
			}

			this .set_cameraObject__ ();
		},
		set_bboxDisplay__: function ()
		{
			if (X3DCast (X3DConstants .X3DBoundedObject, this .childNode))
			{
				this .boundedObject = this .childNode .bboxDisplay_ .getValue () ? this .childNode : null;
			}
			else
			{
				this .boundedObject = null;
			}
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
					this .frameRate = ((FRAMES - 1) * this .frameRate + browser .currentFrameRate) / FRAMES;

					var size = this .children_ .length;

					switch (size)
					{
						case 0:
							return -1;
						case 1:
							return 0;
						case 2:
							return (this .frameRate > FRAME_RATE_MAX) * 1;
						default:
						{
							var fraction = 1 - Algorithm .clamp ((this .frameRate - FRAME_RATE_MIN) / (FRAME_RATE_MAX - FRAME_RATE_MIN), 0, 1);

							return Math .min (Math .floor (fraction * size), size - 1);
						}
					}
				}

				var distance = modelViewMatrix .translate (this .center_ .getValue ()) .origin .abs ();

				return Algorithm .upperBound (this .range_, 0, this .range_ .length, distance, Algorithm .less);
			};
		})(),
		traverse: (function ()
		{
			var modelViewMatrix = new Matrix4 ();

			return function (type, renderObject)
			{
				switch (type)
				{
					case TraverseType .POINTER:
					case TraverseType .CAMERA:
					case TraverseType .DEPTH:
					{
						var visibleNode = this .visibleNode;

						if (visibleNode)
							visibleNode .traverse (type, renderObject);

						return;
					}
					case TraverseType .PICKING:
					{
						if (this .getTransformSensors () .size)
						{
							var modelMatrix = renderObject .getModelViewMatrix () .get ();

							this .getTransformSensors () .forEach (function (transformSensorNode)
							{
								transformSensorNode .collect (modelMatrix);
							});
						}

						var childNode = this .childNode;

						if (childNode)
						{
							var
								browser          = renderObject .getBrowser (),
								pickingHierarchy = browser .getPickingHierarchy ();

							pickingHierarchy .push (this);

							childNode .traverse (type, renderObject);

							pickingHierarchy .pop ();
						}

						return;
					}
					case TraverseType .COLLISION:
					{
						var childNode = this .childNode;

						if (childNode)
							childNode .traverse (type, renderObject);

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

								this .set_level__ (Math .min (level, this .children_ .length - 1));
							}
						}

						var visibleNode = this .visibleNode;

						if (visibleNode)
							visibleNode .traverse (type, renderObject);

						var boundedObject = this .boundedObject;

						if (boundedObject)
							boundedObject .displayBBox (type, renderObject);

						return;
					}
				}
			};
		})(),
	});

	return LOD;
});
