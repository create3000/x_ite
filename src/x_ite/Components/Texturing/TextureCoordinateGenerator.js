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
	"x_ite/Browser/Texturing/TextureCoordinateGeneratorModeType",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants,
          ModeType)
{
"use strict";

	function TextureCoordinateGenerator (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinateGenerator);

		this .mode      = ModeType .SPHERE;
		this .parameter = new Float32Array (6);
	}

	TextureCoordinateGenerator .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinateGenerator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "mode",      new Fields .SFString ("SPHERE")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "parameter", new Fields .MFFloat ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinateGenerator";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		getTexCoord: function (array)
		{
			return array;
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .mode_      .addInterest ("set_mode__",      this);
			this .parameter_ .addInterest ("set_parameter__", this);

			this .set_mode__ ();
			this .set_parameter__ ();
		},
		set_mode__: (function ()
		{
			var modes = new Map ([
				["SPHERE",                      ModeType .SPHERE],
				["CAMERASPACENORMAL",           ModeType .CAMERASPACENORMAL],
				["CAMERASPACEPOSITION",         ModeType .CAMERASPACEPOSITION],
				["CAMERASPACEREFLECTIONVECTOR", ModeType .CAMERASPACEREFLECTIONVECTOR],
				["SPHERE-LOCAL",                ModeType .SPHERE_LOCAL],
				["COORD",                       ModeType .COORD],
				["COORD-EYE",                   ModeType .COORD_EYE],
				["NOISE",                       ModeType .NOISE],
				["NOISE-EYE",                   ModeType .NOISE_EYE],
				["SPHERE-REFLECT",              ModeType .SPHERE_REFLECT],
				["SPHERE-REFLECT-LOCAL",        ModeType .SPHERE_REFLECT_LOCAL],
			]);

			return function ()
			{
				this .mode = modes .get (this .mode_ .getValue ());

				if (this .mode === undefined)
					this .mode = ModeType .SPHERE;
			};
		})(),
		set_parameter__: function ()
		{
			for (var i = 0, length = Math .min (this .parameter .length, this .parameter_ .length); i < length; ++ i)
				this .parameter [i] = this .parameter_ [i];

			this .parameter .fill (0, length);
		},
		get1Point: function (index, vector)
		{
			return vector;
		},
		addTexCoordToChannel: function (index, array)
		{
			array .push (0, 0, 0, 1);
		},
		getTexCoord: function (array)
		{
			return arrray;
		},
		setShaderUniformsToChannel: function (gl, shaderObject, channel)
		{
			gl .uniform1i  (shaderObject .x3d_TextureCoordinateGeneratorMode [channel],      this .mode);
			gl .uniform1fv (shaderObject .x3d_TextureCoordinateGeneratorParameter [channel], this .parameter);
		},
	});

	return TextureCoordinateGenerator;
});


