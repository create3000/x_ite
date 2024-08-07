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

import X3DNode              from "../Core/X3DNode.js";
import X3DSingleTextureNode from "../Texturing/X3DSingleTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

function X3DTexture3DNode (executionContext)
{
   X3DSingleTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTexture3DNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_3D;
   this .width  = 0;
   this .height = 0;
   this .depth  = 0;
}

Object .assign (Object .setPrototypeOf (X3DTexture3DNode .prototype, X3DSingleTextureNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureNode .prototype .initialize .call (this);

      this ._repeatS .addInterest ("updateTextureParameters", this);
      this ._repeatT .addInterest ("updateTextureParameters", this);
      this ._repeatR .addInterest ("updateTextureParameters", this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
   },
   getTarget ()
   {
      return this .target;
   },
   getTextureType ()
   {
      return 3;
   },
   getWidth ()
   {
      return this .width;
   },
   setWidth (value)
   {
      this .width = value;
   },
   getHeight ()
   {
      return this .height;
   },
   setHeight (value)
   {
      this .height = value;
   },
   getDepth ()
   {
      return this .depth;
   },
   setDepth (value)
   {
      this .depth = value;
   },
   clearTexture ()
   {
      const gl = this .getBrowser () .getContext ();

      this .setTextureData (1, 1, 1, false, gl .RGBA, defaultData);
   },
   setTextureData (width, height, depth, transparent, format, data)
   {
      this .width  = width;
      this .height = height;
      this .depth  = depth;

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      // If the texture is updated with different data, it will not display
      // correctly, so we will create a new texture here.
      this .setTexture (gl .createTexture ());

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, format, width, height, depth, 0, format, gl .UNSIGNED_BYTE, data);

      this .setTransparent (transparent);
      this .updateTextureParameters ();
      this .addNodeEvent ();
   },
   updateTextureParameters ()
   {
      X3DSingleTextureNode .prototype .updateTextureParameters .call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .width,
                                                                      this .height,
                                                                      this ._repeatS .getValue (),
                                                                      this ._repeatT .getValue (),
                                                                      this ._repeatR .getValue ());
   },
   setShaderUniforms (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTexture3DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .uniform1i (channel .texture3D, textureUnit);
   },
});

Object .defineProperties (X3DTexture3DNode,
{
   typeName:
   {
      value: "X3DTexture3DNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Texturing3D", level: 1 }),
      enumerable: true,
   },
});

export default X3DTexture3DNode;
