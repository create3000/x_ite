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
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DInterpolatorNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DInterpolatorNode);
}

Object .assign (Object .setPrototypeOf (X3DInterpolatorNode .prototype, X3DChildNode .prototype),
{
   setup ()
   {
      // If an X3DInterpolatorNode value_changed outputOnly field is read before it receives any inputs,
      // keyValue[0] is returned if keyValue is not empty. If keyValue is empty (i.e., [ ]), the initial
      // value for the respective field type is returned (EXAMPLE  (0, 0, 0) for Fields .SFVec3f);

      this .set_key__ ();

      if (this ._key .length)
         this .interpolate (0, 0, 0);

      X3DChildNode .prototype .setup .call (this);
   },
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);
      this ._key          .addInterest ("set_key__", this);
   },
   set_fraction__ ()
   {
      const
         key      = this ._key,
         length   = key .length,
         fraction = this ._set_fraction .getValue ();

      switch (length)
      {
         case 0:
            // Interpolator nodes containing no keys in the key field shall not produce any events.
            return;
         case 1:
            return this .interpolate (0, 0, 0);
         default:
         {
            if (fraction <= key [0])
               return this .interpolate (0, 1, 0);

            const index1 = Algorithm .upperBound (key, 0, length, fraction);

            if (index1 !== length)
            {
               const
                  index0 = index1 - 1,
                  weight = (fraction - key [index0]) / (key [index1] - key [index0]);

               this .interpolate (index0, index1, Algorithm .clamp (weight, 0, 1));
            }
            else
               this .interpolate (length - 2, length - 1, 1);
         }
      }
   },
   set_key__ ()
   {
      this .set_keyValue__ ();
   },
   set_keyValue__ () { },
   interpolate () { },
});

Object .defineProperties (X3DInterpolatorNode, X3DNode .getStaticProperties ("X3DInterpolatorNode", "Interpolation", 1));

export default X3DInterpolatorNode;
