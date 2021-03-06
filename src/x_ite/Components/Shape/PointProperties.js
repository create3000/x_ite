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
	"x_ite/Components/Shape/X3DAppearanceChildNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DAppearanceChildNode,
          X3DConstants)
{
"use strict";

	function PointProperties (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .PointProperties);

		this .pointSizeAttenuation = new Float32Array (3);
	}

	PointProperties .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: PointProperties,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeScaleFactor", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMinValue",    new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMaxValue",    new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeAttenuation", new Fields .MFFloat (1, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "colorMode",            new Fields .SFString ("TEXTURE_AND_POINT_COLOR")),
		]),
		getTypeName: function ()
		{
			return "PointProperties";
		},
		getComponentName: function ()
		{
			return "Shape";
		},
		getContainerField: function ()
		{
			return "pointProperties";
		},
		initialize: function ()
		{
			X3DAppearanceChildNode .prototype .initialize .call (this);

			this .pointSizeScaleFactor_ .addInterest ("set_pointSizeScaleFactor__", this);
			this .pointSizeMinValue_    .addInterest ("set_pointSizeMinValue__",    this);
			this .pointSizeMaxValue_    .addInterest ("set_pointSizeMaxValue__",    this);
			this .pointSizeAttenuation_ .addInterest ("set_pointSizeAttenuation__", this);
			this .colorMode_            .addInterest ("set_colorMode__",            this);

			this .set_pointSizeScaleFactor__ ();
			this .set_pointSizeMinValue__ ();
			this .set_pointSizeMaxValue__ ();
			this .set_pointSizeAttenuation__ ();
			this .set_colorMode__ ();
		},
		set_pointSizeScaleFactor__: function ()
		{
			this .pointSizeScaleFactor = Math .max (1, this .pointSizeScaleFactor_ .getValue ());
		},
		set_pointSizeMinValue__: function ()
		{
			this .pointSizeMinValue = Math .max (0, this .pointSizeMinValue_ .getValue ());
		},
		set_pointSizeMaxValue__: function ()
		{
			this .pointSizeMaxValue = Math .max (0, this .pointSizeMaxValue_ .getValue ());
		},
		set_pointSizeAttenuation__: function ()
		{
			var length = this .pointSizeAttenuation_ .length;

			this .pointSizeAttenuation [0] = length > 0 ? Math .max (0, this .pointSizeAttenuation_ [0]) : 1;
			this .pointSizeAttenuation [1] = length > 1 ? Math .max (0, this .pointSizeAttenuation_ [1]) : 0;
			this .pointSizeAttenuation [2] = length > 2 ? Math .max (0, this .pointSizeAttenuation_ [2]) : 0;
		},
		set_colorMode__: (function ()
		{
			var colorModes = new Map ([
				["POINT_COLOR",             0],
				["TEXTURE_COLOR",           1],
				["TEXTURE_AND_POINT_COLOR", 2],
			]);

			return function ()
			{
				var colorMode = colorModes .get (this .colorMode_ .getValue ());

				if (colorMode !== undefined)
					this .colorMode = colorMode;
				else
					this .colorMode = colorModes .get ("TEXTURE_AND_POINT_COLOR");
			};
		})(),
		setShaderUniforms: function (gl, shaderObject)
		{
			gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeScaleFactor, this .pointSizeScaleFactor);
			gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMinValue,    this .pointSizeMinValue);
			gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMaxValue,    this .pointSizeMaxValue);
			gl .uniform3fv (shaderObject .x3d_PointPropertiesPointSizeAttenuation, this .pointSizeAttenuation);
			gl .uniform1i  (shaderObject .x3d_PointPropertiesColorMode,            this .colorMode);
		},
	});

	return PointProperties;
});
