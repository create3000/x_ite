#version 300 es

precision mediump float;
precision mediump int;

uniform x3d_LinePropertiesParameters x3d_LineProperties;

in float fogDepth; // fog depth
in vec4  color;    // color
in vec3  vertex;   // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
	clip ();

	float lw = (x3d_LineProperties .linewidthScaleFactor + 1.0) / 2.0;
	float t  = distance (vec2 (0.5, 0.5), gl_PointCoord) * 2.0 * lw - lw + 1.0;

	x3d_FragColor .rgb = getFogColor (color .rgb);
	x3d_FragColor .a   = mix (color .a, 0.0, clamp (t, 0.0, 1.0));

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
