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

function LineProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .LineProperties);
}

Object .assign (Object .setPrototypeOf (LineProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      browser .getRenderingProperties () ._ContentScale .addInterest ("set_linewidthScaleFactor__", this);

      this ._applied              .addInterest ("set_applied__",              this);
      this ._linetype             .addInterest ("set_linetype__",             this);
      this ._linewidthScaleFactor .addInterest ("set_linewidthScaleFactor__", this);

      this .set_applied__ ();
      this .set_linetype__ ();
      this .set_linewidthScaleFactor__ ();

      // Preload texture.
      browser .getLinetypeTexture ();
   },
   getStyleKey ()
   {
      return this .applied ? 2 : 1;
   },
   getApplied ()
   {
      return this .applied;
   },
   getLinetype ()
   {
      return this .linetype;
   },
   getLinewidthScaleFactor ()
   {
      return this .linewidthScaleFactor;
   },
   getTransformLines ()
   {
      return this .transformLines;
   },
   set_applied__ ()
   {
      this .applied = this ._applied .getValue ();
   },
   set_linetype__ ()
   {
      let linetype = this ._linetype .getValue ();

      if (linetype < 1 || linetype > 16)
         linetype = 1;

      this .linetype = linetype;
   },
   set_linewidthScaleFactor__ ()
   {
      const
         browser               = this .getBrowser (),
         gl                    = browser .getContext (),
         contentScale          = browser .getRenderingProperty ("ContentScale"),
         aliasedLineWidthRange = gl .getParameter (gl .ALIASED_LINE_WIDTH_RANGE);

      this .linewidthScaleFactor = Math .max (1, this ._linewidthScaleFactor .getValue ()) * contentScale;
      this .transformLines       = this .linewidthScaleFactor > 1 && this .linewidthScaleFactor > aliasedLineWidthRange [1];
   },
   setShaderUniforms (gl, shaderObject)
   {
      const browser = this .getBrowser ();

      if (this .applied)
      {
         const textureUnit = browser .getTextureUnit ();

         if (!this .transformLines)
            gl .lineWidth (this .linewidthScaleFactor);

         gl .uniform1i (shaderObject .x3d_LinePropertiesLinetype, this .linetype);
         gl .uniform1f (shaderObject .x3d_LineStippleScale,       browser .getLineStippleScale ());

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, browser .getLinetypeTexture () .getTexture ());
         gl .uniform1i (shaderObject .x3d_LinePropertiesTexture, textureUnit);
      }
      else
      {
         if (!this .transformLines)
            gl .lineWidth (browser .getRenderingProperty ("ContentScale"));

         gl .uniform1i (shaderObject .x3d_LinePropertiesLinetype, 16);
         gl .uniform1f (shaderObject .x3d_LineStippleScale,       1);
      }
   },
});

Object .defineProperties (LineProperties,
{
   ... X3DNode .getStaticProperties ("LineProperties", "Shape", 2, "lineProperties", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "applied",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linetype",             new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linewidthScaleFactor", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default LineProperties;
