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

import X3DNode         from "../Core/X3DNode.js";
import X3DGeometryNode from "./X3DGeometryNode.js";

function X3DPointGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   const browser = this .getBrowser ();

   this .setGeometryType (0);
   this .setPrimitiveMode (browser .getContext () .POINTS);
   this .setSolid (false);
}

Object .assign (Object .setPrototypeOf (X3DPointGeometryNode .prototype, X3DGeometryNode .prototype),
{
   intersectsLine ()
   {
      return false;
   },
   intersectsBox ()
   {
      return false;
   },
   generateTexCoords ()
   { },
   display (gl, renderContext)
   {
      const
         appearanceNode  = renderContext .appearanceNode,
         shaderNode      = appearanceNode .getShader (this, renderContext),
         renderModeNodes = appearanceNode .getRenderModes ();

      if (!renderContext .transparent)
      {
         gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .enable (gl .BLEND);
         gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);
      }

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

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (this .primitiveMode, 0, this .vertexCount);

      for (const node of renderModeNodes)
         node .disable (gl);

      if (!renderContext .transparent)
      {
         gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .disable (gl .BLEND);
         gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      }
   },
   displayInstanced (gl, renderContext, shapeNode)
   {
      const
         appearanceNode  = renderContext .appearanceNode,
         shaderNode      = appearanceNode .getShader (this, renderContext),
         renderModeNodes = appearanceNode .getRenderModes ();

      if (!renderContext .transparent)
      {
         gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .enable (gl .BLEND);
         gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);
      }

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this);

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, velocityOffset, matrixOffset, normalMatrixOffset } = shapeNode;

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

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         this .updateInstances = false;
      }

      // Wireframes are always solid so only one drawing call is needed.

      gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());

      for (const node of renderModeNodes)
         node .disable (gl);

      if (!renderContext .transparent)
      {
         gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
         gl .disable (gl .BLEND);
         gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
      }
   },
});

Object .defineProperties (X3DPointGeometryNode, X3DNode .getStaticProperties ("X3DPointGeometryNode", "Rendering", 1));

export default X3DPointGeometryNode;
