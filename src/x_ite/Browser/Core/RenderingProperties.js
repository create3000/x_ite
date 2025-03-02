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
import X3DBaseNode          from "../../Base/X3DBaseNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function RenderingProperties (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addAlias ("AntiAliased", this ._Antialiased);
}

Object .assign (Object .setPrototypeOf (RenderingProperties .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this ._ContentScale .addInterest ("set_contentScale__", this);

      this ._MaxTextureSize       = browser .getMaxTextureSize ();
      this ._TextureUnits         = browser .getMaxCombinedTextureUnits ();
      this ._MaxLights            = browser .getMaxLights ();
      this ._ColorDepth           = browser .getColorDepth ();
      this ._TextureMemory        = browser .getTextureMemory ();
      this ._MaxAnisotropicDegree = browser .getMaxAnisotropicDegree ();
      this ._MaxSamples           = browser .getMaxSamples ();

      this .set_contentScale__ ();
   },
   set_contentScale__ ()
   {
      const
         inches         = $("<div></div>") .hide () .css ("height", "10in") .appendTo ($("body")),
         pixelsPerPoint = inches .height () / 720 || 1;

      inches .remove ();

      this ._PixelsPerPoint = pixelsPerPoint * this ._ContentScale .getValue ();
   }
});

Object .defineProperties (RenderingProperties,
{
   typeName:
   {
      value: "RenderingProperties",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .outputOnly, "Shading",                new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxTextureSize",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "TextureUnits",           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxLights",              new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "Antialiased",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "ColorDepth",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "TextureMemory",          new Fields .SFDouble ()),
         // non-standard fields
         new X3DFieldDefinition (X3DConstants .outputOnly, "ContentScale",           new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "LogarithmicDepthBuffer", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxAnisotropicDegree",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxSamples",             new Fields .SFInt32 (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "Multisampling",          new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "PixelsPerPoint",         new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "XRSession",              new Fields .SFBool ()),
      ]),
      enumerable: true,
   }
});

export default RenderingProperties;
