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
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";
import Camera          from "../../../standard/Math/Geometry/Camera.js";

function ScreenPoint (browser)
{
   const gl = browser .getContext ();

   this .browser           = browser;
   this .vertexBuffer      = gl .createBuffer ();
   this .vertexArrayObject = new VertexArray (gl);
   this .vertexArray       = new Float32Array ([
      -1, -1, 0, 1,  1, -1, 0, 1,   1, 1, 0, 1,
      -1, -1, 0, 1,  1,  1, 0, 1,  -1, 1, 0, 1,
   ]);

   this .geometryContext   = new GeometryContext ({
      renderObject: new Layer (browser .getPrivateScene ()),
      alphaMode: AlphaMode .BLEND,
      geometryType: 3,
   });

   this .geometryContext .renderObject .setup ();

   // Transfer point.

   gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
   gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
}

Object .assign (ScreenPoint .prototype,
{
   display: (() =>
   {
      const
         projectionMatrixArray = new Float32Array (Matrix4 .Identity),
         modelViewMatrixArray  = new Float32Array (Matrix4 .Identity),
         clipPlanes            = [ ];

      return function (color, modelViewMatrix, projectionMatrix, frameBuffer)
      {
         // Configure HUD

         const
            browser      = this .browser,
            gl           = browser .getContext (),
            viewport     = browser .getViewport (),
            contentScale = browser .getRenderingProperty ("ContentScale");

         frameBuffer .bind ();

         // Set viewport.

         gl .viewport (... viewport);
         gl .scissor (... viewport);

         // Set projection and model view matrix.

         projectionMatrixArray .set (projectionMatrix);
         modelViewMatrixArray  .set (modelViewMatrix);

         // Set uniforms and attributes.

         const shaderNode = browser .getDefaultMaterial () .getShader (this .geometryContext);

         shaderNode .enable (gl);
         shaderNode .setClipPlanes (gl, clipPlanes);

         gl .uniformMatrix4fv (shaderNode .x3d_ProjectionMatrix, false, projectionMatrixArray);
         gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix,  false, modelViewMatrixArray);
         gl .uniform3f        (shaderNode .x3d_EmissiveColor, ... color);
         gl .uniform1f        (shaderNode .x3d_Transparency, 0);

         if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
            shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         // Draw a black and a white point.

         gl .disable (gl .DEPTH_TEST);
         gl .enable (gl .BLEND);
         gl .drawArrays (gl .TRIANGLES, 0, 6);
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

export default ScreenPoint;
