// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform float x3d_LinewidthScaleFactor;
uniform bool  x3d_Lighting;  // true if a X3DMaterialNode is attached, otherwise false

attribute float x3d_FogDepth;
attribute vec4  x3d_Color;
attribute vec4  x3d_TexCoord;
attribute vec3  x3d_Normal;
attribute vec4  x3d_Vertex;

varying float fD; // fog depth
varying vec4  C;  // color
varying vec4  t;  // texCoord
varying vec3  vN; // normalized normal vector at this point on geometry
varying vec3  v;  // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif

void
main ()
{
	gl_PointSize = x3d_LinewidthScaleFactor;

	vec4 p = x3d_ModelViewMatrix * x3d_Vertex;

	if (x3d_Lighting)
		vN = x3d_NormalMatrix * x3d_Normal;

	fD = x3d_FogDepth;
	C  = x3d_Color;
	t  = x3d_TextureMatrix [0] * x3d_TexCoord;
	v  = p .xyz;

	gl_Position = x3d_ProjectionMatrix * p;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif
}
