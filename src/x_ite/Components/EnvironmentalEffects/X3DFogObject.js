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
	"x_ite/Bits/X3DConstants",
],
function (X3DConstants)
{
"use strict";

	function X3DFogObject (executionContext)
	{
		this .addType (X3DConstants .X3DFogObject);

		this .visibilityRange_ .setUnit ("length");

		this .hidden = false;
	}

	X3DFogObject .prototype =
	{
		constructor: X3DFogObject,
		initialize: function ()
		{
			this .fogType_ .addInterest ("set_fogType__", this);

			this .set_fogType__ ();
		},
		set_fogType__: function ()
		{
			switch (this .fogType_ .getValue ())
			{
				case "EXPONENTIAL":
					this .fogType = 2;
					break;
				//case "EXPONENTIAL2":
				//	this .fogType = 3;
				//	break;
				default:
					this .fogType = 1;
					break;
			}
		},
		setHidden: function (value)
		{
			this .hidden = value;

			this .getBrowser () .addBrowserEvent ();
		},
		getHidden: function ()
		{
			return this .hidden;
		},
		setShaderUniforms: function (gl, shaderObject, renderObject)
		{
			if (this .hidden)
				gl .uniform1i (shaderObject .x3d_FogType, 0); // NO_FOG

			else
			{
				var
					color           = this .color_ .getValue (),
					visibilityRange = Math .max (0, this .visibilityRange_ .getValue ());

				if (visibilityRange === 0)
					visibilityRange = renderObject .getNavigationInfo () .getFarValue (renderObject .getViewpoint ());

				gl .uniform1i (shaderObject .x3d_FogType,            this .fogType);
				gl .uniform3f (shaderObject .x3d_FogColor,           color .r, color .g, color .b);
				gl .uniform1f (shaderObject .x3d_FogVisibilityRange, visibilityRange);
			}
		},
	};

	return X3DFogObject;
});


