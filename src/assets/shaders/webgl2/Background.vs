#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in vec4 x3d_Color;
in vec4 x3d_Vertex;

out vec4 color;  // color
out vec3 vertex; // point on geometry

void
main ()
{
	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	color       = x3d_Color;
	vertex      = position .xyz;
	gl_Position = x3d_ProjectionMatrix * position;
}
