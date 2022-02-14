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
   "x_ite/Fields",
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
   "x_ite/Rendering/DependentRenderer",
   "x_ite/Rendering/TextureBuffer",
   "x_ite/Bits/X3DConstants",
   "x_ite/Bits/TraverseType",
   "standard/Math/Geometry/Camera",
   "standard/Math/Geometry/ViewVolume",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Vector4",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode,
          DependentRenderer,
          TextureBuffer,
          X3DConstants,
          TraverseType,
          Camera,
          ViewVolume,
          Rotation4,
          Vector3,
          Vector4,
          Matrix4,
          Algorithm)
{
"use strict";

   // Rotations to negated normals of the texture cube.

   var rotations = [
      new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0, -1)), // front
      new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0,  1)), // back
      new Rotation4 (Vector3 .zAxis, new Vector3 ( 1,  0,  0)), // left
      new Rotation4 (Vector3 .zAxis, new Vector3 (-1,  0,  0)), // right
      new Rotation4 (Vector3 .zAxis, new Vector3 ( 0, -1,  0)), // top
      new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  1,  0)), // bottom
   ];

   // Negated scales of the texture cube.

   var scales = [
      new Vector3 (-1, -1,  1), // front
      new Vector3 (-1, -1,  1), // back
      new Vector3 (-1, -1,  1), // left
      new Vector3 (-1, -1,  1), // right
      new Vector3 ( 1,  1,  1), // top
      new Vector3 ( 1,  1,  1), // bottom
   ];

   var invCameraSpaceMatrix = new Matrix4 ();

   function GeneratedCubeMapTexture (executionContext)
   {
      X3DEnvironmentTextureNode .call (this, executionContext);

      this .addType (X3DConstants .GeneratedCubeMapTexture);

      this .renderer         = new DependentRenderer (executionContext);
      this .projectionMatrix = new Matrix4 ();
      this .modelMatrix      = new Matrix4 ();
      this .viewVolume       = new ViewVolume ();
   }

   GeneratedCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
   {
      constructor: GeneratedCubeMapTexture,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "update",            new Fields .SFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",              new Fields .SFInt32 (128)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "GeneratedCubeMapTexture";
      },
      getComponentName: function ()
      {
         return "CubeMapTexturing";
      },
      getContainerField: function ()
      {
         return "texture";
      },
      initialize: function ()
      {
         X3DEnvironmentTextureNode .prototype .initialize .call (this);

         this .renderer .setup ();

         // Transfer 6 textures of size x size pixels.

         var size = Algorithm .nextPowerOfTwo (this .size_ .getValue ());

         if (size > 0)
         {
            size = Algorithm .nextPowerOfTwo (size);

            // Upload default data.

            var
               gl          = this .getBrowser () .getContext (),
               defaultData = new Uint8Array (size * size * 4);

            gl .bindTexture (this .getTarget (), this .getTexture ());

            for (var i = 0; i < 6; ++ i)
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

            // Properties

            this .viewport    = new Vector4 (0, 0, size, size);
            this .frameBuffer = new TextureBuffer (this .getBrowser (), size, size);
         }
      },
      traverse: function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         if (this .update_ .getValue () === "NONE")
            return;

         if (! this .frameBuffer)
            return;

         //if (renderObject .getBrowser () !== this .getBrowser ())
         //	return; // Could be interesting for four-side-view

         if (! renderObject .isIndependent ())
            return;

         renderObject .getGeneratedCubeMapTextures () .push (this);

         this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ()) .multRight (renderObject .getCameraSpaceMatrix () .get ());
      },
      renderTexture: function (renderObject)
      {
         this .renderer .setRenderer (renderObject);

         var
            renderer           = this .renderer,
            browser            = renderObject .getBrowser (),
            layer              = renderObject .getLayer (),
            gl                 = browser .getContext (),
            background         = renderer .getBackground (),
            navigationInfo     = renderer .getNavigationInfo (),
            viewpoint          = renderer .getViewpoint (),
            headlightContainer = browser .getHeadlight (),
            headlight          = navigationInfo .headlight_ .getValue (),
            nearValue          = navigationInfo .getNearValue (),
            farValue           = navigationInfo .getFarValue (viewpoint),
            projectionMatrix   = Camera .perspective (Algorithm .radians (90.0), nearValue, farValue, 1, 1, this .projectionMatrix);

         this .setTransparent (background .getTransparent ());

         this .frameBuffer .bind ();

         renderer .getViewVolumes () .push (this .viewVolume .set (projectionMatrix, this .viewport, this .viewport));
         renderer .getProjectionMatrix () .pushMatrix (projectionMatrix);

         gl .bindTexture (this .getTarget (), this .getTexture ());
         gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

         for (var i = 0; i < 6; ++ i)
         {
            gl .clear (gl .COLOR_BUFFER_BIT); // Always clear, X3DBackground could be transparent!

            // Setup inverse texture space matrix.

            renderer .getCameraSpaceMatrix () .pushMatrix (this .modelMatrix);
            renderer .getCameraSpaceMatrix () .rotate (rotations [i]);
            renderer .getCameraSpaceMatrix () .scale (scales [i]);

            try
            {
               renderer .getViewMatrix () .pushMatrix (invCameraSpaceMatrix .assign (renderer .getCameraSpaceMatrix () .get ()) .inverse ());
            }
            catch (error)
            {
               console .log (error);

               renderer .getViewMatrix () .pushMatrix (Matrix4 .Identity);
            }

            renderer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);

            // Setup headlight if enabled.

            if (headlight)
            {
               headlightContainer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);
               headlightContainer .getModelViewMatrix () .multLeft (viewpoint .getCameraSpaceMatrix ());
            }

            // Render layer's children.

            layer .traverse (TraverseType .DISPLAY, renderer);

            // Pop matrices.

            if (headlight)
               headlightContainer .getModelViewMatrix () .pop ();

            renderer .getModelViewMatrix ()   .pop ();
            renderer .getCameraSpaceMatrix () .pop ();
            renderer .getViewMatrix ()        .pop ();

            // Transfer image.

            var
               data   = this .frameBuffer .readPixels (),
               width  = this .frameBuffer .getWidth (),
               height = this .frameBuffer .getHeight ();

            gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
         }

         this .updateTextureProperties ();

         renderer .getProjectionMatrix () .pop ();
         renderer .getViewVolumes      () .pop ();

         this .frameBuffer .unbind ();

         if (this .update_ .getValue () === "NEXT_FRAME_ONLY")
            this .update_ = "NONE";
      },
      setShaderUniformsToChannel: (function ()
      {
         const Zero = new Float32Array (16); // Trick: zero model view matrix to hide object.

         return function (gl, shaderObject, renderObject, i)
         {
            X3DEnvironmentTextureNode .prototype .setShaderUniformsToChannel .call (this, gl, shaderObject, renderObject, i);

            if (! renderObject .isIndependent ())
               gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, Zero);
         };
      })(),
   });

   return GeneratedCubeMapTexture;
});
