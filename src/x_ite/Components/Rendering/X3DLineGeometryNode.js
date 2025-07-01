import X3DNode         from "../Core/X3DNode.js";
import X3DGeometryNode from "./X3DGeometryNode.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import ViewVolume      from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector2         from "../../../standard/Math/Numbers/Vector2.js";
import Vector4         from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

const
   _numLines0            = Symbol (),
   _numLines1            = Symbol (),
   _numLines2            = Symbol (),
   _lineTrianglesBuffer0 = Symbol (),
   _lineTrianglesBuffer1 = Symbol (),
   _lineTrianglesBuffer2 = Symbol ();

function X3DLineGeometryNode (executionContext)
{
   if (!this .getExecutionContext ())
      X3DGeometryNode .call (this, executionContext);

   const
      browser = this .getBrowser (),
      gl      = browser .getContext ();

   this .lineStipples                = new Float32Array ();
   this .lineStippleBuffer           = gl .createBuffer ();
   this .thickLinesVertexArrayObject = new VertexArray (gl);

   this .setGeometryType (1);
   this .setPrimitiveMode (gl .LINES);
   this .setSolid (false);
}

Object .assign (Object .setPrototypeOf (X3DLineGeometryNode .prototype, X3DGeometryNode .prototype),
{
   intersectsLine ()
   {
      return false;
   },
   intersectsBox ()
   {
      return false;
   },
   updateVertexArrays ()
   {
      X3DGeometryNode .prototype .updateVertexArrays .call (this);

      this .thickLinesVertexArrayObject .update ();
   },
   generateTexCoords ()
   {
      // Line stipple support.

      const numLines = this .getVertices () .length / 8;

      if (this .lineStipples .length / 6 === numLines)
         return;

      const gl = this .getBrowser () .getContext ();

      this .lineStipples = new Float32Array (numLines * 6);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .lineStippleBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .lineStipples, gl .DYNAMIC_DRAW);
   },
   updateLengthSoFar: (() =>
   {
      const
         modelViewProjectionMatrix = new Matrix4 (),
         point0                    = new Vector4 (),
         point1                    = new Vector4 (),
         projectedPoint0           = new Vector2 (),
         projectedPoint1           = new Vector2 ();

      return function (gl, { viewport, renderObject, modelViewMatrix })
      {
         const
            projectionMatrix = renderObject .getProjectionMatrix () .get (),
            lineStipples     = this .lineStipples,
            vertices         = this .getVertices () .getValue (),
            numVertices      = vertices .length;

         modelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix);

         let lengthSoFar = 0;

         for (let i = 0, l = 0; i < numVertices; i += 8, l += 6)
         {
            point0 .set (vertices [i],     vertices [i + 1], vertices [i + 2], vertices [i + 3]);
            point1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6], vertices [i + 7]);

            ViewVolume .projectPointMatrix (point0, modelViewProjectionMatrix, viewport, projectedPoint0);
            ViewVolume .projectPointMatrix (point1, modelViewProjectionMatrix, viewport, projectedPoint1);

            lineStipples [l]     = projectedPoint1 .x;
            lineStipples [l + 1] = projectedPoint1 .y;

            lineStipples [l + 3] = projectedPoint0 .x;
            lineStipples [l + 4] = projectedPoint0 .y;
            lineStipples [l + 5] = lengthSoFar;

            lengthSoFar += projectedPoint1 .subtract (projectedPoint0) .magnitude ();
         }

         gl .bindBuffer (gl .ARRAY_BUFFER, this .lineStippleBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, lineStipples, gl .DYNAMIC_DRAW);
      };
   })(),
   displaySimple (gl, renderContext, shaderNode)
   {
      if (this .displaySimpleThick (gl, renderContext, shaderNode))
         return;

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         shaderNode .enableLineStippleAttribute (gl, this .lineStippleBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
      gl .lineWidth (1);
   },
   displaySimpleThick (gl, renderContext, shaderNode)
   {
      const
         shapeNode          = renderContext .shapeNode,
         linePropertiesNode = shapeNode .getAppearance () .getStyleProperties (1);

      if (!linePropertiesNode)
         return false;

      if (!linePropertiesNode .getTransformLines ())
         return false;

      // Check if pass 1 and/or pass 2 are already run.

      const numLines = this .getVertices () .length / 8;

      if (this [_numLines0] !== numLines)
         return true;

      if (this .hasNormals && this [_numLines2] !== numLines)
         return true;

      // Setup vertex attributes.

      if (this .thickLinesVertexArrayObject .enable (shaderNode .getProgram ()))
      {
         if (this .hasNormals)
         {
            const
               stride       = (9 + 4 + 3) * Float32Array .BYTES_PER_ELEMENT,
               normalOffset = 13 * Float32Array .BYTES_PER_ELEMENT;

            shaderNode .enableNormalAttribute (gl, this .lineTrianglesBuffer2, stride, normalOffset);
         }

         const
            stride            = 13 * Float32Array .BYTES_PER_ELEMENT,
            coordIndexOffset  = 0,
            lineStippleOffset = 1 * Float32Array .BYTES_PER_ELEMENT,
            vertexOffset      = 9 * Float32Array .BYTES_PER_ELEMENT;

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this [_lineTrianglesBuffer0], stride, coordIndexOffset);

         shaderNode .enableLineStippleAttribute (gl, this [_lineTrianglesBuffer0], stride, lineStippleOffset);
         shaderNode .enableVertexAttribute      (gl, this [_lineTrianglesBuffer0], stride, vertexOffset);
      }

      gl .drawArrays (gl .TRIANGLES, 0, this .vertexCount * 3);

      return true;
   },
   displaySimpleInstanced (gl, shaderNode, shapeNode)
   {
      if (this .displaySimpleInstancedThick (gl, shaderNode, shapeNode))
         return;

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, matrixOffset, normalMatrixOffset } = shapeNode;

         shaderNode .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);

         if (normalMatrixOffset !== undefined)
            shaderNode .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 1);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableLineStippleAttribute (gl, this .lineStippleBuffer, 0, 0);
         shaderNode .enableVertexAttribute      (gl, this .vertexBuffer,    0, 0);

         this .updateInstances = false;
      }

      gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());
   },
   displaySimpleInstancedThick (gl, shaderNode, shapeNode)
   {
      const linePropertiesNode = shapeNode .getAppearance () .getStyleProperties (1);

      if (!linePropertiesNode)
         return false;

      if (!linePropertiesNode .getTransformLines ())
         return false;

      // Check if pass 1 and/or pass 2 are already run.

      const numLines = this .getVertices () .length / 8 * shapeNode .getNumInstances ();

      if (shapeNode [_numLines0] !== numLines)
         return true;

      if (this .hasNormals && shapeNode [_numLines2] !== numLines)
         return true;

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .thickLinesVertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         shaderNode .enableInstanceMatrixAttribute (gl, shapeNode [_lineTrianglesBuffer1], 0, 0, 0);

         if (this .hasNormals)
         {
            const
               stride             = (9 + 4 + 3) * Float32Array .BYTES_PER_ELEMENT,
               normalMatrixOffset = 0,
               normalOffset       = 13 * Float32Array .BYTES_PER_ELEMENT;

            if (shapeNode .normalMatrixOffset)
               shaderNode .enableInstanceNormalMatrixAttribute (gl, shapeNode [_lineTrianglesBuffer2], stride, normalMatrixOffset, 0);

            shaderNode .enableNormalAttribute (gl, shapeNode [_lineTrianglesBuffer2], stride, normalOffset);
         }

         const
            stride            = 13 * Float32Array .BYTES_PER_ELEMENT,
            coordIndexOffset  = 0,
            lineStippleOffset = 1 * Float32Array .BYTES_PER_ELEMENT,
            vertexOffset      = 9 * Float32Array .BYTES_PER_ELEMENT;

         // for (let i = 0, length = attribNodes .length; i < length; ++ i)
         //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, coordIndexOffset);

         shaderNode .enableLineStippleAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, lineStippleOffset);
         shaderNode .enableVertexAttribute      (gl, shapeNode [_lineTrianglesBuffer0], stride, vertexOffset);

         this .updateInstances = false;
      }

      gl .drawArrays (gl .TRIANGLES, 0, this .vertexCount * 3 * shapeNode .getNumInstances ());

      return true;
   },
   display (gl, renderContext)
   {
      if (this .displayThick (gl, renderContext))
         return;

      const
         { viewport, appearanceNode } = renderContext,
         browser         = this .getBrowser (),
         primitiveMode   = browser .getPrimitiveMode (this .getPrimitiveMode ()),
         shaderNode      = appearanceNode .getShader (this, renderContext),
         renderModeNodes = appearanceNode .getRenderModes ();

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         shaderNode .enableLineStippleAttribute (gl, this .lineStippleBuffer, 0, 0);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (primitiveMode, 0, this .vertexCount);

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();

      gl .lineWidth (1);
   },
   displayThick: (() =>
   {
      const
         matrix                            = new Matrix4 (),
         modelViewProjectionMatrixArray    = new Float32Array (16),
         invModelViewProjectionMatrixArray = new Float32Array (16);

      return function (gl, renderContext)
      {
         const
            { renderObject, viewport, modelViewMatrix, appearanceNode } = renderContext,
            linePropertiesNode = appearanceNode .getStyleProperties (1);

         if (!linePropertiesNode)
            return false;

         // Also important for display.
         if (linePropertiesNode .getApplied () && linePropertiesNode .getLinetype () !== 1)
            this .updateLengthSoFar (gl, renderContext);

         if (!linePropertiesNode .getTransformLines ())
            return false;

         const
            browser             = this .getBrowser (),
            shaderNode          = appearanceNode .getShader (this, renderContext),
            renderModeNodes     = appearanceNode .getRenderModes (),
            projectionMatrix    = renderObject .getProjectionMatrix () .get (),
            primitiveMode       = browser .getPrimitiveMode (gl .TRIANGLES),
            transformShaderNode = browser .getLineTransformShader ();

         modelViewProjectionMatrixArray .set (matrix .assign (modelViewMatrix) .multRight (projectionMatrix));
         invModelViewProjectionMatrixArray .set (matrix .inverse ());

         // Pass 1

         transformShaderNode .enable (gl);

         gl .uniform4f (transformShaderNode .viewport, ... viewport);
         gl .uniformMatrix4fv (transformShaderNode .modelViewProjectionMatrix,    false, modelViewProjectionMatrixArray);
         gl .uniformMatrix4fv (transformShaderNode .invModelViewProjectionMatrix, false, invModelViewProjectionMatrixArray);
         gl .uniform1f (transformShaderNode .linewidthScaleFactor1_2, linePropertiesNode .getLinewidthScaleFactor () / 2);

         // Setup vertex attributes.

         if (this .thickLinesVertexArrayObject .enable (transformShaderNode .getProgram ()))
         {
            const
               coordIndexStride  = 2 * Float32Array .BYTES_PER_ELEMENT,
               coordIndexOffset0 = 0,
               coordIndexOffset1 = 1 * Float32Array .BYTES_PER_ELEMENT,
               lengthSoFarStride = 6 * Float32Array .BYTES_PER_ELEMENT,
               lengthSoFarOffset = 5 * Float32Array .BYTES_PER_ELEMENT,
               fogDepthStride    = 2 * Float32Array .BYTES_PER_ELEMENT,
               fogDepthOffset0   = 0,
               fogDepthOffset1   = 1 * Float32Array .BYTES_PER_ELEMENT,
               colorStride       = 8 * Float32Array .BYTES_PER_ELEMENT,
               colorOffset0      = 0,
               colorOffset1      = 4 * Float32Array .BYTES_PER_ELEMENT,
               vertexStride      = 8 * Float32Array .BYTES_PER_ELEMENT,
               vertexOffset0     = 0,
               vertexOffset1     = 4 * Float32Array .BYTES_PER_ELEMENT;

            // for (let i = 0, length = attribNodes .length; i < length; ++ i)
            //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

            if (this .coordIndices .length)
            {
               transformShaderNode .enableFloatAttrib (gl, "x3d_CoordIndex0", this .coordIndexBuffer, 1, coordIndexStride, coordIndexOffset0);
               transformShaderNode .enableFloatAttrib (gl, "x3d_CoordIndex1", this .coordIndexBuffer, 1, coordIndexStride, coordIndexOffset1);
            }

            transformShaderNode .enableFloatAttrib (gl, "x3d_LengthSoFar", this .lineStippleBuffer, 1, lengthSoFarStride, lengthSoFarOffset);

            if (this .hasFogCoords)
            {
               transformShaderNode .enableFloatAttrib (gl, "x3d_FogDepth0", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset0);
               transformShaderNode .enableFloatAttrib (gl, "x3d_FogDepth1", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset1);
            }

            if (this .colorMaterial)
            {
               transformShaderNode .enableFloatAttrib (gl, "x3d_Color0", this .colorBuffer, 4, colorStride, colorOffset0);
               transformShaderNode .enableFloatAttrib (gl, "x3d_Color1", this .colorBuffer, 4, colorStride, colorOffset1);
            }

            transformShaderNode .enableFloatAttrib (gl, "x3d_Vertex0", this .vertexBuffer, 4, vertexStride, vertexOffset0);
            transformShaderNode .enableFloatAttrib (gl, "x3d_Vertex1", this .vertexBuffer, 4, vertexStride, vertexOffset1);
         }

         const numLines = this .getVertices () .length / 8;

         // Create lineTrianglesBuffer0

         if (this [_numLines0] !== numLines)
         {
            this [_numLines0]              = numLines;
            this [_lineTrianglesBuffer0] ??= gl .createBuffer ();

            gl .bindBuffer (gl .ARRAY_BUFFER, this [_lineTrianglesBuffer0]);
            gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ((16 * 6) * numLines), gl .DYNAMIC_DRAW);
         }

         // Transform lines.

         gl .bindBuffer (gl .ARRAY_BUFFER, null);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
         gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, this [_lineTrianglesBuffer0]);
         gl .enable (gl .RASTERIZER_DISCARD);
         gl .beginTransformFeedback (gl .POINTS);
         gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount / 2, 2);
         gl .endTransformFeedback ();
         gl .disable (gl .RASTERIZER_DISCARD);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

         // DEBUG

         // const data = new Float32Array (16 * 6 * this .vertexCount / 2);
         // gl .bindBuffer (gl .ARRAY_BUFFER, this [_lineTrianglesBuffer0]);
         // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
         // console .log (data);

         // Pass 2

         if (this .hasNormals)
         {
            const transformShaderNode2 = browser .getLineTransformInstancedShader (2);

            transformShaderNode2 .enable (gl);

            // Setup vertex attributes.
            if (this .thickLinesVertexArrayObject .enable (transformShaderNode2 .getProgram ()))
            {
               if (this .hasTangents)
                  transformShaderNode2 .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

               if (this .hasTangents)
               {
                  const
                     tangentStride  = 8 * Float32Array .BYTES_PER_ELEMENT,
                     tangentOffset0 = 0,
                     tangentOffset1 = 4 * Float32Array .BYTES_PER_ELEMENT;

                  transformShaderNode2 .enableFloatAttrib (gl, "x3d_Tangent0", this .tangentBuffer, 4, tangentStride, tangentOffset0);
                  transformShaderNode2 .enableFloatAttrib (gl, "x3d_Tangent1", this .tangentBuffer, 4, tangentStride, tangentOffset1);
               }

               const
                  normalStride  = 6 * Float32Array .BYTES_PER_ELEMENT,
                  normalOffset0 = 0,
                  normalOffset1 = 3 * Float32Array .BYTES_PER_ELEMENT;

               transformShaderNode2 .enableFloatAttrib (gl, "x3d_Normal0", this .normalBuffer, 3, normalStride, normalOffset0);
               transformShaderNode2 .enableFloatAttrib (gl, "x3d_Normal1", this .normalBuffer, 3, normalStride, normalOffset1);
            }

            // Create lineTrianglesBuffer2

            if (this [_numLines2] !== numLines)
            {
               this [_numLines2]              = numLines;
               this .lineTrianglesBuffer2 ??= gl .createBuffer ();

               gl .bindBuffer (gl .ARRAY_BUFFER, this .lineTrianglesBuffer2);
               gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ((16 * 6) * numLines), gl .DYNAMIC_DRAW);
            }

            // Transform lines.

            gl .bindBuffer (gl .ARRAY_BUFFER, null);
            gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
            gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, this .lineTrianglesBuffer2);
            gl .enable (gl .RASTERIZER_DISCARD);
            gl .beginTransformFeedback (gl .POINTS);
            gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount / 2, 2);
            gl .endTransformFeedback ();
            gl .disable (gl .RASTERIZER_DISCARD);
            gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

            // DEBUG

            // const data = new Float32Array (9 * 6 * 2);
            // gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer2]);
            // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
            // console .log (data);
         }

         // Set viewport.

         gl .viewport (... viewport);

         // Enable render mode nodes.

         for (const node of renderModeNodes)
            node .enable (gl);

         // Setup shader.

         shaderNode .enable (gl);
         shaderNode .setUniforms (gl, renderContext, this);

         // Setup vertex attributes.

         if (this .thickLinesVertexArrayObject .enable (shaderNode .getProgram ()))
         {
            if (this .hasNormals)
            {
               const
                  stride        = (9 + 4 + 3) * Float32Array .BYTES_PER_ELEMENT,
                  tangentOffset = 9 * Float32Array .BYTES_PER_ELEMENT,
                  normalOffset  = 13 * Float32Array .BYTES_PER_ELEMENT;

               if (this .hasTangents)
                  shaderNode .enableTangentAttribute (gl, this .lineTrianglesBuffer2, stride, tangentOffset);

               shaderNode .enableNormalAttribute (gl, this .lineTrianglesBuffer2, stride, normalOffset);
            }

            const
               stride            = 13 * Float32Array .BYTES_PER_ELEMENT,
               coordIndexOffset  = 0,
               lineStippleOffset = 1 * Float32Array .BYTES_PER_ELEMENT,
               fogCoordOffset    = 4 * Float32Array .BYTES_PER_ELEMENT,
               colorOffset       = 5 * Float32Array .BYTES_PER_ELEMENT,
               vertexOffset      = 9 * Float32Array .BYTES_PER_ELEMENT;

            // for (let i = 0, length = attribNodes .length; i < length; ++ i)
            //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

            shaderNode .enableCoordIndexAttribute  (gl, this [_lineTrianglesBuffer0], stride, coordIndexOffset);
            shaderNode .enableLineStippleAttribute (gl, this [_lineTrianglesBuffer0], stride, lineStippleOffset);

            if (this .hasFogCoords)
               shaderNode .enableFogDepthAttribute (gl, this [_lineTrianglesBuffer0], stride, fogCoordOffset);

            if (this .colorMaterial)
               shaderNode .enableColorAttribute (gl, this [_lineTrianglesBuffer0], stride, colorOffset);

            shaderNode .enableVertexAttribute (gl, this [_lineTrianglesBuffer0], stride, vertexOffset);
         }

         gl .frontFace (gl .CCW);
         gl .enable (gl .CULL_FACE);
         gl .drawArrays (primitiveMode, 0, this .vertexCount * 3);

         // Disable render mode nodes.

         for (const node of renderModeNodes)
            node .disable (gl);

         // Reset texture units.

         browser .resetTextureUnits ();

         return true;
      };
   })(),
   displayInstanced (gl, renderContext, shapeNode)
   {
      if (this .displayInstancedThick (gl, renderContext, shapeNode))
         return;

      const
         { viewport, appearanceNode } = renderContext,
         browser         = this .getBrowser (),
         geometryContext = shapeNode .getGeometryContext (),
         shaderNode      = appearanceNode .getShader (geometryContext, renderContext),
         renderModeNodes = appearanceNode .getRenderModes (),
         primitiveMode   = browser .getPrimitiveMode (this .getPrimitiveMode ());

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this);

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, velocityOffset, matrixOffset, normalMatrixOffset, colorOffset } = shapeNode;

         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (particleOffset !== undefined)
            shaderNode .enableParticleAttribute (gl, instances, instancesStride, particleOffset, 1);

         if (velocityOffset !== undefined)
            shaderNode .enableParticleVelocityAttribute (gl, instances, instancesStride, velocityOffset, 1);

         shaderNode .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);

         if (normalMatrixOffset !== undefined)
            shaderNode .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 1);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (geometryContext .colorMaterial)
         {
            if (geometryContext === this)
               shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);
            else
               shaderNode .enableColorAttribute (gl, instances, instancesStride, colorOffset, 1);
         }

         if (this .hasTangents)
            shaderNode .enableNormalAttribute (gl, this .tangentBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         this .updateInstances = false;
      }

      // Wireframes are always solid so only one drawing call is needed.

      gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();

      gl .lineWidth (1);
   },
   displayInstancedThick: (() =>
   {
      const
         matrix                            = new Matrix4 (),
         modelViewProjectionMatrixArray    = new Float32Array (16),
         invModelViewProjectionMatrixArray = new Float32Array (16);

      return function (gl, renderContext, shapeNode)
      {
         const
            { renderObject, viewport, appearanceNode } = renderContext,
            linePropertiesNode = appearanceNode .getStyleProperties (1);

         if (!linePropertiesNode)
            return false;

         // Also important for displayInstanced.
         if (linePropertiesNode .getApplied () && linePropertiesNode .getLinetype () !== 1)
            this .updateLengthSoFar (gl, renderContext);

         if (!linePropertiesNode .getTransformLines ())
            return false;

         const
            browser              = this .getBrowser (),
            geometryContext      = shapeNode .getGeometryContext (),
            shaderNode           = appearanceNode .getShader (geometryContext, renderContext),
            renderModeNodes      = appearanceNode .getRenderModes (),
            projectionMatrix     = renderObject .getProjectionMatrix () .get (),
            primitiveMode        = browser .getPrimitiveMode (gl .TRIANGLES),
            transformShaderNode0 = browser .getLineTransformInstancedShader (0);

         modelViewProjectionMatrixArray .set (matrix .assign (renderContext .modelViewMatrix) .multRight (projectionMatrix));
         invModelViewProjectionMatrixArray .set (matrix .inverse ());

         // Pass 0

         transformShaderNode0 .enable (gl);

         gl .uniform4f (transformShaderNode0 .viewport, ... viewport);
         gl .uniformMatrix4fv (transformShaderNode0 .modelViewProjectionMatrix,    false, modelViewProjectionMatrixArray);
         gl .uniformMatrix4fv (transformShaderNode0 .invModelViewProjectionMatrix, false, invModelViewProjectionMatrixArray);
         gl .uniform1f (transformShaderNode0 .linewidthScaleFactor1_2, linePropertiesNode .getLinewidthScaleFactor () / 2);

         // Setup vertex attributes.

         const instances = shapeNode .getInstances ();

         if (instances .thickLinesVertexArrayObject .update (this .updateInstances) .enable (transformShaderNode0 .getProgram ()))
         {
            const { instancesStride, matrixOffset, colorOffset } = shapeNode;

            transformShaderNode0 .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 2);

            const
               coordIndexStride  = 2 * Float32Array .BYTES_PER_ELEMENT,
               coordIndexOffset0 = 0,
               coordIndexOffset1 = 1 * Float32Array .BYTES_PER_ELEMENT,
               lengthSoFarStride = 6 * Float32Array .BYTES_PER_ELEMENT,
               lengthSoFarOffset = 5 * Float32Array .BYTES_PER_ELEMENT,
               fogDepthStride    = 2 * Float32Array .BYTES_PER_ELEMENT,
               fogDepthOffset0   = 0,
               fogDepthOffset1   = 1 * Float32Array .BYTES_PER_ELEMENT,
               colorStride       = 8 * Float32Array .BYTES_PER_ELEMENT,
               colorOffset0      = 0,
               colorOffset1      = 4 * Float32Array .BYTES_PER_ELEMENT,
               vertexStride      = 8 * Float32Array .BYTES_PER_ELEMENT,
               vertexOffset0     = 0,
               vertexOffset1     = 4 * Float32Array .BYTES_PER_ELEMENT;

            // for (let i = 0, length = attribNodes .length; i < length; ++ i)
            //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

            if (this .coordIndices .length)
            {
               transformShaderNode0 .enableFloatAttrib (gl, "x3d_CoordIndex0", this .coordIndexBuffer, 1, coordIndexStride, coordIndexOffset0);
               transformShaderNode0 .enableFloatAttrib (gl, "x3d_CoordIndex1", this .coordIndexBuffer, 1, coordIndexStride, coordIndexOffset1);
            }

            transformShaderNode0 .enableFloatAttrib (gl, "x3d_LengthSoFar", this .lineStippleBuffer, 1, lengthSoFarStride, lengthSoFarOffset);

            if (this .hasFogCoords)
            {
               transformShaderNode0 .enableFloatAttrib (gl, "x3d_FogDepth0", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset0);
               transformShaderNode0 .enableFloatAttrib (gl, "x3d_FogDepth1", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset1);
            }

            if (geometryContext .colorMaterial)
            {
               if (geometryContext === this)
               {
                  transformShaderNode0 .enableFloatAttrib (gl, "x3d_Color0", this .colorBuffer, 4, colorStride, colorOffset0);
                  transformShaderNode0 .enableFloatAttrib (gl, "x3d_Color1", this .colorBuffer, 4, colorStride, colorOffset1);
               }
               else
               {
                  transformShaderNode0 .enableFloatAttrib (gl, "x3d_Color0", instances, 4, instancesStride, colorOffset, 2);
                  transformShaderNode0 .enableFloatAttrib (gl, "x3d_Color1", instances, 4, instancesStride, colorOffset, 2);
               }
            }

            transformShaderNode0 .enableFloatAttrib (gl, "x3d_Vertex0", this .vertexBuffer, 4, vertexStride, vertexOffset0);
            transformShaderNode0 .enableFloatAttrib (gl, "x3d_Vertex1", this .vertexBuffer, 4, vertexStride, vertexOffset1);
         }

         // Create lineTrianglesBuffer0

         const numLines = this .getVertices () .length / 8 * shapeNode .getNumInstances ();

         if (shapeNode [_numLines0] !== numLines)
         {
            shapeNode [_numLines0]              = numLines;
            shapeNode [_lineTrianglesBuffer0] ??= gl .createBuffer ();

            gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer0]);
            gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ((13 * 6) * numLines), gl .DYNAMIC_DRAW);
         }

         // Transform lines.

         gl .bindBuffer (gl .ARRAY_BUFFER, null);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
         gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, shapeNode [_lineTrianglesBuffer0]);
         gl .enable (gl .RASTERIZER_DISCARD);
         gl .beginTransformFeedback (gl .POINTS);
         gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount / 2, 2 * shapeNode .getNumInstances ());
         gl .endTransformFeedback ();
         gl .disable (gl .RASTERIZER_DISCARD);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

         // DEBUG

         // const data = new Float32Array (16 * 6 * this .vertexCount / 2);
         // gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer0]);
         // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
         // console .log (data);

         // Pass 1

         const transformShaderNode1 = browser .getLineTransformInstancedShader (1);

         transformShaderNode1 .enable (gl);

         // Setup vertex attributes.

         if (instances .thickLinesVertexArrayObject .update (this .updateInstances) .enable (transformShaderNode1 .getProgram ()))
         {
            const { instancesStride, matrixOffset } = shapeNode;

            transformShaderNode1 .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);
         }

         // Create lineTrianglesBuffer1

         if (shapeNode [_numLines1] !== numLines)
         {
            shapeNode [_numLines1]              = numLines;
            shapeNode [_lineTrianglesBuffer1] ??= gl .createBuffer ();

            gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer1]);
            gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ((16 * 6) * numLines), gl .DYNAMIC_DRAW);
         }

         // Transform lines.

         gl .bindBuffer (gl .ARRAY_BUFFER, null);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
         gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, shapeNode [_lineTrianglesBuffer1]);
         gl .enable (gl .RASTERIZER_DISCARD);
         gl .beginTransformFeedback (gl .POINTS);
         gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount, shapeNode .getNumInstances ());
         gl .endTransformFeedback ();
         gl .disable (gl .RASTERIZER_DISCARD);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

         // DEBUG

         // const data = new Float32Array (16 * 6 * 2);
         // gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer1]);
         // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
         // console .log (data);

         // Pass 2

         if (this .hasNormals)
         {
            const transformShaderNode2 = browser .getLineTransformInstancedShader (2);

            transformShaderNode2 .enable (gl);

            // Setup vertex attributes.

            if (instances .thickLinesVertexArrayObject .update (this .updateInstances) .enable (transformShaderNode2 .getProgram ()))
            {
               const { instancesStride, normalMatrixOffset } = shapeNode;

               transformShaderNode2 .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 2);

               if (this .hasTangents)
                  transformShaderNode2 .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

               if (this .hasTangents)
               {
                  const
                     tangentStride  = 8 * Float32Array .BYTES_PER_ELEMENT,
                     tangentOffset0 = 0,
                     tangentOffset1 = 4 * Float32Array .BYTES_PER_ELEMENT;

                  transformShaderNode2 .enableFloatAttrib (gl, "x3d_Tangent0", this .tangentBuffer, 4, tangentStride, tangentOffset0);
                  transformShaderNode2 .enableFloatAttrib (gl, "x3d_Tangent1", this .tangentBuffer, 4, tangentStride, tangentOffset1);
               }

               const
                  normalStride  = 6 * Float32Array .BYTES_PER_ELEMENT,
                  normalOffset0 = 0,
                  normalOffset1 = 3 * Float32Array .BYTES_PER_ELEMENT;

               transformShaderNode2 .enableFloatAttrib (gl, "x3d_Normal0", this .normalBuffer, 3, normalStride, normalOffset0);
               transformShaderNode2 .enableFloatAttrib (gl, "x3d_Normal1", this .normalBuffer, 3, normalStride, normalOffset1);
            }

            // Create lineTrianglesBuffer2

            if (shapeNode [_numLines2] !== numLines)
            {
               shapeNode [_numLines2]              = numLines;
               shapeNode [_lineTrianglesBuffer2] ??= gl .createBuffer ();

               gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer2]);
               gl .bufferData (gl .ARRAY_BUFFER, new Float32Array ((16 * 6) * numLines), gl .DYNAMIC_DRAW);
            }

            // Transform lines.

            gl .bindBuffer (gl .ARRAY_BUFFER, null);
            gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
            gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, shapeNode [_lineTrianglesBuffer2]);
            gl .enable (gl .RASTERIZER_DISCARD);
            gl .beginTransformFeedback (gl .POINTS);
            gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount / 2, 2 * shapeNode .getNumInstances ());
            gl .endTransformFeedback ();
            gl .disable (gl .RASTERIZER_DISCARD);
            gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

            // DEBUG

            // const data = new Float32Array (9 * 6 * 2);
            // gl .bindBuffer (gl .ARRAY_BUFFER, shapeNode [_lineTrianglesBuffer2]);
            // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
            // console .log (data);
         }

         // Set viewport.

         gl .viewport (... viewport);

         // Enable render mode nodes.

         for (const node of renderModeNodes)
            node .enable (gl);

         // Setup shader.

         shaderNode .enable (gl);
         shaderNode .setUniforms (gl, renderContext, geometryContext);

         // Setup vertex attributes.

         if (instances .thickLinesVertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
         {
            shaderNode .enableInstanceMatrixAttribute (gl, shapeNode [_lineTrianglesBuffer1], 0, 0, 0);

            if (this .hasNormals)
            {
               const
                  stride             = (9 + 4 + 3) * Float32Array .BYTES_PER_ELEMENT,
                  normalMatrixOffset = 0,
                  tangentOffset      = 9 * Float32Array .BYTES_PER_ELEMENT,
                  normalOffset       = 13 * Float32Array .BYTES_PER_ELEMENT;

               if (shapeNode .normalMatrixOffset)
                  shaderNode .enableInstanceNormalMatrixAttribute (gl, shapeNode [_lineTrianglesBuffer2], stride, normalMatrixOffset, 0);

               if (this .hasTangents)
                  shaderNode .enableTangentAttribute (gl, shapeNode [_lineTrianglesBuffer2], stride, tangentOffset);

               shaderNode .enableNormalAttribute (gl, shapeNode [_lineTrianglesBuffer2], stride, normalOffset);
            }

            const
               stride            = 13 * Float32Array .BYTES_PER_ELEMENT,
               coordIndexOffset  = 0,
               lineStippleOffset = 1 * Float32Array .BYTES_PER_ELEMENT,
               fogCoordOffset    = 4 * Float32Array .BYTES_PER_ELEMENT,
               colorOffset       = 5 * Float32Array .BYTES_PER_ELEMENT,
               vertexOffset      = 9 * Float32Array .BYTES_PER_ELEMENT;

            // for (let i = 0, length = attribNodes .length; i < length; ++ i)
            //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

            shaderNode .enableCoordIndexAttribute  (gl, shapeNode [_lineTrianglesBuffer0], stride, coordIndexOffset);
            shaderNode .enableLineStippleAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, lineStippleOffset);

            if (this .hasFogCoords)
               shaderNode .enableFogDepthAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, fogCoordOffset);

            if (geometryContext .colorMaterial)
               shaderNode .enableColorAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, colorOffset);

            shaderNode .enableVertexAttribute (gl, shapeNode [_lineTrianglesBuffer0], stride, vertexOffset);

            this .updateInstances = false;
         }

         gl .frontFace (gl .CCW);
         gl .enable (gl .CULL_FACE);
         gl .drawArrays (primitiveMode, 0, this .vertexCount * 3 * shapeNode .getNumInstances ());

         // Disable render mode nodes.

         for (const node of renderModeNodes)
            node .disable (gl);

         // Reset texture units.

         browser .resetTextureUnits ();

         return true;
      };
   })(),
});

Object .defineProperties (X3DLineGeometryNode, X3DNode .getStaticProperties ("X3DLineGeometryNode", "Rendering", 1));

export default X3DLineGeometryNode;
