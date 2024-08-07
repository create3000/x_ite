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

import Fields                        from "../../Fields.js";
import X3DFieldDefinition            from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray          from "../../Base/FieldDefinitionArray.js";
import X3DNode                       from "../Core/X3DNode.js";
import X3DSingleTextureTransformNode from "./X3DSingleTextureTransformNode.js";
import X3DConstants                  from "../../Base/X3DConstants.js";
import Vector2                       from "../../../standard/Math/Numbers/Vector2.js";
import Matrix3                       from "../../../standard/Math/Numbers/Matrix3.js";
import Matrix4                       from "../../../standard/Math/Numbers/Matrix4.js";

function TextureTransform (executionContext)
{
   X3DSingleTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .TextureTransform);

   this ._rotation .setUnit ("angle");

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (TextureTransform .prototype, X3DSingleTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureTransformNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const
         vector  = new Vector2 (),
         matrix3 = new Matrix3 ();

      return function ()
      {
         const
            translation = this ._translation .getValue (),
            rotation    = this ._rotation .getValue (),
            scale       = this ._scale .getValue (),
            center      = this ._center .getValue (),
            matrix4     = this .matrix;

         matrix3 .identity ();

         if (! center .equals (Vector2 .Zero))
            matrix3 .translate (vector .assign (center) .negate ());

         if (! scale .equals (Vector2 .One))
            matrix3 .scale (scale);

         if (rotation !== 0)
            matrix3 .rotate (rotation);

         if (! center .equals (Vector2 .Zero))
            matrix3 .translate (center);

         if (! translation .equals (Vector2 .Zero))
            matrix3 .translate (translation);

         matrix4 [ 0] = matrix3 [0];
         matrix4 [ 1] = matrix3 [1];
         matrix4 [ 4] = matrix3 [3];
         matrix4 [ 5] = matrix3 [4];
         matrix4 [12] = matrix3 [6];
         matrix4 [13] = matrix3 [7];

         this .setMatrix (matrix4);
      };
   })(),
});

Object .defineProperties (TextureTransform,
{
   ... X3DNode .getStaticProperties ("TextureTransform", "Texturing", 1, "textureTransform", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec2f (1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default TextureTransform;
