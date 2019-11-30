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
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode,
          X3DConstants,
          Vector4)
{
"use strict";

	function TextureCoordinate (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinate);
	}

	TextureCoordinate .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec2f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index >= 0 && index < this .length)
			{
				const point = this .point;

				index *= 2;

				return vector .set (point [index], point [index + 1], 0, 1);
			}
			else if (index >= 0 && this .length)
			{
				const point = this .point;

				index %= this .length;
				index *= 2;

				return vector .set (point [index], point [index + 1], 0, 1);
			}
			else
			{
				return vector .set (0, 0, 0, 1);
			}
		},
		addTexCoordToChannel: function (index, array)
		{
			if (index >= 0 && index < this .length)
			{
				var point = this .point;

				index *= 2;

				array .push (point [index], point [index + 1], 0, 1);
			}
			else if (index >= 0 && this .length)
			{
				var point = this .point;

				index %= this .length;
				index *= 2;

				array .push (point [index], point [index + 1], 0, 1);
			}
			else
			{
				array .push (0, 0, 0, 1);
			}
		},
		getTexCoord: function (array)
		{
			var point = this .point_;

			for (var i = 0, length = point .length; i < length; ++ i)
			{
				var p = point [i];

				array [i] = new Vector4 (p .x, p .y, 0, 1);
			}

			array .length = length;

			return array;
		},
	});

	return TextureCoordinate;
});
