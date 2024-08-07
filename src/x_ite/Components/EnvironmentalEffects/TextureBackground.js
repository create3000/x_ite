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
import X3DBackgroundNode    from "./X3DBackgroundNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";

function TextureBackground (executionContext)
{
   X3DBackgroundNode .call (this, executionContext);

   this .addType (X3DConstants .TextureBackground);
}

Object .assign (Object .setPrototypeOf (TextureBackground .prototype, X3DBackgroundNode .prototype),
{
   initialize ()
   {
      X3DBackgroundNode .prototype .initialize .call (this);

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 4);
      this ._bottomTexture .addInterest ("set_texture__", this, 5);

      this .set_texture__ (0, this ._frontTexture);
      this .set_texture__ (1, this ._backTexture);
      this .set_texture__ (2, this ._leftTexture);
      this .set_texture__ (3, this ._rightTexture);
      this .set_texture__ (4, this ._topTexture);
      this .set_texture__ (5, this ._bottomTexture);
   },
   set_texture__ (index, textureNode)
   {
      X3DBackgroundNode .prototype .set_texture__ .call (this, index, X3DCast (X3DConstants .X3DTextureNode, textureNode));
   },
});

Object .defineProperties (TextureBackground,
{
   ... X3DNode .getStaticProperties ("TextureBackground", "EnvironmentalEffects", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyAngle",      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyColor",      new Fields .MFColor (new Color3 ())),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundAngle",   new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundColor",   new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",      new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frontTexture",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backTexture",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftTexture",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rightTexture",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topTexture",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bottomTexture", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default TextureBackground;
