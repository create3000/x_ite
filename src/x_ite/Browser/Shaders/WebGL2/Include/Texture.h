/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

#pragma X3D include "Perlin.h"

uniform int         x3d_NumTextures;
uniform int         x3d_TextureType [x3d_MaxTextures]; // x3d_None, x3d_TextureType2D or x3d_TextureTypeCubeMapTexture
uniform sampler2D   x3d_Texture2D [x3d_MaxTextures];
uniform samplerCube x3d_CubeMapTexture [x3d_MaxTextures];

uniform vec4 x3d_MultiTextureColor;
uniform x3d_MultiTextureParameters x3d_MultiTexture [x3d_MaxTextures];

uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures];  

#ifdef X3D_MULTI_TEXTURING
vec4
getTexCoord (const in int i)
{
	if (i == 0)
	{
		return texCoord0;
	}

	return texCoord1;
}

vec4
getTextureCoordinate (const in x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator, const in int i)
{
	int mode = textureCoordinateGenerator .mode;

	if (mode == x3d_None)
	{
		return getTexCoord (i);
	}
	else if (mode == x3d_Sphere)
	{
		return vec4 (normal .x / 2.0 + 0.5, normal .y / 2.0 + 0.5, 0.0, 1.0);
	}
	else if (mode == x3d_CameraSpaceNormal)
	{
		return vec4 (normal, 1.0);
	}
	else if (mode == x3d_CameraSpacePosition)
	{
		return vec4 (vertex, 1.0);
	}
	else if (mode == x3d_CameraSpaceReflectionVector)
	{
		return vec4 (reflect (normalize (vertex), -normal), 1.0);
	}
	else if (mode == x3d_SphereLocal)
	{
		return vec4 (localNormal .x / 2.0 + 0.5, localNormal .y / 2.0 + 0.5, 0.0, 1.0);
	}
	else if (mode == x3d_Coord)
	{
		return vec4 (localVertex, 1.0);
	}
	else if (mode == x3d_CoordEye)
	{
		return vec4 (vertex, 1.0);
	}
	else if (mode == x3d_Noise)
	{
		vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
		vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

		return vec4 (perlin (localVertex * scale + translation), 1.0);
	}
	else if (mode == x3d_NoiseEye)
	{
		vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
		vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

		return vec4 (perlin (vertex * scale + translation), 1.0);
	}
	else if (mode == x3d_SphereReflect)
	{
		float eta = textureCoordinateGenerator .parameter [0];

		return vec4 (refract (normalize (vertex), -normal, eta), 1.0);
	}
	else if (mode == x3d_SphereReflectLocal)
	{
		float eta = textureCoordinateGenerator .parameter [0];
		vec3  eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);

		return vec4 (refract (normalize (localVertex - eye), -localNormal, eta), 1.0);
	}

	return getTexCoord (i);
}

vec4
getTexture2D (in int i, in vec2 texCoord)
{
	if (i == 0)
		return texture (x3d_Texture2D [0], texCoord);

	return texture (x3d_Texture2D [1], texCoord);
}

vec4
getTextureCube (in int i, in vec3 texCoord)
{
	if (i == 0)
		return texture (x3d_CubeMapTexture [0], texCoord);

	return texture (x3d_CubeMapTexture [1], texCoord);
}

vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
	vec4 currentColor = diffuseColor;

	for (int i = 0; i < x3d_MaxTextures; ++ i)
	{
		if (i == x3d_NumTextures)
			break;

		// Get texture color.

		vec4 texCoord     = getTextureCoordinate (x3d_TextureCoordinateGenerator [i], i);
		vec4 textureColor = vec4 (1.0);
	
		if (x3d_GeometryType == x3d_Geometry2D && ! gl_FrontFacing)
			texCoord .s = 1.0 - texCoord .s;

		if (x3d_TextureType [i] == x3d_TextureType2D)
		{
			textureColor = getTexture2D (i, vec2 (texCoord));
		}
	 	else if (x3d_TextureType [i] == x3d_TextureTypeCubeMapTexture)
		{
			textureColor = getTextureCube (i, vec3 (texCoord));
		}

		// Multi texturing

		x3d_MultiTextureParameters multiTexture = x3d_MultiTexture [i];

		vec4 arg1 = textureColor;
		vec4 arg2 = currentColor;

		// Source

		int source = multiTexture .source;

		if (source == x3d_Diffuse)
		{
			arg1 = diffuseColor;
		}
		else if (source == x3d_Specular)
		{
			arg1 = specularColor;
		}
		else if (source == x3d_Factor)
		{
			arg1 = x3d_MultiTextureColor;
		}

		// Function

		int function = multiTexture .function;

		if (function == x3d_Complement)
		{
			arg1 = 1.0 - arg1;
		}
		else if (function == x3d_AlphaReplicate)
		{
			arg1 .a = arg2 .a;
		}

		// Mode

		int mode      = multiTexture .mode;
		int alphaMode = multiTexture .alphaMode;

		// RGB

		if (mode == x3d_Replace)
		{
			currentColor .rgb = arg1 .rgb;
		}
		else if (mode == x3d_Modulate)
		{
			currentColor .rgb = arg1 .rgb * arg2 .rgb;
		}
		else if (mode == x3d_Modulate2X)
		{
			currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 2.0;
		}
		else if (mode == x3d_Modulate4X)
		{
			currentColor .rgb = (arg1 .rgb * arg2 .rgb) * 4.0;
		}
		else if (mode == x3d_Add)
		{
			currentColor .rgb = arg1 .rgb + arg2 .rgb;
		}
		else if (mode == x3d_AddSigned)
		{
			currentColor .rgb = arg1 .rgb + arg2 .rgb - 0.5;
		}
		else if (mode == x3d_AddSigned2X)
		{
			currentColor .rgb = (arg1 .rgb + arg2 .rgb - 0.5) * 2.0;
		}
		else if (mode == x3d_AddSmooth)
		{
			currentColor .rgb = arg1 .rgb + (1.0 - arg1 .rgb) * arg2 .rgb;
		}
		else if (mode == x3d_Subtract)
		{
			currentColor .rgb = arg1 .rgb - arg2 .rgb;
		}
		else if (mode == x3d_BlendDiffuseAlpha)
		{
			currentColor .rgb = arg1 .rgb * diffuseColor .a + arg2 .rgb * (1.0 - diffuseColor .a);
		}
		else if (mode == x3d_BlendTextureAlpha)
		{
			currentColor .rgb = arg1 .rgb * arg1 .a + arg2 .rgb * (1.0 - arg1 .a);
		}
		else if (mode == x3d_BlendFactorAlpha)
		{
			currentColor .rgb = arg1 .rgb * x3d_MultiTextureColor .a + arg2 .rgb * (1.0 - x3d_MultiTextureColor .a);
		}
		else if (mode == x3d_BlendCurrentAlpha)
		{
			currentColor .rgb = arg1 .rgb * arg2 .a + arg2 .rgb * (1.0 - arg2 .a);
		}
		else if (mode == x3d_ModulateAlphaAddColor)
		{
			currentColor .rgb = arg1 .rgb + arg1 .a * arg2 .rgb;
		}
		else if (mode == x3d_ModulateInvAlphaAddColor)
		{
			currentColor .rgb = (1.0 - arg1 .a) * arg2 .rgb + arg1 .rgb;
		}
		else if (mode == x3d_ModulateInvColorAddAlpha)
		{
			currentColor .rgb = (1.0 - arg1 .rgb) * arg2 .rgb + arg1 .a;
		}
		else if (mode == x3d_DotProduct3)
		{
			currentColor .rgb = vec3 (dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0));
		}
		else if (mode == x3d_SelectArg1)
		{
			currentColor .rgb = arg1 .rgb;
		}
		else if (mode == x3d_SelectArg2)
		{
			currentColor .rgb = arg2 .rgb;
		}
		else if (mode == x3d_Off)
			;

		// Alpha

		if (alphaMode == x3d_Replace)
		{
			currentColor .a = arg1 .a;
		}
		else if (alphaMode == x3d_Modulate)
		{
			currentColor .a = arg1 .a * arg2 .a;
		}
		else if (mode == x3d_Modulate2X)
		{
			currentColor .a = (arg1 .a * arg2 .a) * 2.0;
		}
		else if (mode == x3d_Modulate4X)
		{
			currentColor .a = (arg1 .a * arg2 .a) * 4.0;
		}
		else if (mode == x3d_Add)
		{
			currentColor .a = arg1 .a + arg2 .a;
		}
		else if (mode == x3d_AddSigned)
		{
			currentColor .a = arg1 .a + arg2 .a - 0.5;
		}
		else if (mode == x3d_AddSigned2X)
		{
			currentColor .a = (arg1 .a + arg2 .a - 0.5) * 2.0;
		}
		else if (mode == x3d_AddSmooth)
		{
			currentColor .a = arg1 .a + (1.0 - arg1 .a) * arg2 .a;
		}
		else if (mode == x3d_Subtract)
		{
			currentColor .a = arg1 .a - arg2 .a;
		}
		else if (mode == x3d_BlendDiffuseAlpha)
		{
			currentColor .a = arg1 .a * diffuseColor .a + arg2 .a * (1.0 - diffuseColor .a);
		}
		else if (mode == x3d_BlendTextureAlpha)
		{
			currentColor .a = arg1 .a * arg1 .a + arg2 .a * (1.0 - arg1 .a);
		}
		else if (mode == x3d_BlendFactorAlpha)
		{
			currentColor .a = arg1 .a * x3d_MultiTextureColor .a + arg2 .a * (1.0 - x3d_MultiTextureColor .a);
		}
		else if (mode == x3d_BlendCurrentAlpha)
		{
			currentColor .a = arg1 .a * arg2 .a + arg2 .a * (1.0 - arg2 .a);
		}
		else if (mode == x3d_ModulateAlphaAddColor)
		{
			currentColor .a = arg1 .a + arg1 .a * arg2 .a;
		}
		else if (mode == x3d_ModulateInvAlphaAddColor)
		{
			currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
		}
		else if (mode == x3d_ModulateInvColorAddAlpha)
		{
			currentColor .a = (1.0 - arg1 .a) * arg2 .a + arg1 .a;
		}
		else if (mode == x3d_DotProduct3)
		{
			currentColor .a = dot (arg1 .rgb * 2.0 - 1.0, arg2 .rgb * 2.0 - 1.0);
		}
		else if (mode == x3d_SelectArg1)
		{
			currentColor .a = arg1 .a;
		}
		else if (mode == x3d_SelectArg2)
		{
			currentColor .a = arg2 .a;
		}
		else if (mode == x3d_Off)
			;
	}

	return currentColor;
}
#else
vec4
getTextureColor (const in vec4 diffuseColor, const in vec4 specularColor)
{
	// Get texture color.

	vec4 texCoord     = texCoord0;
	vec4 textureColor = vec4 (1.0);

	if (x3d_TextureType [0] == x3d_TextureType2D)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			textureColor = texture (x3d_Texture2D [0], vec2 (texCoord));
		else
			// If dimension is x3d_Geometry2D the texCoord must be flipped.
			textureColor = texture (x3d_Texture2D [0], vec2 (1.0 - texCoord .s, texCoord .t));
	}
 	else if (x3d_TextureType [0] == x3d_TextureTypeCubeMapTexture)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			textureColor = texture (x3d_CubeMapTexture [0], vec3 (texCoord));
		else
			// If dimension is x3d_Geometry2D the texCoord must be flipped.
			textureColor = texture (x3d_CubeMapTexture [0], vec3 (1.0 - texCoord .s, texCoord .t, texCoord .z));
	}

	return diffuseColor * textureColor;
}
#endif
