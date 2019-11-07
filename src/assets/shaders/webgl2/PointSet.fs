#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform int x3d_GeometryType;
uniform x3d_PointPropertiesParameters x3d_PointProperties;

in float pointSize; // point size
in float fogDepth;  // fog depth
in vec4  color;     // color
in vec3  vertex;    // point on geometry

// Text coords, later initialized.
vec4 texCoord0 = vec4 (0.0);
vec4 texCoord1 = vec4 (0.0);

// Dummy variables for texture coordinate generator, which is not available.
vec3 normal      = vec3 (0.0);
vec3 localNormal = vec3 (0.0);
vec3 localVertex = vec3 (0.0);

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

out vec4 x3d_FragColor;

#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"
#pragma X3D include "include/Texture.glsl"

vec4
getPointColor ()
{
	vec4 finalColor = color;

	if (x3d_NumTextures > 0)
	{
		vec4 texCoord  = vec4 (gl_PointCoord .x, 1.0 - gl_PointCoord .y, 0.0, 1.0);

		texCoord0 = texCoord;
		texCoord1 = texCoord;

		vec4 textureColor = getTextureColor (vec4 (1.0), vec4 (1.0));

		switch (x3d_PointProperties .colorMode)
		{
			case 0:
				finalColor .a *= textureColor .a;
				break;
			case 1:
				finalColor = textureColor;
				break;
			case 2:
				finalColor .rgb += textureColor .rgb;
				finalColor .a   *= textureColor .a;
				break;
		}
	}
	else
	{
		float ps = (pointSize + 1.0) / 2.0;
		float t  = distance (vec2 (0.5, 0.5), gl_PointCoord) * 2.0 * ps - ps + 1.0;

		finalColor .a = mix (finalColor .a, 0.0, clamp (t, 0.0, 1.0));
	}

	return finalColor;
}

void
main ()
{
	clip ();

	vec4 finalColor = getPointColor ();

	finalColor .rgb = getFogColor (finalColor .rgb);

	x3d_FragColor = finalColor;

	// Logarithmic Depth Buffer

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
