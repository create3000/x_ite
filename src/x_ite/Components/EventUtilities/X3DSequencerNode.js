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

function X3DSequencerNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSequencerNode);

   this .index = -1;
}

Object .assign (Object .setPrototypeOf (X3DSequencerNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);
      this ._previous     .addInterest ("set_previous__", this);
      this ._next         .addInterest ("set_next__", this);
      this ._key          .addInterest ("set_index__", this);
   },
   set_fraction__ ()
   {
      const
         fraction = this ._set_fraction .getValue (),
         key      = this ._key,
         length   = key .length;

      if (length === 0)
         return;

      let i = 0;

      if (length === 1 || fraction <= key [0])
         i = 0;

      else if (fraction >= key [length - 1])
         i = this .getSize () - 1;

      else
      {
         const index = Algorithm .upperBound (key, 0, length, fraction);

         i = index - 1;
      }

      if (i !== this .index)
      {
         if (i < this .getSize ())
         {
            this .sequence (this .index = i);
         }
      }
   },
   set_previous__ ()
   {
      if (this ._previous .getValue ())
      {
         if (this .index <= 0)
            this .index = this .getSize () - 1;

         else
            -- this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_next__ ()
   {
      if (this ._next .getValue ())
      {
         if (this .index >= this .getSize () - 1)
            this .index = 0;

         else
            ++ this .index;

         if (this .index < this .getSize ())
            this .sequence (this .index);
      }
   },
   set_index__ ()
   {
      this .index = -1;
   },
});

Object .defineProperties (X3DSequencerNode, X3DNode .staticProperties ("X3DSequencerNode", "EventUtilities", 1));

export default X3DSequencerNode;
