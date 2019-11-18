#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform int  x3d_GeometryType;
uniform bool x3d_Lighting;      // true if a X3DMaterialNode is attached, otherwise false
uniform bool x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false

in float fogDepth;    // fog depth
in vec4  frontColor;  // color
in vec4  backColor;   // color
in vec3  normal;      // normal vector at this point on geometry
in vec3  vertex;      // point on geometry
in vec3  localNormal; // normal vector at this point on geometry in local coordinates
in vec3  localVertex; // point on geometry in local coordinates

#if x3d_MaxTextures > 0
in vec4 texCoord0;
#endif

#if x3d_MaxTextures > 1
in vec4 texCoord1;
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

void
main ()
{
 	clip ();

	vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

	if (x3d_NumTextures > 0)
	{
		if (x3d_Lighting)
		{
			finalColor = getTextureColor (finalColor, vec4 (1.0));
		}
		else
		{
			if (x3d_ColorMaterial)
			{
				finalColor = getTextureColor (finalColor, vec4 (1.0));
			}
			else
			{
				finalColor = getTextureColor (vec4 (1.0), vec4 (1.0));
			}
		}
	}

	finalColor      = getProjectiveTextureColor (finalColor);
	finalColor      = getHatchColor (finalColor);
	finalColor .rgb = getFogColor (finalColor .rgb);
	x3d_FragColor   = finalColor;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
