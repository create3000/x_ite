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
	"excite/Components/Shape/X3DAppearanceNode",
	"excite/Bits/X3DCast",
	"excite/Bits/X3DConstants",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DAppearanceNode,
          X3DCast,
          X3DConstants)
{
"use strict";

	function Appearance (executionContext)
	{
		X3DAppearanceNode .call (this, executionContext);

		this .addType (X3DConstants .Appearance);

		this .linePropertiesNode   = null;
		this .materialNode         = null;
		this .textureNode          = null;
		this .textureTransformNode = null;
		this .shaderNodes          = [ ];
		this .shaderNode           = null;
	}

	Appearance .prototype = $.extend (Object .create (X3DAppearanceNode .prototype),
	{
		constructor: Appearance,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fillProperties",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "lineProperties",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "material",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "texture",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "textureTransform", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "shaders",          new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "Appearance";
		},
		getComponentName: function ()
		{
			return "Shape";
		},
		getContainerField: function ()
		{
			return "appearance";
		},
		initialize: function ()
		{
			X3DAppearanceNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);

			this .lineProperties_   .addInterest ("set_lineProperties__", this);
			this .material_         .addInterest ("set_material__", this);
			this .texture_          .addInterest ("set_texture__", this);
			this .textureTransform_ .addInterest ("set_textureTransform__", this);
			this .shaders_          .addInterest ("set_shaders__", this);

			this .set_lineProperties__ ();
			this .set_material__ ();
			this .set_texture__ ();
			this .set_textureTransform__ ();
			this .set_shaders__ ();
		},
		getLineProperties: function ()
		{
			return this .linePropertiesNode;
		},
		getMaterial: function ()
		{
			return this .materialNode;
		},
		getTexture: function ()
		{
			return this .textureNode;
		},
		getTextureTransform: function ()
		{
			return this .textureTransformNode;
		},
		set_lineProperties__: function ()
		{
			this .linePropertiesNode = X3DCast (X3DConstants .LineProperties, this .lineProperties_);
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				if (this .shaderNode)
					this .getBrowser () .addShader (this .shaderNode);
			}
			else
			{
				if (this .shaderNode)
				this .getBrowser () .removeShader (this .shaderNode);
			}
		},
		set_material__: function ()
		{
			if (this .materialNode)
				this .materialNode .transparent_ .removeInterest ("set_transparent__", this);

			this .materialNode = X3DCast (X3DConstants .X3DMaterialNode, this .material_);

			if (this .materialNode)
				this .materialNode .transparent_ .addInterest ("set_transparent__", this);
			
			this .set_transparent__ ();
		},
		set_texture__: function ()
		{
			if (this .textureNode)
				this .textureNode .transparent_ .removeInterest ("set_transparent__", this);

			this .textureNode = X3DCast (X3DConstants .X3DTextureNode, this .texture_);

			if (this .textureNode)
				this .textureNode .transparent_ .addInterest ("set_transparent__", this);

			this .generatedCubeMapTexture = X3DCast (X3DConstants .GeneratedCubeMapTexture, this .texture_);

			this .set_transparent__ ();
		},
		set_textureTransform__: function ()
		{
			this .textureTransformNode = X3DCast (X3DConstants .X3DTextureTransformNode, this .textureTransform_);
			
			if (this .textureTransformNode)
				return;

			this .textureTransformNode = this .getBrowser () .getDefaultTextureTransform ();
		},
		set_shaders__: function ()
		{
			var
				shaders     = this .shaders_ .getValue (),
				shaderNodes = this .shaderNodes;

			for (var i = 0, length = shaderNodes .length; i < length; ++ i)
				shaderNodes [i] .isValid_ .removeInterest ("set_shader__", this);
		
			shaderNodes .length = 0;
		
			for (var i = 0, length = shaders .length; i < length; ++ i)
			{
				var shaderNode = X3DCast (X3DConstants .X3DShaderNode, shaders [i]);
		
				if (shaderNode)
				{
					shaderNodes .push (shaderNode);
					shaderNode .isValid_ .addInterest ("set_shader__", this);
				}
			}

			this .set_shader__ ();
		},
		set_shader__: function ()
		{
			var shaderNodes = this .shaderNodes;

			if (this .shaderNode)
				this .getBrowser () .removeShader (this .shaderNode);

			this .shaderNode = null;

			for (var i = 0, length = shaderNodes .length; i < length; ++ i)
			{
				if (shaderNodes [i] .isValid_ .getValue ())
				{
					this .shaderNode = shaderNodes [i];
					break;
				}
			}

			if (this .isLive () .getValue ())
			{
				if (this .shaderNode)
					this .getBrowser () .addShader (this .shaderNode);
			}

			this .set_transparent__ ();
		},
		set_transparent__: function ()
		{
			this .transparent_ = (this .materialNode && this .materialNode .transparent_ .getValue ()) ||
			                     (this .textureNode  && this .textureNode  .transparent_ .getValue ());
		},
		traverse: function (type, renderObject)
		{
			if (this .generatedCubeMapTexture)
				this .generatedCubeMapTexture .traverse (type, renderObject);

			if (this .shaderNode)
				this .shaderNode .traverse (type, renderObject);
		},
		display: function (context)
		{
			context .linePropertiesNode   = this .linePropertiesNode;
			context .materialNode         = this .materialNode;
			context .textureNode          = this .textureNode;
			context .textureTransformNode = this .textureTransformNode;
			context .shaderNode           = this .shaderNode || context .renderer .getBrowser () .getDefaultShader ();
		},
	});

	return Appearance;
});


