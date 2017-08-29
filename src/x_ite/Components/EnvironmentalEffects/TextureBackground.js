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
	"x_ite/Components/EnvironmentalEffects/X3DBackgroundNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBackgroundNode, 
          X3DCast,
          X3DConstants)
{
"use strict";

	function TextureBackground (executionContext)
	{
		X3DBackgroundNode .call (this, executionContext);

		this .addType (X3DConstants .TextureBackground);
	}

	TextureBackground .prototype = $.extend (Object .create (X3DBackgroundNode .prototype),
	{
		constructor: TextureBackground,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",      new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "skyAngle",      new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "skyColor",      new Fields .MFColor (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "groundAngle",   new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "groundColor",   new Fields .MFColor ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",      new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "frontTexture",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "backTexture",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "leftTexture",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "rightTexture",  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "topTexture",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "bottomTexture", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "TextureBackground";
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
			X3DBackgroundNode .prototype .initialize .call (this);

			this .frontTexture_  .addInterest ("set_frontTexture__", this);
			this .backTexture_   .addInterest ("set_backTexture__", this);
			this .leftTexture_   .addInterest ("set_leftTexture__", this);
			this .rightTexture_  .addInterest ("set_rightTexture__", this);
			this .topTexture_    .addInterest ("set_topTexture__", this);
			this .bottomTexture_ .addInterest ("set_bottomTexture__", this);

			this .set_frontTexture__  (this .frontTexture_);
			this .set_backTexture__   (this .backTexture_);
			this .set_leftTexture__   (this .leftTexture_);
			this .set_rightTexture__  (this .rightTexture_);
			this .set_topTexture__    (this .topTexture_);
			this .set_bottomTexture__ (this .bottomTexture_);
		},
		set_frontTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_frontTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .frontTexture_));
		},
		set_backTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_backTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .backTexture_));
		},
		set_leftTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_leftTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .leftTexture_));
		},
		set_rightTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_rightTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .rightTexture_));
		},
		set_topTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_topTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .topTexture_));
		},
		set_bottomTexture__: function ()
		{
			X3DBackgroundNode .prototype .set_bottomTexture__ .call (this, X3DCast (X3DConstants .X3DTextureNode, this .bottomTexture_));
		},
	});

	return TextureBackground;
});


