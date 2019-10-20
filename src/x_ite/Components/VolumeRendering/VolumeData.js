/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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
	"x_ite/Components/VolumeRendering/X3DVolumeDataNode",
	"x_ite/Components/Shaders/ComposedShader",
	"x_ite/Components/Shaders/ShaderPart",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"text!x_ite/Browser/VolumeRendering/VolumeStyle.vs",
	"text!x_ite/Browser/VolumeRendering/VolumeStyle.fs",
	"x_ite/DEBUG",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeDataNode,
          ComposedShader,
          ShaderPart,
          X3DConstants,
          X3DCast,
          vs,
          fs,
          DEBUG)
{
"use strict";

	function VolumeData (executionContext)
	{
		X3DVolumeDataNode .call (this, executionContext);

		this .addType (X3DConstants .VolumeData);

		this .renderStyleNode = null;
		this .blendModeNode   = executionContext .createNode ("BlendMode", false);
  }

	VolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
	{
		constructor: VolumeData,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",  new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
		]),
		getTypeName: function ()
		{
			return "VolumeData";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DVolumeDataNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .renderStyle_ .addInterest ("set_renderStyle__", this);
			this .voxels_      .addInterest ("set_voxels__",      this);
			this .voxels_      .addFieldInterest (this .getAppearance () .texture_);

			this .renderStyle_ .addInterest ("update", this);

			this .blendModeNode .setup ();

			this .getAppearance () .texture_   = this .voxels_;
			this .getAppearance () .blendMode_ = this .blendModeNode;

			this .set_renderStyle__ ();
			this .set_voxels__ ();

			this .update ();
		},
		set_renderStyle__: function ()
		{
			if (this .renderStyleNode)
			{
				this .renderStyleNode .removeInterest ("update", this);
				this .renderStyleNode .removeVolumeData (this);
			}

			this .renderStyleNode = X3DCast (X3DConstants .X3DVolumeRenderStyleNode, this .renderStyle_);

			if (this .renderStyleNode)
			{
				this .renderStyleNode .addInterest ("update", this);
				this .renderStyleNode .addVolumeData (this);
			}
		},
		set_voxels__: function ()
		{
			if (this .voxelsNode)
				this .voxelsNode .removeInterest ("set_textureSize__", this);

			this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .voxels_);

			if (this .voxelsNode)
			{
				this .voxelsNode .addInterest ("set_textureSize__", this);

				this .set_textureSize__ ();
			}
		},
		set_textureSize__: function ()
		{
			try
			{
				var textureSize = this .getShader () .getField ("x3d_TextureSize");

				textureSize .x = this .voxelsNode .getWidth ();
				textureSize .y = this .voxelsNode .getHeight ();
				textureSize .z = this .voxelsNode .getDepth ();
			}
			catch (error)
			{
				if (DEBUG)
					console .log (error .message);
			}
		},
		update: function ()
		{
			this .setShader (this .createShader (vs, fs));
		},
		createShader: function (vs, fs)
		{
			if (DEBUG)
				console .log ("Creating VolumeData Shader ...");

			var
				opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
				styleUniforms         = opacityMapVolumeStyle .getUniformsText (),
				styleFunctions        = opacityMapVolumeStyle .getFunctionsText ();

			if (this .renderStyleNode)
			{
				styleUniforms  += this .renderStyleNode .getUniformsText (),
				styleFunctions += this .renderStyleNode .getFunctionsText ();
			}

			fs = fs .replace (/\/\/ VOLUME_STYLES_UNIFORMS\n/,  styleUniforms);
			fs = fs .replace (/\/\/ VOLUME_STYLES_FUNCTIONS\n/, styleFunctions);

			if (DEBUG)
				this .getBrowser () .print (fs);

			var vertexShader = new ShaderPart (this .getExecutionContext ());
			vertexShader .setName ("VolumeDataVertexShader");
			vertexShader .url_ .push ("data:x-shader/x-vertex," + vs);
			vertexShader .setup ();

			var fragmentShader = new ShaderPart (this .getExecutionContext ());
			fragmentShader .setName ("VolumeDataFragmentShader");
			fragmentShader .type_ = "FRAGMENT";
			fragmentShader .url_ .push ("data:x-shader/x-fragment," + fs);
			fragmentShader .setup ();

			var shaderNode = new ComposedShader (this .getExecutionContext ());
			shaderNode .setName ("VolumeDataShader");
			shaderNode .language_ = "GLSL";
			shaderNode .parts_ .push (vertexShader);
			shaderNode .parts_ .push (fragmentShader);

			if (this .voxelsNode)
			{
				var textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", textureSize);
			}
			else
			{
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", new Fields .SFVec3f ());
			}

			opacityMapVolumeStyle .addShaderFields (shaderNode);

			if (this .renderStyleNode)
				this .renderStyleNode .addShaderFields (shaderNode);

			return shaderNode;
		},
	});

	return VolumeData;
});
