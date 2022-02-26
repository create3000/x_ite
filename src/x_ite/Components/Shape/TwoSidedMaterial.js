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
   "x_ite/Components/Shape/X3DMaterialNode",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DMaterialNode,
          X3DConstants,
          Algorithm)
{
"use strict";

   function TwoSidedMaterial (executionContext)
   {
      X3DMaterialNode .call (this, executionContext);

      this .addType (X3DConstants .TwoSidedMaterial);

      this .diffuseColor  = new Float32Array (3);
      this .specularColor = new Float32Array (3);
      this .emissiveColor = new Float32Array (3);

      this .backDiffuseColor  = new Float32Array (3);
      this .backSpecularColor = new Float32Array (3);
      this .backEmissiveColor = new Float32Array (3);
   }

   TwoSidedMaterial .prototype = Object .assign (Object .create (X3DMaterialNode .prototype),
   {
      constructor: TwoSidedMaterial,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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
      getTypeName: function ()
      {
         return "TwoSidedMaterial";
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
         X3DMaterialNode . prototype .initialize .call (this);

         this .separateBackColor_ .addInterest ("set_transparent__", this);

         this .ambientIntensity_ .addInterest ("set_ambientIntensity__", this);
         this .diffuseColor_     .addInterest ("set_diffuseColor__",     this);
         this .specularColor_    .addInterest ("set_specularColor__",    this);
         this .emissiveColor_    .addInterest ("set_emissiveColor__",    this);
         this .shininess_        .addInterest ("set_shininess__",        this);
         this .transparency_     .addInterest ("set_transparency__",     this);

         this .backAmbientIntensity_ .addInterest ("set_backAmbientIntensity__", this);
         this .backDiffuseColor_     .addInterest ("set_backDiffuseColor__",     this);
         this .backSpecularColor_    .addInterest ("set_backSpecularColor__",    this);
         this .backEmissiveColor_    .addInterest ("set_backEmissiveColor__",    this);
         this .backShininess_        .addInterest ("set_backShininess__",        this);
         this .backTransparency_     .addInterest ("set_backTransparency__",     this);

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
      },
      set_ambientIntensity__: function ()
      {
         this .ambientIntensity = Math .max (this .ambientIntensity_ .getValue (), 0);
      },
      set_diffuseColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .diffuseColor .set (this .diffuseColor_ .getValue ());

         const
            diffuseColor  = this .diffuseColor,
            diffuseColor_ = this .diffuseColor_ .getValue ();

         diffuseColor [0] = diffuseColor_ .r;
         diffuseColor [1] = diffuseColor_ .g;
         diffuseColor [2] = diffuseColor_ .b;
      },
      set_specularColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .specularColor .set (this .specularColor_ .getValue ());

         const
            specularColor  = this .specularColor,
            specularColor_ = this .specularColor_ .getValue ();

         specularColor [0] = specularColor_ .r;
         specularColor [1] = specularColor_ .g;
         specularColor [2] = specularColor_ .b;
      },
      set_emissiveColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .emissiveColor .set (this .emissiveColor_ .getValue ());

         const
            emissiveColor  = this .emissiveColor,
            emissiveColor_ = this .emissiveColor_ .getValue ();

         emissiveColor [0] = emissiveColor_ .r;
         emissiveColor [1] = emissiveColor_ .g;
         emissiveColor [2] = emissiveColor_ .b;
      },
      set_shininess__: function ()
      {
         this .shininess = Algorithm .clamp (this .shininess_ .getValue (), 0, 1);
      },
      set_transparency__: function ()
      {
         this .transparency = Algorithm .clamp (this .transparency_ .getValue (), 0, 1);

         this .set_transparent__ ();
      },
      /*
       * Back Material
       */
      set_backAmbientIntensity__: function ()
      {
         this .backAmbientIntensity = Math .max (this .backAmbientIntensity_ .getValue (), 0);
      },
      set_backDiffuseColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .backDiffuseColor .set (this .backDiffuseColor_ .getValue ());

         const
            backDiffuseColor  = this .backDiffuseColor,
            backDiffuseColor_ = this .backDiffuseColor_ .getValue ();

         backDiffuseColor [0] = backDiffuseColor_ .r;
         backDiffuseColor [1] = backDiffuseColor_ .g;
         backDiffuseColor [2] = backDiffuseColor_ .b;
      },
      set_backSpecularColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .backSpecularColor .set (this .backSpecularColor_ .getValue ());

         const
            backSpecularColor  = this .backSpecularColor,
            backSpecularColor_ = this .backSpecularColor_ .getValue ();

         backSpecularColor [0] = backSpecularColor_ .r;
         backSpecularColor [1] = backSpecularColor_ .g;
         backSpecularColor [2] = backSpecularColor_ .b;
      },
      set_backEmissiveColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .backEmissiveColor .set (this .backEmissiveColor_ .getValue ());

         const
            backEmissiveColor  = this .backEmissiveColor,
            backEmissiveColor_ = this .backEmissiveColor_ .getValue ();

         backEmissiveColor [0] = backEmissiveColor_ .r;
         backEmissiveColor [1] = backEmissiveColor_ .g;
         backEmissiveColor [2] = backEmissiveColor_ .b;
      },
      set_backShininess__: function ()
      {
         this .backShininess = Algorithm .clamp (this .backShininess_ .getValue (), 0, 1);
      },
      set_backTransparency__: function ()
      {
         this .backTransparency = Algorithm .clamp (this .backTransparency_ .getValue (), 0, 1);

         this .set_transparent__ ();
      },
      set_transparent__: function ()
      {
         this .setTransparent (Boolean (this .transparency_ .getValue () || (this .separateBackColor_ .getValue () && this .backTransparency_ .getValue ())));
      },
      getShader: function (browser, shadow)
      {
         return shadow ? browser .getShadowShader () : browser .getDefaultShader ();
      },
      setShaderUniforms: function (gl, shaderObject, front)
      {
         if (!front && this .separateBackColor_ .getValue ())
         {
            gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .backAmbientIntensity);
            gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .backDiffuseColor);
            gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .backSpecularColor);
            gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .backEmissiveColor);
            gl .uniform1f  (shaderObject .x3d_Shininess,        this .backShininess);
            gl .uniform1f  (shaderObject .x3d_Transparency,     this .backTransparency);
         }
         else
         {
            gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .ambientIntensity);
            gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .diffuseColor);
            gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .specularColor);
            gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .emissiveColor);
            gl .uniform1f  (shaderObject .x3d_Shininess,        this .shininess);
            gl .uniform1f  (shaderObject .x3d_Transparency,     this .transparency);
         }
      },
   });

   return TwoSidedMaterial;
});
