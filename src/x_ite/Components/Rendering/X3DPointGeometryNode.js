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
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
],
function (X3DGeometryNode,
          Vector2,
          Vector3,
          Matrix4)
{
"use strict";

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
         const PICK_DISTANCE_FACTOR = 1 / 300;

         const
            point     = new Vector3 (0, 0, 0),
            vector    = new Vector3 (0, 0, 0),
            clipPoint = new Vector3 (0, 0, 0);

         return function (hitRay, clipPlanes, modelViewMatrix, intersections)
         {
            if (this .intersectsBBox (hitRay, 1))
            {
               const vertices = this .getVertices ();

               for (let i = 0, length = vertices .length; i < length; i += 4)
               {
                  point .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);

                  if (hitRay .getPerpendicularVectorToPoint (point, vector) .abs () < hitRay .point .distance (point) * PICK_DISTANCE_FACTOR)
                  {
                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                        continue;

                     intersections .push ({ texCoord: new Vector2 (0, 0), normal: new Vector3 (0, 0, 0), point: point .copy () });
                     return true;
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
      display: function (gl, context)
      {
         try
         {
            const
               browser        = context .browser,
               appearanceNode = context .shapeNode .getAppearance (),
               shaderNode     = appearanceNode .shaderNode || browser .getPointShader ();

            if (shaderNode .getValid ())
            {
               const
                  blendModeNode = appearanceNode .blendModeNode,
                  attribNodes   = this .attribNodes,
                  attribBuffers = this .attribBuffers;

               if (blendModeNode)
                  blendModeNode .enable (gl);

               // Setup shader.

               shaderNode .enable (gl);
               shaderNode .setLocalUniforms (gl, context);

               // Setup vertex attributes.

               for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

               if (this .fogCoords)
                  shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer);

               if (this .colorMaterial)
                  shaderNode .enableColorAttribute (gl, this .colorBuffer);

               shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

               gl .drawArrays (this .primitiveMode, 0, this .vertexCount);

               shaderNode .disable (gl);

               if (blendModeNode)
                  blendModeNode .disable (gl);
            }
         }
         catch (error)
         {
            // Catch error from setLocalUniforms.
            console .error (error);
         }
      },
      displayParticles: function (gl, context, particleSystem)
      {
         try
         {
            const
               browser        = context .browser,
               appearanceNode = context .shapeNode .getAppearance (),
               shaderNode     = appearanceNode .shaderNode || browser .getPointShader ();

            if (shaderNode .getValid ())
            {
               const
                  blendModeNode = appearanceNode .blendModeNode,
                  attribNodes   = this .attribNodes,
                  attribBuffers = this .attribBuffers;

               if (blendModeNode)
                  blendModeNode .enable (gl);

               // Setup shader.

               shaderNode .enable (gl);
               shaderNode .setLocalUniforms (gl, context);

               // Setup vertex attributes.

               shaderNode .enableParticleAttribute (gl, particleSystem .particleBuffer, particleSystem .stride, particleSystem .particleOffset, 1);
               shaderNode .enableParticlePositionAttribute (gl, particleSystem .positionBuffer, particleSystem .stride, particleSystem .positionOffset, 1);

               for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

               if (this .fogCoords)
                  shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer);

               if (this .colorMaterial)
                  shaderNode .enableColorAttribute (gl, this .colorBuffer);

               shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

               // Wireframes are always solid so only one drawing call is needed.

               gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);

               shaderNode .disable (gl);

               if (blendModeNode)
                  blendModeNode .disable (gl);
            }
         }
         catch (error)
         {
            // Catch error from setLocalUniforms.
            console .error (error);
         }
      },
   });

   return X3DLineGeometryNode;
});
