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

import X3DField                  from "../Base/X3DField.js";
import SFMatrixPrototypeTemplate from "./SFMatrixPrototypeTemplate.js";
import Matrix4                   from "../../standard/Math/Numbers/Matrix4.js";

function SFMatrix4Template (TypeName, double)
{
   function SFMatrix4 (m00, m01, m02, m03,
                       m10, m11, m12, m13,
                       m20, m21, m22, m23,
                       m30, m31, m32, m33)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Matrix4 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 4:
         {
            const
               r0 = arguments [0],
               r1 = arguments [1],
               r2 = arguments [2],
               r3 = arguments [3];

            X3DField .call (this, new Matrix4 (r0 .x, r0 .y, r0 .z, r0 .w,
                                               r1 .x, r1 .y, r1 .z, r1 .w,
                                               r2 .x, r2 .y, r2 .z, r2 .w,
                                               r3 .x, r3 .y, r3 .z, r3 .w));

            break;
         }
         case 16:
         {
            X3DField .call (this, new Matrix4 (+m00, +m01, +m02, +m03,
                                               +m10, +m11, +m12, +m13,
                                               +m20, +m21, +m22, +m23,
                                               +m30, +m31, +m32, +m33));

            break;
         }
         default:
            throw new Error ("Invalid arguments.");
      }
   }

   SFMatrixPrototypeTemplate (SFMatrix4, TypeName, Matrix4, double);

   for (const key of Object .keys (SFMatrix4 .prototype))
      Object .defineProperty (SFMatrix4 .prototype, key, { enumerable: false });

   function defineProperty (i)
   {
      Object .defineProperty (SFMatrix4 .prototype, i,
      {
         get ()
         {
            return this .getValue () [i];
         },
         set (value)
         {
            this .getValue () [i] = value;
            this .addEvent ();
         },
         enumerable: true,
      });
   }

   for (let i = 0, length = Matrix4 .prototype .length; i < length; ++ i)
      defineProperty (i);

   return SFMatrix4;
}

const SFMatrix4 = {
   SFMatrix4d: SFMatrix4Template ("SFMatrix4d", true),
   SFMatrix4f: SFMatrix4Template ("SFMatrix4f", false),
   VrmlMatrix: SFMatrix4Template ("VrmlMatrix", false),
};

export default SFMatrix4;
