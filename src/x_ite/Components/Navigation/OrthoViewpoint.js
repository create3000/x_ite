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
	"x_ite/Components/Navigation/X3DViewpointNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode, 
          X3DConstants,
          Camera,
          Vector2,
          Vector3,
          Matrix4)
{
"use strict";

	function OrthoViewpoint (executionContext)
	{
		X3DViewpointNode .call (this, executionContext);

		this .addType (X3DConstants .OrthoViewpoint);

		this .position_         .setUnit ("length");
		this .centerOfRotation_ .setUnit ("length");
		this .fieldOfView_      .setUnit ("length");

		this .projectionMatrix = new Matrix4 ();
	}

	OrthoViewpoint .prototype = Object .assign (Object .create (X3DViewpointNode .prototype),
	{
		constructor: OrthoViewpoint,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .MFFloat (-1, -1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "OrthoViewpoint";
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

			this .fieldOfView_      .addInterest ("set_fieldOfView___", this);
			this .fieldOfViewScale_ .addInterest ("set_fieldOfView___", this);

			this .set_fieldOfView___ ();
		},
		set_fieldOfView___: function ()
		{
			var
				length           = this .fieldOfView_ .length,
				fieldOfViewScale = this .fieldOfViewScale_ .getValue ();

			this .minimumX = (length > 0 ? this .fieldOfView_ [0] : -1) * fieldOfViewScale;
			this .minimumY = (length > 1 ? this .fieldOfView_ [1] : -1) * fieldOfViewScale;
			this .maximumX = (length > 2 ? this .fieldOfView_ [2] :  1) * fieldOfViewScale;
			this .maximumY = (length > 3 ? this .fieldOfView_ [3] :  1) * fieldOfViewScale;

			this .sizeX = this .maximumX - this .minimumX;
			this .sizeY = this .maximumY - this .minimumY;
		},
		getMinimumX: function ()
		{
			return this .minimumX;
		},
		getMinimumY: function ()
		{
			return this .minimumY;
		},
		getMaximumX: function ()
		{
			return this .maximumX;
		},
		getMaximumY: function ()
		{
			return this .maximumY;
		},
		getSizeX: function ()
		{
			return this .sizeX;
		},
		getSizeY: function ()
		{
			return this .sizeY;
		},
		getMaxFarValue: function ()
		{
			return 1e5;
		},
		getScreenScale: (function ()
		{
			var screenScale = new Vector3 (0, 0, 0);

			return function (point, viewport)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					sizeX  = this .sizeX,
					sizeY  = this .sizeY,
					aspect = width / height;
	
				if (aspect > sizeX / sizeY)
				{
					var s = sizeY / height;
	
					return screenScale .set (s, s, s);
				}
	
				var s = sizeX / width;
	
				return screenScale .set (s, s, s);
			};
		})(),
		getViewportSize: (function ()
		{
			var viewportSize = new Vector2 (0, 0);

			return function (viewport, nearValue)
			{
				var
					width  = viewport [2],
					height = viewport [3],
					sizeX  = this .sizeX,
					sizeY  = this .sizeY,
					aspect = width / height;
	
				if (aspect > sizeX / sizeY)
					return viewportSize .set (sizeY * aspect, sizeY);
	
				return viewportSize .set (sizeX, sizeX / aspect);
			};
		})(),
		getLookAtDistance: function (bbox)
		{
			return bbox .size .abs () / 2 + 10;
		},
		getProjectionMatrixWithLimits: function (nearValue, farValue, viewport)
		{
			var
				width  = viewport [2],
				height = viewport [3],
				aspect = width / height,
				sizeX  = this .sizeX,
				sizeY  = this .sizeY;

			if (aspect > sizeX / sizeY)
			{
				var
					center  = (this .minimumX + this .maximumX) / 2,
					size1_2 = (sizeY * aspect) / 2;

				return Camera .ortho (center - size1_2, center + size1_2, this .minimumY, this .maximumY, nearValue, farValue, this .projectionMatrix);
			}

			var
				center  = (this .minimumY + this .maximumY) / 2,
				size1_2 = (sizeX / aspect) / 2;

			return Camera .ortho (this .minimumX, this .maximumX, center - size1_2, center + size1_2, nearValue, farValue, this .projectionMatrix);
		},
	});

	return OrthoViewpoint;
});


