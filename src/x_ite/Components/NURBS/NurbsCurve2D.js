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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DNurbsControlCurveNode from "./X3DNurbsControlCurveNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import NURBS                    from "../../Browser/NURBS/NURBS.js";
import Vector3                  from "../../../standard/Math/Numbers/Vector3.js";
import nurbs                    from "../../../lib/nurbs/nurbs.js";

function NurbsCurve2D (executionContext)
{
   X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsCurve2D);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
   this .array         = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsCurve2D .prototype, X3DNurbsControlCurveNode .prototype),
{
   getTessellation (numKnots)
   {
      return NURBS .getTessellation (this ._tessellation .getValue (), numKnots - this ._order .getValue ());
   },
   getClosed (order, knot, weight, controlPoint)
   {
      if (! this ._closed .getValue ())
         return false;

      return NURBS .getClosed2D (order, knot, weight, controlPoint);
   },
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS .getKnots (result, closed, order, dimension, knot);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPoint)
   {
      return NURBS .getControlPoints2D (result, closed, order, weights, controlPoint);
   },
   tessellate (type)
   {
      const array = this .array;

      array .length = 0;

      if (this ._order .getValue () < 2)
         return array;

      if (this ._controlPoint .length < this ._order .getValue ())
         return array;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this ._controlPoint),
         weights       = this .getWeights (this .weights, this ._controlPoint .length, this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this ._controlPoint);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this ._controlPoint .length, this ._knot),
         scale = knots .at (-1) - knots [0];

      // Initialize NURBS tessellator

      const degree = this ._order .getValue () - 1;

      const surface = this .surface = (this .surface || nurbs) ({
         boundary: ["open"],
         degree: [degree],
         knots: [knots],
         points: controlPoints,
         debug: false,
      });

      this .sampleOptions .resolution [0] = this .getTessellation (knots .length);
      this .sampleOptions .haveWeights    = !! weights;

      const
         mesh   = nurbs .sample (this .mesh, surface, this .sampleOptions),
         points = mesh .points;

      switch (type)
      {
         case 0:
         {
            for (let i = 0, length = points .length; i < length; i += 2)
            {
               array .push (points [i], points [i + 1]);
            }

            break;
         }
         case 1:
         {
            for (let i = 0, length = points .length; i < length; i += 2)
            {
               array .push (points [i], 0, points [i + 1]);
            }

            break;
         }
         case 2:
         {
            for (let i = 0, length = points .length; i < length; i += 2)
            {
               array .push (new Vector3 (points [i], points [i + 1], 0));
            }

            break;
         }
      }

      return array;
   },
});

Object .defineProperties (NurbsCurve2D, X3DNode .getStaticProperties ("NurbsCurve2D", "NURBS", 3, "children", "3.0"));

Object .defineProperties (NurbsCurve2D,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2d ()),
      ]),
      enumerable: true,
   },
});

export default NurbsCurve2D;
