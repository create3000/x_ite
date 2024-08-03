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

import X3DSingleTextureNode from "../Texturing/X3DSingleTextureNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function X3DEnvironmentTextureNode (executionContext)
{
   X3DSingleTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DEnvironmentTextureNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_CUBE_MAP;

   this .targets = [
      gl .TEXTURE_CUBE_MAP_POSITIVE_Z, // Front
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, // Back
      gl .TEXTURE_CUBE_MAP_NEGATIVE_X, // Left
      gl .TEXTURE_CUBE_MAP_POSITIVE_X, // Right
      gl .TEXTURE_CUBE_MAP_POSITIVE_Y, // Top
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, // Bottom
   ];

   this .size   = 1;
   this .levels = 0;
}

Object .assign (Object .setPrototypeOf (X3DEnvironmentTextureNode .prototype, X3DSingleTextureNode .prototype),
{
   getTarget ()
   {
      return this .target;
   },
   getTextureType ()
   {
      return 4;
   },
   getTargets ()
   {
      return this .targets;
   },
   getSize ()
   {
      return this .size;
   },
   setSize (value)
   {
      this .size = value;

      // https://stackoverflow.com/a/25640078/1818915
      // The system will automatically clamp the specified parameter appropriately.
      // In GLSL 4 there is a textureQueryLevels function,
      // otherwise: levels = 1 + floor (log2 (size)).
      // We subtract one (1) here, because glsl texture lod starts with 0.
      this .levels = Math .floor (Math .log2 (Math .max (value, 1)));
   },
   getLevels ()
   {
      return this .levels;
   },
   clearTexture: (() =>
   {
      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         this .setSize (1);
         this .setTransparent (false);
         this .updateTextureParameters ();
      };
   })(),
   updateTextureParameters ()
   {
      X3DSingleTextureNode .prototype .updateTextureParameters .call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .size,
                                                                      this .size,
                                                                      false,
                                                                      false,
                                                                      false);
   },
   setShaderUniforms (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureCubeUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
      gl .uniform1i (channel .textureCube, textureUnit);
   },
});

Object .defineProperties (X3DEnvironmentTextureNode,
{
   typeName:
   {
      value: "X3DEnvironmentTextureNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "CubeMapTexturing", level: 1 }),
      enumerable: true,
   },
});

export default X3DEnvironmentTextureNode;
