import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../../Components/Core/X3DNode.js";
import X3DShapeNode         from "../../Components/Shape/X3DShapeNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import URLs                 from "../Networking/URLs.js";
import GeometryContext      from "../Rendering/GeometryContext.js";
import GeometryType         from "../Shape/GeometryType.js";
import AlphaMode            from "../Shape/AlphaMode.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import RenderPass           from "../../Rendering/RenderPass.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

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

uniform sampler2D      x3d_PositionsTexture;
uniform sampler2D      x3d_OrientationsTexture;
uniform sampler2D      x3d_ScalesTexture;
uniform sampler2D      x3d_OpacitiesTexture;
uniform sampler2DArray x3d_SphericalHarmonicsTexture;

in vec4 x3d_Vertex;
in uint x3d_SplatIndex;

out vec4 color;
out vec2 texCoord;
out vec3 conic;

#if defined (X3D_CLIP_PLANES)
   out vec3 vertex;
#endif

#include <Fog>
#include <Logarithmic>

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

//    float halfTheta = rotation .w / 2.0;
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
   // Fetch SH coefficients early to avoid GPU stall
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
		gl_Position = vec4 (0.0);
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
   float det = (a * c - b * b);

   if (det == 0.0)
   {
      gl_Position = vec4 (0.0);
      return;
   }

   // Calculate the inverse of the covariance matrix.
   conic = vec3 (c, -b, a) / det;

   // pow(e, pow(-3.4, 2) * -0.5) = 1/255, so 3.4 is the standard deviation in terms of the Gaussian falloff that results in a radius of 1 pixel when the variance is 1.
   // sqrt(a) and sqrt(c) are the standard deviations in x and y direction, so multiplying them with 3.4 gives us the radius in pixels where the Gaussian falloff results in 1/255 opacity.
   vec2 quadPixelSize = 3.4 * sqrt (vec2 (a, c)); // screen space half quad height and width
   vec2 quadNdcSize   = quadPixelSize / vec2 (x3d_Viewport .zw) * 2.0; // in ndc space

   clipSplatCenter .xy += x3d_Vertex .xy * quadNdcSize;

   // Discard too large splats that would cover the entire screen
   float minScreen   = float (min (x3d_Viewport .z, x3d_Viewport .w));
   float maxQuadSize = max (quadPixelSize .x, quadPixelSize .y);

   if (maxQuadSize > minScreen)
   {
      gl_Position = vec4 (0.0);
      return;
   }

   texCoord    = x3d_Vertex .xy * quadPixelSize;
   gl_Position = clipSplatCenter;

   #if defined (X3D_CLIP_PLANES)
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

// https://github.com/javagl/JSplat/blob/41706e0a54372a8ae2e4b474d3a39e19337e42c2/jsplat-viewer-lwjgl/src/main/resources/fragmentShaderSource.glsl

const fs = () => /* glsl */ `#version 300 es

precision highp int;
precision highp float;
precision highp sampler2D;

in vec4 color;
in vec2 texCoord;
in vec3 conic;

#if defined (X3D_CLIP_PLANES)
   in vec3 vertex;
#endif

#if !defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
   out vec4 x3d_FragColor;
#endif

#include <ToneMapping>
#include <ClipPlanes>
#include <Fog>
#include <OIT>
#include <Logarithmic>

void
main ()
{
   #if defined (X3D_CLIP_PLANES)
      clip ();
   #endif

   // Equation 4
   float exponent = -0.5 * (conic .x * texCoord .x * texCoord .x + conic .z * texCoord .y * texCoord .y) - conic .y * texCoord .x * texCoord .y;

   if (exponent > 0.0)
      discard;

   float alpha = min (0.99, exp (exponent) * color .a); // opacity modulated by Gaussian falloff

   if (alpha < 1.0 / 255.0)
      discard;

   vec4 finalColor = vec4 (color .rgb, alpha);

   #if defined (X3D_FOG)
      finalColor .rgb = getFogColor (finalColor .rgb);
   #endif

   #if !defined (X3D_LINEAR_OUTPUT)
      finalColor .rgb = toneMap (finalColor .rgb);
   #endif

   #if defined (X3D_ORDER_INDEPENDENT_TRANSPARENCY)
      oit (finalColor);
   #else
      x3d_FragColor = finalColor;
   #endif

   #if defined (X3D_LOGARITHMIC_DEPTH_BUFFER)
      logarithmic ();
   #endif
}
`;

// Register shaders.

