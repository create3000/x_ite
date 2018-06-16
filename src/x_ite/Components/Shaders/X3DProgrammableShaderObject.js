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
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"x_ite/Components/Navigation/OrthoViewpoint",
	"standard/Math/Numbers/Matrix3",
],
function (Fields,
          X3DCast,
          X3DConstants,
          OrthoViewpoint,
          Matrix3)
{
"use strict";

	var
		matrix3 = new Matrix3 (),
		NULL    = new Fields .SFNode ();

	function X3DProgrammableShaderObject (executionContext)
	{
		this .addType (X3DConstants .X3DProgrammableShaderObject);

		this .x3d_ClipPlane             = [ ];
		this .x3d_LightType             = [ ];
		this .x3d_LightOn               = [ ];
		this .x3d_LightColor            = [ ];
		this .x3d_LightIntensity        = [ ];
		this .x3d_LightAmbientIntensity = [ ];
		this .x3d_LightAttenuation      = [ ];
		this .x3d_LightLocation         = [ ];
		this .x3d_LightDirection        = [ ];
		this .x3d_LightBeamWidth        = [ ];
		this .x3d_LightCutOffAngle      = [ ];
		this .x3d_LightRadius           = [ ];
		this .x3d_ShadowIntensity       = [ ];
		this .x3d_ShadowColor           = [ ];
		this .x3d_ShadowBias            = [ ];
		this .x3d_ShadowMatrix          = [ ];
		this .x3d_ShadowMapSize         = [ ];
		this .x3d_ShadowMap             = [ ];

		this .numClipPlanes   = 0;
		this .numGlobalLights = 0;
		this .numLights       = 0;

		this .textures = new Map ();
	}

	X3DProgrammableShaderObject .prototype =
	{
		constructor: X3DProgrammableShaderObject,
		normalMatrixArray: new Float32Array (9),
		initialize: function ()
		{
			var browser = this .getBrowser ();

			this .x3d_MaxClipPlanes = browser .getMaxClipPlanes ();
			this .x3d_MaxLights     = browser .getMaxLights ();
			this .x3d_MaxTextures   = browser .getMaxTextures ();

			this .textureTypeArray = new Int32Array (this .x3d_MaxTextures);
		},
		hasUserDefinedFields: function ()
		{
			return true;
		},
		bindAttributeLocations: function (gl, program)
		{
			gl .bindAttribLocation (program, 3, "x3d_Color");
			gl .bindAttribLocation (program, 2, "x3d_TexCoord");
			gl .bindAttribLocation (program, 1, "x3d_Normal");
			gl .bindAttribLocation (program, 0, "x3d_Vertex");
		},
		getDefaultUniforms: function ()
		{
			// Get uniforms and attributes.

			var
				gl      = this .getBrowser () .getContext (),
				program = this .getProgram ();

			this .x3d_LogarithmicFarFactor1_2 = gl .getUniformLocation (program, "x3d_LogarithmicFarFactor1_2");

			this .x3d_GeometryType  = gl .getUniformLocation (program, "x3d_GeometryType");
			this .x3d_NumClipPlanes = gl .getUniformLocation (program, "x3d_NumClipPlanes");

			for (var i = 0; i < this .x3d_MaxClipPlanes; ++ i)
				this .x3d_ClipPlane [i]  = gl .getUniformLocation (program, "x3d_ClipPlane[" + i + "]");

			this .x3d_FogType            = this .getUniformLocation (gl, program, "x3d_Fog.type",            "x3d_FogType");
			this .x3d_FogColor           = this .getUniformLocation (gl, program, "x3d_Fog.color",           "x3d_FogColor");
			this .x3d_FogVisibilityRange = this .getUniformLocation (gl, program, "x3d_Fog.visibilityRange", "x3d_FogVisibilityRange");

			this .x3d_LinewidthScaleFactor = gl .getUniformLocation (program, "x3d_LinewidthScaleFactor");

			this .x3d_Lighting      = gl .getUniformLocation (program, "x3d_Lighting");
			this .x3d_ColorMaterial = gl .getUniformLocation (program, "x3d_ColorMaterial");
			this .x3d_NumLights     = gl .getUniformLocation (program, "x3d_NumLights");

			for (var i = 0; i < this .x3d_MaxLights; ++ i)
			{
				this .x3d_LightType [i]             = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].type",             "x3d_LightType[" + i + "]");
				this .x3d_LightColor [i]            = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].color",            "x3d_LightColor[" + i + "]");
				this .x3d_LightAmbientIntensity [i] = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].ambientIntensity", "x3d_LightAmbientIntensity[" + i + "]");
				this .x3d_LightIntensity [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].intensity",        "x3d_LightIntensity[" + i + "]");
				this .x3d_LightAttenuation [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].attenuation",      "x3d_LightAttenuation[" + i + "]");
				this .x3d_LightLocation [i]         = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].location",         "x3d_LightLocation[" + i + "]");
				this .x3d_LightDirection [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].direction",        "x3d_LightDirection[" + i + "]");
				this .x3d_LightBeamWidth [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].beamWidth",        "x3d_LightBeamWidth[" + i + "]");
				this .x3d_LightCutOffAngle [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].cutOffAngle",      "x3d_LightCutOffAngle[" + i + "]");
				this .x3d_LightRadius [i]           = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].radius",           "x3d_LightRadius[" + i + "]");

				this .x3d_ShadowIntensity [i] = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowIntensity");
				this .x3d_ShadowColor [i]     = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowColor");
				this .x3d_ShadowBias [i]      = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowBias");
				this .x3d_ShadowMatrix [i]    = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMatrix");
				this .x3d_ShadowMapSize [i]   = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMapSize");
				this .x3d_ShadowMap [i]       = gl .getUniformLocation (program, "x3d_ShadowMap[" + i + "]");
			}

			this .x3d_SeparateBackColor = gl .getUniformLocation (program, "x3d_SeparateBackColor");

			this .x3d_AmbientIntensity = this .getUniformLocation (gl, program, "x3d_FrontMaterial.ambientIntensity", "x3d_AmbientIntensity");
			this .x3d_DiffuseColor     = this .getUniformLocation (gl, program, "x3d_FrontMaterial.diffuseColor",     "x3d_DiffuseColor");
			this .x3d_SpecularColor    = this .getUniformLocation (gl, program, "x3d_FrontMaterial.specularColor",    "x3d_SpecularColor");
			this .x3d_EmissiveColor    = this .getUniformLocation (gl, program, "x3d_FrontMaterial.emissiveColor",    "x3d_EmissiveColor");
			this .x3d_Shininess        = this .getUniformLocation (gl, program, "x3d_FrontMaterial.shininess",        "x3d_Shininess");
			this .x3d_Transparency     = this .getUniformLocation (gl, program, "x3d_FrontMaterial.transparency",     "x3d_Transparency");

			this .x3d_BackAmbientIntensity = this .getUniformLocation (gl, program, "x3d_BackMaterial.ambientIntensity", "x3d_BackAmbientIntensity");
			this .x3d_BackDiffuseColor     = this .getUniformLocation (gl, program, "x3d_BackMaterial.diffuseColor",     "x3d_BackDiffuseColor");
			this .x3d_BackSpecularColor    = this .getUniformLocation (gl, program, "x3d_BackMaterial.specularColor",    "x3d_BackSpecularColor");
			this .x3d_BackEmissiveColor    = this .getUniformLocation (gl, program, "x3d_BackMaterial.emissiveColor",    "x3d_BackEmissiveColor");
			this .x3d_BackShininess        = this .getUniformLocation (gl, program, "x3d_BackMaterial.shininess",        "x3d_BackShininess");
			this .x3d_BackTransparency     = this .getUniformLocation (gl, program, "x3d_BackMaterial.transparency",     "x3d_BackTransparency");

			this .x3d_NumTextures    = gl .getUniformLocation (program, "x3d_NumTextures");
			this .x3d_TextureType    = gl .getUniformLocation (program, "x3d_TextureType");
			this .x3d_Texture2D      = this .getUniformLocation (gl, program, "x3d_Texture2D", "x3d_Texture");
			this .x3d_CubeMapTexture = gl .getUniformLocation (program, "x3d_CubeMapTexture");

			this .x3d_Viewport          = gl .getUniformLocation (program, "x3d_Viewport");
			this .x3d_ProjectionMatrix  = gl .getUniformLocation (program, "x3d_ProjectionMatrix");
			this .x3d_ModelViewMatrix   = gl .getUniformLocation (program, "x3d_ModelViewMatrix");
			this .x3d_NormalMatrix      = gl .getUniformLocation (program, "x3d_NormalMatrix");
			this .x3d_TextureMatrix     = gl .getUniformLocation (program, "x3d_TextureMatrix");
			this .x3d_CameraSpaceMatrix = gl .getUniformLocation (program, "x3d_CameraSpaceMatrix");
		
			this .x3d_Color    = gl .getAttribLocation (program, "x3d_Color");
			this .x3d_TexCoord = gl .getAttribLocation (program, "x3d_TexCoord");
			this .x3d_Normal   = gl .getAttribLocation (program, "x3d_Normal");
			this .x3d_Vertex   = gl .getAttribLocation (program, "x3d_Vertex");	

			// Fill special uniforms with default values, textures for units are created in X3DTexturingContext.

			gl .uniform1f  (this .x3d_LinewidthScaleFactor, 1);
			gl .uniform1iv (this .x3d_TextureType,          new Int32Array ([0]));
			gl .uniform1iv (this .x3d_Texture2D,            new Int32Array ([2])); // Set texture to active texture unit 2.
			gl .uniform1iv (this .x3d_CubeMapTexture,       new Int32Array ([4])); // Set cube map texture to active texture unit 3.
			gl .uniform1iv (gl .getUniformLocation (program, "x3d_ShadowMap"), new Int32Array (this .x3d_MaxLights) .fill (5)); // Set cube map texture to active texture unit 5, the whole uniform must be set at once.
			
			gl .uniform1i (this .x3d_NumTextures, 1);

			// Return true if valid, otherwise false.

			if (this .x3d_Color < 0)
			{
				this .enableColorAttribute  = Function .prototype;
				this .disableColorAttribute = Function .prototype;
			}
			else
			{
				delete this .enableColorAttribute;
				delete this .disableColorAttribute;
			}

			if (this .x3d_TexCoord < 0)
			{
				this .enableTexCoordAttribute  = Function .prototype;
				this .disableTexCoordAttribute = Function .prototype;
			}
			else
			{
				delete this .enableTexCoordAttribute;
				delete this .disableTexCoordAttribute;
			}

			if (this .x3d_Normal < 0)
			{
				this .enableNormalAttribute  = Function .prototype;
				this .disableNormalAttribute = Function .prototype;
			}
			else
			{
				delete this .enableNormalAttribute;
				delete this .disableNormalAttribute;
			}

			if (this .x3d_Vertex < 0)
			{
				console .warn ("Missing »attribute vec4 x3d_Vertex;«.");
				return false;
			}

			return true;
		},
		getUniformLocation: function (gl, program, name, depreciated)
		{
			// Legacy function to get uniform location.

			var location = gl .getUniformLocation (program, name);

			if (location)
				return location;

			// Look for depreciated location.

			location = gl .getUniformLocation (program, depreciated);

			if (location)
				console .error (this .getTypeName (), this .getName (), "Using uniform location name »" + depreciated + "« is depreciated. See http://create3000.de/x_ite/custom-shaders/.");

			return location;
		},
		addShaderFields: function ()
		{
			var
				gl                = this .getBrowser () .getContext (),
				program           = this .getProgram (),
				userDefinedFields = this .getUserDefinedFields ();

			this .textures .clear ();

			for (var name in userDefinedFields)
			{
				var
					field    = userDefinedFields [name],
					location = gl .getUniformLocation (program, name);

				if (location)
				{
					field ._uniformLocation = location;

					field .addInterest ("set_field__", this);

					switch (field .getType ())
					{
						case X3DConstants .SFImage:
						{
							location .array = new Int32Array (3 + field .array .length);
							break;
						}
						case X3DConstants .SFMatrix3d:
						case X3DConstants .SFMatrix3f:
						case X3DConstants .SFRotation:
						{
							location .array = new Float32Array (9);
							break;
						}
						case X3DConstants .SFMatrix4d:
						case X3DConstants .SFMatrix4f:
						{
							location .array = new Float32Array (16);
							break;
						}
						case X3DConstants .SFNode:
						{
							break;
						}
						case X3DConstants .MFBool:
						case X3DConstants .MFInt32:
						{
							location .array = new Int32Array (this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFFloat:
						case X3DConstants .MFDouble:
						case X3DConstants .MFTime:
						{
							location .array = new Float32Array (this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFImage:
						{
							location .array = new Int32Array (this .getImagesLength (field));
							break;
						}
						case X3DConstants .MFMatrix3d:
						case X3DConstants .MFMatrix3f:
						case X3DConstants .MFRotation:
						{
							location .array = new Float32Array (9 * this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFMatrix4d:
						case X3DConstants .MFMatrix4f:
						{
							location .array = new Float32Array (16 * this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFNode:
						{
							var locations = location .locations = [ ];

							for (var i = 0;; ++ i)
							{
								var l = gl .getUniformLocation (program, field .getName () + "[" + i + "]");

								if (! l)
									break;

								locations .push (l);
							}

							break;
						}
						case X3DConstants .MFVec2d:
						case X3DConstants .MFVec2f:
						{
							location .array = new Float32Array (2 * this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFVec3d:
						case X3DConstants .MFVec3f:
						case X3DConstants .MFColor:
						{
							location .array = new Float32Array (3 * this .getLocationLength (gl, program, field));
							break;
						}
						case X3DConstants .MFVec4d:
						case X3DConstants .MFVec4f:
						case X3DConstants .MFColorRGBA:
						{
							location .array = new Float32Array (4 * this .getLocationLength (gl, program, field));
							break;
						}
					}

					this .set_field__ (field);
				}
			}
		},
		removeShaderFields: function ()
		{
			var
				gl                = this .getBrowser () .getContext (),
				program           = this .getProgram (),
				userDefinedFields = this .getUserDefinedFields ();

			for (var name in userDefinedFields)
			{
				var
					field    = userDefinedFields [name],
					location = gl .getUniformLocation (program, name);

				field .removeInterest ("set_field__", this);
			}
		},
		set_field__: function (field)
		{
			var
				gl       = this .getBrowser () .getContext (),
				program  = this .getProgram (),
				location = field ._uniformLocation;

			if (location)
			{
				switch (field .getType ())
				{
					case X3DConstants .SFBool:
					case X3DConstants .SFInt32:
					{
						gl .uniform1i (location, field .getValue ());
						return;
					}
					case X3DConstants .SFColor:
					{
						var value = field .getValue ();
						gl .uniform3f (location, value .r, value .g, value .b);
						return;
					}
					case X3DConstants .SFColorRGBA:
					{
						var value = field .getValue ();
						gl .uniform4f (location, value .r, value .g, value .b, value .a);
						return;
					}
					case X3DConstants .SFDouble:
					case X3DConstants .SFFloat:
					case X3DConstants .SFTime:
					{
						gl .uniform1f (location, field .getValue ());
						return;
					}
					case X3DConstants .SFImage:
					{
						var
							array  = location .array,
							pixels = field .array,
							length = 3 + pixels .length;
	
						if (length !== array .length)
							array = location .array = new Int32Array (length);
	
						array [0] = field .width;
						array [1] = field .height;
						array [2] = field .comp;
	
						for (var a = 3, p = 0, length = pixels .length; p < length; ++ p, ++ a)
							array [a] = pixels [p];
	
						gl .uniform1iv (location, array);
						return;
					}
					case X3DConstants .SFMatrix3d:
					case X3DConstants .SFMatrix3f:
					{
						location .array .set (field .getValue ());
	
						gl .uniformMatrix3fv (location, false, location .array);
						return;
					}
					case X3DConstants .SFMatrix4d:
					case X3DConstants .SFMatrix4f:
					{
						location .array .set (field .getValue ());
	
						gl .uniformMatrix4fv (location, false, location .array);
						return;
					}
					case X3DConstants .SFNode:
					{
						var texture = X3DCast (X3DConstants .X3DTextureNode, field);
		
						if (texture)
						{
							this .textures .set (location, { name: field .getName (), texture: texture, textureUnit: undefined } );
							return;
						}

						this .textures .delete (location);
						return;
					}
					case X3DConstants .SFRotation:
					{
						field .getValue () .getMatrix (location .array);

						gl .uniformMatrix3fv (location, false, location .array);
						return;
					}
					case X3DConstants .SFString:
					{
						return;
					}
					case X3DConstants .SFVec2d:
					case X3DConstants .SFVec2f:
					{
						var value = field .getValue ();
						gl .uniform2f (location, value .x, value .y);
						return;
					}
					case X3DConstants .SFVec3d:
					case X3DConstants .SFVec3f:
					{
						var value = field .getValue ();
						gl .uniform3f (location, value .x, value .y, value .z);
						return;
					}
					case X3DConstants .SFVec4d:
					case X3DConstants .SFVec4f:
					{
						var value = field .getValue ();
						gl .uniform4f (location, value .x, value .y, value .z, value .w);
						return;
					}
					case X3DConstants .MFBool:
					case X3DConstants .MFInt32:
					{
						var array = location .array;

						for (var i = 0, length = field .length; i < length; ++ i)
							array [i] = field [i];
	
						for (var length = array .length; i < length; ++ i)
							array [i] = 0;
	
						gl .uniform1iv (location, array);
						return;
					}
					case X3DConstants .MFColor:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var color = field [i];
	
							array [k++] = color .r;
							array [k++] = color .g;
							array [k++] = color .b;
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniform3fv (location, array);
						return;
					}
					case X3DConstants .MFColorRGBA:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var color = field [i];
	
							array [k++] = color .r;
							array [k++] = color .g;
							array [k++] = color .b;
							array [k++] = color .a;
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniform4fv (location, array);
						return;
					}
					case X3DConstants .MFDouble:
					case X3DConstants .MFFloat:
					case X3DConstants .MFTime:
					{
						var array = location .array;

						for (var i = 0, length = field .length; i < length; ++ i)
							array [i] = field [i];
	
						for (var length = array .length; i < length; ++ i)
							array [i] = 0;

						gl .uniform1fv (location, array);
						return;
					}
					case X3DConstants .MFImage:
					{
						var
							array  = location .array,
							length = this .getImagesLength (field);
	
						if (length !== array .length)
							array = location .array = new Int32Array (length);
	
						for (var i = 0, a = 0, length = field .length; i < length; ++ i)
						{
							var
								value  = field [i],
								pixels = value .array;
	
							array [a ++] = value .width;
							array [a ++] = value .height;
							array [a ++] = value .comp;
	
							for (var p = 0, plength = pixels .length; p < plength; ++ p)
								array [a ++] = pixels [p];
						}
	
						gl .uniform1iv (location, array);
						return;
					}
					case X3DConstants .MFMatrix3d:
					case X3DConstants .MFMatrix3f:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var matrix = field [i];
	
							for (var m = 0; m < 9; ++ m)
								array [k++] = matrix [m];
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniformMatrix3fv (location, false, array);
						return;
					}
					case X3DConstants .MFMatrix4d:
					case X3DConstants .MFMatrix4f:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var matrix = field [i];
	
							for (var m = 0; m < 16; ++ m)
								array [k++] = matrix [m];
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniformMatrix4fv (location, false, array);
						return;
					}
					case X3DConstants .MFNode:
					{
						var locations = location .locations;

						for (var i = 0, length = field .length; i < length; ++ i)
						{
							var texture = X3DCast (X3DConstants .X3DTextureNode, field [i]);
			
							if (texture)
							{
								this .textures .set (locations [i], { name: field [i] .getName (), texture: texture, textureUnit: undefined } );
								continue;
							}
						}

						return;
					}
					case X3DConstants .MFRotation:
					{
						var array = location .array;

						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var matrix = field [i] .getValue () .getMatrix (matrix3);
	
							array [k++] = matrix [0];
							array [k++] = matrix [1];
							array [k++] = matrix [2];
							array [k++] = matrix [3];
							array [k++] = matrix [4];
							array [k++] = matrix [5];
							array [k++] = matrix [6];
							array [k++] = matrix [7];
							array [k++] = matrix [8];
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniformMatrix3fv (location, false, array);
						return;
					}
					case X3DConstants .MFString:
					{
						return;
					}
					case X3DConstants .MFVec2d:
					case X3DConstants .MFVec2f:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var vector = field [i];
	
							array [k++] = vector .x;
							array [k++] = vector .y;
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;

						gl .uniform2fv (location, array);
						return;
					}
					case X3DConstants .MFVec3d:
					case X3DConstants .MFVec3f:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var vector = field [i];
	
							array [k++] = vector .x;
							array [k++] = vector .y;
							array [k++] = vector .z;
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniform3fv (location, array);
						return;
					}
					case X3DConstants .MFVec4d:
					case X3DConstants .MFVec4f:
					{
						var array = location .array;
	
						for (var i = 0, k = 0, length = field .length; i < length; ++ i)
						{
							var vector = field [i];
	
							array [k++] = vector .x;
							array [k++] = vector .y;
							array [k++] = vector .z;
							array [k++] = vector .w;
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniform4fv (location, array);
						return;
					}
				}
			}
		},
		getImagesLength: function (field)
		{
			var
				images = field .getValue (),
				length = 3 * images .length;

			for (var i = 0, l = images .length; i < l; ++ i)
				length += images [i] .array .length;

			return length;
		},
		getLocationLength: function (gl, program, field)
		{
			var name = field .getName ();

			for (var i = 0; ; ++ i)
			{
				var location = gl .getUniformLocation (program, name + "[" + i + "]");

				if (! location)
					break;
			}

			return i;
		},
		setShaderObjects: function (gl, shaderObjects)
		{
			// Clip planes and local lights

			this .numClipPlanes = 0;
			this .numLights     = 0;

			for (var i = 0, length = shaderObjects .length; i < length; ++ i)
				shaderObjects [i] .setShaderUniforms (gl, this);

			gl .uniform1i (this .x3d_NumClipPlanes, Math .min (this .numClipPlanes, this .x3d_MaxClipPlanes));
			gl .uniform1i (this .x3d_NumLights,     Math .min (this .numLights,     this .x3d_MaxLights));

			// Legacy before 4.1.4

			for (var i = this .numClipPlanes; i < this .x3d_MaxClipPlanes; ++ i)
				gl .uniform4f (this .x3d_ClipPlane [i], 0, 0, -1, 0);

			if (this .numLights < this .x3d_MaxLights)
				gl .uniform1i (this .x3d_LightType [this .numLights], 0);
		},
		setGlobalUniforms: function (gl, renderObject, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray)
		{
			var globalLights = renderObject .getGlobalLights ();

			// Set viewport

			gl .uniform4iv (this .x3d_Viewport, viewportArray);

			// Set projection matrix

			gl .uniformMatrix4fv (this .x3d_ProjectionMatrix,  false, projectionMatrixArray);
			gl .uniformMatrix4fv (this .x3d_CameraSpaceMatrix, false, cameraSpaceMatrixArray);

			// Set global lights

			this .numGlobalLights = globalLights .length;
			this .numLights       = 0;

			for (var i = 0, length = globalLights .length; i < length; ++ i)
				globalLights [i] .setShaderUniforms (gl, this);

			// Logarithmic depth buffer support.

			var viewpoint      = renderObject .getViewpoint ();
			var navigationInfo = renderObject .getNavigationInfo ();

			if (viewpoint instanceof OrthoViewpoint)
				gl .uniform1f (this .x3d_LogarithmicFarFactor1_2, -1);
			else
				gl .uniform1f (this .x3d_LogarithmicFarFactor1_2, 1 / Math .log2 (navigationInfo .getFarValue (viewpoint) + 1));		
		},
		setLocalUniforms: function (gl, context)
		{
			var
				linePropertiesNode   = context .linePropertiesNode,
				materialNode         = context .materialNode,
				textureNode          = context .textureNode,
				textureTransformNode = context .textureTransformNode,
				modelViewMatrix      = context .modelViewMatrix,
				shaderObjects        = context .shaderObjects;

			// Geometry type

			gl .uniform1i (this .x3d_GeometryType, context .geometryType);

			// Clip planes and local lights

			this .numClipPlanes = 0;
			this .numLights     = this .numGlobalLights;

			for (var i = 0, length = shaderObjects .length; i < length; ++ i)
				shaderObjects [i] .setShaderUniforms (gl, this);

			gl .uniform1i (this .x3d_NumClipPlanes, Math .min (this .numClipPlanes, this .x3d_MaxClipPlanes));
			gl .uniform1i (this .x3d_NumLights,     Math .min (this .numLights,     this .x3d_MaxLights));

			// Legacy before 4.1.4

			for (var i = this .numClipPlanes; i < this .x3d_MaxClipPlanes; ++ i)
				gl .uniform4f (this .x3d_ClipPlane [i], 0, 0, -1, 0);

			if (this .numLights < this .x3d_MaxLights)
				gl .uniform1i (this .x3d_LightType [this .numLights], 0);

			// Fog, there is always one

			context .fogNode .setShaderUniforms (gl, this, context .renderer);

			// LineProperties

			if (linePropertiesNode && linePropertiesNode .applied_ .getValue ())
			{
				var linewidthScaleFactor = linePropertiesNode .getLinewidthScaleFactor ();

				gl .lineWidth (linewidthScaleFactor);
				gl .uniform1f (this .x3d_LinewidthScaleFactor, linewidthScaleFactor);
			}
			else
			{
				gl .lineWidth (1);
				gl .uniform1f (this .x3d_LinewidthScaleFactor, 1);
			}
	
			// Material

			gl .uniform1i (this .x3d_ColorMaterial, context .colorMaterial);

			if (materialNode)
			{
				// Lights

				gl .uniform1i  (this .x3d_Lighting, true);

				// Material

				materialNode .setShaderUniforms (gl, this);

				// Normal matrix

				try
				{
					// Set normal matrix.
					var normalMatrix = this .normalMatrixArray;
					normalMatrix [0] = modelViewMatrix [0]; normalMatrix [1] = modelViewMatrix [4]; normalMatrix [2] = modelViewMatrix [ 8];
					normalMatrix [3] = modelViewMatrix [1]; normalMatrix [4] = modelViewMatrix [5]; normalMatrix [5] = modelViewMatrix [ 9];
					normalMatrix [6] = modelViewMatrix [2]; normalMatrix [7] = modelViewMatrix [6]; normalMatrix [8] = modelViewMatrix [10];
					Matrix3 .prototype .inverse .call (normalMatrix);
					gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, normalMatrix);
				}
				catch (error)
				{
					gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, new Float32Array (Matrix3 .Identity));
				}
			}
			else
			{
				gl .uniform1i (this .x3d_Lighting, false);

				if (this .getCustom ())
				{
					try
					{
						// Set normal matrix.
						var normalMatrix = this .normalMatrixArray;
						normalMatrix [0] = modelViewMatrix [0]; normalMatrix [1] = modelViewMatrix [4]; normalMatrix [2] = modelViewMatrix [ 8];
						normalMatrix [3] = modelViewMatrix [1]; normalMatrix [4] = modelViewMatrix [5]; normalMatrix [5] = modelViewMatrix [ 9];
						normalMatrix [6] = modelViewMatrix [2]; normalMatrix [7] = modelViewMatrix [6]; normalMatrix [8] = modelViewMatrix [10];
						Matrix3 .prototype .inverse .call (normalMatrix);
						gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, normalMatrix);
					}
					catch (error)
					{
						gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, new Float32Array (Matrix3 .Identity));
					}
				}
			}

			if (textureNode)
			{
				textureNode .setShaderUniforms (gl, this, 0);
				textureTransformNode .setShaderUniforms (gl, this);
			}
			else
			{
				this .textureTypeArray [0] = 0;
				gl .uniform1iv (this .x3d_TextureType, this .textureTypeArray);

				if (this .getCustom ())
				{
					textureTransformNode .setShaderUniforms (gl, this);
				}
			}

			gl .uniformMatrix4fv (this .x3d_ModelViewMatrix, false, modelViewMatrix);
		},
		enable: function (gl)
		{
			var browser = this .getBrowser ();

			//console .log (this .getName ());
			//console .log (browser .getCombinedTextureUnits () .length);

			for (let item of this .textures)
			{
				var
					location = item [0],
					object   = item [1],
					name     = object .name,
					texture  = object .texture;

				if (! browser .getCombinedTextureUnits () .length)
				{
					console .warn ("Not enough combined texture units for uniform variable '" + name + "' available.");
					continue;
				}

				var textureUnit = object .textureUnit = browser .getCombinedTextureUnits () .pop ();
	
				gl .uniform1i (location, textureUnit);
				gl .activeTexture (gl .TEXTURE0 + textureUnit);
				gl .bindTexture (texture .getTarget (), texture .getTexture ());
			}

			gl .activeTexture (gl .TEXTURE0);
		},
		disable: function (gl)
		{
			var browser = this .getBrowser ();

			for (let item of this .textures)
			{
				var
					object      = item [1],
					textureUnit = object .textureUnit;

				if (textureUnit !== undefined)
					browser .getCombinedTextureUnits () .push (textureUnit);

				object .textureUnit = undefined;
			}		

			//console .log (browser .getCombinedTextureUnits () .length);
		},
		enableFloatAttrib: function (gl, name, buffer, components)
		{
			var location = gl. getAttribLocation (this .getProgram (), name);
		
			if (location === -1)
				return;
		
			gl .enableVertexAttribArray (location);
		
			gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
			gl .vertexAttribPointer (location, components, gl .FLOAT, false, 0, 0);
		},
		disableFloatAttrib: function (gl, name)
		{
			var location = gl .getAttribLocation (this .getProgram (), name);

			if (location === -1)
				return;

			gl .disableVertexAttribArray (location);
		},
		enableMatrix3Attrib: function (gl, name, buffer)
		{
			var location = gl .getAttribLocation (this .getProgram (), name);

			if (location === -1)
				return;

			gl .enableVertexAttribArray (location + 0);
			gl .enableVertexAttribArray (location + 1);
			gl .enableVertexAttribArray (location + 2);

			gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

			gl .vertexAttribPointer (location + 0, 3, gl .FLOAT, false, 9 * 4, 3 * 4 * 0);
			gl .vertexAttribPointer (location + 1, 3, gl .FLOAT, false, 9 * 4, 3 * 4 * 1);
			gl .vertexAttribPointer (location + 2, 3, gl .FLOAT, false, 9 * 4, 3 * 4 * 2);
		},
		disableMatrix3Attrib: function (gl, name)
		{
			var location = gl .getAttribLocation (this .getProgram (), name);

			if (location === -1)
				return;

			gl .disableVertexAttribArray (location + 0);
			gl .disableVertexAttribArray (location + 1);
			gl .disableVertexAttribArray (location + 2);
		},
		enableMatrix4Attrib: function (gl, name, buffer)
		{
			var location = gl .getAttribLocation (this .getProgram (), name);

			if (location === -1)
				return;

			gl .enableVertexAttribArray (location + 0);
			gl .enableVertexAttribArray (location + 1);
			gl .enableVertexAttribArray (location + 2);
			gl .enableVertexAttribArray (location + 3);

			gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

			gl .vertexAttribPointer (location + 0, 4, gl .FLOAT, false, 16 * 4, 4 * 4 * 0);
			gl .vertexAttribPointer (location + 1, 4, gl .FLOAT, false, 16 * 4, 4 * 4 * 1);
			gl .vertexAttribPointer (location + 2, 4, gl .FLOAT, false, 16 * 4, 4 * 4 * 2);
			gl .vertexAttribPointer (location + 3, 4, gl .FLOAT, false, 16 * 4, 4 * 4 * 3);
		},
		disableMatrix4Attrib: function (gl, name)
		{
			var location = gl .getAttribLocation (this .getProgram (), name);

			if (location === -1)
				return;

			gl .disableVertexAttribArray (location + 0);
			gl .disableVertexAttribArray (location + 1);
			gl .disableVertexAttribArray (location + 2);
			gl .disableVertexAttribArray (location + 3);
		},
		enableColorAttribute: function (gl, colorBuffer)
		{
			gl .enableVertexAttribArray (this .x3d_Color);
			gl .bindBuffer (gl .ARRAY_BUFFER, colorBuffer);
			gl .vertexAttribPointer (this .x3d_Color, 4, gl .FLOAT, false, 0, 0);
		},
		disableColorAttribute: function (gl)
		{
			gl .disableVertexAttribArray (this .x3d_Color);
		},
		enableTexCoordAttribute: function (gl, texCoordBuffers)
		{
			gl .enableVertexAttribArray (this .x3d_TexCoord);
			gl .bindBuffer (gl .ARRAY_BUFFER, texCoordBuffers [0]);
			gl .vertexAttribPointer (this .x3d_TexCoord, 4, gl .FLOAT, false, 0, 0);
		},
		disableTexCoordAttribute: function (gl)
		{
			gl .disableVertexAttribArray (this .x3d_TexCoord);
		},
		enableNormalAttribute: function (gl, normalBuffer)
		{
			gl .enableVertexAttribArray (this .x3d_Normal);
			gl .bindBuffer (gl .ARRAY_BUFFER, normalBuffer);
			gl .vertexAttribPointer (this .x3d_Normal, 3, gl .FLOAT, false, 0, 0);
		},
		disableNormalAttribute: function (gl)
		{
			gl .disableVertexAttribArray (this .x3d_Normal);
		},
		enableVertexAttribute: function (gl, vertexBuffer)
		{
			gl .enableVertexAttribArray (this .x3d_Vertex);
			gl .bindBuffer (gl .ARRAY_BUFFER, vertexBuffer);
			gl .vertexAttribPointer (this .x3d_Vertex, 4, gl .FLOAT, false, 0, 0);
		},
		disableVertexAttribute: function (gl)
		{
			gl .disableVertexAttribArray (this .x3d_Vertex);
		},
		getProgramInfo: function ()
		{
			function cmp (lhs, rhs) { return lhs < rhs ? -1 : lhs > rhs ? 1 : 0; }

			var
				gl      = this .getBrowser () .getContext (),
				program = this .getProgram ();

			var
				result = {
					attributes: [ ],
					uniforms: [ ],
					attributeCount: 0,
					uniformCount: 0,
				},
				activeUniforms   = gl .getProgramParameter (program, gl.ACTIVE_UNIFORMS),
				activeAttributes = gl .getProgramParameter (program, gl.ACTIVE_ATTRIBUTES);

			// Taken from the WebGl spec:
			// http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
			var enums = {
				0x8B50: 'vec2',
				0x8B51: 'vec3',
				0x8B52: 'vec4',
				0x8B53: 'ivec2',
				0x8B54: 'ivec3',
				0x8B55: 'ivec4',
				0x8B56: 'bool',
				0x8B57: 'bvec2',
				0x8B58: 'bvec3',
				0x8B59: 'bvec4',
				0x8B5A: 'mat2',
				0x8B5B: 'mat3',
				0x8B5C: 'mat4',
				0x8B5E: 'sampler2D',
				0x8B60: 'samplerCube',
				0x1400: 'byte',
				0x1401: 'ubyte',
				0x1402: 'short',
				0x1403: 'ushort',
				0x1404: 'int',
				0x1405: 'uint',
				0x1406: 'float',
			};

			// Loop through active uniforms
			for (var i = 0; i < activeUniforms; ++ i)
			{
				var uniform = gl .getActiveUniform (program, i);
				uniform .typeName = enums [uniform.type];
				result .uniforms .push (Object .assign ({ }, uniform));
				result .uniformCount += uniform .size;
			}

			// Loop through active attributes
			for (var i = 0; i < activeAttributes; ++ i)
			{
				var attribute = gl .getActiveAttrib (program, i);
				attribute .typeName = enums [attribute .type];
				result .attributes .push (Object .assign ({ }, attribute));
				result .attributeCount += attribute .size;
			}

			result .uniforms   .sort (function (a, b) { return cmp (a .name, b .name); });
			result .attributes .sort (function (a, b) { return cmp (a .name, b .name); });

			return result;
		},
		printProgramInfo: function ()
		{
			var programInfo = this .getProgramInfo ();

			console .log (this .getName ());
			console .table (programInfo .attributes);
			console .log (this .getName (), "attributeCount", programInfo .attributeCount);
			console .log (this .getName ());
			console .table (programInfo .uniforms);
			console .log (this .getName (), "uniformCount", programInfo .uniformCount);
		},
	};

	return X3DProgrammableShaderObject;
});


