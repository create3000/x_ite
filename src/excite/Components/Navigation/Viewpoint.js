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
	"excite/Components/Navigation/X3DViewpointNode",
	"excite/Components/Interpolation/ScalarInterpolator",
	"excite/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode,
          ScalarInterpolator,
          X3DConstants,
          Camera,
          Vector3,
          Matrix4)
{
"use strict";

	var
		zAxis       = new Vector3 (0, 0, 1),
		screenScale = new Vector3 (0, 0, 0),
		normalized  = new Vector3 (0, 0, 0);

	function Viewpoint (executionContext)
	{
		X3DViewpointNode .call (this, executionContext);

		this .addType (X3DConstants .Viewpoint);

		this .projectionMatrix        = new Matrix4 ();
		this .fieldOfViewInterpolator = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
	}

	Viewpoint .prototype = $.extend (Object .create (X3DViewpointNode .prototype),
	{
		constructor: Viewpoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .SFFloat (0.7854)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "Viewpoint";
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
			X3DViewpointNode .prototype .initialize .call (this);

			this .fieldOfViewInterpolator .key_ = [ 0, 1 ];
			this .fieldOfViewInterpolator .setup ();

			this .getEaseInEaseOut () .modifiedFraction_changed_ .addFieldInterest (this .fieldOfViewInterpolator .set_fraction_);
			this .fieldOfViewInterpolator .value_changed_ .addFieldInterest (this .fieldOfViewScale_);
		},
		setInterpolators: function (fromViewpoint)
		{
			if (fromViewpoint .getType () .indexOf (X3DConstants .Viewpoint) < 0)
			{
				this .fieldOfViewInterpolator .keyValue_ = [ this .fieldOfViewScale_ .getValue (), this .fieldOfViewScale_ .getValue () ];
			}
			else
			{
				var scale = fromViewpoint .getFieldOfView () / this .fieldOfView_ .getValue ();
	
				this .fieldOfViewInterpolator .keyValue_ = [ scale, this .fieldOfViewScale_ .getValue () ];
	
				this .fieldOfViewScale_ = scale;
			}
		},
		getFieldOfView: function ()
		{
			var fov = this .fieldOfView_ .getValue () * this .fieldOfViewScale_ .getValue ();

			return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
		},
		getScreenScale: function (point, viewport)
		{
		   // Returns the screen scale in meter/pixel for on pixel.

			var
				width  = viewport [2],
				height = viewport [3],
				size   = Math .tan (this .getFieldOfView () / 2) * 2 * point .abs (); // Assume we are on sphere.

			size *= Math .abs (normalized .assign (point) .normalize () .dot (zAxis));

			if (width > height)
				size /= height;
			else
				size /= width;

			return screenScale .set (size, size, size);
		},
		getLookAtDistance: function (bbox)
		{
			return (bbox .size .abs () / 2) / Math .tan (this .getFieldOfView () / 2);
		},
		getProjectionMatrixWithLimits: function (nearValue, farValue, viewport)
		{
			return Camera .perspective (this .getFieldOfView (), nearValue, farValue, viewport [2], viewport [3], this .projectionMatrix);
		},
	});

	return Viewpoint;
});


