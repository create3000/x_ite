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

import Fields          from "../../Fields.js";
import X3DNode         from "../Core/X3DNode.js";
import X3DBindableNode from "../Core/X3DBindableNode.js";
import GeometryContext from "../../Browser/Rendering/GeometryContext.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import TraverseType    from "../../Rendering/TraverseType.js";
import AlphaMode       from "../../Browser/Shape/AlphaMode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Complex         from "../../../standard/Math/Numbers/Complex.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4       from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";
import BitSet          from "../../../standard/Utility/BitSet.js";

const
   RADIUS = 1,
   SIZE   = Math .SQRT2 / 2;

function X3DBackgroundNode (executionContext)
{
   X3DBindableNode .call (this, executionContext);

   this .addType (X3DConstants .X3DBackgroundNode);

   this .addChildObjects (X3DConstants .inputOutput, "hidden", new Fields .SFBool ());

   this ._skyAngle    .setUnit ("angle");
   this ._groundAngle .setUnit ("angle");

   this .modelMatrix           = new Matrix4 ();
   this .modelViewMatrixArray  = new Float32Array (16);
   this .clipPlanes            = [ ];
   this .colors                = [ ];
   this .sphere                = [ ];
   this .textureNodes          = new Array (6);
   this .textureBits           = new BitSet ();
   this .sphereContext         = new GeometryContext ({ colorMaterial: true });
   this .texturesContext       = new GeometryContext ({ localObjectsKeys: this .sphereContext .localObjectsKeys});
}

