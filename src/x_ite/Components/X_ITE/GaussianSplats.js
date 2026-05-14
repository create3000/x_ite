import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DShapeNode         from "../Shape/X3DShapeNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import GeometryContext      from "../../Browser/Rendering/GeometryContext.js";
import GeometryType         from "../../Browser/Shape/GeometryType.js";
import AlphaMode            from "../../Browser/Shape/AlphaMode.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

// https://developer.playcanvas.com/user-manual/gaussian-splatting/formats/ply/

const vs = () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DArray;

uniform ivec4 x3d_Viewport;
uniform mat4  x3d_ProjectionMatrix;
uniform mat4  x3d_CameraSpaceMatrix;
uniform mat4  x3d_ViewMatrix;
uniform mat4  x3d_ModelViewMatrix;

#if defined (X3D_XR_SESSION)
   uniform mat4 x3d_EyeMatrix;
#endif

in vec4 x3d_Vertex;
in int  x3d_SplatIndex;

out vec4 color;
out vec2 texCoord;
out vec3 conic;

uniform sampler2D      x3d_PositionsTexture;
uniform sampler2D      x3d_OrientationsTexture;
uniform sampler2D      x3d_ScalesTexture;
uniform sampler2D      x3d_OpacitiesTexture;
uniform sampler2DArray x3d_SphericalHarmonicsTexture;

vec4
quat (const in vec4 r)
{
   float scale = length (vec3 (r .x, r .y, r .z));

   if (scale == 0.0)
      return vec4 (0.0, 0.0, 0.0, 1.0);

   // Determine quaternion.

   float halfTheta = r .w / 2.0;
   float aScale    = sin (halfTheta) / scale;

   return vec4 (r .x * aScale,
                r .y * aScale,
                r .z * aScale,
                cos (halfTheta));
}

mat3
computeC (const in vec4 rotation, const in vec3 scale)
{
   vec4 q = quat (rotation);

   float qx = q .x;
   float qy = q .y;
   float qz = q .z;
   float qw = q .w;
   float sx = scale .x;
   float sy = scale .y;
   float sz = scale .z;

   mat3 C = mat3 (
      sx * (1.0 - 2.0 * (qy * qy + qz * qz)),  sx * (2.0 * (qx * qy + qw * qz)),        sx * (2.0 * (qx * qz - qw * qy)),
      sy * (2.0 * (qx * qy - qw * qz)),        sy * (1.0 - 2.0 * (qx * qx + qz * qz)),  sy * (2.0 * (qy * qz + qw * qx)),
      sz * (2.0 * (qx * qz + qw * qy)),        sz * (2.0 * (qy * qz - qw * qx)),        sz * (1.0 - 2.0 *(qx * qx + qy * qy))
   );

   return C;
}

uniform vec2 x3d_FocalLength;

vec3
computeCameraCovariance (const in mat3 worldCovariance, const in vec3 viewSplatCenter)
{
   float x = viewSplatCenter .x;
   float y = viewSplatCenter .y;
   float z = viewSplatCenter .z;

   mat3 J = mat3 (
      x3d_FocalLength .x / z, 0.0, -(x3d_FocalLength .x * x) / (z * z),
      0.0, x3d_FocalLength .y / z, -(x3d_FocalLength .y * y) / (z * z),
      0.0, 0.0, 0.0
   );

   mat3 W = transpose (mat3 (x3d_ViewMatrix));

   // Equation 5
   mat3 T = W * J;

   mat3 cov = transpose (T) * transpose (worldCovariance) * T;

   // Low-pass filter (EWA Splatting)
   cov [0] [0] += 0.3;
   cov [1] [1] += 0.3;

   return vec3 (cov [0] [0], cov [0] [1], cov [1] [1]);
}

vec3
calculateSphericalHarmonics (const in ivec2 texelCoord)
{
   ivec3 coord = ivec3 (texelCoord, 0);

   // Degree 0
   vec3 sh0    = texelFetch (x3d_SphericalHarmonicsTexture, coord, 0) .rgb;
   vec3 result = sh0 * 0.2820947917738781; // 0.28... = 1 / (2 * sqrt (PI))

   //TODO

   result += 0.5;

   return result;
}

