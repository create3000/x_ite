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

import Fields         from "../../Fields.js";
import X3DBaseNode    from "../../Base/X3DBaseNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import IndexedLineSet from "../../Components/Rendering/IndexedLineSet.js";
import Coordinate     from "../../Components/Rendering/Coordinate.js";
import Complex        from "../../../standard/Math/Numbers/Complex.js";

function Circle2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))
}

Object .assign (Object .setPrototypeOf (Circle2DOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getGeometry ()
   {
      if (!this .geometry)
         this .build ();

      return this .geometry;
   },
   createCoordIndex ()
   {
      const
         dimension  = this ._dimension .getValue (),
         coordIndex = this .geometry ._coordIndex;

      for (let n = 0; n < dimension; ++ n)
         coordIndex .push (n);

      coordIndex .push (0, -1);
   },
   createPoints ()
   {
      const
         dimension = this ._dimension .getValue (),
         angle     = Math .PI * 2 / dimension,
         point     = this .geometry ._coord .getValue () ._point;

      for (let n = 0; n < dimension; ++ n)
      {
         const p = Complex .Polar (1, angle * n);

         point .push (new Fields .SFVec3f (p .real, p .imag, 0));
      }
   },
   build ()
   {
      this .geometry         = new IndexedLineSet (this .getExecutionContext ());
      this .geometry ._coord = new Coordinate (this .getExecutionContext ());

      this .createCoordIndex ();
      this .createPoints ();

      const
         geometry = this .geometry,
         coord    = this .geometry ._coord .getValue ();

      coord    .setup ();
      geometry .setup ();
   },
   eventsProcessed ()
   {
      this .geometry = null;
   },
});

Object .defineProperties (Circle2DOptions,
{
   typeName:
   {
      value: "Circle2DOptions",
      enumerable: true,
   },
});

export default Circle2DOptions;
