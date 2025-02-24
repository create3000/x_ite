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

import X3DField               from "../Base/X3DField.js";
import SFVecPrototypeTemplate from "./SFVecPrototypeTemplate.js";
import Vector4                from "../../standard/Math/Numbers/Vector4.js";

function SFVec4Template (TypeName, double)
{
   function SFVec4 (x, y, z, w)
   {
      switch (arguments .length)
      {
         case 0:
            X3DField .call (this, new Vector4 (0, 0, 0, 1));
            break;

         case 1:
            X3DField .call (this, arguments [0]);
            break;

         case 4:
            X3DField .call (this, new Vector4 (+x, +y, +z, +w));
            break;

         default:
            throw new Error ("Invalid arguments.");
      }
   }

   return SFVecPrototypeTemplate (SFVec4, TypeName, Vector4, double,
   {
      isDefaultValue ()
      {
         return this .getValue () .equals (Vector4 .wAxis);
      },
   });
}

const SFVec4 = {
   SFVec4d: SFVec4Template ("SFVec4d", true),
   SFVec4f: SFVec4Template ("SFVec4f", false),
};

export default SFVec4;
