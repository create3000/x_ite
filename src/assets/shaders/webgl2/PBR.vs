#version 300 es

// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

// BEGIN DEFINES
// END DEFINES

precision highp float;
precision highp int;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;
uniform mat3 x3d_NormalMatrix;

in vec4 x3d_Vertex;

#ifdef HAS_NORMALS
	in vec3 x3d_Normal;
#endif

#ifdef HAS_TEXCOORDS
	in vec4 x3d_TexCoord0;
#endif

#ifdef HAS_TANGENTS
	in vec4 tangent;
#endif

out vec3 position;
out vec2 texCoord;

#ifdef HAS_COLORS
	in vec4 x3d_Color;
	out vec4 color;
#endif

#ifdef HAS_NORMALS
	#ifdef HAS_TANGENTS
		out mat3 TBN;
	#else
		out vec3 normal;
	#endif
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

void
main ()
{
	vec4 pos = x3d_ModelViewMatrix * x3d_Vertex;

	position = vec3 (pos .xyz) / pos .w;

	#ifdef HAS_NORMALS
		#ifdef HAS_TANGENTS
			vec3 normalW    = normalize (x3d_NormalMatrix * x3d_Normal);
			vec3 tangentW   = normalize (x3d_NormalMatrix * tangent .xyz);
			vec3 bitangentW = cross (normalW, tangentW) * tangent .w;

			TBN = mat3 (tangentW, bitangentW, normalW);
		#else // HAS_TANGENTS
			normal = normalize (x3d_NormalMatrix * x3d_Normal);
		#endif
	#endif

	#ifdef HAS_TEXCOORDS
		texCoord = vec2 (x3d_TexCoord0 .s, 1.0 - x3d_TexCoord0 .t);
	#else
		texCoord = vec2 (0.0, 0.0);
	#endif

	#ifdef HAS_COLORS
		color = x3d_Color;;
	#endif

	gl_Position = x3d_ProjectionMatrix * pos;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif
}