void
main ()
{
   // Texel Coord

   int   textureWidth = textureSize (x3d_PositionsTexture, 0) .x;
   ivec2 texelCoord   = ivec2 (x3d_SplatIndex % textureWidth, x3d_SplatIndex / textureWidth);

   // Position

   mat4 x3d_ModelMatrix  = x3d_CameraSpaceMatrix * x3d_ModelViewMatrix;
   vec3 splatCenter      = texelFetch (x3d_PositionsTexture, texelCoord, 0) .xyz;
   vec4 splatOrientation = texelFetch (x3d_OrientationsTexture, texelCoord, 0);
   vec3 splatScale       = texelFetch (x3d_ScalesTexture, texelCoord, 0) .xyz;

   splatCenter = (x3d_ModelMatrix * vec4 (splatCenter, 1.0)) .xyz;

   vec4 viewSplatCenter = x3d_ViewMatrix * vec4 (splatCenter, 1.0);

   #if defined (X3D_XR_SESSION)
      viewSplatCenter = x3d_EyeMatrix * viewSplatCenter;
   #endif

   vec4 clipSplatCenter = x3d_ProjectionMatrix * viewSplatCenter;

   clipSplatCenter /= clipSplatCenter .w; // perspective division

   mat3 C = computeC (splatOrientation, splatScale);
   mat3 M = mat3 (x3d_ModelMatrix);

   mat3 worldCovariance  = M * C * transpose (C) * transpose (M);
   vec3 cameraCovariance = computeCameraCovariance (worldCovariance, viewSplatCenter .xyz);

   float a = cameraCovariance .x; // Variance x
   float b = cameraCovariance .y; // Covariance xy
   float c = cameraCovariance .z; // Variance y

   float det = (a * c - b * b);

   if (det == 0.0)
   {
      gl_Position = vec4 (0.0);
      return;
   }

   float detInv = 1.0 / det;

   // Calculate the inverse of the covariance matrix
   conic = vec3 (c * detInv, -b * detInv, a * detInv);

   // pow(e, pow(-3.4, 2) * -0.5) = 1/255, so 3.4 is the standard deviation in terms of the Gaussian falloff that results in a radius of 1 pixel when the variance is 1.
   // sqrt(a) and sqrt(c) are the standard deviations in x and y direction, so multiplying them with 3.4 gives us the radius in pixels where the Gaussian falloff results in 1/255 opacity.
   vec2 quadPixelSize = vec2 (3.4 * sqrt (a), 3.4 * sqrt (c));         // screen space half quad height and width
   vec2 quadNdcSize   = quadPixelSize / vec2 (x3d_Viewport .zw) * 2.0; // in ndc space

   clipSplatCenter .xy = clipSplatCenter .xy + x3d_Vertex .xy * quadNdcSize;

   texCoord    = x3d_Vertex .xy * quadPixelSize;
   gl_Position = clipSplatCenter;

   // Color

   float opacity = texelFetch (x3d_OpacitiesTexture, texelCoord, 0) .r;

   color = vec4 (calculateSphericalHarmonics (texelCoord), opacity);
}
`;

const fs = () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

in vec4 color;
in vec2 texCoord;
in vec3 conic;

out vec4 x3d_FragColor;

void
main ()
{
   // Equation 4
   float exponent = -0.5 * (conic .x * texCoord .x * texCoord .x + conic .z * texCoord .y * texCoord .y) - conic .y * texCoord .x * texCoord .y;

   if (exponent > 0.0)
      discard;

   float alpha = min (0.99, exp (exponent) * color .a); // opacity modulated by Gaussian falloff

   if (alpha < 1.0 / 255.0)
      discard;

   x3d_FragColor = vec4 (color .rgb * alpha, alpha); // premultiplied-alpha output
}
`;

// Register shaders.

import ShaderRegistry from "../../Browser/Shaders/ShaderRegistry.js";

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

   this .node = node;
}

