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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x-ite/Fields",
	"x-ite/Basic/X3DFieldDefinition",
	"x-ite/Basic/FieldDefinitionArray",
	"x-ite/Components/Core/X3DBindableNode",
	"x-ite/Components/EnvironmentalEffects/X3DFogObject",
	"x-ite/Bits/TraverseType",
	"x-ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBindableNode, 
          X3DFogObject,
          TraverseType,
          X3DConstants)
{
"use strict";

	function Fog (executionContext)
	{
		X3DBindableNode .call (this, executionContext);
		X3DFogObject    .call (this, executionContext);

		this .addType (X3DConstants .Fog);
	}

	Fog .prototype = $.extend (Object .create (X3DBindableNode .prototype),
		X3DFogObject .prototype,
	{
		constructor: Fog,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",        new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fogType",         new Fields .SFString ("LINEAR")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "color",           new Fields .SFColor (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityRange", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",         new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",        new Fields .SFTime ()),
		]),
		getTypeName: function ()
		{
			return "Fog";
		},
		getComponentName: function ()
		{
			return "EnvironmentalEffects";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DBindableNode .prototype .initialize .call (this);
			X3DFogObject    .prototype .initialize .call (this);
		},
		bindToLayer: function (layer)
		{
			layer .getFogStack () .push (this);
		},
		unbindFromLayer: function (layer)
		{
			layer .getFogStack () .pop (this);
		},
		removeFromLayer: function (layer)
		{
			layer .getFogStack () .remove (this);
		},
		traverse: function (type, renderObject)
		{
			renderObject .getLayer () .getFogs () .push (this);
		},
	});

	return Fog;
});


