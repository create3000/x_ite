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
	"ResizeSensor",
],
function ($,
          Fields,
          ResizeSensor)
{
"use strict";

	function X3DRenderingContext ()
	{
		this .addChildObjects ("viewport", new Fields .MFInt32 (0, 0, 300, 150));

		this .localObjects = [ ]; // shader objects dumpster
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
			gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);
			gl .enable (gl .BLEND);

			// Configure viewport.

			$(document) .on ('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', this .onfullscreen .bind (this));

			this .resizer = new ResizeSensor (this .getSurface (), this .reshape .bind (this));

			this .reshape ();
		},
		getRenderer: function ()
		{
			var dbgRenderInfo = this .getExtension ("WEBGL_debug_renderer_info");

			if (dbgRenderInfo)
				return this .getContext () .getParameter (dbgRenderInfo .UNMASKED_RENDERER_WEBGL);

			return this .getContext () .getParameter (this .getContext () .RENDERER);
		},
		getVendor: function ()
		{
			var dbgRenderInfo = this .getExtension ("WEBGL_debug_renderer_info");

			if (dbgRenderInfo)
				return this .getContext () .getParameter (dbgRenderInfo .UNMASKED_VENDOR_WEBGL);

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
		getLocalObjects: function ()
		{
			return this .localObjects;
		},
		reshape: function ()
		{
			var
				gl     = this .getContext (),
				canvas = this .getCanvas (),
				width  = canvas .width (),
				height = canvas .height ();

			canvas = canvas [0];

			canvas .width  = width;
			canvas .height = height;

			this .viewport_ [2] = width;
			this .viewport_ [3] = height;

			gl .viewport (0, 0, width, height);
			gl .scissor  (0, 0, width, height);

			this .addBrowserEvent ();
		},
		onfullscreen: function ()
		{
			if (this .getElement () .fullScreen ())
				this .getElement () .addClass  ("x_ite-fullscreen");
			else
				this .getElement () .removeClass ("x_ite-fullscreen");
		},
	};

	return X3DRenderingContext;
});
