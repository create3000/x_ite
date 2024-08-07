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

import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function ComposedVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedVolumeStyle);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._renderStyle .addInterest ("set_renderStyle__", this);

      this .set_renderStyle__ ();
   },
   addVolumeData (volumeDataNode)
   {
      X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .removeVolumeData (volumeDataNode);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getUniformsText ();

      string += "\n";
      string += "vec4\n";
      string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
      string += "{\n";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getFunctionsText ();

      string += "\n";
      string += "   return textureColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ComposedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   }
});

Object .defineProperties (ComposedVolumeStyle, X3DNode .getStaticProperties ("ComposedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"));

Object .defineProperties (ComposedVolumeStyle,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedVolumeStyle;
