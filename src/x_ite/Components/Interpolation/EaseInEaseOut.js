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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function EaseInEaseOut (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .EaseInEaseOut);
}

Object .assign (Object .setPrototypeOf (EaseInEaseOut .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._easeInEaseOut .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      if (this ._easeInEaseOut .length < this ._key .length)
         this ._easeInEaseOut .resize (this ._key .length, this ._easeInEaseOut .length ? this ._easeInEaseOut [this ._easeInEaseOut .length - 1] : new Fields .SFVec2f ());
   },
   interpolate (index0, index1, weight)
   {
      let
         easeOut = this ._easeInEaseOut [index0] .y,
         easeIn  = this ._easeInEaseOut [index1] .x;

      const sum = easeOut + easeIn;

      if (sum < 0)
      {
         this ._modifiedFraction_changed = weight;
      }
      else
      {
         if (sum > 1)
         {
            easeIn  /= sum;
            easeOut /= sum;
         }

         const t = 1 / (2 - easeOut - easeIn);

         if (weight < easeOut)
         {
            this ._modifiedFraction_changed = (t / easeOut) * weight * weight;
         }
         else if (weight <= 1 - easeIn) // Spec says (weight < 1 - easeIn), but then we get a NaN below if easeIn == 0.
         {
            this ._modifiedFraction_changed = t * (2 * weight - easeOut);
         }
         else
         {
            const w = 1 - weight;

            this ._modifiedFraction_changed = 1 - ((t * w * w) / easeIn);
         }
      }
   },
});

Object .defineProperties (EaseInEaseOut,
{
   ... X3DNode .getStaticProperties ("EaseInEaseOut", "Interpolation", 4, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",             new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",                      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "easeInEaseOut",            new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "modifiedFraction_changed", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default EaseInEaseOut;
