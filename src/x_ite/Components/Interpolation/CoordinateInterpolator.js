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
	"x_ite/Components/Interpolation/X3DInterpolatorNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          X3DConstants,
          Algorithm)
{
"use strict";

	function CoordinateInterpolator (executionContext)
	{
		X3DInterpolatorNode .call (this, executionContext);

		this .addType (X3DConstants .CoordinateInterpolator);
	}

	CoordinateInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
	{
		constructor: CoordinateInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .MFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "CoordinateInterpolator";
		},
		getComponentName: function ()
		{
			return "Interpolation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		set_keyValue__: function () { },
		interpolate: function (index0, index1, weight)
		{
			var
				keyValue = this .keyValue_ .getValue (),
				size     = this .key_ .length ? Math .floor (this .keyValue_ .length / this .key_ .length) : 0;

			this .value_changed_ .length = size;

			var value_changed = this .value_changed_ .getValue ();

			index0 *= size;
			index1  = index0 + (this .key_ .length > 1 ? size : 0);

			index0 *= 3;
			index1 *= 3;
			size   *= 3;

			for (var i = 0; i < size; i += 3)
			{
				value_changed [i + 0] = Algorithm .lerp (keyValue [index0 + i + 0], keyValue [index1 + i + 0], weight);
				value_changed [i + 1] = Algorithm .lerp (keyValue [index0 + i + 1], keyValue [index1 + i + 1], weight);
				value_changed [i + 2] = Algorithm .lerp (keyValue [index0 + i + 2], keyValue [index1 + i + 2], weight);
			}

			this .value_changed_ .addEvent ();
		},
	});

	return CoordinateInterpolator;
});


