#version 300 es

precision mediump float;
precision mediump int;
precision mediump sampler3D;

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];

uniform int       x3d_NumTextures;
uniform sampler3D x3d_Texture3D [1];
uniform vec3      x3d_TextureSize;

uniform mat3 x3d_TextureNormalMatrix;

const float M_PI = 3.14159265359;

in float fogDepth;
in vec3  vertex;
in vec4  texCoord;

// VOLUME_STYLES_UNIFORMS

out vec4 x3d_FragColor;


uniform int  x3d_NumClipPlanes;
uniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];

void
clip ()
{
	for (int i = 0; i < x3d_MaxClipPlanes; ++ i)
	{
		if (i == x3d_NumClipPlanes)
			break;

		if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)
			discard;
	}
}


uniform x3d_FogParameters x3d_Fog;

float
getFogInterpolant ()
{
	// Returns 0.0 for fog color and 1.0 for material color.

	if (x3d_Fog .type == x3d_None)
		return 1.0;

	if (x3d_Fog .fogCoord)
		return clamp (1.0 - fogDepth, 0.0, 1.0);

	float visibilityRange = x3d_Fog .visibilityRange;

	if (visibilityRange <= 0.0)
		return 1.0;

	float dV = length (x3d_Fog .matrix * vertex);

	if (dV >= visibilityRange)
		return 0.0;

	switch (x3d_Fog .type)
	{
		case x3d_LinearFog:
		{
			return (visibilityRange - dV) / visibilityRange;
		}
		case x3d_ExponentialFog:
		{
			return exp (-dV / (visibilityRange - dV));
		}
		default:
		{
			return 1.0;
		}
	}
}

vec3
getFogColor (const in vec3 color)
{
	return mix (x3d_Fog .color, color, getFogInterpolant ());
}

vec4
getTextureColor (in vec3 texCoord)
{
	if (x3d_NumTextures == 0)
		discard;

	if (texCoord .s < 0.0 || texCoord .s > 1.0)
		discard;

	if (texCoord .t < 0.0 || texCoord .t > 1.0)
		discard;

	if (texCoord .p < 0.0 || texCoord .p > 1.0)
		discard;

	vec4 textureColor = texture (x3d_Texture3D [0], texCoord);

	// Apply volume styles.

// VOLUME_STYLES_FUNCTIONS

	return textureColor;
}

void
main ()
{
	clip ();

	x3d_FragColor = getTextureColor (texCoord .stp / texCoord .q);
}
