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
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          TraverseType,
          X3DConstants)
{
"use strict";

	function BlendMode (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .BlendMode);

		this .blendTypes = { };
		this .blendModes = { };
	}

	BlendMode .prototype = $.extend (Object .create (X3DGroupingNode .prototype),
	{
		constructor: BlendMode,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "blendColor",       new Fields .SFColorRGBA ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "sourceColor",      new Fields .SFString ("SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "sourceAlpha",      new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "destinationColor", new Fields .SFString ("ONE")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "destinationAlpha", new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modeColor",        new Fields .SFString ("FUNC_ADD")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "modeAlpha",        new Fields .SFString ("FUNC_ADD")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "BlendMode";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);
	
			var gl = this .getBrowser () .getContext ();

			this .blendTypes ["ZERO"]                     = gl .ZERO;
			this .blendTypes ["ONE"]                      = gl .ONE;
			this .blendTypes ["SRC_COLOR"]                = gl .SRC_COLOR;
			this .blendTypes ["ONE_MINUS_SRC_COLOR"]      = gl .ONE_MINUS_SRC_COLOR;
			this .blendTypes ["DST_COLOR"]                = gl .DST_COLOR;
			this .blendTypes ["ONE_MINUS_DST_COLOR"]      = gl .ONE_MINUS_DST_COLOR;
			this .blendTypes ["SRC_ALPHA"]                = gl .SRC_ALPHA;
			this .blendTypes ["ONE_MINUS_SRC_ALPHA"]      = gl .ONE_MINUS_SRC_ALPHA;
			this .blendTypes ["DST_ALPHA"]                = gl .DST_ALPHA;
			this .blendTypes ["ONE_MINUS_DST_ALPHA"]      = gl .ONE_MINUS_DST_ALPHA;
			this .blendTypes ["CONSTANT_COLOR"]           = gl .CONSTANT_COLOR;
			this .blendTypes ["ONE_MINUS_CONSTANT_COLOR"] = gl .ONE_MINUS_CONSTANT_COLOR;
			this .blendTypes ["CONSTANT_ALPHA"]           = gl .CONSTANT_ALPHA;
			this .blendTypes ["ONE_MINUS_CONSTANT_ALPHA"] = gl .ONE_MINUS_CONSTANT_ALPHA;

			this .blendTypes ["SRC_ALPHA_SATURATE"]       = gl .SRC_ALPHA_SATURATE;
			this .blendTypes ["SRC1_COLOR"]               = gl .SRC1_COLOR;
			this .blendTypes ["SRC1_ALPHA"]               = gl .SRC1_ALPHA;

			this .blendModes ["FUNC_ADD"]              = gl .FUNC_ADD;
			this .blendModes ["FUNC_SUBTRACT"]         = gl .FUNC_SUBTRACT;
			this .blendModes ["FUNC_REVERSE_SUBTRACT"] = gl .FUNC_REVERSE_SUBTRACT;

			this .sourceColor_      .addInterest ("set_sourceColor__",      this);
			this .sourceAlpha_      .addInterest ("set_sourceAlpha__",      this);
			this .destinationColor_ .addInterest ("set_destinationColor__", this);
			this .destinationAlpha_ .addInterest ("set_destinationAlpha__", this);
			this .modeColor_        .addInterest ("set_modeColor__",        this);
			this .modeAlpha_        .addInterest ("set_modeAlpha__",        this);

			this .set_sourceColor__ ();
			this .set_sourceAlpha__ ();
			this .set_destinationColor__ ();
			this .set_destinationAlpha__ ();
			this .set_modeColor__ ();
			this .set_modeAlpha__ ();
		},
		set_sourceColor__: function ()
		{
			this .sourceColorType = this .blendTypes [this .sourceColor_ .getValue ()];

			if (! this .sourceColorType)
				this .sourceColorType = this .blendTypes ["SRC_ALPHA"];
		},
		set_sourceAlpha__: function ()
		{
			this .sourceAlphaType = this .blendTypes [this .sourceAlpha_ .getValue ()];

			if (! this .sourceAlphaType)
				this .sourceAlphaType = this .blendTypes ["ONE_MINUS_SRC_ALPHA"];
		},
		set_destinationColor__: function ()
		{
			this .destinationColorType = this .blendTypes [this .destinationColor_ .getValue ()];

			if (! this .destinationColorType)
				this .destinationColorType = this .blendTypes ["ONE"];
		},
		set_destinationAlpha__: function ()
		{
			this .destinationAlphaType = this .blendTypes [this .destinationAlpha_ .getValue ()];

			if (! this .destinationAlphaType)
				this .destinationAlphaType = this .blendTypes ["ONE_MINUS_SRC_ALPHA"];
		},
		set_modeColor__: function ()
		{
			this .modeColorType = this .blendModes [this .modeColor_ .getValue ()];

			if (! this .modeColorType)
				this .modeColorType = this .blendModes ["FUNC_ADD"];
		},
		set_modeAlpha__: function ()
		{
			this .modeAlphaType = this .blendModes [this .modeAlpha_ .getValue ()];

			if (! this .modeAlphaType)
				this .modeAlphaType = this .blendModes ["FUNC_ADD"];
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .DISPLAY:
				{
					renderObject .getBlend () .push (this .enabled_ .getValue ());
					renderObject .getLocalObjects () .push (this);

					X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

					renderObject .getLocalObjects () .pop ();
					renderObject .getBlend () .pop ();
					break;
				}
				default:
					X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
					break;
			}
		},
		enable: function (gl)
		{
			var color = this .blendColor_ .getValue ();

			this .blend = gl .isEnabled (gl .BLEND);

			if (this .enabled_ .getValue ())
				gl .enable (gl .BLEND);
			else
				gl .disable (gl .BLEND);

			gl .blendColor (color .r, color .g, color .b, color .a);
			gl .blendFuncSeparate (this .sourceColorType, this .sourceAlphaType, this .destinationColorType, this .destinationAlphaType);
			gl .blendEquationSeparate (this .modeColorType, this .modeAlphaType);
		},
		disable: function (gl)
		{
			if (this .blend)
				gl .enable (gl .BLEND);
			else
				gl .disable (gl .BLEND);

			gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
			gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);
		},
	});

	return BlendMode;
});


