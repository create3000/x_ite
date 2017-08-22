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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Fields",
	"cobweb/Basic/X3DFieldDefinition",
	"cobweb/Basic/FieldDefinitionArray",
	"cobweb/Components/Shaders/X3DShaderNode",
	"cobweb/Components/Shaders/X3DProgrammableShaderObject",
	"cobweb/Components/Networking/LoadSensor",
	"cobweb/Bits/X3DCast",
	"cobweb/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShaderNode, 
          X3DProgrammableShaderObject, 
          LoadSensor,
          X3DCast,
          X3DConstants)
{
"use strict";

	var currentShaderNode = null;

	function ComposedShader (executionContext)
	{
		X3DShaderNode               .call (this, executionContext);
		X3DProgrammableShaderObject .call (this, executionContext);

		this .addType (X3DConstants .ComposedShader);

		this .loadSensor = new LoadSensor (executionContext);
	}

	ComposedShader .prototype = $.extend (Object .create (X3DShaderNode .prototype),
		X3DProgrammableShaderObject .prototype,
	{
		constructor: ComposedShader,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "activate",   new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isSelected", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isValid",    new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "language",   new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "parts",      new Fields .MFNode ()),
		]),
		wireframe: false,
		getTypeName: function ()
		{
			return "ComposedShader";
		},
		getComponentName: function ()
		{
			return "Shaders";
		},
		getContainerField: function ()
		{
			return "shaders";
		},
		initialize: function ()
		{
			X3DShaderNode               .prototype .initialize .call (this);
			X3DProgrammableShaderObject .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .primitiveMode = gl .TRIANGLES;

			this .isLive () .addInterest ("set_live__", this);

			this .activate_ .addInterest ("set_activate__", this);
			this .parts_    .addFieldInterest (this .loadSensor .watchList_);

			this .loadSensor .isLoaded_ .addInterest ("set_loaded__", this);
			this .loadSensor .watchList_ = this .parts_;
			this .loadSensor .setPrivate (true);
			this .loadSensor .setup ();

			//Must not call set_live__.
		},
		getProgram: function ()
		{
			return this .program;
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				if (this .isValid_ .getValue ())
				{
					this .useProgram (this .getBrowser () .getContext ());
					this .addShaderFields ();
				}
			}
			else
			{
				if (this .isValid_ .getValue ())
				{
					this .useProgram (this .getBrowser () .getContext ());
					this .removeShaderFields ();
				}
			}
		},
		set_activate__: function ()
		{
			if (this .activate_ .getValue ())
				this .set_loaded__ ();
		},
		set_loaded__: function ()
		{
			if (this .loadSensor .isLoaded_ .getValue ())
			{
				var
					gl      = this .getBrowser () .getContext (),
					program = gl .createProgram (),
					parts   = this .parts_ .getValue (),
					valid   = 0;

				if (this .isValid_ .getValue ())
					this .removeShaderFields ();
	
				this .program = program;
	
				for (var i = 0, length = parts .length; i < length; ++ i)
				{
					var partNode = X3DCast (X3DConstants .ShaderPart, parts [i]);

					if (partNode)
					{
						valid += partNode .isValid ();
						gl .attachShader (program, partNode .getShader ());
					}
				}
	
				if (valid)
				{
					this .bindAttributeLocations (gl, program);

					gl .linkProgram (program);

					valid = valid && gl .getProgramParameter (program, gl .LINK_STATUS);
				}

				if (valid)
				{
					this .useProgram (gl);

					// Initialize uniform variables and attributes
					if (this .getDefaultUniforms ())
					{
						// Setup user-defined fields. 
						this .addShaderFields ();
					}
					else
						valid = false;

					// Debug
					// this .printProgramInfo ();
				}
				else
					console .warn ("Couldn't initialize " + this .getTypeName () + " '" + this .getName () + "': " + gl .getProgramInfoLog (program));

				if (valid != this .isValid_ .getValue ())
					this .isValid_ = valid;
			}
			else
			{
				if (this .isValid_ .getValue ())
					this .isValid_ = false;
			}
		},
		setGlobalUniforms: function (renderObject, gl, projectionMatrixArray, viewportArray)
		{
			if (currentShaderNode !== this)
			{
				currentShaderNode = this;

				gl .useProgram (this .program);
			}
			
			X3DProgrammableShaderObject .prototype .setGlobalUniforms .call (this, renderObject, gl, projectionMatrixArray, viewportArray);
		},
		setLocalUniforms: function (gl, context)
		{
			if (currentShaderNode !== this)
			{
				currentShaderNode = this;

				gl .useProgram (this .program);
			}

			X3DProgrammableShaderObject .prototype .setLocalUniforms .call (this, gl, context);
		},
		useProgram: function (gl)
		{
			if (currentShaderNode !== this)
			{
				currentShaderNode = this;

				gl .useProgram (this .program);
			}
		},
	});

	return ComposedShader;
});