Object .assign (Object .setPrototypeOf (X3DBackgroundNode .prototype, X3DBindableNode .prototype),
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .colorBuffer         = gl .createBuffer ();
      this .sphereBuffer        = gl .createBuffer ();
      this .texCoordBuffers     = [gl .createBuffer ()];
      this .textureBuffers      = Array .from ({length: 6}, () => gl .createBuffer ());
      this .sphereArrayObject   = new VertexArray (gl);
      this .textureArrayObjects = Array .from ({length: 6}, () => new VertexArray (gl));

      this ._groundAngle .addInterest ("build", this);
      this ._groundColor .addInterest ("build", this);
      this ._skyAngle    .addInterest ("build", this);
      this ._skyColor    .addInterest ("build", this);

      this .build ();
      this .transferRectangle ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   isTransparent ()
   {
      if (this ._hidden .getValue ())
         return true;

      if (this ._transparency .getValue () <= 0)
         return false;

      if (this .textureBits .size !== 6)
         return true;

      for (const i of this .textureBits)
      {
         if (this .textureNodes [i] ._transparent .getValue ())
            return true;
      }

      return false;
   },
   set_texture__ (index, textureNode)
   {
      this .textureNodes [index] ?.removeInterest (`set_loadState${index}__`, this);

      this .textureNodes [index] = textureNode;

      textureNode ?.addInterest (`set_loadState${index}__`, this, index, textureNode);

      this .set_loadState__ (index, textureNode);
   },
   set_loadState__ (index, textureNode)
   {
      this .setTextureBit (index, textureNode ?.checkLoadState ());
   },
   setTextureBit (bit, loadState)
   {
      this .textureBits .set (bit, loadState === X3DConstants .COMPLETE_STATE);
   },
   getColor (theta, color, angle)
   {
      const index = Algorithm .upperBound (angle, 0, angle .length, theta);

      return color [index];
   },
   build ()
   {
      const s = SIZE;

      this .colors .length = 0;
      this .sphere .length = 0;

      if (this ._groundColor .length === 0 && this ._skyColor .length == 1)
      {
         // Build cube

         this .sphere .vertices = 36;

         this .sphere .push ( s,  s, -s, 1, -s,  s, -s, 1, -s, -s, -s, 1, // Back
                              s,  s, -s, 1, -s, -s, -s, 1,  s, -s, -s, 1,
                             -s,  s,  s, 1,  s,  s,  s, 1, -s, -s,  s, 1, // Front
                             -s, -s,  s, 1,  s,  s,  s, 1,  s, -s,  s, 1,
                             -s,  s, -s, 1, -s,  s,  s, 1, -s, -s,  s, 1, // Left
                             -s,  s, -s, 1, -s, -s,  s, 1, -s, -s, -s, 1,
                              s,  s,  s, 1,  s,  s, -s, 1,  s, -s,  s, 1, // Right
                              s, -s,  s, 1,  s,  s, -s, 1,  s, -s, -s, 1,
                              s,  s,  s, 1, -s,  s,  s, 1, -s,  s, -s, 1, // Top
                              s,  s,  s, 1, -s,  s, -s, 1,  s,  s, -s, 1,
                             -s, -s,  s, 1,  s, -s,  s, 1, -s, -s, -s, 1, // Bottom
                             -s, -s, -s, 1,  s, -s,  s, 1,  s, -s, -s, 1);

         const color = this ._skyColor [0];

         for (let i = 0, vertices = this .sphere .vertices; i < vertices; ++ i)
            this .colors .push (... color, 1);
      }
      else
      {
         // Build sphere

         if (this ._skyColor .length > this ._skyAngle .length)
         {
            const vAngle = this ._skyAngle .slice ();

            if (vAngle .length === 0 || vAngle [0] > 0)
               vAngle .unshift (0);

            if (vAngle .at (-1) < Math .PI)
               vAngle .push (Math .PI);

            if (vAngle .length === 2)
               vAngle .splice (1, 0, (vAngle [0] + vAngle [1]) / 2)

            this .buildSphere (RADIUS, vAngle, this ._skyAngle, this ._skyColor, false);
         }

         if (this ._groundColor .length > this ._groundAngle .length)
         {
            const vAngle = this ._groundAngle .slice () .reverse ();

            if (vAngle .length === 0 || vAngle [0] < Math .PI / 2)
               vAngle .unshift (Math .PI / 2);

            if (vAngle .at (-1) > 0)
               vAngle .push (0);

            this .buildSphere (RADIUS, vAngle, this ._groundAngle, this ._groundColor, true);
         }
      }

      this .transferSphere ();
   },
   buildSphere: (() =>
   {
      const U_DIMENSION = 20;

      const
         z1 = new Complex (),
         z2 = new Complex (),
         y1 = new Complex (),
         y2 = new Complex (),
         y3 = new Complex (),
         y4 = new Complex ();

      return function (radius, vAngle, angle, color, bottom)
      {
         const
            vAngleMax   = bottom ? Math .PI / 2 : Math .PI,
            V_DIMENSION = vAngle .length - 1;

         for (let v = 0; v < V_DIMENSION; ++ v)
         {
            let
               theta1 = Algorithm .clamp (vAngle [v],     0, vAngleMax),
               theta2 = Algorithm .clamp (vAngle [v + 1], 0, vAngleMax);

            if (bottom)
            {
               theta1 = Math .PI - theta1;
               theta2 = Math .PI - theta2;
            }

            z1 .setPolar (radius, theta1);
            z2 .setPolar (radius, theta2);

            const
               c1 = this .getColor (vAngle [v],     color, angle),
               c2 = this .getColor (vAngle [v + 1], color, angle);

            for (let u = 0; u < U_DIMENSION; ++ u)
            {
               // p4 --- p1
               //  |   / |
               //  | /   |
               // p3 --- p2

               // The last point is the first one.
               const u1 = u < U_DIMENSION - 1 ? u + 1 : 0;

               // p1, p2
               let phi = 2 * Math .PI * (u / U_DIMENSION);
               y1 .setPolar (-z1 .imag, phi);
               y2 .setPolar (-z2 .imag, phi);

               // p3, p4
               phi = 2 * Math .PI * (u1 / U_DIMENSION);
               y3 .setPolar (-z2 .imag, phi);
               y4 .setPolar (-z1 .imag, phi);

               // Triangle 1 and 2

               this .colors .push (... c1, 1,
                                   ... c2, 1,
                                   ... c2, 1,
                                   // Triangle 2
                                   ... c1, 1,
                                   ... c1, 1,
                                   ... c2, 1);

               this .sphere .push (y1 .imag, z1 .real, y1 .real, 1,
                                   y3 .imag, z2 .real, y3 .real, 1,
                                   y2 .imag, z2 .real, y2 .real, 1,
                                   // Triangle 2
                                   y1 .imag, z1 .real, y1 .real, 1,
                                   y4 .imag, z1 .real, y4 .real, 1,
                                   y3 .imag, z2 .real, y3 .real, 1);
            }
         }
      };
   })(),
   transferSphere ()
   {
      const gl = this .getBrowser () .getContext ();

      // Transfer colors.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .colors), gl .DYNAMIC_DRAW);

      // Transfer sphere.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .sphereBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (this .sphere), gl .DYNAMIC_DRAW);

      this .sphereCount = this .sphere .length / 4;
   },
   transferRectangle: (() =>
   {
      const s = SIZE;

      const texCoords = new Float32Array ([
         1, 1, 0, 1,
         0, 1, 0, 1,
         0, 0, 0, 1,
         1, 1, 0, 1,
         0, 0, 0, 1,
         1, 0, 0, 1,
      ]);

      const frontVertices = new Float32Array ([
         s,  s, -s, 1,
        -s,  s, -s, 1,
        -s, -s, -s, 1,
         s,  s, -s, 1,
        -s, -s, -s, 1,
         s, -s, -s, 1,
      ]);

      const backVertices = new Float32Array ([
         -s,  s,  s, 1,
          s,  s,  s, 1,
          s, -s,  s, 1,
         -s,  s,  s, 1,
          s, -s,  s, 1,
         -s, -s,  s, 1,
      ]);

      const leftVertices = new Float32Array ([
         -s,  s, -s, 1,
         -s,  s,  s, 1,
         -s, -s,  s, 1,
         -s,  s, -s, 1,
         -s, -s,  s, 1,
         -s, -s, -s, 1,
      ]);

      const rightVertices = new Float32Array ([
         s,  s,  s, 1,
         s,  s, -s, 1,
         s, -s, -s, 1,
         s,  s,  s, 1,
         s, -s, -s, 1,
         s, -s,  s, 1,
      ]);

      const topVertices = new Float32Array ([
          s, s,  s, 1,
         -s, s,  s, 1,
         -s, s, -s, 1,
          s, s,  s, 1,
         -s, s, -s, 1,
          s, s, -s, 1,
      ]);

      const bottomVertices = new Float32Array ([
          s, -s, -s, 1,
         -s, -s, -s, 1,
         -s, -s,  s, 1,
          s, -s, -s, 1,
         -s, -s,  s, 1,
          s, -s,  s, 1,
      ]);

      const vertices = [
         frontVertices,
         backVertices,
         leftVertices,
         rightVertices,
         topVertices,
         bottomVertices,
      ];

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         // Transfer texCoords.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
         gl .bufferData (gl .ARRAY_BUFFER, texCoords, gl .DYNAMIC_DRAW);

         // Transfer rectangle.

         for (let i = 0; i < 6; ++ i)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, this .textureBuffers [i]);
            gl .bufferData (gl .ARRAY_BUFFER, vertices [i], gl .DYNAMIC_DRAW);
         }
      };
   })(),
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         {
            renderObject .getLayer () .getBackgrounds () .push (this);

            this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
            return;
         }
         case TraverseType .DISPLAY:
         {
            const
               localObjects     = renderObject .getLocalObjects (),
               clipPlanes       = this .clipPlanes,
               localObjectsKeys = this .sphereContext .localObjectsKeys;

            let c = 0;

            for (const localObject of localObjects)
            {
               if (localObject .isClipped)
                  clipPlanes [c ++] = localObject;
            }

            clipPlanes       .length = c;
            localObjectsKeys .length = c;
            localObjectsKeys .fill (0);
            return;
         }
      }
   },
   display: (() =>
   {
      const
         modelViewMatrix = new Matrix4 (),
         rotation        = new Rotation4 (),
         scale           = new Vector3 ();

      return function (gl, renderObject)
      {
         if (this ._hidden .getValue ())
            return;

         // Setup context.

         gl .disable (gl .DEPTH_TEST);
         gl .depthMask (false);
         gl .enable (gl .CULL_FACE);
         gl .frontFace (gl .CCW);

         // Rotate and scale background.

         modelViewMatrix .assign (this .modelMatrix);
         modelViewMatrix .multRight (renderObject .getViewMatrix () .get ());
         modelViewMatrix .get (null, rotation);
         modelViewMatrix .identity ();
         modelViewMatrix .rotate (rotation);
         modelViewMatrix .scale (scale .set (100_000, 100_000, 100_000));

         this .modelViewMatrixArray .set (modelViewMatrix);

         // Draw background sphere and texture cube.

         this .drawSphere (renderObject);

         if (+this .textureBits)
            this .drawCube (renderObject);

         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
      };
   })(),
   drawSphere (renderObject)
   {
      const transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);

      if (transparency === 1)
         return;

      const
         browser       = this .getBrowser (),
         gl            = browser .getContext (),
         sphereContext = this .sphereContext;

      sphereContext .alphaMode    = transparency ? AlphaMode .BLEND : AlphaMode .OPAQUE;
      sphereContext .renderObject = renderObject;

      const shaderNode = browser .getDefaultMaterial () .getShader (sphereContext);

      shaderNode .enable (gl);
      shaderNode .setClipPlanes (gl, this .clipPlanes);

      // Uniforms

      gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, renderObject .getProjectionMatrixArray ());
      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, this .modelViewMatrixArray);

      gl .uniform3f (shaderNode .x3d_EmissiveColor,                      1, 1, 1)
      gl .uniform1f (shaderNode .x3d_Transparency,                       transparency)
      gl .uniform1i (shaderNode .x3d_TextureCoordinateGeneratorMode [0], 0);
      gl .uniform1f (shaderNode .x3d_Exposure,                           1);
      gl .uniform1f (shaderNode .x3d_DepthScale,                         0);

      // Enable vertex attribute arrays.

      if (this .sphereArrayObject .enable (shaderNode .getProgram ()))
      {
         shaderNode .enableColorAttribute  (gl, this .colorBuffer,  0, 0);
         shaderNode .enableVertexAttribute (gl, this .sphereBuffer, 0, 0);
      }

      // Draw.

      if (transparency)
         gl .enable (gl .BLEND);
      else
         gl .disable (gl .BLEND);

      gl .drawArrays (gl .TRIANGLES, 0, this .sphereCount);

      gl .uniform1f (shaderNode .x3d_Exposure,   browser .getBrowserOption ("Exposure"));
      gl .uniform1f (shaderNode .x3d_DepthScale, 1);
   },
   drawCube: (() =>
   {
      const textureMatrixArray = new Float32Array (Matrix4 .Identity);

      return function (renderObject)
      {
         const
            browser         = this .getBrowser (),
            gl              = browser .getContext (),
            texturesContext = this .texturesContext;

         // Draw all textures.

         for (const i of this .textureBits)
         {
            const textureNode = this .textureNodes [i];

            texturesContext .alphaMode    = textureNode ._transparent .getValue () ? AlphaMode .BLEND : AlphaMode .OPAQUE;
            texturesContext .textureNode  = textureNode;
            texturesContext .renderObject = renderObject;

            const shaderNode = browser .getDefaultMaterial () .getShader (texturesContext);

            shaderNode .enable (gl);
            shaderNode .setClipPlanes (gl, this .clipPlanes);

            // Set uniforms.

            gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix,  false, renderObject .getProjectionMatrixArray ());
            gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,   false, this .modelViewMatrixArray);
            gl .uniformMatrix4fv (shaderNode .x3d_TextureMatrix [0], false, textureMatrixArray);

            gl .uniform3f (shaderNode .x3d_EmissiveColor,                      1, 1, 1);
            gl .uniform1f (shaderNode .x3d_Transparency,                       0);
            gl .uniform1i (shaderNode .x3d_TextureCoordinateGeneratorMode [0], 0);
            gl .uniform1f (shaderNode .x3d_Exposure,                           1);
            gl .uniform1f (shaderNode .x3d_DepthScale,                         0);

            this .drawRectangle (gl, browser, shaderNode, renderObject, textureNode, this .textureBuffers [i], this .textureArrayObjects [i]);

            gl .uniform1f (shaderNode .x3d_Exposure,   browser .getBrowserOption ("Exposure"));
            gl .uniform1f (shaderNode .x3d_DepthScale, 1);
         }
      };
   })(),
   drawRectangle (gl, browser, shaderNode, renderObject, textureNode, buffer, vertexArray)
   {
      textureNode .setShaderUniforms (gl, shaderNode, renderObject);

      if (vertexArray .enable (shaderNode .getProgram ()))
      {
         shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
         shaderNode .enableVertexAttribute (gl, buffer, 0, 0);
      }

      // Draw.

      if (textureNode ._transparent .getValue ())
         gl .enable (gl .BLEND);
      else
         gl .disable (gl .BLEND);

      gl .drawArrays (gl .TRIANGLES, 0, 6);

      browser .resetTextureUnits ();
   },
});

Object .defineProperties (X3DBackgroundNode, X3DNode .getStaticProperties ("X3DBackgroundNode", "EnvironmentalEffects", 1));

for (let index = 0; index < 6; ++ index)
{
   X3DBackgroundNode .prototype [`set_loadState${index}__`] = function (index, textureNode)
   {
      this .set_loadState__ (index, textureNode);
   };
}

export default X3DBackgroundNode;
