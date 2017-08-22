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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Fields",
	"excite/Bits/X3DCast",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix3",
],
function ($,
          Fields,
          X3DCast,
          X3DConstants,
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
		this .x3d_ShadowDiffusion       = [ ];
		this .x3d_ShadowColor           = [ ];
		this .x3d_ShadowMatrix          = [ ];
		this .x3d_ShadowMap             = [ ];
	}

	X3DProgrammableShaderObject .prototype =
	{
		constructor: X3DProgrammableShaderObject,
		x3d_NoneClipPlane: new Float32Array ([ 88, 51, 68, 33 ]), // X3D!
		fogNode: null,
		numGlobalLights: 0,
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

			this .x3d_GeometryType = gl .getUniformLocation (program, "x3d_GeometryType");

			for (var i = 0; i < this .x3d_MaxClipPlanes; ++ i)
				this .x3d_ClipPlane [i]  = gl .getUniformLocation (program, "x3d_ClipPlane[" + i + "]");

			this .x3d_FogType            = gl .getUniformLocation (program, "x3d_FogType");
			this .x3d_FogColor           = gl .getUniformLocation (program, "x3d_FogColor");
			this .x3d_FogVisibilityRange = gl .getUniformLocation (program, "x3d_FogVisibilityRange");

			this .x3d_LinewidthScaleFactor = gl .getUniformLocation (program, "x3d_LinewidthScaleFactor");

			this .x3d_Lighting      = gl .getUniformLocation (program, "x3d_Lighting");
			this .x3d_ColorMaterial = gl .getUniformLocation (program, "x3d_ColorMaterial");

			for (var i = 0; i < this .x3d_MaxLights; ++ i)
			{
				this .x3d_LightType [i]             = gl .getUniformLocation (program, "x3d_LightType[" + i + "]");
				this .x3d_LightColor [i]            = gl .getUniformLocation (program, "x3d_LightColor[" + i + "]");
				this .x3d_LightAmbientIntensity [i] = gl .getUniformLocation (program, "x3d_LightAmbientIntensity[" + i + "]");
				this .x3d_LightIntensity [i]        = gl .getUniformLocation (program, "x3d_LightIntensity[" + i + "]");
				this .x3d_LightAttenuation [i]      = gl .getUniformLocation (program, "x3d_LightAttenuation[" + i + "]");
				this .x3d_LightLocation [i]         = gl .getUniformLocation (program, "x3d_LightLocation[" + i + "]");
				this .x3d_LightDirection [i]        = gl .getUniformLocation (program, "x3d_LightDirection[" + i + "]");
				this .x3d_LightBeamWidth [i]        = gl .getUniformLocation (program, "x3d_LightBeamWidth[" + i + "]");
				this .x3d_LightCutOffAngle [i]      = gl .getUniformLocation (program, "x3d_LightCutOffAngle[" + i + "]");
				this .x3d_LightRadius [i]           = gl .getUniformLocation (program, "x3d_LightRadius[" + i + "]");

				this .x3d_ShadowIntensity [i] = gl .getUniformLocation (program, "x3d_ShadowIntensity[" + i + "]");
				this .x3d_ShadowDiffusion [i] = gl .getUniformLocation (program, "x3d_ShadowDiffusion[" + i + "]");
				this .x3d_ShadowColor [i]     = gl .getUniformLocation (program, "x3d_ShadowColor[" + i + "]");
				this .x3d_ShadowMatrix [i]    = gl .getUniformLocation (program, "x3d_ShadowMatrix[" + i + "]");
				this .x3d_ShadowMap [i]       = gl .getUniformLocation (program, "x3d_ShadowMap[" + i + "]");
			}

			this .x3d_SeparateBackColor = gl .getUniformLocation (program, "x3d_SeparateBackColor");

			this .x3d_AmbientIntensity = gl .getUniformLocation (program, "x3d_AmbientIntensity");
			this .x3d_DiffuseColor     = gl .getUniformLocation (program, "x3d_DiffuseColor");
			this .x3d_SpecularColor    = gl .getUniformLocation (program, "x3d_SpecularColor");
			this .x3d_EmissiveColor    = gl .getUniformLocation (program, "x3d_EmissiveColor");
			this .x3d_Shininess        = gl .getUniformLocation (program, "x3d_Shininess");
			this .x3d_Transparency     = gl .getUniformLocation (program, "x3d_Transparency");

			this .x3d_BackAmbientIntensity = gl .getUniformLocation (program, "x3d_BackAmbientIntensity");
			this .x3d_BackDiffuseColor     = gl .getUniformLocation (program, "x3d_BackDiffuseColor");
			this .x3d_BackSpecularColor    = gl .getUniformLocation (program, "x3d_BackSpecularColor");
			this .x3d_BackEmissiveColor    = gl .getUniformLocation (program, "x3d_BackEmissiveColor");
			this .x3d_BackShininess        = gl .getUniformLocation (program, "x3d_BackShininess");
			this .x3d_BackTransparency     = gl .getUniformLocation (program, "x3d_BackTransparency");

			this .x3d_TextureType    = gl .getUniformLocation (program, "x3d_TextureType");
			this .x3d_Texture2D      = gl .getUniformLocation (program, "x3d_Texture2D");
			this .x3d_CubeMapTexture = gl .getUniformLocation (program, "x3d_CubeMapTexture");

			this .x3d_Texture = gl .getUniformLocation (program, "x3d_Texture"); // depreciated

			this .x3d_Viewport         = gl .getUniformLocation (program, "x3d_Viewport");
			this .x3d_ProjectionMatrix = gl .getUniformLocation (program, "x3d_ProjectionMatrix");
			this .x3d_ModelViewMatrix  = gl .getUniformLocation (program, "x3d_ModelViewMatrix");
			this .x3d_NormalMatrix     = gl .getUniformLocation (program, "x3d_NormalMatrix");
			this .x3d_TextureMatrix    = gl .getUniformLocation (program, "x3d_TextureMatrix");
			
			this .x3d_Color    = gl .getAttribLocation (program, "x3d_Color");
			this .x3d_TexCoord = gl .getAttribLocation (program, "x3d_TexCoord");
			this .x3d_Normal   = gl .getAttribLocation (program, "x3d_Normal");
			this .x3d_Vertex   = gl .getAttribLocation (program, "x3d_Vertex");	

			gl .uniform1f  (this .x3d_LinewidthScaleFactor, 1);
			gl .uniform1iv (this .x3d_TextureType,          new Int32Array ([0]));
			gl .uniform1iv (this .x3d_Texture,              new Int32Array ([2])); // depreciated
			gl .uniform1iv (this .x3d_Texture2D,            new Int32Array ([2])); // Set texture to active texture unit 2.
			gl .uniform1iv (this .x3d_CubeMapTexture,       new Int32Array ([4])); // Set cube map texture to active texture unit 3.

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
				return false;

			return true;
		},
		addShaderFields: function ()
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
							var array = field ._uniformLocation = [ ];

							for (var i = 0; ; ++ i)
							{
								var location = gl .getUniformLocation (program, name + "[" + i + "]");

								if (location)
									array [i] = location;
								else
									break;
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
				var field = userDefinedFields [name];

				field .removeInterest ("set_field__", this);

				switch (field .getType ())
				{
					case X3DConstants .SFNode:
					{
						this .removeNode (gl, program, field ._uniformLocation);
						break;
					}
					case X3DConstants .MFNode:
					{
						var name = field .getName ();

						for (var i = 0; ; ++ i)
						{
							var location = gl .getUniformLocation (program, name + "[" + i + "]");

							if (location)
								this .removeNode (gl, program, location);
							else
								break;
						}

						break;
					}
					default:
						continue;
				}

				break;
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
				this .useProgram (gl); // TODO: only in ComposedShader possible.

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
							pixels = field .array .getValue (),
							length = 3 + pixels .length;
	
						if (length !== array .length)
							array = location .array = new Int32Array (length);
	
						array [0] = field .width;
						array [1] = field .height;
						array [2] = field .comp;
	
						for (var a = 3, p = 0, length = pixels .length; p < length; ++ p)
							array [a ++] = pixels [p] .getValue ();
	
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
						this .setNode (gl, program, location, field);
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, length = value .length; i < length; ++ i)
							array [i] = value [i] .getValue ();
	
						for (var length = array .length; i < length; ++ i)
							array [i] = 0;
	
						gl .uniform1iv (location, array);
						return;
					}
					case X3DConstants .MFColor:
					{
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var color = value [i] .getValue ();
	
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var color = value [i] .getValue ();
	
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, length = value .length; i < length; ++ i)
							array [i] = value [i] .getValue ();
	
						for (var length = array .length; i < length; ++ i)
							array [i] = 0;
	
						gl .uniform1fv (location, array);
						return;
					}
					case X3DConstants .MFImage:
					{
						var
							images = field .getValue (),
							array  = location .array,
							length = this .getImagesLength (field);
	
						if (length !== array .length)
							array = location .array = new Int32Array (length);
	
						for (var i = 0, a = 0, length = images .length; i < length; ++ i)
						{
							var
								value  = images [i],
								pixels = value .array .getValue ();
	
							array [a ++] = value .width;
							array [a ++] = value .height;
							array [a ++] = value .comp;
	
							for (var p = 0, plength = pixels .length; p < plength; ++ p)
								array [a ++] = pixels [p] .getValue ();
						}
	
						gl .uniform1iv (location, array);
						return;
					}
					case X3DConstants .MFMatrix3d:
					case X3DConstants .MFMatrix3f:
					{
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var matrix = value [i] .getValue ();
	
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
					case X3DConstants .MFMatrix4d:
					case X3DConstants .MFMatrix4f:
					{
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var matrix = value [i] .getValue ();
	
							array [k++] = matrix [ 0];
							array [k++] = matrix [ 1];
							array [k++] = matrix [ 2];
							array [k++] = matrix [ 3];
							array [k++] = matrix [ 4];
							array [k++] = matrix [ 5];
							array [k++] = matrix [ 6];
							array [k++] = matrix [ 7];
							array [k++] = matrix [ 8];
							array [k++] = matrix [ 9];
							array [k++] = matrix [10];
							array [k++] = matrix [11];
							array [k++] = matrix [12];
							array [k++] = matrix [13];
							array [k++] = matrix [14];
							array [k++] = matrix [15];
						}
	
						for (var length = array .length; k < length; ++ k)
							array [k] = 0;
	
						gl .uniformMatrix4fv (location, false, array);
						return;
					}
					case X3DConstants .MFNode:
					{
						var value = field .getValue ();
	
						for (var i = 0, length = value .length; i < length; ++ i)
							this .setNode (gl, program, location [i], value [i]);
	
						for (var length = location .length; i < length; ++ i)
							this .setNode (gl, program, location [i], NULL);
	
						return;
					}
					case X3DConstants .MFRotation:
					{
						var
							value = field .getValue (),
							array = location .array;

						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var matrix = value [i] .getValue () .getMatrix (matrix3);
	
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var vector = value [i] .getValue ();
	
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var vector = value [i] .getValue ();
	
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
						var
							value = field .getValue (),
							array = location .array;
	
						for (var i = 0, k = 0, length = value .length; i < length; ++ i)
						{
							var vector = value [i] .getValue ();
	
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
		setNode: function (gl, program, location, field)
		{
			if (location)
			{
				var textureUnit = gl .getUniform (program, location);

				if (! textureUnit)
				{
					if (this .getBrowser () .getCombinedTextureUnits () .length)
					{
						textureUnit = this .getBrowser () .getCombinedTextureUnits () .pop ();
						gl .uniform1i (location, textureUnit);
					}
					else
					{
						console .warn ("Not enough combined texture units for uniform variable '", field .getName (), "' available.");
						return;
					}
				}

				gl .activeTexture (gl .TEXTURE0 + textureUnit);

				var texture = X3DCast (X3DConstants .X3DTextureNode, field);

				if (texture)
					gl .bindTexture (texture .getTarget (), texture .getTexture ());

				gl .activeTexture (gl .TEXTURE0);
			}
		},
		removeNode: function (gl, program, location)
		{
			if (location)
			{
				var textureUnit = gl .getUniform (program, location);
	
				if (textureUnit)
					this .getBrowser () .getCombinedTextureUnits () .push (textureUnit);

				gl .uniform1i (location, 0);
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
		setClipPlanes: function (gl, clipPlanes)
		{
			if (clipPlanes .length)
			{
				for (var i = 0, numClipPlanes = Math .min (this .x3d_MaxClipPlanes, clipPlanes .length); i < numClipPlanes; ++ i)
					clipPlanes [i] .setShaderUniforms (gl, this, i);
	
				if (i < this .x3d_MaxClipPlanes)
					gl .uniform4fv (this .x3d_ClipPlane [i], this .x3d_NoneClipPlane);
			}
			else
				gl .uniform4fv (this .x3d_ClipPlane [0], this .x3d_NoneClipPlane);
		},
		setGlobalUniforms: function (renderObject, gl, projectionMatrixArray, viewportArray)
		{
			var globalLights = renderObject .getGlobalLights ();

			// Set viewport

			gl .uniform4iv (this .x3d_Viewport, viewportArray);

			// Set projection matrix

			gl .uniformMatrix4fv (this .x3d_ProjectionMatrix, false, projectionMatrixArray);

			// Set global lights

			this .numGlobalLights = Math .min (this .x3d_MaxLights, globalLights .length);

			for (var i = 0, length = this .numGlobalLights; i < length; ++ i)
				globalLights [i] .setShaderUniforms (gl, this, i);
		},
		setLocalUniforms: function (gl, context)
		{
			var
				linePropertiesNode   = context .linePropertiesNode,
				materialNode         = context .materialNode,
				textureNode          = context .textureNode,
				textureTransformNode = context .textureTransformNode,
				modelViewMatrix      = context .modelViewMatrix,
				clipPlaneNodes       = context .clipPlanes;

			// Geometry type

			gl .uniform1i (this .x3d_GeometryType, context .geometryType);

			// Clip planes

			if (clipPlaneNodes .length)
			{
				for (var i = 0, numClipPlanes = Math .min (this .x3d_MaxClipPlanes, clipPlaneNodes .length); i < numClipPlanes; ++ i)
					clipPlaneNodes [i] .setShaderUniforms (gl, this, i);
	
				if (i < this .x3d_MaxClipPlanes)
					gl .uniform4fv (this .x3d_ClipPlane [i], this .x3d_NoneClipPlane);
			}
			else
			{
				gl .uniform4fv (this .x3d_ClipPlane [0], this .x3d_NoneClipPlane);
			}

			// Fog, there is always one

			if (context .fogNode !== this .fogNode)
			{
				this .fogNode = context .fogNode;
				context .fogNode .setShaderUniforms (gl, this, context .renderer);
			}

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

				var
					localLights = context .localLights,
					numLights   = Math .min (this .x3d_MaxLights, this .numGlobalLights + localLights .length);

				for (var i = this .numGlobalLights, l = 0; i < numLights; ++ i, ++ l)
					localLights [l] .setShaderUniforms (gl, this, i);

				if (numLights < this .x3d_MaxLights)
					gl .uniform1i (this .x3d_LightType [numLights], 0);

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
				result .uniforms .push ($.extend ({ }, uniform));
				result .uniformCount += uniform .size;
			}

			// Loop through active attributes
			for (var i = 0; i < activeAttributes; ++ i)
			{
				var attribute = gl .getActiveAttrib (program, i);
				attribute .typeName = enums [attribute .type];
				result .attributes .push ($.extend ({ }, attribute));
				result .attributeCount += attribute .size;
			}

			result .uniforms   .sort (function (a, b) { return a .name < b .name ? -1 : a .name > b .name ? 1 : 0 });
			result .attributes .sort (function (a, b) { return a .name < b .name ? -1 : a .name > b .name ? 1 : 0 });

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


