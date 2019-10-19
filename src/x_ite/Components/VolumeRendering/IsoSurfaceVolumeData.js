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

	function IsoSurfaceVolumeData (executionContext)
	{
		X3DVolumeDataNode .call (this, executionContext);

		this .addType (X3DConstants .IsoSurfaceVolumeData);

		this .renderStyleNodes = [ ];
		this .blendModeNode    = executionContext .createNode ("BlendMode", false);
	}

	IsoSurfaceVolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
	{
		constructor: IsoSurfaceVolumeData,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",       new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "contourStepSize",  new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceValues",    new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceTolerance", new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "gradients",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
		]),
		getTypeName: function ()
		{
			return "IsoSurfaceVolumeData";
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

			this .gradients_          .addInterest ("set_gradients__", this);
			this .renderStyle_        .addInterest ("set_renderStyle__", this);
			this .voxels_             .addFieldInterest (this .getAppearance () .texture_);

			this .contourStepSize_    .addInterest ("update", this);
			this .surfaceValues_      .addInterest ("update", this);
			this .surfaceTolerance_   .addInterest ("update", this);
			this .renderStyle_        .addInterest ("update", this);

			this .blendModeNode .setup ();

			this .getAppearance () .texture_   = this .voxels_;
			this .getAppearance () .blendMode_ = this .blendModeNode;

			this .set_gradients__ ();
			this .set_renderStyle__ ();
			this .set_voxels__ ();

			this .update ();
		},
		set_gradients__: function ()
		{
			this .gradientsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .gradients_);
		},
		set_renderStyle__: function ()
		{
			var renderStyleNodes = this .renderStyleNodes;

			for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
			{
				var renderStyleNode = renderStyleNodes [i];

				renderStyleNode .removeInterest ("update", this);
				renderStyleNode .removeVolumeData (this);
			}

			renderStyleNodes .length = 0;

			for (var i = 0, length = this .renderStyle_ .length; i < length; ++ i)
			{
				var renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this .renderStyle_ [i]);

				if (renderStyleNode)
					renderStyleNodes .push (renderStyleNode);
			}

			for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
			{
				var renderStyleNode = renderStyleNodes [i];

				renderStyleNode .addInterest ("update", this);
				renderStyleNode .addVolumeData (this);
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

			styleUniforms  += "\n";
			styleUniforms  += "uniform float surfaceValues [" + this .surfaceValues_ .length + "];\n";
			styleUniforms  += "uniform float surfaceTolerance;\n";

			styleUniforms += "\n";
			styleUniforms += "vec4\n";
			styleUniforms += "getNormal (in vec3 texCoord)\n";
			styleUniforms += "{\n";
			styleUniforms += "	vec4  offset = vec4 (1.0 / x3d_TextureSize .x, 1.0 / x3d_TextureSize .y, 1.0 / x3d_TextureSize .z, 0.0);\n";
			styleUniforms += "	float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
			styleUniforms += "	float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
			styleUniforms += "	float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
			styleUniforms += "	float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
			styleUniforms += "	float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
			styleUniforms += "	float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
			styleUniforms += "	vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
			styleUniforms += "\n";
			styleUniforms += "	return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
			styleUniforms += "}\n";

			for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
				styleUniforms  += this .renderStyleNodes [i] .getUniformsText ();

			styleFunctions += "\n";
			styleFunctions += "	// IsoSurfaceVolumeData\n";
			styleFunctions += "\n";

			if (this .gradientsNode)
			{
				styleUniforms += "\n";
				styleUniforms += "uniform sampler3D gradients;\n";

				styleFunctions += "	if (length (texture (gradients, texCoord) .xyz * 2.0 - 1.0) < surfaceTolerance)\n";
				styleFunctions += "		discard;\n";
			}
			else
			{
				styleFunctions += "	if (getNormal (texCoord) .w < surfaceTolerance)\n";
				styleFunctions += "		discard;\n";
			}

			styleFunctions += "\n";
			styleFunctions += "	float intensity = textureColor .r;\n";
			styleFunctions += "\n";

			if (this .surfaceValues_ .length === 1)
			{
				var contourStepSize = this .contourStepSize_ .getValue ();

				if (contourStepSize === 0)
				{
					styleFunctions += "	if (intensity > surfaceValues [0])\n";
					styleFunctions += "	{\n";
					styleFunctions += "		textureColor = vec4 (vec3 (surfaceValues [0]), 1.0);\n";

					if (this .renderStyleNodes .length)
					{
						styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
					}

					styleFunctions += "	}\n";
					styleFunctions += "	else\n";
					styleFunctions += "	{\n";
					styleFunctions += "		textureColor = vec4 (0.0);\n";
					styleFunctions += "	}\n";
					styleFunctions += "\n";
				}
				else
				{
					var surfaceValues = [ ];

					for (var v = this .surfaceValues_ [0] - contourStepSize; v > 0; v -= contourStepSize)
						surfaceValues .unshift (v);

					surfaceValues .push (this .surfaceValues_ [0]);

					for (var v = this .surfaceValues_ [0] + contourStepSize; v <= 1; v += contourStepSize)
						surfaceValues .push (v);

					styleFunctions += "	if (false)\n";
					styleFunctions += "	{ }\n";

					for (var i = surfaceValues_ .length - 1; i >= 0; -- i)
					{
						styleFunctions += "	else if (intensity > " + surfaceValues [i] + ")\n";
						styleFunctions += "	{\n";
						styleFunctions += "		textureColor = vec4 (vec3 (" + surfaceValues [i] + "), 1.0);\n";

						if (this .renderStyleNodes .length)
						{
							styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
						}

						styleFunctions += "	}\n";
					}

					styleFunctions += "	else\n";
					styleFunctions += "	{\n";
					styleFunctions += "		textureColor = vec4 (0.0);\n";
					styleFunctions += "	}\n";
					styleFunctions += "\n";
				}
			}
			else
			{
				styleFunctions += "	if (false)\n";
				styleFunctions += "	{ }\n";

				for (var i = this .surfaceValues_ .length - 1; i >= 0; -- i)
				{
					styleFunctions += "	else if (intensity > surfaceValues [" + i + "])\n";
					styleFunctions += "	{\n";
					styleFunctions += "		textureColor = vec4 (vec3 (surfaceValues [" + i + "]), 1.0);\n";

					if (this .renderStyleNodes .length)
					{
						var r = Math .min (i, this .renderStyleNodes .length - 1);

						styleFunctions += this .renderStyleNodes [r] .getFunctionsText ();
					}

					styleFunctions += "	}\n";
				}

				styleFunctions += "	else\n";
				styleFunctions += "	{\n";
				styleFunctions += "		textureColor = vec4 (0.0);\n";
				styleFunctions += "	}\n";
				styleFunctions += "\n";
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

			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceValues",    this .surfaceValues_    .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceTolerance", this .surfaceTolerance_ .copy ());

			if (this .gradientsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "grandients", new Fields .SFNode (this .gradientsNode));

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

			for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
				this .renderStyleNodes [i] .addShaderFields (shaderNode);

			return shaderNode;
		},
	});

	return IsoSurfaceVolumeData;
});
