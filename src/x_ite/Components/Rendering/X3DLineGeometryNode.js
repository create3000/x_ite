/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import X3DGeometryNode from "./X3DGeometryNode.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import ViewVolume      from "../../../standard/Math/Geometry/ViewVolume.js";
import Box3            from "../../../standard/Math/Geometry/Box3.js";
import Line2           from "../../../standard/Math/Geometry/Line2.js";
import Line3           from "../../../standard/Math/Geometry/Line3.js";
import Vector2         from "../../../standard/Math/Numbers/Vector2.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Vector4         from "../../../standard/Math/Numbers/Vector4.js";
import Matrix2         from "../../../standard/Math/Numbers/Matrix2.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function X3DLineGeometryNode (executionContext)
{
   if (!this .getExecutionContext ())
      X3DGeometryNode .call (this, executionContext);

   const
      browser = this .getBrowser (),
      gl      = browser .getContext ();

   this .transformVertexArrayObject = new VertexArray ();
   this .thickVertexArrayObject     = new VertexArray ();
   this .lineStippleBuffer          = gl .createBuffer ();
   this .trianglesBuffer            = gl .createBuffer ();

   this .setGeometryType (1);
   this .setPrimitiveMode (gl .LINES);
   this .setSolid (false);
}

X3DLineGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
{
   constructor: X3DLineGeometryNode,
   updateVertexArrays: function ()
   {
      X3DGeometryNode .prototype .updateVertexArrays .call (this);

      this .transformVertexArrayObject .update ();
      this .thickVertexArrayObject     .update ();
   },
   intersectsLine: (function ()
   {
      const
         bbox                      = new Box3 (),
         min                       = new Vector3 (0, 0, 0),
         max                       = new Vector3 (0, 0, 0),
         screenScale1_             = new Vector3 (0, 0, 0),
         screenScale2_             = new Vector3 (0, 0, 0),
         modelViewProjectionMatrix = new Matrix4 (),
         point1                    = new Vector3 (0, 0, 0),
         point2                    = new Vector3 (0, 0, 0),
         projected1                = new Vector2 (0, 0),
         projected2                = new Vector2 (0, 0),
         projected                 = new Line2 (Vector2 .Zero, Vector2 .yAxis),
         closest                   = new Vector2 (0, 0),
         ray                       = new Line3 (Vector3 .Zero, Vector3 .zAxis),
         line                      = new Line3 (Vector3 .Zero, Vector3 .zAxis),
         point                     = new Vector3 (0, 0, 0),
         rotation                  = new Matrix2 (),
         clipPoint                 = new Vector3 (0, 0, 0);

      return function (hitRay, renderObject, invModelViewMatrix, appearanceNode, intersections)
      {
         const
            browser            = this .getBrowser (),
            contentScale       = browser .getRenderingProperty ("ContentScale"),
            modelViewMatrix    = renderObject .getModelViewMatrix () .get (),
            viewport           = renderObject .getViewVolume () .getViewport (),
            extents            = bbox .assign (this .getBBox ()) .multRight (modelViewMatrix) .getExtents (min, max),
            linePropertiesNode = appearanceNode .getLineProperties (),
            lineWidth1_2       = Math .max (1.5, linePropertiesNode && linePropertiesNode .getApplied () ? linePropertiesNode .getLinewidthScaleFactor () / 2 : contentScale),
            screenScale1       = renderObject .getViewpoint () .getScreenScale (min, viewport, screenScale1_), // in m/px
            offsets1           = invModelViewMatrix .multDirMatrix (screenScale1 .multiply (lineWidth1_2)),
            screenScale2       = renderObject .getViewpoint () .getScreenScale (max, viewport, screenScale2_), // in m/px
            offsets2           = invModelViewMatrix .multDirMatrix (screenScale2 .multiply (lineWidth1_2));

         if (this .intersectsBBox (hitRay, offsets1 .abs () .max (offsets2 .abs ())))
         {
            const
               pointer          = this .getBrowser () .getPointer (),
               projectionMatrix = renderObject .getProjectionMatrix () .get (),
               clipPlanes       = renderObject .getLocalObjects (),
               vertices         = this .getVertices (),
               numVertices      = vertices .length;

            modelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix);

            for (let i = 0; i < numVertices; i += 8)
            {
               point1 .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);
               point2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

               ViewVolume .projectPointMatrix (point1, modelViewProjectionMatrix, viewport, projected1);
               ViewVolume .projectPointMatrix (point2, modelViewProjectionMatrix, viewport, projected2);

               projected .setPoints (projected1, projected2);

               if (projected .getClosestPointToPoint (pointer, closest))
               {
                  const
                     distance  = projected1 .distance (projected2),
                     distance1 = projected1 .distance (closest),
                     distance2 = projected2 .distance (closest);

                  if (distance1 <= distance && distance2 <= distance)
                  {
                     if (closest .distance (pointer) <= lineWidth1_2)
                     {
                        if (clipPlanes .length)
                        {
                           if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (closest)), clipPlanes))
                              continue;
                        }

                        const
                           direction = projected .direction,
                           texCoordY = rotation .set (direction .x, direction .y, -direction .y, direction .x) .inverse () .multVecMatrix (pointer .copy () .subtract (closest)),
                           texCoord  = texCoordY .set (distance1 / distance, (texCoordY .y / lineWidth1_2 + 1) / 2),
                           normal    = point2 .copy () .subtract (point1) .normalize ();

                        ViewVolume .unProjectRay (closest .x, closest .y, modelViewMatrix, projectionMatrix, viewport, ray);

                        line .setPoints (point1, point2) .getClosestPointToLine (ray, point);

                        intersections .push ({ texCoord: texCoord, normal: normal, point: point .copy () });
                     }
                  }
               }
            }
         }

         return intersections .length;
      };
   })(),
   intersectsLineWithGeometry: function ()
   {
      return false;
   },
   intersectsBox: function (box, clipPlanes, modelViewMatrix)
   {
      return false;
   },
   buildTexCoords: function ()
   {
      // Line stipple support.

      const lineStipple = this .getTexCoords ();

      if (lineStipple .getValue () .length / 6 !== this .getVertices () .length / 8)
      {
         const
            gl       = this .getBrowser () .getContext (),
            numLines = this .getVertices () .length / 8;

         lineStipple .length = numLines * 6;

         lineStipple .fill (0);
         lineStipple .shrinkToFit ();

         gl .bindBuffer (gl .ARRAY_BUFFER, this .lineStippleBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, lineStipple .getValue (), gl .DYNAMIC_DRAW);

         gl .bindBuffer (gl .ARRAY_BUFFER, this .trianglesBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (15 * 6 * numLines), gl .DYNAMIC_DRAW);
      }
   },
   updateLengthSoFar: (function ()
   {
      const
         modelViewProjectionMatrix = new Matrix4 (),
         point0                    = new Vector4 (0, 0, 0),
         point1                    = new Vector4 (0, 0, 0),
         projectedPoint0           = new Vector2 (0, 0),
         projectedPoint1           = new Vector2 (0, 0);

      return function (gl, renderContext)
      {
         const
            viewport         = renderContext .renderObject .getViewVolume () .getViewport (),
            projectionMatrix = renderContext .renderObject .getProjectionMatrix () .get (),
            lineStippleArray = this .getTexCoords () .getValue (),
            vertices         = this .getVertices (),
            numVertices      = vertices .length;

         modelViewProjectionMatrix .assign (renderContext .modelViewMatrix) .multRight (projectionMatrix);

         let lengthSoFar = 0;

         for (let i = 0, l = 0; i < numVertices; i += 8, l += 6)
         {
            point0 .set (vertices [i],     vertices [i + 1], vertices [i + 2], vertices [i + 3]);
            point1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6], vertices [i + 7]);

            ViewVolume .projectPointMatrix (point0, modelViewProjectionMatrix, viewport, projectedPoint0);
            ViewVolume .projectPointMatrix (point1, modelViewProjectionMatrix, viewport, projectedPoint1);

            lineStippleArray [l]     = projectedPoint1 .x;
            lineStippleArray [l + 1] = projectedPoint1 .y;

            lineStippleArray [l + 3] = projectedPoint0 .x;
            lineStippleArray [l + 4] = projectedPoint0 .y;
            lineStippleArray [l + 5] = lengthSoFar;

            lengthSoFar += projectedPoint1 .subtract (projectedPoint0) .magnitude ();
         }

         gl .bindBuffer (gl .ARRAY_BUFFER, this .lineStippleBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, lineStippleArray, gl .DYNAMIC_DRAW);
      };
   })(),
   display: (function ()
   {
      const
         matrix                            = new Matrix4 (),
         modelViewProjectionMatrixArray    = new Float32Array (16),
         invModelViewProjectionMatrixArray = new Float32Array (16);

      return function (gl, renderContext)
      {
         const
            browser            = this .getBrowser (),
            appearanceNode     = renderContext .appearanceNode,
            linePropertiesNode = appearanceNode .getLineProperties (),
            shaderNode         = appearanceNode .getShader (this, renderContext),
            blendModeNode      = appearanceNode .getBlendMode (),
            attribNodes        = this .getAttrib (),
            attribBuffers      = this .getAttribBuffers ();

         if (linePropertiesNode)
         {
            if (linePropertiesNode .getApplied () && linePropertiesNode .getLinetype () !== 1)
               this .updateLengthSoFar (gl, renderContext);

            if (linePropertiesNode .getTransformLines ())
            {
               const
                  renderObject        = renderContext .renderObject,
                  viewport            = renderObject .getViewVolume () .getViewport (),
                  projectionMatrix    = renderObject .getProjectionMatrix () .get (),
                  primitiveMode       = browser .getPrimitiveMode (gl .TRIANGLES),
                  transformShaderNode = browser .getLineTransformShader ();

               modelViewProjectionMatrixArray .set (matrix .assign (renderContext .modelViewMatrix) .multRight (projectionMatrix));
               invModelViewProjectionMatrixArray .set (matrix .inverse ());

               // Start

               transformShaderNode .enable (gl);

               gl .uniform4f (transformShaderNode .viewport, viewport .x, viewport .y, viewport .z, viewport .w);
               gl .uniformMatrix4fv (transformShaderNode .modelViewProjectionMatrix,    false, modelViewProjectionMatrixArray);
               gl .uniformMatrix4fv (transformShaderNode .invModelViewProjectionMatrix, false, invModelViewProjectionMatrixArray);
               gl .uniform1f (transformShaderNode .scale, linePropertiesNode .getLinewidthScaleFactor () / 2);

               // Setup vertex attributes.

               if (this .transformVertexArrayObject .enable (gl, shaderNode))
               {
                  const
                     lineStippleStride  = 6 * Float32Array .BYTES_PER_ELEMENT,
                     lineStippleOffset0 = 0,
                     lineStippleOffset1 = 3 * Float32Array .BYTES_PER_ELEMENT,
                     fogDepthStride     = 2 * Float32Array .BYTES_PER_ELEMENT,
                     fogDepthOffset0    = 0,
                     fogDepthOffset1    = 1 * Float32Array .BYTES_PER_ELEMENT,
                     colorStride        = 8 * Float32Array .BYTES_PER_ELEMENT,
                     colorOffset0       = 0,
                     colorOffset1       = 4 * Float32Array .BYTES_PER_ELEMENT,
                     normalStride       = 6 * Float32Array .BYTES_PER_ELEMENT,
                     normalOffset0      = 0,
                     normalOffset1      = 3 * Float32Array .BYTES_PER_ELEMENT,
                     vertexStride       = 8 * Float32Array .BYTES_PER_ELEMENT,
                     vertexOffset0      = 0,
                     vertexOffset1      = 4 * Float32Array .BYTES_PER_ELEMENT;

                  // for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

                  transformShaderNode .enableFloatAttrib (gl, "x3d_LineStipple0", this .lineStippleBuffer, 3, lineStippleStride, lineStippleOffset0);
                  transformShaderNode .enableFloatAttrib (gl, "x3d_LineStipple1", this .lineStippleBuffer, 3, lineStippleStride, lineStippleOffset1);

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

                  if (this .hasNormals)
                  {
                     transformShaderNode .enableFloatAttrib (gl, "x3d_Normal0", this .normalBuffer, 3, normalStride, normalOffset0);
                     transformShaderNode .enableFloatAttrib (gl, "x3d_Normal1", this .normalBuffer, 3, normalStride, normalOffset1);
                  }

                  transformShaderNode .enableFloatAttrib (gl, "x3d_Vertex0", this .vertexBuffer, 4, vertexStride, vertexOffset0);
                  transformShaderNode .enableFloatAttrib (gl, "x3d_Vertex1", this .vertexBuffer, 4, vertexStride, vertexOffset1);
               }

               // Transform lines.

               gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, browser .getLineTransformFeedback ());
               gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, this .trianglesBuffer);
               gl .enable (gl .RASTERIZER_DISCARD);
               gl .beginTransformFeedback (gl .POINTS);
               gl .drawArraysInstanced (gl .POINTS, 0, this .vertexCount / 2, 2);
               gl .endTransformFeedback ();
               gl .disable (gl .RASTERIZER_DISCARD);
               gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

               // DEBUG

               // const data = new Float32Array (13 * 6 * this .vertexCount / 2);
               // gl .bindBuffer (gl .ARRAY_BUFFER, this .trianglesBuffer);
               // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
               // console .log (data);

               // Render triangles.

               if (blendModeNode)
                  blendModeNode .enable (gl);

               // Setup shader.

               shaderNode .enable (gl);
               shaderNode .setUniforms (gl, this, renderContext);

               // Setup vertex attributes.

               if (this .thickVertexArrayObject .enable (gl, shaderNode))
               {
                  const
                     stride            = 15 * Float32Array .BYTES_PER_ELEMENT,
                     lineStippleOffset = 0,
                     fogCoordOffset    = 3 * Float32Array .BYTES_PER_ELEMENT,
                     colorOffset       = 4 * Float32Array .BYTES_PER_ELEMENT,
                     normalOffset      = 8 * Float32Array .BYTES_PER_ELEMENT,
                     vertexOffset      = 11 * Float32Array .BYTES_PER_ELEMENT;

                  // for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

                  shaderNode .enableLineStippleAttribute (gl, this .trianglesBuffer, stride, lineStippleOffset);

                  if (this .hasFogCoords)
                     shaderNode .enableFogDepthAttribute (gl, this .trianglesBuffer, stride, fogCoordOffset);

                  if (this .colorMaterial)
                     shaderNode .enableColorAttribute (gl, this .trianglesBuffer, stride, colorOffset);

                   if (this .hasNormals)
                     shaderNode .enableNormalAttribute (gl, this .trianglesBuffer, stride, normalOffset);

                  shaderNode .enableVertexAttribute (gl, this .trianglesBuffer, stride, vertexOffset);

                  gl .bindBuffer (gl .ARRAY_BUFFER, null);
               }

               if (browser .getWireframe ())
               {
                  for (let i = 0, length = this .vertexCount * 3; i < length; i += 3)
                     gl .drawArrays (primitiveMode, i, 3);
               }
               else
               {
                  gl .frontFace (gl .CCW);
                  gl .enable (gl .CULL_FACE);
                  gl .drawArrays (primitiveMode, 0, this .vertexCount * 3);
               }

               if (blendModeNode)
                  blendModeNode .disable (gl);

               return;
            }
         }

         const primitiveMode = browser .getPrimitiveMode (this .getPrimitiveMode ());

         if (blendModeNode)
            blendModeNode .enable (gl);

         // Setup shader.

         shaderNode .enable (gl);
         shaderNode .setUniforms (gl, this, renderContext);

         // Setup vertex attributes.

         if (this .vertexArrayObject .enable (gl, shaderNode))
         {
            for (let i = 0, length = attribNodes .length; i < length; ++ i)
               attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

            shaderNode .enableLineStippleAttribute (gl, this .lineStippleBuffer, 0, 0);

            if (this .hasFogCoords)
               shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

            if (this .colorMaterial)
               shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

            if (this .hasNormals)
               shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

            shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
         }

         gl .drawArrays (primitiveMode, 0, this .vertexCount);

         if (blendModeNode)
            blendModeNode .disable (gl);

         gl .lineWidth (1);
      };
   })(),
   displayParticles: function (gl, renderContext, particleSystem)
   {
      const
         browser        = this .getBrowser (),
         appearanceNode = renderContext .appearanceNode,
         shaderNode     = appearanceNode .getShader (this, renderContext),
         blendModeNode  = appearanceNode .getBlendMode (),
         attribNodes    = this .getAttrib (),
         attribBuffers  = this .getAttribBuffers (),
         primitiveMode  = browser .getPrimitiveMode (this .getPrimitiveMode ());

      if (blendModeNode)
         blendModeNode .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, this, renderContext);

      // Setup vertex attributes.

      const outputParticles = particleSystem .outputParticles;

      if (outputParticles .vertexArrayObject .update (this .updateParticles) .enable (gl, shaderNode))
      {
         const particleStride = particleSystem .particleStride;

         shaderNode .enableParticleAttribute (gl, outputParticles, particleStride, particleSystem .particleOffset, 1);
         shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, particleSystem .matrixOffset, 1);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         this .updateParticles = false;
      }

      // Wireframes are always solid so only one drawing call is needed.

      gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, particleSystem .numParticles);

      if (blendModeNode)
         blendModeNode .disable (gl);

      gl .lineWidth (1);
   },
});

export default X3DLineGeometryNode;
