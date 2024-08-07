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
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Complex              from "../../../standard/Math/Numbers/Complex.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function Arc2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Arc2D);

   this ._startAngle .setUnit ("angle");
   this ._endAngle   .setUnit ("angle");
   this ._radius     .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Arc2D .prototype, X3DLineGeometryNode .prototype),
{
   set_live__ ()
   {
      X3DLineGeometryNode .prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getArc2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getArc2DOptions () .removeInterest ("requestRebuild", this);
   },
   getSweepAngle ()
   {
      const
         start = Algorithm .interval (this ._startAngle .getValue (), 0, Math .PI * 2),
         end   = Algorithm .interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

      if (start === end)
         return Math .PI * 2;

      const sweepAngle = Math .abs (end - start);

      if (start > end)
         return (Math .PI * 2) - sweepAngle;

      if (! isNaN (sweepAngle))
         return sweepAngle;

      // We must test for NAN, as NAN to int is undefined.
      return 0;
   },
   build ()
   {
      const
         options     = this .getBrowser () .getArc2DOptions (),
         dimension   = options ._dimension .getValue (),
         startAngle  = this ._startAngle .getValue  (),
         radius      = Math .abs (this ._radius .getValue ()),
         sweepAngle  = this .getSweepAngle (),
         steps       = Math .max (3, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
         vertexArray = this .getVertices ();

      for (let n = 0; n < steps; ++ n)
      {
         const
            t1     = n / steps,
            theta1 = startAngle + (sweepAngle * t1),
            point1 = Complex .Polar (radius, theta1),
            t2     = (n + 1) / steps,
            theta2 = startAngle + (sweepAngle * t2),
            point2 = Complex .Polar (radius, theta2);

         vertexArray .push (point1 .real, point1 .imag, 0, 1);
         vertexArray .push (point2 .real, point2 .imag, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Arc2D,
{
   typeName:
   {
      value: "Arc2D",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Geometry2D", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "geometry",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "startAngle", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "endAngle",   new Fields .SFFloat (1.570796)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",     new Fields .SFFloat (1)),
      ]),
      enumerable: true,
   },
});

export default Arc2D;