import ShaderRegistry from "../Shaders/ShaderRegistry.js";

ShaderRegistry .addVertex   ("GaussianSplats", vs);
ShaderRegistry .addFragment ("GaussianSplats", fs);

// Quad Geometry

// p4 ------ p3
// |       / |
// |     /   |
// |   /     |
// | /       |
// p1 ------ p2

const QuadGeometry = new Float32Array ([
   -1, -1, 0, 1,
    1, -1, 0, 1,
    1,  1, 0, 1,
   -1, -1, 0, 1,
    1,  1, 0, 1,
   -1,  1, 0, 1,
]);

// Special X3DShapeNode for internal use.

function GaussianSplatsShape (executionContext, node)
{
   X3DShapeNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .outputOnly, "rebuild", new Fields .SFTime ());

   // Private Properties

   this .node                   = node;
   this .shaderCache            = this .getBrowser () .getShaders ();
   this .currentModelViewMatrix = new Float32Array (16);
   this .sortModelViewMatrix    = new Float32Array (16);
   this .clipPlanes             = [ ];
}

Object .assign (Object .setPrototypeOf (GaussianSplatsShape .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Quad Geometry

      this .geometryContext = new GeometryContext ();

      this .geometryBuffer    = gl .createBuffer ();
      this .splatsIndexBuffer = gl .createBuffer ();
      this .vertexArrayObject = new VertexArray (gl);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

      // Textures

      this .positionsTexture          = this .createTexture ();
      this .orientationsTexture       = this .createTexture ();
      this .scalesTexture             = this .createTexture ();
      this .sphericalHarmonicsTexture = this .createTexture (gl .TEXTURE_2D_ARRAY);
      this .opacitiesTexture          = this .createTexture ();

      browser .resetTextureUnits ();

      // Fields

      this .node ._colorSpace          .addInterest ("set_key__",      this);
      this .node ._positions           .addInterest ("requestRebuild", this);
      this .node ._orientations        .addInterest ("requestRebuild", this);
      this .node ._scales              .addInterest ("requestRebuild", this);
      this .node ._sphericalHarmonics0 .addInterest ("requestRebuild", this);
      this .node ._sphericalHarmonics1 .addInterest ("requestRebuild", this);
      this .node ._sphericalHarmonics2 .addInterest ("requestRebuild", this);
      this .node ._sphericalHarmonics3 .addInterest ("requestRebuild", this);
      this .node ._opacities           .addInterest ("requestRebuild", this);

      this ._rebuild .addInterest ("rebuild", this);

      this .rebuild ();
   },
   getShapeKey ()
   {
      return 3;
   },
   getGeometryContext ()
   {
      return this .geometryContext;
   },
   getGeometryType ()
   {
      return GeometryType .QUAD;
   },
   getNumInstances ()
   {
      return this .numSplats;
   },
   set_key__ ()
   {
      let key = "GS";

      key += this .node ._sphericalHarmonics1 .length ? 1 : 0;
      key += this .node ._sphericalHarmonics2 .length ? 1 : 0;
      key += this .node ._sphericalHarmonics3 .length ? 1 : 0;

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            key += 1;
            break;
         default: // "SRGB_REC709_DISPLAY"
            key += 0;
            break;
      }

      this .key = key;
   },
   set_bbox__ ()
   {
      if (this .node .isDefaultBBoxSize ())
      {
         const
            positions    = this .node ._positions .getValue (),
            numPositions = this .node ._positions .length * 3,
            min          = new Vector3 (Number .POSITIVE_INFINITY),
            max          = new Vector3 (Number .NEGATIVE_INFINITY),
            point        = new Vector3 ();

         for (let i = 0; i < numPositions; i += 3)
         {
            point .set (positions [i], positions [i + 1], positions [i + 2]);
            min .min (point);
            max .max (point);
         }

         if (numPositions)
            this .bbox .setExtents (min, max);
         else
            this .bbox .set ();
      }
      else
      {
         this .bbox .set (this .node ._bboxSize .getValue (), this .node ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_transparent__ ()
   {
      this .transparent = true;
      this .alphaMode   = AlphaMode .BLEND;
   },
   createTexture (target)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         texture = gl .createTexture ();

      target ??= gl .TEXTURE_2D;

      if (texture instanceof Object) // Needed for x_ite-node.
         texture .textureUnit = browser .popTextureUnit ();

      gl .bindTexture (target, texture);

      gl .texParameteri (target, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      return texture;
   },
   requestRebuild ()
   {
      this ._rebuild = Date .now () / 1000;
   },
   rebuild ()
   {
      const
         browser   = this .getBrowser (),
         gl        = browser .getContext (),
         numSplats = this .node ._positions .length;

      // Indices

      gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (Array (numSplats) .keys ()), gl .DYNAMIC_DRAW);

      // Positions

      const textureWidth = Math .ceil (Math .sqrt (numSplats));

      if (textureWidth)
      {
         const
            textureSize        = textureWidth * textureWidth,
            positions          = new Float32Array (textureSize * 3),
            orientations       = new Float32Array (textureSize * 4),
            scales             = new Float32Array (textureSize * 3),
            opacities          = new Float32Array (textureSize),
            sphericalHarmonics = new Float32Array (textureSize * 16 * 3);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         let offset = 0;

         for (const [degree, dimensions] of [1, 3, 5, 7] .entries ())
         {
            const value = this .node .getField (`sphericalHarmonics${degree}`) .getValue ();

            for (let d = 0; d < dimensions; ++ d)
               sphericalHarmonics .set (value .subarray (numSplats * 3 * d, numSplats * 3 * (d + 1)), textureSize * 3 * (d + offset));

            offset += dimensions;
         }

         gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, positions);

         gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureWidth, textureWidth, 0, gl .RGBA, gl .FLOAT, orientations);

         gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGB32F, textureWidth, textureWidth, 0, gl .RGB, gl .FLOAT, scales);

         gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .R32F, textureWidth, textureWidth, 0, gl .RED, gl .FLOAT, opacities);

         gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);
         gl .texImage3D (gl .TEXTURE_2D_ARRAY, 0, gl .RGB32F, textureWidth, textureWidth, 4, 0, gl .RGB, gl .FLOAT, sphericalHarmonics);
      }

      this .numSplats = numSplats;

      // Sort Worker

      this .initSortWorker ();

      // Finish

      this .set_key__ ();
      this .set_bbox__ ();
      this .set_objects__ ();
   },
   displaySimple ()
   { },
   display (gl, renderContext)
   {
      const
         viewport   = renderContext .viewport,
         shaderNode = this .getShader (renderContext);

      // Set viewport.

      gl .viewport (... viewport);

      // Setup shader.

      shaderNode .enable (gl);

      // Uniforms

      const { renderObject, modelViewMatrix, localObjects } = renderContext;
      const projectionMatrixArray = renderObject .getProjectionMatrixArray ();

      // Set ClipPlane nodes.

      shaderNode .setClipPlanes (gl, localObjects, renderObject);

      // Set matrices.

      gl .uniform4iv (shaderNode .x3d_Viewport, renderObject .getViewportArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the
      // framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         projectionMatrixArray [0] * viewport [2] * 0.5,
         projectionMatrixArray [5] * viewport [3] * 0.5);

      // Set textures.

      gl .activeTexture (gl .TEXTURE0 + this .positionsTexture .textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .positionsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .orientationsTexture .textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .orientationsTexture);

      gl .activeTexture (gl .TEXTURE0 + this .scalesTexture .textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .scalesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .opacitiesTexture .textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .opacitiesTexture);

      gl .activeTexture (gl .TEXTURE0 + this .sphericalHarmonicsTexture .textureUnit);
      gl .bindTexture (gl .TEXTURE_2D_ARRAY, this .sphericalHarmonicsTexture);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .UNSIGNED_INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      // Sort splats.
      this .sortIndices (modelViewMatrix);

      // gl .blendFunc (gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      gl .frontFace (gl .CCW);
      gl .enable (gl .CULL_FACE);

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);

      // gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
   },
   getShader (renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "";

      key += this .key;
      key += renderObject .getRenderKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += localObjectsKeys .join (""); // ClipPlane

      return this .shaderCache .get (key) ?? this .createShader (key, renderContext);
   },
   createShader (key, renderContext)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         options = [ ];

      // Render Object

      if (browser .getRenderingProperty ("XRSession"))
         options .push ("X3D_XR_SESSION");

      switch (this .node ._colorSpace .getValue ())
      {
         case "LIN_REC709_DISPLAY":
            options .push ("X3D_COLORSPACE_LINEAR");
            break;
         default: // "SRGB_REC709_DISPLAY"
            options .push ("X3D_COLORSPACE_SRGB");
            break;
      }

      switch (browser .getBrowserOption ("ToneMapping") .toUpperCase ())
      {
         default: // NONE
            break;
         case "ACES_NARKOWICZ":
         case "ACES_HILL":
         case "ACES_HILL_EXPOSURE_BOOST":
         case "KHR_PBR_NEUTRAL":
            options .push (`X3D_TONEMAP_${browser .getBrowserOption ("ToneMapping") .toUpperCase ()}`);
            break;
      }

      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      if (renderObject .getLogarithmicDepthBuffer ())
         options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

      if (renderObject .getRenderPass () === RenderPass .RENDER_KEY)
      {
         if (renderObject .getOrderIndependentTransparency ())
            options .push ("X3D_ORDER_INDEPENDENT_TRANSPARENCY");
      }

      // Clip Planes

      const numClipPlanes = localObjectsKeys .reduce ((a, k) => a + (k === 0), 0);

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES")
         options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
      }

      // Fog

      switch (fogNode ?.getFogType ())
      {
         case 1:
            options .push ("X3D_FOG", "X3D_FOG_LINEAR");
            break;
         case 2:
            options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
            break;
      }

      // Spherical Harmonics

      if (this .node ._sphericalHarmonics1 .length)
         options .push ("X3D_GAUSSIAN_SPLATTING_DEGREE_1");

      if (this .node ._sphericalHarmonics2 .length)
         options .push ("X3D_GAUSSIAN_SPLATTING_DEGREE_2");

      if (this .node ._sphericalHarmonics3 .length)
         options .push ("X3D_GAUSSIAN_SPLATTING_DEGREE_3");

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplats",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options,
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_SphericalHarmonicsTexture",
            "x3d_FocalLength",
         ],
      });

      this .shaderCache .set (key, shaderNode);

      // Static Uniforms

      shaderNode .enable (gl);

      gl .uniform1i (shaderNode .x3d_PositionsTexture,          this .positionsTexture          .textureUnit);
      gl .uniform1i (shaderNode .x3d_OrientationsTexture,       this .orientationsTexture       .textureUnit);
      gl .uniform1i (shaderNode .x3d_ScalesTexture,             this .scalesTexture             .textureUnit);
      gl .uniform1i (shaderNode .x3d_OpacitiesTexture,          this .opacitiesTexture          .textureUnit);
      gl .uniform1i (shaderNode .x3d_SphericalHarmonicsTexture, this .sphericalHarmonicsTexture .textureUnit);

      return shaderNode;
   },
   initSortWorker ()
   {
      if (!this .getBrowser () .getBrowserOption ("LoadUrlObjects"))
         return;

      // Terminate existing worker.

      this .sortWorker ?.terminate ();

      // Load worker.

      const
         content = `import "${URLs .getLibraryURL ("mkkellogg-sort.worker.js")}";`,
         url     = URL .createObjectURL (new Blob ([content], { type: "text/javascript" }));

      this .sortWorker = new Worker (url, { type: "module" });

      URL .revokeObjectURL (url);

      // Connect events.

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .sortWorker .onmessage = event =>
      {
         // console .log (event .data .type);

         switch (event .data .type)
         {
            case "ready":
            {
               this .sortPending = false;

               this .sortModelViewMatrix .fill (0);
               browser .addBrowserEvent ();
               break;
            }
            case "sorted":
            {
               this .sortPending = false;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .splatsIndexBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, event .data .indices, gl .DYNAMIC_DRAW);

               browser .addBrowserEvent ();
               break;
            }
            case "error":
            {
               console .error ("Sort worker error:", event .data .message);

               this .sortPending = false;
               break;
            }
         }
      };

      this .sortWorker .onerror = error =>
      {
         console .error (error);

         this .sortPending = false;
      };

      // Transfer positions buffer to the worker.

      this .sortWorker .postMessage ({
         type: "init",
         positions: this .node ._positions .getValue () .subarray (0, this .numSplats * 3),
         splatCount: this .numSplats,
      });

      this .sortPending = true;
   },
   sortIndices (viewMatrix)
   {
      this .currentModelViewMatrix .set (viewMatrix);

      if (this .sortPending)
         return;

      if (Matrix4 .prototype .equals .call (this .currentModelViewMatrix, this .sortModelViewMatrix))
         return;

      this .sortModelViewMatrix .set (viewMatrix);

      this .sortWorker ?.postMessage ({
         type: "sort",
         viewMatrix: this .sortModelViewMatrix,
      });
   },
});

Object .defineProperties (GaussianSplatsShape,
{
   ... X3DNode .getStaticProperties ("GaussianSplatsShape", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplatsShape;
