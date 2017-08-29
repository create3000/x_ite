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
	"x_ite/Fields/SFVec3",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function ($, X3DField, SFMatrixPrototypeTemplate, SFVec3, X3DConstants, Matrix4)
{
"use strict";

	function SFMatrix4Template (TypeName, Type, SFVec3)
	{
		function SFMatrix4 (m00, m01, m02, m03,
	                       m10, m11, m12, m13,
	                       m20, m21, m22, m23,
	                       m30, m31, m32, m33)
		{
			if (arguments .length)
			{
				if (arguments [0] instanceof Matrix4)
					return X3DField .call (this, arguments [0]);
	
				return X3DField .call (this, new Matrix4 (+m00, +m01, +m02, +m03,
	                                                   +m10, +m11, +m12, +m13,
	                                                   +m20, +m21, +m22, +m23,
	                                                   +m30, +m31, +m32, +m33));
			}

			return X3DField .call (this, new Matrix4 ());
		}
	
		SFMatrix4 .prototype = $.extend (Object .create (X3DField .prototype),
			SFMatrixPrototypeTemplate (Matrix4, SFVec3),
		{
			constructor: SFMatrix4,
			getTypeName: function ()
			{
				return TypeName;
			},
			getType: function ()
			{
				return Type;
			},
		});
	
		function defineProperty (i)
		{
			Object .defineProperty (SFMatrix4 .prototype, i,
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
	
		for (var i = 0; i < Matrix4 .prototype .length; ++ i)
			defineProperty (i);

		return SFMatrix4;
	}

	return {
		SFMatrix4d: SFMatrix4Template ("SFMatrix4d", X3DConstants .SFMatrix4d, SFVec3 .SFVec3d),
		SFMatrix4f: SFMatrix4Template ("SFMatrix4f", X3DConstants .SFMatrix4f, SFVec3 .SFVec3f),
		VrmlMatrix: SFMatrix4Template ("VrmlMatrix", X3DConstants .VrmlMatrix, SFVec3 .SFVec3f),
	};
});
