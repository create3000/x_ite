#version 300 es

precision mediump float;
precision mediump int;
precision mediump sampler3D;

uniform int       x3d_NumTextures;
uniform sampler3D x3d_Texture3D [1];
uniform sampler2D transferFunction;

in vec3 vertex;
in vec4 texCoord;

out vec4 x3d_FragColor;

#pragma X3D include "../webgl2/include/ClipPlanes.glsl"

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

	vec4 voxelColor   = texture (x3d_Texture3D [0], texCoord);
	vec4 textureColor = texture (transferFunction, voxelColor .ra);

	return textureColor;
}

void
main ()
{
	clip ();

	x3d_FragColor = getTextureColor (texCoord .stp / texCoord .q);
}
