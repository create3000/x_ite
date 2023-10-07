export default /* glsl */ `#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;

out vec2 texCoord; // [-1,1]

const int indices [6] = int [6] (0, 1, 2, 0, 2, 3);
const vec2 vertices [4] = vec2 [4] (
	vec2 (-1.0, -1.0),
	vec2 ( 1.0, -1.0),
	vec2 ( 1.0,  1.0),
	vec2 (-1.0,  1.0)
);

void
main ()
{
   texCoord = vertices [indices [gl_VertexID]];

   gl_Position = vec4 (texCoord, 0.0, 1.0);
}
`;
