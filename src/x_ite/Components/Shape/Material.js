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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Shape/X3DOneSidedMaterialNode",
   "x_ite/Browser/Core/Shading",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DOneSidedMaterialNode,
          Shading,
          X3DCast,
          X3DConstants,
          Algorithm)
{
"use strict";

   function Material (executionContext)
   {
      X3DOneSidedMaterialNode .call (this, executionContext);

      this .addType (X3DConstants .Material);

      this .diffuseColor  = new Float32Array (3);
      this .specularColor = new Float32Array (3);
   }

   Material .prototype = Object .assign (Object .create (X3DOneSidedMaterialNode .prototype),
   {
      constructor: Material,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientIntensity",         new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTexture",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTextureMapping",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",             new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTexture",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTextureMapping",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",            new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",            new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininess",                new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTexture",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTextureMapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionStrength",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTexture",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTextureMapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",              new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",             new Fields .SFFloat ()),
      ]),
      getTypeName: function ()
      {
         return "Material";
      },
      getComponentName: function ()
      {
         return "Shape";
      },
      getContainerField: function ()
      {
         return "material";
      },
      initialize: function ()
      {
         X3DOneSidedMaterialNode .prototype .initialize .call (this);

         this ._ambientIntensity  .addInterest ("set_ambientIntensity__",  this);
         this ._ambientTexture    .addInterest ("set_ambientTexture__",    this);
         this ._diffuseColor      .addInterest ("set_diffuseColor__",      this);
         this ._diffuseTexture    .addInterest ("set_diffuseTexture__",    this);
         this ._specularColor     .addInterest ("set_specularColor__",     this);
         this ._specularTexture   .addInterest ("set_specularTexture__",   this);
         this ._shininess         .addInterest ("set_shininess__",         this);
         this ._shininessTexture  .addInterest ("set_shininessTexture__",  this);
         this ._occlusionStrength .addInterest ("set_occlusionStrength__", this);
         this ._occlusionTexture  .addInterest ("set_occlusionTexture__",  this);

         this .set_ambientIntensity__ ();
         this .set_ambientTexture__ ();
         this .set_diffuseColor__ ();
         this .set_diffuseTexture__ ();
         this .set_specularColor__ ();
         this .set_specularTexture__ ();
         this .set_shininess__ ();
         this .set_shininessTexture__ ();
         this .set_occlusionStrength__ ();
         this .set_occlusionTexture__ ();
         this .set_transparent__ ();
      },
      set_ambientIntensity__: function ()
      {
         this .ambientIntensity = Algorithm .clamp (this ._ambientIntensity .getValue (), 0, 1);
      },
      set_ambientTexture__: function ()
      {
         this .ambientTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._ambientTexture);

         this .setTexture (this .getTextureIndices () .AMBIENT_TEXTURE, this .ambientTextureNode);
      },
      set_diffuseColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .diffuseColor .set (this ._diffuseColor .getValue ());

         const
            diffuseColor  = this .diffuseColor,
            diffuseColor_ = this ._diffuseColor .getValue ();

         diffuseColor [0] = diffuseColor_ .r;
         diffuseColor [1] = diffuseColor_ .g;
         diffuseColor [2] = diffuseColor_ .b;
      },
      set_diffuseTexture__: function ()
      {
         if (this .diffuseTextureNode)
            this .diffuseTextureNode ._transparent .removeInterest ("set_transparent__", this);

         this .diffuseTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._diffuseTexture);

         if (this .diffuseTextureNode)
            this .diffuseTextureNode ._transparent .addInterest ("set_transparent__", this);

         this .setTexture (this .getTextureIndices () .DIFFUSE_TEXTURE, this .diffuseTextureNode);
      },
      set_specularColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .specularColor .set (this ._specularColor .getValue ());

         const
            specularColor  = this .specularColor,
            specularColor_ = this ._specularColor .getValue ();

         specularColor [0] = specularColor_ .r;
         specularColor [1] = specularColor_ .g;
         specularColor [2] = specularColor_ .b;
      },
      set_specularTexture__: function ()
      {
         this .specularTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularTexture);

         this .setTexture (this .getTextureIndices () .SPECULAR_TEXTURE, this .specularTextureNode);
      },
      set_shininess__: function ()
      {
         this .shininess = Algorithm .clamp (this ._shininess .getValue (), 0, 1);
      },
      set_shininessTexture__: function ()
      {
         this .shininessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._shininessTexture);

         this .setTexture (this .getTextureIndices () .SHININESS_TEXTURE, this .shininessTextureNode);
      },
      set_occlusionStrength__: function ()
      {
         this .occlusionStrength = Algorithm .clamp (this ._occlusionStrength .getValue (), 0, 1);
      },
      set_occlusionTexture__: function ()
      {
         this .occlusionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._occlusionTexture);

         this .setTexture (this .getTextureIndices () .OCCLUSION_TEXTURE, this .occlusionTextureNode);
      },
      set_transparent__: function ()
      {
         this .setTransparent (Boolean (this .getTransparency () ||
                               (this .diffuseTextureNode && this .diffuseTextureNode .getTransparent ())));
      },
      getTextureIndices: (function ()
      {
         const textureIndices = {
            AMBIENT_TEXTURE: 0,
            DIFFUSE_TEXTURE: 1,
            SPECULAR_TEXTURE: 2,
            EMISSIVE_TEXTURE: 3,
            SHININESS_TEXTURE: 4,
            OCCLUSION_TEXTURE: 5,
            NORMAL_TEXTURE: 6,
         };

         return function ()
         {
            return textureIndices;
         };
      })(),
      getMaterialType: function (shadows)
      {
         if (shadows || this .getTextureBits () .valueOf ())
         {
            return 2;
         }
         else
         {
            switch (this .getBrowser () .getBrowserOptions () .getShading ())
            {
               default:
                  return 1;
               case Shading .PHONG:
                  return 2;
            }
         }
      },
      createShader: function (key, geometryContext, shadows)
      {
         const
            browser = this .getBrowser (),
            options = [ ];

         if (! geometryContext .hasNormals)
            return browser .getDefaultMaterial () .createShader (key, geometryContext, shadows);

         options .push (this .getGeometryTypes () [geometryContext .geometryType])

         if (shadows)
            options .push ("X3D_SHADOWS", "X3D_PCF_FILTERING");

         options .push ("X3D_NORMALS");

         if (this .getTextureBits () .valueOf ())
         {
            options .push ("X3D_MATERIAL_TEXTURES");

            if (this .ambientTextureNode)
               options .push ("X3D_AMBIENT_TEXTURE", "X3D_AMBIENT_TEXTURE_" + this .ambientTextureNode .getTextureTypeString ());

            if (this .diffuseTextureNode)
               options .push ("X3D_DIFFUSE_TEXTURE", "X3D_DIFFUSE_TEXTURE_" + this .diffuseTextureNode .getTextureTypeString ());

            if (this .specularTextureNode)
               options .push ("X3D_SPECULAR_TEXTURE", "X3D_SPECULAR_TEXTURE_" + this .specularTextureNode .getTextureTypeString ());

            if (this .getEmissiveTexture ())
               options .push ("X3D_EMISSIVE_TEXTURE", "X3D_EMISSIVE_TEXTURE_" + this .getEmissiveTexture () .getTextureTypeString ());

            if (this .shininessTextureNode)
               options .push ("X3D_SHININESS_TEXTURE", "X3D_SHININESS_TEXTURE_" + this .shininessTextureNode .getTextureTypeString ());

            if (this .occlusionTextureNode)
               options .push ("X3D_OCCLUSION_TEXTURE", "X3D_OCCLUSION_TEXTURE_" + this .occlusionTextureNode .getTextureTypeString ());

            if (this .getNormalTexture ())
               options .push ("X3D_NORMAL_TEXTURE", "X3D_NORMAL_TEXTURE_" + this .getNormalTexture () .getTextureTypeString ());
         }

         switch (this .getMaterialType (shadows))
         {
            case 1:
            {
               options .push ("X3D_GOURAUD");

               var shaderNode = browser .createShader ("GouraudShader", "Gouraud", "Gouraud", options);

               break
            }
            case 2:
            {
               options .push ("X3D_PHONG");

               var shaderNode = browser .createShader ("PhongShader", "Default", "Phong", options);

               break;
            }
         }

         browser .setShader (key, shaderNode);

         return shaderNode;
      },
      setShaderUniforms: function (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
      {
         X3DOneSidedMaterialNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

         gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .ambientIntensity);
         gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .diffuseColor);
         gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .specularColor);
         gl .uniform1f  (shaderObject .x3d_Shininess,        this .shininess);

         if (this .getTextureBits () .valueOf ())
         {
            const
               ambientTexture   = shaderObject .x3d_AmbientTexture,
               diffuseTexture   = shaderObject .x3d_DiffuseTexture,
               specularTexture  = shaderObject .x3d_SpecularTexture,
               shininessTexture = shaderObject .x3d_ShininessTexture,
               occlusionTexture = shaderObject .x3d_OcclusionTexture;

            // Ambient parameters

            if (this .ambientTextureNode)
            {
               this .ambientTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, ambientTexture);

               gl .uniform1i (ambientTexture .textureTransformMapping,  textureTransformMapping  .get (this ._ambientTextureMapping .getValue ()) || 0);
               gl .uniform1i (ambientTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._ambientTextureMapping .getValue ()) || 0);
            }

            // Diffuse parameters

            if (this .diffuseTextureNode)
            {
               this .diffuseTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, diffuseTexture);

               gl .uniform1i (diffuseTexture .textureTransformMapping,  textureTransformMapping  .get (this ._diffuseTextureMapping .getValue ()) || 0);
               gl .uniform1i (diffuseTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._diffuseTextureMapping .getValue ()) || 0);
            }

            // Specular parameters

            if (this .specularTextureNode)
            {
               this .specularTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, specularTexture);

               gl .uniform1i (specularTexture .textureTransformMapping,  textureTransformMapping  .get (this ._specularTextureMapping .getValue ()) || 0);
               gl .uniform1i (specularTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._specularTextureMapping .getValue ()) || 0);
            }

            // Shininess parameters

            if (this .shininessTextureNode)
            {
               this .shininessTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, shininessTexture);

               gl .uniform1i (shininessTexture .textureTransformMapping,  textureTransformMapping  .get (this ._shininessTextureMapping .getValue ()) || 0);
               gl .uniform1i (shininessTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._shininessTextureMapping .getValue ()) || 0);
            }

            // Occlusion parameters

            if (this .occlusionTextureNode)
            {
               gl .uniform1f (shaderObject .x3d_OcclusionStrength, this .occlusionStrength);

               this .occlusionTextureNode .setShaderUniformsToChannel (gl, shaderObject, renderObject, occlusionTexture);

               gl .uniform1i (occlusionTexture .textureTransformMapping,  textureTransformMapping  .get (this ._occlusionTextureMapping .getValue ()) || 0);
               gl .uniform1i (occlusionTexture .textureCoordinateMapping, textureCoordinateMapping .get (this ._occlusionTextureMapping .getValue ()) || 0);
            }
         }
      },
   });

   return Material;
});
