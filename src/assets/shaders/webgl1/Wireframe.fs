// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision mediump float;
precision mediump int;

uniform x3d_LinePropertiesParameters x3d_LineProperties;
uniform ivec4 x3d_Viewport;

varying float fogDepth; // fog depth
varying vec4  color;    // color
varying vec3  vertex;   // point on geometry

#ifdef X_ITE
varying vec3 startPosition;  // line stipple start
varying vec3 vertexPosition; // current line stipple position
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
varying float depth;
#endif

#pragma X3D include "Include/Fog.h"
#pragma X3D include "Include/ClipPlanes.h"

#ifdef X_ITE
void
stipple ()
{
	if (x3d_LineProperties .applied)
	{
		vec2  direction = (vertexPosition .xy - startPosition .xy) * vec2 (x3d_Viewport .zw) * 0.5;
		float distance  = length (direction) / 16.0;
		float color     = texture2D (x3d_LineProperties .linetype, vec2 (distance, distance)) .a;

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

	gl_FragColor .rgb = getFogColor (color .rgb);
	gl_FragColor .a   = color .a;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepthEXT = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepthEXT = gl_FragCoord .z;
	#endif
}
