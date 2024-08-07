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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function FillProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .FillProperties);

   this .addChildObjects (X3DConstants .outputOnly, "transparent", new Fields .SFBool ());

   this .hatchColor = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (FillProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      this ._filled     .addInterest ("set_filled__",     this);
      this ._hatched    .addInterest ("set_hatched__",    this);
      this ._hatchColor .addInterest ("set_hatchColor__", this);
      this ._hatchStyle .addInterest ("set_hatchStyle__", this);

      this .set_filled__ ();
      this .set_hatched__ ();
      this .set_hatchColor__ ();
      this .set_hatchStyle__ ();

      // Preload texture.
      this .getBrowser () .getHatchStyleTexture (this .hatchStyle);
   },
   getStyleKey ()
   {
      return this .hatched ? 2 : 1;
   },
   set_filled__ ()
   {
      this .filled = this ._filled .getValue ();

      this .setTransparent (!this .filled);
   },
   set_hatched__ ()
   {
      this .hatched = this ._hatched .getValue ();
   },
   set_hatchColor__ ()
   {
      this .hatchColor [0] = this ._hatchColor [0];
      this .hatchColor [1] = this ._hatchColor [1];
      this .hatchColor [2] = this ._hatchColor [2];
   },
   set_hatchStyle__ ()
   {
      let hatchStyle = this ._hatchStyle .getValue ();

      if (hatchStyle < 1 || hatchStyle > 19)
         hatchStyle = 1;

      this .hatchStyle = hatchStyle;
   },
   setTransparent (value)
   {
      if (!!value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent ()
   {
      return this ._transparent .getValue ();
   },
   setShaderUniforms (gl, shaderObject)
   {
      const hatched = this .hatched;

      gl .uniform1i (shaderObject .x3d_FillPropertiesFilled,  this .filled);
      gl .uniform1i (shaderObject .x3d_FillPropertiesHatched, hatched);

      if (hatched)
      {
         const
            browser     = this .getBrowser (),
            texture     = browser .getHatchStyleTexture (this .hatchStyle),
            textureUnit = browser .getTexture2DUnit ();

         gl .uniform3fv (shaderObject .x3d_FillPropertiesHatchColor, this .hatchColor);
         gl .uniform1f  (shaderObject .x3d_FillPropertiesScale,      browser .getRenderingProperty ("ContentScale"));

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         gl .uniform1i (shaderObject .x3d_FillPropertiesTexture, textureUnit);
      }
   },
});

Object .defineProperties (FillProperties, X3DNode .staticProperties ("FillProperties", "Shape", 3, "fillProperties", "3.0"));

Object .defineProperties (FillProperties,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "filled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatched",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchStyle", new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchColor", new Fields .SFColor (1, 1, 1)),
      ]),
      enumerable: true,
   },
});

export default FillProperties;
