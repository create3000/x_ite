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
import ViewVolume      from "../../../standard/Math/Geometry/ViewVolume.js";
import Box3            from "../../../standard/Math/Geometry/Box3.js";
import Vector2         from "../../../standard/Math/Numbers/Vector2.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function X3DLineGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   const browser = this .getBrowser ();

   this .setGeometryType (0);
   this .setPrimitiveMode (browser .getContext () .POINTS);
   this .setSolid (false);
   this .setTransparent (true);
}

X3DLineGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
{
   constructor: X3DLineGeometryNode,
   intersectsLine: (function ()
   {
      const
         bbox                      = new Box3 (),
         min                       = new Vector3 (0, 0, 0),
         max                       = new Vector3 (0, 0, 0),
         screenScale1_             = new Vector3 (0, 0, 0),
         screenScale2_             = new Vector3 (0, 0, 0),
         point                     = new Vector3 (0, 0, 0),
         pointSizePoint            = new Vector3 (0, 0, 0),
         modelViewProjectionMatrix = new Matrix4 (),
         projected                 = new Vector2 (0, 0),
         clipPoint                 = new Vector3 (0, 0, 0);

      return function (hitRay, renderObject, invModelViewMatrix, appearanceNode, intersections)
      {
         const
            browser             = this .getBrowser (),
            contentScale        = browser .getRenderingProperty ("ContentScale"),
            modelViewMatrix     = renderObject .getModelViewMatrix () .get (),
            viewport            = renderObject .getViewVolume () .getViewport (),
            extents             = bbox .assign (this .getBBox ()) .multRight (modelViewMatrix) .getExtents (min, max),
            pointPropertiesNode = appearanceNode .getPointProperties (),
            pointSize1          = Math .max (1.5, pointPropertiesNode ? pointPropertiesNode .getPointSize (min) / 2 : contentScale),
            screenScale1        = renderObject .getViewpoint () .getScreenScale (min, viewport, screenScale1_), // in m/px
            offsets1            = invModelViewMatrix .multDirMatrix (screenScale1 .multiply (pointSize1)),
            pointSize2          = Math .max (1.5, pointPropertiesNode ? pointPropertiesNode .getPointSize (max) / 2 : contentScale),
            screenScale2        = renderObject .getViewpoint () .getScreenScale (max, viewport, screenScale2_), // in m/px
            offsets2            = invModelViewMatrix .multDirMatrix (screenScale2 .multiply (pointSize2));

         if (this .intersectsBBox (hitRay, offsets1 .abs () .max (offsets2 .abs ())))
         {
            const
               pointer          = this .getBrowser () .getPointer (),
               projectionMatrix = renderObject .getProjectionMatrix () .get (),
               clipPlanes       = renderObject .getLocalObjects (),
               vertices         = this .getVertices (),
               numVertices      = vertices .length;

            modelViewProjectionMatrix .assign (modelViewMatrix) .multRight (projectionMatrix);

            for (let i = 0; i < numVertices; i += 4)
            {
               point .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);

               ViewVolume .projectPointMatrix (point, modelViewProjectionMatrix, viewport, projected);

               const pointSize1_2 = Math .max (1.5, pointPropertiesNode ? pointPropertiesNode .getPointSize (modelViewMatrix .multVecMatrix (pointSizePoint .assign (point))) / 2 : 1);

               if (projected .distance (pointer) <= pointSize1_2)
               {
                  if (clipPlanes .length)
                  {
                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                        continue;
                  }

                  const
                     texCoord = pointer .copy () .subtract (projected) .divide (pointSize1_2) .add (Vector2 .One) .divide (2),
                     normal   = modelViewMatrix .submatrix .transpose () .z .copy () .normalize ();

                  intersections .push ({ texCoord: texCoord, normal: normal, point: point .copy () });
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
   { },
   display: function (gl, renderContext)
   {
      const
         appearanceNode = renderContext .appearanceNode,
         shaderNode     = appearanceNode .getShader (this, renderContext),
         blendModeNode  = appearanceNode .getBlendMode (),
         attribNodes    = this .getAttrib (),
         attribBuffers  = this .getAttribBuffers ();

      if (blendModeNode)
         blendModeNode .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, this, renderContext);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode))
      {
         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (this .primitiveMode, 0, this .vertexCount);

      if (blendModeNode)
         blendModeNode .disable (gl);
   },
   displayParticles: function (gl, renderContext, particleSystem)
   {
      const
         appearanceNode = renderContext .appearanceNode,
         shaderNode     = appearanceNode .getShader (this, renderContext),
         blendModeNode  = appearanceNode .getBlendMode (),
         attribNodes    = this .getAttrib (),
         attribBuffers  = this .getAttribBuffers ();

      if (blendModeNode)
         blendModeNode .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, this, renderContext);

      // Setup vertex attributes.

      const outputParticles = particleSystem .outputParticles;

      if (outputParticles .vertexArrayObject .update (this .updateParticles) .enable (shaderNode))
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

      gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);

      if (blendModeNode)
         blendModeNode .disable (gl);
   },
});

export default X3DLineGeometryNode;
