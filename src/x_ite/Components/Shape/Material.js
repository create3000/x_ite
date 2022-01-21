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
	"x_ite/Components/Shape/X3DOneSidedMaterialNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DOneSidedMaterialNode,
          X3DConstants,
          Algorithm)
{
"use strict";

	function Material (executionContext)
	{
		X3DOneSidedMaterialNode .call (this, executionContext);

		this .addType (X3DConstants .Material);

		this .diffuseColor  = new Float32Array (3);
		this .specularColor = new Float32Array (3);
	}

	Material .prototype = Object .assign (Object .create (X3DOneSidedMaterialNode .prototype),
	{
		constructor: Material,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "ambientIntensity",         new Fields .SFFloat (0.2)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTexture",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTextureMapping",    new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",             new Fields .SFColor (0.8, 0.8, 0.8)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTexture",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTextureMapping",    new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",            new Fields .SFColor ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "specularTexture",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "specularTextureMapping",   new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",            new Fields .SFColor ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping",   new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "shininess",                new Fields .SFFloat (0.2)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTexture",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTextureMapping",  new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionStrength",        new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTexture",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTextureMapping",  new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",              new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",     new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",             new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "Material";
		},
		getComponentName: function ()
		{
			return "Shape";
		},
		getContainerField: function ()
		{
			return "material";
		},
		initialize: function ()
		{
			X3DOneSidedMaterialNode .prototype .initialize .call (this);

			this .ambientIntensity_ .addInterest ("set_ambientIntensity__", this);
			this .diffuseColor_     .addInterest ("set_diffuseColor__",     this);
			this .specularColor_    .addInterest ("set_specularColor__",    this);
			this .shininess_        .addInterest ("set_shininess__",        this);

			this .set_ambientIntensity__ ();
			this .set_diffuseColor__ ();
			this .set_specularColor__ ();
			this .set_shininess__ ();
		},
		set_ambientIntensity__: function ()
		{
			this .ambientIntensity = Math .max (this .ambientIntensity_ .getValue (), 0);
		},
		set_diffuseColor__: function ()
		{
			//We cannot use this in Windows Edge:
			//this .diffuseColor .set (this .diffuseColor_ .getValue ());

			const
				diffuseColor  = this .diffuseColor,
				diffuseColor_ = this .diffuseColor_ .getValue ();

			diffuseColor [0] = diffuseColor_ .r;
			diffuseColor [1] = diffuseColor_ .g;
			diffuseColor [2] = diffuseColor_ .b;
		},
		set_specularColor__: function ()
		{
			//We cannot use this in Windows Edge:
			//this .specularColor .set (this .specularColor_ .getValue ());

			const
				specularColor  = this .specularColor,
				specularColor_ = this .specularColor_ .getValue ();

			specularColor [0] = specularColor_ .r;
			specularColor [1] = specularColor_ .g;
			specularColor [2] = specularColor_ .b;
		},
		set_shininess__: function ()
		{
			this .shininess = Algorithm .clamp (this .shininess_ .getValue (), 0, 1);
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			gl .uniform1i  (shaderObject .x3d_SeparateBackColor, false);
			gl .uniform1f  (shaderObject .x3d_AmbientIntensity,  this .ambientIntensity);
			gl .uniform3fv (shaderObject .x3d_DiffuseColor,      this .diffuseColor);
			gl .uniform3fv (shaderObject .x3d_SpecularColor,     this .specularColor);
			gl .uniform3fv (shaderObject .x3d_EmissiveColor,     this .emissiveColor);
			gl .uniform1f  (shaderObject .x3d_Shininess,         this .shininess);
			gl .uniform1f  (shaderObject .x3d_Transparency,      this .transparency);
		},
	});

	return Material;
});
