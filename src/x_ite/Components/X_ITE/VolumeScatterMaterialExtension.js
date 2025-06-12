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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";
import RenderPass               from "../../Rendering/RenderPass.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

const ScatterSamplesCount = 64; // Number of samples for the Burley diffusion profile.

function VolumeScatterMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .VolumeScatterMaterialExtension);

   // Private properties

   this .multiscatterColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (VolumeScatterMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._multiscatterColor .addInterest ("set_multiscatterColor__", this);
      this ._scatterAnisotropy .addInterest ("set_scatterAnisotropy__", this);

      this .set_multiscatterColor__ ();
      this .set_scatterAnisotropy__ ();
   },
   computeScatterSamples ()
   {
      const
         distance     = Math .max (... this ._multiscatterColor),
         uniformArray = [ ],
         goldenRatio  = (1 + Math .sqrt (5)) / 2;

      for (let i = 0; i < ScatterSamplesCount; ++ i)
      {
         const [r , pdf] = this .sampleBurleyDiffusionProfile (i / ScatterSamplesCount + 1 / (2 * ScatterSamplesCount), distance);

         const fabAngle = 2 * Math .PI * ((i * goldenRatio) - Math .floor (i * goldenRatio));

         uniformArray .push (fabAngle, r, pdf);
      }

      return new Float32Array (uniformArray);
   },
   sampleBurleyDiffusionProfile (u, rcpS)
   {
      /**
       * https://zero-radiance.github.io/post/sampling-diffusion/
       * Sample Normalized Burley diffusion profile.
       * 'u' is a random number (the value of the CDF): [0, 1).
       * rcp(s) = 1 / ShapeParam = ScatteringDistance.
       * 'r' is = the sampled radial distance, s.t. (u = 0 -> r = 0) and (u = 1 -> r = Inf).
       * rcp(Pdf) is the reciprocal of the corresponding PDF value.
       */

      u = 1 - u; // Convert CDF to CCDF

      const
         g = 1 + 4 * u * (2 * u + Math .sqrt (1 + 4 * u * u)),
         n = Math .pow (g, -1 / 3), // g^(-1/3)
         p = g * n * n, // g^(+1/3)
         c = 1 + p + n, // 1 + g^(+1/3) + g^(-1/3)
         x = 3 * Math .log (c / (4 * u));

      const rcpExp = ((c * c) * c) * 1 / (((4 * u) * ((c * c) + (4 * u) * (4 * u))));

      const
         r       = x * rcpS,
         rcpPdf = (8 * Math.PI * rcpS) * rcpExp;

      return [r, rcpPdf];
    },
   set_multiscatterColor__ ()
   {
      this .multiscatterColorArray .set (this ._multiscatterColor .getValue ());

      this .scatterSamples = this.computeScatterSamples ();
   },
   set_scatterAnisotropy__ ()
   {
      this .scatterAnisotropy = Algorithm .clamp (this ._scatterAnisotropy .getValue (), -1, 1);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .VOLUME_SCATTER_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");
      options .push (`X3D_SCATTER_SAMPLES_COUNT_EXT ${ScatterSamplesCount}`);
   },
   setShaderUniforms: (() =>
   {
      const zeros = new Float32Array (16);

      return function (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
      {
         const browser = this .getBrowser ();

         gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
         gl .uniform1f  (shaderObject .x3d_ScatterAnisotropyEXT, this .scatterAnisotropy);
         gl .uniform3fv (shaderObject .x3d_ScatterSamplesEXT,    this .scatterSamples);

         // Scatter framebuffer texture

         if (renderObject .getRenderPass () === RenderPass .VOLUME_SCATTER)
         {
            var
               scatterSampleUnit         = browser .getTexture2DUnit (),
               scatterIBLSampleUnit      = browser .getTexture2DUnit (),
               scatterDepthSampleUnit    = browser .getTexture2DUnit (),
               scatterSampleTexture      = browser .getDefaultTexture2D (),
               scatterIBLSampleTexture   = browser .getDefaultTexture2D (),
               scatterDepthSampleTexture = browser .getDefaultTexture2D ();

            // Hide object by using a model view matrix with zeros.
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
         }
         else
         {
            var
               scatterSampleBuffer       = browser .getVolumeScatterBuffer (),
               scatterSampleUnit         = browser .getTexture2DUnit (),
               scatterIBLSampleUnit      = browser .getTexture2DUnit (),
               scatterDepthSampleUnit    = browser .getTexture2DUnit (),
               scatterSampleTexture      = scatterSampleBuffer .getColorTexture (0),
               scatterIBLSampleTexture   = scatterSampleBuffer .getColorTexture (1),
               scatterDepthSampleTexture = scatterSampleBuffer .getDepthTexture ();
         }

         gl .activeTexture (gl .TEXTURE0 + scatterSampleUnit);
         gl .bindTexture (gl .TEXTURE_2D, scatterSampleTexture);
         gl .uniform1i (shaderObject .x3d_ScatterSamplerEXT, scatterSampleUnit);

         gl .activeTexture (gl .TEXTURE0 + scatterIBLSampleUnit);
         gl .bindTexture (gl .TEXTURE_2D, scatterIBLSampleTexture);
         gl .uniform1i (shaderObject .x3d_ScatterIBLSamplerEXT, scatterIBLSampleUnit);

         gl .activeTexture (gl .TEXTURE0 + scatterDepthSampleUnit);
         gl .bindTexture (gl .TEXTURE_2D, scatterDepthSampleTexture);
         gl .uniform1i (shaderObject .x3d_ScatterDepthSamplerEXT, scatterDepthSampleUnit);
      };
   })(),
});

Object .defineProperties (VolumeScatterMaterialExtension,
{
   ... X3DNode .getStaticProperties ("VolumeScatterMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "multiscatterColor", new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterAnisotropy", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default VolumeScatterMaterialExtension;
