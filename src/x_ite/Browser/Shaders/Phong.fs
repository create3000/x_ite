// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform int x3d_GeometryType;

uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform bool x3d_SeparateBackColor;
uniform x3d_MaterialParameters x3d_FrontMaterial;  
uniform x3d_MaterialParameters x3d_BackMaterial;        

uniform int         x3d_NumTextures;
uniform int         x3d_TextureType [x3d_MaxTextures]; // x3d_None, x3d_TextureType2D or x3d_TextureTypeCubeMapTexture
uniform sampler2D   x3d_Texture2D [x3d_MaxTextures];
uniform samplerCube x3d_CubeMapTexture [x3d_MaxTextures];

uniform x3d_FogParameters x3d_Fog;

varying vec4 C;  // color
varying vec4 t;  // texCoord
varying vec3 vN; // normalized normal vector at this point on geometry
varying vec3 v;  // point on geometry

#pragma X3D include "Inlcude/Shadow.h"

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

float
getSpotFactor (in float cutOffAngle, in float beamWidth, in vec3 L, in vec3 d)
{
	float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));
	
	if (spotAngle >= cutOffAngle)
		return 0.0;
	else if (spotAngle <= beamWidth)
		return 1.0;

	return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}

vec4
getTextureColor ()
{
	if (x3d_TextureType [0] == x3d_TextureType2D)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return texture2D (x3d_Texture2D [0], vec2 (t));
		
		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return texture2D (x3d_Texture2D [0], vec2 (1.0 - t .s, t .t));
	}

 	if (x3d_TextureType [0] == x3d_TextureTypeCubeMapTexture)
	{
		if (x3d_GeometryType == x3d_Geometry3D || gl_FrontFacing)
			return textureCube (x3d_CubeMapTexture [0], vec3 (t));
		
		// If dimension is x3d_Geometry2D the texCoords must be flipped.
		return textureCube (x3d_CubeMapTexture [0], vec3 (1.0 - t .s, t .t, t .z));
	}
 
	return vec4 (1.0, 1.0, 1.0, 1.0);
}

vec4
getMaterialColor (in x3d_MaterialParameters material)
{
	if (x3d_Lighting)
	{
		vec3  N  = normalize (gl_FrontFacing ? vN : -vN);
		vec3  V  = normalize (-v); // normalized vector from point on geometry to viewer's position
		float dV = length (v);

		// Calculate diffuseFactor & alpha

		vec3  diffuseFactor = vec3 (1.0, 1.0, 1.0);
		float alpha         = 1.0 - material .transparency;

		if (x3d_ColorMaterial)
		{
			if (x3d_TextureType [0] != x3d_None)
			{
				vec4 T = getTextureColor ();

				diffuseFactor  = T .rgb * C .rgb;
				alpha         *= T .a;
			}
			else
				diffuseFactor = C .rgb;

			alpha *= C .a;
		}
		else
		{
			if (x3d_TextureType [0] != x3d_None)
			{
				vec4 T = getTextureColor ();

				diffuseFactor  = T .rgb * material .diffuseColor;
				alpha         *= T .a;
			}
			else
				diffuseFactor = material .diffuseColor;
		}

		vec3 ambientTerm = diffuseFactor * material .ambientIntensity;

		// Apply light sources

		vec3 finalColor = vec3 (0.0, 0.0, 0.0);

		for (int i = 0; i < x3d_MaxLights; i ++)
		{
			if (i == x3d_NumLights)
				break;

			x3d_LightSourceParameters light = x3d_LightSource [i];

			vec3  vL = light .location - v;
			float dL = length (vL);
			bool  di = light .type == x3d_DirectionalLight;

			if (di || dL <= light .radius)
			{
				vec3 d = light .direction;
				vec3 c = light .attenuation;
				vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.
				vec3 H = normalize (L + V);             // Specular term

				float lightAngle     = dot (N, L);      // Angle between normal and light ray.
				vec3  diffuseTerm    = diffuseFactor * clamp (lightAngle, 0.0, 1.0);
				float specularFactor = material .shininess > 0.0 ? pow (max (dot (N, H), 0.0), material .shininess * 128.0) : 1.0;
				vec3  specularTerm   = material .specularColor * specularFactor;

				float attenuationFactor           = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);
				float spotFactor                  = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;
				float attenuationSpotFactor       = attenuationFactor * spotFactor;
				vec3  ambientColor                = light .ambientIntensity * ambientTerm;
				vec3  ambientDiffuseSpecularColor = ambientColor + light .intensity * (diffuseTerm + specularTerm);
				float shadowIntensity             = getShadowIntensity (i, light .type, lightAngle, light .shadowIntensity, light .shadowBias, light .shadowMatrix, light .shadowMapSize);

				finalColor += attenuationSpotFactor * mix (light .color * ambientDiffuseSpecularColor, light .shadowColor, shadowIntensity);
			}
		}

		finalColor += material .emissiveColor;

		return vec4 (finalColor, alpha);
	}
	else
	{
		vec4 finalColor = vec4 (1.0, 1.0, 1.0, 1.0);
	
		if (x3d_ColorMaterial)
		{
			if (x3d_TextureType [0] != x3d_None)
			{
				vec4 T = getTextureColor ();

				finalColor = T * C;
			}
			else
				finalColor = C;
		}
		else
		{
			if (x3d_TextureType [0] != x3d_None)
				finalColor = getTextureColor ();
		}

		return finalColor;
	}
}

float
getFogInterpolant ()
{
	// Returns 0.0 for fog color and 1.0 for material color.

	if (x3d_Fog .type == x3d_None)
		return 1.0;

	if (x3d_Fog .visibilityRange <= 0.0)
		return 0.0;

	float dV = length (v);

	if (dV >= x3d_Fog .visibilityRange)
		return 0.0;

	if (x3d_Fog .type == x3d_LinearFog)
		return (x3d_Fog .visibilityRange - dV) / x3d_Fog .visibilityRange;

	if (x3d_Fog .type == x3d_ExponentialFog)
		return exp (-dV / (x3d_Fog .visibilityRange - dV));

	return 1.0;
}

vec3
getFogColor (in vec3 color)
{
	return mix (x3d_Fog .color, color, getFogInterpolant ());
}

void
main ()
{
	clip ();

	bool frontColor = gl_FrontFacing || ! x3d_SeparateBackColor;

	gl_FragColor = frontColor ? getMaterialColor (x3d_FrontMaterial) : getMaterialColor (x3d_BackMaterial);

	gl_FragColor .rgb = getFogColor (gl_FragColor .rgb);
}
