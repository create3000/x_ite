// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision mediump float;
precision mediump int;

uniform int x3d_GeometryType;

uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int         x3d_NumTextures;
uniform int         x3d_TextureType [x3d_MaxTextures]; // x3d_None, x3d_TextureType2D or x3d_TextureTypeCubeMapTexture
uniform sampler2D   x3d_Texture2D [x3d_MaxTextures];
uniform samplerCube x3d_CubeMapTexture [x3d_MaxTextures];

uniform x3d_TextureCoordinateGeneratorParameters x3d_TextureCoordinateGenerator [x3d_MaxTextures];  

uniform x3d_FogParameters x3d_Fog;

varying float fogDepth;   // fog depth
varying vec4  frontColor; // color
varying vec4  backColor;  // color
varying vec4  t0;         // texCoord
varying vec3  vN;         // normal vector at this point on geometry
varying vec3  v;          // point on geometry
varying vec3  lN;         // normal vector at this point on geometry in local coordinates
varying vec3  lV;         // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

#pragma X3D include "Include/Perlin.h"

void
clip ()
{
	for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
	{
		if (i == x3d_NumClipPlanes)
			break;

		if (dot (v, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
			discard;
	}
}

vec4
getTextureCoordinate (x3d_TextureCoordinateGeneratorParameters textureCoordinateGenerator, in vec4 t)
{
	int mode = textureCoordinateGenerator .mode;

	if (mode == x3d_None)
	{
		return t;
	}
	else if (mode == x3d_Sphere)
	{
		return vec4 (vN .x / 2.0 + 0.5, vN .y / 2.0 + 0.5, 0.0, 1.0);
	}
	else if (mode == x3d_CameraSpaceNormal)
	{
		return vec4 (vN, 1.0);
	}
	else if (mode == x3d_CameraSpacePosition)
	{
		return vec4 (v, 1.0);
	}
	else if (mode == x3d_CameraSpaceReflectionVector)
	{
		return vec4 (reflect (normalize (v), -vN), 1.0);
	}
	else if (mode == x3d_SphereLocal)
	{
		return vec4 (lN .x / 2.0 + 0.5, lN .y / 2.0 + 0.5, 0.0, 1.0);
	}
	else if (mode == x3d_Coord)
	{
		return vec4 (lV, 1.0);
	}
	else if (mode == x3d_CoordEye)
	{
		return vec4 (v, 1.0);
	}
	else if (mode == x3d_Noise)
	{
		vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
		vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

		return vec4 (perlin (lV * scale + translation), 1.0);
	}
	else if (mode == x3d_NoiseEye)
	{
		vec3 scale       = vec3 (textureCoordinateGenerator .parameter [0], textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2]);
		vec3 translation = vec3 (textureCoordinateGenerator .parameter [3], textureCoordinateGenerator .parameter [4], textureCoordinateGenerator .parameter [5]);

		return vec4 (perlin (v * scale + translation), 1.0);
	}
	else if (mode == x3d_SphereReflect)
	{
		float eta = textureCoordinateGenerator .parameter [0];

		return vec4 (refract (normalize (v), -vN, eta), 1.0);
	}
	else if (mode == x3d_SphereReflectLocal)
	{
		float eta = textureCoordinateGenerator .parameter [0];
		vec3  eye = vec3 (textureCoordinateGenerator .parameter [1], textureCoordinateGenerator .parameter [2], textureCoordinateGenerator .parameter [3]);

		return vec4 (refract (normalize (lV - eye), -lN, eta), 1.0);
	}

	return t;
}

vec4
getTextureColor ()
{
	vec4 texCoords = getTextureCoordinate (x3d_TextureCoordinateGenerator [0], t0);

	if (x3d_TextureType [0] == x3d_TextureType2D)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return texture2D (x3d_Texture2D [0], vec2 (texCoords));

		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return texture2D (x3d_Texture2D [0], vec2 (1.0 - texCoords .s, texCoords .t));
	}

 	if (x3d_TextureType [0] == x3d_TextureTypeCubeMapTexture)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return textureCube (x3d_CubeMapTexture [0], vec3 (texCoords));
		
		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return textureCube (x3d_CubeMapTexture [0], vec3 (1.0 - texCoords .s, texCoords .t, texCoords .z));
	}
 
	return vec4 (1.0, 1.0, 1.0, 1.0);
}

float
getFogInterpolant ()
{
	// Returns 0.0 for fog color and 1.0 for material color.

	if (x3d_Fog .type == x3d_None)
		return 1.0;

	float visibilityRange = x3d_Fog .fogCoord ? fogDepth : x3d_Fog .visibilityRange;

	if (visibilityRange <= 0.0)
		return 1.0;

	float dV = length (x3d_Fog .matrix * v);

	if (dV >= visibilityRange)
		return 0.0;

	if (x3d_Fog .type == x3d_LinearFog)
		return (visibilityRange - dV) / visibilityRange;

	if (x3d_Fog .type == x3d_ExponentialFog)
		return exp (-dV / (visibilityRange - dV));

	return 1.0;
}

vec3
getFogColor (const in vec3 color)
{
	return mix (x3d_Fog .color, color, getFogInterpolant ());
}

void
main ()
{
 	clip ();

	vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

	if (x3d_TextureType [0] != x3d_None)
	{
		if (x3d_Lighting)
		{
			finalColor *= getTextureColor ();
		}
		else
		{
			if (x3d_ColorMaterial)
				finalColor *= getTextureColor ();
			else
				finalColor = getTextureColor ();
		}
	}

	gl_FragColor .rgb = getFogColor (finalColor .rgb);
	gl_FragColor .a   = finalColor .a;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepthEXT = gl_FragCoord .z;
	#endif
}
