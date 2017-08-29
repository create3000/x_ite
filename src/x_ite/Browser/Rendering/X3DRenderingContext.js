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


//https://github.com/sdecima/javascript-detect-element-resize

define ([
	"jquery",
	"x_ite/Fields",
	"x_ite/Components/Shaders/ComposedShader",
	"x_ite/Components/Shaders/ShaderPart",
	"text!x_ite/Browser/Shaders/PointSet.fs",
	"text!x_ite/Browser/Shaders/Wireframe.vs",
	"text!x_ite/Browser/Shaders/Wireframe.fs",
	"text!x_ite/Browser/Shaders/Gouraud.vs",
	"text!x_ite/Browser/Shaders/Gouraud.fs",
	"text!x_ite/Browser/Shaders/Phong.vs",
	"text!x_ite/Browser/Shaders/Phong.fs",
	"text!x_ite/Browser/Shaders/Depth.vs",
	"text!x_ite/Browser/Shaders/Depth.fs",
	"standard/Math/Numbers/Vector4",
],
function ($,
          Fields,
          ComposedShader,
          ShaderPart,
          pointSetFS,
          wireframeVS,
          wireframeFS,
          gouraudVS,
          gouraudFS,
          phongVS,
          phongFS,
          depthVS,
          depthFS,
          Vector4)
{
"use strict";

	function X3DRenderingContext ()
	{
		this .addChildObjects ("viewport", new Fields .MFInt32 (0, 0, 300, 150));

		this .clipPlanes = [ ]; // Clip planes dumpster
	}

	X3DRenderingContext .prototype =
	{
		initialize: function ()
		{
			// Configure context.

			var gl = this .getContext ();

			gl .enable (gl .SCISSOR_TEST);
			gl .cullFace (gl .BACK);
			gl .enable (gl .DEPTH_TEST);
			gl .depthFunc (gl .LEQUAL);
			gl .clearDepth (1);

			gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
			gl .enable (gl .BLEND);

			// Configure viewport.

			$(document) .on ('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', this .onfullscreen .bind (this));

			setInterval (this .reshape .bind (this), 401); // Detect canvas resize.

			this .reshape ();

			// Create shaders.

			this .depthShader = this .createShader (this, "DepthShader",     depthVS,     depthFS);
			this .pointShader = this .createShader (this, "PointShader",     wireframeVS, pointSetFS);
			this .lineShader  = this .createShader (this, "WireframeShader", wireframeVS, wireframeFS);

			this .pointShader .setGeometryType (0);
			this .lineShader  .setGeometryType (1);

			this .setShading ("GOURAUD");
		},
		getVendor: function ()
		{
			return this .getContext () .getParameter (this .getContext () .VENDOR);
		},
		getWebGLVersion: function ()
		{
			return this .getContext () .getParameter (this .getContext () .VERSION);
		},
		getAntialiased: function ()
		{
			return this .getContext () .getParameter (this .getContext () .SAMPLES) > 0;
		},
		getMaxClipPlanes: function ()
		{
			return 6;
		},
		getDepthSize: function ()
		{
			var gl = this .context;

			return gl .getParameter (gl .DEPTH_BITS);
		},
		getColorDepth: function ()
		{
			var gl = this .context;

			var colorDepth = 0;
			colorDepth += gl .getParameter (gl .RED_BITS);
			colorDepth += gl .getParameter (gl .BLUE_BITS);
			colorDepth += gl .getParameter (gl .GREEN_BITS);
			colorDepth += gl .getParameter (gl .ALPHA_BITS);

			return colorDepth;
		},
		getViewport: function ()
		{
			return this .viewport_;
		},
		createShader: function (browser, name, vs, fs)
		{
			var vertexShader = new ShaderPart (browser .getPrivateScene ());
			vertexShader .url_ .push (vs);
			vertexShader .setup ();

			var fragmentShader = new ShaderPart (browser .getPrivateScene ());
			fragmentShader .type_ = "FRAGMENT";
			fragmentShader .url_ .push (fs);
			fragmentShader .setup ();
	
			var shader = new ComposedShader (browser .getPrivateScene ());
			shader .setName (name);
			shader .language_ = "GLSL";
			shader .parts_ .push (vertexShader);
			shader .parts_ .push (fragmentShader);
			shader .setCustom (false);
			shader .setup ();

			this .getLoadSensor () .watchList_ .push (vertexShader);
			this .getLoadSensor () .watchList_ .push (fragmentShader);

			return shader;
		},
		setShading: function (type)
		{
			var gl = this .context;

			switch (type)
			{
				case "PHONG":
				{
					if (! this .phongShader)
						this .phongShader = this .createShader (this, "PhongShader", phongVS, phongFS);

					this .defaultShader = this .phongShader;
					break;
				}
				default:
				{
					if (! this .gouraudShader)
						this .gouraudShader = this .createShader (this, "GouraudShader", gouraudVS, gouraudFS);

					this .defaultShader = this .gouraudShader;
					break;
				}
			}

			// Configure custom shaders

			this .pointShader   .setGeometryType (0);
			this .lineShader    .setGeometryType (1);
			this .defaultShader .setGeometryType (3);

			var shaders = this .getShaders ();

			for (var id in shaders)
				shaders [id] .setShading (type);
		},
		getDefaultShader: function ()
		{
			return this .defaultShader;
		},
		getPointShader: function ()
		{
			return this .pointShader;
		},
		getLineShader: function ()
		{
			return this .lineShader;
		},
		getGouraudShader: function ()
		{
			// There must always be a gouraud shader available.
			return this .gouraudShader;
		},
		getDepthShader: function ()
		{
			return this .depthShader;
		},
		getClipPlanes: function ()
		{
			return this .clipPlanes;
		},
		reshape: function ()
		{
			var
			   canvas = this .canvas,
				width  = canvas .width (),
				height = canvas .height ();

			canvas = canvas [0];

			if (width !== canvas .width || height !== canvas .height)
			{
				this .viewport_ .setValue ([0, 0, width, height]);
				this .context .viewport (0, 0, width, height);
				this .context .scissor  (0, 0, width, height);

				canvas .width  = width;
				canvas .height = height;

				this .addBrowserEvent ();
			}
		},
		onfullscreen: function ()
		{
			if (this .getElement () .fullScreen ())
				this .getElement () .addClass  ("x_ite-private-fullscreen");
			else
				this .getElement () .removeClass ("x_ite-private-fullscreen");
		},
	};

	return X3DRenderingContext;
});
