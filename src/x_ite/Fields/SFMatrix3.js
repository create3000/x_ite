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
	"jquery",
	"x_ite/Basic/X3DField",
	"x_ite/Fields/SFMatrixPrototypeTemplate",
	"x_ite/Fields/SFVec2",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix3",
],
function ($, X3DField, SFMatrixPrototypeTemplate, SFVec2, X3DConstants, Matrix3)
{
"use strict";

	function SFMatrix3Template (TypeName, Type, SFVec2)
	{
		function SFMatrix3 (m00, m01, m02,
	                       m10, m11, m12,
	                       m20, m21, m22)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Matrix3)
					return X3DField .call (this, arguments [0]);
	
				return X3DField .call (this, new Matrix3 (+m00, +m01, +m02,
	                                                   +m10, +m11, +m12,
	                                                   +m20, +m21, +m22));
			}

			return X3DField .call (this, new Matrix3 ());
		}
	
		SFMatrix3 .prototype = $.extend (Object .create (X3DField .prototype),
			SFMatrixPrototypeTemplate (Matrix3, SFVec2),
		{
			constructor: SFMatrix3,
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
			setTransform: function (translation, rotation, scale, scaleOrientation, center)
			{
				translation      = translation      ? translation      .getValue () : null;
				rotation         = rotation         ? rotation                      : 0;
				scale            = scale            ? scale            .getValue () : null;
				scaleOrientation = scaleOrientation ? scaleOrientation              : 0;
				center           = center           ? center           .getValue () : null;
	
				this .getValue () .set (translation, rotation, scale, scaleOrientation, center);
			},
		});
	
		function defineProperty (i)
		{
			Object .defineProperty (SFMatrix3 .prototype, i,
			{
				get: function ()
				{
					return this .getValue () [i];
				},
				set: function (value)
				{
					this .getValue () [i] = value;
					this .addEvent ();
				},
				enumerable: false,
				configurable: false
			});
		}
	
		for (var i = 0; i < Matrix3 .prototype .length; ++ i)
			defineProperty (i);

		return SFMatrix3;
	}

	return {
		SFMatrix3d: SFMatrix3Template ("SFMatrix3d", X3DConstants .SFMatrix3d, SFVec2 .SFVec2d),
		SFMatrix3f: SFMatrix3Template ("SFMatrix3f", X3DConstants .SFMatrix3f, SFVec2 .SFVec2f),
	};
});
