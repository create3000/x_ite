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

import Rotation4 from "../../../standard/Math/Numbers/Rotation4.js";

function SquatInterpolator ()
{
   this .s = [ ];
}

SquatInterpolator .prototype =
{
   constructor: SquatInterpolator,
   generate (closed, key, keyValue)
   {
      const s = this .s;

      s .length = 0;

      if (key .length > 1)
      {
         if (closed)
         {
            s .push (Rotation4 .spline (keyValue [key .length - 2] .getValue (),
                                        keyValue [0] .getValue (),
                                        keyValue [1] .getValue ()));
         }
         else
         {
            s .push (keyValue [0] .getValue ());
         }

         for (let i = 1, length = key .length - 1; i < length; ++ i)
         {
            s .push (Rotation4 .spline (keyValue [i - 1] .getValue (),
                                        keyValue [i]     .getValue (),
                                        keyValue [i + 1] .getValue ()));
         }

         if (closed)
         {
            s .push (Rotation4 .spline (keyValue [key .length - 2] .getValue (),
                                        keyValue [key .length - 1] .getValue (),
                                        keyValue [1] .getValue ()));
         }
         else
         {
            s .push (keyValue [key .length - 1] .getValue ());
         }
      }
      else if (key .length > 0)
      {
         s .push (keyValue [0] .getValue () .copy ());
      }
   },
   interpolate: (function ()
   {
      const result = new Rotation4 ();

      return function (index0, index1, weight, keyValue)
      {
         return result .assign (keyValue [index0] .getValue ()) .squad (this .s [index0],
                                                                        this .s [index1],
                                                                        keyValue [index1] .getValue (), weight);
      };
   })(),
};

export default SquatInterpolator;