Object .assign (Object .setPrototypeOf (GaussianSplatsShape .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Shader

      const shaderNode = browser .createShader ({
         name: "GaussianSplats",
         vertexShader: "GaussianSplats",
         fragmentShader: "GaussianSplats",
         options: ["X3D_INSTANCING"],
         attributes: ["x3d_SplatIndex"],
         uniforms: [
            "x3d_FocalLength",
            "x3d_PositionsTexture",
            "x3d_OrientationsTexture",
            "x3d_ScalesTexture",
            "x3d_OpacitiesTexture",
            "x3d_SphericalHarmonicsTexture",
         ],
      });

      shaderNode .enable (gl);

      this .shaderNode = shaderNode;

      // Quad Geometry

      this .geometryContext = new GeometryContext ();

      this .geometryBuffer       = gl .createBuffer ();
      this .positionsIndexBuffer = gl .createBuffer ();
      this .vertexArrayObject    = new VertexArray (gl);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

      // Textures

      this .positionsTexture          = this .createTexture ("x3d_PositionsTexture");
      this .orientationsTexture       = this .createTexture ("x3d_OrientationsTexture");
      this .scalesTexture             = this .createTexture ("x3d_ScalesTexture");
      this .sphericalHarmonicsTexture = this .createTexture ("x3d_SphericalHarmonicsTexture", gl .TEXTURE_2D_ARRAY);
      this .opacitiesTexture          = this .createTexture ("x3d_OpacitiesTexture");

      browser .resetTextureUnits ();

      // Fields

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
   set_bbox__ ()
   {
      if (this .isDefaultBBoxSize ())
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
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_transparent__ ()
   {
      this .transparent = true;
      this .alphaMode   = AlphaMode .BLEND;
   },
   createTexture (uniform, target)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         texture = gl .createTexture ();

      target ??= gl .TEXTURE_2D;

      texture .textureUnit = browser .popTextureUnit ();

      gl .bindTexture (target, texture);

      gl .texParameteri (target, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      gl .uniform1i (this .shaderNode [uniform], texture .textureUnit);

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

      gl .bindBuffer (gl .ARRAY_BUFFER, this .positionsIndexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Int32Array (Array (numSplats) .keys ()), gl .DYNAMIC_DRAW);

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
            sphericalHarmonics = new Float32Array (textureSize * (1 + 3 + 5 + 7) * 3);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         sphericalHarmonics .set (this .node ._sphericalHarmonics0 .getValue () .subarray (0, numSplats * 3));
         sphericalHarmonics .set (this .node ._sphericalHarmonics1 .getValue () .subarray (0, numSplats * 3 * 3), textureSize * 3 * 1);
         sphericalHarmonics .set (this .node ._sphericalHarmonics2 .getValue () .subarray (0, numSplats * 3 * 5), textureSize * 3 * 4);
         sphericalHarmonics .set (this .node ._sphericalHarmonics3 .getValue () .subarray (0, numSplats * 3 * 7), textureSize * 3 * 9);

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

      // Finish

      this .numSplats = numSplats;

      this .set_bbox__ ();
      this .set_objects__ ();
   },
   displaySimple ()
   { },
   display (gl, renderContext)
   {
      const
         viewport   = renderContext .viewport,
         browser    = this .getBrowser (),
         shaderNode = this .shaderNode;

      // Set viewport.

      gl .viewport (... viewport);

      // Setup shader.

      shaderNode .enable (gl);

      // Uniforms

      const { renderObject, modelViewMatrix, localObjects } = renderContext;

      gl .uniform4iv (shaderNode .x3d_Viewport, renderObject .getViewportArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix,  false, renderObject .getProjectionMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,         false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_CameraSpaceMatrix, false, renderObject .getCameraSpaceMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ViewMatrix,        false, renderObject .getViewMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,   false, modelViewMatrix);

      // The projection matrix stores the focal length in the first and second element of the diagonal.
      // We need to convert from NDC space to screen space, which is done by multiplying with the framebuffer dimensions and dividing by 2, since NDC goes from -1 to 1.
      gl .uniform2f (shaderNode .x3d_FocalLength,
         renderObject .getProjectionMatrixArray () [0] * viewport [2] * 0.5,
         renderObject .getProjectionMatrixArray () [5] * viewport [3] * 0.5);

      // Textures

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
         gl .bindBuffer (gl .ARRAY_BUFFER, this .positionsIndexBuffer);
         gl .enableVertexAttribArray (shaderNode .x3d_SplatIndex);
         gl .vertexAttribIPointer (shaderNode .x3d_SplatIndex, 1, gl .INT, 0, 0);
         gl .vertexAttribDivisor (shaderNode .x3d_SplatIndex, 1);

         shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, 0);
      }

      // TODO: sort splats.
      // gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
      gl .blendFunc (gl .ONE, gl .ONE_MINUS_SRC_ALPHA);

      gl .frontFace (gl .CCW);
      gl .enable (gl .CULL_FACE);

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);

      // TODO: sort splats.
      // gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
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

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function GaussianSplats (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .GaussianSplats);

   // Units

   this ._positions .setUnit ("length");

   // Private Properties

   this .shapeNode = new GaussianSplatsShape (executionContext, this);
}

Object .assign (Object .setPrototypeOf (GaussianSplats .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._visible     .addFieldInterest (this .shapeNode ._visible);
      this ._bboxDisplay .addFieldInterest (this .shapeNode ._bboxDisplay);
      this ._bboxSize    .addFieldInterest (this .shapeNode ._bboxSize);
      this ._bboxCenter  .addFieldInterest (this .shapeNode ._bboxCenter);

      this .shapeNode ._visible     = this ._visible;
      this .shapeNode ._bboxDisplay = this ._bboxDisplay;
      this .shapeNode ._bboxSize    = this ._bboxSize;
      this .shapeNode ._bboxCenter  = this ._bboxCenter;

      this .shapeNode .setup ();
   },
   getInnerNode ()
   {
      return this .shapeNode;
   },
   getBBox (bbox, shadows)
   {
      return this .shapeNode .getBBox (bbox, shadows);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (GaussianSplats,
{
   ... X3DNode .getStaticProperties ("GaussianSplats", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "positions",           new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientations",        new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",              new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "opacities",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics1", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics2", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics3", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",            new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",          new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplats;
