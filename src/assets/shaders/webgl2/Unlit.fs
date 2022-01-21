#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform int   x3d_GeometryType;
uniform bool  x3d_ColorMaterial; // true if a X3DColorNode is attached, otherwise false
uniform float x3d_AlphaCutoff;

uniform int x3d_NumLights;
uniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];
uniform bool x3d_SeparateBackColor;
uniform x3d_MaterialParameters x3d_FrontMaterial;
uniform x3d_MaterialParameters x3d_BackMaterial;

in float fogDepth;    // fog depth
in vec4  color;       // color
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

#pragma X3D include "include/Shadow.glsl"
#pragma X3D include "include/Texture.glsl"
#pragma X3D include "include/Hatch.glsl"
#pragma X3D include "include/Fog.glsl"
#pragma X3D include "include/ClipPlanes.glsl"

float
getSpotFactor (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)
{
	float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));

	if (spotAngle >= cutOffAngle)
		return 0.0;
	else if (spotAngle <= beamWidth)
		return 1.0;

	return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);
}

x3d_MaterialParameters
getMaterial ()
{
	bool frontColor = gl_FrontFacing || x3d_SeparateBackColor == false;

	if (frontColor)
		return x3d_FrontMaterial;

	return x3d_BackMaterial;
}

vec4
getMaterialColor ()
{
	x3d_MaterialParameters material = getMaterial ();

	return getTextureColor (x3d_ColorMaterial ? color : vec4 (material .emissiveColor, 1.0 - material .transparency), vec4 (1.0));
}

// DEBUG
//uniform ivec4 x3d_Viewport;

void
main ()
{
	clip ();

	vec4 finalColor = vec4 (0.0);

	finalColor      = getMaterialColor ();
	finalColor      = getHatchColor (finalColor);
	finalColor .rgb = getFogColor (finalColor .rgb);

   if (finalColor .a < x3d_AlphaCutoff)
   {
      discard;
   }

	x3d_FragColor = finalColor;

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif

	// DEBUG
	#ifdef X3D_SHADOWS
	//x3d_FragColor .rgb = texture2D (x3d_ShadowMap [0], gl_FragCoord .xy / vec2 (x3d_Viewport .zw)) .rgb;
	//x3d_FragColor .rgb = mix (tex .rgb, x3d_FragColor .rgb, 0.5);
	#endif

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//x3d_FragColor .rgb = mix (vec3 (1.0, 0.0, 0.0), x3d_FragColor .rgb, 0.5);
	#endif
}
