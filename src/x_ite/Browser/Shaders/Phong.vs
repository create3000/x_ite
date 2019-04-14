// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform mat4 x3d_TextureMatrix [x3d_MaxTextures];
uniform mat3 x3d_NormalMatrix;
uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

uniform bool x3d_Lighting;  // true if a X3DMaterialNode is attached, otherwise false

attribute float x3d_FogDepth;
attribute vec4  x3d_Color;
attribute vec4  x3d_TexCoord0;
attribute vec4  x3d_TexCoord1;
attribute vec3  x3d_Normal;
attribute vec4  x3d_Vertex;

varying float fogDepth;    // fog depth
varying vec4  color;       // color
varying vec4  texCoord0;   // texCoord0
varying vec4  texCoord1;   // texCoord1
varying vec3  normal;      // normalized normal vector at this point on geometry
varying vec3  vertex;      // point on geometry
varying vec3  localNormal; // normal vector at this point on geometry in local coordinates
varying vec3  localVertex; // point on geometry in local coordinates

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
varying float depth;
#endif

void
main ()
{
	gl_PointSize = 1.0;

	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	fogDepth    = x3d_FogDepth;
	color       = x3d_Color;
	texCoord0   = x3d_TextureMatrix [0] * x3d_TexCoord0;
	texCoord1   = x3d_TextureMatrix [1] * x3d_TexCoord1;
	normal      = x3d_NormalMatrix * x3d_Normal;
	vertex      = position .xyz;
	localNormal = x3d_Normal;
	localVertex = x3d_Vertex .xyz;

	gl_Position = x3d_ProjectionMatrix * position;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif
}
