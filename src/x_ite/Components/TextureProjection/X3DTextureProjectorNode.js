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

import X3DNode      from "../Core/X3DNode.js";
import X3DLightNode from "../Lighting/X3DLightNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4    from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTextureProjectorNode (executionContext)
{
   X3DLightNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTextureProjectorNode);

   this ._location    .setUnit ("length");
   this ._farDistance .setUnit ("length");
   this ._location    .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (X3DTextureProjectorNode .prototype, X3DLightNode .prototype),
{
   initialize ()
   {
      X3DLightNode .prototype .initialize .call (this);

      this ._nearDistance .addInterest ("set_nearDistance__", this);
      this ._farDistance  .addInterest ("set_farDistance__",  this);
      this ._texture      .addInterest ("set_texture__",      this);

      this .set_nearDistance__ ();
      this .set_farDistance__ ();
      this .set_texture__ ();
   },
   getLightKey ()
   {
      return 3;
   },
   getGlobal ()
   {
      return this ._global .getValue ();
   },
   getLocation ()
   {
      return this ._location .getValue ();
   },
   getDirection ()
   {
      return this ._direction .getValue ();
   },
   getNearDistance ()
   {
      return this .nearDistance;
   },
   getNearParameter ()
   {
      return this .nearParameter;
   },
   getFarDistance ()
   {
      return this .farDistance;
   },
   getFarParameter ()
   {
      return this .farParameter;
   },
   getTexture ()
   {
      return this .textureNode;
   },
   getBiasMatrix: (() =>
   {
      // Transforms normalized coords from range (-1, 1) to (0, 1).
      const biasMatrix = new Matrix4 (0.5, 0.0, 0.0, 0.0,
                                      0.0, 0.5, 0.0, 0.0,
                                      0.0, 0.0, 0.5, 0.0,
                                      0.5, 0.5, 0.5, 1.0);

      return function ()
      {
         return biasMatrix;
      };
   })(),
   straightenHorizon (orientation)
   {
      return orientation .straighten (this ._upVector .getValue ());
   },
   set_nearDistance__ ()
   {
      const nearDistance = this ._nearDistance .getValue ();

      this .nearDistance  = nearDistance < 0 ? 0.125 : nearDistance;
      this .nearParameter = nearDistance < 0 ? 0 : -1;
   },
   set_farDistance__ ()
   {
      const farDistance = this ._farDistance .getValue ();

      this .farDistance  = farDistance < 0 ? 100_000 : farDistance;
      this .farParameter = farDistance < 0 ? 1 : 2;
   },
   set_texture__ ()
   {
      this .textureNode ?.removeInterest ("set_aspectRatio__", this);

      this .textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this ._texture);

      this .textureNode ?.addInterest ("set_aspectRatio__", this);

      this .setEnabled (!!this .textureNode);

      this .set_aspectRatio__ ();
      this .set_on__ ();
   },
   set_aspectRatio__ ()
   {
      if (this .textureNode)
         this ._aspectRatio = this .textureNode .getWidth () / this .textureNode .getHeight ();
      else
         this ._aspectRatio = 1;
   },
});

Object .defineProperties (X3DTextureProjectorNode,
{
   typeName:
   {
      value: "X3DTextureProjectorNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "TextureProjection", level: 4 }),
      enumerable: true,
   },
});

export default X3DTextureProjectorNode;
