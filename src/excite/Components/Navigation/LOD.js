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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Components/Grouping/X3DGroupingNode",
	"excite/Bits/X3DCast",
	"excite/Bits/TraverseType",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Algorithm",
],
function ($,
          Fields,
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

	var
		FRAMES         = 180, // Number of frames after wich a level change takes in affect.
		FRAME_RATE_MIN = 20,  // Lowest level of detail.
		FRAME_RATE_MAX = 55;  // Highest level of detail.
	
	function LOD (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .LOD);

		this .addAlias ("level", this .children_); // VRML2

		this .frameRate        = 60;
		this .keepCurrentLevel = false;
	}

	LOD .prototype = $.extend (Object .create (X3DGroupingNode .prototype),
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
		modelViewMatrix: new Matrix4 (),
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
		set_cameraObjects__: function ()
		{
			if (this .child && this .child .getCameraObject)
				this .setCameraObject (this .child .getCameraObject ());
			else
				this .setCameraObject (false);
		},
		getBBox: function (bbox) 
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .child);

				if (boundedObject)
					return boundedObject .getBBox (bbox);

				return bbox .set ();
			}

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		getLevel: function (browser, modelViewMatrix)
		{
			if (this .range_ .length === 0)
			{
				var size = this .children_ .length;

				if (size < 2)
					return 0;

				this .frameRate = ((FRAMES - 1) * this .frameRate + browser .currentFrameRate) / FRAMES;

				if (size === 2)
					return Number (this .frameRate > FRAME_RATE_MAX);

				var
					n        = size - 1,
					fraction = Math .max ((this .frameRate - FRAME_RATE_MIN) / (FRAME_RATE_MAX - FRAME_RATE_MIN), 0);

				return Math .min (Math .ceil (fraction * (n - 1)), n);
			}

			var distance = this .getDistance (modelViewMatrix);

			return Algorithm .upperBound (this .range_, 0, this .range_ .length, distance, Algorithm .less);
		},
		getDistance: function (modelViewMatrix)
		{
			modelViewMatrix .translate (this .center_ .getValue ());

			return modelViewMatrix .origin .abs ();
		},
		traverse: function (type, renderObject)
		{
			if (! this .keepCurrentLevel)
			{
				if (type === TraverseType .DISPLAY)
				{
					var
						level        = this .getLevel (renderObject .getBrowser (), this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ())),
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
				
						this .child = this .getChild (Math .min (level, this .children_ .length - 1));

						this .set_cameraObjects__ ();
					}
				}
			}

			if (this .child)
				this .child .traverse (type, renderObject);
		},
	});

	return LOD;
});


