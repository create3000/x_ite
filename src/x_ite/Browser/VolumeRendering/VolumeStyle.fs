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

#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Fog.glsl"

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
