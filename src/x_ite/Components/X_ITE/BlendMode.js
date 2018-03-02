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
	"x_ite/Components/Shape/X3DAppearanceChildNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DAppearanceChildNode,
          TraverseType,
          X3DConstants)
{
"use strict";

	function BlendMode (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .BlendMode);

		this .blendTypes = { };
		this .blendModes = { };
	}

	BlendMode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: BlendMode,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "blendColor",              new Fields .SFColorRGBA ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "sourceColorFactor",       new Fields .SFString ("SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "sourceAlphaFactor",       new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "destinationColorFactor",  new Fields .SFString ("ONE")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "destinationAlphaFactor",  new Fields .SFString ("ONE_MINUS_SRC_ALPHA")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "colorEquation",           new Fields .SFString ("FUNC_ADD")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "alphaEquation",           new Fields .SFString ("FUNC_ADD")),
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
			return "blendMode";
		},
		initialize: function ()
		{
			X3DAppearanceChildNode .prototype .initialize .call (this);
	
			var
				gl  = this .getBrowser () .getContext (),
				ext = gl .getExtension ('EXT_blend_minmax');

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
			this .blendTypes ["SRC_ALPHA_SATURATE"]       = gl .SRC_ALPHA_SATURATE;
			this .blendTypes ["CONSTANT_COLOR"]           = gl .CONSTANT_COLOR;
			this .blendTypes ["ONE_MINUS_CONSTANT_COLOR"] = gl .ONE_MINUS_CONSTANT_COLOR;
			this .blendTypes ["CONSTANT_ALPHA"]           = gl .CONSTANT_ALPHA;
			this .blendTypes ["ONE_MINUS_CONSTANT_ALPHA"] = gl .ONE_MINUS_CONSTANT_ALPHA;

			this .blendModes ["FUNC_ADD"]              = gl .FUNC_ADD;
			this .blendModes ["FUNC_SUBTRACT"]         = gl .FUNC_SUBTRACT;
			this .blendModes ["FUNC_REVERSE_SUBTRACT"] = gl .FUNC_REVERSE_SUBTRACT;
			this .blendModes ["MIN"]                   = gl .MIN || ext .MIN_EXT;
			this .blendModes ["MAX"]                   = gl .MAX || ext .MAX_EXT;

			this .sourceColorFactor_      .addInterest ("set_sourceColorFactor__", this);
			this .sourceAlphaFactor_      .addInterest ("set_sourceAlphaFactor__", this);
			this .destinationColorFactor_ .addInterest ("set_destinationColorFactor__",  this);
			this .destinationAlphaFactor_ .addInterest ("set_destinationAlphaFactor__",  this);
			this .colorEquation_          .addInterest ("set_colorEquation__",     this);
			this .alphaEquation_          .addInterest ("set_alphaEquation__",     this);

			this .set_sourceColorFactor__ ();
			this .set_sourceAlphaFactor__ ();
			this .set_destinationColorFactor__ ();
			this .set_destinationAlphaFactor__ ();
			this .set_colorEquation__ ();
			this .set_alphaEquation__ ();
		},
		set_sourceColorFactor__: function ()
		{
			this .sourceColorFactorType = this .blendTypes [this .sourceColorFactor_ .getValue ()];

			if (! this .sourceColorFactorType)
				this .sourceColorFactorType = this .blendTypes ["SRC_ALPHA"];
		},
		set_sourceAlphaFactor__: function ()
		{
			this .sourceAlphaFactorType = this .blendTypes [this .sourceAlphaFactor_ .getValue ()];

			if (! this .sourceAlphaFactorType)
				this .sourceAlphaFactorType = this .blendTypes ["ONE_MINUS_SRC_ALPHA"];
		},
		set_destinationColorFactor__: function ()
		{
			this .destinationColorFactorType = this .blendTypes [this .destinationColorFactor_ .getValue ()];

			if (! this .destinationColorFactorType)
				this .destinationColorFactorType = this .blendTypes ["ONE"];
		},
		set_destinationAlphaFactor__: function ()
		{
			this .destinationAlphaFactorType = this .blendTypes [this .destinationAlphaFactor_ .getValue ()];

			if (! this .destinationAlphaFactorType)
				this .destinationAlphaFactorType = this .blendTypes ["ONE_MINUS_SRC_ALPHA"];
		},
		set_colorEquation__: function ()
		{
			this .colorEquationType = this .blendModes [this .colorEquation_ .getValue ()];

			if (! this .colorEquationType)
				this .colorEquationType = this .blendModes ["FUNC_ADD"];
		},
		set_alphaEquation__: function ()
		{
			this .alphaEquationType = this .blendModes [this .alphaEquation_ .getValue ()];

			if (! this .alphaEquationType)
				this .alphaEquationType = this .blendModes ["FUNC_ADD"];
		},
		enable: function (gl)
		{
			var color = this .blendColor_ .getValue ();

			gl .blendColor (color .r, color .g, color .b, color .a);
			gl .blendFuncSeparate (this .sourceColorFactorType, this .sourceAlphaFactorType, this .destinationColorFactorType, this .destinationAlphaFactorType);
			gl .blendEquationSeparate (this .colorEquationType, this .alphaEquationType);
		},
		disable: function (gl)
		{
			gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
			gl .blendEquationSeparate (gl .FUNC_ADD, gl .FUNC_ADD);
		},
	});

	return BlendMode;
});


