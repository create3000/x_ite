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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"excite/Basic/X3DBaseNode",
	"excite/Rendering/X3DRenderObject",
	"excite/Bits/TraverseType",
],
function (X3DBaseNode,
          X3DRenderObject,
          TraverseType)
{
"use strict";

	function DependentRenderer (executionContext)
	{
		X3DBaseNode     .call (this, executionContext);
		X3DRenderObject .call (this, executionContext);

		this .renderObject = null;
	}

	DependentRenderer .prototype = $.extend (Object .create (X3DBaseNode .prototype),
		X3DRenderObject .prototype,
	{
		constructor: DependentRenderer,
		initialize: function ()
		{
			X3DBaseNode     .prototype .initialize .call (this);
			X3DRenderObject .prototype .initialize .call (this);
		},
		isIndependent: function ()
		{
			return false;
		},
		setRenderer: function (value)
		{
			this .renderObject = value;
		},
		getBrowser: function ()
		{
			return this .renderObject .getBrowser ();
		},
		getLayer: function ()
		{
			return this .renderObject .getLayer ();
		},
		getBackground: function ()
		{
			return this .renderObject .getBackground ();
		},
		getFog: function ()
		{
			return this .renderObject .getFog ();
		},
		getNavigationInfo: function ()
		{
			return this .renderObject .getNavigationInfo ();
		},
		getViewpoint: function ()
		{
			return this .renderObject .getViewpoint ();
		},
		getLightContainer: function ()
		{
			return this .renderObject .getLights () [this .lightIndex ++];
		},
		render: function (type, group)
		{
			switch (type)
			{
				case TraverseType .COLLISION:
				{
					X3DRenderObject .prototype .render .call (this, type, group);
					break;
				}
				case TraverseType .DEPTH:
				{
					X3DRenderObject .prototype .render .call (this, type, group);
					break;
				}
				case TraverseType .DISPLAY:
				{
					this .lightIndex = 0;

					X3DRenderObject .prototype .render .call (this, type, group);

					var lights = this .renderObject .getLights ();

					for (var i = 0, length = lights .length; i < length; ++ i)
						lights [i] .getModelViewMatrix () .pop ();

					break;
				}
			}
		},
	});

	return DependentRenderer;
});
