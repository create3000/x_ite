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
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";

// Register key.

ExtensionKeys .add ("TRANSMISSION_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_TransmissionTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function TransmissionMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .TransmissionMaterialExtension);
}

Object .assign (Object .setPrototypeOf (TransmissionMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._transmission        .addInterest ("set_transmission__",        this);
      this ._transmissionTexture .addInterest ("set_transmissionTexture__", this);

      this .set_transmission__ ();
      this .set_transmissionTexture__ ();
   },
   set_transmission__ ()
   {
      this .transmission = Algorithm .clamp (this ._transmission .getValue (), 0, 1);
   },
   set_transmissionTexture__ ()
   {
      this .transmissionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._transmissionTexture);

      this .setTexture (0, this .transmissionTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .TRANSMISSION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_TRANSMISSION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .transmissionTextureNode ?.getShaderOptions (options, "TRANSMISSION", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_TransmissionEXT");
      uniforms .push ("x3d_TransmissionSamplerEXT");
   },
   setShaderUniforms: (() =>
   {
      const zeros = new Float32Array (16);

      return function (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
      {
         const browser = this .getBrowser ();

         gl .uniform1f (shaderObject .x3d_TransmissionEXT, this .transmission);

         // Transmission framebuffer texture

         if (renderObject .isTransmission ())
         {
            var
               transmissionUnit          = browser .getTextureUnit (),
               transmissionBufferTexture = browser .getDefaultTexture2D ();

            // Hide object by using a model view matrix with zeros.
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
         }
         else
         {
            var
               transmissionBuffer        = browser .getTransmissionBuffer (),
               transmissionUnit          = browser .getTextureUnit (),
               transmissionBufferTexture = transmissionBuffer .getColorTexture ();
         }

         gl .activeTexture (gl .TEXTURE0 + transmissionUnit);
         gl .bindTexture (gl .TEXTURE_2D, transmissionBufferTexture);
         gl .uniform1i (shaderObject .x3d_TransmissionSamplerEXT, transmissionUnit);

         if (!+this .getTextureBits ())
            return;

         this .transmissionTextureNode ?.setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_TransmissionTextureEXT,
            this ._transmissionTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      };
   })(),
});

Object .defineProperties (TransmissionMaterialExtension,
{
   ... X3DNode .getStaticProperties ("TransmissionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transmission",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transmissionTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transmissionTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default TransmissionMaterialExtension;
