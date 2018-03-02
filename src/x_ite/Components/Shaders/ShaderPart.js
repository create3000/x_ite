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
	"x_ite/Browser/Shaders/Shader",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Components/Networking/X3DUrlObject",
	"x_ite/InputOutput/FileLoader",
	"x_ite/Bits/X3DConstants",
	"x_ite/DEBUG",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Shader,
          X3DNode, 
          X3DUrlObject,
          FileLoader,
          X3DConstants,
          DEBUG)
{
"use strict";

	var shaderTypes =
	{
		VERTEX:          "VERTEX_SHADER",
		TESS_CONTROL:    "TESS_CONTROL_SHADER",
		TESS_EVALUATION: "TESS_EVALUATION_SHADER",
		GEOMETRY:        "GEOMETRY_SHADER",
		FRAGMENT:        "FRAGMENT_SHADER",
		COMPUTE:         "COMPUTE_SHADER",
	};

	function ShaderPart (executionContext)
	{
		X3DNode      .call (this, executionContext);
		X3DUrlObject .call (this, executionContext);

		this .addType (X3DConstants .ShaderPart);
		
		this .addChildObjects ("buffer", new Fields .SFTime ());

		this .valid = false;
	}

	ShaderPart .prototype = Object .assign (Object .create (X3DNode .prototype),
		X3DUrlObject .prototype,
	{
		constructor: ShaderPart,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "type",     new Fields .SFString ("VERTEX")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "url",      new Fields .MFString ()),
		]),
		getTypeName: function ()
		{
			return "ShaderPart";
		},
		getComponentName: function ()
		{
			return "Shaders";
		},
		getContainerField: function ()
		{
			return "parts";
		},
		initialize: function ()
		{
			X3DNode      .prototype .initialize .call (this);
			X3DUrlObject .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .shader = gl .createShader (gl [this .getShaderType ()]);

			this .url_    .addInterest ("set_url__",    this);
			this .buffer_ .addInterest ("set_buffer__", this);

			this .set_url__ ();
		},
		set_url__: function ()
		{
			this .setLoadState (X3DConstants .NOT_STARTED_STATE);

			this .requestAsyncLoad ();
		},
		isValid: function ()
		{
			return this .valid;
		},
		getShader: function ()
		{
			return this .shader;
		},
		getShaderType: function ()
		{
			var type = shaderTypes [this .type_ .getValue ()];
			
			if (type)
				return type;

			return "VERTEX_SHADER";
		},
		getSourceText: function ()
		{
			return this .url_;
		},
		requestAsyncLoad: function ()
		{
			if (this .checkLoadState () == X3DConstants .COMPLETE_STATE || this .checkLoadState () == X3DConstants .IN_PROGRESS_STATE)
				return;
	
			this .setLoadState (X3DConstants .IN_PROGRESS_STATE);
			
			this .buffer_ .addEvent ();
		},
		set_buffer__: function ()
		{
			this .valid = false;

			new FileLoader (this) .loadDocument (this .url_, null,
			function (data, URL)
			{
				if (data === null)
				{
					// No URL could be loaded.
					this .setLoadState (X3DConstants .FAILED_STATE);
				}
				else
				{
					var gl = this .getBrowser () .getContext ();

					gl .shaderSource (this .shader, Shader .getShaderSource (this .getBrowser (), data));
					gl .compileShader (this .shader);
	
					this .valid = gl .getShaderParameter (this .shader, gl .COMPILE_STATUS);

					if (! this .valid)
						throw new Error (this .getTypeName () + " '" + this .getName () + "': " + gl .getShaderInfoLog (this .shader));

					this .setLoadState (X3DConstants .COMPLETE_STATE);
				}
			}
			.bind (this));
		},
	});

	return ShaderPart;
});

