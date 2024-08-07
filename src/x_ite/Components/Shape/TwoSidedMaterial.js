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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DMaterialNode      from "./X3DMaterialNode.js";
import Material             from "./Material.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

/**
 * THIS NODE IS DEPRECIATED.
 */

function TwoSidedMaterial (executionContext)
{
   console .warn ("TwoSidedMaterial is depreciated, please use Appearance backMaterial field instead.");

   X3DMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .TwoSidedMaterial);

   this .diffuseColorArray  = new Float32Array (3);
   this .specularColorArray = new Float32Array (3);
   this .emissiveColorArray = new Float32Array (3);

   this .backDiffuseColorArray  = new Float32Array (3);
   this .backSpecularColorArray = new Float32Array (3);
   this .backEmissiveColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (TwoSidedMaterial .prototype, X3DMaterialNode .prototype),
{
   initialize ()
   {
      X3DMaterialNode . prototype .initialize .call (this);

      this ._ambientIntensity .addInterest ("set_ambientIntensity__", this);
      this ._diffuseColor     .addInterest ("set_diffuseColor__",     this);
      this ._specularColor    .addInterest ("set_specularColor__",    this);
      this ._emissiveColor    .addInterest ("set_emissiveColor__",    this);
      this ._shininess        .addInterest ("set_shininess__",        this);
      this ._transparency     .addInterest ("set_transparency__",     this);

      this ._backAmbientIntensity .addInterest ("set_backAmbientIntensity__", this);
      this ._backDiffuseColor     .addInterest ("set_backDiffuseColor__",     this);
      this ._backSpecularColor    .addInterest ("set_backSpecularColor__",    this);
      this ._backEmissiveColor    .addInterest ("set_backEmissiveColor__",    this);
      this ._backShininess        .addInterest ("set_backShininess__",        this);
      this ._backTransparency     .addInterest ("set_backTransparency__",     this);

      this ._separateBackColor .addInterest ("set_transparent__", this);
      this ._transparency      .addInterest ("set_transparent__", this);
      this ._backTransparency  .addInterest ("set_transparent__", this);

      this .set_ambientIntensity__ ();
      this .set_diffuseColor__ ();
      this .set_specularColor__ ();
      this .set_emissiveColor__ ();
      this .set_shininess__ ();
      this .set_transparency__ ();

      this .set_backAmbientIntensity__ ();
      this .set_backDiffuseColor__ ();
      this .set_backSpecularColor__ ();
      this .set_backEmissiveColor__ ();
      this .set_backShininess__ ();
      this .set_backTransparency__ ();

      this .set_transparent__ ();
   },
   set_ambientIntensity__ ()
   {
      this .ambientIntensity = Math .max (this ._ambientIntensity .getValue (), 0);
   },
   set_diffuseColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .diffuseColorArray .set (this ._diffuseColor .getValue ());

      const
         diffuseColorArray = this .diffuseColorArray,
         diffuseColor      = this ._diffuseColor .getValue ();

      diffuseColorArray [0] = diffuseColor .r;
      diffuseColorArray [1] = diffuseColor .g;
      diffuseColorArray [2] = diffuseColor .b;
   },
   set_specularColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .specularColorArray .set (this ._specularColor .getValue ());

      const
         specularColorArray = this .specularColorArray,
         specularColor      = this ._specularColor .getValue ();

      specularColorArray [0] = specularColor .r;
      specularColorArray [1] = specularColor .g;
      specularColorArray [2] = specularColor .b;
   },
   set_emissiveColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .emissiveColorArray .set (this ._emissiveColor .getValue ());

      const
         emissiveColorArray = this .emissiveColorArray,
         emissiveColor      = this ._emissiveColor .getValue ();

      emissiveColorArray [0] = emissiveColor .r;
      emissiveColorArray [1] = emissiveColor .g;
      emissiveColorArray [2] = emissiveColor .b;
   },
   set_shininess__ ()
   {
      this .shininess = Algorithm .clamp (this ._shininess .getValue (), 0, 1);
   },
   set_transparency__ ()
   {
      this .transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);
   },
   /*
    * Back Material
    */
   set_backAmbientIntensity__ ()
   {
      this .backAmbientIntensity = Math .max (this ._backAmbientIntensity .getValue (), 0);
   },
   set_backDiffuseColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .backDiffuseColorArray .set (this ._backDiffuseColor .getValue ());

      const
         backDiffuseColorArray = this .backDiffuseColorArray,
         backDiffuseColor      = this ._backDiffuseColor .getValue ();

      backDiffuseColorArray [0] = backDiffuseColor .r;
      backDiffuseColorArray [1] = backDiffuseColor .g;
      backDiffuseColorArray [2] = backDiffuseColor .b;
   },
   set_backSpecularColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .backSpecularColorArray .set (this ._backSpecularColor .getValue ());

      const
         backSpecularColorArray = this .backSpecularColorArray,
         backSpecularColor      = this ._backSpecularColor .getValue ();

      backSpecularColorArray [0] = backSpecularColor .r;
      backSpecularColorArray [1] = backSpecularColor .g;
      backSpecularColorArray [2] = backSpecularColor .b;
   },
   set_backEmissiveColor__ ()
   {
      //We cannot use this in Windows Edge:
      //this .backEmissiveColorArray .set (this ._backEmissiveColor .getValue ());

      const
         backEmissiveColorArray = this .backEmissiveColorArray,
         backEmissiveColor      = this ._backEmissiveColor .getValue ();

      backEmissiveColorArray [0] = backEmissiveColor .r;
      backEmissiveColorArray [1] = backEmissiveColor .g;
      backEmissiveColorArray [2] = backEmissiveColor .b;
   },
   set_backShininess__ ()
   {
      this .backShininess = Algorithm .clamp (this ._backShininess .getValue (), 0, 1);
   },
   set_backTransparency__ ()
   {
      this .backTransparency = Algorithm .clamp (this ._backTransparency .getValue (), 0, 1);
   },
   set_transparent__ ()
   {
      this .setTransparent (this ._transparency .getValue () || (this ._separateBackColor .getValue () && this ._backTransparency .getValue ()));
   },
   getMaterialKey: Material .prototype .getMaterialKey,
   getBaseTexture: Material .prototype .getBaseTexture,
   createShader: Material .prototype .createShader,
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping, front)
   {
      if (!front && this ._separateBackColor .getValue ())
      {
         gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .backAmbientIntensity);
         gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .backDiffuseColorArray);
         gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .backSpecularColorArray);
         gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .backEmissiveColorArray);
         gl .uniform1f  (shaderObject .x3d_Shininess,        this .backShininess);
         gl .uniform1f  (shaderObject .x3d_Transparency,     this .backTransparency);
      }
      else
      {
         gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .ambientIntensity);
         gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .diffuseColorArray);
         gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .specularColorArray);
         gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .emissiveColorArray);
         gl .uniform1f  (shaderObject .x3d_Shininess,        this .shininess);
         gl .uniform1f  (shaderObject .x3d_Transparency,     this .transparency);
      }
   },
});

Object .defineProperties (TwoSidedMaterial, X3DNode .staticProperties ("TwoSidedMaterial", "Shape", 4, "material", "3.2", "4.0"));

Object .defineProperties (TwoSidedMaterial,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "separateBackColor",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientIntensity",     new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",         new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",        new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",        new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininess",            new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",         new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backAmbientIntensity", new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backDiffuseColor",     new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backSpecularColor",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backEmissiveColor",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backShininess",        new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backTransparency",     new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default TwoSidedMaterial;
