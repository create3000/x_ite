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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DOneSidedMaterialNode from "./X3DOneSidedMaterialNode.js";
import X3DCast                 from "../../Base/X3DCast.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Algorithm               from "../../../standard/Math/Algorithm.js";

function PhysicalMaterial (executionContext)
{
   X3DOneSidedMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .PhysicalMaterial);

   this .baseColorArray = new Float32Array (3);
   this .extensionNodes = [ ];
}

Object .assign (Object .setPrototypeOf (PhysicalMaterial .prototype, X3DOneSidedMaterialNode .prototype),
{
   initialize ()
   {
      X3DOneSidedMaterialNode .prototype .initialize .call (this);

      this ._baseColor                .addInterest ("set_baseColor__",                this);
      this ._baseTexture              .addInterest ("set_baseTexture__",              this);
      this ._baseTexture              .addInterest ("set_transparent__",              this);
      this ._metallic                 .addInterest ("set_metallic__",                 this);
      this ._roughness                .addInterest ("set_roughness__",                this);
      this ._metallicRoughnessTexture .addInterest ("set_metallicRoughnessTexture__", this);
      this ._occlusionStrength        .addInterest ("set_occlusionStrength__",        this);
      this ._occlusionTexture         .addInterest ("set_occlusionTexture__",         this);
      this ._extensions               .addInterest ("set_extensions__",               this);

      this .set_baseColor__ ();
      this .set_baseTexture__ ();
      this .set_metallic__ ();
      this .set_roughness__ ();
      this .set_metallicRoughnessTexture__ ();
      this .set_occlusionStrength__ ();
      this .set_occlusionTexture__ ();
      this .set_extensions__ ();
      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return this .materialKey;
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         BASE_TEXTURE: i ++,
         EMISSIVE_TEXTURE: i ++,
         METALLIC_ROUGHNESS_TEXTURE: i ++,
         OCCLUSION_TEXTURE: i ++,
         NORMAL_TEXTURE: i ++,
      };

      return function ()
      {
         return textureIndices;
      };
   })(),
   getBaseTexture ()
   {
      return this .baseTextureNode;
   },
   set_baseColor__ ()
   {
      this .baseColorArray .set (this ._baseColor .getValue ());
   },
   set_baseTexture__ ()
   {
      const index = this .getTextureIndices () .BASE_TEXTURE;

      if (this .baseTextureNode)
      {
         this .baseTextureNode ._transparent .removeInterest ("set_transparent__",  this);
         this .baseTextureNode ._linear      .removeInterest (`setTexture${index}`, this);
      }

      this .baseTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._baseTexture);

      if (this .baseTextureNode)
      {
         this .baseTextureNode ._transparent .addInterest ("set_transparent__",  this);
         this .baseTextureNode ._linear      .addInterest (`setTexture${index}`, this, index, this .baseTextureNode);
      }

      this .setTexture (index, this .baseTextureNode);
   },
   set_metallic__ ()
   {
      this .metallic = Algorithm .clamp (this ._metallic .getValue (), 0, 1);
   },
   set_roughness__ ()
   {
      this .roughness = Algorithm .clamp (this ._roughness .getValue (), 0, 1);
   },
   set_metallicRoughnessTexture__ ()
   {
      this .metallicRoughnessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._metallicRoughnessTexture);

      this .setTexture (this .getTextureIndices () .METALLIC_ROUGHNESS_TEXTURE, this .metallicRoughnessTextureNode);
   },
   set_occlusionStrength__ ()
   {
      this .occlusionStrength = Algorithm .clamp (this ._occlusionStrength .getValue (), 0, 1);
   },
   set_occlusionTexture__ ()
   {
      this .occlusionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._occlusionTexture);

      this .setTexture (this .getTextureIndices () .OCCLUSION_TEXTURE, this .occlusionTextureNode);
   },
   set_extensions__ ()
   {
      const extensionNodes = this .extensionNodes;

      for (const extensionNode of extensionNodes)
         extensionNode .removeInterest ("set_extensionsKey__", this);

      extensionNodes .length = 0;

      for (const node of this ._extensions)
      {
         const extensionNode = X3DCast (X3DConstants .X3DMaterialExtensionNode, node);

         if (extensionNode)
            extensionNodes .push (extensionNode);
      }

      extensionNodes .sort ((a, b) => a .getExtensionKey () - b .getExtensionKey ());

      for (const extensionNode of extensionNodes)
         extensionNode .addInterest ("set_extensionsKey__", this);

      this .setTransmission (extensionNodes .some (extensionNode => extensionNode .getType () .includes (X3DConstants .TransmissionMaterialExtension)));

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () >= 2)
      {
         this .setVolumeScatter (extensionNodes .some (extensionNode => extensionNode .getType () .includes (X3DConstants .VolumeScatterMaterialExtension)) && extensionNodes .some (extensionNode => extensionNode .getType () .includes (X3DConstants .VolumeMaterialExtension)));
      }

      this .set_extensionsKey__ ();
   },
   set_extensionsKey__ ()
   {
      const extensionsKey = this .extensionNodes
         .map (extensionNode => `${extensionNode .getExtensionKey () .toString (16)}${extensionNode .getTextureBits () .toString (16)}`)
         .join ("");

      this .materialKey = `[3.${extensionsKey}]`;
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = this .getShaderOptions (geometryContext, renderContext);

      for (const extensionNode of this .extensionNodes)
         extensionNode .getShaderOptions (options);

      options .push ("X3D_PHYSICAL_MATERIAL", "X3D_MATERIAL_METALLIC_ROUGHNESS");

      if (+this .getTextureBits ())
      {
         this .baseTextureNode              ?.getShaderOptions (options, "BASE");
         this .metallicRoughnessTextureNode ?.getShaderOptions (options, "METALLIC_ROUGHNESS");
         this .occlusionTextureNode         ?.getShaderOptions (options, "OCCLUSION");
      }

      const shaderNode = browser .createShader ("Physical", "Default", "Physical", options);

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      X3DOneSidedMaterialNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

      for (const extensionNode of this .extensionNodes)
         extensionNode .setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

      gl .uniform3fv (shaderObject .x3d_BaseColor, this .baseColorArray);
      gl .uniform1f  (shaderObject .x3d_Metallic,  this .metallic);
      gl .uniform1f  (shaderObject .x3d_Roughness, this .roughness);

      if (!+this .getTextureBits ())
         return;

      this .baseTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_BaseTexture,
         this ._baseTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .metallicRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_MetallicRoughnessTexture,
         this ._metallicRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .occlusionTextureNode)
      {
         gl .uniform1f (shaderObject .x3d_OcclusionStrength, this .occlusionStrength);

         this .occlusionTextureNode .setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_OcclusionTexture,
            this ._occlusionTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      }
   },
});

Object .defineProperties (PhysicalMaterial,
{
   ... X3DNode .getStaticProperties ("PhysicalMaterial", "Shape", 2, "material", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "baseColor",                       new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "baseTextureMapping",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "baseTexture",                     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",                   new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "metallic",                        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "roughness",                       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "metallicRoughnessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "metallicRoughnessTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionStrength",               new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTextureMapping",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTexture",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",                     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",            new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",                   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",                    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "extensions",                      new Fields .MFNode ()), // experimental
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (PhysicalMaterial .prototype .getTextureIndices ()))
{
   PhysicalMaterial .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

export default PhysicalMaterial;
