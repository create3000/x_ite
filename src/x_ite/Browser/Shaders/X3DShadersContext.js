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
	"x_ite/Browser/Core/Shading",
	"x_ite/Components/Shaders/ComposedShader",
	"x_ite/Components/Shaders/ShaderPart",
	"x_ite/Browser/Shaders/ShaderTest",
	"x_ite/Browser/Networking/urls",
],
function (Shading,
          ComposedShader,
          ShaderPart,
          ShaderTest,
          urls)
{
"use strict";

	function X3DShadersContext ()
	{
		this .shaders = new Set ();
	}

	X3DShadersContext .prototype =
	{
		initialize: function ()
		{
			this .setShading (Shading .GOURAUD);
		},
		getShadingLanguageVersion: function ()
		{
			return this .getContext () .getParameter (this .getContext () .SHADING_LANGUAGE_VERSION);
		},
		getMaxVertexUniformVectors: function ()
		{
			return this .getContext () .getParameter (this .getContext () .MAX_VERTEX_UNIFORM_VECTORS);
		},
		getMaxFragmentUniformVectors: function ()
		{
			return this .getContext () .getParameter (this .getContext () .MAX_FRAGMENT_UNIFORM_VECTORS);
		},
		getMaxVertexAttribs: function ()
		{
			return this .getContext () .getParameter (this .getContext () .MAX_VERTEX_ATTRIBS);
		},
		addShader: function (shader)
		{
			this .shaders .add (shader);

			shader .setShading (this .getBrowserOptions () .getShading ());
		},
		removeShader: function (shader)
		{
			this .shaders .delete (shader);
		},
		getShaders: function ()
		{
			return this .shaders;
		},
		getDefaultShader: function ()
		{ },
		getDefaultShadowShader: function ()
		{
			return this .getDefaultShader () .getShadowShader ();
		},
		hasPointShader: function ()
		{
			return !! this .pointShader;
		},
		getPointShader: function ()
		{
			if (this .pointShader)
				return this .pointShader;

			this .pointShader = this .createShader ("PointShader", "PointSet", false);

			this .pointShader .getShadowShader = this .getPointShader .bind (this);

			return this .pointShader;
		},
		hasLineShader: function ()
		{
			return !! this .lineShader;
		},
		getLineShader: function ()
		{
			if (this .lineShader)
				return this .lineShader;

			this .lineShader = this .createShader ("WireframeShader", "Wireframe", false);

			this .lineShader .getShadowShader = this .getLineShader .bind (this);

			return this .lineShader;
		},
		hasGouraudShader: function ()
		{
			return !! this .gouraudShader;
		},
		getGouraudShader: function ()
		{
			if (this .gouraudShader)
				return this .gouraudShader;

			this .gouraudShader = this .createShader ("GouraudShader", "Gouraud", false);

			this .gouraudShader .getShadowShader = this .getShadowShader .bind (this);

			this .gouraudShader .isValid_ .addInterest ("set_gouraud_shader_valid__", this);

			return this .gouraudShader;
		},
		hasPhongShader: function ()
		{
			return !! this .phongShader;
		},
		getPhongShader: function ()
		{
			if (this .phongShader)
				return this .phongShader;

			this .phongShader = this .createShader ("PhongShader", "Phong", false);

			this .phongShader .getShadowShader = this .getShadowShader .bind (this);

			this .phongShader .isValid_ .addInterest ("set_phong_shader_valid__", this);

			return this .phongShader;
		},
		hasShadowShader: function ()
		{
			return !! this .shadowShader;
		},
		getShadowShader: function ()
		{
			if (this .shadowShader)
				return this .shadowShader;

			this .shadowShader = this .createShader ("ShadowShader", "Phong", true);

			this .shadowShader .isValid_ .addInterest ("set_shadow_shader_valid__", this);

			return this .shadowShader;
		},
		hasDepthShader: function ()
		{
			return !! this .depthShader;
		},
		getDepthShader: function ()
		{
			if (this .depthShader)
				return this .depthShader;

			this .depthShader = this .createShader ("DepthShader", "Depth", false);

			return this .depthShader;
		},
		setShading: function (type)
		{
			switch (type)
			{
				case Shading .PHONG:
				{
					this .getDefaultShader = this .getPhongShader;
					break;
				}
				default:
				{
					this .getDefaultShader = this .getGouraudShader;
					break;
				}
			}

			// Configure shaders.

			for (var shader of this .getShaders ())
				shader .setShading (type);
		},
		createShader: function (name, file, shadow)
		{
			if (this .getDebug ())
				console .log ("Initializing " + name);

			var version = this .getContext () .getVersion ();

			var vertexShader = new ShaderPart (this .getPrivateScene ());
			vertexShader .setName (name + "Vertex");
			vertexShader .url_ .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".vs"));
			vertexShader .setShadow (shadow);
			vertexShader .setup ();

			var fragmentShader = new ShaderPart (this .getPrivateScene ());
			fragmentShader .setName (name + "Fragment");
			fragmentShader .type_  = "FRAGMENT";
			fragmentShader .url_ .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".fs"));
			fragmentShader .setShadow (shadow);
			fragmentShader .setup ();

			var shader = new ComposedShader (this .getPrivateScene ());
			shader .setName (name);
			shader .language_ = "GLSL";
			shader .parts_ .push (vertexShader);
			shader .parts_ .push (fragmentShader);
			shader .setCustom (false);
			shader .setShading (this .getBrowserOptions () .getShading ());
			shader .setup ();

			this .addShader (shader);

			return shader;
		},
		set_gouraud_shader_valid__: function (valid)
		{
			this .gouraudShader .isValid_ .removeInterest ("set_gouraud_shader_valid__", this);

			if (valid .getValue () && ShaderTest .verify (this, this .gouraudShader))
				return;

			console .warn ("X_ITE: All else fails, using fallback VRML shader.");

			// Recompile shader.
			this .gouraudShader .parts_ [0] .url = [ urls .getShaderUrl ("webgl1/Fallback.vs") ];
			this .gouraudShader .parts_ [1] .url = [ urls .getShaderUrl ("webgl1/Fallback.fs") ];
		},
		set_phong_shader_valid__: function (valid)
		{
			this .phongShader .isValid_ .removeInterest ("set_phong_shader_valid__", this);

			if (valid .getValue () && ShaderTest .verify (this, this .phongShader))
				return;

			console .warn ("X_ITE: Phong shading is not available, using Gouraud shading.");

			this .phongShader = this .getGouraudShader ();
		},
		set_shadow_shader_valid__: function (valid)
		{
			this .shadowShader .isValid_ .removeInterest ("set_shadow_shader_valid__", this);

			if (valid .getValue () && ShaderTest .verify (this, this .shadowShader))
				return;

			console .warn ("X_ITE: Shadow shading is not available, using Gouraud shading.");

			this .shadowShader = this .getGouraudShader ();
		},
	};

	return X3DShadersContext;
});
