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

import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import Vector3           from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4           from "../../../standard/Math/Numbers/Matrix4.js";
import ViewVolume        from "../../../standard/Math/Geometry/ViewVolume.js";

const _screenTextureProperties = Symbol ();

function X3DLayoutContext () { }

Object .assign (X3DLayoutContext .prototype,
{
   getScreenTextureProperties ()
   {
      return this [_screenTextureProperties] ??= (() =>
      {
         const screenTextureProperties = new TextureProperties (this .getPrivateScene ());

         screenTextureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeT       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeR       = "CLAMP_TO_EDGE";
         screenTextureProperties ._minificationFilter  = "NEAREST_PIXEL";
         screenTextureProperties ._magnificationFilter = "NEAREST_PIXEL";
         screenTextureProperties ._generateMipMaps     = false;
         screenTextureProperties ._textureCompression  = "DEFAULT";

         screenTextureProperties .setup ();

         return screenTextureProperties;
      })();
   },
   getScreenScaleMatrix: (() =>
   {
      const
         screenScale  = new Vector3 (),
         screenPoint  = new Vector3 (),
         screenMatrix = new Matrix4 ();

      return function (renderObject, matrix, contentScale, snap)
      {
         // throws domain error

         const
            modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
            projectionMatrix = renderObject .getProjectionMatrix () .get (),
            viewport         = renderObject .getViewVolume () .getViewport ();

         // Determine screenMatrix.
         // Same as in ScreenText.

         renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x * contentScale),
            y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y * contentScale),
            z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x * contentScale);

         screenMatrix .set (x .x, x .y, x .z, 0,
                            y .x, y .y, y .z, 0,
                            z .x, z .y, z .z, 0,
                            modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

         // Snap to whole pixel.

         if (snap)
         {
            ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .z = 0;
            screenMatrix .translate (screenPoint);
         }

         // Assign relative matrix.

         matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
      };
   })(),
});

export default X3DLayoutContext;
