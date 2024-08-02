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

import Fields          from "../../Fields.js";
import X3DBaseNode     from "../../Base/X3DBaseNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import X3DGeometryNode from "../../Components/Rendering/X3DGeometryNode.js";
import Complex         from "../../../standard/Math/Numbers/Complex.js";

function Disk2DOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "dimension", new Fields .SFInt32 (40))

   this .circleVertices = X3DGeometryNode .createArray ();
   this .diskTexCoords  = X3DGeometryNode .createArray ();
   this .diskNormals    = X3DGeometryNode .createArray ();
   this .diskVertices   = X3DGeometryNode .createArray ();
}

Object .assign (Object .setPrototypeOf (Disk2DOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getCircleVertices ()
   {
      if (!this .circleVertices .length)
         this .build ();

      return this .circleVertices;
   },
   getDiskTexCoords ()
   {
      if (!this .diskTexCoords .length)
         this .build ();

      return this .diskTexCoords;
   },
   getDiskNormals ()
   {
      if (!this .diskNormals .length)
         this .build ();

      return this .diskNormals;
   },
   getDiskVertices ()
   {
      if (!this .diskVertices .length)
         this .build ();

      return this .diskVertices;
   },
   build: (() =>
   {
      const
         half      = new Complex (0.5, 0.5),
         texCoord1 = new Complex (),
         texCoord2 = new Complex (),
         point1    = new Complex (),
         point2    = new Complex ();

      return function ()
      {
         const
            dimension      = this ._dimension .getValue (),
            angle          = Math .PI * 2 / dimension,
            circleVertices = this .circleVertices,
            diskTexCoords  = this .diskTexCoords,
            diskNormals    = this .diskNormals,
            diskVertices   = this .diskVertices;

         for (let n = 0; n < dimension; ++ n)
         {
            const
               theta1 = angle * n,
               theta2 = angle * (n + 1);

            texCoord1 .setPolar (0.5, theta1) .add (half);
            texCoord2 .setPolar (0.5, theta2) .add (half);
            point1    .setPolar (1, theta1);
            point2    .setPolar (1, theta2);

            // Circle

            circleVertices .push (point1 .real, point1 .imag, 0, 1);
            circleVertices .push (point2 .real, point2 .imag, 0, 1);

            // Disk

            diskTexCoords .push (0.5, 0.5, 0, 1,
                                 texCoord1 .real, texCoord1 .imag, 0, 1,
                                 texCoord2 .real, texCoord2 .imag, 0, 1);

            diskNormals .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

            diskVertices .push (0, 0, 0, 1,
                                point1 .real, point1 .imag, 0, 1,
                                point2 .real, point2 .imag, 0, 1);
         }

         circleVertices .shrinkToFit ();
         diskTexCoords  .shrinkToFit ();
         diskNormals    .shrinkToFit ();
         diskVertices   .shrinkToFit ();
      };
   })(),
   eventsProcessed ()
   {
      this .circleVertices .length = 0;
      this .diskTexCoords  .length = 0;
      this .diskNormals    .length = 0;
      this .diskVertices   .length = 0;
   },
});

Object .defineProperties (Disk2DOptions,
{
   typeName:
   {
      value: "Disk2DOptions",
      enumerable: true,
   },
});

export default Disk2DOptions;
