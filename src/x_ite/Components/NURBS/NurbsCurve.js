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

import X3DCast                   from "../../Base/X3DCast.js";
import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DLineGeometryNode       from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import NURBS                     from "../../Browser/NURBS/NURBS.js";
import nurbs                     from "../../../lib/nurbs/nurbs.js";

function NurbsCurve (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);
   X3DLineGeometryNode       .call (this, executionContext);

   this .addType (X3DConstants .NurbsCurve);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
}

Object .assign (Object .setPrototypeOf (NurbsCurve .prototype, X3DParametricGeometryNode .prototype),
   X3DLineGeometryNode .prototype,
{
   initialize ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this .set_controlPoint__ ();
   },
   set_controlPoint__ ()
   {
      if (this .controlPointNode)
         this .controlPointNode .removeInterest ("requestRebuild", this);

      this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

      if (this .controlPointNode)
         this .controlPointNode .addInterest ("requestRebuild", this);
   },
   getTessellation (numKnots)
   {
      return NURBS .getTessellation (this ._tessellation .getValue (), numKnots - this ._order .getValue ());
   },
   getClosed (order, knot, weight, controlPointNode)
   {
      if (! this ._closed .getValue ())
         return false;

      return NURBS .getClosed (order, knot, weight, controlPointNode);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPointNode)
   {
      return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
   },
   tessellate ()
   {
      if (this ._order .getValue () < 2)
         return [ ];

      if (! this .controlPointNode)
         return [ ];

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return [ ];

      const
         vertexArray = this .getVertices (),
         array       = [ ];

      if (vertexArray .length)
      {
         const length = vertexArray .length;

         for (let i = 0; i < length; i += 8)
            array .push (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2]);

         array .push (vertexArray [length - 4], vertexArray [length - 3], vertexArray [length - 2]);
      }

      return array;
   },
   build ()
   {
      if (this ._order .getValue () < 2)
         return;

      if (! this .controlPointNode)
         return;

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
         weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
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
         mesh        = nurbs .sample (this .mesh, surface, this .sampleOptions),
         points      = mesh .points,
         vertexArray = this .getVertices ();

      for (let i2 = 3, length = points .length; i2 < length; i2 += 3)
      {
         const i1 = i2 - 3;

         vertexArray .push (points [i1], points [i1 + 1], points [i1 + 2], 1);
         vertexArray .push (points [i2], points [i2 + 1], points [i2 + 2], 1);
      }
   },
   dispose ()
   {
      X3DParametricGeometryNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (NurbsCurve,
{
   typeName:
   {
      value: "NurbsCurve",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "NURBS", level: 1 }),
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tessellation", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "closed",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",        new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "knot",         new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default NurbsCurve;
