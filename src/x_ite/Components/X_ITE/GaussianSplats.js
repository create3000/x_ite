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

const vs = () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DArray;

uniform ivec4 x3d_Viewport;
uniform mat4  x3d_ProjectionMatrix;
uniform mat4  x3d_ModelViewMatrix;

#if defined (X3D_XR_SESSION)
   uniform mat4 x3d_EyeMatrix;
#endif

in vec4 x3d_Vertex;
in int  x3d_SplatIndex;

out vec4 color;

uniform sampler2D      x3d_PositionsTexture;
uniform sampler2D      x3d_OrientationsTexture;
uniform sampler2D      x3d_ScalesTexture;
uniform sampler2D      x3d_OpacitiesTexture;
uniform sampler2DArray x3d_SphericalHarmonicsTexture;

vec3
convertFDC (const in vec3 f_dc)
{
   // https://github.com/graphdeco-inria/gaussian-splatting/issues/485

   const float C0 = 0.28209479177387814; // = 1 / (2 * Math .sqrt (Math .PI))

   return 0.5 + C0 * f_dc;
}

void
main ()
{
   // Texel Coord

   int   textureWidth = textureSize (x3d_PositionsTexture, 0) .x;
   ivec2 texelCoord   = ivec2 (x3d_SplatIndex % textureWidth, x3d_SplatIndex / textureWidth);

   // Position

   vec4 tVertex = x3d_Vertex;
   vec3 splatPosition = texelFetch (x3d_PositionsTexture, texelCoord, 0) .xyz;

   tVertex .xyz *= 0.01;
   tVertex .xyz += splatPosition;

   tVertex = x3d_ModelViewMatrix * tVertex;

   #if defined (X3D_XR_SESSION)
      tVertex = x3d_EyeMatrix * tVertex;
   #endif

   gl_Position = x3d_ProjectionMatrix * tVertex;

   // Color

   float opacity = texelFetch (x3d_OpacitiesTexture, texelCoord, 0) .r;

   // Degree 0
   vec3 sh0 = texelFetch (x3d_SphericalHarmonicsTexture, ivec3 (texelCoord .xy, 0), 0) .rgb;

   sh0 = convertFDC (sh0);

   color = vec4 (sh0, opacity);
}
`;

const fs = () => /* glsl */ `#version 300 es

precision highp float;
precision highp int;
precision highp sampler2D;

in vec4 color;

out vec4 x3d_FragColor;

void
main ()
{
   float alpha = 1.0 / (1.0 + exp (-color .a));

   x3d_FragColor = vec4 (color .rgb, alpha);
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
            sphericalHarmonics = new Float32Array (textureSize * 12);

         positions    .set (this .node ._positions    .getValue () .subarray (0, numSplats * 3));
         orientations .set (this .node ._orientations .getValue () .subarray (0, numSplats * 4));
         scales       .set (this .node ._scales       .getValue () .subarray (0, numSplats * 3));
         opacities    .set (this .node ._opacities    .getValue () .subarray (0, numSplats));

         sphericalHarmonics .set (this .node ._sphericalHarmonics0 .getValue () .subarray (0, numSplats * 3));
         sphericalHarmonics .set (this .node ._sphericalHarmonics1 .getValue () .subarray (0, numSplats * 3), textureSize * 3);
         sphericalHarmonics .set (this .node ._sphericalHarmonics2 .getValue () .subarray (0, numSplats * 3), textureSize * 6);
         sphericalHarmonics .set (this .node ._sphericalHarmonics3 .getValue () .subarray (0, numSplats * 3), textureSize * 9);

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
      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, renderObject .getProjectionMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_EyeMatrix,        false, renderObject .getEyeMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrix);

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
      gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
      gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);

      gl .frontFace (gl .CCW);
      gl .enable (gl .CULL_FACE);

      gl .drawArraysInstanced (gl .TRIANGLES, 0, 6, this .numSplats);

      // TODO: sort splats.
      gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
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
