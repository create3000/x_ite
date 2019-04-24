#version 300 es

precision mediump float;
precision mediump int;

uniform x3d_LinePropertiesParameters x3d_LineProperties;
uniform ivec4 x3d_Viewport;

in float fogDepth; // fog depth
in vec4  color;    // color
in vec3  vertex;   // point on geometry

#ifdef X_ITE
in vec3 startPosition;  // line stipple start
in vec3 vertexPosition; // current line stipple position
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Fog.h"
#pragma X3D include "include/ClipPlanes.h"

#ifdef X_ITE
void
stipple ()
{
	if (x3d_LineProperties .applied)
	{
		vec2  direction = (vertexPosition .xy - startPosition .xy) * vec2 (x3d_Viewport .zw) * 0.5;
		float distance  = length (direction) / 16.0;
		float color     = texture (x3d_LineProperties .linetype, vec2 (distance, distance)) .a;

		if (color == 0.0)
			discard;
	}
}
#endif

void
main ()
{
	clip ();

	#ifdef X_ITE
	stipple ();
	#endif

	x3d_FragColor .rgb = getFogColor (color .rgb);
	x3d_FragColor .a   = color .a;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
