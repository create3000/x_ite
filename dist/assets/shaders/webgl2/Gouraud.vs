#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform bool x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform bool x3d_SeparateBackColor;
uniform x3d_MaterialParameters x3d_FrontMaterial;  
uniform x3d_MaterialParameters x3d_BackMaterial;

in float x3d_FogDepth;
in vec4  x3d_Color;
in vec4  x3d_TexCoord0;
in vec4  x3d_TexCoord1;
in vec3  x3d_Normal;
in vec4  x3d_Vertex;

out float fogDepth;    // fog depth
out vec4  frontColor;  // color
out vec4  backColor;   // color
out vec4  texCoord0;   // texCoord0
out vec4  texCoord1;   // texCoord1
out vec3  normal;      // normal vector at this point on geometry
out vec3  vertex;      // point on geometry
out vec3  localNormal; // normal vector at this point on geometry in local coordinates
out vec3  localVertex; // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
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
                  const in vec3 vertex,
                  const in x3d_MaterialParameters material)
{
	vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position

	// Calculate diffuseFactor & alpha

	vec3  diffuseFactor = vec3 (0.0);
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

	vec3 finalColor = vec3 (0.0);

	for (int i = 0; i < x3d_MaxLights; ++ i)
	{
		if (i == x3d_NumLights)
			break;

		x3d_LightSourceParameters light = x3d_LightSource [i];

		vec3  vL = light .location - vertex;
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
	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	fogDepth    = x3d_FogDepth;
	texCoord0   = x3d_TextureMatrix [0] * x3d_TexCoord0;
	texCoord1   = x3d_TextureMatrix [1] * x3d_TexCoord1;
	vertex      = position .xyz;
	normal      = normalize (x3d_NormalMatrix * x3d_Normal);
	localNormal = x3d_Normal;
	localVertex = x3d_Vertex .xyz;

	gl_Position = x3d_ProjectionMatrix * position;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif

	if (x3d_Lighting)
	{

		frontColor = getMaterialColor (normal, vertex, x3d_FrontMaterial);

		x3d_MaterialParameters backMaterial = x3d_FrontMaterial;

		if (x3d_SeparateBackColor)
			backMaterial = x3d_BackMaterial;

		backColor = getMaterialColor (-normal, vertex, backMaterial);
	}
	else
	{
	   frontColor = backColor = x3d_ColorMaterial ? x3d_Color : vec4 (1.0);
	}
}
