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

import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DEnvironmentTextureNode from "./X3DEnvironmentTextureNode.js";
import DependentRenderer         from "../../Rendering/DependentRenderer.js";
import TextureBuffer             from "../../Rendering/TextureBuffer.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import TraverseType              from "../../Rendering/TraverseType.js";
import Camera                    from "../../../standard/Math/Geometry/Camera.js";
import ViewVolume                from "../../../standard/Math/Geometry/ViewVolume.js";
import Rotation4                 from "../../../standard/Math/Numbers/Rotation4.js";
import Vector3                   from "../../../standard/Math/Numbers/Vector3.js";
import Vector4                   from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4                   from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm                 from "../../../standard/Math/Algorithm.js";

function GeneratedCubeMapTexture (executionContext)
{
   X3DEnvironmentTextureNode .call (this, executionContext);

   this .addType (X3DConstants .GeneratedCubeMapTexture);

   this .dependentRenderers = new WeakMap ();
   this .projectionMatrix   = new Matrix4 ();
   this .modelMatrix        = new Matrix4 ();
   this .viewVolume         = new ViewVolume ();
}

Object .assign (Object .setPrototypeOf (GeneratedCubeMapTexture .prototype, X3DEnvironmentTextureNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentTextureNode .prototype .initialize .call (this);

      this ._size .addInterest ("set_size__", this);

      this .set_size__ ();
   },
   set_size__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Transfer 6 textures of size x size pixels.

      const size = gl .getVersion () >= 2
         ? this ._size .getValue ()
         : Algorithm .nextPowerOfTwo (this ._size .getValue ());

      if (size > 0)
      {
         // Upload default data.

         const defaultData = new Uint8Array (size * size * 4);

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         this .updateTextureParameters ();

         // Properties

         this .viewport    = new Vector4 (0, 0, size, size);
         this .frameBuffer = new TextureBuffer (this .getBrowser (), size, size);

         this .setSize (size);
      }
      else
      {
         this .frameBuffer = null;

         this .setSize (0);
      }
   },
   traverse (type, renderObject)
   {
      // TraverseType .DISPLAY

      if (this ._update .getValue () === "NONE")
         return;

      if (! renderObject .isIndependent ())
         return;

      if (! this .frameBuffer)
         return;

      renderObject .getGeneratedCubeMapTextures () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ()) .multRight (renderObject .getCameraSpaceMatrix () .get ());
   },
   renderTexture: (() =>
   {
      // Rotations to negated normals of the texture cube.

      const rotations = [
         new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0, -1)), // front
         new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0,  1)), // back
         new Rotation4 (Vector3 .zAxis, new Vector3 ( 1,  0,  0)), // left
         new Rotation4 (Vector3 .zAxis, new Vector3 (-1,  0,  0)), // right
         new Rotation4 (Vector3 .zAxis, new Vector3 ( 0, -1,  0)), // top
         new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  1,  0)), // bottom
      ];

      // Negated scales of the texture cube.

      const scales = [
         new Vector3 (-1, -1,  1), // front
         new Vector3 (-1, -1,  1), // back
         new Vector3 (-1, -1,  1), // left
         new Vector3 (-1, -1,  1), // right
         new Vector3 ( 1,  1,  1), // top
         new Vector3 ( 1,  1,  1), // bottom
      ];

      const invCameraSpaceMatrix = new Matrix4 ();

      return function (renderObject)
      {
         if (!this .dependentRenderers .has (renderObject))
         {
            const dependentRenderer = new DependentRenderer (this .getExecutionContext (), renderObject, this);

            dependentRenderer .setup ();

            this .dependentRenderers .set (renderObject, dependentRenderer);
         }

         const
            dependentRenderer  = this .dependentRenderers .get (renderObject),
            browser            = this .getBrowser (),
            layer              = renderObject .getLayer (),
            gl                 = browser .getContext (),
            background         = dependentRenderer .getBackground (),
            navigationInfoNode = dependentRenderer .getNavigationInfo (),
            viewpointNode      = dependentRenderer .getViewpoint (),
            headlightContainer = browser .getHeadlight (),
            headlight          = navigationInfoNode ._headlight .getValue (),
            nearValue          = viewpointNode .getNearDistance (navigationInfoNode),
            farValue           = viewpointNode .getFarDistance (navigationInfoNode),
            projectionMatrix   = Camera .perspective (Algorithm .radians (90), nearValue, farValue, 1, 1, this .projectionMatrix),
            width              = this .frameBuffer .getWidth (),
            height             = this .frameBuffer .getHeight ();

         this .setTransparent (background .isTransparent ());

         dependentRenderer .setFramebuffer (this .frameBuffer);
         dependentRenderer .getViewVolumes () .push (this .viewVolume .set (projectionMatrix, this .viewport, this .viewport));
         dependentRenderer .getProjectionMatrix () .push (projectionMatrix);

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            gl .clear (gl .COLOR_BUFFER_BIT); // Always clear, X3DBackground could be transparent!

            // Setup inverse texture space matrix.

            dependentRenderer .getCameraSpaceMatrix () .push (this .modelMatrix);
            dependentRenderer .getCameraSpaceMatrix () .rotate (rotations [i]);
            dependentRenderer .getCameraSpaceMatrix () .scale (scales [i]);

            dependentRenderer .getViewMatrix () .push (invCameraSpaceMatrix .assign (dependentRenderer .getCameraSpaceMatrix () .get ()) .inverse ());
            dependentRenderer .getModelViewMatrix () .push (invCameraSpaceMatrix);

            // Setup headlight if enabled.

            if (headlight)
            {
               headlightContainer .modelViewMatrix .push (invCameraSpaceMatrix);
               headlightContainer .modelViewMatrix .multLeft (viewpointNode .getCameraSpaceMatrix ());
            }

            // Render layer's children.

            layer .traverse (TraverseType .DISPLAY, dependentRenderer);

            // Pop matrices.

            if (headlight)
               headlightContainer .modelViewMatrix .pop ();

            dependentRenderer .getModelViewMatrix ()   .pop ();
            dependentRenderer .getCameraSpaceMatrix () .pop ();
            dependentRenderer .getViewMatrix ()        .pop ();

            // Transfer image.

            gl .bindTexture (this .getTarget (), this .getTexture ());
            gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, 0, 0, width, height);
         }

         this .updateTextureParameters ();

         dependentRenderer .getProjectionMatrix () .pop ();
         dependentRenderer .getViewVolumes      () .pop ();

         if (this ._update .getValue () === "NEXT_FRAME_ONLY")
            this ._update = "NONE";
      };
   })(),
   setShaderUniforms: (() =>
   {
      const zeros = new Float32Array (16); // Trick: zero model view matrix to hide object.

      return function (gl, shaderObject, renderObject, channel)
      {
         X3DEnvironmentTextureNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, channel);

         if (renderObject .getNode () === this)
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
      };
   })(),
});

Object .defineProperties (GeneratedCubeMapTexture,
{
   ... X3DNode .getStaticProperties ("GeneratedCubeMapTexture", "CubeMapTexturing", 3, "texture", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "update",            new Fields .SFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",              new Fields .SFInt32 (128)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeneratedCubeMapTexture;
