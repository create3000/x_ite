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

import X3DNode         from "../Core/X3DNode.js";
import X3DMaterialNode from "./X3DMaterialNode.js";
import X3DCast         from "../../Base/X3DCast.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";

function X3DOneSidedMaterialNode (executionContext)
{
   X3DMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .X3DOneSidedMaterialNode);

   this .emissiveColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (X3DOneSidedMaterialNode .prototype, X3DMaterialNode .prototype),
{
   initialize ()
   {
      X3DMaterialNode .prototype .initialize .call (this);

      this ._emissiveColor   .addInterest ("set_emissiveColor__",   this);
      this ._emissiveTexture .addInterest ("set_emissiveTexture__", this);
      this ._normalTexture   .addInterest ("set_normalTexture__",   this);
      this ._transparency    .addInterest ("set_transparency__",    this);
      this ._transparency    .addInterest ("set_transparent__",     this);

      this .set_emissiveColor__ ();
      this .set_emissiveTexture__ ();
      this .set_normalTexture__ ();
      this .set_transparency__ ();
   },
   set_emissiveColor__ ()
   {
      this .emissiveColorArray .set (this ._emissiveColor .getValue ());
   },
   set_emissiveTexture__ ()
   {
      const index = this .getTextureIndices () .EMISSIVE_TEXTURE;

      this .emissiveTextureNode ?._linear .removeInterest (`setTexture${index}`, this);

      this .emissiveTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._emissiveTexture);

      this .emissiveTextureNode ?._linear .addInterest (`setTexture${index}`, this, index, this .emissiveTextureNode);

      this .setTexture (index, this .emissiveTextureNode);
   },
   set_normalTexture__ ()
   {
      this .normalTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._normalTexture);

      this .setTexture (this .getTextureIndices () .NORMAL_TEXTURE, this .normalTextureNode);
   },
   set_transparency__ ()
   {
      this .transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);
   },
   set_transparent__ ()
   {
      this .setTransparent (this .transparency);
   },
   getBaseTexture ()
   {
      return this .getEmissiveTexture ();
   },
   getEmissiveTexture ()
   {
      return this .emissiveTextureNode;
   },
   getNormalTexture ()
   {
      return this .normalTextureNode;
   },
   getTransparency ()
   {
      return this .transparency;
   },
   getShaderOptions (geometryContext, renderContext)
   {
      const options = X3DMaterialNode .prototype .getShaderOptions .call (this, geometryContext, renderContext);

      if (+this .getTextureBits ())
      {
         this .getEmissiveTexture () ?.getShaderOptions (options, "EMISSIVE");
         this .getNormalTexture ()   ?.getShaderOptions (options, "NORMAL");
      }

      return options;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_EmissiveColor, this .emissiveColorArray);
      gl .uniform1f  (shaderObject .x3d_Transparency,  this .transparency);

      if (!+this .getTextureBits ())
         return;

      this .emissiveTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_EmissiveTexture,
         this ._emissiveTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .normalTextureNode)
         gl .uniform1f (shaderObject .x3d_NormalScale, Math .max (this ._normalScale .getValue (), 0));

      this .normalTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_NormalTexture,
         this ._normalTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (X3DOneSidedMaterialNode, X3DNode .getStaticProperties ("X3DOneSidedMaterialNode", "Shape", 4));

export default X3DOneSidedMaterialNode;
