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

import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureTransformNode from "./X3DTextureTransformNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";

function X3DSingleTextureTransformNode (executionContext)
{
   X3DTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSingleTextureTransformNode);

   this .matrixArray = new Float32Array (Matrix4 .Identity);
}

Object .assign (Object .setPrototypeOf (X3DSingleTextureTransformNode .prototype, X3DTextureTransformNode .prototype),
{
   getCount ()
   {
      return 1;
   },
   getMatrix ()
   {
      return this .matrixArray;
   },
   setMatrix (value)
   {
      this .matrixArray .set (value);
   },
   getTextureTransformMapping (textureTransformMapping, channel = 0)
   {
      textureTransformMapping .set (this ._mapping .getValue () || channel, channel);
   },
   setShaderUniforms (gl, shaderObject, channel = 0)
   {
      gl .uniformMatrix4fv (shaderObject .x3d_TextureMatrix [channel], false, this .matrixArray);
   },
   transformPoint (texCoord)
   {
      return Matrix4 .prototype .multVecMatrix .call (this .matrixArray, texCoord);
   },
});

Object .defineProperties (X3DSingleTextureTransformNode,
{
   typeName:
   {
      value: "X3DSingleTextureTransformNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Texturing", level: 1 }),
      enumerable: true,
   },
});

export default X3DSingleTextureTransformNode;
