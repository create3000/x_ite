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
import GeometryContext from "../Rendering/GeometryContext.js";
import AlphaMode       from "../Shape/AlphaMode.js";
import VertexArray     from "../../Rendering/VertexArray.js";
import Color3          from "../../../standard/Math/Numbers/Color3.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Camera          from "../../../standard/Math/Geometry/Camera.js";

function RubberBand (browser, fromWidth = 1, toWidth = fromWidth, tipStart = 0.8)
{
   const gl = browser .getContext ();

   this .browser               = browser;
   this .fromWidth             = fromWidth;
   this .toWidth               = toWidth;
   this .tipStart              = tipStart;
   this .lineIndexBuffer       = gl .createBuffer ();
   this .lineColorBuffer       = gl .createBuffer ();
   this .lineVertexBuffer      = gl .createBuffer ();
   this .lineVertexArrayObject = new VertexArray (gl);
   this .lineColorArray        = new Float32Array ([
      0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 1,  0, 0, 0, 0,  0, 0, 0, 0, // black
      1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 1,  1, 1, 1, 0,  1, 1, 1, 0, // white
   ]);
   this .lineVertexArray       = new Float32Array (12 * 4) .fill (1);

   this .geometryContext = new GeometryContext ({
      renderObject: browser .getWorld () .getLayer0 (),
      alphaMode: AlphaMode .BLEND,
      geometryType: 2,
      colorMaterial: true,
   });

   gl .bindBuffer (gl .ELEMENT_ARRAY_BUFFER, this .lineIndexBuffer);
   gl .bufferData (gl .ELEMENT_ARRAY_BUFFER, new Uint8Array ([
      0, 1, 3,  0, 3, 2,  2, 3,  5,  2,  5,  4, // black
      6, 7, 9,  6, 9, 8,  8, 9, 11,  8, 11, 10, // white
   ]), gl .STATIC_DRAW);

   this .setColor (Color3 .White);
}

Object .assign (RubberBand .prototype,
{
   setColor (color)
   {
      const
         browser        = this .browser,
         gl             = browser .getContext (),
         lineColorArray = this .lineColorArray;

      for (let i = 0; i < 6; ++ i)
         lineColorArray .set (color, 24 + i * 4);

      gl .bindBuffer (gl .ARRAY_BUFFER, this .lineColorBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, lineColorArray, gl .STATIC_DRAW);

      return this;
   },
   display: (() =>
   {
      const
         midPoint              = new Vector3 (),
         normal                = new Vector3 (),
         fromNormal            = new Vector3 (),
         toNormal              = new Vector3 (),
         vertex                = new Vector3 (),
         projectionMatrix      = new Matrix4 (),
         projectionMatrixArray = new Float32Array (Matrix4 .Identity),
         modelViewMatrixArray  = new Float32Array (Matrix4 .Identity),
         clipPlanes            = [ ];

      return function (fromPoint, toPoint, frameBuffer)
      {
         // Configure HUD

         const
            browser         = this .browser,
            gl              = browser .getContext (),
            viewport        = browser .getViewport (),
            width           = viewport [2],
            height          = viewport [3],
            contentScale1_2 = browser .getRenderingProperty ("ContentScale") / 2,
            lineVertexArray = this .lineVertexArray;

         frameBuffer .bind ();

         gl .viewport (... viewport);
         gl .scissor (... viewport);

         projectionMatrixArray .set (Camera .ortho (0, width, 0, height, -1, 1, projectionMatrix));

         // Set black line quad vertices.

         midPoint .assign (fromPoint) .lerp (toPoint, this .tipStart);

         normal .assign (toPoint)
            .subtract (fromPoint)
            .normalize ()
            .set (-normal .y, normal .x, 0);

         fromNormal .assign (normal) .multiply (contentScale1_2 * this .fromWidth + 0.5);
         toNormal   .assign (normal) .multiply (contentScale1_2 * this .toWidth   + 0.5);

         lineVertexArray .set (vertex .assign (fromPoint) .add (fromNormal),      0);
         lineVertexArray .set (vertex .assign (fromPoint) .subtract (fromNormal), 4);
         lineVertexArray .set (vertex .assign (midPoint)  .add (toNormal),        8);
         lineVertexArray .set (vertex .assign (midPoint)  .subtract (toNormal),   12);
         lineVertexArray .set (vertex .assign (toPoint)   .add (toNormal),        16);
         lineVertexArray .set (vertex .assign (toPoint)   .subtract (toNormal),   20);

         // Set line quad vertices.

         fromNormal .assign (normal) .multiply (contentScale1_2 * this .fromWidth);
         toNormal   .assign (normal) .multiply (contentScale1_2 * this .toWidth);

         lineVertexArray .set (vertex .assign (fromPoint) .add (fromNormal),      24);
         lineVertexArray .set (vertex .assign (fromPoint) .subtract (fromNormal), 28);
         lineVertexArray .set (vertex .assign (midPoint)  .add (toNormal),        32);
         lineVertexArray .set (vertex .assign (midPoint)  .subtract (toNormal),   36);
         lineVertexArray .set (vertex .assign (toPoint)   .add (toNormal),        40);
         lineVertexArray .set (vertex .assign (toPoint)   .subtract (toNormal),   44);

         // Transfer line.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .lineVertexBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, lineVertexArray, gl .DYNAMIC_DRAW);

         // Set uniforms and attributes.

         const shaderNode = browser .getDefaultMaterial () .getShader (this .geometryContext);

         shaderNode .enable (gl);
         shaderNode .setClipPlanes (gl, clipPlanes);

         gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
         gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
         gl .uniform1f        (shaderNode .x3d_Transparency, 0);

         if (this .lineVertexArrayObject .enable (shaderNode .getProgram ()))
         {
            gl .bindBuffer (gl .ELEMENT_ARRAY_BUFFER, this .lineIndexBuffer);

            shaderNode .enableColorAttribute  (gl, this .lineColorBuffer,  0, 0);
            shaderNode .enableVertexAttribute (gl, this .lineVertexBuffer, 0, 0);
         }

         // Draw a black and a white line.

         gl .enable (gl .BLEND);
         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .CULL_FACE);
         gl .frontFace (gl .CCW);
         gl .drawElements (gl .TRIANGLES, 24, gl .UNSIGNED_BYTE, 0);
         gl .disable (gl .BLEND);
         gl .enable (gl .DEPTH_TEST);
      };
   })(),
   dispose ()
   {
      const gl = this .browser .getContext ();

      gl .deleteBuffer (this .lineVertexBuffer);
      this .lineVertexArrayObject .dispose (gl);
   },
});

export default RubberBand;
