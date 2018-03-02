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
	"x_ite/Components/Texturing/X3DTextureTransformNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Matrix3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode, 
          X3DConstants,
          Vector2,
          Matrix3)
{
"use strict";

	var vector = new Vector2 (0, 0);

	function TextureTransform (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext);

		this .addType (X3DConstants .TextureTransform);

		this .rotation_ .setUnit ("angle");

		this .matrix3 = new Matrix3 ();
	}

	TextureTransform .prototype = Object .assign (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransform,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec2f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec2f (1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec2f ()),
		]),
		getTypeName: function ()
		{
			return "TextureTransform";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
		initialize: function ()
		{
			X3DTextureTransformNode .prototype .initialize .call (this);
			
			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			X3DTextureTransformNode .prototype .eventsProcessed .call (this);
			
			var
				translation = this .translation_ .getValue (),
				rotation    = this .rotation_ .getValue (),
				scale       = this .scale_ .getValue (),
				center      = this .center_ .getValue (),
				matrix3     = this .matrix3;

			matrix3 .identity ();

			if (! center .equals (Vector2 .Zero))
				matrix3 .translate (vector .assign (center) .negate ());

			if (! scale .equals (Vector2 .One))
				matrix3 .scale (scale);

			if (rotation !== 0)
				matrix3 .rotate (rotation);

			if (! center .equals (Vector2 .Zero))
				matrix3 .translate (center);

			if (! translation .equals (Vector2 .Zero))
				matrix3 .translate (translation);

			var matrix4 = this .getMatrix ();
			
			matrix4 [ 0] = matrix3 [0];
			matrix4 [ 1] = matrix3 [1];
			matrix4 [ 4] = matrix3 [3];
			matrix4 [ 5] = matrix3 [4];
			matrix4 [12] = matrix3 [6]; 
			matrix4 [13] = matrix3 [7];

			this .setMatrix (matrix4);
		},
	});

	return TextureTransform;
});


