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

import Fields         from "../../Fields.js";
import X3DTextureNode from "./X3DTextureNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DCast        from "../../Base/X3DCast.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import Algorithm      from "../../../standard/Math/Algorithm.js";

function X3DSingleTextureNode (executionContext)
{
   X3DTextureNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureNode);

   this .addChildObjects (X3DConstants .outputOnly, "linear", new Fields .SFBool ())

   this .matrix = new Float32Array (Matrix4 .Identity);
}

Object .assign (Object .setPrototypeOf (X3DSingleTextureNode .prototype, X3DTextureNode .prototype),
{
   initialize ()
   {
      X3DTextureNode .prototype .initialize .call (this);

      this ._textureProperties .addInterest ("set_textureProperties__", this, true);

      const gl = this .getBrowser () .getContext ();

      this .texture = gl .createTexture ();

      this .set_textureProperties__ (false);
   },
   getCount ()
   {
      return 1;
   },
   getTextureTypeString ()
   {
      switch (this .getTextureType ())
      {
         case 1:                // ImageTexture, MovieTexture (flipY)
         case 2: return "2D";   // PixelTexture
         case 3: return "3D";   // X3DTexture3DNode
         case 4: return "CUBE"; // X3DEnvironmentTextureNode
      }
   },
   getTexture ()
   {
      return this .texture;
   },
   setTexture (texture)
   {
      const gl = this .getBrowser () .getContext ();

      gl .deleteTexture (this .texture);

      this .texture = texture;

      this .addNodeEvent ();
   },
   isLinear ()
   {
      return this ._linear .getValue ();
   },
   setLinear (value)
   {
      if (value !== this ._linear .getValue ())
         this ._linear = value;
   },
   getMatrix ()
   {
      // Normally the identity matrix or a flipY matrix.
      return this .matrix;
   },
   isImageTransparent (data)
   {
      const length = data .length;

      for (let i = 3; i < length; i += 4)
      {
         if (data [i] !== 255)
            return true;
      }

      return false;
   },
   set_textureProperties__ (update)
   {
      if (this .texturePropertiesNode)
         this .texturePropertiesNode .removeInterest ("updateTextureParameters", this);

      this .texturePropertiesNode = X3DCast (X3DConstants .TextureProperties, this ._textureProperties)
         ?? this .getBrowser () .getDefaultTextureProperties ();

      this .texturePropertiesNode .addInterest ("updateTextureParameters", this);

      if (update)
         this .updateTextureParameters ();
   },
   updateTextureParameters (target, haveTextureProperties, textureProperties, width, height, repeatS, repeatT, repeatR)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      gl .bindTexture (target, this .getTexture ());

      if (!haveTextureProperties && Math .max (width, height) < browser .getMinTextureSize ())
      {
         // Don't generate MipMaps.
         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      }
      else if (!this .isLinear () || haveTextureProperties)
      {
         // All linear textures (KTX2, HDR) do NOT support mip-maps.

         if (!this .isLinear ())
         {
            if (textureProperties ._generateMipMaps .getValue ())
               gl .generateMipmap (target);
         }

         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter ()]);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter ()]);
      }
      else
      {
         gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
         gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .LINEAR);
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

      const ext = browser .getAnisotropicExtension ();

      if (ext)
      {
         const max = gl .getParameter (ext .MAX_TEXTURE_MAX_ANISOTROPY_EXT);

         gl .texParameterf (target, ext .TEXTURE_MAX_ANISOTROPY_EXT, Algorithm .clamp (textureProperties ._anisotropicDegree .getValue (), 0, max));
      }
   },
   getTextureBits ()
   {
      return (this .isLinear () << 3) | this .getTextureType ();
   },
   updateTextureBits (textureBits, channel = 0)
   {
      textureBits .add (channel * 4, this .getTextureBits ());
   },
   getShaderOptions (options, name = 0, ext = false)
   {
      if (typeof name === "number")
      {
         options .push (`X3D_TEXTURE${name}_${this .getTextureTypeString ()}`);

         if (this .getTextureType () === 1)
            options .push (`X3D_TEXTURE${name}_FLIP_Y`);

         if (this .isLinear ())
            options .push (`X3D_TEXTURE${name}_LINEAR`);
      }
      else
      {
         ext = ext ? "_EXT" : "";

         options .push (`X3D_${name}_TEXTURE${ext}`, `X3D_${name}_TEXTURE${ext}_${this .getTextureTypeString ()}`);

         if (this .getTextureType () === 1)
            options .push (`X3D_${name}_TEXTURE${ext}_FLIP_Y`);

         if (this .isLinear ())
            options .push (`X3D_${name}_TEXTURE${ext}_LINEAR`);
      }
   },
   setNamedShaderUniforms (gl, shaderObject, renderObject, uniformStruct, mapping, textureTransformMapping, textureCoordinateMapping)
   {
      if (!uniformStruct)
         return;
      
      this .setShaderUniforms (gl, shaderObject, renderObject, uniformStruct);

      gl .uniform1i (uniformStruct .textureTransformMapping,  textureTransformMapping  .get (mapping) ?? 0);
      gl .uniform1i (uniformStruct .textureCoordinateMapping, textureCoordinateMapping .get (mapping) ?? 0);
   },
});

Object .defineProperties (X3DSingleTextureNode,
{
   typeName:
   {
      value: "X3DSingleTextureNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Texturing", level: 1 }),
      enumerable: true,
   },
});

export default X3DSingleTextureNode;
