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

import ImageTexture                   from "./Texturing/ImageTexture.js";
import MovieTexture                   from "./Texturing/MovieTexture.js";
import MultiTexture                   from "./Texturing/MultiTexture.js";
import MultiTextureCoordinate         from "./Texturing/MultiTextureCoordinate.js";
import MultiTextureTransform          from "./Texturing/MultiTextureTransform.js";
import PixelTexture                   from "./Texturing/PixelTexture.js";
import TextureCoordinate              from "./Texturing/TextureCoordinate.js";
import TextureCoordinateGenerator     from "./Texturing/TextureCoordinateGenerator.js";
import TextureProperties              from "./Texturing/TextureProperties.js";
import TextureTransform               from "./Texturing/TextureTransform.js";
import X3DSingleTextureCoordinateNode from "./Texturing/X3DSingleTextureCoordinateNode.js";
import X3DSingleTextureNode           from "./Texturing/X3DSingleTextureNode.js";
import X3DSingleTextureTransformNode  from "./Texturing/X3DSingleTextureTransformNode.js";
import X3DTexture2DNode               from "./Texturing/X3DTexture2DNode.js";
import X3DTextureCoordinateNode       from "./Texturing/X3DTextureCoordinateNode.js";
import X3DTextureNode                 from "./Texturing/X3DTextureNode.js";
import X3DTextureTransformNode        from "./Texturing/X3DTextureTransformNode.js";

export default {
   name: "Texturing",
   concreteNodes:
   [
      ImageTexture,
      MovieTexture,
      MultiTexture,
      MultiTextureCoordinate,
      MultiTextureTransform,
      PixelTexture,
      TextureCoordinate,
      TextureCoordinateGenerator,
      TextureProperties,
      TextureTransform,
   ],
   abstractNodes:
   [
      X3DSingleTextureCoordinateNode,
      X3DSingleTextureNode,
      X3DSingleTextureTransformNode,
      X3DTexture2DNode,
      X3DTextureCoordinateNode,
      X3DTextureNode,
      X3DTextureTransformNode,
   ],
};
