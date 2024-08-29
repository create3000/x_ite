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
import Matrix3                   from "../../standard/Math/Numbers/Matrix3.js";

function SFMatrix3Template (TypeName, double)
{
   function SFMatrix3 (m00, m01, m02,
                       m10, m11, m12,
                       m20, m21, m22)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Matrix3 ());
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 3:
         {
            const
               r0 = arguments [0],
               r1 = arguments [1],
               r2 = arguments [2];

            X3DField .call (this, new Matrix3 (r0 .x, r0 .y, r0 .z,
                                               r1 .x, r1 .y, r1 .z,
                                               r2 .x, r2 .y, r2 .z));

            break;
         }
         case 9:
         {
            X3DField .call (this, new Matrix3 (+m00, +m01, +m02,
                                               +m10, +m11, +m12,
                                               +m20, +m21, +m22));

            break;
         }
         default:
            throw new Error ("Invalid arguments.");
      }
   }

   return SFMatrixPrototypeTemplate (SFMatrix3, TypeName, Matrix3, double,
   {
      setTransform: (function ()
      {
         const args = [ ];

         return function (translation, rotation, scale, scaleOrientation, center)
         {
            args .push (translation ?.getValue (), rotation, scale ?.getValue (), scaleOrientation, center ?.getValue ());

            for (let i = args .length - 1; i > -1; -- i)
            {
               if (args [i])
                  break;

               args .pop ();
            }

            this .getValue () .set (... args);

            args .length = 0;
         };
      })(),
   });
}

const SFMatrix3 = {
   SFMatrix3d: SFMatrix3Template ("SFMatrix3d", true),
   SFMatrix3f: SFMatrix3Template ("SFMatrix3f", false),
};

export default SFMatrix3;
