#version 300 es
// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

precision mediump float;
precision mediump int;

uniform x3d_LinePropertiesParameters x3d_LineProperties;

uniform bool  x3d_ColorMaterial;   // true if a X3DColorNode is attached, otherwise false
uniform bool  x3d_Lighting;        // true if a X3DMaterialNode is attached, otherwise false
uniform x3d_MaterialParameters x3d_FrontMaterial;  

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in float x3d_FogDepth;
in vec4  x3d_Color;
in vec4  x3d_Vertex;

out float fogDepth; // fog depth
out vec4  color;    // color
out vec3  vertex;   // point on geometry

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

void
main ()
{
	// If we are points, make the gl_PointSize one pixel larger.
	gl_PointSize = x3d_LineProperties .linewidthScaleFactor + 1.0;

	vec4 position = x3d_ModelViewMatrix * x3d_Vertex;

	fogDepth = x3d_FogDepth;
	vertex   = position .xyz;

	gl_Position = x3d_ProjectionMatrix * position;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	depth = 1.0 + gl_Position .w;
	#endif

	if (x3d_Lighting)
	{
		float alpha = 1.0 - x3d_FrontMaterial .transparency;

		if (x3d_ColorMaterial)
		{
			color .rgb = x3d_Color .rgb;
			color .a   = x3d_Color .a * alpha;
		}
		else
		{
			color .rgb = x3d_FrontMaterial .emissiveColor;
			color .a   = alpha;
		}
	}
	else
	{
		if (x3d_ColorMaterial)
			color = x3d_Color;
		else
			color = vec4 (1.0);
	}
}
