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

import X3DTextureNode from "./X3DTextureNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DCast        from "../../Base/X3DCast.js";

function X3DSingleTextureNode (executionContext)
{
   X3DTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureNode);
}

X3DSingleTextureNode .prototype = Object .assign (Object .create (X3DTextureNode .prototype),
{
   constructor: X3DSingleTextureNode,
   initialize ()
   {
      X3DTextureNode .prototype .initialize .call (this);

      this ._textureProperties .addInterest ("set_textureProperties__", this, true);

      const gl = this .getBrowser () .getContext ();

      this .texture = gl .createTexture ();

      this .set_textureProperties__ (false);
   },
   set_textureProperties__ (update)
   {
      if (this .texturePropertiesNode)
         this .texturePropertiesNode .removeInterest ("updateTextureParameters", this);

      this .texturePropertiesNode = X3DCast (X3DConstants .TextureProperties, this ._textureProperties);

      if (! this .texturePropertiesNode)
         this .texturePropertiesNode = this .getBrowser () .getDefaultTextureProperties ();

      this .texturePropertiesNode .addInterest ("updateTextureParameters", this);

      if (update)
         this .updateTextureParameters ();
   },
   getCount ()
   {
      return 1;
   },
   getTexture ()
   {
      return this .texture;
   },
   updateTextureParameters: (function ()
   {
      // Anisotropic Filtering in WebGL is handled by an extension, use one of getExtension depending on browser:

      const ANISOTROPIC_EXT = [
         "EXT_texture_filter_anisotropic",
         "MOZ_EXT_texture_filter_anisotropic",
         "WEBKIT_EXT_texture_filter_anisotropic",
      ];

      return function (target, haveTextureProperties, textureProperties, width, height, repeatS, repeatT, repeatR)
      {
         const gl = this .getBrowser () .getContext ();

         gl .bindTexture (target, this .getTexture ());

         if (Math .max (width, height) < this .getBrowser () .getMinTextureSize () && ! haveTextureProperties)
         {
            // Don't generate MipMaps.
            gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
            gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         }
         else
         {
            if (textureProperties ._generateMipMaps .getValue ())
               gl .generateMipmap (target);

            gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter ()]);
            gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter ()]);
         }

         if (haveTextureProperties)
         {
            gl .texParameteri (target, gl .TEXTURE_WRAP_S, gl [textureProperties .getBoundaryModeS ()]);
            gl .texParameteri (target, gl .TEXTURE_WRAP_T, gl [textureProperties .getBoundaryModeT ()]);

            if (gl .getVersion () >= 2)
               gl .texParameteri (target, gl .TEXTURE_WRAP_R, gl [textureProperties .getBoundaryModeR ()]);
         }
         else
         {
            gl .texParameteri (target, gl .TEXTURE_WRAP_S, repeatS ? gl .REPEAT : gl .CLAMP_TO_EDGE);
            gl .texParameteri (target, gl .TEXTURE_WRAP_T, repeatT ? gl .REPEAT : gl .CLAMP_TO_EDGE);

            if (gl .getVersion () >= 2)
               gl .texParameteri (target, gl .TEXTURE_WRAP_R, repeatR ? gl .REPEAT : gl .CLAMP_TO_EDGE);
         }

         //gl .texParameterfv (target, gl .TEXTURE_BORDER_COLOR, textureProperties ._borderColor .getValue ());
         //gl .texParameterf  (target, gl .TEXTURE_PRIORITY,     textureProperties ._texturePriority .getValue ());

         for (const extension of ANISOTROPIC_EXT)
         {
            const ext = gl .getExtension (extension);

            if (ext)
            {
               gl .texParameterf (target, ext .TEXTURE_MAX_ANISOTROPY_EXT, textureProperties ._anisotropicDegree .getValue ());
               break;
            }
         }
      };
   })(),
   updateTextureBits (textureBits, channel = 0)
   {
      const textureType = this .getTextureType () - 1;

      textureBits .set (channel * 2 + 0, textureType & 0b01);
      textureBits .set (channel * 2 + 1, textureType & 0b10);
   },
   getShaderOptions: (function ()
   {
      const textureTypes = {
         2: "2D",
         3: "3D",
         4: "CUBE"
      };

      return function (options, channel = 0)
      {
         options .push ("X3D_TEXTURE" + channel + "_" + textureTypes [this .getTextureType ()]);
      };
   })(),
});

Object .defineProperties (X3DSingleTextureNode,
{
   typeName:
   {
      value: "X3DSingleTextureNode",
      enumerable: true,
   },
   componentName:
   {
      value: "Texturing",
      enumerable: true,
   },
});

export default X3DSingleTextureNode;
