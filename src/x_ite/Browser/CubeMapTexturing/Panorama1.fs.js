export default /* glsl */ `

precision highp float;
precision highp int;
precision highp sampler2D;

const float M_PI = 3.1415926535897932384626433832795;

varying vec2 texCoord;

uniform sampler2D x3d_PanoramaTexture;
uniform int       x3d_CurrentFace;

vec3
uvToXYZ (const in int face, const in vec2 uv)
{
	vec3 xyz;

	if (face == 0)      xyz = vec3 ( 1.0,    uv .y,  uv .x);
	else if (face == 1) xyz = vec3 (-1.0,    uv .y, -uv .x);
	else if (face == 2) xyz = vec3 ( uv .x,  uv .y, -1.0);
	else if (face == 3) xyz = vec3 (-uv .x,  uv .y,  1.0);
	else if (face == 4) xyz = vec3 ( uv .y, -1.0,    uv .x);
	else                xyz = vec3 (-uv .y,  1.0,    uv .x);

	return xyz;
}

vec2
dirToUV (const in vec3 dir)
{
	return vec2 (0.5 + 0.5 * atan (dir .z, dir .x) / M_PI,
		          1.0 - acos (dir .y) / M_PI);
}

vec3
panoramaToCubeMap (const in int face, const in vec2 texCoord)
{
	vec3 scan      = uvToXYZ (face, texCoord);
	vec3 direction = normalize (scan);
	vec2 src       = dirToUV (direction);

	return texture2D (x3d_PanoramaTexture, src) .rgb;
}

void
main ()
{
   gl_FragColor = vec4 (panoramaToCubeMap (x3d_CurrentFace, texCoord), 1.0);
}
`;
