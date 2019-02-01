// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_TextureMatrix [1];
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform bool x3d_SeparateBackColor;
uniform x3d_MaterialParameters x3d_FrontMaterial;  
uniform x3d_MaterialParameters x3d_BackMaterial;

attribute float x3d_FogDepth;
attribute vec4  x3d_Color;
attribute vec4  x3d_TexCoord;
attribute vec3  x3d_Normal;
attribute vec4  x3d_Vertex;

varying float fogDepth;   // fog depth
varying vec4  frontColor; // color
varying vec4  backColor;  // color
varying vec4  t;          // texCoord
varying vec3  v;          // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif

float
getSpotFactor (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)
{
	float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));
	
	if (spotAngle >= cutOffAngle)
		return 0.0;
	else if (spotAngle <= beamWidth)
		return 1.0;

	return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}

vec4
getMaterialColor (const in vec3 N,
                  const in vec3 v,
                  const in x3d_MaterialParameters material)
{
	vec3 V = normalize (-v); // normalized vector from point on geometry to viewer's position

	// Calculate diffuseFactor & alpha

	vec3  diffuseFactor = vec3 (0.0, 0.0, 0.0);
	float alpha         = 1.0 - material .transparency;

	if (x3d_ColorMaterial)
	{
		diffuseFactor  = x3d_Color .rgb;
		alpha         *= x3d_Color .a;
	}
	else
		diffuseFactor = material .diffuseColor;

	vec3 ambientTerm = diffuseFactor * material .ambientIntensity;

	// Apply light sources

	vec3 finalColor = vec3 (0.0, 0.0, 0.0);

	for (int i = 0; i < x3d_MaxLights; ++ i)
	{
		if (i == x3d_NumLights)
			break;

		x3d_LightSourceParameters light = x3d_LightSource [i];

		vec3  vL = light .location - v;
		float dL = length (light .matrix * vL);
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

			finalColor += attenuationSpotFactor * (light .color * ambientDiffuseSpecularColor);
		}
	}

	finalColor += material .emissiveColor;

	return vec4 (clamp (finalColor, 0.0, 1.0), alpha);
}

void
main ()
{
	gl_PointSize = x3d_LinewidthScaleFactor;

	vec4 p = x3d_ModelViewMatrix * x3d_Vertex;

	fogDepth = x3d_FogDepth;
	t        = x3d_TextureMatrix [0] * x3d_TexCoord;
	v        = p .xyz;

	gl_Position = x3d_ProjectionMatrix * p;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif

	if (x3d_Lighting)
	{
		vec3 N = normalize (x3d_NormalMatrix * x3d_Normal);

		frontColor = getMaterialColor (N, v, x3d_FrontMaterial);

		x3d_MaterialParameters backMaterial = x3d_FrontMaterial;

		if (x3d_SeparateBackColor)
			backMaterial = x3d_BackMaterial;

		backColor = getMaterialColor (-N, v, backMaterial);
	}
	else
	{
	   frontColor = backColor = x3d_ColorMaterial ? x3d_Color : vec4 (1.0, 1.0, 1.0, 1.0);
	}
}
