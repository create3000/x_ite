
#pragma X3D include "Pack.glsl"

#ifdef X3D_SHADOWS

uniform sampler2D x3d_ShadowMap [x3d_MaxLights];

float
getShadowDepth (const in int index, const in vec2 shadowCoord)
{
	switch (index)
	{
		#if x3d_MaxLights > 0
		case 0:
		{
			return unpack (texture (x3d_ShadowMap [0], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 1
		case 1:
		{
			return unpack (texture (x3d_ShadowMap [1], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 2
		case 2:
		{
			return unpack (texture (x3d_ShadowMap [2], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 3
		case 3:
		{
			return unpack (texture (x3d_ShadowMap [3], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 4
		case 4:
		{
			return unpack (texture (x3d_ShadowMap [4], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 5
		case 5:
		{
			return unpack (texture (x3d_ShadowMap [5], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 6
		case 6:
		{
			return unpack (texture (x3d_ShadowMap [6], shadowCoord));
		}
		#endif
		#if x3d_MaxLights > 7
		case 7:
		{
			return unpack (texture (x3d_ShadowMap [7], shadowCoord));
		}
		#endif
		default:
		{
			return 0.0;
		}
	}
}

float
texture2DCompare (const in int index, const in vec2 texCoord, const in float compare)
{
	return step (getShadowDepth (index, texCoord), compare);
}

float
texture2DShadowLerp (const in int index, const in vec2 texelSize, const in float shadowMapSize, const in vec2 texCoord, const in float compare)
{
	const vec2 offset = vec2 (0.0, 1.0);

	vec2 centroidTexCoord = floor (texCoord * shadowMapSize + 0.5) / shadowMapSize;

	float lb = texture2DCompare (index, centroidTexCoord + texelSize * offset .xx, compare);
	float lt = texture2DCompare (index, centroidTexCoord + texelSize * offset .xy, compare);
	float rb = texture2DCompare (index, centroidTexCoord + texelSize * offset .yx, compare);
	float rt = texture2DCompare (index, centroidTexCoord + texelSize * offset .yy, compare);

	vec2 f = fract (texCoord * shadowMapSize + 0.5);

	float a = mix (lb, lt, f.y);
	float b = mix (rb, rt, f.y);
	float c = mix (a, b, f.x);

	return c;
}

//https://gist.github.com/tschw/da10c43c467ce8afd0c4
vec2
cubeToUVCompact (in vec3 v, const float texelSizeY)
{
	// Compact layout:
	//
	// xzXZ		Char: Axis
	// yyYY		Case: Sign

	// Number of texels to avoid at the edge of each square

	vec3 absV = abs (v);

	// Intersect unit cube

	float scaleToCube = 1.0 / max (absV .x, max (absV .y, absV .z));

	absV *= scaleToCube;

	// Apply scale to avoid seams

	// one texel less per square (half a texel on each side)
	v *= scaleToCube * (1.0 - 2.0 * texelSizeY);

	// Unwrap

	// space: -1 ... 1 range for each square
	//
	// #X##		dim    := ( 4 , 2 )
	//  # #		center := ( 1 , 1 )

	vec2 planar = v .xy;

	float almostATexel = 1.5 * texelSizeY;
	float almostOne    = 1.0 - almostATexel;

	if (absV .z >= almostOne)
	{
		// zZ

		if (v .z > 0.0)
			planar .x = 4.0 - v .x;
	}
	else if (absV .x >= almostOne)
	{
		// xX

		float signX = sign (v .x);

		planar .x = v .z * signX + 2.0 * signX;
	}
	else if (absV .y >= almostOne)
	{
		// yY

		float signY = sign (v .y);

		planar .x = (v .x + 0.5 + signY) * 2.0;
		planar .y = v .z * signY - 2.0;
	}

	// Transform to UV space

	// scale := 0.5 / dim
	// translate := ( center + 0.5 ) / dim
	return vec2 (0.125, 0.25) * planar + vec2 (0.375, 0.75);
}

mat4
getPointLightRotations (const in vec3 vector)
{
	mat4 rotations [6];
	rotations [0] = mat4 ( 0, 0 , 1, 0,   0, 1,  0, 0,  -1,  0,  0, 0,   0, 0, 0, 1);  // left
	rotations [1] = mat4 ( 0, 0, -1, 0,   0, 1,  0, 0,   1,  0,  0, 0,   0, 0, 0, 1);  // right
	rotations [2] = mat4 (-1, 0,  0, 0,   0, 1,  0, 0,   0,  0, -1, 0,   0, 0, 0, 1);  // front
	rotations [3] = mat4 ( 1, 0,  0, 0,   0, 1,  0, 0,   0,  0,  1, 0,   0, 0, 0, 1);  // back
	rotations [4] = mat4 ( 1, 0,  0, 0,   0, 0,  1, 0,   0, -1,  0, 0,   0, 0, 0, 1);  // bottom
	rotations [5] = mat4 ( 1, 0,  0, 0,   0, 0, -1, 0,   0,  1,  0, 0,   0, 0, 0, 1);  // top

	vec3 a = abs (vector .xyz);

	if (a .x > a .y)
	{
		if (a .x > a .z)
			return vector .x > 0.0 ? rotations [1] : rotations [0];
		else
			return vector .z > 0.0 ? rotations [2] : rotations [3];
	}
	else
	{
		if (a .y > a .z)
			return vector .y > 0.0 ? rotations [5] : rotations [4];
		else
			return vector .z > 0.0 ? rotations [2] : rotations [3];
	}

	return rotations [3];
}

// DEBUG
//vec4 tex;

float
getShadowIntensity (const in int index, const in x3d_LightSourceParameters light)
{
	if (light .type == x3d_PointLight)
	{
		const mat4 biasMatrix = mat4 (0.5, 0.0, 0.0, 0.0,
			                           0.0, 0.5, 0.0, 0.0,
			                           0.0, 0.0, 0.5, 0.0,
			                           0.5, 0.5, 0.5, 1.0);

		const mat4 projectionMatrix = mat4 (1.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.000025000312504, -1.0, 0, 0.0, -0.25000312503906297, 0.0);

		vec2 texelSize = vec2 (1.0) / (float (light .shadowMapSize) * vec2 (4.0, 2.0));

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec4 shadowCoord     = light .shadowMatrix * vec4 (vertex, 1.0);
		vec3 lightToPosition = shadowCoord .xyz;

		shadowCoord       = biasMatrix * (projectionMatrix * (getPointLightRotations (lightToPosition) * shadowCoord));
		shadowCoord .z   -= light .shadowBias;
		shadowCoord .xyz /= shadowCoord .w;

		// DEBUG
		//tex = texture2D (x3d_ShadowMap [0], cubeToUVCompact (lightToPosition, texelSize .y));

		#if defined (X3D_PCF_FILTERING) || defined (X3D_PCF_SOFT_FILTERING)

			vec2 offset = vec2 (-1, 1) * (texelSize .y * 42.0);

			float value = (
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xyy, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yyy, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xyx, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yyx, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xxy, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yxy, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .xxx, texelSize .y), shadowCoord .z) +
				texture2DCompare (index, cubeToUVCompact (lightToPosition + offset .yxx, texelSize .y), shadowCoord .z)
			) * (1.0 / 9.0);

			return light .shadowIntensity * value;

		#else // no percentage-closer filtering

			float value = texture2DCompare (index, cubeToUVCompact (lightToPosition, texelSize .y), shadowCoord .z);

			return light .shadowIntensity * value;

		#endif
	}
	else
	{
		#if defined (X3D_PCF_FILTERING)

			vec2 texelSize   = vec2 (1.0) / vec2 (light .shadowMapSize);
			vec4 shadowCoord = light .shadowMatrix * vec4 (vertex, 1.0);

			shadowCoord .z   -= light .shadowBias;
			shadowCoord .xyz /= shadowCoord .w;

			float dx0 = - texelSize .x;
			float dy0 = - texelSize .y;
			float dx1 = + texelSize .x;
			float dy1 = + texelSize .y;

			float value = (
				texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy0), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy0), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy0), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (dx0, 0.0), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy, shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (dx1, 0.0), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy1), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy1), shadowCoord .z) +
				texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy1), shadowCoord .z)
			) * (1.0 / 9.0);

			return light .shadowIntensity * value;

		#elif defined (X3D_PCF_SOFT_FILTERING)

			vec2 texelSize   = vec2 (1.0) / vec2 (light .shadowMapSize);
			vec4 shadowCoord = light .shadowMatrix * vec4 (vertex, 1.0);

			shadowCoord .z   -= light .shadowBias;
			shadowCoord .xyz /= shadowCoord .w;

			float dx0 = - texelSize.x;
			float dy0 = - texelSize.y;
			float dx1 = + texelSize.x;
			float dy1 = + texelSize.y;

			float value = (
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, dy0), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (0.0, dy0), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, dy0), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, 0.0), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy, shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, 0.0), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx0, dy1), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (0.0, dy1), shadowCoord .z) +
				texture2DShadowLerp (index, texelSize, float (shadowMapSize), shadowCoord .xy + vec2 (dx1, dy1), shadowCoord .z)
			) * ( 1.0 / 9.0 );

			return light .shadowIntensity * value;

		#else // no percentage-closer filtering

			vec4 shadowCoord = shadowMatrix * vec4 (vertex, 1.0);

			shadowCoord .z   -= shadowBias;
			shadowCoord .xyz /= shadowCoord .w;

			float value = texture2DCompare (index, shadowCoord .xy, shadowCoord .z);

			return light .shadowIntensity * value;

		#endif
	}

	return 0.0;
}

#endif
