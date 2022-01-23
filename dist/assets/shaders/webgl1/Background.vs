precision highp float;
precision highp int;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
attribute vec4 x3d_Color;
attribute vec4 x3d_Vertex;
varying vec4 color; 
varying vec3 vertex; 
void
main ()
{
vec4 position = x3d_ModelViewMatrix * x3d_Vertex;
color = x3d_Color;
vertex = position .xyz;
gl_Position = x3d_ProjectionMatrix * position;
}
