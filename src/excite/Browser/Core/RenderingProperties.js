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
	"jquery",
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Basic/X3DBaseNode",
	"excite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode, 
          X3DConstants)
{
"use strict";
	
	function RenderingProperties (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addAlias ("AntiAliased", this .Antialiased_);
	}

	RenderingProperties .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: RenderingProperties,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .initializeOnly, "Shading",        new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "MaxTextureSize", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "TextureUnits",   new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "MaxLights",      new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "Antialiased",    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ColorDepth",     new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "TextureMemory",  new Fields .SFDouble ()),
		]),
		getTypeName: function ()
		{
			return "RenderingProperties";
		},
		getComponentName: function ()
		{
			return "Excite";
		},
		getContainerField: function ()
		{
			return "renderingProperties";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);

			var browser = this .getBrowser ();

			this .MaxTextureSize_ = browser .getMaxTextureSize ();
			this .TextureUnits_   = browser .getCombinedTextureUnits ();
			this .MaxLights_      = browser .getMaxLights ();
			this .ColorDepth_     = browser .getColorDepth ();
			this .TextureMemory_  = browser .getTextureMemory ();

			browser .getBrowserOptions () .Shading_ .addInterest ("set_shading__", this);

			this .set_shading__ (browser .getBrowserOptions () .Shading_);
		},
		set_shading__: function (shading)
		{
			this .Shading_ = shading;
		},
	});

	return RenderingProperties;
});
