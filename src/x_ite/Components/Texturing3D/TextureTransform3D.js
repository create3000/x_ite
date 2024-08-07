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
import X3DSingleTextureTransformNode from "../Texturing/X3DSingleTextureTransformNode.js";
import X3DConstants                  from "../../Base/X3DConstants.js";
import Vector3                       from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4                     from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                       from "../../../standard/Math/Numbers/Matrix4.js";

function TextureTransform3D (executionContext)
{
   X3DSingleTextureTransformNode .call (this, executionContext);

   this .addType (X3DConstants .TextureTransform3D);

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (TextureTransform3D .prototype, X3DSingleTextureTransformNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureTransformNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const vector = new Vector3 ();

      return function ()
      {
         const
            translation = this ._translation .getValue (),
            rotation    = this ._rotation .getValue (),
            scale       = this ._scale .getValue (),
            center      = this ._center .getValue (),
            matrix4     = this .matrix;

         matrix4 .identity ();

         if (! center .equals (Vector3 .Zero))
            matrix4 .translate (vector .assign (center) .negate ());

         if (! scale .equals (Vector3 .One))
            matrix4 .scale (scale);

         if (! rotation .equals (Rotation4 .Identity))
            matrix4 .rotate (rotation);

         if (! center .equals (Vector3 .Zero))
            matrix4 .translate (center);

         if (! translation .equals (Vector3 .Zero))
            matrix4 .translate (translation);

         this .setMatrix (matrix4);
      };
   })(),
});

Object .defineProperties (TextureTransform3D,
{
   typeName:
   {
      value: "TextureTransform3D",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Texturing3D", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "textureTransform",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.1", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default TextureTransform3D;
