
// https://github.com/graphdeco-inria/diff-gaussian-rasterization/blob/59f5f77e3ddbac3ed9db93ec2cfe99ed6c5d121d/cuda_rasterizer/forward.cu
// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/vertexShaderSource.glsl

const vs = () => /* glsl */ `#version 300 es

precision highp int;
precision highp float;
precision highp sampler2D;
precision highp sampler2DArray;

uniform ivec4 x3d_Viewport;
uniform mat4  x3d_ProjectionMatrix;
uniform mat4  x3d_ModelViewMatrix;

#if defined (X3D_XR_SESSION)
   uniform mat4 x3d_EyeMatrix;
#endif

uniform vec2 x3d_FocalLength;

uniform sampler2D x3d_PositionsTexture;
uniform sampler2D x3d_OrientationsTexture;
uniform sampler2D x3d_ScalesTexture;

uniform mediump sampler2D      x3d_OpacitiesTexture;
uniform mediump sampler2DArray x3d_SphericalHarmonicsTexture;

in vec4 x3d_Vertex;
in uint x3d_SplatIndex;

out vec4 color;
out vec2 texCoord;
out vec3 conic;

#if defined (X3D_CLIP_PLANES) || defined (X3D_FOG)
   out vec3 vertex;
#endif

#include <Fog>
#include <Logarithmic>

// Gaussian radius multiplier: how many standard deviations to extend the screen-space quad.
// exp(-0.5 * SPLAT_SIGMA²) gives the minimum opacity at the quad boundary.
// 3.33 → 1/255 (mathematically exact),  3.0 → 1/90  (23% smaller quads, ~40% fewer fragments).
const float SPLAT_SIGMA = 3.0;

const float SH_C0 = 0.28209479177387814;

#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
   const float SH_C1_0 = -0.4886025119029199;
   const float SH_C1_1 = 0.4886025119029199;
   const float SH_C1_2 = -0.4886025119029199;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
   const float SH_C2_0 = 1.0925484305920792;
   const float SH_C2_1 = -1.0925484305920792;
   const float SH_C2_2 = 0.31539156525252005;
   const float SH_C2_3 = -1.0925484305920792;
   const float SH_C2_4 = 0.5462742152960396;
#ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
   const float SH_C3_0 = -0.5900435899266435;
   const float SH_C3_1 = 2.890611442640554;
   const float SH_C3_2 = -0.4570457994644658;
   const float SH_C3_3 = 0.3731763325901154;
   const float SH_C3_4 = -0.4570457994644658;
   const float SH_C3_5 = 1.445305721320277;
   const float SH_C3_6 = -0.5900435899266435;
#endif
#endif
#endif

// vec4
// quat (const in vec4 rotation)
// {
//    float scale = length (rotation .xyz);

//    if (scale == 0.0)
//       return vec4 (0.0, 0.0, 0.0, 1.0);

//    // Determine quaternion.

//    float halfTheta = rotation .w * 0.5;
//    float aScale    = sin (halfTheta) / scale;

//    return vec4 (rotation .xyz * aScale, cos (halfTheta));
// }

mat3
computeCov3D (const in vec4 rotation, const in vec3 scale)
{
   // We have to take the inverse of the quaternion, because
   // the implementation of quat to mat3 differs from ours.
   float qx =  rotation .x;
   float qy =  rotation .y;
   float qz =  rotation .z;
   float qw = -rotation .w;

   float yy = qy * qy;
   float zz = qz * qz;
   float xy = qx * qy;
   float zw = qz * qw;
   float xz = qx * qz;
   float yw = qy * qw;
   float xx = qx * qx;
   float yz = qy * qz;
   float xw = qx * qw;

   mat3 R = mat3 (
      1.0 - 2.0 * (yy + zz),
      2.0 * (xy + zw),
      2.0 * (xz - yw),

      2.0 * (xy - zw),
      1.0 - 2.0 * (zz + xx),
      2.0 * (yz + xw),

      2.0 * (xz + yw),
      2.0 * (yz - xw),
      1.0 - 2.0 * (yy + xx)
   );

   mat3 S = mat3 (scale .x, 0.0, 0.0, 0.0, scale .y, 0.0, 0.0, 0.0, scale .z);

   mat3 M     = S * R;
   mat3 Sigma = transpose (M) * M;

   // Covariance is symmetric.
   return Sigma;
}

vec3
computeCov2D (const in vec3 viewSplatCenter, const in mat3 cov3D)
{
   float x = viewSplatCenter .x;
   float y = viewSplatCenter .y;
   float z = viewSplatCenter .z;

   float zz = z * z;

   mat3 J = mat3 (
      x3d_FocalLength .x / z,
      0.0,
      -(x3d_FocalLength .x * x) / zz,

      0.0,
      x3d_FocalLength .y / z,
      -(x3d_FocalLength .y * y) / zz,

      0.0,
      0.0,
      0.0
   );

   mat3 W = transpose (mat3 (x3d_ModelViewMatrix));
   mat3 T = W * J;

   // Covariance is symmetric, so transpose would have no effect.
   mat3 cov = transpose (T) * cov3D * T;

   // Apply low-pass filter: every Gaussian should be at least
   // one pixel wide/high. Discard 3rd row and column.
   cov [0] [0] += 0.3;
   cov [1] [1] += 0.3;

   return vec3 (cov [0] [0], cov [0] [1], cov [1] [1]);
}

vec3
computeColorFromSH (const in ivec2 texelCoord, const in vec3 splatCenter)
{
   // Degree 0
   vec3 sh0 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 0), 0) .rgb;

   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
      // Degree 1
      vec3 sh1_0 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 1), 0) .rgb;
      vec3 sh1_1 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 2), 0) .rgb;
      vec3 sh1_2 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 3), 0) .rgb;
   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
      // Degree 2
      vec3 sh2_0 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 4), 0) .rgb;
      vec3 sh2_1 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 5), 0) .rgb;
      vec3 sh2_2 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 6), 0) .rgb;
      vec3 sh2_3 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 7), 0) .rgb;
      vec3 sh2_4 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 8), 0) .rgb;
   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
      // Degree 3
      vec3 sh3_0 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord,  9), 0) .rgb;
      vec3 sh3_1 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 10), 0) .rgb;
      vec3 sh3_2 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 11), 0) .rgb;
      vec3 sh3_3 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 12), 0) .rgb;
      vec3 sh3_4 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 13), 0) .rgb;
      vec3 sh3_5 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 14), 0) .rgb;
      vec3 sh3_6 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord, 15), 0) .rgb;
   #endif
   #endif
   #endif

   vec3 color = sh0 * SH_C0;

   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_1
      vec3 x3d_Camera = inverse (x3d_ModelViewMatrix) [3] .xyz;
      vec3 viewDir    = normalize (splatCenter - x3d_Camera); // local-frame direction

      float x = viewDir .x;
      float y = viewDir .y;
      float z = viewDir .z;

      color += SH_C1_1 * (-y * sh1_0 + z * sh1_1 - x * sh1_2);

   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_2
      float xx = x * x;
      float yy = y * y;
      float zz = z * z;
      float xy = x * y;
      float yz = y * z;
      float xz = x * z;

      color += SH_C2_0 * xy * sh2_0 +
               SH_C2_1 * yz * sh2_1 +
               SH_C2_2 * (2.0 * zz - xx - yy) * sh2_2 +
               SH_C2_3 * xz * sh2_3 +
               SH_C2_4 * (xx - yy) * sh2_4;

   #ifdef X3D_GAUSSIAN_SPLATTING_DEGREE_3
      color += SH_C3_0 * y * (3.0 * xx - yy) * sh3_0 +
               SH_C3_1 * xy * z * sh3_1 +
               SH_C3_2 * y * (4.0 * zz - xx - yy) * sh3_2 +
               SH_C3_3 * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * sh3_3 +
               SH_C3_4 * x * (4.0 * zz - xx - yy) * sh3_4 +
               SH_C3_5 * z * (xx - yy) * sh3_5 +
               SH_C3_6 * x * (xx - 3.0 * yy) * sh3_6;
   #endif
   #endif
   #endif

   color += 0.5;

   return color;
}

void
main ()
{
   // Texel Coord

   uint  textureWidth = uint (textureSize (x3d_PositionsTexture, 0) .x);
   ivec2 texelCoord   = ivec2 (x3d_SplatIndex % textureWidth, x3d_SplatIndex / textureWidth);

   // Position

   vec3 splatCenter     = texelFetch (x3d_PositionsTexture, texelCoord, 0) .xyz;
   vec4 viewSplatCenter = x3d_ModelViewMatrix * vec4 (splatCenter, 1.0); // g_pos_view

   #if defined (X3D_XR_SESSION)
      viewSplatCenter = x3d_EyeMatrix * viewSplatCenter;
   #endif

   vec4 clipSplatCenter = x3d_ProjectionMatrix * viewSplatCenter; // g_pos_screen

   clipSplatCenter /= clipSplatCenter .w; // perspective division

   // Early Culling
	if (any (greaterThan (abs (clipSplatCenter .xyz), vec3 (1.3))))
	{
		gl_Position = vec4 (0.0, 0.0, 2.0, 1.0);
		return;
	}

   vec4  splatOrientation = texelFetch (x3d_OrientationsTexture, texelCoord, 0);
   vec3  splatScale       = texelFetch (x3d_ScalesTexture, texelCoord, 0) .xyz;
   float opacity          = texelFetch (x3d_OpacitiesTexture, texelCoord, 0) .r;

   // Orientation Quaternion must be normalized.
   mat3 cov3d = computeCov3D (normalize (splatOrientation), splatScale);
   vec3 cov2d = computeCov2D (viewSplatCenter .xyz / viewSplatCenter .w, cov3d);

   float a = cov2d .x; // Variance x
   float b = cov2d .y; // Covariance xy
   float c = cov2d .z; // Variance y

   // Invert covariance (EWA algorithm)
   float det = a * c - b * b;

   if (det == 0.0)
   {
      gl_Position = vec4 (0.0, 0.0, 2.0, 1.0);
      return;
   }

   // Calculate the inverse of the covariance matrix.
   conic = vec3 (c, -b, a) / det;

   // pow(e, pow(-SPLAT_SIGMA, 2) * -0.5) gives the boundary opacity.
   // sqrt(a) and sqrt(c) are the standard deviations in x and y, so multiplying
   // by SPLAT_SIGMA gives the quad half-size in pixels at that opacity threshold.
   vec2 quadPixelSize = SPLAT_SIGMA * sqrt (vec2 (a, c)); // screen space half quad height and width
   vec2 quadNdcSize   = quadPixelSize / vec2 (x3d_Viewport .zw) * 2.0; // in ndc space

   clipSplatCenter .xy += x3d_Vertex .xy * quadNdcSize;

   // Discard splats whose projected size exceeds half the screen —
   // they are almost certainly behind or very close to the camera and
   // would cause extreme overdraw with negligible visual contribution.
   float minScreen   = float (min (x3d_Viewport .z, x3d_Viewport .w));
   float maxQuadSize = max (quadPixelSize .x, quadPixelSize .y);

   if (maxQuadSize > minScreen)
   {
      gl_Position = vec4 (0.0, 0.0, 2.0, 1.0);
      return;
   }

   texCoord    = x3d_Vertex .xy * quadPixelSize;
   gl_Position = clipSplatCenter;

   #if defined (X3D_CLIP_PLANES) || defined (X3D_FOG)
      vec4 invClipSplatCenter = inverse (x3d_ProjectionMatrix) * clipSplatCenter;

      vertex = invClipSplatCenter .xyz / invClipSplatCenter .w;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      logarithmic (gl_Position);
   #endif

   // Color

   color = vec4 (computeColorFromSH (texelCoord, splatCenter), opacity);

   #if defined (X3D_FOG) && defined (X3D_FOG_COORDS)
      fog ();
   #endif
}
`;

export default vs;
