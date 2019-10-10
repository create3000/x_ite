#version 300 es

precision mediump float;
precision mediump int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat4 x3d_TextureMatrix [1];

in vec4 x3d_Vertex;
in vec4 x3d_TexCoord0;

out vec3 vertex;
out vec4 texCoord;

void
main ()
{
	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	vertex   = position .xyz;
	texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;

	gl_Position = x3d_ProjectionMatrix * position;
}
