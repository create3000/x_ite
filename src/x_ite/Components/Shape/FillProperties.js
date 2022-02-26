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
   "x_ite/Components/Shape/X3DAppearanceChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DAppearanceChildNode,
          X3DConstants)
{
"use strict";

   function FillProperties (executionContext)
   {
      X3DAppearanceChildNode .call (this, executionContext);

      this .addType (X3DConstants .FillProperties);

      this .addChildObjects ("transparent", new Fields .SFBool ());

      this .transparent_ .setAccessType (X3DConstants .outputOnly);

      this .hatchColor = new Float32Array (3);
   }

   FillProperties .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
   {
      constructor: FillProperties,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "filled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatched",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchColor", new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchStyle", new Fields .SFInt32 (1)),
      ]),
      getTypeName: function ()
      {
         return "FillProperties";
      },
      getComponentName: function ()
      {
         return "Shape";
      },
      getContainerField: function ()
      {
         return "fillProperties";
      },
      initialize: function ()
      {
         X3DAppearanceChildNode .prototype .initialize .call (this);

         this .filled_     .addInterest ("set_filled__",     this);
         this .hatched_    .addInterest ("set_hatched__",    this);
         this .hatchColor_ .addInterest ("set_hatchColor__", this);

         this .set_filled__ ();
         this .set_hatched__ ();
         this .set_hatchColor__ ();
      },
      set_filled__: function ()
      {
         this .filled = this .filled_ .getValue ();

         this .setTransparent (! this .filled);
      },
      set_hatched__: function ()
      {
         this .hatched = this .hatched_ .getValue ();
      },
      set_hatchColor__: function ()
      {
         this .hatchColor [0] = this .hatchColor_ [0];
         this .hatchColor [1] = this .hatchColor_ [1];
         this .hatchColor [2] = this .hatchColor_ [2];
      },
      setTransparent: function (value)
      {
         if (value !== this .transparent_ .getValue ())
            this .transparent_ = value;
      },
      getTransparent: function ()
      {
         return this .transparent_ .getValue ();
      },
      setShaderUniforms: function (gl, shaderObject)
      {
         const hatched = this .hatched;

         gl .uniform1i (shaderObject .x3d_FillPropertiesFilled,  this .filled);
         gl .uniform1i (shaderObject .x3d_FillPropertiesHatched, hatched);

         if (hatched)
         {
            const
               browser = shaderObject .getBrowser (),
               texture = browser .getHatchStyle (this .hatchStyle_ .getValue ());

            gl .uniform3fv (shaderObject .x3d_FillPropertiesHatchColor, this .hatchColor);
            gl .activeTexture (gl .TEXTURE0 + browser .getHatchStyleUnit ());
            gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         }
      },
   });

   return FillProperties;
});
