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

function Spheroid3 (semiMajorAxis = 1, semiMinorAxis = 1, use_f_1 = false)
{
   this .set (semiMajorAxis, semiMinorAxis, use_f_1);
}

Object .assign (Spheroid3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Spheroid3 .prototype);

      copy .semiMajorAxis = this .semiMajorAxis; // a
      copy .semiMinorAxis = this .semiMinorAxis; // c

      return copy;
   },
   assign (spheroid)
   {
      this .semiMajorAxis = spheroid .semiMajorAxis;
      this .semiMinorAxis = spheroid .semiMinorAxis;

      return this;
   },
   equals (spheroid)
   {
      return this .semiMajorAxis === spheroid .semiMajorAxis && this .semiMinorAxis === spheroid .semiMinorAxis;
   },
   set (semiMajorAxis = 1, semiMinorAxis = 1, use_f_1 = false)
   {
      if (use_f_1)
      {
         const f_1 = semiMinorAxis;

         this .semiMajorAxis = semiMajorAxis;                   // a
         this .semiMinorAxis = semiMajorAxis * (1 - (1 / f_1)); // c
      }
      else
      {
         this .semiMajorAxis = semiMajorAxis; // a
         this .semiMinorAxis = semiMinorAxis; // c
      }

      return this;
   },
   toString ()
   {
      return `${this .semiMajorAxis} ${this .semiMinorAxis}`;
   },
});

export default Spheroid3;
