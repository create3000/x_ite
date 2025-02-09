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
import GeometryContext from "./GeometryContext.js";
import AlphaMode       from "../Shape/AlphaMode.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import Layer           from "../../Components/Layering/Layer.js"
import Color3          from "../../../standard/Math/Numbers/Color3.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Camera          from "../../../standard/Math/Geometry/Camera.js";

function ScreenLine (browser, fromWidth, toWidth, tipStart)
{
   const gl = browser .getContext ();

   this .browser           = browser;
   this .indexBuffer       = gl .createBuffer ();
   this .colorBuffer       = gl .createBuffer ();
   this .vertexBuffer      = gl .createBuffer ();
   this .vertexArrayObject = new VertexArray (gl);
   this .colorArray        = new Float32Array ([
      0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 0,  0, 0, 0, 0, // black
      1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 0,  1, 1, 1, 0, // white
   ]);
   this .vertexArray       = new Float32Array (12 * 4) .fill (1);

   this .geometryContext   = new GeometryContext ({
      renderObject: new Layer (browser .getPrivateScene ()),
      alphaMode: AlphaMode .BLEND,
      geometryType: 3,
      colorMaterial: true,
   });

   this .geometryContext .renderObject .setup ();

   gl .bindBuffer (gl .ELEMENT_ARRAY_BUFFER, this .indexBuffer);
   gl .bufferData (gl .ELEMENT_ARRAY_BUFFER, new Uint8Array ([
      0, 1, 3,  0, 3, 2,  2, 3,  5,  2,  5,  4, // black
      6, 7, 9,  6, 9, 8,  8, 9, 11,  8, 11, 10, // white
   ]), gl .STATIC_DRAW);

   this .setColor (Color3 .White);

   // Set black and white line quad vertices.

   const
      fromPoint   = new Vector3 (),
      toPoint     = new Vector3 (1, 0, 0),
      midPoint    = new Vector3 (),
      normal      = new Vector3 (),
      fromNormal  = new Vector3 (),
      toNormal    = new Vector3 (),
      vertex      = new Vector3 (),
      vertexArray = this .vertexArray;

   midPoint .assign (fromPoint) .lerp (toPoint, tipStart);

   normal .assign (toPoint)
      .subtract (fromPoint)
      .normalize ()
      .multiply (0.5)
      .set (-normal .y, normal .x, 0);

   fromNormal .assign (normal) .multiply (fromWidth + 1);
   toNormal   .assign (normal) .multiply (toWidth   + 1);

   vertexArray .set (vertex .assign (fromPoint) .add (fromNormal),      0);
   vertexArray .set (vertex .assign (fromPoint) .subtract (fromNormal), 4);
   vertexArray .set (vertex .assign (midPoint)  .add (toNormal),        8);
   vertexArray .set (vertex .assign (midPoint)  .subtract (toNormal),   12);
   vertexArray .set (vertex .assign (toPoint)   .add (toNormal),        16);
   vertexArray .set (vertex .assign (toPoint)   .subtract (toNormal),   20);

   // Set line quad vertices.

   fromNormal .assign (normal) .multiply (fromWidth);
   toNormal   .assign (normal) .multiply (toWidth);

   vertexArray .set (vertex .assign (fromPoint) .add (fromNormal),      24);
   vertexArray .set (vertex .assign (fromPoint) .subtract (fromNormal), 28);
   vertexArray .set (vertex .assign (midPoint)  .add (toNormal),        32);
   vertexArray .set (vertex .assign (midPoint)  .subtract (toNormal),   36);
   vertexArray .set (vertex .assign (toPoint)   .add (toNormal),        40);
   vertexArray .set (vertex .assign (toPoint)   .subtract (toNormal),   44);

   // Transfer line.

   gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, vertexArray, gl .STATIC_DRAW);
}

Object .assign (ScreenLine .prototype,
{
   setColor (color)
   {
      const
         browser        = this .browser,
         gl             = browser .getContext (),
         colorArray = this .colorArray;

      for (let i = 0; i < 6; ++ i)
         colorArray .set (color, 24 + i * 4);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, colorArray, gl .STATIC_DRAW);

      return this;
   },
   display: (() =>
   {
      const
         xAxis                 = new Vector3 (),
         yAxis                 = new Vector3 (),
         projectionMatrix      = new Matrix4 (),
         projectionMatrixArray = new Float32Array (Matrix4 .Identity),
         modelViewMatrixArray  = new Float32Array (Matrix4 .Identity),
         clipPlanes            = [ ];

      return function (fromPoint, toPoint, frameBuffer)
      {
         // Configure HUD

         const
            browser      = this .browser,
            gl           = browser .getContext (),
            viewport     = browser .getViewport (),
            width        = viewport [2],
            height       = viewport [3],
            contentScale = browser .getRenderingProperty ("ContentScale");

         frameBuffer .bind ();

         // Set viewport.

         gl .viewport (... viewport);
         gl .scissor (... viewport);

         // Set projection and model view matrix.

         projectionMatrixArray .set (Camera .ortho (0, width, 0, height, -1, 1, projectionMatrix));

         xAxis .assign (toPoint) .subtract (fromPoint);
         yAxis .set (-xAxis .y, xAxis .x, 0) .normalize () .multiply (contentScale);

         modelViewMatrixArray .set (xAxis,      0);
         modelViewMatrixArray .set (yAxis,      4);
         modelViewMatrixArray .set (fromPoint, 12);

         // Set uniforms and attributes.

         const shaderNode = browser .getDefaultMaterial () .getShader (this .geometryContext);

         shaderNode .enable (gl);
         shaderNode .setClipPlanes (gl, clipPlanes);

         gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
         gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
         gl .uniform1f        (shaderNode .x3d_Transparency, 0);

         if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
         {
            gl .bindBuffer (gl .ELEMENT_ARRAY_BUFFER, this .indexBuffer);

            shaderNode .enableColorAttribute  (gl, this .colorBuffer,  0, 0);
            shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
         }

         // Draw a black and a white line.

         gl .depthMask (false);
         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .BLEND);
         gl .enable (gl .CULL_FACE);
         gl .frontFace (gl .CCW);
         gl .drawElements (gl .TRIANGLES, 24, gl .UNSIGNED_BYTE, 0);
         gl .depthMask (true);
         gl .enable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
      };
   })(),
   dispose ()
   {
      const gl = this .browser .getContext ();

      gl .deleteBuffer (this .vertexBuffer);
      this .vertexArrayObject .dispose (gl);
   },
});

export default ScreenLine;
