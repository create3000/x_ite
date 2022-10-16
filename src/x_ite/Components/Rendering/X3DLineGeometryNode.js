/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Rendering/VertexArray",
   "standard/Math/Geometry/ViewVolume",
   "standard/Math/Geometry/Line3",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Vector4",
   "standard/Math/Numbers/Matrix4",
],
function (X3DGeometryNode,
          VertexArray,
          ViewVolume,
          Line3,
          Vector2,
          Vector3,
          Vector4,
          Matrix4)
{
"use strict";

   function X3DLineGeometryNode (executionContext)
   {
      if (!this .getExecutionContext ())
         X3DGeometryNode .call (this, executionContext);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .transformVertexArrayObject = new VertexArray ();
      this .trianglesBuffer            = gl .createBuffer ();
      this .trianglesTexCoordBuffers   = new Array (browser .getMaxTextures ()) .fill (this .trianglesBuffer);

      this .setGeometryType (1);
      this .setPrimitiveMode (browser .getContext () .LINES);
      this .setSolid (false);
   }

   X3DLineGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: X3DLineGeometryNode,
      updateVertexArrays: function ()
      {
         X3DGeometryNode .prototype .updateVertexArrays .call (this);

         this .transformVertexArrayObject .update ();
      },
      intersectsLine: (function ()
      {
         const PICK_DISTANCE_FACTOR = 1 / 300;

         const
            point1    = new Vector3 (0, 0, 0),
            point2    = new Vector3 (0, 0, 0),
            line      = new Line3 (Vector3 .Zero, Vector3 .zAxis),
            point     = new Vector3 (0, 0, 0),
            vector    = new Vector3 (0, 0, 0),
            clipPoint = new Vector3 (0, 0, 0);

         return function (hitRay, clipPlanes, modelViewMatrix, intersections)
         {
            if (this .intersectsBBox (hitRay, 1))
            {
               const vertices = this .getVertices ();

               for (let i = 0, length = vertices .length; i < length; i += 8)
               {
                  point1 .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);
                  point2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

                  line .setPoints (point1, point2);

                  if (line .getClosestPointToLine (hitRay, point))
                  {
                     if (line .getPerpendicularVectorToLine (hitRay, vector) .abs () < hitRay .point .distance (point) * PICK_DISTANCE_FACTOR)
                     {
                        const distance = point1 .distance (point2);

                        if (point1 .distance (point) <= distance && point2 .distance (point) <= distance)
                        {
                           if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                              continue;

                           intersections .push ({ texCoord: new Vector2 (0, 0), normal: new Vector3 (0, 0, 0), point: point .copy () });
                           return true;
                        }
                     }
                  }
               }
            }

            return false;
         };
      })(),
      intersectsBox: function (box, clipPlanes, modelViewMatrix)
      {
         return false;
      },
      buildTexCoords: function ()
      {
         // Line stipple support.

         const texCoords = this .getTexCoords ();

         if (texCoords .getValue () .length !== this .getVertices () .length)
         {
            const
               gl       = this .getBrowser () .getContext (),
               numLines = this .getVertices () .length / 8;

            texCoords .length = this .getVertices () .length;

            texCoords .fill (0);
            texCoords .shrinkToFit ();

            gl .bindBuffer (gl .ARRAY_BUFFER, this .trianglesBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (13 * 6 * numLines), gl .DYNAMIC_DRAW);
         }

         this .getMultiTexCoords () .push (texCoords);
      },
      updateLengthSoFar: (function ()
      {
         const
            modelViewProjectionMatrix = new Matrix4 (),
            point0                    = new Vector4 (0, 0, 0),
            point1                    = new Vector4 (0, 0, 0),
            projectedPoint0           = new Vector2 (0, 0),
            projectedPoint1           = new Vector2 (0, 0);

         return function (gl, context, linePropertiesNode)
         {
            if (linePropertiesNode .getApplied ())
            {
               // Calculate length so far for line stipples.

               if (linePropertiesNode .getLinetype () !== 1)
               {
                  const
                     viewport         = context .renderer .getViewVolume () .getViewport (),
                     projectionMatrix = context .renderer .getProjectionMatrix () .get (),
                     texCoordArray    = this .getTexCoords () .getValue (),
                     vertices         = this .getVertices (),
                     numVertices      = vertices .length;

                  modelViewProjectionMatrix .assign (context .modelViewMatrix) .multRight (projectionMatrix);

                  let lengthSoFar = 0;

                  for (let i = 0; i < numVertices; i += 8)
                  {
                     point0 .set (vertices [i],     vertices [i + 1], vertices [i + 2], vertices [i + 3]);
                     point1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6], vertices [i + 7]);

                     ViewVolume .projectPointMatrix (point0, modelViewProjectionMatrix, viewport, projectedPoint0);
                     ViewVolume .projectPointMatrix (point1, modelViewProjectionMatrix, viewport, projectedPoint1);

                     texCoordArray [i]     = projectedPoint0 .x;
                     texCoordArray [i + 1] = projectedPoint0 .y;
                     texCoordArray [i + 2] = lengthSoFar;
                     texCoordArray [i + 4] = projectedPoint0 .x;
                     texCoordArray [i + 5] = projectedPoint0 .y;
                     texCoordArray [i + 6] = lengthSoFar;

                     lengthSoFar += projectedPoint1 .subtract (projectedPoint0) .abs ();
                  }

                  gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
                  gl .bufferData (gl .ARRAY_BUFFER, texCoordArray, gl .DYNAMIC_DRAW);
               }
            }
         };
      })(),
      display: (function ()
      {
         const
            matrix                            = new Matrix4 (),
            modelViewProjectionMatrixArray    = new Float32Array (16),
            invModelViewProjectionMatrixArray = new Float32Array (16);

         return function (gl, context)
         {
            const
               browser            = context .browser,
               appearanceNode     = context .shapeNode .getAppearance (),
               linePropertiesNode = appearanceNode .getLineProperties (),
               shaderNode         = appearanceNode .shaderNode || browser .getLineShader (),
               blendModeNode      = appearanceNode .blendModeNode,
               attribNodes        = this .attribNodes,
               attribBuffers      = this .attribBuffers;

            this .updateLengthSoFar (gl, context, linePropertiesNode);

            if (linePropertiesNode .getMustTransformLines ())
            {
               const transformShaderNode = browser .getLineTransformShader ();

               if (transformShaderNode .isValid ())
               {
                  const
                     viewport         = context .renderer .getViewVolume () .getViewport (),
                     projectionMatrix = context .renderer .getProjectionMatrix () .get ();

                  modelViewProjectionMatrixArray .set (matrix .assign (context .modelViewMatrix) .multRight (projectionMatrix));
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
                        fogDepthStride  = 2 * Float32Array .BYTES_PER_ELEMENT,
                        fogDepthOffset0 = 0,
                        fogDepthOffset1 = 1 * Float32Array .BYTES_PER_ELEMENT,
                        colorStride     = 8 * Float32Array .BYTES_PER_ELEMENT,
                        colorOffset0    = 0,
                        colorOffset1    = 4 * Float32Array .BYTES_PER_ELEMENT,
                        texCoordStride  = 8 * Float32Array .BYTES_PER_ELEMENT,
                        texCoordOffset0 = 0,
                        texCoordOffset1 = 4 * Float32Array .BYTES_PER_ELEMENT,
                        vertexStride    = 8 * Float32Array .BYTES_PER_ELEMENT,
                        vertexOffset0   = 0,
                        vertexOffset1   = 4 * Float32Array .BYTES_PER_ELEMENT;

                     // for (let i = 0, length = attribNodes .length; i < length; ++ i)
                     //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

                     if (this .fogCoords)
                     {
                        transformShaderNode .enableFloatAttrib (gl, "x3d_FogDepth0", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset0);
                        transformShaderNode .enableFloatAttrib (gl, "x3d_FogDepth1", this .fogDepthBuffer, 1, fogDepthStride, fogDepthOffset1);
                     }

                     if (this .colorMaterial)
                     {
                        transformShaderNode .enableFloatAttrib (gl, "x3d_Color0", this .colorBuffer, 4, colorStride, colorOffset0);
                        transformShaderNode .enableFloatAttrib (gl, "x3d_Color1", this .colorBuffer, 4, colorStride, colorOffset1);
                     }

                     transformShaderNode .enableFloatAttrib (gl, "x3d_TexCoord0", this .texCoordBuffers [0], 4, texCoordStride, texCoordOffset0);
                     transformShaderNode .enableFloatAttrib (gl, "x3d_TexCoord1", this .texCoordBuffers [0], 4, texCoordStride, texCoordOffset1);

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
                  shaderNode .setLocalUniforms (gl, context);

                  // Setup vertex attributes.

                  if (this .vertexArrayObject .enable (gl, shaderNode))
                  {
                     const
                        stride         = 13 * Float32Array .BYTES_PER_ELEMENT,
                        fogCoordOffset = 0,
                        colorOffset    = 1 * Float32Array .BYTES_PER_ELEMENT,
                        texCoordOffset = 5 * Float32Array .BYTES_PER_ELEMENT,
                        vertexOffset   = 9 * Float32Array .BYTES_PER_ELEMENT;

                     // for (let i = 0, length = attribNodes .length; i < length; ++ i)
                     //    attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

                     if (this .fogCoords)
                        shaderNode .enableFogDepthAttribute (gl, this .trianglesBuffer, stride, fogCoordOffset);

                     if (this .colorMaterial)
                        shaderNode .enableColorAttribute (gl, this .trianglesBuffer, stride, colorOffset);

                     shaderNode .enableTexCoordAttribute (gl, this .trianglesTexCoordBuffers, stride, texCoordOffset);
                     shaderNode .enableVertexAttribute   (gl, this .trianglesBuffer,          stride, vertexOffset);

                     gl .bindBuffer (gl .ARRAY_BUFFER, null);
                  }

                  gl .frontFace (gl .CCW);
                  gl .enable (gl .CULL_FACE);
                  gl .drawArrays (shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : gl .TRIANGLES, 0, this .vertexCount * 3);

                  if (blendModeNode)
                     blendModeNode .disable (gl);
               }
            }
            else if (shaderNode .isValid ())
            {
               if (blendModeNode)
                  blendModeNode .enable (gl);

               // Setup shader.

               shaderNode .enable (gl);
               shaderNode .setLocalUniforms (gl, context);

               // Setup vertex attributes.

               if (this .vertexArrayObject .enable (gl, shaderNode))
               {
                  for (let i = 0, length = attribNodes .length; i < length; ++ i)
                     attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

                  if (this .fogCoords)
                     shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

                  if (this .colorMaterial)
                     shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

                  shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
                  shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);
               }

               gl .drawArrays (shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode, 0, this .vertexCount);

               if (blendModeNode)
                  blendModeNode .disable (gl);
            }
         };
      })(),
      displayParticles: function (gl, context, particleSystem)
      {
         const
            browser        = context .browser,
            appearanceNode = context .shapeNode .getAppearance (),
            shaderNode     = appearanceNode .shaderNode || browser .getLineShader (),
            blendModeNode  = appearanceNode .blendModeNode,
            attribNodes    = this .attribNodes,
            attribBuffers  = this .attribBuffers;

         if (shaderNode .isValid ())
         {
            if (blendModeNode)
               blendModeNode .enable (gl);

            // Setup shader.

            shaderNode .enable (gl);
            shaderNode .setLocalUniforms (gl, context);

            // Setup vertex attributes.

            const outputParticles = particleSystem .outputParticles;

            if (this .updateParticles)
            {
               this .updateParticles = false;

               outputParticles .vertexArrayObject .update ();
            }

            if (outputParticles .vertexArrayObject .enable (gl, shaderNode))
            {
               const particleStride = particleSystem .particleStride;

               shaderNode .enableParticleAttribute (gl, outputParticles, particleStride, particleSystem .particleOffset, 1);
               shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, particleSystem .matrixOffset, 1);

               for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

               if (this .fogCoords)
                  shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

               if (this .colorMaterial)
                  shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

               shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
               shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);
            }

            // Wireframes are always solid so only one drawing call is needed.

            const primitiveMode = shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode;

            gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, particleSystem .numParticles);

            if (blendModeNode)
               blendModeNode .disable (gl);
         }
      },
   });

   return X3DLineGeometryNode;
});
